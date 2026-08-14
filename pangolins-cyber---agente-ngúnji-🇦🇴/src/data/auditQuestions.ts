import { AuditQuestion } from '../types';

export const AUDIT_QUESTIONS: AuditQuestion[] = [
  {
    id: 'passwords',
    category: 'passwords',
    title: '1. Gestão de Senhas e Credenciais',
    description: 'Como são criadas e geridas as senhas de acesso aos computadores, e-mails corporativos e sistemas na sua empresa?',
    weight: 10,
    legalReference: 'Lei nº 22/11 (Art. 35º - Dever de Segurança)',
    frameworkReference: 'CIS Control 5.2 / NIST CSF PR.AC-1',
    options: [
      {
        label: 'Usamos senhas curtas ou reutilizadas (ex: "123456", "Luanda2024"), anotadas em papel ou partilhadas por WhatsApp.',
        score: 1,
        recommendation: 'Implementar imediatamente um Gestor de Senhas corporativo (ex: Bitwarden ou 1Password) e proibir a partilha de credenciais.'
      },
      {
        label: 'Cada funcionário cria a sua própria senha com pelo menos 8 caracteres, mas não usamos um gestor centralizado.',
        score: 5,
        recommendation: 'Adotar frases-passe (passphrases) com mais de 14 caracteres (ex: "Chuva#Em#Luanda&2026!") para inviabilizar ataques de força bruta.'
      },
      {
        label: 'Usamos frases-passe longas (14+ caracteres) e um gestor de senhas encriptado com proibição de reutilização.',
        score: 10,
        recommendation: 'Manter a política de senhas fortes e realizar auditorias trimestrais de credenciais expostas na dark web.'
      }
    ]
  },
  {
    id: 'mfa',
    category: 'mfa',
    title: '2. Autenticação Multi-Fator (MFA / 2FA)',
    description: 'Os e-mails corporativos (Google Workspace/Microsoft 365) e sistemas críticos exigem um segundo fator de confirmação?',
    weight: 12,
    legalReference: 'Lei nº 22/11 (Art. 35º e Art. 36º - Medidas Técnicas de Proteção)',
    frameworkReference: 'CIS Control 6.3 / NIST CSF PR.AC-7',
    options: [
      {
        label: 'Não ativamos o MFA. O acesso exige apenas o e-mail e a senha normal.',
        score: 0,
        recommendation: 'CRÍTICO: Ativar a Autenticação em Duas Etapas (MFA) HOJE em todos os e-mails e sistemas. Bloqueia 99% dos roubos de conta.'
      },
      {
        label: 'O MFA está ativado apenas para os sócios/gerentes ou no e-mail principal.',
        score: 5,
        recommendation: 'Tornar o MFA OBRIGATÓRIO para 100% dos colaboradores e prestadores de serviço com acesso a dados corporativos.'
      },
      {
        label: 'O MFA é obrigatório para 100% dos colaboradores através de aplicativo autenticador (Google Authenticator / Microsoft Authenticator).',
        score: 10,
        recommendation: 'Excelente! Considerar a transição de SMS para chaves de segurança físicas (FIDO2/YubiKey) para os cargos de maior risco.'
      }
    ]
  },
  {
    id: 'backups',
    category: 'backups',
    title: '3. Cópias de Segurança (Backups Imutáveis 3-2-1)',
    description: 'Como é feita a salvaguarda da contabilidade, bases de dados e documentos essenciais da sua empresa?',
    weight: 12,
    legalReference: 'Lei nº 22/11 (Art. 35º, nº 1 - Preservação e Recuperabilidade de Dados)',
    frameworkReference: 'Regra de Backup 3-2-1 / CIS Control 11 / NIST CSF PR.IP-4',
    options: [
      {
        label: 'Não fazemos backups regulares, ou o backup é feito manualmente num pen drive de forma esporádica.',
        score: 0,
        recommendation: 'RISCO EXTREMO: Um ataque de Ransomware ou avaria de disco pode destruir permanentemente a empresa. Implementar a Regra 3-2-1.'
      },
      {
        label: 'Fazemos backup automático diário para um disco rígido externo mantido continuamente ligado à rede/computador por USB.',
        score: 4,
        recommendation: 'Desconectar o disco após o backup! Se um ransomware infetar o computador, ele também encriptará o disco USB ligado.'
      },
      {
        label: 'Aplicamos a Regra 3-2-1: 3 cópias, 2 meios de suporte (nuvem + disco), 1 cópia offline/desconectada e testamos o restauro mensalmente.',
        score: 10,
        recommendation: 'Manter os testes periódicos de restauração de ficheiros para garantir a integridade dos dados.'
      }
    ]
  },
  {
    id: 'phishing',
    category: 'phishing',
    title: '4. Conscientização contra Phishing e Burlas em Angola',
    description: 'A sua equipa sabe identificar e-mails falsos, mensagens fraudulentas do WhatsApp e pedidos suspeitos de alteração de IBAN?',
    weight: 10,
    legalReference: 'Lei nº 23/11 (Crimes TIC - Arts. 16º, 20º e 21º) & Lei 22/11',
    frameworkReference: 'CIS Control 14.1 / NIST CSF PR.AT-1',
    options: [
      {
        label: 'Nunca realizamos treinamento e os funcionários frequentemente clicam em links estranhos ou abrem anexos sem verificação.',
        score: 1,
        recommendation: 'Agendar um treinamento prático de ciber-higiene. Explicar como verificar remetentes de e-mail e confirmar IBANs por telefone.'
      },
      {
        label: 'Alertamos verbalmente quando há notícias de fraudes bancárias em Luanda, mas não temos diretrizes por escrito.',
        score: 5,
        recommendation: 'Formalizar um Guia Prático Anti-Phishing e instituir a regra do "Duplo Cheque" para qualquer pagamento de fatura.'
      },
      {
        label: 'Realizamos simulações de phishing e formação regular de cibersegurança para todos os colaboradores no momento da admissão.',
        score: 10,
        recommendation: 'Continuar a atualizar o plano de formação com exemplos de burlas recentes direcionadas ao mercado angolano.'
      }
    ]
  },
  {
    id: 'apd_law',
    category: 'apd_law',
    title: '5. Notificação e Registo junto da APD (Lei nº 22/11)',
    description: 'A sua PME já declarou ou registou os ficheiros de dados de colaboradores e clientes na Agência de Proteção de Dados (APD)?',
    weight: 12,
    legalReference: 'Lei nº 22/11 (Arts. 28º, 29º e 30º - Notificação Prévia Obrigatória à APD)',
    frameworkReference: 'Regulamentos Oficiais APD Angola (www.apd.ao)',
    options: [
      {
        label: 'Não conhecemos a Lei nº 22/11 e nunca fizemos qualquer declaração ou registo junto da APD.',
        score: 0,
        recommendation: 'CONFORMIDADE LEGAL: Submeter a notificação prévia de tratamento de dados à APD (www.apd.ao) para evitar multas.'
      },
      {
        label: 'Conhecemos a legislação, mas ainda estamos em processo de mapeamento dos ficheiros e dados pessoais.',
        score: 5,
        recommendation: 'Concluir o inventário de dados e submeter o formulário de notificação à APD nas categorias de Recursos Humanos e Vendas.'
      },
      {
        label: 'Registámos e notificámos formalmente a APD sobre os ficheiros de clientes, RH e videovigilância (CCTV).',
        score: 10,
        recommendation: 'Manter o registo atualizado sempre que houver criação de novos ficheiros ou alteração substancial no tratamento.'
      }
    ]
  },
  {
    id: 'dpo',
    category: 'dpo',
    title: '6. Encarregado de Proteção de Dados (EPD / DPO)',
    description: 'A sua empresa designou um responsável pela proteção de dados e ponto de contacto para questões de privacidade?',
    weight: 8,
    legalReference: 'Lei nº 22/11 (Arts. 26º e 27º - Responsável pelo Tratamento e EPD)',
    frameworkReference: 'Directrizes APD para Encarregados de Proteção de Dados',
    options: [
      {
        label: 'Não temos ninguém responsável por este assunto na empresa.',
        score: 1,
        recommendation: 'Designar um funcionário sénior para a função de EPD/DPO interno ou contratar um serviço de DPO externo (DPO as a Service).'
      },
      {
        label: 'Designámos uma pessoa internamente, mas ela acumulou a função sem formação adequada sobre a Lei 22/11.',
        score: 6,
        recommendation: 'Proporcionar capacitação jurídica/técnica em proteção de dados ao EPD designado e esclarecer as suas responsabilidades.'
      },
      {
        label: 'Temos um EPD/DPO designado (interno com formação ou externo) que avalia os riscos e é o interlocutor com a APD.',
        score: 10,
        recommendation: 'Garantir a autonomia funcional do DPO nas tomadas de decisão sobre a proteção da privacidade.'
      }
    ]
  },
  {
    id: 'devices',
    category: 'devices',
    title: '7. Segurança de Portáteis e Telemóveis Corporativos',
    description: 'Os computadores portáteis e telemóveis com e-mail ou ficheiros da empresa possuem encriptação e antivírus ativo?',
    weight: 10,
    legalReference: 'Lei nº 22/11 (Art. 35º - Encriptação e Salvaguarda contra Acesso Não Autorizado)',
    frameworkReference: 'CIS Control 1.1, 10.1 / NIST CSF PR.DS-1',
    options: [
      {
        label: 'Utilizamos computadores pessoais dos funcionários (BYOD) sem antivírus pago ou encriptação de disco.',
        score: 2,
        recommendation: 'Instalar antivírus corporativo (EDR) em todos os computadores e ativar o BitLocker (Windows) ou FileVault (Mac).'
      },
      {
        label: 'Temos antivírus básico em quase todas as máquinas, mas nem todos os dispositivos portáteis usam senha de bloqueio.',
        score: 6,
        recommendation: 'Configurar o bloqueio automático de ecrã após 3 minutos de inatividade e ativar encriptação completa nos discos.'
      },
      {
        label: 'Todos os equipamentos possuem antivírus/EDR gerido centralmente, encriptação de disco ativa e bloqueio remoto em caso de roubo.',
        score: 10,
        recommendation: 'Manter a monitorização centralizada de atualizações de segurança e correções do sistema operativo.'
      }
    ]
  },
  {
    id: 'incidents',
    category: 'incidents',
    title: '8. Plano de Resposta a Incidentes de Cibersegurança',
    description: 'Se a sua empresa for atingida hoje por um ataque cibernético ou vazamento de dados, existe um protocolo de emergência?',
    weight: 10,
    legalReference: 'Lei nº 22/11 (Art. 35º) & Deliberação APD (Notificação Obrigatória em até 72h)',
    frameworkReference: 'CIS Control 17 / NIST CSF RS.CO-2 / Lei 23/11',
    options: [
      {
        label: 'Não temos plano. Entraríamos em pânico e tentaríamos resolver improvisando no momento.',
        score: 1,
        recommendation: 'Definir o Protocolo dos Primeiros 15 Minutos: Isolamento de rede, contactos de emergência e apoio técnico externo.'
      },
      {
        label: 'Sabemos quem chamar (um técnico externo de TI), mas não temos um procedimento escrito para comunicar o incidente à APD.',
        score: 5,
        recommendation: 'Elaborar o Guia de Resposta a Incidentes de 1 Página incluindo a obrigação de notificação à APD em 72h.'
      },
      {
        label: 'Temos um Plano de Resposta a Incidentes testado, com funções definidas e modelos de comunicação para a APD e clientes.',
        score: 10,
        recommendation: 'Efetuar exercícios de simulação de incidente uma vez por ano para testar a agilidade da equipa.'
      }
    ]
  },
  {
    id: 'access',
    category: 'access',
    title: '9. Controlo de Acessos e Desativação de Ex-Funcionários',
    description: 'Quando um colaborador se demite ou sai da empresa, o que acontece às suas contas de e-mail e acessos aos sistemas?',
    weight: 8,
    legalReference: 'Lei nº 22/11 (Art. 35º, nº 2 - Controlo de Acessos Físicos e Lógicos)',
    frameworkReference: 'Princípio do Menor Privilégio / CIS Control 5.4 / NIST CSF PR.AC-4',
    options: [
      {
        label: 'Frequentemente esquecemo-nos de eliminar os acessos e ex-funcionários continuam com acesso ao e-mail ou ficheiros.',
        score: 0,
        recommendation: 'RISCO DE FUGA DE DADOS: Criar um checklist rígido de saída (Offboarding) que revogue todos os acessos no próprio dia.'
      },
      {
        label: 'Mudamos a senha do e-mail do ex-funcionário em alguns dias, mas não temos um inventário central de acessos a revogar.',
        score: 5,
        recommendation: 'Mapear todos os sistemas (nuvem, contabilidade, bancos, e-mail) para desativação imediata no momento do desligamento.'
      },
      {
        label: 'Revogamos 100% dos acessos digitais e físicos no dia da saída do colaborador através de um protocolo formal de offboarding.',
        score: 10,
        recommendation: 'Excelente prática! Continuar a auditar a lista de utilizadores ativos mensalmente.'
      }
    ]
  },
  {
    id: 'data_inventory',
    category: 'data_inventory',
    title: '10. Caderno de Registo de Tratamento de Dados (ROPA)',
    description: 'A empresa sabe exatamente quais dados pessoais possui, onde estão guardados e quem tem acesso a eles?',
    weight: 8,
    legalReference: 'Lei nº 22/11 (Art. 4º - Qualidade dos Dados & Art. 28º - ROPA)',
    frameworkReference: 'Modelos de Inventário e ROPA da APD Angola',
    options: [
      {
        label: 'Não temos ideia. Ficheiros de clientes e colaboradores estão espalhados em vários computadores sem controlo.',
        score: 1,
        recommendation: 'Criar um Mapa de Dados Pessoais (quais dados recolhemos, para que servem, em que pasta/nuvem estão armazenados).'
      },
      {
        label: 'Sabemos onde estão as pastas principais na nuvem ou servidor, mas não temos regras claras sobre quem pode aceder.',
        score: 6,
        recommendation: 'Restringir as permissões de acesso com base no princípio do "Menor Privilégio" (cada funcionário só acede ao que precisa).'
      },
      {
        label: 'Mantemos um Caderno de Registo de Atividades de Tratamento (ROPA) completo com controlo de acessos por perfil de função.',
        score: 10,
        recommendation: 'Manter o registo de atividades revisto e alinhado com o princípio da transparência da Lei nº 22/11.'
      }
    ]
  }
];

export interface DetailedAuditResult {
  score: number;
  riskLevel: 'Crítico' | 'Alto' | 'Médio' | 'Bom' | 'Excelente';
  urgentActions: string[];
  mediumActions: string[];
  longTermActions: string[];
  apdComplianceStatus: 'Não Conforme' | 'Parcialmente Conforme' | 'Conforme';
  pillarBreakdown: {
    id: string;
    title: string;
    score: number;
    maxScore: number;
    percentage: number;
    selectedLabel: string;
    recommendation?: string;
    legalReference: string;
    frameworkReference: string;
  }[];
  date: string;
}

export function calculateAuditScore(answers: Record<string, number>): DetailedAuditResult {
  let totalScore = 0;
  let maxPossibleScore = 0;

  const urgentActions: string[] = [];
  const mediumActions: string[] = [];
  const longTermActions: string[] = [];
  const pillarBreakdown: DetailedAuditResult['pillarBreakdown'] = [];

  AUDIT_QUESTIONS.forEach(q => {
    const selectedOptionIndex = answers[q.id] ?? 0;
    const option = q.options[selectedOptionIndex];
    const optionScore = option ? option.score : 0;

    totalScore += optionScore * (q.weight / 10);
    maxPossibleScore += 10 * (q.weight / 10);

    const percentage = Math.round((optionScore / 10) * 100);

    pillarBreakdown.push({
      id: q.id,
      title: q.title,
      score: optionScore,
      maxScore: 10,
      percentage,
      selectedLabel: option ? option.label : 'Não respondido',
      recommendation: option?.recommendation,
      legalReference: q.legalReference || 'Lei nº 22/11 de Proteção de Dados Pessoais',
      frameworkReference: q.frameworkReference || 'Padrões de Ciber-higiene CIS / NIST',
    });

    if (option && option.recommendation) {
      const shortTitle = q.title.split('.')[1]?.trim() || q.title;
      if (optionScore <= 3) {
        urgentActions.push(`${shortTitle}: ${option.recommendation}`);
      } else if (optionScore <= 6) {
        mediumActions.push(`${shortTitle}: ${option.recommendation}`);
      } else if (optionScore < 10) {
        longTermActions.push(`${shortTitle}: ${option.recommendation}`);
      }
    }
  });

  const finalScore = Math.round((totalScore / maxPossibleScore) * 100);

  let riskLevel: 'Crítico' | 'Alto' | 'Médio' | 'Bom' | 'Excelente' = 'Crítico';
  let apdComplianceStatus: 'Não Conforme' | 'Parcialmente Conforme' | 'Conforme' = 'Não Conforme';

  if (finalScore >= 85) {
    riskLevel = 'Excelente';
    apdComplianceStatus = 'Conforme';
  } else if (finalScore >= 70) {
    riskLevel = 'Bom';
    apdComplianceStatus = 'Parcialmente Conforme';
  } else if (finalScore >= 50) {
    riskLevel = 'Médio';
    apdComplianceStatus = 'Parcialmente Conforme';
  } else if (finalScore >= 30) {
    riskLevel = 'Alto';
    apdComplianceStatus = 'Não Conforme';
  } else {
    riskLevel = 'Crítico';
    apdComplianceStatus = 'Não Conforme';
  }

  return {
    score: finalScore,
    riskLevel,
    urgentActions,
    mediumActions,
    longTermActions,
    apdComplianceStatus,
    pillarBreakdown,
    date: new Date().toISOString(),
  };
}
