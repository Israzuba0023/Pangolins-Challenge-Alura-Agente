import React, { useState } from 'react';
import { AUDIT_QUESTIONS, calculateAuditScore, DetailedAuditResult } from '../data/auditQuestions';
import { CompanyProfile } from '../types';
import { generateAuditPdfReport } from '../services/pdfReportGenerator';
import {
  Award,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
  Printer,
  Download,
  FileDown,
  Sparkles,
  Scale,
  Building2,
  Check,
  Info,
  Layers,
  MessageSquare
} from 'lucide-react';

interface AuditSectionProps {
  companyProfile: CompanyProfile;
  onConsultNgúnjiWithAudit?: (questionText: string) => void;
}

export const AuditSection: React.FC<AuditSectionProps> = ({ companyProfile, onConsultNgúnjiWithAudit }) => {
  const [answers, setAnswers] = useState<Record<string, number>>({
    passwords: 0,
    mfa: 0,
    backups: 0,
    phishing: 0,
    apd_law: 0,
    dpo: 0,
    devices: 0,
    incidents: 0,
    access: 0,
    data_inventory: 0,
  });

  const [auditResult, setAuditResult] = useState<DetailedAuditResult | null>(null);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleRunAudit = () => {
    const result = calculateAuditScore(answers);
    setAuditResult(result);
    // Scroll down to results smoothly
    setTimeout(() => {
      const resultsEl = document.getElementById('audit-results-card');
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleExportPdf = () => {
    if (!auditResult) return;
    setIsExportingPdf(true);
    try {
      const doc = generateAuditPdfReport({
        companyProfile,
        auditResult
      });
      const cleanCompanyName = (companyProfile.companyName || 'Empresa')
        .replace(/[^a-zA-Z0-9_-]/g, '_')
        .toLowerCase();
      const fileName = `Relatorio-Ciber-Higiene-APD-${cleanCompanyName}-${new Date().toISOString().slice(0, 10)}.pdf`;
      doc.save(fileName);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 4000);
    } catch (error) {
      console.error('Erro ao gerar relatório PDF:', error);
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleConsultChat = () => {
    if (!auditResult || !onConsultNgúnjiWithAudit) return;
    const prompt = `Olá Ngúnji! Acabei de realizar o Diagnóstico de Ciber-Higiene da minha empresa (${companyProfile.companyName || 'minha PME'} em ${companyProfile.province}). Obtivemos um score de ${auditResult.score}/100 com nível de risco ${auditResult.riskLevel} e estado APD "${auditResult.apdComplianceStatus}". Podes orientar-me sobre como executar o plano de ação prioritário e cumprir a Lei nº 22/11?`;
    onConsultNgúnjiWithAudit(prompt);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#181512] via-[#241E15] to-[#181512] border border-[#3D3323] rounded-3xl p-6 sm:p-8 shadow-xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#D4AF37] mb-1">
            <Award className="w-6 h-6" />
            <h2 className="text-xl sm:text-2xl font-bold text-white font-serif">
              Diagnóstico de Ciber-higiene & Conformidade APD
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#DCD6C8]">
            Avaliação técnica de 10 pilares para PMEs em Angola. Calcule o seu score, identifique lacunas e exporte o relatório formal em PDF com enquadramento na Lei nº 22/11.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            id="btn-calculate-audit"
            onClick={handleRunAudit}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#AA8222] text-[#0A0908] font-bold text-xs sm:text-sm shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:opacity-95 transition-all flex items-center space-x-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#0A0908]" />
            <span>Calcular Score & Plano</span>
          </button>
        </div>
      </div>

      {/* Audit Questionnaire Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {AUDIT_QUESTIONS.map((q, qIndex) => (
          <div
            key={q.id}
            id={`question-card-${q.id}`}
            className="bg-[#12100E] border border-[#3D3323] rounded-3xl p-6 shadow-md hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-[#241E15] text-[#D4AF37] font-bold border border-[#D4AF37]/30">
                  Pilar {qIndex + 1} de 10
                </span>
                <span className="text-[11px] text-[#A89F8D] font-mono">
                  Peso: {q.weight}x
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-2 font-serif">
                {q.title}
              </h3>
              <p className="text-xs text-[#A89F8D] mb-3 leading-relaxed">
                {q.description}
              </p>

              {/* Legal Reference Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {q.legalReference && (
                  <span className="inline-flex items-center space-x-1 text-[10px] px-2 py-0.5 rounded-md bg-[#1C1813] text-[#F5E6B3] border border-[#D4AF37]/20">
                    <Scale className="w-3 h-3 text-[#D4AF37]" />
                    <span>{q.legalReference}</span>
                  </span>
                )}
                {q.frameworkReference && (
                  <span className="inline-flex items-center space-x-1 text-[10px] px-2 py-0.5 rounded-md bg-[#1C1813] text-[#A89F8D] border border-[#3D3323]">
                    <Layers className="w-3 h-3 text-[#C5A059]" />
                    <span>{q.frameworkReference}</span>
                  </span>
                )}
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {q.options.map((opt, optIndex) => {
                  const isSelected = answers[q.id] === optIndex;
                  return (
                    <button
                      key={optIndex}
                      id={`opt-${q.id}-${optIndex}`}
                      onClick={() => handleSelectOption(q.id, optIndex)}
                      className={`w-full text-left p-3.5 rounded-2xl text-xs transition-all flex items-start space-x-3 border cursor-pointer ${
                        isSelected
                          ? 'bg-[#241E15] border-[#D4AF37] text-white shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                          : 'bg-[#181512] border-[#332A1C] text-[#DCD6C8] hover:bg-[#1E1A15] hover:border-[#3D3323]'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center flex-shrink-0 ${
                        isSelected
                          ? 'border-[#D4AF37] bg-[#D4AF37]'
                          : 'border-[#5A492E]'
                      }`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#0A0908]"></div>}
                      </div>
                      <div className="flex-1">
                        <span className="font-medium">{opt.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA for Score */}
      <div className="text-center mb-10">
        <button
          id="btn-run-full-audit"
          onClick={handleRunAudit}
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#AA8222] text-[#0A0908] font-bold text-base shadow-[0_4px_25px_rgba(212,175,55,0.35)] hover:scale-105 transition-all inline-flex items-center space-x-2 cursor-pointer"
        >
          <Award className="w-5 h-5 text-[#0A0908]" />
          <span>Gerar Diagnóstico Completo da Minha PME</span>
        </button>
      </div>

      {/* Result Section */}
      {auditResult && (
        <div id="audit-results-card" className="bg-[#12100E] border-2 border-[#D4AF37]/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8 animate-in fade-in duration-500">
          
          {/* Result Header & Export Toolbar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#332A1C] gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                Relatório de Ciber-Higiene & Proteção de Dados
              </span>
              <h3 className="text-2xl font-bold text-white mt-1 font-serif">
                Resultado para: {companyProfile.companyName || 'Sua Empresa'}
              </h3>
              <p className="text-xs text-[#A89F8D]">
                Data do Diagnóstico: {new Date().toLocaleDateString('pt-AO', { day: '2-digit', month: 'long', year: 'numeric' })} • Província: {companyProfile.province} • Setor: {companyProfile.industry}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
              <button
                id="btn-export-pdf-report"
                onClick={handleExportPdf}
                disabled={isExportingPdf}
                className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#AA8222] hover:opacity-95 text-[#0A0908] rounded-xl text-xs font-bold shadow-[0_4px_15px_rgba(212,175,55,0.25)] transition-all cursor-pointer disabled:opacity-50"
              >
                {isExportingPdf ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#0A0908] border-t-transparent rounded-full animate-spin"></div>
                    <span>A Gerar PDF...</span>
                  </>
                ) : exportSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-[#0A0908]" />
                    <span>PDF Descarregado!</span>
                  </>
                ) : (
                  <>
                    <FileDown className="w-4 h-4 text-[#0A0908]" />
                    <span>Descarregar Relatório PDF</span>
                  </>
                )}
              </button>

              <button
                id="btn-print-audit-report"
                onClick={handlePrint}
                className="flex items-center space-x-2 px-4 py-2.5 bg-[#241E15] hover:bg-[#332A1C] text-[#F5E6B3] border border-[#D4AF37]/40 rounded-xl text-xs font-semibold transition-all cursor-pointer"
              >
                <Printer className="w-4 h-4 text-[#D4AF37]" />
                <span>Imprimir</span>
              </button>

              {onConsultNgúnjiWithAudit && (
                <button
                  id="btn-consult-ngunji-audit"
                  onClick={handleConsultChat}
                  className="flex items-center space-x-2 px-4 py-2.5 bg-[#1C1813] hover:bg-[#28221B] text-[#DCD6C8] hover:text-white border border-[#3D3323] rounded-xl text-xs font-semibold transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
                  <span>Consultar Ngúnji</span>
                </button>
              )}
            </div>
          </div>

          {/* Score & Risk Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#181512] border border-[#3D3323] rounded-2xl p-6 text-center">
              <span className="text-xs text-[#A89F8D] font-medium">Pontuação Global</span>
              <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFF2B2] via-[#D4AF37] to-[#AA8222] my-2 font-serif">
                {auditResult.score}/100
              </div>
              <p className="text-xs text-[#DCD6C8]">Índice de Higiene Digital PME</p>
            </div>

            <div className="bg-[#181512] border border-[#3D3323] rounded-2xl p-6 text-center">
              <span className="text-xs text-[#A89F8D] font-medium">Nível de Risco Operacional</span>
              <div className={`text-2xl font-bold my-3 ${
                auditResult.riskLevel === 'Crítico' || auditResult.riskLevel === 'Alto'
                  ? 'text-rose-400'
                  : auditResult.riskLevel === 'Médio'
                  ? 'text-amber-400'
                  : 'text-emerald-400'
              }`}>
                {auditResult.riskLevel}
              </div>
              <p className="text-xs text-[#A89F8D]">Probabilidade de Exposição</p>
            </div>

            <div className="bg-[#181512] border border-[#3D3323] rounded-2xl p-6 text-center">
              <span className="text-xs text-[#A89F8D] font-medium">Conformidade APD / Lei 22/11</span>
              <div className={`text-lg font-bold my-3 ${
                auditResult.apdComplianceStatus === 'Conforme'
                  ? 'text-emerald-400'
                  : auditResult.apdComplianceStatus === 'Parcialmente Conforme'
                  ? 'text-amber-400'
                  : 'text-rose-400'
              }`}>
                {auditResult.apdComplianceStatus}
              </div>
              <p className="text-xs text-[#A89F8D]">Enquadramento Regulatório Oficial</p>
            </div>
          </div>

          {/* Detailed Pillars Assessment Breakdown */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white font-serif flex items-center space-x-2">
              <Layers className="w-5 h-5 text-[#D4AF37]" />
              <span>Diagnóstico Detalhado por Pilar & Referências Legais</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {auditResult.pillarBreakdown.map((item, idx) => (
                <div
                  key={item.id}
                  className="bg-[#181512] border border-[#332A1C] rounded-2xl p-4.5 space-y-2.5 hover:border-[#D4AF37]/40 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white font-serif">
                      #{idx + 1} {item.title.split('.')[1]?.trim() || item.title}
                    </span>
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-lg ${
                      item.score >= 8
                        ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                        : item.score >= 5
                        ? 'bg-amber-950/60 text-amber-300 border border-amber-500/30'
                        : 'bg-rose-950/60 text-rose-300 border border-rose-500/30'
                    }`}>
                      {item.score}/10 ({item.percentage}%)
                    </span>
                  </div>

                  <p className="text-xs text-[#DCD6C8] line-clamp-2">
                    <span className="text-[#A89F8D]">Situação Atual: </span>
                    {item.selectedLabel}
                  </p>

                  {item.recommendation && (
                    <div className="text-[11px] text-[#F5E6B3] bg-[#241E15] p-2.5 rounded-xl border border-[#3D3323]">
                      <span className="text-[#D4AF37] font-semibold">💡 Ação: </span>
                      {item.recommendation}
                    </div>
                  )}

                  <div className="pt-1 flex flex-wrap gap-1.5 text-[10px]">
                    <span className="px-2 py-0.5 rounded bg-[#12100E] text-[#D4AF37] border border-[#D4AF37]/20 flex items-center space-x-1">
                      <Scale className="w-2.5 h-2.5" />
                      <span>{item.legalReference}</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#12100E] text-[#A89F8D] border border-[#332A1C]">
                      {item.frameworkReference}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Priorities */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white font-serif flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-[#D4AF37]" />
              <span>Plano de Ação Recomendado pelo Ngúnji</span>
            </h4>

            {auditResult.urgentActions.length > 0 && (
              <div className="bg-[#2E1810] border border-rose-500/30 rounded-2xl p-5 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center space-x-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  <span>Ações Imediatas (Próximas 48 Horas)</span>
                </span>
                <ul className="text-xs text-rose-200 space-y-1.5 list-disc list-inside">
                  {auditResult.urgentActions.map((act, i) => (
                    <li key={i}>{act}</li>
                  ))}
                </ul>
              </div>
            )}

            {auditResult.mediumActions.length > 0 && (
              <div className="bg-[#241E15] border border-[#D4AF37]/30 rounded-2xl p-5 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Ações a Médio Prazo (Próximos 30 Dias)</span>
                </span>
                <ul className="text-xs text-[#DCD6C8] space-y-1.5 list-disc list-inside">
                  {auditResult.mediumActions.map((act, i) => (
                    <li key={i}>{act}</li>
                  ))}
                </ul>
              </div>
            )}

            {auditResult.longTermActions.length > 0 && (
              <div className="bg-[#181512] border border-[#3D3323] rounded-2xl p-5 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#A89F8D] flex items-center space-x-1.5">
                  <Info className="w-4 h-4 text-[#C5A059]" />
                  <span>Melhoria Contínua & Auditoria Contínua</span>
                </span>
                <ul className="text-xs text-[#A89F8D] space-y-1.5 list-disc list-inside">
                  {auditResult.longTermActions.map((act, i) => (
                    <li key={i}>{act}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Legal Framework Summary Box */}
          <div className="bg-[#181512] border border-[#3D3323] rounded-2xl p-5 space-y-3">
            <div className="flex items-center space-x-2 text-[#D4AF37]">
              <Scale className="w-4 h-4" />
              <h5 className="text-xs font-bold uppercase tracking-wider">
                Quadro Jurídico de Referência (Angola 🇦🇴)
              </h5>
            </div>
            <p className="text-xs text-[#DCD6C8] leading-relaxed">
              O presente diagnóstico fundamenta-se nos princípios da <strong>Lei nº 22/11 de 17 de Junho</strong> (Proteção de Dados Pessoais), nas diretrizes oficiais da <strong>Agência de Proteção de Dados (APD)</strong> e na <strong>Lei nº 23/11</strong> (Crimes no Domínio das TIC). As PMEs têm o dever legal de adotar medidas técnicas de segurança (Art. 35º) e notificar violações em até 72 horas.
            </p>
          </div>

        </div>
      )}

    </div>
  );
};
