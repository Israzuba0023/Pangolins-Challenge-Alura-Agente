import React from 'react';
import { PangolinLogo } from './PangolinLogo';
import { Home, MessageSquare, Award, BookOpen, Building2, ShieldAlert } from 'lucide-react';
import { CompanyProfile } from '../types';

interface HeaderProps {
  activeTab: 'home' | 'chat' | 'audit' | 'rag' | 'profile';
  setActiveTab: (tab: 'home' | 'chat' | 'audit' | 'rag' | 'profile') => void;
  companyProfile: CompanyProfile;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, companyProfile }) => {
  return (
    <header id="pangolins-header" className="bg-[#0D0B0A] text-white border-b border-[#332A1C] shadow-[0_4px_30px_rgba(0,0,0,0.8)] sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-3 gap-3">
          
          {/* Brand Logo & Name */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <PangolinLogo variant="icon" size="md" className="group-hover:scale-105 transition-transform" />
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-black tracking-tight text-white font-serif">
                  PANGOLINS<span className="text-[#D4AF37]">.CYBER</span>
                </span>
                <span className="px-2 py-0.5 text-[11px] font-bold bg-[#241E15] text-[#F5E6B3] border border-[#D4AF37]/40 rounded-full shadow-inner">
                  NGÚNJI 🇦🇴
                </span>
              </div>
              <p className="text-[11px] text-[#A89F8D] group-hover:text-[#DCD6C8] transition-colors">
                Ciber-higiene & Proteção de Dados (Lei 22/11 / APD) para PMEs
              </p>
            </div>
          </div>

          {/* System Badges */}
          <div className="hidden xl:flex items-center space-x-2 text-xs">
            <div id="badge-scope-guard" className="flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-[#181512] text-emerald-400 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-medium">Scope Guard Estrito</span>
            </div>
            <div id="badge-rag-angola" className="flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-[#181512] text-[#F5E6B3] border border-[#D4AF37]/30">
              <ShieldAlert className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="font-medium">RAG Angola (Lei 22/11 / APD)</span>
            </div>
            <div id="badge-pme-context" className="flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-[#181512] text-[#DCD6C8] border border-[#3D3323]">
              <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="font-medium truncate max-w-[130px]">{companyProfile.companyName || 'PME Angolana'}</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav id="pangolins-nav" className="flex items-center overflow-x-auto space-x-1 bg-[#181512] p-1 rounded-2xl border border-[#3D3323]/80">
            <button
              id="tab-btn-home"
              onClick={() => setActiveTab('home')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'home'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA8222] text-[#0A0908] font-bold shadow-[0_2px_10px_rgba(212,175,55,0.3)]'
                  : 'text-[#DCD6C8] hover:text-white hover:bg-[#241E15]'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Início</span>
            </button>

            <button
              id="tab-btn-chat"
              onClick={() => setActiveTab('chat')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'chat'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA8222] text-[#0A0908] font-bold shadow-[0_2px_10px_rgba(212,175,55,0.3)]'
                  : 'text-[#DCD6C8] hover:text-white hover:bg-[#241E15]'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat Ngúnji</span>
            </button>

            <button
              id="tab-btn-audit"
              onClick={() => setActiveTab('audit')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'audit'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA8222] text-[#0A0908] font-bold shadow-[0_2px_10px_rgba(212,175,55,0.3)]'
                  : 'text-[#DCD6C8] hover:text-white hover:bg-[#241E15]'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Diagnóstico & Score</span>
            </button>

            <button
              id="tab-btn-rag"
              onClick={() => setActiveTab('rag')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'rag'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA8222] text-[#0A0908] font-bold shadow-[0_2px_10px_rgba(212,175,55,0.3)]'
                  : 'text-[#DCD6C8] hover:text-white hover:bg-[#241E15]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Base RAG Explorer</span>
            </button>

            <button
              id="tab-btn-profile"
              onClick={() => setActiveTab('profile')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'profile'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA8222] text-[#0A0908] font-bold shadow-[0_2px_10px_rgba(212,175,55,0.3)]'
                  : 'text-[#DCD6C8] hover:text-white hover:bg-[#241E15]'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Perfil PME</span>
            </button>
          </nav>

        </div>
      </div>
    </header>
  );
};
