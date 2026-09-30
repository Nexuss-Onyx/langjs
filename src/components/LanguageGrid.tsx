import React, { useState } from 'react';
import { ALL_100_LANGUAGES, GlobalLanguage } from '../data/languages-100';
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
    <section id="languages" className="relative scroll-mt-24 py-24 bg-[#090205]">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-[#9e1b32]/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#f6efe2]/15 bg-[#1f0712] px-3.5 py-1 text-xs font-semibold text-[#ebdcc9]">
            <Globe className="h-3.5 w-3.5 text-[#e11d48]" />
            <span>Google Translate Neural Engine</span>
          </div>
          <h2 className="mt-4 font-serif-luxury text-3xl font-bold tracking-tight text-[#fdfbf7] sm:text-5xl">
            100+ Global Languages Supported
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[#ebdcc9]/80">
            Powered by Google Translate Neural API. Langjs automatically maps text to 100+ languages with zero manual key extraction or language pack configuration.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#f6efe2]/15 bg-[#14040d]/90 p-4 backdrop-blur-xl sm:flex-row sm:p-5">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#ebdcc9]/50" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search 100+ languages or codes..."
              className="w-full rounded-xl border border-[#f6efe2]/15 bg-[#090205] py-2 pl-10 pr-4 text-xs text-[#fdfbf7] placeholder:text-[#ebdcc9]/40 focus:border-[#be185d] focus:outline-none"
            />
          </div>

          {/* Categories */}
          <div className="flex items-center gap-1.5 rounded-xl border border-[#f6efe2]/10 bg-[#0c0207] p-1">
            <button
              onClick={() => setSelectedCategory('popular')}
              className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
                selectedCategory === 'popular'
                  ? 'bg-[#9e1b32] text-white shadow'
                  : 'text-[#ebdcc9]/70 hover:text-white'
              }`}
            >
              Popular (20)
            </button>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#9e1b32] text-white shadow'
                  : 'text-[#ebdcc9]/70 hover:text-white'
              }`}
            >
              All (100+)
            </button>
            <button
              onClick={() => setSelectedCategory('rtl')}
              className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
                selectedCategory === 'rtl'
                  ? 'bg-[#9e1b32] text-white shadow'
                  : 'text-[#ebdcc9]/70 hover:text-white'
              }`}
            >
              RTL Scripts (Arabic, Hebrew, Urdu)
            </button>
          </div>
        </div>

        {/* Language Grid Cards */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filtered.slice(0, 30).map((lang) => {
            const isSelected = activeLanguage === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => onSelectLanguage && onSelectLanguage(lang.code)}
                className={`group flex items-center justify-between rounded-xl border p-3.5 text-left transition-all hover:scale-[1.02] ${
                  isSelected
                    ? 'border-[#e11d48] bg-[#3a0a1c] shadow-lg shadow-rose-950/50'
                    : 'border-[#f6efe2]/10 bg-[#16040d]/70 hover:border-[#be185d]/40 hover:bg-[#220715]'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-xl shrink-0">{lang.flag}</span>
                  <div className="truncate">
                    <div className="text-xs font-bold text-[#fdfbf7] truncate group-hover:text-rose-200">
                      {lang.nativeName}
                    </div>
                    <div className="text-[11px] text-[#ebdcc9]/60 truncate">
                      {lang.name}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 pl-2">
                  <span className="font-mono-code text-[10px] text-[#ebdcc9]/40 group-hover:text-rose-300">
                    {lang.code}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {filtered.length > 30 && selectedCategory === 'all' && (
          <div className="mt-6 text-center text-xs text-[#ebdcc9]/60">
            Showing top 30 of {filtered.length} languages. Type in the search box above to find any language instantly.
          </div>
        )}

        {/* Highlight Banner */}
        <div className="mt-12 rounded-2xl border border-[#f6efe2]/15 bg-gradient-to-r from-[#210614] via-[#16040d] to-[#210614] p-6 text-center sm:p-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-left">
              <h3 className="font-serif-luxury text-xl font-bold text-[#fdfbf7] sm:text-2xl">
                Ready to translate your website into 100+ languages?
              </h3>
              <p className="mt-1 text-xs text-[#ebdcc9]/80">
                Install the official package with one command: <code className="font-mono-code text-rose-300">npm install langjs</code>
              </p>
            </div>
            <a
              href="#sandbox"
              className="luxury-button-primary flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold text-white whitespace-nowrap"
            >
              <span>Test Live Demo</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
