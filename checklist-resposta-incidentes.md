# Checklist de Resposta a Incidentes de Segurança

**Projeto:** Ngúnji — Pangolins Cyber
Procedimento de emergência para PMEs angolanas em caso de suspeita de invasão, ransomware, fuga de dados ou outro incidente de segurança.

> ⚠️ **Use este checklist assim que detetar qualquer sinal de comportamento anómalo** (ficheiros encriptados, acessos não reconhecidos, lentidão súbita, e-mails enviados sem autorização, computador ou telemóvel roubado com dados da empresa).

---

## Fase 1 — Conter (primeiros 15 minutos)

- [ ] Desligar imediatamente o cabo de rede / Wi-Fi do(s) equipamento(s) afetado(s);
- [ ] **Não** desligar o equipamento no botão de energia, se for possível isolar apenas a rede — isto preserva provas na memória para eventual análise forense;
- [ ] Isolar contas de utilizador suspeitas (bloquear/suspender acesso, sem apagar registos);
- [ ] Não tentar "limpar" ou reinstalar nada ainda — primeiro conter e documentar.

## Fase 2 — Notificar Internamente

- [ ] Avisar imediatamente a gestão/direção da empresa;
- [ ] Identificar o responsável designado para coordenar a resposta ao incidente;
- [ ] Alterar as senhas de todas as contas corporativas relevantes, a partir de um **dispositivo limpo** (não o equipamento afetado);
- [ ] Se aplicável, contactar o suporte técnico ou fornecedor de TI.

## Fase 3 — Avaliar e Documentar

- [ ] Determinar que sistemas, contas e dados podem ter sido afetados;
- [ ] Verificar se os **backups offline** permanecem intactos e não foram encriptados/eliminados;
- [ ] Documentar a linha do tempo: quando foi detetado, o que foi observado, que ações já foram tomadas;
- [ ] Avaliar se dados pessoais de clientes, trabalhadores ou fornecedores foram (ou podem ter sido) expostos.

## Fase 4 — Cumprir Obrigações Legais

- [ ] Se existir risco de fuga/exposição de dados pessoais, preparar a notificação à **APD (Agência de Proteção de Dados)** — www.apd.ao;
- [ ] Enviar a notificação à APD **no prazo máximo de 72 horas** após a deteção do incidente, incluindo natureza do incidente, dados afetados e medidas já tomadas;
- [ ] Se o risco para os titulares dos dados for elevado, preparar a comunicação direta aos titulares afetados, com recomendações de proteção (ex: alterar senhas, vigiar movimentos bancários);
- [ ] Caso o incidente envolva um ato criminoso (invasão, burla informática, roubo de equipamento), considerar apresentar queixa junto do **SIC (Serviço de Investigação Criminal)**, ao abrigo da Lei n.º 23/11 (Crimes no Domínio das Tecnologias da Informação), reunindo previamente os relatórios técnicos disponíveis como prova.

## Fase 5 — Recuperar

- [ ] Formatar/reinstalar o(s) equipamento(s) afetado(s);
- [ ] Restaurar os dados a partir do **backup limpo mais recente e verificado**;
- [ ] Confirmar que o ambiente está limpo antes de reconectar à rede/internet;
- [ ] Reativar o acesso das contas afetadas apenas após confirmação de segurança.

## Fase 6 — Rever e Prevenir

- [ ] Realizar uma reunião de retrospetiva: o que falhou e o que funcionou bem na resposta;
- [ ] Atualizar controlos de segurança (MFA, backups, formação da equipa) para reduzir o risco de recorrência;
- [ ] Registar o incidente e as lições aprendidas para referência futura.

---

## Contactos de Emergência (preencher previamente)

| Função | Nome | Contacto |
| :--- | :--- | :--- |
| Responsável pela resposta a incidentes | | |
| Suporte técnico / fornecedor de TI | | |
| Encarregado de Proteção de Dados (DPO/EPD) | | |
| Contacto APD | Agência de Proteção de Dados | www.apd.ao |

---

*Este checklist é uma referência geral de boas práticas e não substitui aconselhamento jurídico especializado. Prazos e obrigações podem variar consoante a natureza e gravidade do incidente — em caso de dúvida, procure apoio jurídico ou técnico qualificado.*
