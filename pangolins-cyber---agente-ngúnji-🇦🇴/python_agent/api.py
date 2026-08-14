"""
Servidor REST FastAPI para o Agente Ngúnji
Pangolins Cyber 🇦🇴
"""

from typing import List, Optional, Dict, Any
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from .agent import NgunjiAgent, CompanyProfile, AgentResponse
from .rag_engine import evaluate_scope_guard, retrieve_rag_context

app = FastAPI(
    title="Ngúnji Cyber Copilot API",
    description="API do Agente Ngúnji para Proteção de Dados e Ciber-higiene em Angola (Pangolins Cyber)",
    version="1.0.0"
)

# Habilitar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

agent = NgunjiAgent()


class ChatRequest(BaseModel):
    message: str = Field(..., example="Quais os procedimentos para registar dados na APD?")
    company_profile: Optional[CompanyProfile] = None
    enable_web_search: bool = False
    history: Optional[List[Dict[str, Any]]] = None


class ScopeRequest(BaseModel):
    message: str = Field(..., example="Como cozinhar arroz?")


class RAGSearchRequest(BaseModel):
    query: str = Field(..., example="Backup 3-2-1")
    limit: int = Field(default=4, ge=1, le=10)


@app.get("/health")
def health_check():
    return {
        "status": "online",
        "agent": "Ngúnji (Pangolins Cyber)",
        "jurisdiction": "Angola 🇦🇴",
        "gemini_configured": bool(agent.api_key)
    }


@app.post("/api/chat", response_model=AgentResponse)
def chat_endpoint(req: ChatRequest):
    """
    Endpoint principal de conversação com o Ngúnji.
    """
    if not req.message.strip():
        raise HTTPException(status_code=400, detail="A mensagem não pode estar vazia.")

    try:
        response = agent.ask(
            message=req.message,
            company_profile=req.company_profile,
            history=req.history,
            enable_web_search=req.enable_web_search
        )
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro no processamento do agente: {str(e)}")


@app.post("/api/scope-check")
def scope_check_endpoint(req: ScopeRequest):
    """
    Verifica se a pergunta está no escopo estrito de cibersegurança/Lei 22/11.
    """
    return evaluate_scope_guard(req.message)


@app.post("/api/rag-search")
def rag_search_endpoint(req: RAGSearchRequest):
    """
    Pesquisa direta no corpus de legislação angolana e normas de cibersegurança.
    """
    chunks, citations = retrieve_rag_context(req.query, limit=req.limit)
    return {
        "query": req.query,
        "results_count": len(chunks),
        "citations": citations,
        "chunks": chunks
    }
