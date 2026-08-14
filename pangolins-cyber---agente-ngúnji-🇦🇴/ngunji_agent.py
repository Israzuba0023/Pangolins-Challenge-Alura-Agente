#!/usr/bin/env python3
"""
Ponto de entrada principal para o Agente Ngúnji em Python
Pangolins Cyber 🇦🇴

Execução interativa:
    python ngunji_agent.py

Execução como API REST (FastAPI):
    uvicorn python_agent.api:app --reload --port 8000
"""

from python_agent.agent import NgunjiAgent, CompanyProfile, AgentResponse
from python_agent.rag_engine import evaluate_scope_guard, retrieve_rag_context, validate_citations
from python_agent.cli import run_cli

__all__ = [
    "NgunjiAgent",
    "CompanyProfile",
    "AgentResponse",
    "evaluate_scope_guard",
    "retrieve_rag_context",
    "validate_citations"
]

if __name__ == "__main__":
    run_cli()
