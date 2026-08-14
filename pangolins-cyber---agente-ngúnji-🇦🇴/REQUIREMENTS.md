# NGÚNJI (Pangolins Cyber) — Guia de Instalação, Execução e Deploy

Este documento contém todas as instruções necessárias para configurar, executar localmente no **VS Code** (ou em qualquer outra IDE) e realizar o **deploy** em servidores ou plataformas de nuvem.

---

## 1. Requisitos do Sistema

Antes de começar, certifique-se de que tem as seguintes ferramentas instaladas na sua máquina:

- **Node.js**: Versão `18.x`, `20.x` ou superior ([Download Node.js](https://nodejs.org/))
- **npm** (incluso com o Node.js) ou gerenciadores alternativos como **pnpm**, **yarn** ou **bun**
- **Git** ([Download Git](https://git-scm.com/))
- **Chave de API do Google Gemini**: Obtenha gratuitamente em [Google AI Studio](https://aistudio.google.com/)

---

## 2. Como Rodar o Projeto no VS Code (Passo a Passo)

### Passo 1: Abrir a pasta no VS Code
1. Abra o **Visual Studio Code**.
2. Vá em `File > Open Folder...` (ou `Arquivo > Abrir Pasta...`) e selecione a pasta raiz do projeto.
3. Abra o terminal integrado do VS Code pressionando `Ctrl + \`` (ou `Cmd + \`` no macOS) ou pelo menu `Terminal > New Terminal`.

### Passo 2: Configurar o arquivo de variáveis de ambiente (`.env`)
Crie um arquivo chamado `.env` na raiz do projeto (ao lado do `package.json`):

```env
# Chave da API do Google Gemini (Obrigatória para o chat com IA)
GEMINI_API_KEY=sua_chave_gemini_aqui

# Porta do servidor (opcional, padrão: 3000)
PORT=3000

# Ambiente
NODE_ENV=development
```

> **Nota:** Nunca envie o seu ficheiro `.env` para o Git público. Ele já está protegido no `.gitignore`.

### Passo 3: Instalar as dependências
No terminal integrado, execute:

```bash
npm install
```

*(Se preferir usar Bun: `bun install`)*

### Passo 4: Iniciar o servidor de desenvolvimento
Execute o comando:

```bash
npm run dev
```

O terminal exibirá uma mensagem similar a:
```
Server running on http://localhost:3000
```

Abra o seu navegador web em **`http://localhost:3000`**.

---

## 3. Scripts Disponíveis no `package.json`

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor backend Express + Vite em modo de desenvolvimento com hot-reload. |
| `npm run build` | Compila o frontend React (pasta `dist`) e compila o backend TypeScript com `esbuild` em `dist/server.cjs`. |
| `npm run start` | Executa o backend compilado para produção (`node dist/server.cjs`). |
| `npm run lint` | Valida tipagens do TypeScript (`tsc --noEmit`). |

---

## 4. Como Fazer Deploy em Outros Sistemas e Plataformas

### Opção A: Deploy em VPS Linux (Ubuntu / Debian) com PM2 & Nginx

1. **Instalar Node.js e PM2 no servidor:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo npm install -g pm2
   ```

2. **Clonar e compilar a aplicação:**
   ```bash
   git clone <URL_DO_REPOSITORIO> ngunji-app
   cd ngunji-app
   npm install
   cp .env.example .env
   # Edite o .env com a sua chave GEMINI_API_KEY
   nano .env
   npm run build
   ```

3. **Iniciar o processo em segundo plano com PM2:**
   ```bash
   pm2 start dist/server.cjs --name "ngunji"
   pm2 save
   pm2 startup
   ```

4. **Configurar Proxy Reverso no Nginx:**
   ```nginx
   server {
       listen 80;
       server_name seu-dominio.ao;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

### Opção B: Deploy com Docker

1. **Criar um arquivo `Dockerfile` na raiz:**
   ```dockerfile
   FROM node:20-alpine AS builder
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build

   FROM node:20-alpine AS runner
   WORKDIR /app
   ENV NODE_ENV=production
   ENV PORT=3000
   COPY package*.json ./
   RUN npm ci --omit=dev
   COPY --from=builder /app/dist ./dist
   EXPOSE 3000
   CMD ["node", "dist/server.cjs"]
   ```

2. **Construir e rodar o container:**
   ```bash
   docker build -t ngunji-app .
   docker run -d -p 3000:3000 -e GEMINI_API_KEY="sua_chave_aqui" --name ngunji ngunji-app
   ```

---

### Opção C: Deploy em Plataformas de Nuvem (Render, Railway, Fly.io, Cloud Run)

- **Render / Railway**:
  - **Build Command:** `npm install && npm run build`
  - **Start Command:** `npm run start`
  - **Environment Variables:** Adicione `GEMINI_API_KEY` e `NODE_ENV=production`.

- **Google Cloud Run**:
  - Faça o build da imagem Docker acima e publique no Google Artifact Registry / Container Registry.
  - Defina a variável de ambiente `GEMINI_API_KEY` nas configurações da revisão.

---

## 5. Estrutura do Projeto

```
├── assets/                  # Arquivos de imagem da marca
├── src/
│   ├── assets/              # Imagens e logótipos (Ngúnji, Pangolins Cyber)
│   ├── components/          # Componentes React (Header, Chat, Diagnóstico, RAG, etc.)
│   ├── data/                # Base RAG (Legislação Angolana Lei 22/11, APD, NIST)
│   ├── types.ts             # Interfaces TypeScript
│   ├── App.tsx              # Componente principal e rotas
│   └── main.tsx             # Ponto de entrada React
├── dist/                    # Pasta de saída gerada pelo build de produção
├── server.ts                # Servidor Express + API Gemini + RAG Search
├── package.json             # Dependências e scripts
├── vite.config.ts           # Configuração do Vite e Tailwind CSS
└── .env.example             # Modelo de variáveis de ambiente
```

---

## 6. Suporte e Dúvidas

Em caso de dúvidas técnicas ou de implementação:
- **Projeto:** Ngúnji — Copiloto de Ciber-higiene e Proteção de Dados
- **Organização:** Pangolins Cyber (Angola 🇦🇴)
- **Documentação de Referência:** Lei nº 22/11 de Proteção de Dados Pessoais de Angola e Directivas da APD.
