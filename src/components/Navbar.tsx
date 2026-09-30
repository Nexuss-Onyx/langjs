import React, { useState } from 'react';
import { Globe, ChevronDown, Check, Search, Github, BookOpen, Menu, X, ArrowRight } from 'lucide-react';
import { ALL_100_LANGUAGES } from '../data/languages-100';
import { SupportedLanguage, DICTIONARY } from '../data/translations';

interface NavbarProps {
  currentLang: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onOpenEarlyAccess: () => void;
  onOpenGitHub?: () => void;
  onNavigateToDocs?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  onOpenEarlyAccess,
  onOpenGitHub,
  onNavigateToDocs,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    <header className="sticky top-0 z-50 w-full border-b border-[#f6efe2]/10 bg-[#090205]/95 backdrop-blur-xl transition-colors">
      <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-12">
        {/* Zone 1: Wordmark */}
        <a
          href="#"
          className="group flex items-center gap-2 sm:gap-2.5 font-serif-luxury text-xl sm:text-2xl font-bold tracking-tight text-[#fdfbf7] transition-all hover:text-[#ebdcc9]"
        >
          <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#9e1b32] to-[#4a0d24] text-xs sm:text-sm text-[#fdfbf7] shadow-inner shadow-rose-400/20 group-hover:scale-105 transition-transform">
            L
          </span>
          <span className="tracking-tight">
            Lang<span className="text-[#be185d]">js</span>
          </span>
        </a>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden items-center gap-6 lg:gap-8 text-sm font-medium text-[#ebdcc9]/80 lg:flex">
          <a
            href="#languages"
            className="transition-colors hover:text-[#fdfbf7]"
          >
            100+ Languages
          </a>
          <a
            href="#architecture"
            className="transition-colors hover:text-[#fdfbf7]"
          >
            {t('nav_architecture')}
          </a>
          <a
            href="#benchmarks"
            className="transition-colors hover:text-[#fdfbf7]"
          >
            Benchmarks
          </a>
          <button
            onClick={onNavigateToDocs}
            className="flex items-center gap-1.5 font-semibold text-rose-300 hover:text-white transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            <span>Documentation</span>
          </button>
        </nav>

        {/* Zone 3: Actions + Interactive Language Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Working Live Navbar Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 sm:gap-2 rounded-lg border border-[#f6efe2]/15 bg-[#1f0712]/70 px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs font-medium text-[#f6efe2] backdrop-blur-md transition-all hover:border-[#be185d]/50 hover:bg-[#2b0918]"
              aria-label="Select Language"
            >
              <Globe className="h-3.5 w-3.5 text-[#e11d48]" />
              <span className="text-xs">{activeLangInfo.flag}</span>
              <span className="hidden md:inline">{activeLangInfo.nativeName}</span>
              <ChevronDown className={`h-3 w-3 text-[#ebdcc9]/60 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 sm:w-64 max-w-[calc(100vw-2rem)] rounded-xl border border-[#f6efe2]/15 bg-[#16040d]/98 p-2 shadow-2xl shadow-black/90 backdrop-blur-2xl z-50">
                <div className="flex items-center justify-between px-1 pb-2 border-b border-[#f6efe2]/10">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#cbb89e]/70">
                    100+ Locales
                  </span>
                  <span className="font-mono-code text-[9px] text-[#ebdcc9]/50">Google Translate</span>
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

                <div className="max-h-52 overflow-y-auto space-y-0.5 custom-scrollbar">
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

          {/* Docs Direct Button (Desktop) */}
          <button
            onClick={onNavigateToDocs}
            className="hidden sm:flex items-center gap-1.5 rounded-lg border border-[#f6efe2]/15 bg-[#1a050f]/80 px-2.5 py-1.5 sm:py-2 text-xs font-medium text-[#ebdcc9] transition-all hover:border-[#be185d] hover:text-white"
            title="Read Documentation"
          >
            <BookOpen className="h-3.5 w-3.5 text-rose-300" />
            <span>Docs</span>
          </button>

          {/* GitHub Repo Button (Desktop) */}
          {onOpenGitHub && (
            <button
              onClick={onOpenGitHub}
              className="hidden sm:flex items-center gap-1.5 rounded-lg border border-[#f6efe2]/15 bg-[#1a050f]/80 px-2.5 py-1.5 sm:py-2 text-xs font-medium text-[#ebdcc9] transition-all hover:border-[#be185d] hover:text-white"
              title="GitHub Repository"
            >
              <Github className="h-3.5 w-3.5 text-rose-300" />
              <span>GitHub</span>
            </button>
          )}

          {/* Primary CTA button */}
          <button
            onClick={onOpenEarlyAccess}
            className="luxury-button-primary hidden xs:flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 sm:py-2 text-xs font-semibold text-[#fdfbf7] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>{t('nav_get_started')}</span>
            <ArrowRight className="h-3.5 w-3.5 opacity-70" />
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex lg:hidden items-center justify-center rounded-lg border border-[#f6efe2]/15 bg-[#1a050f] p-2 text-[#ebdcc9] hover:text-white hover:border-[#be185d]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#f6efe2]/10 bg-[#0f030a]/98 px-4 py-5 shadow-2xl backdrop-blur-2xl animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-3">
            <a
              href="#languages"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-[#ebdcc9] hover:bg-[#250817] hover:text-white"
            >
              <span>100+ Global Languages</span>
            </a>
            <a
              href="#architecture"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-[#ebdcc9] hover:bg-[#250817] hover:text-white"
            >
              <span>{t('nav_architecture')}</span>
            </a>
            <a
              href="#benchmarks"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-[#ebdcc9] hover:bg-[#250817] hover:text-white"
            >
              <span>Benchmarks</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToDocs?.();
              }}
              className="flex items-center gap-2 rounded-lg bg-rose-950/40 border border-rose-500/30 px-3 py-2.5 text-sm font-semibold text-rose-200 hover:bg-rose-900/50"
            >
              <BookOpen className="h-4 w-4 text-rose-400" />
              <span>Full Documentation & API</span>
            </button>

            <div className="pt-2 border-t border-[#f6efe2]/10 flex items-center gap-2">
              {onOpenGitHub && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenGitHub();
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-[#f6efe2]/15 bg-[#190510] py-2 text-xs font-medium text-[#ebdcc9]"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </button>
              )}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEarlyAccess();
                }}
                className="flex-1 luxury-button-primary flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold text-white"
              >
                <span>{t('nav_get_started')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
