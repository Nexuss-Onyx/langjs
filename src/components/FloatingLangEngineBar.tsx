import React, { useState } from 'react';
import { ALL_100_LANGUAGES } from '../data/languages-100';
import { Globe, Eye, Search, ChevronUp, Check } from 'lucide-react';

interface FloatingLangEngineBarProps {
  currentLang: string;
  onLanguageChange: (langCode: string) => void;
  onToggleHighlight: () => boolean;
  onDownloadManifest: () => void;
  totalTrackedNodes: number;
  isTranslating: boolean;
  latencyMs: number;
}

export const FloatingLangEngineBar: React.FC<FloatingLangEngineBarProps> = ({
  currentLang,
  onLanguageChange,
  onToggleHighlight,
  totalTrackedNodes,
  latencyMs,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [highlightActive, setHighlightActive] = useState(false);
  const [search, setSearch] = useState('');

  const activeLangObj = ALL_100_LANGUAGES.find((l) => l.code === currentLang) || ALL_100_LANGUAGES[0];

  const handleToggle = () => {
    const state = onToggleHighlight();
    setHighlightActive(state);
  };

  const filtered = ALL_100_LANGUAGES.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.nativeName.toLowerCase().includes(search.toLowerCase()) ||
      l.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside 
      aria-label="LangJS Live Engine Control Panel"
      className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-50 flex flex-col items-end max-w-[calc(100vw-1.5rem)]"
    >
      {/* Main floating pill */}
      <div className="flex items-center gap-1.5 sm:gap-2 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]/95 p-1.5 sm:p-2 shadow-2xl backdrop-blur-2xl transition-all">
        {/* Live Engine Indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 border-r border-[var(--border-color)] font-mono-code text-xs text-[var(--text-secondary)]">
          <span className="h-2 w-2 rounded-full bg-emerald-600" />
          <span className="text-emerald-700 font-semibold">LangJS Live:</span>
          <span>{totalTrackedNodes} Nodes Tracked</span>
          <span className="text-[var(--text-muted)]">·</span>
          <span className="text-[#9e1b32] font-semibold">{latencyMs > 0 ? `${latencyMs}ms` : '< 10ms'}</span>
        </div>

        {/* Highlight DOM Nodes Toggle */}
        <button
          onClick={handleToggle}
          className={`flex items-center gap-1 sm:gap-1.5 rounded-xl border px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-medium transition-all ${
            highlightActive
              ? 'border-[#9e1b32] bg-[#9e1b32] text-white shadow-md'
              : 'border-[var(--border-color)] bg-[var(--bg-card-hover)] text-[var(--text-primary)] hover:border-[#9e1b32]'
          }`}
          title="Highlight every DOM text element classified and tracked by LangJS"
        >
          <Eye className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">{highlightActive ? 'Nodes Highlighted' : 'Inspect Nodes'}</span>
        </button>

        {/* 100+ Languages Selector Button (Rich Burgundy) */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="luxury-button-primary flex items-center gap-1.5 sm:gap-2 rounded-xl px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-xs font-semibold text-white shadow-md transition-transform hover:scale-105"
          >
            <Globe className="h-3.5 w-3.5 text-white/90" />
            <span>{activeLangObj.flag}</span>
            <span className="max-w-[70px] sm:max-w-[120px] truncate">{activeLangObj.nativeName}</span>
            <ChevronUp className={`h-3 w-3 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {dropdownOpen && (
            <div className="absolute bottom-full right-0 mb-3 w-64 sm:w-72 max-w-[calc(100vw-2rem)] max-h-96 overflow-hidden rounded-2xl border border-[var(--border-hover)] bg-[var(--bg-card)] p-2.5 shadow-2xl z-50">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--border-color)] px-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-hero)]">
                  Switch Page Language (100+)
                </span>
                <span className="font-mono-code text-[10px] text-emerald-700 font-semibold">Google Translate</span>
              </div>

              {/* Search input */}
              <div className="relative my-2">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search 100+ languages..."
                  className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-hover)] py-1.5 pl-8 pr-3 text-xs text-[var(--text-hero)] placeholder:text-[var(--text-muted)] focus:border-[#9e1b32] focus:outline-none"
                  autoFocus
                />
              </div>

              {/* Languages Scroll List */}
              <div className="max-h-60 overflow-y-auto space-y-0.5 pr-1 custom-scrollbar">
                {filtered.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onLanguageChange(lang.code);
                      setDropdownOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-2.5 py-1.5 text-xs transition-colors ${
                      currentLang === lang.code
                        ? 'bg-[#9e1b32] text-white font-semibold'
                        : 'text-[var(--text-primary)] hover:bg-[#9e1b32]/10 hover:text-[#9e1b32]'
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <span>{lang.flag}</span>
                      <span className="truncate">{lang.name} ({lang.nativeName})</span>
                    </span>
                    {currentLang === lang.code && (
                      <Check className="h-3.5 w-3.5 text-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
