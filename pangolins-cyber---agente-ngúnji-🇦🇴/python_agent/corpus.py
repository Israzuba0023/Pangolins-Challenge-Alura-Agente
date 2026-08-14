"""
Corpus Normativo e Técnico de Cibersegurança e Proteção de Dados de Angola
Pangolins Cyber 🇦🇴
"""

from typing import List, Dict, Any

RAG_KNOWLEDGE_CORPUS: List[Dict[str, Any]] = [
    # --- 01_LEGISLACAO: LEI Nº 22/11 (PROTEÇÃO DE DADOS PESSOAIS DE ANGOLA) ---
    {
        "id": "lei_22_11_art_1",
        "metadata": {
            "id": "lei_22_11_art_1",
            "country": "AO",
            "jurisdiction": "Angola",
            "authority": "Assembleia Nacional de Angola",
            "category": "data_protection",
            "subcategory": "legislation",
            "document_type": "law",
            "effective_date": "2011-06-17",
            "document_title": "Lei nº 22/11 - Proteção de Dados Pessoais",
            "article": "1º",
            "paragraph": "1",
            "source_priority": 10,
            "language": "pt",
        },
        "content": (
            "Artigo 1.º (Objecto): A presente lei estabelece o regime jurídico aplicável ao tratamento de dados "
            "pessoais de pessoas singulares, com o objectivo de garantir a protecção das suas liberdades fundamentais "
            "e dos seus direitos, nomeadamente o direito à reserva da intimidade da vida privada e familiar. "
            "Aplica-se a todas as pessoas colectivas (empresas e PMEs) operando em Angola ou que façam tratamento de dados "
            "com meios situados no território nacional."
        ),
        "keywords": ["lei 22/11", "objeto", "âmbito", "regime juridico", "angola", "direitos fundamentais", "pme"]
    },
    {
        "id": "lei_22_11_art_4",
        "metadata": {
            "id": "lei_22_11_art_4",
            "country": "AO",
            "jurisdiction": "Angola",
            "authority": "Assembleia Nacional de Angola",
            "category": "data_protection",
            "subcategory": "legislation",
            "document_type": "law",
            "effective_date": "2011-06-17",
            "document_title": "Lei nº 22/11 - Proteção de Dados Pessoais",
            "article": "4º",
            "paragraph": "1",
            "source_priority": 10,
            "language": "pt",
        },
        "content": (
            "Artigo 4.º (Princípios da Qualidade dos Dados): Os dados pessoais devem ser: "
            "a) Tratados de forma lícita e com respeito pelo princípio da boa-fé; "
            "b) Recolhidos para finalidades determinadas, explícitas e legítimas, não podendo ser posteriormente tratados de forma incompatível; "
            "c) Adequados, pertinentes e não excessivos relativamente às finalidades; "
            "d) Exactos e, se necessário, actualizados; "
            "e) Conservados de forma a permitir a identificação dos titulares apenas durante o período necessário."
        ),
        "keywords": ["princípios", "qualidade dos dados", "licitude", "boa fe", "finalidade", "proporcionalidade", "retencao"]
    },
    {
        "id": "lei_22_11_art_11",
        "metadata": {
            "id": "lei_22_11_art_11",
            "country": "AO",
            "jurisdiction": "Angola",
            "authority": "Assembleia Nacional de Angola",
            "category": "data_protection",
            "subcategory": "legislation",
            "document_type": "law",
            "effective_date": "2011-06-17",
            "document_title": "Lei nº 22/11 - Proteção de Dados Pessoais",
            "article": "11º",
            "paragraph": "1",
            "source_priority": 10,
            "language": "pt",
        },
        "content": (
            "Artigo 11.º (Legitimação do Tratamento): O tratamento de dados pessoais só pode ser efectuado se o titular "
            "dos dados tiver dado de forma inequívoca o seu consentimento, ou se o tratamento for necessário para: "
            "a) A execução de um contrato no qual o titular seja parte; "
            "b) O cumprimento de obrigação legal a que o responsável pelo tratamento esteja sujeito (ex: obrigações fiscais junto da AGT em Angola); "
            "c) A protecção de interesses vitais do titular dos dados."
        ),
        "keywords": ["consentimento", "legitimação", "contrato", "obrigacao legal", "agt", "requisito legal"]
    },
    {
        "id": "lei_22_11_art_12",
        "metadata": {
            "id": "lei_22_11_art_12",
            "country": "AO",
            "jurisdiction": "Angola",
            "authority": "Assembleia Nacional de Angola",
            "category": "data_protection",
            "subcategory": "legislation",
            "document_type": "law",
            "effective_date": "2011-06-17",
            "document_title": "Lei nº 22/11 - Proteção de Dados Pessoais",
            "article": "12º",
            "paragraph": "1 e 2",
            "source_priority": 10,
            "language": "pt",
        },
        "content": (
            "Artigo 12.º (Dados Sensíveis): É proibido o tratamento de dados pessoais relativos a convicções filosóficas ou políticas, "
            "filiação partidária ou sindical, religião, vida privada, origem racial ou étnica, bem como o tratamento de dados relativos à saúde "
            "e à vida sexual, incluindo dados genéticos. Excepções exigem autorização expressa prevista em lei ou autorização prévia da APD (Agência de Proteção de Dados)."
        ),
        "keywords": ["dados sensíveis", "saúde", "biometria", "religiao", "origem etnica", "proibição", "autorização apd"]
    },
    {
        "id": "lei_22_11_art_28",
        "metadata": {
            "id": "lei_22_11_art_28",
            "country": "AO",
            "jurisdiction": "Angola",
            "authority": "Assembleia Nacional de Angola",
            "category": "cybersecurity",
            "subcategory": "legislation",
            "document_type": "law",
            "effective_date": "2011-06-17",
            "document_title": "Lei nº 22/11 - Proteção de Dados Pessoais",
            "article": "28º",
            "paragraph": "1 a 3",
            "source_priority": 10,
            "language": "pt",
        },
        "content": (
            "Artigo 28.º (Segurança do Tratamento): O responsável pelo tratamento (empresa/PME) deve pôr em prática as medidas técnicas e organizativas "
            "adequadas para proteger os dados pessoais contra a destruição acidental ou ilícita, a perda acidental, a alteração, a difusão ou o acesso "
            "não autorizados. As medidas devem assegurar um nível de segurança adequado aos riscos que o tratamento apresenta e à natureza dos dados a proteger "
            "(ex: cifragem, backups, controlo de acessos, antivírus)."
        ),
        "keywords": ["segurança do tratamento", "medidas tecnicas", "medidas organizativas", "destruição", "acesso nao autorizado", "cifragem"]
    },
    {
        "id": "lei_22_11_art_30",
        "metadata": {
            "id": "lei_22_11_art_30",
            "country": "AO",
            "jurisdiction": "Angola",
            "authority": "Assembleia Nacional de Angola",
            "category": "apd",
            "subcategory": "legislation",
            "document_type": "law",
            "effective_date": "2011-06-17",
            "document_title": "Lei nº 22/11 - Proteção de Dados Pessoais",
            "article": "30º",
            "paragraph": "1 e 2",
            "source_priority": 10,
            "language": "pt",
        },
        "content": (
            "Artigo 30.º (Obrigação de Notificação à APD): O responsável pelo tratamento de dados ou o seu representante deve notificar previamente "
            "a APD (Agência de Proteção de Dados) antes da realização de qualquer tratamento de dados pessoais, salvo nos casos de isenção previstos pela lei. "
            "A notificação inclui as categorias de dados, finalidades, destinatários e medidas de segurança adoptadas. "
            "Tratamentos de dados sensíveis exigem autorização prévia formal da APD."
        ),
        "keywords": ["notificação apd", "registo de dados", "autorização prévia", "registo de ficheiro", "agencia de protecao de dados"]
    },
    {
        "id": "lei_22_11_art_40",
        "metadata": {
            "id": "lei_22_11_art_40",
            "country": "AO",
            "jurisdiction": "Angola",
            "authority": "Assembleia Nacional de Angola",
            "category": "compliance",
            "subcategory": "legislation",
            "document_type": "law",
            "effective_date": "2011-06-17",
            "document_title": "Lei nº 22/11 - Proteção de Dados Pessoais",
            "article": "40º a 45º",
            "paragraph": "Geral",
            "source_priority": 10,
            "language": "pt",
        },
        "content": (
            "Artigo 40.º a 45.º (Sanções e Coimas): O incumprimento das obrigações de notificação, falta de medidas de segurança, "
            "ou violação dos direitos dos titulares sujeita as PMEs e empresas em Angola a sanções administrativas, coimas substanciais aplicadas "
            "pela APD e responsabilidade civil/penal. As coimas podem ser agravadas em caso de reincidência ou negligência grave."
        ),
        "keywords": ["multas", "coimas", "sanções", "incumprimento", "penalidades", "apd angola", "risco financeiro"]
    },

    # --- 02_APD: DIRETRIZES DA AGÊNCIA DE PROTEÇÃO DE DADOS DE ANGOLA ---
    {
        "id": "apd_orientacao_registo",
        "metadata": {
            "id": "apd_orientacao_registo",
            "country": "AO",
            "jurisdiction": "Angola",
            "authority": "APD - Agência de Proteção de Dados",
            "category": "apd",
            "subcategory": "orientacoes",
            "document_type": "directive",
            "document_title": "Orientações da APD sobre Registo de Tratamento de Dados para PMEs",
            "article": "Directiva 01/2022",
            "source_priority": 9,
            "language": "pt",
        },
        "content": (
            "Orientações da APD para PMEs Angolanas: Todas as pequenas e médias empresas em Angola que possuam ficheiros informatizados ou físicos "
            "com dados de trabalhadores (recursos humanos), clientes (gestão de vendas/faturação), fornecedores ou CCTV (videovigilância) têm a obrigação legal "
            "de registar esses ficheiros junto da APD (www.apd.ao). O processo de declaração requer preenchimento de formulários detalhando medidas de segurança "
            "física e lógica, finalidade e prazos de conservação."
        ),
        "keywords": ["apd.ao", "registo de ficheiros", "cctv", "videovigilancia", "recursos humanos", "clientes", "formulario apd"]
    },
    {
        "id": "apd_comunicacao_incidentes",
        "metadata": {
            "id": "apd_comunicacao_incidentes",
            "country": "AO",
            "jurisdiction": "Angola",
            "authority": "APD - Agência de Proteção de Dados",
            "category": "incident_response",
            "subcategory": "circulares",
            "document_type": "guideline",
            "document_title": "Protocolo de Comunicação de Incidentes de Segurança à APD",
            "article": "Circular Informativa 03/2023",
            "source_priority": 9,
            "language": "pt",
        },
        "content": (
            "Em caso de violação de segurança de dados pessoais (ex: ataque de ransomware, roubo de computador com base de dados de clientes, "
            "e-mail enviado por engano para destinatários em massa, acesso não autorizado), a PME deve: "
            "1) Isolar os sistemas afetados; "
            "2) Documentar a causa e extensão da fuga; "
            "3) Notificar a APD sem demora injustificada com relatório preliminar em até 72 horas; "
            "4) Caso a violação represente um alto risco para os titulares dos dados, notificar os próprios afetados com recomendações de proteção."
        ),
        "keywords": ["fuga de dados", "comunicacao de incidente", "72 horas", "notificar apd", "ransomware", "notificar afetados"]
    },

    # --- 03_DPO: ENCARREGADO DE PROTEÇÃO DE DADOS (EPD / DPO) ---
    {
        "id": "dpo_responsabilidades",
        "metadata": {
            "id": "dpo_responsabilidades",
            "country": "AO",
            "jurisdiction": "Angola",
            "authority": "APD / DPO Guidelines",
            "category": "dpo",
            "subcategory": "responsabilidades",
            "document_type": "guideline",
            "document_title": "Guia do Encarregado de Proteção de Dados (EPD / DPO) em Angola",
            "article": "Capítulo DPO",
            "source_priority": 8,
            "language": "pt",
        },
        "content": (
            "Funções do Encarregado de Proteção de Dados (EPD / DPO) em PMEs Angolanas: "
            "1) Informar e aconselhar a administração e funcionários sobre as obrigações da Lei 22/11; "
            "2) Monitorizar a conformidade com as políticas internas e a legislação de dados; "
            "3) Ser o ponto de contacto oficial com a Agência de Proteção de Dados (APD); "
            "4) PMEs que não têm capacidade financeira para contratar um DPO a tempo inteiro podem designar um DPO externo (DPO as a Service) "
            "ou atribuir acumulativamente a função a um gestor interno, desde que não haja conflito de interesses (ex: o Diretor de TI ou Diretor Financeiro não devem ser DPO do seu próprio trabalho)."
        ),
        "keywords": ["dpo", "epd", "encarregado de protecao de dados", "dpo as a service", "ponto de contacto apd", "conflito de interesses"]
    },
    {
        "id": "dpo_dpia_avaliacao_impacto",
        "metadata": {
            "id": "dpo_dpia_avaliacao_impacto",
            "country": "AO",
            "jurisdiction": "Angola",
            "authority": "APD / DPO Guidelines",
            "category": "dpo",
            "subcategory": "dpia",
            "document_type": "guideline",
            "document_title": "Avaliação de Impacto sobre a Proteção de Dados (DPIA)",
            "article": "DPIA - Avaliação de Risco",
            "source_priority": 8,
            "language": "pt",
        },
        "content": (
            "Avaliação de Impacto sobre a Proteção de Dados (DPIA): É um estudo de risco obrigatório quando um novo tratamento de dados utilizar "
            "novas tecnologias ou envolver dados em grande escala / sensíveis (ex: biometria para ponto de funcionários, sistemas de rastreio GPS, "
            "aplicações bancárias ou de saúde). O relatório de DPIA avalia a necessidade, a proporcionalidade e os riscos para os direitos dos cidadãos, "
            "sugerindo controlos de mitigação antes do lançamento do sistema."
        ),
        "keywords": ["dpia", "avaliacao de impacto", "dados sensiveis", "biometria", "rastreio gps", "risco elevado"]
    },

    # --- 04_CYBERSECURITY: PHISHING, PASSWORDS, MFA, BACKUPS & RANSOMWARE ---
    {
        "id": "cyber_phishing_pme",
        "metadata": {
            "id": "cyber_phishing_pme",
            "country": "AO",
            "jurisdiction": "Angola / PME Best Practices",
            "authority": "Pangolins Cyber / CIS Controls",
            "category": "cybersecurity",
            "subcategory": "phishing",
            "document_type": "best_practice",
            "document_title": "Guia Anti-Phishing para PMEs em Angola",
            "source_priority": 9,
            "language": "pt",
        },
        "content": (
            "Prevenção contra Phishing e Burlas Informáticas em Angola: Phishing é a causa nº 1 de invasões e roubo de credenciais bancárias/e-mails corporativos em PMEs em Luanda e restantes províncias.\n"
            "Regras Práticas de Ciber-higiene:\n"
            "1) Verificar sempre o endereço de e-mail do remetente (não apenas o nome exibido). Atenção a erros sutis como @bai-online.cm em vez de @bai.ao;\n"
            "2) Desconfiar de mensagens urgentes solicitando pagamentos para novas contas bancárias, alteração de IBAN de fornecedores ou redefinição de senhas;\n"
            "3) Nunca clicar em links de SMS/WhatsApp prometendo prémio de operadoras (Unitel/Africell) ou atualização bancária sem confirmação por canal oficial;\n"
            "4) Treinar a equipa quinzenalmente simulando exemplos reais de e-mails suspeitos."
        ),
        "keywords": ["phishing", "burlas informaticas", "iban", "e-mail fraudulento", "unitel", "africell", "banco", "treinamento"]
    },
    {
        "id": "cyber_passwords_mfa",
        "metadata": {
            "id": "cyber_passwords_mfa",
            "country": "AO",
            "jurisdiction": "Angola / PME Best Practices",
            "authority": "NIST CSF / Pangolins Cyber",
            "category": "cybersecurity",
            "subcategory": "passwords_mfa",
            "document_type": "best_practice",
            "document_title": "Política Prática de Gestão de Senhas e MFA para PMEs",
            "source_priority": 9,
            "language": "pt",
        },
        "content": (
            "Política de Senhas e Autenticação Multi-Fator (MFA):\n"
            "1) Frases-passe (Passphrases): Substituir senhas curtas por frases-passe com mais de 14 caracteres (ex: 'Luanda#Sol&Chuva2026!'), que são extremamente difíceis para ataques automáticos de força bruta.\n"
            "2) Proibição estrita de partilha de senhas por WhatsApp ou papel colado no monitor;\n"
            "3) Utilização obrigatória de um Gestor de Passwords corporativo (ex: Bitwarden, 1Password ou funcionalidade nativa do Google Workspace);\n"
            "4) Ativação OBRIGATÓRIA de MFA (2FA / Autenticação em 2 Etapas) no Google Workspace, Microsoft 365, e-mail institucional e sistemas de faturação. O MFA previne até 99% dos ataques de invasão de conta via credenciais roubadas."
        ),
        "keywords": ["mfa", "2fa", "autenticacao em duas etapas", "passphrases", "gestor de senhas", "google workspace", "microsoft 365"]
    },
    {
        "id": "cyber_backup_3_2_1",
        "metadata": {
            "id": "cyber_backup_3_2_1",
            "country": "AO",
            "jurisdiction": "Angola / PME Best Practices",
            "authority": "CIS Controls / Pangolins Cyber",
            "category": "cybersecurity",
            "subcategory": "backup",
            "document_type": "best_practice",
            "document_title": "Estratégia de Backup Imutável Regra 3-2-1 para PMEs",
            "source_priority": 9,
            "language": "pt",
        },
        "content": (
            "Regra de Backup 3-2-1 para Proteção contra Ransomware:\n"
            "Ransomware é um vírus que encripta os ficheiros contabilísticos, bases de dados e documentos da empresa exigindo resgate em criptomoedas.\n"
            "A única salvação real sem pagar resgate é o Backup 3-2-1:\n"
            "- 3 Cópias de dados (1 original + 2 backups);\n"
            "- 2 Meios de suporte diferentes (ex: disco rígido externo + servidor em nuvem);\n"
            "- 1 Cópia FORA DO LOCAL / OFFLINE (Air-gapped) – O disco rígido externo deve ser desconectado do computador após o backup. Se o disco permanecer ligado por USB durante um ataque de ransomware, o vírus também encriptará o backup!\n"
            "Testar a restauração de ficheiros mensalmente."
        ),
        "keywords": ["backup 3-2-1", "ransomware", "disco externo", "cópia de segurança", "air gapped", "restauração", "encriptação"]
    },
    {
        "id": "cyber_incident_response_protocol",
        "metadata": {
            "id": "cyber_incident_response_protocol",
            "country": "AO",
            "jurisdiction": "Angola",
            "authority": "Pangolins Cyber / CERT Angola Guidelines",
            "category": "incident_response",
            "subcategory": "ransomware",
            "document_type": "best_practice",
            "document_title": "Plano de Resposta a Incidentes dos Primeiros 15 Minutos para PMEs",
            "source_priority": 9,
            "language": "pt",
        },
        "content": (
            "Plano de Emergência em Caso de Invasão ou Ransomware na PME:\n"
            "Passo 1 (Desconectar Imediatamente): Puxar o cabo de rede Wi-Fi/Ethernet do computador infetado. NÃO desligar a máquina no botão de energia se for possível isolar a rede, para preservar provas na memória RAM para análise forense;\n"
            "Passo 2 (Notificar Responsável): Avisar a gestão e alterar senhas de todas as contas corporativas em dispositivos limpos;\n"
            "Passo 3 (Verificar Mídias de Backup): Confirmar se os backups offline não foram afetados;\n"
            "Passo 4 (Cumprimento Legal): Elaborar o relatório sumário e comunicar o incidente de segurança à APD (Agência de Proteção de Dados de Angola) se houver risco de fuga de dados de terceiros;\n"
            "Passo 5 (Recuperação): Formatar equipamento afetado e restaurar dados a partir de backup limpo verificado."
        ),
        "keywords": ["resposta a incidentes", "isolamento de rede", "primeiros 15 minutos", "ransomware", "comunicar apd", "formatar"]
    },

    # --- 05_STANDARDS & COMPLIANCE FOR ANGOLAN PMES ---
    {
        "id": "standards_nist_csf_pme",
        "metadata": {
            "id": "standards_nist_csf_pme",
            "country": "INT",
            "jurisdiction": "International / Adapted for AO",
            "authority": "NIST - National Institute of Standards and Technology",
            "category": "standards",
            "subcategory": "nist",
            "document_type": "standard",
            "document_title": "NIST Cybersecurity Framework 2.0 Adaptado para PMEs",
            "source_priority": 7,
            "language": "pt",
        },
        "content": (
            "Estrutura do NIST CSF 2.0 para Pequenas Empresas:\n"
            "1) Governança (GOVERN): Definir quem é responsável pela segurança e quais dados são críticos na PME;\n"
            "2) Identificação (IDENTIFY): Inventariar computadores, telemóveis, contas de e-mail e ficheiros com dados de clientes/trabalhadores;\n"
            "3) Proteção (PROTECT): Implementar MFA, senhas fortes, antivírus/EDR, atualização de software e backups 3-2-1;\n"
            "4) Detecção (DETECT): Observar alertas de antivírus, e-mails estranhos ou lentidão fora do normal;\n"
            "5) Resposta (RESPOND): Ter uma lista de contactos de emergência e passos para isolar máquinas em ataque;\n"
            "6) Recuperação (RECOVER): Saber restaurar os ficheiros a partir dos backups sem perder faturação."
        ),
        "keywords": ["nist csf", "govern", "identify", "protect", "detect", "respond", "recover", "inventario"]
    },
    {
        "id": "laws_crimes_ti_lei_23_11",
        "metadata": {
            "id": "laws_crimes_ti_lei_23_11",
            "country": "AO",
            "jurisdiction": "Angola",
            "authority": "Assembleia Nacional de Angola",
            "category": "compliance",
            "subcategory": "legislation",
            "document_type": "law",
            "effective_date": "2011-12-02",
            "document_title": "Lei nº 23/11 - Crimes no Domínio das Tecnologias da Informação",
            "article": "Geral",
            "source_priority": 10,
            "language": "pt",
        },
        "content": (
            "Lei nº 23/11 dos Crimes Tecnológicos em Angola: Criminaliza o acesso ilegítimo a sistemas informáticos, "
            "a interceção ilícita de dados, a falsificação informática, o dano informático, a introdução de vírus/malware "
            "e a burla informática (phishing/engenharia social). As vítimas de crimes cibernéticos em Angola podem e devem "
            "apresentar queixa junto dos órgãos de investigação criminal (SIC - Serviço de Investigação Criminal) e munir-se de relatórios técnicos de evidência."
        ),
        "keywords": ["lei 23/11", "crimes informaticos", "sic", "servico de investigacao criminal", "acesso ilegitimo", "burla informatica"]
    }
]
