"""
Agente Ngúnji em Python - Pangolins Cyber 🇦🇴
Copiloto de Ciber-higiene e Proteção de Dados (Lei nº 22/11 de Angola e APD)
"""

import os
import json
from typing import List, Dict, Any, Optional

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

from .rag_engine import (
    evaluate_scope_guard,
    retrieve_rag_context,
    validate_citations,
    ScopeCheckResult,
    Citation,
    CitationValidationResult
)

try:
    from pydantic import BaseModel, Field
    class CompanyProfile(BaseModel):
        name: str = "PME Angolana"
        sector: str = "Comércio / Serviços"
        employees: int = 15
        has_customer_data: bool = True
        has_employee_data: bool = True
        uses_cloud: bool = True
        has_cctv: bool = False
        registered_with_apd: bool = False

    class AgentResponse(BaseModel):
        text: str
        scope_guard: ScopeCheckResult
        citations: List[Citation] = Field(default_factory=list)
        search_grounding_used: bool = False
        search_query: Optional[str] = None
        validation_result: Optional[CitationValidationResult] = None

except ImportError:
    from dataclasses import dataclass, field, asdict

    @dataclass
    class CompanyProfile:
        name: str = "PME Angolana"
        sector: str = "Comércio / Serviços"
        employees: int = 15
        has_customer_data: bool = True
        has_employee_data: bool = True
        uses_cloud: bool = True
        has_cctv: bool = False
        registered_with_apd: bool = False

        def model_dump(self):
            return asdict(self)

    @dataclass
    class AgentResponse:
        text: str
        scope_guard: ScopeCheckResult
        citations: List[Citation] = field(default_factory=list)
        search_grounding_used: bool = False
        search_query: Optional[str] = None
        validation_result: Optional[CitationValidationResult] = None

        def model_dump(self):
            return asdict(self)


class NgunjiAgent:
    """
    Agente Ngúnji em Python para Conformidade Legal Angolana e Ciber-higiene.
    """

    SYSTEM_INSTRUCTION = """Você é o **NGÚNJI**, Consultor Sénior Especialista em Ciber-higiene, Segurança da Informação e Proteção de Dados para Pequenas e Médias Empresas (PMEs) em Angola, desenvolvido pela **Pangolins Cyber** 🇦🇴.

PROIBIÇÃO RIGOROSA DE RESPOSTAS BREVES OU MONOSSILÁBICAS:
- NUNCA emita respostas curtas de uma única palavra, nomes isolados (como "Luanda", "Sim", "Não", "Ok") ou frases telegráficas sem substância.
- Toda e qualquer intervenção deve ser uma orientação de consultoria completa, aprofundada, estruturada e de alto valor prático para a empresa.
- NÃO repita nem ecoe a localização/província da empresa desnecessariamente.

TOM E POSTURA DE CONSULTOR:
- Tom estritamente profissional, cortês, pedagógico, encorajador e adaptado à realidade operacional de uma PME sem equipa técnica especializada.
- Linguagem em Português de Angola formal e executivo, com rigor técnico e jurídico.
- Toda a orientação deve ser compreensível para diretores, gestores e colaboradores não técnicos.

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
"""

    def __init__(self, api_key: Optional[str] = None, model: str = "gemini-3.7-flash"):
        self.api_key = api_key or os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
        self.model_name = model
        self.client = None
        self._init_client()

    def _init_client(self):
        """Inicializa o cliente do Google GenAI."""
        if not self.api_key:
            return

        try:
            from google import genai
            self.client = genai.Client(api_key=self.api_key)
        except ImportError:
            try:
                import google.generativeai as genai_legacy
                genai_legacy.configure(api_key=self.api_key)
                self.client = genai_legacy
            except ImportError:
                self.client = None

    def _call_gemini_rest_api(self, message: str, system_instruction: str, enable_web_search: bool = False) -> str:
        """Chamada directa via urllib para a API do Gemini (sem necessidade de SDK instalado)."""
        import urllib.request
        import urllib.error

        # Standard Gemini endpoint
        endpoint = f"https://generativelanguage.googleapis.com/v1beta/models/{self.model_name}:generateContent?key={self.api_key}"
        
        payload: Dict[str, Any] = {
            "system_instruction": {
                "parts": [{"text": system_instruction}]
            },
            "contents": [
                {
                    "role": "user",
                    "parts": [{"text": message}]
                }
            ],
            "generationConfig": {
                "temperature": 0.2
            }
        }

        if enable_web_search:
            payload["tools"] = [{"googleSearch": {}}]

        data = json.dumps(payload).encode("utf-8")
        req = urllib.request.Request(
            endpoint,
            data=data,
            headers={"Content-Type": "application/json"}
        )

        try:
            with urllib.request.urlopen(req, timeout=60) as response:
                res_data = json.loads(response.read().decode("utf-8"))
                candidates = res_data.get("candidates", [])
                if candidates and "content" in candidates[0]:
                    parts = candidates[0]["content"].get("parts", [])
                    if parts and "text" in parts[0]:
                        return parts[0]["text"]
                return "Não foi possível extrair a resposta do modelo."
        except urllib.error.HTTPError as e:
            # If search failed (e.g. 429 or 400), try fallback without tools
            if enable_web_search:
                return self._call_gemini_rest_api(message, system_instruction, enable_web_search=False)
            
            # If 503 or model busy, try fallback model
            if e.code in (503, 429, 404) and self.model_name != "gemini-3.1-flash-lite":
                original_model = self.model_name
                self.model_name = "gemini-3.1-flash-lite"
                try:
                    res = self._call_gemini_rest_api(message, system_instruction, enable_web_search=False)
                    return res
                finally:
                    self.model_name = original_model

            error_body = e.read().decode("utf-8") if e.fp else str(e)
            return f"Erro na API Gemini ({e.code}): {error_body}"
        except Exception as e:
            # Em caso de timeout ou instabilidade de rede, fornece resposta sintetizada a partir do RAG
            return (
                f"🛡️ **Ngúnji (Pangolins Cyber - Síntese Jurídica e Técnica):**\n\n"
                f"Devido a latência na rede com o serviço de IA, aqui está a orientação extraída diretamente da base normativa:\n\n"
                f"1. **Lei nº 22/11 (Art. 28º)**: A sua organização deve manter medidas técnicas e organizativas (como encriptação, gestão de acessos e antivírus ativo) para evitar acessos ilícitos ou perda de dados.\n"
                f"2. **Registo na APD**: Tratamento de dados de trabalhadores, clientes e videovigilância (CCTV) exige declaração prévia junto da APD (www.apd.ao).\n"
                f"3. **Ciber-higiene**: Ative a autenticação de dois fatores (MFA) em todas as contas e mantenha a regra de backup 3-2-1 (com uma cópia offline/air-gapped)."
            )

    def ask(
        self,
        message: str,
        company_profile: Optional[CompanyProfile] = None,
        history: Optional[List[Dict[str, Any]]] = None,
        enable_web_search: bool = False
    ) -> AgentResponse:
        """
        Processa uma pergunta através do pipeline do Ngúnji:
        1. Scope Guard (Validação de escopo estrito)
        2. Recuperação RAG (Legislação Angolana e Normas)
        3. Enriquecimento de Contexto do Perfil da PME
        4. Geração com Gemini
        5. Validação de Citações
        """
        # 1. Scope Guard
        scope_result = evaluate_scope_guard(message)
        if not scope_result.in_scope:
            return AgentResponse(
                text=(
                    f"🛡️ **Proteção de Escopo Ngúnji**: Olá! Eu sou o assistente especializado em **Ciber-higiene "
                    f"e Proteção de Dados (Lei 22/11 de Angola)** da Pangolins Cyber.\n\n"
                    f"{scope_result.reason}\n\n"
                    f"💡 *Posso ajudar com: Conformidade com a APD, política de senhas, backups 3-2-1, "
                    f"prevenção contra phishing, contratos de confidencialidade e resposta a incidentes.*"
                ),
                scope_guard=scope_result,
                citations=[]
            )

        # 2. Recuperação RAG
        rag_chunks, citations = retrieve_rag_context(message, limit=4)
        rag_context_text = "\n\n".join([
            f"--- [DOCUMENTO NORMATIVO {i+1}: {c['metadata']['document_title']} (Art. {c['metadata'].get('article', 'N/A')})] ---\n{c['content']}"
            for i, c in enumerate(rag_chunks)
        ])

        # 3. Contexto do Perfil da Empresa
        profile = company_profile or CompanyProfile()
        profile_context = (
            f"CONTEXTO OPERACIONAL DA EMPRESA:\n"
            f"- Nome: {profile.name}\n"
            f"- Sector: {profile.sector} | Funcionários: {profile.employees}\n"
            f"- Trata dados de clientes: {'Sim' if profile.has_customer_data else 'Não'}\n"
            f"- Trata dados de trabalhadores: {'Sim' if profile.has_employee_data else 'Não'}\n"
            f"- Usa serviços Cloud (Office 365/Google Workspace): {'Sim' if profile.uses_cloud else 'Não'}\n"
            f"- Possui CCTV (Câmaras): {'Sim' if profile.has_cctv else 'Não'}\n"
            f"- Já registou tratamentos na APD: {'Sim (Regularizada)' if profile.registered_with_apd else 'Não (Pendente de Registo Obrigatório)'}"
        )

        full_system_instruction = (
            f"{self.SYSTEM_INSTRUCTION}\n\n"
            f"BASE DE EVIDÊNCIA NORMATIVA E JURÍDICA (RAG):\n"
            f"{rag_context_text}\n\n"
            f"{profile_context}"
        )

        # 4. Geração com Gemini (SDK ou REST Fallback)
        response_text = ""
        search_used = False
        search_query = None

        if not self.api_key:
            # Resposta estruturada offline caso a chave não esteja configurada
            top_chunk = rag_chunks[0] if rag_chunks else None
            response_text = (
                f"🛡️ **Ngúnji (Modo Offline RAG)**: \n\n"
                f"Para activar a inteligência generativa completa em tempo real, configure a variável de ambiente `GEMINI_API_KEY`.\n\n"
                f"**Informação Normativa Relevante da Base de Conhecimento:**\n"
            )
            if top_chunk:
                response_text += f"📜 *{top_chunk['metadata']['document_title']}*:\n> {top_chunk['content']}"
        else:
            # Tentar primeiro via SDK oficial se instalado
            used_sdk = False
            try:
                from google import genai
                client = genai.Client(api_key=self.api_key)
                try:
                    if enable_web_search:
                        gemini_res = client.models.generate_content(
                            model=self.model_name,
                            contents=message,
                            config={
                                "system_instruction": full_system_instruction,
                                "temperature": 0.2,
                                "tools": [{"google_search": {}}],
                            }
                        )
                        search_used = True
                    else:
                        gemini_res = client.models.generate_content(
                            model=self.model_name,
                            contents=message,
                            config={
                                "system_instruction": full_system_instruction,
                                "temperature": 0.2,
                            }
                        )
                except Exception:
                    gemini_res = client.models.generate_content(
                        model=self.model_name,
                        contents=message,
                        config={
                            "system_instruction": full_system_instruction,
                            "temperature": 0.2,
                        }
                    )
                response_text = gemini_res.text or "Não foi possível gerar a resposta."
                used_sdk = True
            except ImportError:
                pass

            # Se o SDK não estiver instalado ou falhou a importação, usa REST direto com urllib
            if not used_sdk:
                response_text = self._call_gemini_rest_api(
                    message=message,
                    system_instruction=full_system_instruction,
                    enable_web_search=enable_web_search
                )

        # 5. Validação de Citações
        validation_res = validate_citations(response_text, rag_chunks)

        return AgentResponse(
            text=response_text,
            scope_guard=scope_result,
            citations=citations,
            search_grounding_used=search_used,
            search_query=search_query,
            validation_result=validation_res
        )
