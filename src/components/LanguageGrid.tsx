import React, { useState } from 'react';
import { ALL_100_LANGUAGES } from '../data/languages-100';
import { Globe, Search, Check } from 'lucide-react';

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
    <section id="languages" className="relative scroll-mt-24 py-20 lg:py-28 bg-[#090205]">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-[#9e1b32]/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-mono-code text-rose-300 uppercase tracking-wider">
            Language Catalog
          </div>
          <h2 className="mt-3 font-serif-luxury text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#fdfbf7]">
            100+ Global Languages Supported
          </h2>
          <p className="mt-4 text-xs sm:text-sm md:text-base text-[#ebdcc9]/80 leading-relaxed">
            Powered by the Google Translate API. Langjs automatically maps text to 100+ languages with zero manual key extraction or language pack configuration.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="mt-10 sm:mt-12 flex flex-col items-stretch sm:items-center justify-between gap-3 sm:gap-4 rounded-2xl border border-[#f6efe2]/10 bg-[#12030b] p-3 sm:p-5 sm:flex-row">
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
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {[
              { id: 'popular', label: 'Popular (20)' },
              { id: 'rtl', label: 'RTL Scripts (Arabic, Hebrew...)' },
              { id: 'all', label: 'All 100+ Locales' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#801428] text-white'
                    : 'border border-[#f6efe2]/10 bg-[#090205] text-[#ebdcc9]/70 hover:border-[#be185d]/50 hover:text-[#fdfbf7]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Responsive Language Grid */}
        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5">
          {filtered.map((lang) => {
            const isSelected = activeLanguage === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => onSelectLanguage && onSelectLanguage(lang.code)}
                className={`group flex items-center justify-between rounded-xl border p-3 text-left transition-all ${
                  isSelected
                    ? 'border-rose-500 bg-[#801428]/40 shadow-lg'
                    : 'border-[#f6efe2]/10 bg-[#12030b] hover:border-[#be185d]/40 hover:bg-[#180510]'
                }`}
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <span className="text-xl shrink-0">{lang.flag}</span>
                  <div className="min-w-0">
                    <div className="truncate text-xs font-semibold text-[#fdfbf7]">
                      {lang.name}
                    </div>
                    <div className="truncate text-[11px] text-[#ebdcc9]/60">
                      {lang.nativeName}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0 ml-2">
                  <span className="font-mono-code text-[10px] text-rose-300/80 uppercase">
                    {lang.code}
                  </span>
                  {isSelected && (
                    <Check className="h-3.5 w-3.5 text-rose-400" />
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
            <span>Click any language card above to translate this entire landing page live in real-time.</span>
          </div>
          <span className="font-mono-code text-[11px] text-[#ebdcc9]/60">
            Auto-detects browser locale
          </span>
        </div>
      </div>
    </section>
  );
};
