import React, { useState } from 'react';
import { RAG_KNOWLEDGE_CORPUS } from '../data/ragCorpus';
import { BookOpen, Search, Filter, ShieldCheck, Copy, ExternalLink, Sparkles, Check, ChevronRight } from 'lucide-react';
import { KnowledgeChunk } from '../types';

interface RagExplorerProps {
  onSelectArticleForChat?: (articleQuery: string) => void;
}

export const RagExplorer: React.FC<RagExplorerProps> = ({ onSelectArticleForChat }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Todos os Documentos' },
    { id: 'data_protection', label: 'Lei 22/11 (Dados Pessoais)' },
    { id: 'apd', label: 'Orientações da APD' },
    { id: 'dpo', label: 'Manual DPO / EPD' },
    { id: 'cybersecurity', label: 'Ciber-higiene & Backups' },
    { id: 'compliance', label: 'Crimes Tecnológicos & SIC' },
    { id: 'standards', label: 'NIST CSF & CIS Controls' },
  ];

  const filteredChunks = RAG_KNOWLEDGE_CORPUS.filter(chunk => {
    const matchesCategory = selectedCategory === 'all' || chunk.metadata.category === selectedCategory;
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      !term ||
      chunk.content.toLowerCase().includes(term) ||
      chunk.metadata.document_title.toLowerCase().includes(term) ||
      (chunk.metadata.article && chunk.metadata.article.toLowerCase().includes(term)) ||
      chunk.keywords.some(k => k.toLowerCase().includes(term));

    return matchesCategory && matchesSearch;
  });

  const handleCopyChunk = (chunk: KnowledgeChunk) => {
    navigator.clipboard.writeText(`${chunk.metadata.document_title} - ${chunk.metadata.article || ''}\n${chunk.content}`);
    setCopiedId(chunk.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Top Banner */}
      <div className="bg-[#12100E] border border-[#3D3323] rounded-3xl p-6 sm:p-8 shadow-xl mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[#D4AF37] mb-1">
              <BookOpen className="w-6 h-6" />
              <h2 className="text-xl sm:text-2xl font-bold text-white font-serif">
                Base RAG Normativa de Angola & Cibersegurança
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#DCD6C8]">
              Corpus documental integrado para consulta direta de legislação (Lei nº 22/11), circulares da APD, obrigações de DPO e controlos de ciber-higiene.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono text-[#F5E6B3] bg-[#241E15] border border-[#D4AF37]/30 px-3.5 py-2 rounded-2xl">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>{RAG_KNOWLEDGE_CORPUS.length} Artigos Normativos</span>
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="mt-6 space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#A89F8D]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Pesquisar por artigo, termo (ex: consentimento, 72 horas, ransomware, encarregado)..."
              className="w-full bg-[#0A0908] text-white border border-[#3D3323] focus:border-[#D4AF37] rounded-2xl pl-12 pr-4 py-3 text-xs sm:text-sm focus:outline-none transition-colors placeholder-[#A89F8D]"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 pt-1">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#D4AF37] text-[#0A0908] font-bold shadow-[0_2px_10px_rgba(212,175,55,0.3)]'
                    : 'bg-[#181512] text-[#DCD6C8] hover:bg-[#241E15] border border-[#332A1C]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Corpus Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredChunks.map(chunk => (
          <div
            key={chunk.id}
            id={`rag-card-${chunk.id}`}
            className="bg-[#12100E] border border-[#3D3323] hover:border-[#D4AF37]/60 rounded-3xl p-6 shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#D4AF37] bg-[#241E15] px-2.5 py-0.5 rounded-lg border border-[#D4AF37]/30">
                  {chunk.metadata.authority}
                </span>
                <span className="text-[11px] text-[#A89F8D] font-mono">
                  Prioridade: {chunk.metadata.source_priority}/10
                </span>
              </div>

              <h3 className="text-base font-bold text-white font-serif">
                {chunk.metadata.document_title}
              </h3>

              {chunk.metadata.article && (
                <div className="text-xs font-semibold text-[#F5E6B3] my-1">
                  {chunk.metadata.article} {chunk.metadata.paragraph ? `• ${chunk.metadata.paragraph}` : ''}
                </div>
              )}

              <p className="text-xs text-[#DCD6C8] leading-relaxed bg-[#0A0908] p-4 rounded-2xl border border-[#241E15] mt-3 font-sans">
                {chunk.content}
              </p>

              {/* Keywords */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {chunk.keywords.map((kw, i) => (
                  <span key={i} className="text-[10px] bg-[#181512] text-[#A89F8D] border border-[#332A1C] px-2 py-0.5 rounded-md">
                    #{kw}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#332A1C] flex items-center justify-between text-xs">
              <button
                onClick={() => handleCopyChunk(chunk)}
                className="flex items-center space-x-1.5 text-[#A89F8D] hover:text-white transition-colors"
              >
                {copiedId === chunk.id ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#D4AF37]" />
                    <span>Copiar Artigo</span>
                  </>
                )}
              </button>

              {onSelectArticleForChat && (
                <button
                  onClick={() => onSelectArticleForChat(chunk.metadata.article || chunk.metadata.document_title)}
                  className="flex items-center space-x-1 text-[#D4AF37] hover:text-[#FFF2B2] font-semibold transition-colors"
                >
                  <span>Perguntar ao Ngúnji</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
