import React, { useState } from 'react';
import { Sparkles, Terminal, Copy, Check, ArrowRight, Play, Cpu, Zap, FileCode2, BookOpen } from 'lucide-react';
import { SupportedLanguage, DICTIONARY } from '../data/translations';

interface HeroProps {
  currentLang: SupportedLanguage;
  onOpenEarlyAccess: () => void;
  onScrollToSandbox: () => void;
  onNavigateToDocs?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  onOpenEarlyAccess,
  onScrollToSandbox,
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
    <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32">
      {/* Background Burgundy Ambient Light Orbs and Curved Glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#9e1b32]/35 via-[#4a0d24]/20 to-transparent blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 -left-48 h-96 w-96 rounded-full bg-[#be185d]/15 blur-[100px]" />
      <div className="pointer-events-none absolute top-1/3 -right-48 h-96 w-96 rounded-full bg-[#be185d]/15 blur-[100px]" />

      {/* Decorative top curved aura arch */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[350px] border-b border-[#e11d48]/20 rounded-[100%] opacity-40" />
      <div className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-[900px] h-[250px] border-b border-[#ebdcc9]/10 rounded-[100%] opacity-30" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        {/* Top Announcement Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#f6efe2]/15 bg-[#1f0712]/80 px-4 py-1.5 text-xs font-medium text-[#ebdcc9] backdrop-blur-md shadow-lg shadow-rose-950/40">
            <span className="flex h-2 w-2 rounded-full bg-[#e11d48] animate-pulse" />
            <span>{t('hero_badge')}</span>
          </div>
        </div>

        {/* Hero Headlines */}
        <div className="mt-8 text-center">
          <h1 className="mx-auto max-w-4xl font-serif-luxury text-4xl font-semibold tracking-tight text-[#fdfbf7] sm:text-6xl lg:text-7xl leading-[1.08]">
            {t('hero_title_1')}{' '}
            <span className="italic text-[#be185d] underline decoration-[#be185d]/40 underline-offset-8">
              {t('hero_title_2')}
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-[#ebdcc9]/85">
            {t('hero_subtitle')}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={onScrollToSandbox}
            className="luxury-button-primary group flex h-12 items-center justify-center gap-3 rounded-xl px-7 text-sm font-semibold text-[#fdfbf7] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Play className="h-4 w-4 fill-current text-[#ebdcc9] transition-transform group-hover:translate-x-0.5" />
            <span>{t('hero_cta_primary')}</span>
            <ArrowRight className="h-4 w-4 opacity-70 transition-transform group-hover:translate-x-1" />
          </button>

          {onNavigateToDocs && (
            <button
              onClick={onNavigateToDocs}
              className="flex h-12 items-center justify-center gap-2 rounded-xl border border-rose-500/30 bg-[#280a18] px-7 text-sm font-semibold text-rose-200 transition-all hover:border-rose-400 hover:bg-[#380e22] hover:text-white"
            >
              <BookOpen className="h-4 w-4 text-rose-300" />
              <span>Read Documentation</span>
            </button>
          )}

          <button
            onClick={onOpenEarlyAccess}
            className="luxury-card flex h-12 items-center justify-center gap-2 rounded-xl px-7 text-sm font-semibold text-[#f6efe2] transition-all hover:bg-[#280a18]"
          >
            <span>{t('hero_cta_secondary')}</span>
          </button>
        </div>

        {/* Quick Install Command Box */}
        <div className="mx-auto mt-10 max-w-lg">
          <div className="luxury-card rounded-xl p-2.5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#f6efe2]/10 px-3 pb-2 text-xs">
              <div className="flex items-center gap-2 text-[#ebdcc9]/70">
                <Terminal className="h-3.5 w-3.5 text-[#e11d48]" />
                <span className="font-mono-code">Quick Install</span>
              </div>
              <div className="flex items-center gap-1 rounded-md bg-[#0e0307] p-0.5">
                <button
                  onClick={() => setInstallMethod('npm')}
                  className={`rounded px-2 py-0.5 text-[11px] font-medium transition-colors ${
                    installMethod === 'npm'
                      ? 'bg-[#9e1b32] text-white'
                      : 'text-[#ebdcc9]/60 hover:text-white'
                  }`}
                >
                  NPM
                </button>
                <button
                  onClick={() => setInstallMethod('cdn')}
                  className={`rounded px-2 py-0.5 text-[11px] font-medium transition-colors ${
                    installMethod === 'cdn'
                      ? 'bg-[#9e1b32] text-white'
                      : 'text-[#ebdcc9]/60 hover:text-white'
                  }`}
                >
                  CDN Script
                </button>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between px-3 py-1 font-mono-code text-xs text-[#fdfbf7]">
              <span className="truncate selection:bg-[#be185d]">
                {installMethod === 'npm' ? npmCommand : cdnCommand}
              </span>
              <button
                onClick={handleCopy}
                className="ml-3 flex items-center gap-1.5 rounded-md border border-[#f6efe2]/15 bg-[#230815] px-2.5 py-1 text-[11px] text-[#ebdcc9] transition-all hover:border-[#be185d] hover:bg-[#340c20]"
                title="Copy to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-400" />
                    <span className="text-emerald-300">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3 text-[#ebdcc9]" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Hero Visual: Neural Translation Glass Globe & Matrix Preview */}
        <div className="relative mt-16 lg:mt-24">
          <div className="relative mx-auto max-w-5xl rounded-2xl border border-[#f6efe2]/15 bg-[#14050d]/80 p-3 shadow-2xl backdrop-blur-2xl ring-1 ring-white/10">
            {/* Window control bar */}
            <div className="flex items-center justify-between border-b border-[#f6efe2]/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#e11d48]/80" />
                <div className="h-3 w-3 rounded-full bg-[#fbbf24]/80" />
                <div className="h-3 w-3 rounded-full bg-[#10b981]/80" />
                <span className="ml-2 font-mono-code text-xs text-[#ebdcc9]/50">
                  langjs-core.runtime.wasm — active 100+ locales
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#ebdcc9]/70">
                <span className="flex items-center gap-1 font-mono-code text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  Neural Online
                </span>
              </div>
            </div>

            {/* Visual Glass Content */}
            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 lg:p-6 overflow-hidden rounded-xl bg-gradient-to-b from-[#1c0712]/90 to-[#0c0207]/90">
              {/* Left Column: Metrics & Architecture Stats */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold uppercase tracking-wider">
                    <Cpu className="h-4 w-4" />
                    <span>DOM-Level Neural Pipeline</span>
                  </div>
                  <h3 className="font-serif-luxury text-2xl font-bold text-[#fdfbf7]">
                    Translates 100% of visible nodes in &lt;10ms
                  </h3>
                  <p className="text-xs text-[#ebdcc9]/75 leading-relaxed">
                    Langjs crawls your runtime DOM with zero virtual-DOM conflicts, replacing textual nodes, attributes, placeholders, and tooltips instantly in-place.
                  </p>
                </div>

                {/* Micro Metric Cards */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="rounded-xl border border-[#f6efe2]/10 bg-[#250817]/60 p-3">
                    <div className="flex items-center gap-1.5 text-xs text-[#ebdcc9]/70">
                      <Zap className="h-3.5 w-3.5 text-amber-400" />
                      <span>Latency</span>
                    </div>
                    <div className="mt-1 font-mono-code text-xl font-bold text-[#fdfbf7]">
                      8.4ms
                    </div>
                    <div className="text-[10px] text-emerald-400">Sub-frame render</div>
                  </div>

                  <div className="rounded-xl border border-[#f6efe2]/10 bg-[#250817]/60 p-3">
                    <div className="flex items-center gap-1.5 text-xs text-[#ebdcc9]/70">
                      <FileCode2 className="h-3.5 w-3.5 text-rose-400" />
                      <span>Bundle Size</span>
                    </div>
                    <div className="mt-1 font-mono-code text-xl font-bold text-[#fdfbf7]">
                      &lt;2.8 KB
                    </div>
                    <div className="text-[10px] text-rose-300">Zero dependencies</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Visual Globe Graphic */}
              <div className="lg:col-span-7 relative flex items-center justify-center min-h-[260px] rounded-xl border border-[#f6efe2]/10 bg-[#090205] overflow-hidden">
                <img
                  src="/src/assets/images/hero_langjs_globe_glass_1790761598623.jpg"
                  alt="Langjs Globe Glass Architecture"
                  className="absolute inset-0 w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090205] via-transparent to-[#090205]/40" />

                <div className="relative z-10 text-center p-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-rose-400/30 bg-[#350b1f]/80 px-3.5 py-1 text-xs font-medium text-rose-200 backdrop-blur-md">
                    <Sparkles className="h-3.5 w-3.5 text-rose-300" />
                    <span>Active Global Mesh</span>
                  </div>
                  <div className="mt-2 font-mono-code text-xs text-[#ebdcc9]/90">
                    100+ Auto-Detected Real-Time Dialects
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
