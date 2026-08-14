import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { ChatInterface } from './components/ChatInterface';
import { AuditSection } from './components/AuditSection';
import { RagExplorer } from './components/RagExplorer';
import { CompanyProfileView } from './components/CompanyProfileView';
import { PangolinLogo } from './components/PangolinLogo';
import { CompanyProfile } from './types';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';

const DEFAULT_COMPANY_PROFILE: CompanyProfile = {
  companyName: 'Comercial Kwanza Lda',
  companySize: '6-20',
  province: 'Luanda',
  industry: 'Retalho & Comércio Geral',
  hasItTeam: false,
  usesCloudWorkspace: 'google',
  storesPersonalData: true,
  storesSensitiveData: false,
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'chat' | 'audit' | 'rag' | 'profile'>('home');
  const [chatInitialPrompt, setChatInitialPrompt] = useState<string | undefined>(undefined);
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile>(() => {
    try {
      const saved = localStorage.getItem('pangolins_pme_profile');
      return saved ? JSON.parse(saved) : DEFAULT_COMPANY_PROFILE;
    } catch {
      return DEFAULT_COMPANY_PROFILE;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('pangolins_pme_profile', JSON.stringify(companyProfile));
    } catch (e) {
      console.error('Falha ao guardar perfil no localStorage:', e);
    }
  }, [companyProfile]);

  const handleConsultChatWithPrompt = (prompt: string) => {
    setChatInitialPrompt(prompt);
    setActiveTab('chat');
  };

  return (
    <div className="min-h-screen bg-[#0A0908] text-[#F5F2EB] font-sans flex flex-col selection:bg-[#D4AF37] selection:text-[#0A0908]">
      
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        companyProfile={companyProfile}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeView
            setActiveTab={setActiveTab}
            companyProfile={companyProfile}
          />
        )}

        {activeTab === 'chat' && (
          <ChatInterface
            companyProfile={companyProfile}
            initialPrompt={chatInitialPrompt}
            onClearInitialPrompt={() => setChatInitialPrompt(undefined)}
          />
        )}

        {activeTab === 'audit' && (
          <AuditSection
            companyProfile={companyProfile}
            onConsultNgúnjiWithAudit={handleConsultChatWithPrompt}
          />
        )}

        {activeTab === 'rag' && (
          <RagExplorer
            onSelectArticleForChat={(articleQuery) => {
              handleConsultChatWithPrompt(`Podes explicar com exemplos práticos a seguinte matéria legal: ${articleQuery}?`);
            }}
          />
        )}

        {activeTab === 'profile' && (
          <CompanyProfileView
            companyProfile={companyProfile}
            onSaveProfile={(updated) => setCompanyProfile(updated)}
          />
        )}
      </main>

      {/* Footer styled with logo gold & dark bronze tones */}
      <footer className="bg-[#0D0B0A] border-t border-[#332A1C] py-8 text-xs text-[#A89F8D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          
          <div className="flex items-center space-x-3">
            <PangolinLogo variant="icon" size="sm" />
            <div>
              <span className="font-bold text-white font-serif">
                Pangolins Cyber • Agente Ngúnji 🇦🇴
              </span>
              <p className="text-[11px] text-[#A89F8D]">
                Ciber-higiene & Proteção de Dados (Lei 22/11 / APD) para PMEs em Angola
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-[11px] text-[#DCD6C8]">
            <button
              onClick={() => setActiveTab('home')}
              className="hover:text-[#D4AF37] transition-colors"
            >
              Início & Descrição
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveTab('audit')}
              className="hover:text-[#D4AF37] transition-colors"
            >
              Score de Ciber-Higiene
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveTab('rag')}
              className="hover:text-[#D4AF37] transition-colors"
            >
              Lei nº 22/11 & APD
            </button>
          </div>

        </div>
      </footer>

    </div>
  );
}
