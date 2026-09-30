import React, { useState } from 'react';
import { Globe, ChevronDown, Check, Sparkles, Search } from 'lucide-react';
import { ALL_100_LANGUAGES } from '../data/languages-100';
import { SupportedLanguage, DICTIONARY } from '../data/translations';

interface NavbarProps {
  currentLang: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onOpenEarlyAccess: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  onOpenEarlyAccess,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const activeLangInfo = ALL_100_LANGUAGES.find((l) => l.code === currentLang) || ALL_100_LANGUAGES[0];

  const t = (key: string) => DICTIONARY[key]?.[currentLang] || DICTIONARY[key]?.['en'] || key;

  const filteredLanguages = ALL_100_LANGUAGES.filter(
    (l) =>
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#f6efe2]/10 bg-[#090205]/85 backdrop-blur-xl transition-colors">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-12">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="group flex items-center gap-2.5 font-serif-luxury text-2xl font-bold tracking-tight text-[#fdfbf7] transition-all hover:text-[#ebdcc9]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#9e1b32] to-[#4a0d24] text-sm text-[#fdfbf7] shadow-inner shadow-rose-400/20">
            L
          </span>
          <span className="tracking-tight">
            Lang<span className="text-[#be185d]">js</span>
          </span>
        </a>

        {/* Zone 2: 4-5 clean text navigation links */}
        <nav className="hidden items-center gap-8 text-sm font-medium text-[#ebdcc9]/80 lg:flex">
          <a
            href="#architecture"
            className="transition-colors hover:text-[#fdfbf7]"
          >
            {t('nav_architecture')}
          </a>
          <a
            href="#sandbox"
            className="transition-colors hover:text-[#fdfbf7]"
          >
            {t('nav_demo')}
          </a>
          <a
            href="#languages"
            className="transition-colors hover:text-[#fdfbf7] flex items-center gap-1.5"
          >
            <Globe className="h-3.5 w-3.5 text-[#e11d48]" />
            <span>100+ Languages</span>
          </a>
          <a
            href="#sdk-workbench"
            className="transition-colors hover:text-[#fdfbf7]"
          >
            SDK & Manifest
          </a>
          <a
            href="#api"
            className="transition-colors hover:text-[#fdfbf7]"
          >
            {t('nav_api')}
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions + Interactive Language Switcher */}
        <div className="flex items-center gap-3">
          {/* Working Live Navbar Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 rounded-lg border border-[#f6efe2]/15 bg-[#1f0712]/70 px-3 py-2 text-xs font-medium text-[#f6efe2] backdrop-blur-md transition-all hover:border-[#be185d]/50 hover:bg-[#2b0918]"
              aria-label="Select Language"
            >
              <Globe className="h-3.5 w-3.5 text-[#e11d48]" />
              <span className="mr-0.5 text-xs">{activeLangInfo.flag}</span>
              <span className="hidden sm:inline">{activeLangInfo.nativeName}</span>
              <ChevronDown className={`h-3 w-3 text-[#ebdcc9]/60 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl border border-[#f6efe2]/15 bg-[#16040d]/98 p-2 shadow-2xl shadow-black/90 backdrop-blur-2xl z-50">
                <div className="flex items-center justify-between px-1 pb-2 border-b border-[#f6efe2]/10">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#cbb89e]/70">
                    100+ Global Locales
                  </span>
                  <span className="font-mono-code text-[9px] text-emerald-400">Google Translate</span>
                </div>

                <div className="relative mt-2 mb-1.5">
                  <Search className="absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-[#ebdcc9]/40" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search languages..."
                    className="w-full rounded-lg border border-[#f6efe2]/15 bg-[#090205] py-1 pl-7 pr-2 text-xs text-[#fdfbf7] placeholder:text-[#ebdcc9]/40 focus:border-[#be185d] focus:outline-none"
                    autoFocus
                  />
                </div>

                <div className="max-h-56 overflow-y-auto space-y-0.5">
                  {filteredLanguages.slice(0, 40).map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code as any);
                        setDropdownOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition-colors ${
                        currentLang === lang.code
                          ? 'bg-[#9e1b32]/40 text-[#fdfbf7] font-semibold'
                          : 'text-[#ebdcc9]/80 hover:bg-[#240815] hover:text-[#fdfbf7]'
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <span>{lang.flag}</span>
                        <span className="truncate">{lang.name} ({lang.nativeName})</span>
                      </span>
                      {currentLang === lang.code && (
                        <Check className="h-3.5 w-3.5 text-[#e11d48]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Primary CTA button */}
          <button
            onClick={onOpenEarlyAccess}
            className="luxury-button-primary flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold text-[#fdfbf7] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="h-3.5 w-3.5 text-rose-300" />
            <span className="whitespace-nowrap">{t('nav_get_started')}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

