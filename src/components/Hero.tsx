import React, { useState } from 'react';
import { Terminal, Copy, Check, ArrowRight, BookOpen, Layers, Zap, Code2, Globe } from 'lucide-react';
import { SupportedLanguage, DICTIONARY } from '../data/translations';

interface HeroProps {
  currentLang: SupportedLanguage;
  onOpenEarlyAccess: () => void;
  onNavigateToDocs?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  onOpenEarlyAccess,
  onNavigateToDocs,
}) => {
  const [copied, setCopied] = useState(false);
  const [installMethod, setInstallMethod] = useState<'npm' | 'cdn'>('npm');

  const t = (key: string) => DICTIONARY[key]?.[currentLang] || DICTIONARY[key]?.['en'] || key;

  const npmCommand = 'npm install @nexuss0781/langjs';
  const cdnCommand = '<script src="https://cdn.jsdelivr.net/npm/@nexuss0781/langjs/dist/lang.min.js"></script>';

  const handleCopy = () => {
    const textToCopy = installMethod === 'npm' ? npmCommand : cdnCommand;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-24 lg:pb-32">
      {/* Subtle Dark Ambient Gradients */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#801428]/25 to-transparent blur-[140px]" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Release Metadata */}
        <div className="flex justify-center">
          <div className="text-xs font-mono-code text-[#ebdcc9]/70 tracking-wide">
            <span>LangJS v1.0.0</span>
            <span className="mx-2 text-[#ebdcc9]/30">·</span>
            <span className="text-rose-300">Client-Side i18n SDK</span>
            <span className="mx-2 text-[#ebdcc9]/30">·</span>
            <span>MIT Licensed</span>
          </div>
        </div>

        {/* Hero Headlines */}
        <div className="mt-8 text-center max-w-4xl mx-auto">
          <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-[#fdfbf7] leading-[1.08]">
            {t('hero_title_1')}{' '}
            <span className="text-[#e11d48]">
              {t('hero_title_2')}
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm sm:text-base md:text-lg text-[#ebdcc9]/80 leading-relaxed">
            {t('hero_subtitle')}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <button
            onClick={onOpenEarlyAccess}
            className="w-full sm:w-auto luxury-button-primary flex h-11 sm:h-12 items-center justify-center gap-2 rounded-xl px-7 text-sm font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>{t('nav_get_started')}</span>
            <ArrowRight className="h-4 w-4 opacity-70" />
          </button>

          {onNavigateToDocs && (
            <button
              onClick={onNavigateToDocs}
              className="w-full sm:w-auto flex h-11 sm:h-12 items-center justify-center gap-2 rounded-xl border border-[#f6efe2]/15 bg-[#17050f] px-7 text-sm font-semibold text-[#fdfbf7] transition-all hover:border-[#be185d] hover:bg-[#220716]"
            >
              <BookOpen className="h-4 w-4 text-rose-400" />
              <span>Read Documentation</span>
            </button>
          )}

          <a
            href="#languages"
            className="w-full sm:w-auto flex h-11 sm:h-12 items-center justify-center gap-2 rounded-xl border border-[#f6efe2]/10 bg-[#12030b] px-6 text-sm font-medium text-[#ebdcc9]/90 transition-all hover:border-[#f6efe2]/25 hover:text-white"
          >
            <Globe className="h-4 w-4 text-[#ebdcc9]/60" />
            <span>100+ Languages</span>
          </a>
        </div>

        {/* Quick Install Command Box */}
        <div className="mx-auto mt-10 max-w-lg">
          <div className="rounded-xl border border-[#f6efe2]/15 bg-[#12030b] p-3 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#f6efe2]/10 pb-2 text-xs text-[#ebdcc9]/70">
              <div className="flex items-center gap-2 font-mono-code">
                <Terminal className="h-3.5 w-3.5 text-rose-400" />
                <span>Installation</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setInstallMethod('npm')}
                  className={`px-2.5 py-0.5 rounded text-[11px] font-mono-code transition-colors ${
                    installMethod === 'npm'
                      ? 'bg-[#801428] text-white font-semibold'
                      : 'text-[#ebdcc9]/50 hover:text-white'
                  }`}
                >
                  npm
                </button>
                <button
                  onClick={() => setInstallMethod('cdn')}
                  className={`px-2.5 py-0.5 rounded text-[11px] font-mono-code transition-colors ${
                    installMethod === 'cdn'
                      ? 'bg-[#801428] text-white font-semibold'
                      : 'text-[#ebdcc9]/50 hover:text-white'
                  }`}
                >
                  cdn
                </button>
              </div>
            </div>

            <div className="mt-2.5 flex items-center justify-between font-mono-code text-xs text-[#fdfbf7]">
              <span className="truncate pr-3 selection:bg-[#be185d]">
                {installMethod === 'npm' ? npmCommand : cdnCommand}
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-lg border border-[#f6efe2]/10 bg-[#1e0614] px-2.5 py-1 text-[11px] text-[#ebdcc9] hover:border-[#be185d] hover:text-white transition-colors shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-400" />
                    <span className="text-emerald-300">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Clean Engineering Spec Bar */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="rounded-xl border border-[#f6efe2]/10 bg-[#12030b] p-5">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-mono-code uppercase tracking-wider">
              <Zap className="h-4 w-4" />
              <span>Sub-10ms DOM Patching</span>
            </div>
            <div className="mt-2 font-serif-luxury text-xl font-bold text-[#fdfbf7]">
              In-Place TreeWalker
            </div>
            <p className="mt-1 text-xs text-[#ebdcc9]/70 leading-relaxed">
              Discovers visible text nodes and mutates text content in-place without triggering React re-renders or layout recalculations.
            </p>
          </div>

          <div className="rounded-xl border border-[#f6efe2]/10 bg-[#12030b] p-5">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-mono-code uppercase tracking-wider">
              <Code2 className="h-4 w-4" />
              <span>Zero-Config Setup</span>
            </div>
            <div className="mt-2 font-serif-luxury text-xl font-bold text-[#fdfbf7]">
              No Translation Keys
            </div>
            <p className="mt-1 text-xs text-[#ebdcc9]/70 leading-relaxed">
              Eliminates the maintenance overhead of managing thousands of static translation dictionary keys in manual JSON files.
            </p>
          </div>

          <div className="rounded-xl border border-[#f6efe2]/10 bg-[#12030b] p-5">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-mono-code uppercase tracking-wider">
              <Layers className="h-4 w-4" />
              <span>100+ Global Locales</span>
            </div>
            <div className="mt-2 font-serif-luxury text-xl font-bold text-[#fdfbf7]">
              Automatic RTL Switching
            </div>
            <p className="mt-1 text-xs text-[#ebdcc9]/70 leading-relaxed">
              Seamlessly adapts layout directions (`dir="rtl"`) for Arabic, Hebrew, Urdu, and Persian with single-method invocations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
