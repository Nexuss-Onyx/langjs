import React, { useState } from 'react';
import { Globe, ChevronDown, Check, Search, Github, BookOpen, Menu, X, Sun, Moon } from 'lucide-react';
import { ALL_100_LANGUAGES } from '../data/languages-100';
import { SupportedLanguage, DICTIONARY } from '../data/translations';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  currentLang: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onOpenGitHub?: () => void;
  onNavigateToDocs?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  onOpenGitHub,
  onNavigateToDocs,
}) => {
  const { theme, toggleTheme } = useTheme();
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
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border-color)] bg-[var(--bg-main)]/95 backdrop-blur-xl transition-colors">
      <div className="mx-auto flex h-14 sm:h-16 lg:h-20 max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-12">
        {/* Brand Wordmark */}
        <a
          href="#"
          className="group flex items-center gap-2 font-serif-luxury text-lg sm:text-2xl font-bold tracking-tight text-[var(--text-hero)] transition-all hover:opacity-90"
        >
          <span className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#9e1b32] to-[#4a0d24] text-xs sm:text-sm text-[#fdfbf7] shadow-inner shadow-rose-400/20 group-hover:scale-105 transition-transform">
            L
          </span>
          <span className="tracking-tight">
            Lang<span className="text-[#be185d]">js</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-6 lg:gap-8 text-sm font-medium text-[var(--text-secondary)] lg:flex">
          <a
            href="#languages"
            className="transition-colors hover:text-[var(--text-hero)]"
          >
            100+ Languages
          </a>
          <a
            href="#architecture"
            className="transition-colors hover:text-[var(--text-hero)]"
          >
            {t('nav_architecture')}
          </a>
          <a
            href="#benchmarks"
            className="transition-colors hover:text-[var(--text-hero)]"
          >
            Benchmarks
          </a>
          <a
            href="https://github.com/Nexuss-Onyx/langjs"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-[var(--text-hero)] flex items-center gap-1.5"
          >
            <Github className="h-4 w-4 text-rose-400" />
            <span>GitHub</span>
          </a>
        </nav>

        {/* Action Controls: Theme Switcher + Language Dropdown + Docs CTA */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Theme Toggle (Dark Obsidian <-> Warm Cream) */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] p-1.5 sm:p-2 text-[var(--text-secondary)] hover:text-[var(--text-hero)] hover:border-[var(--border-hover)] transition-colors"
            aria-label="Toggle Theme"
            title={theme === 'dark' ? 'Switch to Warm Cream Mode' : 'Switch to Obsidian Black Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-300" />
            ) : (
              <Moon className="h-4 w-4 text-rose-900" />
            )}
          </button>

          {/* Visual Flag / Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] px-2 sm:px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] backdrop-blur-md transition-all hover:border-[var(--border-hover)]"
              aria-label="Select Language"
            >
              <span className="text-sm">{activeLangInfo.flag}</span>
              <span className="hidden sm:inline">{activeLangInfo.nativeName}</span>
              <ChevronDown className={`h-3 w-3 text-[var(--text-muted)] transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 sm:w-64 max-w-[calc(100vw-1.5rem)] rounded-xl border border-[var(--border-hover)] bg-[var(--bg-card)] p-2 shadow-2xl z-50">
                <div className="flex items-center justify-between px-1 pb-2 border-b border-[var(--border-color)]">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                    100+ Locales
                  </span>
                  <span className="font-mono-code text-[9px] text-[var(--text-muted)]">Google Translate</span>
                </div>

                <div className="relative mt-2 mb-1.5">
                  <Search className="absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search languages..."
                    className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-main)] py-1 pl-7 pr-2 text-xs text-[var(--text-hero)] placeholder:text-[var(--text-muted)] focus:border-[#be185d] focus:outline-none"
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
                          ? 'bg-rose-900/30 text-[var(--text-hero)] font-semibold'
                          : 'text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-hero)]'
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <span>{lang.flag}</span>
                        <span className="truncate">{lang.name} ({lang.nativeName})</span>
                      </span>
                      {currentLang === lang.code && (
                        <Check className="h-3.5 w-3.5 text-rose-500" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* GitHub Icon on Mobile */}
          <a
            href="https://github.com/Nexuss-Onyx/langjs"
            target="_blank"
            rel="noreferrer"
            className="flex sm:hidden items-center justify-center rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-hero)]"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4 text-rose-400" />
          </a>

          {/* Primary Action: View Docs */}
          <button
            onClick={onNavigateToDocs}
            className="luxury-button-primary flex items-center gap-1.5 rounded-lg px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <BookOpen className="h-3.5 w-3.5 opacity-90" />
            <span>Docs</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex lg:hidden items-center justify-center rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-hero)]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[var(--border-color)] bg-[var(--bg-card)] px-4 py-4 shadow-2xl backdrop-blur-2xl animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-2">
            <a
              href="#languages"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"
            >
              <span>100+ Global Languages</span>
            </a>
            <a
              href="#architecture"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"
            >
              <span>{t('nav_architecture')}</span>
            </a>
            <a
              href="#benchmarks"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"
            >
              <span>Benchmarks</span>
            </a>

            <div className="pt-2 border-t border-[var(--border-color)]">
              <a
                href="https://github.com/Nexuss-Onyx/langjs"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-main)] py-2 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-hero)]"
              >
                <Github className="h-4 w-4 text-rose-400" />
                <span>GitHub Repository</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
