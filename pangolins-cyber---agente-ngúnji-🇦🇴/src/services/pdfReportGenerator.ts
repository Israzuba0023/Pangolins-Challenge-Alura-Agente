import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CompanyProfile } from '../types';
import { DetailedAuditResult } from '../data/auditQuestions';

export interface GeneratePdfOptions {
  companyProfile: CompanyProfile;
  auditResult: DetailedAuditResult;
}

export function generateAuditPdfReport({ companyProfile, auditResult }: GeneratePdfOptions): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  // Colors
  const primaryGold = [212, 175, 55]; // #D4AF37
  const darkBg = [18, 16, 14]; // #12100E
  const darkBronze = [61, 51, 35]; // #3D3323
  const textDark = [30, 27, 24]; // #1E1B18
  const textMuted = [100, 90, 80]; // #645A50
  const lightGrayBg = [248, 246, 240]; // #F8F6F0

  // Risk Color Mapping
  let riskColor: [number, number, number] = [225, 29, 72]; // Rose
  if (auditResult.riskLevel === 'Excelente') riskColor = [16, 185, 129];
  else if (auditResult.riskLevel === 'Bom') riskColor = [34, 197, 94];
  else if (auditResult.riskLevel === 'Médio') riskColor = [217, 119, 6];
  else if (auditResult.riskLevel === 'Alto') riskColor = [239, 68, 68];

  // Helper for adding footer to all pages
  const addPageFooters = () => {
    const totalPages = (doc.internal as any).getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);

      // Bottom separator line
      doc.setDrawColor(212, 175, 55);
      doc.setLineWidth(0.4);
      doc.line(margin, pageHeight - 14, pageWidth - margin, pageHeight - 14);

      // Footer Text
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
      doc.text(
        'PANGOLINS CYBER 🇦🇴 • NGÚNJI - Consultoria de Ciber-Higiene & Proteção de Dados (Lei nº 22/11 • APD)',
        margin,
        pageHeight - 9
      );

      doc.text(`Página ${i} de ${totalPages}`, pageWidth - margin, pageHeight - 9, { align: 'right' });
    }
  };

  // --- HEADER SECTION ---
  // Top Banner Background
  doc.setFillColor(darkBg[0], darkBg[1], darkBg[2]);
  doc.rect(0, 0, pageWidth, 38, 'F');

  // Gold accent bar
  doc.setFillColor(primaryGold[0], primaryGold[1], primaryGold[2]);
  doc.rect(0, 38, pageWidth, 2, 'F');

  // Header Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text('PANGOLINS CYBER', margin, 14);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(primaryGold[0], primaryGold[1], primaryGold[2]);
  doc.text('NGÚNJI • COPILOTO DE CIBER-HIGIENE & CONFORMIDADE REGULATÓRIA', margin, 20);

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(240, 240, 240);
  doc.text('RELATÓRIO DE AUDITORIA & ENQUADRAMENTO LEGAL APD', margin, 28);

  // Report Reference / Date in Header
  const reportRef = `AUD-AO-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(180, 180, 180);
  doc.text(`Ref: ${reportRef}`, pageWidth - margin, 14, { align: 'right' });
  doc.text(
    `Emissão: ${new Date().toLocaleDateString('pt-AO', { day: '2-digit', month: 'long', year: 'numeric' })}`,
    pageWidth - margin,
    20,
    { align: 'right' }
  );
  doc.text('Jurisdição: República de Angola 🇦🇴', pageWidth - margin, 26, { align: 'right' });

  // --- COMPANY METADATA CARD ---
  let startY = 46;
  doc.setFillColor(lightGrayBg[0], lightGrayBg[1], lightGrayBg[2]);
  doc.roundedRect(margin, startY, contentWidth, 24, 2, 2, 'F');
  doc.setDrawColor(primaryGold[0], primaryGold[1], primaryGold[2]);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, startY, contentWidth, 24, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(primaryGold[0] * 0.7, primaryGold[1] * 0.7, primaryGold[2] * 0.7);
  doc.text('DADOS DA ORGANIZAÇÃO AVALIADA', margin + 4, startY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);

  const col1X = margin + 4;
  const col2X = margin + contentWidth * 0.35;
  const col3X = margin + contentWidth * 0.7;

  doc.text(`Empresa: `, col1X, startY + 12);
  doc.setFont('helvetica', 'bold');
  doc.text(`${companyProfile.companyName || 'PME Angolana'}`, col1X + 16, startY + 12);

  doc.setFont('helvetica', 'normal');
  doc.text(`Setor: `, col1X, startY + 18);
  doc.setFont('helvetica', 'bold');
  doc.text(`${companyProfile.industry}`, col1X + 11, startY + 18);

  doc.setFont('helvetica', 'normal');
  doc.text(`Província: `, col2X, startY + 12);
  doc.setFont('helvetica', 'bold');
  doc.text(`${companyProfile.province}`, col2X + 16, startY + 12);

  doc.setFont('helvetica', 'normal');
  doc.text(`Dimensão: `, col2X, startY + 18);
  doc.setFont('helvetica', 'bold');
  doc.text(`${companyProfile.companySize} colaboradores`, col2X + 17, startY + 18);

  doc.setFont('helvetica', 'normal');
  doc.text(`Equipa de TI: `, col3X, startY + 12);
  doc.setFont('helvetica', 'bold');
  doc.text(`${companyProfile.hasItTeam ? 'Interna' : 'Sem TI Interno'}`, col3X + 22, startY + 12);

  doc.setFont('helvetica', 'normal');
  doc.text(`Plataforma Nuvem: `, col3X, startY + 18);
  doc.setFont('helvetica', 'bold');
  doc.text(`${companyProfile.usesCloudWorkspace.toUpperCase()}`, col3X + 29, startY + 18);

  // --- EXECUTIVE SCORECARD SECTION ---
  startY += 29;

  const cardWidth = (contentWidth - 6) / 3;
  const cardHeight = 26;

  // Card 1: Score
  doc.setFillColor(lightGrayBg[0], lightGrayBg[1], lightGrayBg[2]);
  doc.roundedRect(margin, startY, cardWidth, cardHeight, 2, 2, 'F');
  doc.setDrawColor(200, 200, 200);
  doc.roundedRect(margin, startY, cardWidth, cardHeight, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('SCORE GLOBAL DE HIGIENE', margin + cardWidth / 2, startY + 6, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(primaryGold[0] * 0.75, primaryGold[1] * 0.75, primaryGold[2] * 0.75);
  doc.text(`${auditResult.score} / 100`, margin + cardWidth / 2, startY + 16, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Ponderação de 10 Pilares Técnicos', margin + cardWidth / 2, startY + 22, { align: 'center' });

  // Card 2: Risk Level
  const card2X = margin + cardWidth + 3;
  doc.setFillColor(lightGrayBg[0], lightGrayBg[1], lightGrayBg[2]);
  doc.roundedRect(card2X, startY, cardWidth, cardHeight, 2, 2, 'F');
  doc.setDrawColor(200, 200, 200);
  doc.roundedRect(card2X, startY, cardWidth, cardHeight, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('NÍVEL DE RISCO OPERACIONAL', card2X + cardWidth / 2, startY + 6, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(riskColor[0], riskColor[1], riskColor[2]);
  doc.text(`${auditResult.riskLevel.toUpperCase()}`, card2X + cardWidth / 2, startY + 16, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Exposição a Ransomware & Fraude', card2X + cardWidth / 2, startY + 22, { align: 'center' });

  // Card 3: APD Compliance
  const card3X = margin + (cardWidth + 3) * 2;
  doc.setFillColor(lightGrayBg[0], lightGrayBg[1], lightGrayBg[2]);
  doc.roundedRect(card3X, startY, cardWidth, cardHeight, 2, 2, 'F');
  doc.setDrawColor(200, 200, 200);
  doc.roundedRect(card3X, startY, cardWidth, cardHeight, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('CONFORMIDADE APD (LEI 22/11)', card3X + cardWidth / 2, startY + 6, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(
    auditResult.apdComplianceStatus === 'Conforme'
      ? 16
      : auditResult.apdComplianceStatus === 'Parcialmente Conforme'
      ? 217
      : 225,
    auditResult.apdComplianceStatus === 'Conforme'
      ? 185
      : auditResult.apdComplianceStatus === 'Parcialmente Conforme'
      ? 119
      : 29,
    auditResult.apdComplianceStatus === 'Conforme'
      ? 129
      : auditResult.apdComplianceStatus === 'Parcialmente Conforme'
      ? 6
      : 72
  );
  doc.text(`${auditResult.apdComplianceStatus}`, card3X + cardWidth / 2, startY + 16, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Agência de Proteção de Dados de Angola', card3X + cardWidth / 2, startY + 22, { align: 'center' });

  // --- SECTION TITLE: PILLARS ASSESSMENT TABLE ---
  startY += 32;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('1. DIAGNÓSTICO DETALHADO POR PILAR & ENQUADRAMENTO JURÍDICO', margin, startY);

  // Table of 10 Pillars
  const tableData = auditResult.pillarBreakdown.map((item, index) => {
    return [
      `#${index + 1} ${item.title.split('.')[1]?.trim() || item.title}`,
      `${item.score}/10 (${item.percentage}%)`,
      `${item.selectedLabel}\n\n💡 Recomendação: ${item.recommendation || 'Manter boas práticas.'}`,
      `⚖️ ${item.legalReference}\n🏛️ ${item.frameworkReference}`,
    ];
  });

  autoTable(doc, {
    startY: startY + 3,
    head: [['Pilar / Domínio', 'Score', 'Diagnóstico & Ação Recomendada', 'Fundamentação Legal (Angola)']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: [36, 30, 21], // #241E15
      textColor: [245, 230, 179], // #F5E6B3
      fontSize: 8.5,
      fontStyle: 'bold',
      halign: 'left',
      cellPadding: 3,
    },
    bodyStyles: {
      fontSize: 7.5,
      textColor: [30, 27, 24],
      cellPadding: 3,
      lineColor: [220, 215, 200],
    },
    columnStyles: {
      0: { cellWidth: 38, fontStyle: 'bold' },
      1: { cellWidth: 22, halign: 'center', fontStyle: 'bold' },
      2: { cellWidth: 70 },
      3: { cellWidth: 52, fontSize: 7, textColor: [70, 60, 50] },
    },
    alternateRowStyles: {
      fillColor: [252, 250, 245],
    },
    margin: { left: margin, right: margin },
  });

  // Get current Y after table
  let finalY = (doc as any).lastAutoTable.finalY + 8;

  // If near bottom of page, add page break
  if (finalY > pageHeight - 65) {
    doc.addPage();
    finalY = 20;
  }

  // --- SECTION TITLE: ACTION PLAN ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('2. PLANO DE AÇÃO PRIORITÁRIO (CONSULTORIA NGÚNJI)', margin, finalY);
  finalY += 5;

  const actionRows: any[] = [];

  if (auditResult.urgentActions.length > 0) {
    auditResult.urgentActions.forEach(act => {
      actionRows.push(['IMEDIATO (48h)', act, 'Crítico']);
    });
  }

  if (auditResult.mediumActions.length > 0) {
    auditResult.mediumActions.forEach(act => {
      actionRows.push(['MÉDIO PRAZO (30d)', act, 'Moderado']);
    });
  }

  if (auditResult.longTermActions.length > 0) {
    auditResult.longTermActions.forEach(act => {
      actionRows.push(['ESTRATÉGICO (90d)', act, 'Melhoria']);
    });
  }

  if (actionRows.length === 0) {
    actionRows.push(['MANUTENÇÃO', 'A sua empresa apresenta conformidade exemplar. Manter auditorias periódicas.', 'Excelente']);
  }

  autoTable(doc, {
    startY: finalY,
    head: [['Prazo', 'Medida Técnica / Procedimento de Conformidade', 'Prioridade']],
    body: actionRows,
    theme: 'grid',
    headStyles: {
      fillColor: [61, 51, 35],
      textColor: [245, 230, 179],
      fontSize: 8,
      fontStyle: 'bold',
      halign: 'left',
      cellPadding: 2.5,
    },
    bodyStyles: {
      fontSize: 7.5,
      cellPadding: 2.5,
      textColor: [30, 27, 24],
    },
    columnStyles: {
      0: { cellWidth: 35, fontStyle: 'bold' },
      1: { cellWidth: 117 },
      2: { cellWidth: 30, halign: 'center' },
    },
    margin: { left: margin, right: margin },
  });

  finalY = (doc as any).lastAutoTable.finalY + 8;

  if (finalY > pageHeight - 55) {
    doc.addPage();
    finalY = 20;
  }

  // --- SECTION 3: JURIDICAL FRAMEWORK SUMMARY BOX ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('3. PRINCIPAIS REFERÊNCIAS LEGAIS DE ANGOLA', margin, finalY);
  finalY += 4;

  doc.setFillColor(lightGrayBg[0], lightGrayBg[1], lightGrayBg[2]);
  doc.roundedRect(margin, finalY, contentWidth, 28, 2, 2, 'F');
  doc.setDrawColor(primaryGold[0], primaryGold[1], primaryGold[2]);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, finalY, contentWidth, 28, 2, 2, 'S');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);

  doc.text('• Lei nº 22/11 de 17 de Junho: Proteção de Dados Pessoais (Arts. 1º, 4º, 11º, 28º, 35º e 36º).', margin + 3, finalY + 5);
  doc.text('• Agência de Proteção de Dados (APD): Notificação e Registo de ficheiros de clientes, trabalhadores e CCTV (www.apd.ao).', margin + 3, finalY + 10);
  doc.text('• Prazo de Notificação de Incidentes: 72 horas para comunicação formal de violação de dados à APD.', margin + 3, finalY + 15);
  doc.text('• Lei nº 23/11: Crimes no Domínio das Tecnologias de Informação e Comunicação (Burla, Acesso Ilegítimo e Fraude).', margin + 3, finalY + 20);
  doc.text('• Padrões Internacionais Aplicados: CIS Controls v8 (Higiene Básica) e NIST Cybersecurity Framework 2.0.', margin + 3, finalY + 25);

  // Add Footers to all pages
  addPageFooters();

  return doc;
}
