import React, { useState } from 'react';
import { Terminal, Copy, Check, ArrowRight, BookOpen, Zap, Code2, Layers, Github } from 'lucide-react';
import { SupportedLanguage, DICTIONARY } from '../data/translations';

interface HeroProps {
  currentLang: SupportedLanguage;
  onNavigateToDocs: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  onNavigateToDocs,
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
        {/* Release Metadata */}
        <div className="flex justify-center">
          <div className="text-xs font-mono-code text-[var(--text-secondary)] tracking-wide bg-[var(--bg-card)] px-4 py-1.5 rounded-full border border-[var(--border-color)] shadow-xs">
            <span className="font-semibold text-[var(--text-hero)]">LangJS v1.1.0</span>
            <span className="mx-2 text-[var(--border-hover)]">·</span>
            <span className="text-[#9e1b32] font-medium">Client & Server-Side i18n SDK</span>
            <span className="mx-2 text-[var(--border-hover)]">·</span>
            <span>Zero Dependencies</span>
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

        {/* Prominent Action Button (Burgundy) + Secondary GitHub Link */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <button
            onClick={onNavigateToDocs}
            className="w-full sm:w-auto luxury-button-primary flex h-11 sm:h-12 items-center justify-center gap-2.5 rounded-xl px-8 text-sm font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <BookOpen className="h-4 w-4 text-white" />
            <span>View Documentation</span>
            <ArrowRight className="h-4 w-4 opacity-80" />
          </button>

          <a
            href="https://github.com/Nexuss-Onyx/langjs"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto flex h-11 sm:h-12 items-center justify-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] px-6 text-sm font-medium text-[var(--text-primary)] transition-all hover:border-[#9e1b32]/50 hover:bg-[var(--bg-card-hover)]"
          >
            <Github className="h-4 w-4 text-[#9e1b32]" />
            <span>GitHub Repository</span>
          </a>
        </div>

        {/* Quick Install Command Box (Dark Mocha Espresso Terminal for developer clarity) */}
        <div className="mx-auto mt-8 max-w-lg">
          <div className="rounded-xl border border-[rgba(75,50,30,0.2)] bg-[#1e1713] p-3 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-2 text-xs text-[#d8cab7]">
              <div className="flex items-center gap-2 font-mono-code">
                <Terminal className="h-3.5 w-3.5 text-rose-400" />
                <span>Installation</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setInstallMethod('npm')}
                  className={`px-2.5 py-0.5 rounded text-[11px] font-mono-code transition-colors ${
                    installMethod === 'npm'
                      ? 'bg-[#9e1b32] text-white font-semibold'
                      : 'text-[#d8cab7]/70 hover:text-white'
                  }`}
                >
                  npm
                </button>
                <button
                  onClick={() => setInstallMethod('cdn')}
                  className={`px-2.5 py-0.5 rounded text-[11px] font-mono-code transition-colors ${
                    installMethod === 'cdn'
                      ? 'bg-[#9e1b32] text-white font-semibold'
                      : 'text-[#d8cab7]/70 hover:text-white'
                  }`}
                >
                  cdn
                </button>
              </div>
            </div>

            <div className="mt-2.5 flex items-center justify-between font-mono-code text-xs text-[#fdfbf7]">
              <span className="truncate pr-3 selection:bg-[#9e1b32]">
                {installMethod === 'npm' ? npmCommand : cdnCommand}
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-[#2c221c] px-2.5 py-1 text-[11px] text-[#f5ede1] hover:border-[#9e1b32] hover:text-white transition-colors shrink-0"
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

        {/* Iconic Focal Concept Card: 1 Line of Code Live Interactive Visual */}
        <div className="mt-14 sm:mt-20 max-w-4xl mx-auto">
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden shadow-xl">
            {/* Window bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-color)] bg-[var(--bg-elevated)] px-4 py-3">
              <div className="flex items-center gap-2 font-mono-code text-xs text-[var(--text-secondary)] font-medium">
                <Code2 className="h-3.5 w-3.5 text-[#9e1b32]" />
                <span>lang.setLanguage(locale)</span>
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
                    className={`px-2.5 py-1 rounded-md text-xs font-mono-code transition-colors shrink-0 ${
                      previewLang === item.code
                        ? 'bg-[#9e1b32] text-white font-medium shadow-xs'
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
              {/* Left Column: Minimal JS Snippet (Dark Mocha Editor) */}
              <div className="md:col-span-5 p-5 sm:p-6 bg-[#1a1410] flex flex-col justify-between font-mono-code text-xs text-[#f5ede1] space-y-4">
                <div>
                  <div className="text-[11px] text-[#d8cab7]/70 uppercase tracking-wider mb-2">
                    JavaScript Integration
                  </div>
                  <pre className="text-rose-200/90 leading-relaxed overflow-x-auto">
                    <span className="text-[#e11d48]">import</span> {'{ LangJS }'} <span className="text-[#e11d48]">from</span> <span className="text-emerald-300">'@nexuss0781/langjs'</span>;<br /><br />
                    <span className="text-[#e11d48]">const</span> lang = <span className="text-[#e11d48]">new</span> LangJS();<br />
                    <span className="text-[#d8cab7]/50">// Instant DOM mutation:</span><br />
                    <span className="text-rose-300">await</span> lang.setLanguage(<span className="text-emerald-300">'{previewLang}'</span>);
                  </pre>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-[#d8cab7]/70">
                  <span>Mutation latency</span>
                  <span className="font-bold text-emerald-400">4.2ms</span>
                </div>
              </div>

              {/* Right Column: Live In-Place Rendered DOM Component on Warm Cream Surface */}
              <div
                className="md:col-span-7 p-6 sm:p-8 bg-[var(--bg-card)] flex flex-col justify-center"
                dir={currentPreview.rtl ? 'rtl' : 'ltr'}
              >
                <div className="text-[11px] font-mono-code text-[#9e1b32] uppercase tracking-wider mb-1.5 font-semibold">
                  Rendered HTML Output
                </div>
                <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[var(--text-hero)] transition-all duration-200">
                  {currentPreview.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed transition-all duration-200">
                  {currentPreview.desc}
                </p>
                <div className="mt-5">
                  <button className="luxury-button-primary px-4 py-2 rounded-lg text-xs font-semibold text-white">
                    {currentPreview.button}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Iconic Highlights on Warm Cream Cards */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#9e1b32]/10 text-[#9e1b32]">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-serif-luxury text-xl font-bold text-[var(--text-hero)]">
                Sub-10ms DOM Patching
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Discovers visible text nodes and mutates text in-place with zero React re-renders or layout shifts.
              </p>
            </div>
            <div className="mt-4 font-mono-code text-[11px] text-[#9e1b32] font-medium">
              TreeWalker DOM Crawler
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#9e1b32]/10 text-[#9e1b32]">
                <Code2 className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-serif-luxury text-xl font-bold text-[var(--text-hero)]">
                Zero-Config Setup
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Eliminates the maintenance overhead of managing thousands of static translation keys in manual JSON files.
              </p>
            </div>
            <div className="mt-4 font-mono-code text-[11px] text-[#9e1b32] font-medium">
              No Translation Keys
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#9e1b32]/10 text-[#9e1b32]">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-serif-luxury text-xl font-bold text-[var(--text-hero)]">
                100+ Global Locales
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Seamlessly adapts layout directions (`dir="rtl"`) for Arabic, Hebrew, Urdu, and Persian out of the box.
              </p>
            </div>
            <div className="mt-4 font-mono-code text-[11px] text-[#9e1b32] font-medium">
              Automatic RTL Switching
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
