import React, { useState } from 'react';
import { Terminal, Copy, Check, ArrowRight, BookOpen, Zap, Code2, Layers, Github, Sparkles } from 'lucide-react';
import { SupportedLanguage, DICTIONARY } from '../data/translations';

interface HeroProps {
  currentLang: SupportedLanguage;
  onNavigateToDocs: () => void;
  onNavigateToAiSkill?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  onNavigateToDocs,
  onNavigateToAiSkill,
}) => {
  const [copied, setCopied] = useState(false);
  const [installMethod, setInstallMethod] = useState<'npm' | 'cdn'>('npm');
  const [previewLang, setPreviewLang] = useState<'en' | 'es' | 'ja' | 'fr' | 'ar'>('es');

  const t = (key: string) => DICTIONARY[key]?.[currentLang] || DICTIONARY[key]?.['en'] || key;

  const npmCommand = 'npm install @nexuss0781/langjs';
  const cdnCommand = '<script src="https://cdn.jsdelivr.net/npm/@nexuss0781/langjs/dist/lang.min.js"></script>';

  const handleCopy = () => {
    const textToCopy = installMethod === 'npm' ? npmCommand : cdnCommand;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const previewSnippets: Record<string, { title: string; desc: string; button: string; rtl?: boolean }> = {
    en: {
      title: 'Crafted Precision Timepieces',
      desc: 'Handcrafted luxury watches designed for discerning collectors worldwide.',
      button: 'Explore Catalog',
      rtl: false,
    },
    es: {
      title: 'Relojes Artesanales de Precisión',
      desc: 'Relojes de lujo hechos a mano para coleccionistas exigentes en todo el mundo.',
      button: 'Explorar Catálogo',
      rtl: false,
    },
    ja: {
      title: '至高のハンドクラフト高級腕時計',
      desc: '世界中の審美眼を持つコレクターのために手作業で作られた最高峰の時計。',
      button: 'コレクションを見る',
      rtl: false,
    },
    fr: {
      title: 'Montres Artisanales de Haute Précision',
      desc: 'Garde-temps d’exception façonnés à la main pour les collectionneurs avertis.',
      button: 'Découvrir la Collection',
      rtl: false,
    },
    ar: {
      title: 'ساعات يدوية الصنع فائقة الدقة',
      desc: 'ساعات فاخرة مصنوعة يدويًا للمقتنين المتميزين حول العالم بأعلى معايير الحرفية.',
      button: 'استكشف المجموعة',
      rtl: true,
    },
  };

  const currentPreview = previewSnippets[previewLang] || previewSnippets.en;

  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-24 lg:pt-24 lg:pb-32">
      {/* Subtle Warm Amber / Burgundy Ambient Glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#9e1b32]/15 via-[#dfd3c3]/20 to-transparent blur-[140px]" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Release Metadata with AI Skill promotional pill */}
        <div className="flex justify-center">
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono-code text-[var(--text-secondary)] tracking-wide bg-[var(--bg-card)] px-4 py-1.5 rounded-full border border-[var(--border-color)] shadow-xs">
            <span className="font-semibold text-[var(--text-hero)]">LangJS v1.1.0</span>
            <span className="text-[var(--border-hover)]">·</span>
            <span className="text-[#9e1b32] font-medium">Client & Server i18n</span>
            <span className="text-[var(--border-hover)]">·</span>
            <button
              onClick={onNavigateToAiSkill}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#9e1b32]/12 hover:bg-[#9e1b32] text-[#9e1b32] hover:text-white border border-[#9e1b32]/35 transition-all font-semibold cursor-pointer shadow-xs group"
            >
              <Sparkles className="h-3 w-3 text-[#9e1b32] group-hover:text-white transition-colors" />
              <span>AI Agent Skill (SKILL.md)</span>
            </button>
          </div>
        </div>

        {/* Hero Headlines */}
        <div className="mt-8 text-center max-w-4xl mx-auto">
          <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-[var(--text-hero)] leading-[1.08]">
            {t('hero_title_1')}{' '}
            <span className="text-[#9e1b32]">
              {t('hero_title_2')}
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm sm:text-base md:text-lg text-[var(--text-secondary)] leading-relaxed">
            {t('hero_subtitle')}
          </p>
        </div>

        {/* Prominent Action Buttons with AI Skill Promotion */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={onNavigateToDocs}
            className="w-full sm:w-auto luxury-button-primary flex h-11 sm:h-12 items-center justify-center gap-2.5 rounded-xl px-7 text-sm font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <BookOpen className="h-4 w-4 text-white" />
            <span>Documentation</span>
            <ArrowRight className="h-4 w-4 opacity-80" />
          </button>

          <button
            onClick={onNavigateToAiSkill}
            className="w-full sm:w-auto flex h-11 sm:h-12 items-center justify-center gap-2 rounded-xl border border-[#9e1b32]/40 bg-[#9e1b32]/10 hover:bg-[#9e1b32] px-6 text-sm font-semibold text-[#9e1b32] hover:text-white transition-all shadow-xs cursor-pointer group"
          >
            <Sparkles className="h-4 w-4 text-[#9e1b32] group-hover:text-white transition-colors" />
            <span>AI Agent Skill</span>
          </button>

          <a
            href="https://github.com/Nexuss-Onyx/langjs"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto flex h-11 sm:h-12 items-center justify-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] px-5 text-sm font-medium text-[var(--text-primary)] transition-all hover:border-[#9e1b32]/50 hover:bg-[var(--bg-card-hover)]"
          >
            <Github className="h-4 w-4 text-[#9e1b32]" />
            <span>GitHub</span>
          </a>
        </div>

        {/* Quick Install Command Box (Dark Mocha Espresso Terminal for developer clarity) */}
        <div className="mx-auto mt-8 max-w-lg">
          <div className="relative dark-console-panel rounded-xl p-3.5 shadow-xl overflow-hidden">
            <div className="corner-glow-accent" />
            <div className="flex items-center justify-between border-b border-white/10 pb-2 text-xs text-[#d8cab7]">
              <div className="flex items-center gap-2 font-mono-code">
                <div className="flex items-center gap-1.5 mr-1">
                  <span className="h-2 w-2 rounded-full bg-rose-500/80 inline-block" />
                  <span className="h-2 w-2 rounded-full bg-amber-500/80 inline-block" />
                  <span className="h-2 w-2 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <Terminal className="h-3.5 w-3.5 text-rose-400" />
                <span className="font-semibold text-[#f5ede1]">Quick Installation</span>
              </div>
              <div className="flex items-center gap-1 bg-black/40 p-0.5 rounded-lg border border-white/5">
                <button
                  onClick={() => setInstallMethod('npm')}
                  className={`px-2.5 py-0.5 rounded text-[11px] font-mono-code transition-all cursor-pointer ${
                    installMethod === 'npm'
                      ? 'bg-[#9e1b32] text-white font-semibold shadow-xs'
                      : 'text-[#d8cab7]/70 hover:text-white'
                  }`}
                >
                  npm
                </button>
                <button
                  onClick={() => setInstallMethod('cdn')}
                  className={`px-2.5 py-0.5 rounded text-[11px] font-mono-code transition-all cursor-pointer ${
                    installMethod === 'cdn'
                      ? 'bg-[#9e1b32] text-white font-semibold shadow-xs'
                      : 'text-[#d8cab7]/70 hover:text-white'
                  }`}
                >
                  cdn
                </button>
              </div>
            </div>

            <div className="mt-2.5 flex items-center justify-between font-mono-code text-xs text-[#fdfbf7]">
              <div className="flex items-center gap-2 truncate pr-3">
                <span className="text-emerald-400 select-none">$</span>
                <span className="truncate selection:bg-[#9e1b32]">
                  {installMethod === 'npm' ? npmCommand : cdnCommand}
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-[#2c221c]/80 px-2.5 py-1 text-[11px] text-[#f5ede1] hover:border-[#9e1b32] hover:bg-[#9e1b32]/20 hover:text-white transition-all shrink-0 cursor-pointer shadow-xs"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-400" />
                    <span className="text-emerald-300 font-semibold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3 text-rose-300" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Iconic Focal Concept Card: 1 Line of Code Live Interactive Visual */}
        <div className="mt-14 sm:mt-20 max-w-4xl mx-auto">
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden shadow-2xl relative">
            {/* Window bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-color)] bg-[var(--bg-elevated)] px-4 py-3">
              <div className="flex items-center gap-2 font-mono-code text-xs text-[var(--text-secondary)] font-medium">
                <div className="flex items-center gap-1.5 mr-1">
                  <span className="h-2 w-2 rounded-full bg-rose-500/80 inline-block" />
                  <span className="h-2 w-2 rounded-full bg-amber-500/80 inline-block" />
                  <span className="h-2 w-2 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <Code2 className="h-3.5 w-3.5 text-[#9e1b32]" />
                <span className="font-semibold text-[var(--text-hero)]">Interactive DOM Transformer</span>
              </div>

              {/* Instant Language Switcher Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto py-0.5">
                {[
                  { code: 'en', label: 'English' },
                  { code: 'es', label: 'Español' },
                  { code: 'ja', label: '日本語' },
                  { code: 'fr', label: 'Français' },
                  { code: 'ar', label: 'العربية' },
                ].map((item) => (
                  <button
                    key={item.code}
                    onClick={() => setPreviewLang(item.code as any)}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono-code transition-all shrink-0 cursor-pointer ${
                      previewLang === item.code
                        ? 'bg-[#9e1b32] text-white font-medium shadow-md shadow-[#9e1b32]/30 scale-105'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-hero)] hover:bg-[var(--bg-card)]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Split Visual: Code on Left / Instant DOM Output on Right */}
            <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[var(--border-color)]">
              {/* Left Column: Minimal JS Snippet (Dark Mocha Console with glowing accents) */}
              <div className="md:col-span-5 p-5 sm:p-6 dark-console-panel flex flex-col justify-between font-mono-code text-xs text-[#f5ede1] space-y-4 relative overflow-hidden">
                <div className="corner-glow-accent" />
                
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] text-[#d8cab7]/80 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#9e1b32]" />
                      JavaScript Integration
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-medium">
                      Zero Config
                    </span>
                  </div>

                  {/* Code Block with line numbers and glowing focus line */}
                  <div className="flex text-xs leading-relaxed font-mono-code overflow-x-auto">
                    {/* Line numbers */}
                    <div className="select-none pr-3 text-right text-[#d8cab7]/30 border-r border-white/10 mr-3">
                      <div>1</div>
                      <div>2</div>
                      <div>3</div>
                      <div className="text-rose-400 font-bold">4</div>
                    </div>

                    {/* Code contents */}
                    <div className="w-full">
                      <div><span className="text-[#e11d48]">import</span> {'{ LangJS }'} <span className="text-[#e11d48]">from</span> <span className="text-emerald-300">'@nexuss0781/langjs'</span>;</div>
                      <div className="mt-1"><span className="text-[#e11d48]">const</span> lang = <span className="text-[#e11d48]">new</span> LangJS();</div>
                      <div className="text-[#d8cab7]/40 text-[11px] mt-1">// 1-line in-place mutation:</div>
                      <div className="mt-0.5 -mx-1 px-1.5 py-0.5 rounded bg-[#9e1b32]/25 border border-[#9e1b32]/50 text-white shadow-xs flex items-center justify-between">
                        <span><span className="text-rose-300 font-semibold">await</span> lang.setLanguage(<span className="text-emerald-300 font-bold">'{previewLang}'</span>);</span>
                        <span className="pulse-beacon ml-2" title="Active Mutation" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-[#d8cab7]/70">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span>In-Place Mutation</span>
                  </div>
                  <span className="font-bold text-emerald-400 font-mono-code bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                    ⚡ 4.2ms
                  </span>
                </div>
              </div>

              {/* Right Column: Live In-Place Rendered DOM Component on Warm Cream Surface */}
              <div
                className="md:col-span-7 p-6 sm:p-8 bg-[var(--bg-card)] flex flex-col justify-center relative overflow-hidden"
                dir={currentPreview.rtl ? 'rtl' : 'ltr'}
              >
                {/* Visual scanning beam overlay */}
                <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#9e1b32]/40 to-transparent" />
                
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[11px] font-mono-code text-[#9e1b32] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#9e1b32]/20 border border-[#9e1b32] flex items-center justify-center">
                      <span className="h-1 w-1 rounded-full bg-[#9e1b32]" />
                    </span>
                    Live Rendered DOM
                  </div>
                  <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-[#9e1b32]/10 border border-[#9e1b32]/20 text-[#9e1b32] font-semibold">
                    Target: {previewLang.toUpperCase()}
                  </span>
                </div>

                <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[var(--text-hero)] transition-all duration-200">
                  {currentPreview.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed transition-all duration-200">
                  {currentPreview.desc}
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <button className="luxury-button-primary px-4 py-2 rounded-lg text-xs font-semibold text-white shadow-md">
                    {currentPreview.button}
                  </button>
                  <span className="text-[11px] font-mono-code text-[var(--text-muted)]">
                    No layout shift (CLS: 0.00)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Iconic Highlights on Warm Luxury Cards with Focused Reading Accents */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="luxury-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative group hover:border-[#9e1b32]/40 transition-all duration-300">
            <div className="corner-glow-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#9e1b32]/15 to-amber-600/10 text-[#9e1b32] border border-[#9e1b32]/20 shadow-xs">
                  <Zap className="h-5 w-5" />
                </div>
                <span className="reading-focus-badge">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  &lt; 10ms
                </span>
              </div>
              <h3 className="mt-4 font-serif-luxury text-xl font-bold text-[var(--text-hero)] group-hover:text-[#9e1b32] transition-colors">
                Sub-10ms DOM Patching
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Discovers visible text nodes and mutates text in-place with zero React re-renders or layout shifts.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-[var(--border-color)] flex items-center justify-between font-mono-code text-[11px]">
              <span className="text-[#9e1b32] font-semibold">TreeWalker DOM Crawler</span>
              <span className="text-[var(--text-muted)]">Client-Side</span>
            </div>
          </div>

          <div className="luxury-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative group hover:border-[#9e1b32]/40 transition-all duration-300">
            <div className="corner-glow-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#9e1b32]/15 to-amber-600/10 text-[#9e1b32] border border-[#9e1b32]/20 shadow-xs">
                  <Code2 className="h-5 w-5" />
                </div>
                <span className="reading-focus-badge">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#9e1b32]" />
                  Zero Keys
                </span>
              </div>
              <h3 className="mt-4 font-serif-luxury text-xl font-bold text-[var(--text-hero)] group-hover:text-[#9e1b32] transition-colors">
                Zero-Config Integration
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Eliminates the maintenance overhead of managing thousands of static translation keys in manual JSON files.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-[var(--border-color)] flex items-center justify-between font-mono-code text-[11px]">
              <span className="text-[#9e1b32] font-semibold">No t('key') Refactoring</span>
              <span className="text-[var(--text-muted)]">Full-Stack</span>
            </div>
          </div>

          <div className="luxury-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative group hover:border-[#9e1b32]/40 transition-all duration-300">
            <div className="corner-glow-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#9e1b32]/15 to-amber-600/10 text-[#9e1b32] border border-[#9e1b32]/20 shadow-xs">
                  <Layers className="h-5 w-5" />
                </div>
                <span className="reading-focus-badge">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  Auto RTL
                </span>
              </div>
              <h3 className="mt-4 font-serif-luxury text-xl font-bold text-[var(--text-hero)] group-hover:text-[#9e1b32] transition-colors">
                100+ Global Locales
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Seamlessly adapts layout directions (`dir="rtl"`) for Arabic, Hebrew, Urdu, and Persian out of the box.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-[var(--border-color)] flex items-center justify-between font-mono-code text-[11px]">
              <span className="text-[#9e1b32] font-semibold">Automatic RTL Engine</span>
              <span className="text-[var(--text-muted)]">Universal</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
