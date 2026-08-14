# Guia de Boas Práticas de Segurança para PMEs

**Projeto:** Ngúnji — Pangolins Cyber
Guia prático de ciber-higiene para Pequenas e Médias Empresas em Angola, mesmo sem equipa de TI dedicada. Organizado segundo as seis funções do **NIST Cybersecurity Framework 2.0**, adaptado à realidade local.

---

## 1. Governar (GOVERN)

- Defina claramente **quem é responsável pela segurança da informação** na empresa, mesmo que seja uma função acumulada (ex: gestor administrativo/financeiro);
- Identifique quais dados são críticos para o negócio (dados de clientes, contabilidade, faturação, propriedade intelectual);
- Se a empresa trata dados pessoais de clientes, trabalhadores ou fornecedores, avalie a necessidade de designar um **Encarregado de Proteção de Dados (DPO/EPD)** — interno ou externo ("DPO as a Service") — para assegurar a conformidade com a Lei n.º 22/11.

## 2. Identificar (IDENTIFY)

- Faça um inventário simples de todos os computadores, telemóveis, contas de e-mail corporativo e ficheiros que contenham dados de clientes ou trabalhadores;
- Identifique quais desses ficheiros contêm **dados pessoais** (NIF, contactos, dados bancários) e quais contêm **dados sensíveis** (saúde, biometria) — estes últimos exigem cuidados reforçados;
- Avalie se algum tratamento de dados exige **notificação prévia à APD** (Agência de Proteção de Dados) ou uma Avaliação de Impacto sobre a Proteção de Dados (DPIA), nomeadamente quando envolve biometria, videovigilância (CCTV) ou dados em grande escala.

## 3. Proteger (PROTECT)

### Senhas e Autenticação
- Substitua senhas curtas por **frases-passe** com 14+ caracteres;
- Proíba a partilha de senhas por WhatsApp ou em papel visível;
- Utilize um **gestor de senhas** corporativo (ex: Bitwarden, 1Password ou a funcionalidade nativa do Google Workspace/Microsoft 365);
- Ative **MFA/2FA obrigatório** em todas as contas de e-mail institucional, plataformas de faturação e serviços na nuvem.

### Backups
- Aplique a regra **3-2-1**: 3 cópias, em 2 suportes diferentes, com 1 cópia offline;
- Teste a restauração dos backups **mensalmente**.

### Dispositivos e Rede
- Mantenha sistemas operativos e software sempre atualizados;
- Utilize antivírus/EDR em todos os equipamentos;
- Restrinja o acesso a ficheiros sensíveis apenas a quem realmente precisa (princípio do menor privilégio).

### Consciencialização da Equipa
- Realize formação regular sobre phishing e engenharia social;
- Estabeleça um procedimento de dupla confirmação para pedidos de pagamento ou alteração de dados bancários.

## 4. Detetar (DETECT)

- Preste atenção a sinais de alerta: alertas de antivírus, e-mails estranhos vindos de contactos habituais, lentidão fora do normal ou ficheiros que deixam de abrir;
- Reveja periodicamente os acessos e permissões concedidos a colaboradores e ex-colaboradores.

## 5. Responder (RESPOND)

- Tenha uma lista de contactos de emergência (responsável interno, suporte técnico, se aplicável a APD);
- Em caso de incidente, siga o [Checklist de Resposta a Incidentes](./checklist-resposta-incidentes.md): isolar, avisar, verificar backups, cumprir obrigações legais de notificação, recuperar.

## 6. Recuperar (RECOVER)

- Saiba como restaurar ficheiros a partir dos backups sem perder o histórico de faturação;
- Após qualquer incidente, documente o que aconteceu e reforce os controlos que falharam, para reduzir o risco de repetição.

---

## Enquadramento Legal de Referência

- **Lei n.º 22/11, de 17 de Junho** — Proteção de Dados Pessoais de Angola (nomeadamente os artigos sobre princípios da qualidade dos dados, segurança do tratamento e notificação de incidentes à APD);
- **Lei n.º 23/11** — Crimes no Domínio das Tecnologias da Informação;
- **Orientações da Agência de Proteção de Dados (APD)** — www.apd.ao;
- **NIST Cybersecurity Framework 2.0** e **CIS Controls v8** como referências internacionais de boas práticas.

---

## Como Usar Este Guia

Este documento serve como referência rápida. Para uma orientação personalizada à realidade específica da sua empresa — dimensão, sector, tipo de dados tratados — utilize o Agente **Ngúnji**, que combina estas boas práticas com o enquadramento legal aplicável em Angola.

*Este guia tem carácter informativo geral e não substitui aconselhamento jurídico ou técnico especializado para o caso concreto da sua empresa.*
