# Ngúnji (Pangolins Cyber) — Implementação em Python 🐍

Este módulo contém a implementação completa do agente **Ngúnji** em **Python**, incluindo o motor **RAG** com a legislação angolana (Lei nº 22/11, Lei nº 23/11 e normas da APD), validação de escopo (**Scope Guard**), validação de citações jurídicas, interface **CLI interativa** e servidor **REST FastAPI**.

---

## 1. Estrutura do Módulo Python

```
├── ngunji_agent.py          # Ponto de entrada CLI e exportação do agente
├── requirements.txt         # Dependências do Python (FastAPI, Google GenAI, etc.)
├── README_PYTHON.md         # Documentação e exemplos de uso
└── python_agent/
    ├── __init__.py          # Exportações do pacote
    ├── agent.py             # Classe NgunjiAgent (integração Gemini + RAG)
    ├── rag_engine.py        # Scope Guard, Hybrid Retriever e Validador
    ├── corpus.py            # Corpus normativo (Lei 22/11, APD, NIST, CIS)
    ├── api.py               # API REST com FastAPI (endpoints /api/chat, etc.)
    └── cli.py               # Interface de linha de comandos interativa
```

---

## 2. Instalação e Configuração

### Passo 1: Criar e ativar um ambiente virtual (Recomendado)

```bash
# Criar o ambiente virtual
python3 -m venv venv

# Ativar no Linux / macOS:
source venv/bin/activate

# Ativar no Windows (PowerShell):
.\venv\Scripts\Activate.ps1
```

### Passo 2: Instalar as dependências

```bash
pip install -r requirements.txt
```

### Passo 3: Configurar a Chave de API do Gemini

Crie ou edite o seu arquivo `.env` na raiz:

```env
GEMINI_API_KEY=sua_chave_gemini_aqui
```

---

## 3. Formas de Execução

### Opção A: Chat Interativo no Terminal (CLI)

Execute diretamente:

```bash
python ngunji_agent.py
```

Você pode conversar com o Ngúnji, fazer perguntas sobre cibersegurança e Lei 22/11, e configurar o perfil da sua PME digitando `perfil`.

---

### Opção B: Iniciar o Servidor REST com FastAPI

Inicie o microserviço FastAPI com Uvicorn:

```bash
uvicorn python_agent.api:app --reload --port 8000
```

- Documentação Swagger interativa: **`http://localhost:8000/docs`**
- Verificação de integridade: **`http://localhost:8000/health`**

#### Exemplo de Chamada API via `curl`:

```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Quais são os passos para notificar a APD sobre um ataque de ransomware?",
    "company_profile": {
      "name": "Comercial Kwanza Lda",
      "sector": "Comércio Geral",
      "employees": 20,
      "registered_with_apd": false
    }
  }'
```

---

### Opção C: Usar como Biblioteca Python em Outros Projetos

```python
from ngunji_agent import NgunjiAgent, CompanyProfile

# 1. Instanciar o agente
agent = NgunjiAgent()

# 2. Definir o perfil da sua empresa
perfil = CompanyProfile(
    name="Logística Benguela Lda",
    sector="Transportes",
    employees=30,
    has_customer_data=True,
    has_cctv=True,
    registered_with_apd=False
)

# 3. Fazer uma consulta
resposta = agent.ask(
    message="Como devemos tratar as gravações das câmaras CCTV de acordo com a APD?",
    company_profile=perfil
)

print(resposta.text)

# Ver citações jurídicas identificadas
for citacao in resposta.citations:
    print(f"Fonte: {citacao.document_title} - Artigo {citacao.article}")
```

---

## 4. Recursos Integrados

- 🛡️ **Scope Guard Estrito**: Bloqueia perguntas fora de contexto (ex: receitas, desporto, piadas) com resposta educativa.
- 📚 **RAG Jurídico Especializado**: Recupera automaticamente artigos da **Lei nº 22/11**, orientações da **APD**, **Lei nº 23/11** de Crimes Informáticos e controlos **CIS/NIST**.
- 🔄 **Resiliência Multi-Camada**: Suporta SDK oficial `google-genai` e possui fallback nativo HTTP (`urllib`) sem depender de pacotes externos compilados.
- 🏢 **Consciência de Contexto Organizacional**: Adapta as respostas ao sector, dimensão e maturidade da PME.
