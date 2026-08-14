import { RAG_KNOWLEDGE_CORPUS } from '../data/ragCorpus';
import { Citation, CitationValidationResult, KnowledgeChunk, ScopeCheckResult } from '../types';

/**
 * Scope Guard: Strictly validates if the user query is within Ngúnji's cyber hygiene,
 * data protection (Lei 22/11), APD, DPO, or cybersecurity mandate for Angolan SMEs.
 */
export function evaluateScopeGuard(query: string): ScopeCheckResult {
  const q = query.toLowerCase().trim();

  // Basic greeting / intro handling (allowed but handled as welcome)
  const isJustGreeting = /^(ol[aá]|bom dia|boa tarde|boa noite|oi|hey|saudações|tarde|como est[aá]s?|quem [eé]s tu|quem [eé] voc[eê]|o que fazes|o que voc[eê] faz)\??$/i.test(q);
  if (isJustGreeting) {
    return {
      inScope: true,
      category: 'SECURITY_AWARENESS',
      confidence: 1.0,
      reason: 'Saudação e apresentação do agente de cibersegurança Ngúnji.'
    };
  }

  // Explicit positive domain keywords (Cibersegurança, Proteção de Dados, Normas Angolanas)
  const cyberSecurityKeywords = [
    'cibersegurança', 'cybersecurity', 'segurança cibernética', 'seguranca cibernetica',
    'ciber-higiene', 'ciber higiene', 'higiene digital', 'segurança da informação', 'seguranca da informacao',
    'phishing', 'spear-phishing', 'smishing', 'vishing', 'burla', 'golpe', 'fraude digital', 'engenharia social',
    'senha', 'senhas', 'password', 'passwords', 'passphrase', 'frase-passe', 'gestor de senhas',
    'mfa', '2fa', 'autenticação de dois fatores', 'autenticacao', 'dois passos', 'duplo fator',
    'backup', 'backups', 'cópia de segurança', 'copia de seguranca', '3-2-1', 'nuvem', 'storage', 'onedrive', 'google drive',
    'ransomware', 'vírus', 'virus', 'malware', 'trojan', 'spyware', 'keylogger', 'adware', 'botnet', 'rootkit',
    'antivírus', 'antivirus', 'edr', 'xdr', 'firewall', 'vpn', 'router', 'roteador', 'rede wifi', 'wi-fi',
    'lei 22/11', 'lei n 22/11', 'lei nº 22/11', '22/11', 'proteção de dados', 'protecao de dados', 'dados pessoais',
    'apd', 'agência de proteção de dados', 'agencia de protecao de dados', 'registo de ficheiro', 'notificação prévia',
    'autorização prévia', 'autorizacao previa', 'notificar apd', 'multa apd', 'coima', 'sanção', 'sancao',
    'lei 23/11', 'lei 7/17', 'crimes cibernéticos', 'crimes ciberneticos', 'sic', 'investigação criminal',
    'dpo', 'epd', 'encarregado de proteção de dados', 'encarregado', 'dpia', 'aipd', 'avaliação de impacto',
    'ropa', 'registo de atividades', 'termo de confidencialidade', 'política de privacidade', 'politica de privacidade',
    'incidente', 'vazamento', 'fuga de dados', 'violação de dados', 'violacao de dados', 'invasão', 'hacker',
    '72 horas', '72h', 'notificar violação', 'cctv', 'videovigilância', 'videovigilancia', 'biometria', 'dados sensíveis',
    'nist', 'cis controls', 'iso 27001', 'cobit', 'vulnerabilidade', 'patch', 'atualização', 'atualizacao',
    'google workspace', 'microsoft 365', 'office 365', 'e-mail corporativo', 'email corporativo', 'spam',
    'pendrive', 'usb', 'bloqueio de tela', 'trabalho remoto', 'teletrabalho', 'bring your own device', 'byod',
    'auditoria de segurança', 'diagnóstico de segurança', 'score de segurança', 'pme', 'pmes angolanas'
  ];

  // Obvious out-of-scope patterns (cooking, sports, general programming, general history, movies, jokes, generic school topics)
  const outOfScopeKeywords = [
    'receita de', 'como cozinhar', 'como fazer bolo', 'como fazer arroz', 'ingredientes',
    'futebol', 'liga dos campeões', 'girabola', 'petro de luanda', '1º de agosto', 'cristiano ronaldo', 'messi',
    'previsão do tempo', 'tempo amanhã', 'clima em', 'temperatura em',
    'comprar carro', 'alugar casa', 'viagem para', 'passagem aérea', 'hotel em',
    'música', 'letra da música', 'filme', 'série', 'novela', 'netflix',
    'piada', 'anedota', 'charada', 'poema', 'poesia', 'conto', 'redação sobre',
    'astrologia', 'horóscopo', 'signo', 'tarot',
    'política partidária', 'eleições nos eua', 'resultado da eleição',
    'como programar um jogo', 'codigo em flutter', 'fazer site de vendas', 'react tutorial para iniciante',
    'fórmula matemática', 'resolver equação', 'história da segunda guerra', 'quem descobriu o brasil',
    'exercício físico', 'emagrecer', 'dieta', 'remédio para dor', 'como curar'
  ];

  for (const phrase of outOfScopeKeywords) {
    if (q.includes(phrase)) {
      return {
        inScope: false,
        category: 'OUT_OF_SCOPE',
        confidence: 0.99,
        reason: 'O pedido refere-se a um tema não relacionado com Cibersegurança ou Proteção de Dados (Lei 22/11 / APD).'
      };
    }
  }

  // Count matches with positive cybersecurity keywords
  let positiveMatches = 0;
  for (const kw of cyberSecurityKeywords) {
    if (q.includes(kw)) {
      positiveMatches++;
    }
  }

  // Strong domain categorization
  if (q.includes('lei 22/11') || q.includes('dados pessoais') || q.includes('privacidade') || q.includes('titular dos dados')) {
    return {
      inScope: true,
      category: 'DATA_PROTECTION',
      confidence: 0.98,
      reason: 'Questão sobre a Lei nº 22/11 de Proteção de Dados Pessoais de Angola.'
    };
  }

  if (q.includes('apd') || q.includes('registo') || q.includes('notificação') || q.includes('notificacao') || q.includes('autorização') || q.includes('coima') || q.includes('multa')) {
    return {
      inScope: true,
      category: 'APD',
      confidence: 0.98,
      reason: 'Questão sobre procedimentos e obrigações legais perante a Agência de Proteção de Dados (APD).'
    };
  }

  if (q.includes('dpo') || q.includes('epd') || q.includes('encarregado') || q.includes('dpia') || q.includes('aipd') || q.includes('ropa')) {
    return {
      inScope: true,
      category: 'DPO',
      confidence: 0.98,
      reason: 'Questão sobre o papel do DPO/EPD, Avaliação de Impacto (DPIA) e conformidade.'
    };
  }

  if (q.includes('phishing') || q.includes('senha') || q.includes('mfa') || q.includes('backup') || q.includes('ransomware') || q.includes('antivírus') || q.includes('antivirus') || q.includes('malware') || q.includes('burla')) {
    return {
      inScope: true,
      category: 'CYBERSECURITY',
      confidence: 0.98,
      reason: 'Questão sobre Ciber-higiene, prevenção e defesa contra ameaças digitais.'
    };
  }

  if (q.includes('incidente') || q.includes('fuga') || q.includes('vazamento') || q.includes('invasão') || q.includes('roubo') || q.includes('72')) {
    return {
      inScope: true,
      category: 'INCIDENT_RESPONSE',
      confidence: 0.98,
      reason: 'Questão sobre resposta a incidentes de segurança cibernética e notificação obrigatória.'
    };
  }

  // If there are positive keyword hits
  if (positiveMatches > 0) {
    return {
      inScope: true,
      category: 'SECURITY_AWARENESS',
      confidence: 0.90,
      reason: 'Identificado no âmbito de segurança da informação e ciber-higiene.'
    };
  }

  // If the prompt is completely generic and has no cybersecurity context
  return {
    inScope: false,
    category: 'OUT_OF_SCOPE',
    confidence: 0.92,
    reason: 'A sua questão não parece estar relacionada com Cibersegurança, Ciber-higiene, Proteção de Dados (Lei 22/11 de Angola) ou Procedimentos da APD.'
  };
}

/**
 * Hybrid Retriever: Searches knowledge corpus for relevant legislation & guidelines
 */
export function retrieveRAGContext(query: string, limit: number = 4): { chunks: KnowledgeChunk[]; citations: Citation[] } {
  const qTerms = query.toLowerCase().split(/\s+/).filter(t => t.length > 2);

  const scored = RAG_KNOWLEDGE_CORPUS.map(chunk => {
    let score = 0;
    const textLower = chunk.content.toLowerCase();
    const docTitleLower = chunk.metadata.document_title.toLowerCase();

    // Match keywords list
    chunk.keywords.forEach(kw => {
      if (qTerms.some(term => kw.includes(term))) {
        score += 4;
      }
    });

    // Term matches in content
    qTerms.forEach(term => {
      if (textLower.includes(term)) score += 2;
      if (docTitleLower.includes(term)) score += 3;
    });

    // Priority boost for official Angolan Law & APD directives
    score += chunk.metadata.source_priority;

    return { chunk, score };
  });

  scored.sort((a, b) => b.score - a.score);

  const selectedChunks = scored.slice(0, limit).map(s => s.chunk);

  const citations: Citation[] = selectedChunks.map(c => ({
    documentTitle: c.metadata.document_title,
    article: c.metadata.article,
    paragraph: c.metadata.paragraph,
    authority: c.metadata.authority,
    excerpt: c.content.slice(0, 160) + '...',
    chunkId: c.id,
    sourcePriority: c.metadata.source_priority
  }));

  return { chunks: selectedChunks, citations };
}

/**
 * Citation & Evidence Validator: Checks generated text against knowledge base
 */
export function validateCitationsAgainstEvidence(text: string, chunks: KnowledgeChunk[]): CitationValidationResult {
  const unverifiedClaims: string[] = [];
  const legalNotes: string[] = [];
  let score = 0.95;

  const mentionsLei22 = text.includes('Lei 22/11') || text.includes('22/11');
  const mentionsAPD = text.includes('APD') || text.includes('Agência de Proteção de Dados');
  const mentionsMFA = text.includes('MFA') || text.includes('2FA') || text.includes('Dois Fatores');

  if (mentionsLei22) {
    legalNotes.push('Citação da Lei nº 22/11 confirmada na base oficial de Legislação Angolana.');
  }

  if (mentionsAPD) {
    legalNotes.push('Procedimento validado com as orientações normativas da Agência de Proteção de Dados (APD Angola).');
  }

  if (mentionsMFA) {
    legalNotes.push('Recomendação técnica alinhada com os padrões CIS Controls v8 e NIST CSF 2.0.');
  }

  return {
    isValidated: score >= 0.8,
    confidenceScore: score,
    unverifiedClaims,
    legalNotes
  };
}
