import React, { useState } from 'react';
import { CompanyProfile } from '../types';
import { Building2, Save, CheckCircle2, ShieldCheck, MapPin, Users, HardDrive } from 'lucide-react';

interface CompanyProfileViewProps {
  companyProfile: CompanyProfile;
  onSaveProfile: (profile: CompanyProfile) => void;
}

export const CompanyProfileView: React.FC<CompanyProfileViewProps> = ({ companyProfile, onSaveProfile }) => {
  const [formData, setFormData] = useState<CompanyProfile>(companyProfile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const provinces = [
    'Luanda', 'Benguela', 'Huambo', 'Cabinda', 'Huíla', 'Namibe', 'Malanje',
    'Kwanza Sul', 'Kwanza Norte', 'Zaire', 'Uíge', 'Moxico', 'Lunda Sul',
    'Lunda Norte', 'Cunene', 'Quando Cubango', 'Bengo', 'Bié'
  ];

  const industries = [
    'Retalho & Comércio Geral',
    'Serviços Financeiros & Microfinanças',
    'Saúde, Clínicas & Farmácias',
    'Educação & Escolas',
    'Logística & Transportes',
    'Construção & Engenharia',
    'Restauração, Hotelaria & Turismo',
    'Prestação de Serviços Profissionais',
    'Tecnologia & Comunicação',
    'Indústria & Transformação'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-[#12100E] border border-[#3D3323] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        
        <div className="flex items-center space-x-3 border-b border-[#332A1C] pb-4">
          <div className="w-10 h-10 rounded-2xl bg-[#241E15] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
            <Building2 className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white font-serif">
              Perfil do Negócio / PME Angolana
            </h2>
            <p className="text-xs text-[#A89F8D]">
              Personalize o contexto da sua empresa para que o **Ngúnji** formule orientações específicas sobre ciber-higiene e registos na APD.
            </p>
          </div>
        </div>

        {savedSuccess && (
          <div className="bg-[#142316] border border-emerald-500/40 text-emerald-300 p-4 rounded-2xl text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Perfil atualizado com sucesso! O Ngúnji adaptará as próximas orientações.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* Company Name */}
            <div>
              <label className="block text-xs font-semibold text-[#F5E6B3] mb-1.5">
                Nome da Empresa / Organização
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full bg-[#0A0908] text-white border border-[#3D3323] focus:border-[#D4AF37] rounded-2xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none"
                placeholder="Ex: Comercial Kwanza Lda"
                required
              />
            </div>

            {/* Province */}
            <div>
              <label className="block text-xs font-semibold text-[#F5E6B3] mb-1.5">
                Província em Angola
              </label>
              <select
                value={formData.province}
                onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                className="w-full bg-[#0A0908] text-white border border-[#3D3323] focus:border-[#D4AF37] rounded-2xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none"
              >
                {provinces.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Company Size */}
            <div>
              <label className="block text-xs font-semibold text-[#F5E6B3] mb-1.5">
                Dimensão da Equipa (Trabalhadores)
              </label>
              <select
                value={formData.companySize}
                onChange={(e) => setFormData({ ...formData, companySize: e.target.value as any })}
                className="w-full bg-[#0A0908] text-white border border-[#3D3323] focus:border-[#D4AF37] rounded-2xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none"
              >
                <option value="1-5">1 a 5 colaboradores (Microempresa)</option>
                <option value="6-20">6 a 20 colaboradores (Pequena Empresa)</option>
                <option value="21-50">21 a 50 colaboradores (Média Empresa)</option>
                <option value="51-200">51 a 200 colaboradores</option>
                <option value="200+">Mais de 200 colaboradores</option>
              </select>
            </div>

            {/* Industry */}
            <div>
              <label className="block text-xs font-semibold text-[#F5E6B3] mb-1.5">
                Sector de Atividade
              </label>
              <select
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="w-full bg-[#0A0908] text-white border border-[#3D3323] focus:border-[#D4AF37] rounded-2xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none"
              >
                {industries.map(ind => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>

          </div>

          {/* IT & Cloud Environment */}
          <div className="border-t border-[#332A1C] pt-6 space-y-4">
            <h3 className="text-sm font-bold text-white font-serif">Ambiente Tecnológico & Dados</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="bg-[#181512] border border-[#3D3323] p-4 rounded-2xl">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.hasItTeam}
                    onChange={(e) => setFormData({ ...formData, hasItTeam: e.target.checked })}
                    className="mt-0.5 rounded border-[#5A492E] text-[#D4AF37] focus:ring-[#D4AF37]"
                  />
                  <div>
                    <span className="text-xs font-semibold text-white block">Possui Equipa de TI Própria</span>
                    <span className="text-[11px] text-[#A89F8D]">Se desmarcado, o Ngúnji dará passos sem pressupor pessoal técnico.</span>
                  </div>
                </label>
              </div>

              <div className="bg-[#181512] border border-[#3D3323] p-4 rounded-2xl">
                <label className="block text-xs font-semibold text-white mb-1.5">Plataforma de E-mail / Nuvem</label>
                <select
                  value={formData.usesCloudWorkspace}
                  onChange={(e) => setFormData({ ...formData, usesCloudWorkspace: e.target.value as any })}
                  className="w-full bg-[#0A0908] text-white border border-[#332A1C] rounded-xl px-3 py-1.5 text-xs"
                >
                  <option value="google">Google Workspace (Gmail corporativo, Drive)</option>
                  <option value="microsoft">Microsoft 365 (Outlook, Teams, OneDrive)</option>
                  <option value="both">Ambas as plataformas</option>
                  <option value="none">Apenas servidor local ou e-mail básico cPanel</option>
                </select>
              </div>

              <div className="bg-[#181512] border border-[#3D3323] p-4 rounded-2xl">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.storesPersonalData}
                    onChange={(e) => setFormData({ ...formData, storesPersonalData: e.target.checked })}
                    className="mt-0.5 rounded border-[#5A492E] text-[#D4AF37] focus:ring-[#D4AF37]"
                  />
                  <div>
                    <span className="text-xs font-semibold text-white block">Trata Dados de Clientes ou Trabalhadores</span>
                    <span className="text-[11px] text-[#A89F8D]">Ex: Nomes, NIFs, contactos, contas bancárias (exige notificação à APD).</span>
                  </div>
                </label>
              </div>

              <div className="bg-[#181512] border border-[#3D3323] p-4 rounded-2xl">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.storesSensitiveData}
                    onChange={(e) => setFormData({ ...formData, storesSensitiveData: e.target.checked })}
                    className="mt-0.5 rounded border-[#5A492E] text-[#D4AF37] focus:ring-[#D4AF37]"
                  />
                  <div>
                    <span className="text-xs font-semibold text-white block">Trata Dados Sensíveis (Saúde, Biometria, etc.)</span>
                    <span className="text-[11px] text-[#A89F8D]">Exige autorização prévia por escrito da APD (Art. 13º da Lei 22/11).</span>
                  </div>
                </label>
              </div>

            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              id="btn-save-profile"
              type="submit"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#AA8222] text-[#0A0908] font-bold text-xs sm:text-sm shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:opacity-95 transition-all flex items-center space-x-2"
            >
              <Save className="w-4 h-4 text-[#0A0908]" />
              <span>Guardar Perfil PME</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
