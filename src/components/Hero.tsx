import React, { useState } from 'react';
import { Sparkles, Terminal, Copy, Check, ArrowRight, Play, Cpu, Zap, FileCode2 } from 'lucide-react';
import { SupportedLanguage, DICTIONARY } from '../data/translations';

interface HeroProps {
  currentLang: SupportedLanguage;
  onOpenEarlyAccess: () => void;
  onScrollToSandbox: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  onOpenEarlyAccess,
  onScrollToSandbox,
}) => {
  const [copied, setCopied] = useState(false);
  const [installMethod, setInstallMethod] = useState<'npm' | 'cdn'>('npm');

  const t = (key: string) => DICTIONARY[key]?.[currentLang] || DICTIONARY[key]?.['en'] || key;

  const npmCommand = 'npm install langjs';
  const cdnCommand = '<script src="https://cdn.jsdelivr.net/npm/langjs/dist/lang.min.js"></script>';

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

        {/* Hero Interactive Media & Architecture Showcase Card */}
        <div className="relative mx-auto mt-16 max-w-5xl">
          <div className="relative rounded-2xl border border-[#f6efe2]/15 bg-[#15040d]/90 p-4 shadow-2xl shadow-black/90 backdrop-blur-2xl sm:p-6 lg:p-8">
            {/* Header simulated browser bar */}
            <div className="flex items-center justify-between border-b border-[#f6efe2]/10 pb-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                <span className="ml-3 font-mono-code text-xs text-[#ebdcc9]/60">
                  langjs-runtime · live dom mutation observer
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#ebdcc9]/80 font-mono-code">
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span>ACTIVE ENGINE: Google Translate Neural v2</span>
              </div>
            </div>

            {/* Split layout inside hero window */}
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
              {/* Left Column: Glass Globe Visual */}
              <div className="relative overflow-hidden rounded-xl border border-[#f6efe2]/10 bg-[#090205] lg:col-span-6 aspect-[16/10] group">
                <img
                  src="/src/assets/images/hero_langjs_globe_glass_1790761598623.jpg"
                  alt="Langjs multi-lingual neural globe"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090205]/90 via-transparent to-transparent" />
                
                {/* Visual overlay tag */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-lg border border-[#f6efe2]/10 bg-[#16040d]/80 px-3 py-2 backdrop-blur-md">
                  <div className="flex items-center gap-2 text-xs text-[#fdfbf7]">
                    <Cpu className="h-3.5 w-3.5 text-[#e11d48]" />
                    <span>Real-time Text Node TreeWalker</span>
                  </div>
                  <span className="font-mono-code text-[11px] text-emerald-400">0.08ms latency</span>
                </div>
              </div>

              {/* Right Column: Key Capability Highlights */}
              <div className="space-y-4 lg:col-span-6">
                <div className="rounded-xl border border-[#f6efe2]/10 bg-[#1e0712]/50 p-4 transition-all hover:border-[#be185d]/40">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#9e1b32]/30 text-[#e11d48]">
                      <Zap className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#fdfbf7]">
                        {t('hero_stats_nodes')}
                      </h4>
                      <p className="mt-1 text-xs leading-relaxed text-[#ebdcc9]/75">
                        Detects all visible text, paragraphs, buttons, placeholders, and tooltips automatically with deterministic token classes.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-[#f6efe2]/10 bg-[#1e0712]/50 p-4 transition-all hover:border-[#be185d]/40">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#be185d]/30 text-rose-300">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#fdfbf7]">
                        {t('hero_stats_speed')}
                      </h4>
                      <p className="mt-1 text-xs leading-relaxed text-[#ebdcc9]/75">
                        Translates DOM nodes directly without full page reload or layout shift. Edge cached for instantaneous re-renders.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-[#f6efe2]/10 bg-[#1e0712]/50 p-4 transition-all hover:border-[#be185d]/40">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-900/30 text-amber-300">
                      <FileCode2 className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#fdfbf7]">
                        {t('hero_stats_override')}
                      </h4>
                      <p className="mt-1 text-xs leading-relaxed text-[#ebdcc9]/75">
                        Easily override automated translations with hand-crafted JSON dictionary files per language whenever needed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Proof & Metrics Strip (Claim-to-Proof Adjacency) */}
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 text-center sm:grid-cols-4">
          <div className="rounded-xl border border-[#f6efe2]/10 bg-[#16040d]/40 p-4 backdrop-blur-md">
            <div className="font-serif-luxury text-3xl font-bold text-[#fdfbf7] tabular-nums sm:text-4xl">
              &lt; 0.8<span className="text-xs font-normal text-[#e11d48]">KB</span>
            </div>
            <div className="mt-1 text-xs font-medium text-[#ebdcc9]/70">Gzipped Runtime</div>
          </div>

          <div className="rounded-xl border border-[#f6efe2]/10 bg-[#16040d]/40 p-4 backdrop-blur-md">
            <div className="font-serif-luxury text-3xl font-bold text-[#fdfbf7] tabular-nums sm:text-4xl">
              100<span className="text-xs font-normal text-[#e11d48]">+</span>
            </div>
            <div className="mt-1 text-xs font-medium text-[#ebdcc9]/70">Global Languages</div>
          </div>

          <div className="rounded-xl border border-[#f6efe2]/10 bg-[#16040d]/40 p-4 backdrop-blur-md">
            <div className="font-serif-luxury text-3xl font-bold text-[#fdfbf7] tabular-nums sm:text-4xl">
              0<span className="text-xs font-normal text-[#e11d48]">ms</span>
            </div>
            <div className="mt-1 text-xs font-medium text-[#ebdcc9]/70">Build Step Setup</div>
          </div>

          <div className="rounded-xl border border-[#f6efe2]/10 bg-[#16040d]/40 p-4 backdrop-blur-md">
            <div className="font-serif-luxury text-3xl font-bold text-[#fdfbf7] tabular-nums sm:text-4xl">
              100<span className="text-xs font-normal text-[#e11d48]">%</span>
            </div>
            <div className="mt-1 text-xs font-medium text-[#ebdcc9]/70">HTML / SPA Compatibility</div>
          </div>
        </div>
      </div>
    </section>
  );
};
