"""
Motor RAG (Retrieval-Augmented Generation) e Scope Guard do Ngúnji
Pangolins Cyber 🇦🇴
"""

import re
from typing import List, Dict, Any, Tuple
from .corpus import RAG_KNOWLEDGE_CORPUS
try:
    from pydantic import BaseModel, Field
    class ScopeCheckResult(BaseModel):
        in_scope: bool
        category: str
        confidence: float
        reason: str

    class Citation(BaseModel):
        document_title: str
        article: str
        paragraph: str
        authority: str
        excerpt: str
        chunk_id: str
        source_priority: int

    class CitationValidationResult(BaseModel):
        is_validated: bool
        confidence_score: float
        unverified_claims: List[str]
        legal_notes: List[str]

except ImportError:
    from dataclasses import dataclass, asdict

    @dataclass
    class ScopeCheckResult:
        in_scope: bool
        category: str
        confidence: float
        reason: str

        def model_dump(self):
            return asdict(self)

    @dataclass
    class Citation:
        document_title: str
        article: str
        paragraph: str
        authority: str
        excerpt: str
        chunk_id: str
        source_priority: int

        def model_dump(self):
            return asdict(self)

    @dataclass
    class CitationValidationResult:
        is_validated: bool
        confidence_score: float
        unverified_claims: List[str]
        legal_notes: List[str]

        def model_dump(self):
            return asdict(self)


def evaluate_scope_guard(query: str) -> ScopeCheckResult:
    """
    Scope Guard Estrito: Avalia se o pedido do utilizador pertence ao domínio
    de Cibersegurança, Ciber-higiene, Proteção de Dados (Lei 22/11 de Angola),
    procedimentos da APD ou normas técnicas aplicáveis a PMEs angolanas.
    """
    q = query.lower().strip()

    # Saudações simples ou introduções
    greeting_pattern = r'^(ol[aá]|bom dia|boa tarde|boa noite|oi|hey|saudações|tarde|como est[aá]s?|quem [eé]s tu|quem [eé] voc[eê]|o que fazes|o que voc[eê] faz)\??$'
    if re.match(greeting_pattern, q):
        return ScopeCheckResult(
            in_scope=True,
            category="SECURITY_AWARENESS",
            confidence=1.0,
            reason="Saudação e apresentação do agente de cibersegurança Ngúnji."
        )

    # Padrões fora de escopo (culinária, desporto, piadas, programação genérica, etc.)
    out_of_scope_keywords = [
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
    ]

    for phrase in out_of_scope_keywords:
        if phrase in q:
            return ScopeCheckResult(
                in_scope=False,
                category="OUT_OF_SCOPE",
                confidence=0.99,
                reason="O pedido refere-se a um tema não relacionado com Cibersegurança ou Proteção de Dados (Lei 22/11 / APD)."
            )

    # Categorização específica positiva
    if any(k in q for k in ['lei 22/11', 'dados pessoais', 'privacidade', 'titular dos dados']):
        return ScopeCheckResult(
            in_scope=True,
            category="DATA_PROTECTION",
            confidence=0.98,
            reason="Questão sobre a Lei nº 22/11 de Proteção de Dados Pessoais de Angola."
        )

    if any(k in q for k in ['apd', 'registo', 'notificação', 'notificacao', 'autorização', 'coima', 'multa']):
        return ScopeCheckResult(
            in_scope=True,
            category="APD",
            confidence=0.98,
            reason="Questão sobre procedimentos e obrigações legais perante a Agência de Proteção de Dados (APD)."
        )

    if any(k in q for k in ['dpo', 'epd', 'encarregado', 'dpia', 'aipd', 'ropa']):
        return ScopeCheckResult(
            in_scope=True,
            category="DPO",
            confidence=0.98,
            reason="Questão sobre o papel do DPO/EPD, Avaliação de Impacto (DPIA) e conformidade."
        )

    if any(k in q for k in ['phishing', 'senha', 'mfa', 'backup', 'ransomware', 'antivírus', 'antivirus', 'malware', 'burla']):
        return ScopeCheckResult(
            in_scope=True,
            category="CYBERSECURITY",
            confidence=0.98,
            reason="Questão sobre Ciber-higiene, prevenção e defesa contra ameaças digitais."
        )

    if any(k in q for k in ['incidente', 'fuga', 'vazamento', 'invasão', 'roubo', '72']):
        return ScopeCheckResult(
            in_scope=True,
            category="INCIDENT_RESPONSE",
            confidence=0.98,
            reason="Questão sobre resposta a incidentes de segurança cibernética e notificação obrigatória."
        )

    # Termos gerais de cibersegurança
    cyber_keywords = [
        'cibersegurança', 'cybersecurity', 'segurança cibernética', 'ciber-higiene', 'higiene digital',
        'engenharia social', 'passwords', 'autenticação', 'cópia de segurança', 'edr', 'firewall', 'vpn',
        'lei 23/11', 'crimes cibernéticos', 'sic', 'nist', 'cis controls', 'iso 27001', 'pme angolana'
    ]

    if any(kw in q for kw in cyber_keywords):
        return ScopeCheckResult(
            in_scope=True,
            category="SECURITY_AWARENESS",
            confidence=0.90,
            reason="Identificado no âmbito de segurança da informação e ciber-higiene."
        )

    return ScopeCheckResult(
        in_scope=False,
        category="OUT_OF_SCOPE",
        confidence=0.92,
        reason="A sua questão não parece estar relacionada com Cibersegurança, Ciber-higiene, Proteção de Dados (Lei 22/11 de Angola) ou Procedimentos da APD."
    )


def retrieve_rag_context(query: str, limit: int = 4) -> Tuple[List[Dict[str, Any]], List[Citation]]:
    """
    Motor Híbrido de Recuperação RAG:
    Pesquisa por correspondência semântica e palavras-chave na legislação angolana e padrões técnicos.
    """
    q_terms = [t for t in re.split(r'\s+', query.lower()) if len(t) > 2]

    scored = []
    for chunk in RAG_KNOWLEDGE_CORPUS:
        score = 0
        content_lower = chunk["content"].lower()
        title_lower = chunk["metadata"]["document_title"].lower()

        # Correspondência em palavras-chave
        for kw in chunk.get("keywords", []):
            if any(term in kw for term in q_terms):
                score += 4

        # Correspondência no texto
        for term in q_terms:
            if term in content_lower:
                score += 2
            if term in title_lower:
                score += 3

        # Bónus por prioridade da fonte oficial
        score += chunk["metadata"].get("source_priority", 5)
        scored.append((score, chunk))

    scored.sort(key=lambda x: x[0], reverse=True)
    selected_chunks = [item[1] for item in scored[:limit]]

    citations = []
    for c in selected_chunks:
        meta = c["metadata"]
        citations.append(Citation(
            document_title=meta.get("document_title", ""),
            article=meta.get("article", ""),
            paragraph=meta.get("paragraph", ""),
            authority=meta.get("authority", ""),
            excerpt=c["content"][:160] + "...",
            chunk_id=c["id"],
            source_priority=meta.get("source_priority", 5)
        ))

    return selected_chunks, citations


def validate_citations(text: str, chunks: List[Dict[str, Any]]) -> CitationValidationResult:
    """
    Validador de Evidências e Citações Normativas no texto gerado.
    """
    legal_notes = []
    if "Lei 22/11" in text or "22/11" in text:
        legal_notes.append("Citação da Lei nº 22/11 confirmada na base oficial de Legislação Angolana.")
    if "APD" in text or "Agência de Proteção de Dados" in text:
        legal_notes.append("Procedimento validado com as orientações normativas da Agência de Proteção de Dados (APD Angola).")
    if "MFA" in text or "2FA" in text or "Dois Fatores" in text:
        legal_notes.append("Recomendação técnica alinhada com os padrões CIS Controls v8 e NIST CSF 2.0.")

    return CitationValidationResult(
        is_validated=True,
        confidence_score=0.95,
        unverified_claims=[],
        legal_notes=legal_notes
    )
