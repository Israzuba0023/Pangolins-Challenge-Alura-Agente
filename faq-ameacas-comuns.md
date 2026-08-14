# FAQ — Ameaças Comuns em Ciber-higiene

**Projeto:** Ngúnji — Pangolins Cyber
Perguntas frequentes sobre phishing, ransomware e engenharia social, dirigidas a PMEs angolanas.

---

## Phishing e Burlas Informáticas

### O que é phishing?
É uma tentativa de fraude em que um atacante se faz passar por uma entidade de confiança (banco, operadora, fornecedor, colega de trabalho) através de e-mail, SMS ou WhatsApp, para induzir a vítima a clicar num link malicioso, introduzir credenciais num site falso ou efetuar um pagamento indevido. É a causa número um de invasões e roubo de credenciais em PMEs em Angola.

### Como identificar um e-mail de phishing?
- Verifique sempre o **endereço completo** do remetente, não apenas o nome exibido — atenção a domínios muito parecidos com o original (ex: um domínio bancário com uma letra trocada);
- Desconfie de mensagens **urgentes** que pedem pagamentos para novas contas bancárias ou alteração de IBAN de um fornecedor habitual;
- Não clique em links de SMS/WhatsApp que prometem prémios de operadoras ou pedem "atualização" de dados bancários sem confirmar por um canal oficial;
- Erros de ortografia, saudações genéricas ("Caro cliente") e pressão para agir "imediatamente" são sinais de alerta.

### Recebi um e-mail suspeito. O que devo fazer?
1. Não clique em links nem abra anexos;
2. Confirme a informação diretamente com a entidade (ex: ligando para o banco por um número já conhecido, não o indicado no e-mail);
3. Reporte o e-mail à sua equipa de TI ou responsável de segurança;
4. Elimine ou marque como phishing/spam.

### Como proteger a equipa contra phishing?
Faça formação/sensibilização regular (idealmente quinzenal), com exemplos reais de e-mails suspeitos, e mantenha uma cultura em que os colaboradores se sintam à vontade para confirmar antes de agir, sem receio de "perguntar demais".

---

## Ransomware

### O que é ransomware?
É um tipo de vírus (malware) que encripta os ficheiros da empresa — contabilidade, bases de dados de clientes, documentos — tornando-os inacessíveis, e exige o pagamento de um resgate (normalmente em criptomoeda) para os devolver.

### Pagar o resgate garante recuperar os dados?
Não há garantia. Pagar financia ainda mais este tipo de crime e não impede que os dados tenham sido também copiados e divulgados pelo atacante.

### Qual é a melhor proteção contra ransomware?
A regra de **backup 3-2-1**:
- **3** cópias dos dados (1 original + 2 backups);
- em **2** suportes diferentes (ex: disco externo + nuvem);
- **1** cópia totalmente offline / desligada da rede (*air-gapped*) — se o disco de backup estiver sempre ligado por USB, o ransomware também o vai encriptar.

Teste a restauração dos ficheiros regularmente para garantir que os backups realmente funcionam.

### O que fazer se um computador for infetado com ransomware?
1. Desligue imediatamente o cabo de rede ou o Wi-Fi do equipamento afetado (evite desligar o computador no botão de energia, se possível, para preservar provas);
2. Avise a gestão e altere as senhas de todas as contas corporativas a partir de um dispositivo limpo;
3. Verifique se os backups offline não foram afetados;
4. Se houver risco de fuga de dados de terceiros, notifique a APD (Agência de Proteção de Dados) no prazo de 72 horas;
5. Formate o equipamento afetado e restaure a partir de um backup limpo e verificado.

Consulte o [Checklist de Resposta a Incidentes](./checklist-resposta-incidentes.md) para o procedimento detalhado.

---

## Engenharia Social

### O que é engenharia social?
É a manipulação psicológica de uma pessoa para que revele informação confidencial ou realize uma ação que compromete a segurança (ex: partilhar uma senha, autorizar um pagamento, ceder acesso físico a instalações). O phishing é uma forma de engenharia social feita por meios digitais.

### Quais são as formas mais comuns em PMEs angolanas?
- **Pretexto telefónico**: alguém liga a fingir ser do banco, da operadora (Unitel/Africell) ou do "suporte técnico" a pedir dados de acesso;
- **Fraude do CEO/gestor**: um e-mail ou mensagem que finge vir de um diretor a pedir uma transferência urgente e confidencial;
- **Acesso físico não autorizado**: alguém a fingir ser técnico de manutenção ou visitante para aceder a computadores ou servidores sem supervisão.

### Como reduzir o risco?
- Estabeleça um procedimento de **dupla confirmação** para qualquer pedido de pagamento ou alteração de dados bancários, mesmo que pareça vir de um superior;
- Nunca partilhe senhas por telefone, WhatsApp ou e-mail — nenhuma entidade legítima pede a sua senha;
- Controle o acesso físico às instalações e aos equipamentos com dados sensíveis;
- Promova uma cultura em que verificar um pedido invulgar é visto como boa prática, não como desconfiança excessiva.

---

## Senhas e Autenticação

### Qual a diferença entre uma senha forte e uma frase-passe?
Uma frase-passe é uma sequência mais longa (14+ caracteres), fácil de lembrar mas difícil de adivinhar (ex: combinando palavras não relacionadas), o que a torna muito mais resistente a ataques automáticos de força bruta do que uma senha curta com substituições óbvias (ex: "P@ssw0rd").

### O que é o MFA/2FA e porque é importante?
É a Autenticação Multi-Fator (ou em Duas Etapas): além da senha, é pedido um segundo fator (código gerado numa app, SMS ou chave física) para confirmar a identidade. O MFA impede a grande maioria dos ataques que dependem apenas de uma senha roubada ou adivinhada, mesmo que essa senha seja descoberta pelo atacante.

---

*Este FAQ tem carácter informativo e não substitui aconselhamento jurídico ou técnico especializado para o caso concreto da sua empresa. Para questões específicas, consulte o Agente Ngúnji ou um profissional qualificado.*
