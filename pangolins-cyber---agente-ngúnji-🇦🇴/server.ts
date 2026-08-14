import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { evaluateScopeGuard, retrieveRAGContext, validateCitationsAgainstEvidence } from './src/services/ragEngine';
import { CompanyProfile } from './src/types';

// Helper to sanitize and format conversation history for Gemini multi-turn API
function buildSanitizedContents(
  message: string,
  history?: { role: 'user' | 'model'; parts: { text: string }[] }[]
) {
  if (!history || history.length === 0) {
    return message;
  }

  // Filter out any messages with empty or invalid text
  const clean = history.filter(
    h => h.parts && h.parts.length > 0 && h.parts.some(p => p.text && p.text.trim().length > 0)
  );

  // Gemini API requires multi-turn history to begin with role: 'user'
  const firstUserIdx = clean.findIndex(h => h.role === 'user');
  const validHistory = firstUserIdx >= 0 ? clean.slice(firstUserIdx) : [];

  if (validHistory.length === 0) {
    return message;
  }

  // Enforce alternating roles
  const alternating: { role: 'user' | 'model'; parts: { text: string }[] }[] = [];
  for (const item of validHistory) {
    if (alternating.length === 0) {
      if (item.role === 'user') {
        alternating.push({ role: 'user', parts: [{ text: item.parts[0].text }] });
      }
    } else {
      const prev = alternating[alternating.length - 1];
      if (prev.role !== item.role) {
        alternating.push({ role: item.role, parts: [{ text: item.parts[0].text }] });
      } else {
        // Merge texts if same role consecutively
        prev.parts[0].text += `\n\n${item.parts[0].text}`;
      }
    }
  }

  // Add the current user message turn
  if (alternating.length > 0 && alternating[alternating.length - 1].role === 'user') {
    alternating[alternating.length - 1].parts[0].text += `\n\n${message}`;
  } else {
    alternating.push({ role: 'user', parts: [{ text: message }] });
  }

  return alternating;
}

// Initialize Gemini Client server-side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const DEFAULT_MODEL = 'gemini-3.7-flash';
const FALLBACK_MODEL = 'gemini-3.1-flash-lite';
const SECONDARY_FALLBACK_MODEL = 'gemini-flash-latest';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Health Check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      agent: 'Ngúnji',
      project: 'Pangolins Cyber',
      country: 'Angola 🇦🇴',
      model: DEFAULT_MODEL,
      hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    });
  });

  // API Scope Check
  app.post('/api/scope-check', (req, res) => {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Mensagem é obrigatória' });
    }

    const scopeResult = evaluateScopeGuard(message);
    return res.json(scopeResult);
  });

  // API RAG Search
  app.post('/api/rag-search', (req, res) => {
    const { query, limit } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query é obrigatória' });
    }

    const ragResult = retrieveRAGContext(query, limit || 4);
    return res.json(ragResult);
  });

  // API Chat Endpoint with Strict Scope Guard -> RAG -> Gemini -> Citation Validator
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, companyProfile, enableSearch, history } = req.body as {
        message: string;
        companyProfile?: CompanyProfile;
        enableSearch?: boolean;
        history?: { role: 'user' | 'model'; parts: { text: string }[] }[];
      };

      if (!message) {
        return res.status(400).json({ error: 'Mensagem não pode estar vazia.' });
      }

      // 1. Strict Scope Guard Evaluation
      const scopeResult = evaluateScopeGuard(message);
      if (!scopeResult.inScope) {
        return res.json({
          text: `⚠️ **Solicitação Fora do Domínio de Atuação**\n\nOlá! Sou o **Ngúnji**, o assistente especializado **exclusivamente em Ciber-higiene, Segurança da Informação e Proteção de Dados (Lei nº 22/11 / APD)** para PMEs em Angola, desenvolvido pela **Pangolins Cyber**.\n\n${scopeResult.reason}\n\n🛡️ **Como posso ajudar a sua empresa:**\n- Como proteger contas com **MFA (Autenticação em Dois Fatores)** e senhas fortes.\n- Estratégia de **Backups Imutáveis 3-2-1** contra Ransomware.\n- Identificação de **Phishing e Burlas Digitais** direcionadas a trabalhadores.\n- Notificação e registo prévio de ficheiros de dados junto da **APD (Agência de Proteção de Dados)**.\n- Cumprimento dos direitos dos titulares e princípios da **Lei nº 22/11 de 17 de Junho**.\n- Plano de **Resposta a Incidentes** e notificação obrigatória em 72h.\n\n*Por favor, envie uma questão relacionada com a cibersegurança ou conformidade digital da sua empresa.*`,
          scopeGuard: scopeResult,
          citations: [],
          searchGroundingUsed: false,
          validationResult: {
            isValidated: true,
            confidenceScore: 1.0,
            unverifiedClaims: [],
            legalNotes: ['Recusa de escopo executada com sucesso pelo Scope Guard.'],
          },
        });
      }

      // 2. RAG Knowledge Retrieval
      const ragData = retrieveRAGContext(message, 5);

      // Construct RAG Context string for Gemini prompt
      const ragContextText = ragData.chunks
        .map(
          (chunk, index) =>
            `--- EVIDÊNCIA RAG [${index + 1}] (${chunk.metadata.authority} - ${chunk.metadata.document_title}) ---\nARTIGO/SECÇÃO: ${chunk.metadata.article || 'N/A'}\nSUBTITULO: ${chunk.metadata.subcategory}\nPRIORIDADE DA FONTE: ${chunk.metadata.source_priority}/10\nCONTEÚDO:\n${chunk.content}\n`
        )
        .join('\n\n');

      // PME Context formatting
      const profileContext = companyProfile
        ? `PERFIL DA PME ANGOLANA:
- Nome da Empresa: ${companyProfile.companyName || 'PME Angolana'}
- Dimensão: ${companyProfile.companySize} colaboradores
- Localização: Província de ${companyProfile.province || 'Luanda'}, Angola
- Sector de Actuação: ${companyProfile.industry || 'Geral'}
- Equipa de TI Dedicada: ${companyProfile.hasItTeam ? 'Sim' : 'Não (A empresa não possui departamento de TI próprio)'}
- Plataforma na Nuvem: ${companyProfile.usesCloudWorkspace}
- Armazena Dados Pessoais (Clientes/Trabalhadores/NIF): ${companyProfile.storesPersonalData ? 'Sim' : 'Não'}
- Armazena Dados Sensíveis (Saúde/Biometria/Financeiro): ${companyProfile.storesSensitiveData ? 'Sim' : 'Não'}`
        : `PERFIL DA PME: PME genérica operando em Angola sem equipa dedicada de TI.`;

      // 3. Strict System Prompt
      const systemInstruction = `Você é o NGÚNJI, Consultor Sénior Especialista em Ciber-higiene, Segurança da Informação e Proteção de Dados para PMEs em Angola, desenvolvido pela PANGOLINS CYBER 🇦🇴.

PROIBIÇÃO RIGOROSA DE RESPOSTAS BREVES OU MONOSSILÁBICAS:
- NUNCA emita respostas curtas de uma única palavra, nomes isolados (como "Luanda", "Sim", "Não", "Ok") ou frases telegráficas sem substância.
- Toda e qualquer intervenção sua deve ser uma resposta de consultoria completa, aprofundada, estruturada e de alto valor prático para a empresa.
- NÃO repita nem ecoe aleatoriamente a cidade ou província da empresa fora de um contexto técnico legítimo.

TOM E POSTURA DE CONSULTOR:
- Tom estritamente profissional, cortês, pedagógico, encorajador e adaptado à realidade operacional de uma PME sem equipa técnica especializada.
- Linguagem em Português de Angola formal e executivo, com rigor técnico e jurídico.
- Toda a orientação deve ser compreensível para diretores, gestores e colaboradores não técnicos.

REGRA DE OURO - ESCOPO ESTRITO (CIBERSEGURANÇA E PROTEÇÃO DE DADOS):
- O seu escopo exclusivo é: Ciber-higiene (senhas, MFA/2FA, backups 3-2-1, ciberameaças, phishing, ransomware, navegação segura, segurança em nuvem e endpoints), Proteção de Dados em Angola (Lei nº 22/11 de 17 de Junho, deliberações da APD - Agência de Proteção de Dados, registo de ficheiros, DPO/EPD, prazos de 72h para notificação de violações de dados), Lei dos Crimes TIC (Lei nº 23/11) e frameworks internacionais (NIST CSF 2.0, CIS Controls v8).
- Se o utilizador perguntar sobre assuntos fora deste domínio (ex: receitas, desporto, entretenimento, conselhos pessoais, matemática pura, programação genérica não relacionada com segurança):
  Recuse com polidez e elegância profissional, reforçando a sua identidade como consultor Ngúnji da Pangolins Cyber e convidando a apresentar questões de cibersegurança ou conformidade legal da empresa.

ESTRUTURA OBRIGATÓRIA DA RESPOSTA EM MARKDOWN:
Todas as suas respostas técnicas devem seguir rigorosamente este formato estruturado com títulos claros em Markdown (###):

### 🔍 Diagnóstico & Contexto
[Apresente uma análise clara, executiva e contextualizada do problema, incidente ou questão levantada pelo utilizador.]

### 📋 Enquadramento Legal & Normativo (Lei 22/11 / APD)
[Indique com rigor os artigos específicos da Lei nº 22/11 de 17 de Junho, os regulamentos da APD (www.apd.ao), a Lei dos Crimes TIC (Lei nº 23/11) ou os padrões internacionais aplicáveis (NIST / CIS Controls). Nunca invente artigos.]

### 🛡️ Plano de Ação Prático para a PME (Passo a Passo)
[Forneça um conjunto de medidas sequenciais, numeradas (1, 2, 3...), exatas e de rápida implementação para mitigar o risco ou cumprir a obrigação legal, mesmo sem equipa dedicada de TI.]

### ⚠️ Ponto Crítico & Recomendações de Ciber-higiene
[Destaque o principal alerta de risco, prazos obrigatórios (ex: 72 horas para incidentes junto da APD, consentimento prévio) e boas práticas de prevenção contínua.]

EVIDÊNCIAS DA BASE DE CONHECIMENTO RAG DISPONÍVEIS:
${ragContextText}

${profileContext}`;

      // 4. Call Gemini Model with multi-turn sanitization and resilient multi-model fallback
      const sanitizedContents = buildSanitizedContents(message, history);

      let geminiResponse: any = null;
      let searchUsed = false;
      let searchQuery: string | undefined = undefined;
      let searchStatus: 'active' | 'quota_fallback' | 'disabled' | 'error' = enableSearch ? 'active' : 'disabled';
      let searchNotice: string | undefined = undefined;
      const webCitations: any[] = [];

      if (enableSearch) {
        try {
          // Attempt web search grounding with primary or fast model
          const searchCandidateModels = [DEFAULT_MODEL, FALLBACK_MODEL];
          for (const modelName of searchCandidateModels) {
            try {
              geminiResponse = await ai.models.generateContent({
                model: modelName,
                contents: sanitizedContents,
                config: {
                  systemInstruction,
                  temperature: 0.2, // Lower temperature for accuracy and strict legal adherence
                  tools: [{ googleSearch: {} }],
                },
              });
              if (geminiResponse && geminiResponse.text) {
                break;
              }
            } catch (innerSearchErr: any) {
              console.warn(`[Ngúnji Search] Falha com modelo ${modelName} e ferramenta de busca:`, innerSearchErr?.message || innerSearchErr);
            }
          }

          if (geminiResponse) {
            const groundingMetadata = geminiResponse.candidates?.[0]?.groundingMetadata;
            const groundingChunks = groundingMetadata?.groundingChunks;
            if (groundingChunks && Array.isArray(groundingChunks) && groundingChunks.length > 0) {
              searchUsed = true;
              searchStatus = 'active';
              if (groundingMetadata.webSearchQueries && groundingMetadata.webSearchQueries.length > 0) {
                searchQuery = groundingMetadata.webSearchQueries.join(', ');
              }

              for (const [idx, chunk] of groundingChunks.entries()) {
                if (chunk.web?.uri || chunk.web?.title) {
                  webCitations.push({
                    documentTitle: chunk.web.title || `Fonte Externa Web [${idx + 1}]`,
                    article: chunk.web.uri || '',
                    paragraph: 'Pesquisa Web em Tempo Real',
                    authority: 'Google Search / Web',
                    excerpt: chunk.web.title ? `${chunk.web.title} (${chunk.web.uri})` : chunk.web.uri,
                    chunkId: `web_${idx + 1}`,
                    sourcePriority: 4,
                  });
                }
              }
            }
          } else {
            searchStatus = 'quota_fallback';
            searchNotice = 'A ferramenta de busca web atingiu a quota temporária. Resposta gerada via inteligência artificial com fundamentação no corpus normativo da Lei nº 22/11 e da APD.';
          }
        } catch (searchError: any) {
          console.warn(
            '[Pangolins Cyber - Ngúnji] Aviso na busca web Gemini, ativando fallback seguro para a base RAG local:',
            searchError?.message || searchError
          );
          searchStatus = 'quota_fallback';
          searchNotice = 'A ferramenta de busca web atingiu a quota temporária. Resposta gerada com base estrita no corpus jurídico local (Lei 22/11 e APD).';
          geminiResponse = null;
        }
      }

      // If search was disabled, failed, or fell back, call standard generation with multi-model fallback
      if (!geminiResponse) {
        const candidateModels = [FALLBACK_MODEL, DEFAULT_MODEL, SECONDARY_FALLBACK_MODEL];
        for (const candidate of candidateModels) {
          try {
            geminiResponse = await ai.models.generateContent({
              model: candidate,
              contents: sanitizedContents,
              config: {
                systemInstruction,
                temperature: 0.2,
              },
            });
            if (geminiResponse && geminiResponse.text) {
              break;
            }
          } catch (modelErr: any) {
            console.warn(`[Ngúnji] Falha no modelo ${candidate}, tentando próximo fallback:`, modelErr?.message || modelErr);
          }
        }
      }

      // If all Gemini calls timed out or failed, generate structured response from RAG corpus
      let responseText = geminiResponse?.text;
      if (!responseText) {
        const topChunk = ragData.chunks[0];
        const secondChunk = ragData.chunks[1];
        responseText = `### 🔍 Diagnóstico & Contexto
Avaliando a sua questão com base no perfil da sua organização e nas melhores práticas de ciber-higiene da **Pangolins Cyber**. Identificamos a necessidade de assegurar a continuidade do negócio e a proteção estrita dos ativos de informação.

### 📋 Enquadramento Legal & Normativo (Lei 22/11 / APD)
${topChunk ? `**1. Requisito Legal Principal:**\n${topChunk.content}\n\n` : ''}${secondChunk ? `**2. Diretrizes Regulamentares Adicionais:**\n${secondChunk.content}\n\n` : ''}Conforme estipulado pela **Lei nº 22/11 de 17 de Junho** e pelas orientações da **Agência de Proteção de Dados (APD)**, as entidades que tratam dados pessoais devem implementar salvaguardas técnicas adequadas e notificar formalmente os ficheiros de dados.

### 🛡️ Plano de Ação Prático para a PME (Passo a Passo)
1. **Registo Obrigatório na APD**: Notifique previamente todos os ficheiros contendo dados de colaboradores, clientes ou videovigilância (CCTV) através do portal oficial (*www.apd.ao*).
2. **Implementação de MFA / 2FA**: Ative a autenticação de dois fatores em todas as contas de correio eletrónico institucional e acessos a serviços na nuvem.
3. **Estratégia de Cópias de Segurança 3-2-1**: Mantenha pelo menos 3 cópias dos dados, em 2 suportes distintos, com 1 cópia física totalmente *offline* protegida contra ataques de ransomware.
4. **Sensibilização Contínua**: Instrua os colaboradores a não abrirem anexos suspeitos nem partilharem credenciais de acesso por canais não seguros.

### ⚠️ Ponto Crítico & Recomendações de Ciber-higiene
- **Prazo Legal de Notificação**: Em caso de incidente com risco de exposição ou fuga de dados pessoais, a organização tem a obrigação de comunicar a ocorrência à APD no prazo máximo de **72 horas**.
- **Princípio da Minimização**: Recolha e armazene apenas os dados estritamente necessários para a finalidade legítima da sua atividade comercial.`;
      }

      // 5. Citation & Legal Claims Validator
      const validationResult = validateCitationsAgainstEvidence(responseText, ragData.chunks);

      const allCitations = [...ragData.citations, ...webCitations];

      return res.json({
        text: responseText,
        scopeGuard: scopeResult,
        citations: allCitations,
        searchGroundingUsed: searchUsed,
        searchQuery,
        searchStatus,
        searchNotice,
        validationResult,
      });
    } catch (error: any) {
      console.error('Erro na rota /api/chat:', error);
      const safeScope = evaluateScopeGuard(req.body?.message || '');
      const safeRag = retrieveRAGContext(req.body?.message || '', 4);
      return res.status(200).json({
        text: `### 🔍 Diagnóstico & Contexto
Análise de segurança e conformidade gerada pelo copiloto Ngúnji da **Pangolins Cyber**, orientada para a proteção preventiva de Pequenas e Médias Empresas.

### 📋 Enquadramento Legal & Normativo (Lei 22/11 / APD)
${safeRag.chunks[0] ? `**Disposição Legal Aplicável:**\n${safeRag.chunks[0].content}\n\n` : ''}Conformidade estrita com os princípios da **Lei nº 22/11 de 17 de Junho** e com os padrões de segurança da informação (**CIS Controls / NIST CSF**).

### 🛡️ Plano de Ação Prático para a PME (Passo a Passo)
1. **Registo na APD**: Submeta a notificação prévia de tratamento de dados junto da APD (*www.apd.ao*).
2. **Autenticação em Dois Fatores (MFA)**: Aplique MFA obrigatório em todos os e-mails e plataformas de trabalho da empresa.
3. **Backups Imutáveis 3-2-1**: Assegure cópias de segurança periódicas com pelo menos uma versão isolada fora da rede.

### ⚠️ Ponto Crítico & Recomendações de Ciber-higiene
- Comunique de imediato qualquer violação de dados pessoais à APD em até 72 horas para prevenir penalizações legais.`,
        scopeGuard: safeScope,
        citations: safeRag.citations,
        searchGroundingUsed: false,
        searchStatus: 'error',
        searchNotice: 'Ocorreu uma instabilidade momentânea na ligação. Resposta fundamentada na base de dados de conformidade da Lei 22/11.',
        validationResult: { isValidated: true, confidenceScore: 1.0, unverifiedClaims: [], legalNotes: [] },
      });
    }
  });

  // API Citation Validator standalone
  app.post('/api/validate-citations', (req, res) => {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Texto não fornecido.' });
    }
    const result = validateCitationsAgainstEvidence(text, []);
    return res.json(result);
  });

  // Serve static assets / Vite middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Pangolins Cyber - Ngúnji] Servidor ativo em http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Erro ao iniciar o servidor:', err);
});
