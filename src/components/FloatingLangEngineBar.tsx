import React, { useState } from 'react';
import { ALL_100_LANGUAGES, GlobalLanguage } from '../data/languages-100';
import { Globe, Eye, Download, Search, ChevronUp, ChevronDown, Sparkles, Check, Cpu } from 'lucide-react';

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
  onDownloadManifest,
  totalTrackedNodes,
  isTranslating,
  latencyMs,
}) => {
  const [expanded, setExpanded] = useState(false);
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
      className="fixed bottom-5 right-5 z-50 flex flex-col items-end"
    >
      {/* Main floating pill */}
      <div className="flex items-center gap-2 rounded-2xl border border-[#f6efe2]/20 bg-[#15040d]/95 p-2 shadow-2xl shadow-black/90 backdrop-blur-2xl transition-all">
        {/* Live Engine Indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 border-r border-[#f6efe2]/10 font-mono-code text-xs text-[#ebdcc9]">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 font-bold">LangJS Live:</span>
          <span>{totalTrackedNodes} Nodes Tracked</span>
          <span className="text-[#ebdcc9]/40">·</span>
          <span className="text-rose-300">{latencyMs > 0 ? `${latencyMs}ms` : '< 10ms'}</span>
        </div>

        {/* Highlight DOM Nodes Toggle */}
        <button
          onClick={handleToggle}
          className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium transition-all ${
            highlightActive
              ? 'border-rose-500 bg-[#9e1b32] text-white shadow-lg'
              : 'border-[#f6efe2]/10 bg-[#220716] text-[#ebdcc9]/80 hover:text-white'
          }`}
          title="Highlight every DOM text element classified and tracked by LangJS"
        >
          <Eye className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">{highlightActive ? 'Nodes Highlighted' : 'Inspect Nodes'}</span>
        </button>

        {/* 100+ Languages Selector Button */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="luxury-button-primary flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg transition-transform hover:scale-105"
          >
            <Globe className="h-3.5 w-3.5 text-rose-200" />
            <span>{activeLangObj.flag}</span>
            <span className="max-w-[80px] sm:max-w-[120px] truncate">{activeLangObj.nativeName}</span>
            <ChevronUp className={`h-3 w-3 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {dropdownOpen && (
            <div className="absolute bottom-full right-0 mb-3 w-72 max-h-96 overflow-hidden rounded-2xl border border-[#f6efe2]/20 bg-[#16040e]/98 p-2.5 shadow-2xl shadow-black/95 backdrop-blur-3xl z-50">
              <div className="flex items-center justify-between pb-2 border-b border-[#f6efe2]/10 px-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#ebdcc9]/80">
                  Switch Page Language (100+)
                </span>
                <span className="font-mono-code text-[10px] text-emerald-400">Google Translate</span>
              </div>

              {/* Search input */}
              <div className="relative my-2">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#ebdcc9]/40" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search 100+ languages..."
                  className="w-full rounded-xl border border-[#f6efe2]/15 bg-[#090205] py-1.5 pl-8 pr-3 text-xs text-[#fdfbf7] placeholder:text-[#ebdcc9]/40 focus:border-[#be185d] focus:outline-none"
                  autoFocus
                />
              </div>

              {/* Languages Scroll List */}
              <div className="max-h-64 overflow-y-auto space-y-0.5 pr-1">
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
                        : 'text-[#ebdcc9]/80 hover:bg-[#280a1a] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-base">{lang.flag}</span>
                      <span className="truncate">{lang.nativeName} ({lang.name})</span>
                    </div>
                    {currentLang === lang.code && <Check className="h-3.5 w-3.5 text-rose-200" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Download lang.json icon button */}
        <button
          onClick={onDownloadManifest}
          className="flex items-center gap-1 rounded-xl border border-[#f6efe2]/10 bg-[#220716] p-2 text-xs text-[#ebdcc9]/80 transition-colors hover:text-white"
          title="Download complete lang/lang.json manifest for this page"
        >
          <Download className="h-3.5 w-3.5 text-rose-300" />
        </button>
      </div>

      {isTranslating && (
        <div className="mt-2 flex items-center gap-2 rounded-xl bg-[#9e1b32] px-3 py-1 text-xs font-semibold text-white shadow-lg animate-pulse">
          <Sparkles className="h-3 w-3" />
          <span>Translating page with Google Translate...</span>
        </div>
      )}
    </aside>
  );
};
