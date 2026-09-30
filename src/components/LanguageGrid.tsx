import React, { useState } from 'react';
import { ALL_100_LANGUAGES } from '../data/languages-100';
import { Globe, Search, Sparkles, Check, ArrowRight } from 'lucide-react';

interface LanguageGridProps {
  onSelectLanguage?: (langCode: string) => void;
  activeLanguage?: string;
}

export const LanguageGrid: React.FC<LanguageGridProps> = ({ onSelectLanguage, activeLanguage = 'en' }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'popular' | 'rtl'>('popular');

  const filtered = ALL_100_LANGUAGES.filter((lang) => {
    const matchesSearch =
      lang.name.toLowerCase().includes(search.toLowerCase()) ||
      lang.nativeName.toLowerCase().includes(search.toLowerCase()) ||
      lang.code.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;
    if (selectedCategory === 'popular') return lang.popular;
    if (selectedCategory === 'rtl') return lang.dir === 'rtl';
    return true;
  });

  return (
    <section id="languages" className="relative scroll-mt-24 py-16 sm:py-24 bg-[#090205]">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-[#9e1b32]/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#f6efe2]/15 bg-[#1f0712] px-3.5 py-1 text-xs font-semibold text-[#ebdcc9]">
            <Globe className="h-3.5 w-3.5 text-[#e11d48]" />
            <span>Google Translate Neural Engine</span>
          </div>
          <h2 className="mt-4 font-serif-luxury text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#fdfbf7]">
            100+ Global Languages Supported
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-xs sm:text-sm md:text-base text-[#ebdcc9]/80 leading-relaxed">
            Powered by Google Translate Neural API. Langjs automatically maps text to 100+ languages with zero manual key extraction or language pack configuration.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="mt-8 sm:mt-12 flex flex-col items-stretch sm:items-center justify-between gap-3 sm:gap-4 rounded-2xl border border-[#f6efe2]/15 bg-[#14040d]/90 p-3 sm:p-5 backdrop-blur-xl sm:flex-row">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#ebdcc9]/50" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search 100+ languages..."
              className="w-full rounded-xl border border-[#f6efe2]/15 bg-[#090205] py-2 pl-10 pr-4 text-xs text-[#fdfbf7] placeholder:text-[#ebdcc9]/40 focus:border-[#be185d] focus:outline-none"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap items-center gap-1 rounded-xl border border-[#f6efe2]/10 bg-[#0c0207] p-1">
            <button
              onClick={() => setSelectedCategory('popular')}
              className={`flex-1 sm:flex-initial rounded-lg px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-medium transition-all ${
                selectedCategory === 'popular'
                  ? 'bg-[#9e1b32] text-white shadow'
                  : 'text-[#ebdcc9]/70 hover:text-white'
              }`}
            >
              Popular (20)
            </button>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`flex-1 sm:flex-initial rounded-lg px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#9e1b32] text-white shadow'
                  : 'text-[#ebdcc9]/70 hover:text-white'
              }`}
            >
              All (100+)
            </button>
            <button
              onClick={() => setSelectedCategory('rtl')}
              className={`flex-1 sm:flex-initial rounded-lg px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-medium transition-all ${
                selectedCategory === 'rtl'
                  ? 'bg-[#9e1b32] text-white shadow'
                  : 'text-[#ebdcc9]/70 hover:text-white'
              }`}
            >
              RTL Scripts
            </button>
          </div>
        </div>

        {/* Language Grid Cards */}
        <div className="mt-6 grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filtered.slice(0, 30).map((lang) => {
            const isSelected = activeLanguage === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => onSelectLanguage?.(lang.code)}
                className={`group flex items-center justify-between rounded-xl border p-2.5 sm:p-3.5 text-left transition-all duration-200 ${
                  isSelected
                    ? 'border-[#be185d] bg-[#9e1b32]/35 shadow-lg shadow-rose-950/40 ring-1 ring-rose-500/50'
                    : 'border-[#f6efe2]/10 bg-[#16040d]/70 hover:border-[#be185d]/40 hover:bg-[#250817]'
                }`}
              >
                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                  <span className="text-lg sm:text-xl shrink-0 group-hover:scale-110 transition-transform">
                    {lang.flag}
                  </span>
                  <div className="min-w-0">
                    <div className="font-semibold text-xs sm:text-sm text-[#fdfbf7] truncate">
                      {lang.nativeName}
                    </div>
                    <div className="text-[10px] sm:text-xs text-[#ebdcc9]/60 truncate">
                      {lang.name}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 ml-1">
                  <span className="font-mono-code text-[10px] text-[#ebdcc9]/40 group-hover:text-rose-300">
                    {lang.code}
                  </span>
                  {isSelected && (
                    <Check className="h-3.5 w-3.5 text-[#e11d48]" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footnote */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl border border-[#f6efe2]/10 bg-[#11030a] px-4 py-3 text-xs text-[#ebdcc9]/70">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <Globe className="h-4 w-4 text-rose-400 shrink-0" />
            <span>Click any language card above to instantly translate the entire page live.</span>
          </div>
          <span className="font-mono-code text-[11px] text-[#ebdcc9]/60">
            Auto-detects browser locale on load
          </span>
        </div>
      </div>
    </section>
  );
};
