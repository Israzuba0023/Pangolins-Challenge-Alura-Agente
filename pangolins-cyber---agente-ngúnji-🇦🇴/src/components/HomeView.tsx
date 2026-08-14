import React from 'react';
import { PangolinLogo } from './PangolinLogo';
import { CompanyProfile } from '../types';
import {
  ShieldCheck,
  MessageSquare,
  Award,
  BookOpen,
  Building2,
  Lock,
  FileCheck2,
  AlertTriangle,
  Server,
  ArrowRight,
  CheckCircle2,
  Flame,
  Globe2,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface HomeViewProps {
  setActiveTab: (tab: 'home' | 'chat' | 'audit' | 'rag' | 'profile') => void;
  companyProfile: CompanyProfile;
}

export const HomeView: React.FC<HomeViewProps> = ({ setActiveTab, companyProfile }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Hero Banner with Official Logo */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#181512] via-[#12100E] to-[#0A0908] border border-[#3D3323] p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-center">
        {/* Ambient Gold Radial Glow behind the Logo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
          
          {/* Main Pangolin Logo */}
          <div className="mb-6">
            <PangolinLogo variant="hero" size="2xl" />
          </div>

          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#241E15] border border-[#D4AF37]/40 text-[#F5E6B3] text-xs font-semibold uppercase tracking-wider mb-4 shadow-inner">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>Ecossistema de IA Soberana para PMEs em Angola 🇦🇴</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white font-serif tracking-tight leading-tight">
            Guardião Inteligente de <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF2B2] via-[#D4AF37] to-[#AA8222]">
              Ciber-higiene & Proteção de Dados
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-[#DCD6C8] max-w-2xl font-sans leading-relaxed">
            Desenvolvido pela <strong className="text-[#F5E6B3]">Pangolins Cyber</strong>, o <strong>Ngúnji</strong> capacita Pequenas e Médias Empresas angolanas a blindar os seus sistemas digitais, combater burlas informáticas e garantir total conformidade com a <strong>Lei nº 22/11</strong> e orientações da <strong>APD</strong>.
          </p>

          {/* Quick Action Navigation Grid */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-3.5">
            <button
              id="hero-btn-chat"
              onClick={() => setActiveTab('chat')}
              className="flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#AA8222] text-[#0A0908] font-bold text-sm shadow-[0_4px_25px_rgba(212,175,55,0.35)] hover:scale-105 transition-all"
            >
              <MessageSquare className="w-4 h-4 text-[#0A0908]" />
              <span>Iniciar Conversa com Ngúnji</span>
              <ArrowRight className="w-4 h-4 text-[#0A0908]" />
            </button>

            <button
              id="hero-btn-audit"
              onClick={() => setActiveTab('audit')}
              className="flex items-center space-x-2 px-5 py-3.5 rounded-2xl bg-[#1F1B16] hover:bg-[#2B251D] text-[#F5E6B3] border border-[#D4AF37]/30 text-sm font-semibold transition-all hover:border-[#D4AF37]"
            >
              <Award className="w-4 h-4 text-[#D4AF37]" />
              <span>Fazer Diagnóstico de Ciber-Higiene</span>
            </button>

            <button
              id="hero-btn-rag"
              onClick={() => setActiveTab('rag')}
              className="flex items-center space-x-2 px-5 py-3.5 rounded-2xl bg-[#1F1B16] hover:bg-[#2B251D] text-[#F5E6B3] border border-[#D4AF37]/30 text-sm font-semibold transition-all hover:border-[#D4AF37]"
            >
              <BookOpen className="w-4 h-4 text-[#D4AF37]" />
              <span>Consultar Base Normativa (Lei 22/11 / APD)</span>
            </button>
          </div>

          {/* Company Profile Context Pill */}
          <div className="mt-8 pt-6 border-t border-[#3D3323]/70 flex items-center justify-between w-full max-w-xl text-xs text-[#A89F8D]">
            <div className="flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-[#D4AF37]" />
              <span>PME Ativa: <strong className="text-white">{companyProfile.companyName || 'Empresa Angolana'}</strong> ({companyProfile.province}, {companyProfile.companySize} colab.)</span>
            </div>
            <button
              onClick={() => setActiveTab('profile')}
              className="text-[#D4AF37] hover:underline flex items-center space-x-1"
            >
              <span>Alterar</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

        </div>
      </section>

      {/* 3 Pillars Section: O Que É, O Que Faz, Qual é o Seu Objetivo */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Pillar 1: O Que É */}
        <div className="bg-[#12100E] border border-[#3D3323] rounded-3xl p-7 flex flex-col justify-between space-y-4 shadow-xl hover:border-[#D4AF37]/60 transition-all group">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#241E15] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform">
              <Lock className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#D4AF37]">Pilar 01</span>
            <h2 className="text-xl font-bold text-white font-serif mt-1 mb-3">
              O Que É o Projeto?
            </h2>
            <p className="text-xs text-[#DCD6C8] leading-relaxed">
              O <strong>Ngúnji</strong> é um assistente de inteligência artificial de alta especialização, concebido para atuar como o <strong>Diretor de Segurança (CISO) e Encarregado de Proteção de Dados (DPO) virtual</strong> de micro, pequenas e médias empresas em Angola.
            </p>
            <p className="text-xs text-[#A89F8D] mt-3 leading-relaxed">
              Inspirado no pangolim angolano — símbolo de armadura natural impenetrável —, o projeto foi arquitetado pela Pangolins Cyber para criar uma camada de resiliência digital sem a exigência de equipas de TI especializadas.
            </p>
          </div>
          <div className="pt-4 border-t border-[#2B2317] flex items-center text-xs text-[#D4AF37]">
            <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-400" />
            <span>Foco 100% Exclusivo em Cibersegurança</span>
          </div>
        </div>

        {/* Pillar 2: O Que Faz */}
        <div className="bg-[#12100E] border border-[#3D3323] rounded-3xl p-7 flex flex-col justify-between space-y-4 shadow-xl hover:border-[#D4AF37]/60 transition-all group">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#241E15] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform">
              <FileCheck2 className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#D4AF37]">Pilar 02</span>
            <h2 className="text-xl font-bold text-white font-serif mt-1 mb-3">
              O Que Faz?
            </h2>
            <ul className="text-xs text-[#DCD6C8] space-y-2.5 leading-relaxed">
              <li className="flex items-start space-x-2">
                <span className="text-[#D4AF37] font-bold">•</span>
                <span><strong>Orientação Lei 22/11 & APD:</strong> Explica em linguagem clara como notificar ficheiros e evitar coimas.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-[#D4AF37] font-bold">•</span>
                <span><strong>Diagnóstico de Ciber-Higiene:</strong> Calcula a pontuação da PME (0–100) com base no NIST CSF & CIS Controls.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-[#D4AF37] font-bold">•</span>
                <span><strong>Defesa Anti-Ransomware & Backups:</strong> Planos práticos 3-2-1 e configuração de MFA no Google Workspace e M365.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-[#D4AF37] font-bold">•</span>
                <span><strong>Resposta a Incidentes:</strong> Protocolos para contenção e notificação obrigatória em 72h à APD e SIC.</span>
              </li>
            </ul>
          </div>
          <div className="pt-4 border-t border-[#2B2317] flex items-center text-xs text-[#D4AF37]">
            <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-400" />
            <span>Respostas Validadas por RAG Normativo</span>
          </div>
        </div>

        {/* Pillar 3: Qual é o Objetivo */}
        <div className="bg-[#12100E] border border-[#3D3323] rounded-3xl p-7 flex flex-col justify-between space-y-4 shadow-xl hover:border-[#D4AF37]/60 transition-all group">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#241E15] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform">
              <Globe2 className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#D4AF37]">Pilar 03</span>
            <h2 className="text-xl font-bold text-white font-serif mt-1 mb-3">
              Qual É o Seu Objetivo?
            </h2>
            <p className="text-xs text-[#DCD6C8] leading-relaxed">
              O objetivo primordial é <strong>democratizar a cibersegurança e a soberania de dados em Angola</strong>, eliminando a barreira técnica e financeira que deixa as empresas vulneráveis a extorsões digitais, roubo de contas bancárias e processos administrativos.
            </p>
            <p className="text-xs text-[#A89F8D] mt-3 leading-relaxed">
              Proteger a continuidade operacional dos negócios locais e garantir que as organizações tratem os dados de cidadãos e trabalhadores com ética, confidencialidade e segurança rigorosa.
            </p>
          </div>
          <div className="pt-4 border-t border-[#2B2317] flex items-center text-xs text-[#D4AF37]">
            <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-400" />
            <span>Soberania Digital & Proteção Económica</span>
          </div>
        </div>

      </section>

      {/* Interactive Core Capabilities Bento Grid */}
      <section className="bg-[#12100E] border border-[#3D3323] rounded-3xl p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Funcionalidades Integradas da Plataforma</span>
            </div>
            <h2 className="text-2xl font-bold text-white font-serif">
              Como o Ngúnji blinda a sua organização
            </h2>
          </div>
          <span className="text-xs text-[#A89F8D]">
            Todos os módulos operam em harmonia com a legislação da República de Angola
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1 */}
          <div
            onClick={() => setActiveTab('chat')}
            className="cursor-pointer bg-[#181512] hover:bg-[#201C17] border border-[#3D3323] hover:border-[#D4AF37] rounded-2xl p-5 transition-all space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#241E15] flex items-center justify-center text-[#D4AF37]">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-[#F5E6B3] transition-colors">
              Chat com Scope Guard
            </h3>
            <p className="text-xs text-[#A89F8D] leading-relaxed">
              Tira-dúvidas inteligente com restrição estrita a cibersegurança e proteção de dados. Rejeita tópicos genéricos.
            </p>
            <div className="text-[11px] text-[#D4AF37] font-semibold flex items-center space-x-1 pt-1">
              <span>Abrir Conversa</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2 */}
          <div
            onClick={() => setActiveTab('audit')}
            className="cursor-pointer bg-[#181512] hover:bg-[#201C17] border border-[#3D3323] hover:border-[#D4AF37] rounded-2xl p-5 transition-all space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#241E15] flex items-center justify-center text-[#D4AF37]">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-[#F5E6B3] transition-colors">
              Diagnóstico & Score
            </h3>
            <p className="text-xs text-[#A89F8D] leading-relaxed">
              Avalie 10 dimensões de maturidade, gere a nota da empresa e imprima um plano de ação prioritário em PDF.
            </p>
            <div className="text-[11px] text-[#D4AF37] font-semibold flex items-center space-x-1 pt-1">
              <span>Iniciar Avaliação</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3 */}
          <div
            onClick={() => setActiveTab('rag')}
            className="cursor-pointer bg-[#181512] hover:bg-[#201C17] border border-[#3D3323] hover:border-[#D4AF37] rounded-2xl p-5 transition-all space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#241E15] flex items-center justify-center text-[#D4AF37]">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-[#F5E6B3] transition-colors">
              Base RAG Normativa
            </h3>
            <p className="text-xs text-[#A89F8D] leading-relaxed">
              Pesquise artigos exatos da Lei nº 22/11, circulares da APD, orientações para DPO e controlos internacionais.
            </p>
            <div className="text-[11px] text-[#D4AF37] font-semibold flex items-center space-x-1 pt-1">
              <span>Explorar Artigos</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 4 */}
          <div
            onClick={() => setActiveTab('profile')}
            className="cursor-pointer bg-[#181512] hover:bg-[#201C17] border border-[#3D3323] hover:border-[#D4AF37] rounded-2xl p-5 transition-all space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#241E15] flex items-center justify-center text-[#D4AF37]">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-[#F5E6B3] transition-colors">
              Perfil da Sua PME
            </h3>
            <p className="text-xs text-[#A89F8D] leading-relaxed">
              Ajuste sector, província em Angola, ferramentas na nuvem e tipos de dados pessoais para orientações personalizadas.
            </p>
            <div className="text-[11px] text-[#D4AF37] font-semibold flex items-center space-x-1 pt-1">
              <span>Editar Perfil</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>
      </section>

      {/* Legal & Regulatory Compliance Badges */}
      <section className="bg-gradient-to-r from-[#181512] via-[#241E15] to-[#181512] border border-[#3D3323] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-7 h-7 text-[#D4AF37]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-serif">
              Alinhamento Normativo da República de Angola
            </h3>
            <p className="text-xs text-[#DCD6C8] mt-0.5">
              Lei nº 22/11 (Proteção de Dados Pessoais) • Lei nº 23/11 (Crimes das TIC) • Lei nº 7/17 (Proteção de Redes) • APD Angola
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('chat')}
          className="px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C378] text-[#0A0908] font-bold text-xs shadow-md transition-colors flex-shrink-0"
        >
          Consultar Legislação com Ngúnji
        </button>
      </section>

    </div>
  );
};
