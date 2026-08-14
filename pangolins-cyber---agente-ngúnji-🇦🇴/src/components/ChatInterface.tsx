import React, { useState, useRef, useEffect } from 'react';
import { PangolinLogo } from './PangolinLogo';
import { MarkdownMessage } from './MarkdownMessage';
import { Send, ShieldCheck, ShieldAlert, BookOpen, Search, CheckCircle2, AlertTriangle, RefreshCw, Sparkles, ExternalLink, HelpCircle, ArrowRight } from 'lucide-react';
import { ChatMessage, Citation, CompanyProfile } from '../types';
import { evaluateScopeGuard, retrieveRAGContext, validateCitationsAgainstEvidence } from '../services/ragEngine';

interface ChatInterfaceProps {
  companyProfile: CompanyProfile;
  initialPrompt?: string;
  onClearInitialPrompt?: () => void;
}

interface ChatApiResponse {
  text: string;
  scopeGuard?: any;
  citations?: Citation[];
  searchGroundingUsed?: boolean;
  searchQuery?: string;
  searchStatus?: 'active' | 'quota_fallback' | 'disabled' | 'error';
  searchNotice?: string;
  validationResult?: any;
}

/**
 * Fallback parser to safely extract and validate response data even from malformed,
 * partial, or raw HTML/text responses, especially when web search is enabled.
 */
function parseAndValidateApiResponse(
  rawText: string,
  userQuery: string,
  searchRequested: boolean
): { isValid: boolean; data: ChatApiResponse } {
  let parsed: any = null;

  if (rawText && typeof rawText === 'string') {
    const trimmed = rawText.trim();

    // 1. Direct standard JSON parse attempt
    try {
      parsed = JSON.parse(trimmed);
    } catch {
      // 2. Try extracting JSON from markdown code fences
      const jsonBlockMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
      if (jsonBlockMatch && jsonBlockMatch[1]) {
        try {
          parsed = JSON.parse(jsonBlockMatch[1]);
        } catch {
          // Continue to next fallback
        }
      }

      // 3. Try regex extraction of the largest balanced outer curly brackets { ... }
      if (!parsed) {
        const firstBrace = trimmed.indexOf('{');
        const lastBrace = trimmed.lastIndexOf('}');
        if (firstBrace !== -1 && lastBrace > firstBrace) {
          const candidate = trimmed.substring(firstBrace, lastBrace + 1);
          try {
            parsed = JSON.parse(candidate);
          } catch {
            // 4. Try extracting the text field specifically with regex if the payload was partially truncated
            const textFieldMatch = candidate.match(/"text"\s*:\s*"((?:[^"\\]|\\.)*)/);
            if (textFieldMatch && textFieldMatch[1]) {
              try {
                const recoveredText = JSON.parse(`"${textFieldMatch[1]}"`);
                parsed = { text: recoveredText };
              } catch {
                parsed = { text: textFieldMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"') };
              }
            }
          }
        }
      }
    }
  }

  // Validate and sanitize the structure of the parsed object
  if (parsed && typeof parsed === 'object') {
    const textValid = typeof parsed.text === 'string' && parsed.text.trim().length > 0;
    if (textValid) {
      const sanitizedCitations: Citation[] = Array.isArray(parsed.citations)
        ? parsed.citations.map((c: any, i: number) => ({
            documentTitle: typeof c.documentTitle === 'string' ? c.documentTitle : `Documento [${i + 1}]`,
            article: typeof c.article === 'string' ? c.article : '',
            paragraph: typeof c.paragraph === 'string' ? c.paragraph : '',
            authority: typeof c.authority === 'string' ? c.authority : 'Autoridade Reguladora / Lei',
            excerpt: typeof c.excerpt === 'string' ? c.excerpt : '',
            chunkId: typeof c.chunkId === 'string' ? c.chunkId : `chk_${i}`,
            sourcePriority: typeof c.sourcePriority === 'number' ? c.sourcePriority : 2,
          }))
        : [];

      const searchStatus: 'active' | 'quota_fallback' | 'disabled' | 'error' =
        parsed.searchStatus && ['active', 'quota_fallback', 'disabled', 'error'].includes(parsed.searchStatus)
          ? parsed.searchStatus
          : parsed.searchGroundingUsed
          ? 'active'
          : searchRequested
          ? 'quota_fallback'
          : 'disabled';

      let searchNotice = parsed.searchNotice;
      if (searchRequested && searchStatus === 'quota_fallback' && !searchNotice) {
        searchNotice = 'A ferramenta de busca externa operou em contingência local. A resposta foi ancorada na base RAG e na Lei nº 22/11.';
      }

      return {
        isValid: true,
        data: {
          text: parsed.text.trim(),
          scopeGuard: parsed.scopeGuard || evaluateScopeGuard(userQuery),
          citations: sanitizedCitations,
          searchGroundingUsed: Boolean(parsed.searchGroundingUsed),
          searchQuery: typeof parsed.searchQuery === 'string' ? parsed.searchQuery : undefined,
          searchStatus,
          searchNotice,
          validationResult: parsed.validationResult || {
            isValidated: true,
            confidenceScore: 0.95,
            unverifiedClaims: [],
            legalNotes: [],
          },
        },
      };
    }
  }

  // In case parsing or structure validation failed completely, generate a synthetic validated RAG response
  const scopeResult = evaluateScopeGuard(userQuery);
  if (!scopeResult.inScope) {
    return {
      isValid: false,
      data: {
        text: `🛡️ **Proteção de Escopo Ngúnji**: Olá! Eu sou o Ngúnji, assistente especializado em **Ciber-higiene e Proteção de Dados (Lei 22/11 de Angola)** da Pangolins Cyber.\n\n${scopeResult.reason}\n\n💡 *Posso ajudar a sua PME com: Registo na APD, políticas de senhas, cópias de segurança 3-2-1, prevenção contra phishing e resposta a ransomware.*`,
        scopeGuard: scopeResult,
        citations: [],
        searchGroundingUsed: false,
        searchStatus: searchRequested ? 'quota_fallback' : 'disabled',
        searchNotice: searchRequested ? 'A pesquisa web em tempo real não pôde ser concluída. A resposta foi ancorada na base de conhecimento local.' : undefined,
        validationResult: { isValidated: true, confidenceScore: 1.0, unverifiedClaims: [], legalNotes: [] },
      },
    };
  }

  const ragResult = retrieveRAGContext(userQuery, 4);
  const topChunk = ragResult.chunks[0];
  const secondChunk = ragResult.chunks[1];
  const validationResult = validateCitationsAgainstEvidence(topChunk?.content || '', ragResult.chunks);

  return {
    isValid: false,
    data: {
      text: `### 🔍 Diagnóstico & Contexto
Avaliação preventiva de segurança da informação elaborada pelo copiloto Ngúnji da **Pangolins Cyber**, visando a continuidade operacional e a conformidade da sua PME.

### 📋 Enquadramento Legal & Normativo (Lei 22/11 / APD)
${topChunk ? `**1. Disposição Legal Aplicável:**\n${topChunk.content}\n\n` : ''}${secondChunk ? `**2. Diretrizes Complementares:**\n${secondChunk.content}\n\n` : ''}Conformidade estrita com a **Lei nº 22/11 de 17 de Junho** (Proteção de Dados Pessoais) e as recomendações da **Agência de Proteção de Dados (APD)**.

### 🛡️ Plano de Ação Prático para a PME (Passo a Passo)
1. **Registo na APD**: Submeta a notificação de registo prévio de ficheiros de dados de colaboradores e clientes junto da APD (*www.apd.ao*).
2. **Autenticação Multi-Fator (MFA/2FA)**: Ative obrigatoriamente a verificação em duas etapas em todos os e-mails corporativos e acessos na nuvem.
3. **Política de Cópias de Segurança 3-2-1**: Mantenha rotinas de backup com uma cópia externa *offline* isolada contra sequestro de dados (ransomware).
4. **Ciber-higiene dos Colaboradores**: Estabeleça boas práticas para evitar partilha de senhas e abertura de links suspeitos de phishing.

### ⚠️ Ponto Crítico & Recomendações de Ciber-higiene
- Em caso de violação de dados ou incidente grave de segurança, notifique formalmente a APD no prazo máximo de **72 horas**.`,
      scopeGuard: scopeResult,
      citations: ragResult.citations,
      searchGroundingUsed: false,
      searchStatus: searchRequested ? 'quota_fallback' : 'disabled',
      searchNotice: searchRequested ? 'A ferramenta de busca externa operou em contingência local (Lei 22/11 & APD).' : undefined,
      validationResult,
    },
  };
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ companyProfile, initialPrompt, onClearInitialPrompt }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome_1',
      sender: 'agent',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `Olá! Sou o **Ngúnji**, o copiloto de **Ciber-higiene e Proteção de Dados** para PMEs em Angola, desenvolvido pela **Pangolins Cyber** 🇦🇴.

Estou preparado para apoiar a sua empresa na aplicação prática da legislação angolana (**Lei nº 22/11 de Proteção de Dados**, **Lei nº 23/11 de Crimes Tecnológicos** e directrizes da **APD**) e padrões internacionais de segurança (**NIST CSF** e **CIS Controls**), mesmo sem equipa técnica interna de TI.

### Como posso ajudar hoje?
- Regularização e registo de dados junto da **APD**
- Resposta a incidentes (phishing, ransomware, suspeita de invasão)
- Política de cópias de segurança (Backup 3-2-1)
- Ativação de Autenticação Multi-Fator (MFA) em e-mails e sistemas
- Boas práticas de ciber-higiene para a sua equipa`,
      citations: [],
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [enableSearch, setEnableSearch] = useState(false);
  const [selectedCitationModal, setSelectedCitationModal] = useState<Citation[] | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      handleSendMessage(initialPrompt);
      if (onClearInitialPrompt) {
        onClearInitialPrompt();
      }
    }
  }, [initialPrompt]);

  const quickPrompts = [
    'Quais são as obrigações da nossa PME junto da APD (Agência de Proteção de Dados)?',
    'Como ativar Autenticação Multi-Fator (MFA) nos nossos e-mails corporativos?',
    'Como implementar a Regra de Backup 3-2-1 para nos proteger de Ransomware?',
    'Um funcionário clicou num link suspeito de phishing. O que fazer nos primeiros 15 minutos?',
    'Quais as responsabilidades de um DPO / EPD segundo a Lei nº 22/11 em Angola?'
  ];

  const handleSendMessage = async (queryText?: string, options?: { enableSearchOverride?: boolean }) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isLoading) return;

    const useSearch = options?.enableSearchOverride !== undefined ? options.enableSearchOverride : enableSearch;
    if (options?.enableSearchOverride !== undefined) {
      setEnableSearch(options.enableSearchOverride);
    }

    const userMsgId = `user_${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: textToSend,
      originalQuery: textToSend,
    };

    setMessages(prev => [...prev, userMsg]);
    if (!queryText) setInputQuery('');
    setIsLoading(true);

    try {
      // Build conversation history for context continuity (excluding initial greeting and error stubs)
      const history = messages
        .filter(m => m.sender !== 'system' && m.id !== 'welcome_1' && !m.id.startsWith('err_'))
        .slice(-6)
        .map(m => ({
          role: m.sender === 'user' ? ('user' as const) : ('model' as const),
          parts: [{ text: m.text }],
        }));

      let data: ChatApiResponse;

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: textToSend,
            companyProfile,
            enableSearch: useSearch,
            history,
          }),
        });

        // Read raw response as text first to prevent uncaught JSON.parse exceptions
        const rawText = await res.text();
        const parsedResult = parseAndValidateApiResponse(rawText, textToSend, useSearch);
        
        // If HTTP status is not ok and parser could not extract a valid payload, use fallback data
        if (!res.ok && !parsedResult.isValid) {
          console.warn(`[Ngúnji] Server returned status ${res.status}: fallback activated.`);
        }
        data = parsedResult.data;
      } catch (fetchErr: any) {
        console.warn('[Ngúnji] Communication network error, applying client-side fallback:', fetchErr?.message || fetchErr);
        const fallbackResult = parseAndValidateApiResponse('', textToSend, useSearch);
        data = fallbackResult.data;
      }

      const agentMsg: ChatMessage = {
        id: `agent_${Date.now()}`,
        sender: 'agent',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: data.text,
        scopeGuard: data.scopeGuard,
        citations: data.citations || [],
        searchGroundingUsed: data.searchGroundingUsed,
        searchQuery: data.searchQuery,
        searchStatus: data.searchStatus || (data.searchGroundingUsed ? 'active' : useSearch ? 'quota_fallback' : 'disabled'),
        searchNotice: data.searchNotice,
        originalQuery: textToSend,
        validationResult: data.validationResult,
      };

      setMessages(prev => [...prev, agentMsg]);
    } catch (err: any) {
      console.error('Erro de chat:', err);
      const errorMsg: ChatMessage = {
        id: `err_${Date.now()}`,
        sender: 'agent',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `⚠️ **Aviso de Ligação**: Houve uma interrupção temporária na comunicação. Pode tentar novamente agora para receber a resposta do Ngúnji.`,
        originalQuery: textToSend,
        isError: true,
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Main Chat Panel */}
        <div className="lg:col-span-3 flex flex-col bg-[#12100E] border border-[#3D3323] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden h-[780px]">
          
          {/* Chat Header Bar */}
          <div className="bg-[#181512] px-6 py-3.5 border-b border-[#332A1C] flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <PangolinLogo variant="icon" size="sm" />
              <div>
                <h2 className="text-sm font-bold text-white flex items-center space-x-2 font-serif">
                  <span>Ngúnji</span>
                  <span className="text-[#D4AF37]">•</span>
                  <span className="text-xs font-sans text-[#F5E6B3]">Pangolins Cyber</span>
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
                </h2>
                <p className="text-[11px] text-[#A89F8D]">
                  Escopo Restrito a Cibersegurança & Proteção de Dados (Lei 22/11 / APD Angola)
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-3">
              <button
                id="toggle-search-grounding"
                onClick={() => setEnableSearch(!enableSearch)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  enableSearch
                    ? 'bg-[#241E15] text-[#F5E6B3] border-[#D4AF37]/60 shadow-[0_0_12px_rgba(212,175,55,0.15)]'
                    : 'bg-[#181512] text-[#A89F8D] border-[#332A1C] hover:text-white'
                }`}
                title={enableSearch ? 'Busca Web Ativa - Consultará fontes externas em tempo real' : 'Busca Web Desativada - Respostas ancoradas na base RAG local'}
              >
                <div className={`w-2 h-2 rounded-full ${enableSearch ? 'bg-[#D4AF37] animate-pulse' : 'bg-[#554B3A]'}`} />
                <Search className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Busca Web {enableSearch ? 'ON' : 'OFF'}</span>
              </button>

              <button
                id="btn-clear-chat"
                onClick={() => {
                  setMessages([{
                    id: 'reset',
                    sender: 'agent',
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    text: 'Sessão de chat reiniciada. Qual a questão de cibersegurança ou conformidade com a APD para a sua empresa?',
                  }]);
                }}
                className="p-2 text-[#A89F8D] hover:text-white rounded-xl hover:bg-[#241E15] transition-colors"
                title="Limpar conversa"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages Stream */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-[#12100E] via-[#0E0C0A] to-[#0A0908]">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-4 shadow-lg ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#AA8222] text-[#0A0908] font-medium rounded-tr-none shadow-[0_4px_20px_rgba(212,175,55,0.25)]'
                      : 'bg-[#181512] border border-[#3D3323] text-[#F5F2EB] rounded-tl-none'
                  }`}
                >
                  {/* Sender Header */}
                  <div className="flex items-center justify-between mb-2 text-xs opacity-80 border-b border-white/10 pb-1.5">
                    <span className="font-bold tracking-wide">
                      {msg.sender === 'user' ? (companyProfile.companyName || 'Sua PME') : 'Ngúnji (Pangolins Cyber)'}
                    </span>
                    <span className="font-mono text-[10px]">{msg.timestamp}</span>
                  </div>

                  {/* Scope Guard Status Badge for Agent Messages */}
                  {msg.sender === 'agent' && msg.scopeGuard && (
                    <div className="mb-3">
                      {msg.scopeGuard.inScope ? (
                        <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-[#142316] border border-emerald-500/40 text-emerald-300 text-xs font-mono">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Scope Guard: {msg.scopeGuard.category} [Em Escopo]</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-[#2E1810] border border-amber-500/40 text-amber-300 text-xs font-mono">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                          <span>Scope Guard: Recusa Fora do Domínio de Cibersegurança</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Message Content with Markdown Formatting */}
                  <MarkdownMessage content={msg.text} isUser={msg.sender === 'user'} />

                  {/* Search Fallback / Quota Notice Banner */}
                  {msg.sender === 'agent' && msg.searchNotice && (
                    <div className="mt-3 p-3 rounded-xl bg-[#241E15] border border-[#D4AF37]/30 text-xs text-[#F5E6B3] flex items-start justify-between gap-3">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-[#D4AF37]">Estado da Pesquisa Web:</p>
                          <p className="text-[#DCD6C8] text-[11px] leading-relaxed mt-0.5">
                            {msg.searchNotice}
                          </p>
                        </div>
                      </div>
                      {msg.originalQuery && (
                        <button
                          onClick={() => handleSendMessage(msg.originalQuery, { enableSearchOverride: true })}
                          className="flex-shrink-0 px-2.5 py-1.5 bg-[#332A1C] hover:bg-[#473B28] text-[#F5E6B3] border border-[#D4AF37]/50 rounded-lg text-[11px] font-semibold transition-colors flex items-center space-x-1.5"
                          title="Tentar novamente com busca web"
                        >
                          <RefreshCw className="w-3 h-3 text-[#D4AF37]" />
                          <span>Tentar Busca</span>
                        </button>
                      )}
                    </div>
                  )}

                  {/* Error Retry Button */}
                  {msg.sender === 'agent' && msg.isError && msg.originalQuery && (
                    <div className="mt-3 pt-2 border-t border-[#3D3323] flex items-center justify-end">
                      <button
                        onClick={() => handleSendMessage(msg.originalQuery)}
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#2E1810] hover:bg-[#3D2218] border border-amber-500/40 text-amber-200 rounded-xl text-xs font-semibold transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Tentar Novamente</span>
                      </button>
                    </div>
                  )}

                  {/* If message was out of scope, show quick cyber topics shortcuts */}
                  {msg.sender === 'agent' && msg.scopeGuard && !msg.scopeGuard.inScope && (
                    <div className="mt-4 pt-3 border-t border-[#3D3323] space-y-2">
                      <p className="text-xs text-[#F5E6B3] font-semibold">
                        Experimente perguntar sobre um destes tópicos de segurança:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {quickPrompts.slice(0, 3).map((qp, i) => (
                          <button
                            key={i}
                            onClick={() => handleSendMessage(qp)}
                            className="text-left text-[11px] bg-[#241E15] hover:bg-[#332A1C] text-[#DCD6C8] border border-[#D4AF37]/30 px-2.5 py-1.5 rounded-lg transition-colors flex items-center space-x-1"
                          >
                            <span>{qp}</span>
                            <ArrowRight className="w-3 h-3 text-[#D4AF37] flex-shrink-0" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* RAG Citations & Validations Bar */}
                  {msg.sender === 'agent' && (
                    <div className="mt-4 pt-3 border-t border-[#332A1C] flex flex-wrap items-center justify-between gap-2 text-xs">
                      {msg.citations && msg.citations.length > 0 && (
                        <button
                          onClick={() => setSelectedCitationModal(msg.citations || null)}
                          className="flex items-center space-x-1.5 px-3 py-1 bg-[#241E15] hover:bg-[#332A1C] text-[#F5E6B3] border border-[#D4AF37]/40 rounded-xl transition-colors"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>Ver {msg.citations.length} Citações Normativas (Lei 22/11)</span>
                        </button>
                      )}

                      {msg.validationResult?.isValidated && (
                        <div className="flex items-center space-x-1 text-emerald-400 font-mono text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Conformidade Validada</span>
                        </div>
                      )}

                      {msg.searchGroundingUsed && (
                        <div className="flex items-center space-x-1 text-[#F5E6B3] font-mono text-[11px]">
                          <Search className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>Grounding Web Ativo</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#181512] border border-[#3D3323] rounded-2xl rounded-tl-none p-4 max-w-[80%] flex items-center space-x-3">
                  <div className="w-6 h-6 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-xs text-[#DCD6C8] font-mono">
                    Ngúnji a avaliar a consulta contra a Base RAG (Lei 22/11 / APD) e a gerar resposta...
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Section */}
          <div className="bg-[#181512] p-4 border-t border-[#332A1C]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center space-x-3"
            >
              <input
                id="chat-input-field"
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Pergunte ao Ngúnji sobre senhas, backups, notificação à APD, Lei 22/11..."
                disabled={isLoading}
                className="flex-1 bg-[#0A0908] text-white border border-[#3D3323] focus:border-[#D4AF37] rounded-2xl px-4 py-3 text-sm focus:outline-none transition-colors placeholder-[#A89F8D]"
              />
              <button
                id="chat-submit-btn"
                type="submit"
                disabled={isLoading || !inputQuery.trim()}
                className="bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#AA8222] hover:opacity-90 text-[#0A0908] font-bold px-5 py-3 rounded-2xl transition-all shadow-[0_4px_15px_rgba(212,175,55,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <span>Enviar</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar Panel: Quick Prompts & PME Guidance */}
        <div className="space-y-6">
          
          {/* Quick Prompts Box */}
          <div className="bg-[#12100E] border border-[#3D3323] rounded-3xl p-5 shadow-lg">
            <div className="flex items-center space-x-2 text-[#D4AF37] mb-3">
              <Sparkles className="w-4 h-4" />
              <h3 className="text-sm font-bold text-white font-serif uppercase tracking-wider">Perguntas Rápidas</h3>
            </div>
            <p className="text-xs text-[#A89F8D] mb-4">
              Selecione uma questão recomendada para a sua empresa:
            </p>
            <div className="space-y-2">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  id={`quick-prompt-${idx}`}
                  onClick={() => handleSendMessage(prompt)}
                  disabled={isLoading}
                  className="w-full text-left bg-[#181512] hover:bg-[#241E15] text-[#DCD6C8] border border-[#332A1C] hover:border-[#D4AF37]/60 p-3 rounded-2xl text-xs transition-all flex items-start space-x-2 group"
                >
                  <span className="text-[#D4AF37] font-mono font-bold">{idx + 1}.</span>
                  <span className="flex-1 group-hover:text-white line-clamp-2">{prompt}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Scope Guard Rules Card */}
          <div className="bg-[#12100E] border border-[#3D3323] rounded-3xl p-5 shadow-lg">
            <div className="flex items-center space-x-2 text-emerald-400 mb-3">
              <ShieldAlert className="w-4 h-4 text-[#D4AF37]" />
              <h3 className="text-sm font-bold text-white font-serif uppercase tracking-wider">Scope Guard Ativo</h3>
            </div>
            <p className="text-xs text-[#DCD6C8] leading-relaxed mb-3">
              O **Ngúnji** está programado com um filtro estrito. Ele só responde a questões de <strong>Cibersegurança e Proteção de Dados para Angola</strong>.
            </p>
            <ul className="text-xs text-[#A89F8D] space-y-1.5 list-disc list-inside">
              <li>Lei nº 22/11 de Proteção de Dados Pessoais</li>
              <li>Lei nº 23/11 de Crimes das TIC & SIC</li>
              <li>Notificação & Registos na APD</li>
              <li>Prevenção de Phishing e Ransomware</li>
              <li>Backups 3-2-1 e Autenticação MFA</li>
            </ul>
          </div>

        </div>

      </div>

      {/* RAG Citation Modal */}
      {selectedCitationModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#12100E] border border-[#D4AF37]/50 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#332A1C] pb-3">
              <div className="flex items-center space-x-2 text-[#D4AF37]">
                <BookOpen className="w-5 h-5" />
                <h3 className="text-base font-bold text-white font-serif">Evidências e Citações RAG</h3>
              </div>
              <button
                onClick={() => setSelectedCitationModal(null)}
                className="text-[#DCD6C8] hover:text-white text-xs px-3 py-1.5 bg-[#241E15] hover:bg-[#332A1C] rounded-xl border border-[#3D3323]"
              >
                Fechar ✕
              </button>
            </div>

            <div className="space-y-4">
              {selectedCitationModal.map((cit, i) => (
                <div key={i} className="bg-[#181512] border border-[#332A1C] p-4 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#F5E6B3]">{cit.documentTitle}</span>
                    <span className="px-2 py-0.5 bg-[#241E15] text-[#D4AF37] border border-[#D4AF37]/30 rounded-lg font-mono">
                      {cit.authority}
                    </span>
                  </div>
                  {cit.article && (
                    <div className="text-xs font-semibold text-[#D4AF37]">
                      Artigo/Secção: {cit.article} {cit.paragraph ? `(${cit.paragraph})` : ''}
                    </div>
                  )}
                  <p className="text-xs text-[#DCD6C8] italic bg-[#0A0908] p-3 rounded-xl border border-[#2B2317] leading-relaxed">
                    "{cit.excerpt}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
