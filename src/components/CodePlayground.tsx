import React, { useState } from 'react';
import { Code2, Copy, Check, Play, Terminal, ArrowRight, Sparkles, Sliders } from 'lucide-react';

export const CodePlayground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vanilla' | 'react' | 'overrides' | 'customButton'>('vanilla');
  const [copied, setCopied] = useState(false);
  const [liveResult, setLiveResult] = useState<string | null>(null);

  const snippets = {
    vanilla: `<!-- 1. Include Langjs in your HTML -->
<script src="https://cdn.jsdelivr.net/npm/langjs/dist/lang.min.js"></script>

<!-- 2. Initialize with your configuration -->
<script>
  const lang = new LangJS({
    defaultLanguage: 'en',
    supportedLanguages: ['en', 'es', 'fr', 'de', 'ja', 'ar', 'zh', 'hi', 'it', 'pt'],
    cache: true,
    overridesDir: '/locales'
  });

  // Switch dynamically anytime:
  lang.setLanguage('es');
</script>`,

    customButton: `<!-- 1. Place your custom styled button in HTML -->
<button id="lang-toggle-btn" class="my-luxury-switcher">
  <span id="flag-icon">🇬🇧</span>
  <span id="lang-label">English</span>
</button>

<!-- 2. Bind with 5 lines of JavaScript -->
<script>
  const lang = new LangJS();
  const btn = document.getElementById('lang-toggle-btn');

  btn.addEventListener('click', () => {
    const nextLang = lang.current === 'en' ? 'es' : 'en';
    lang.setLanguage(nextLang);
  });

  lang.on('languageChange', (current) => {
    document.getElementById('lang-label').innerText = current.name;
    document.getElementById('flag-icon').innerText = current.flag;
  });
</script>`,

    react: `import { LangProvider, useLang } from 'langjs/react';

export function App() {
  return (
    <LangProvider 
      config={{ 
        defaultLanguage: 'en', 
        languages: ['en', 'es', 'fr', 'ja', 'ar', 'zh'] 
      }}
    >
      <MainSite />
    </LangProvider>
  );
}

function LanguageSwitcher() {
  const { currentLanguage, setLanguage, isTranslating } = useLang();

  return (
    <button 
      onClick={() => setLanguage(currentLanguage === 'en' ? 'ja' : 'en')}
      disabled={isTranslating}
      className="btn-burgundy"
    >
      {isTranslating ? 'Switching...' : \`Translate to \${currentLanguage === 'en' ? '日本語' : 'English'}\`}
    </button>
  );
}`,

    overrides: `// /locales/es.json — Override specific phrases with human copy
{
  "version": "2.0",
  "locale": "es",
  "overrides": {
    "Artisanal Velvet Timepieces": "Relojes de Terciopelo Artesanales",
    "Reserve Limited Edition": "Reservar Edición de Alta Colección",
    "Zero-Config Engine": "Motor Sin Configuración Previa",
    "Pricing & Memberships": "Planes y Membresías Exclusivas"
  }
}`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runSimulation = () => {
    setLiveResult('⚡ Initializing LangJS runtime...\n🔍 DOM TreeWalker scanned 28 elements\n🏷️ Attached .langjs-node classes\n✨ Loaded custom locale: /locales/es.json\n🚀 Language switched to "es" (Español) in 9.2ms');
    setTimeout(() => {
      setLiveResult((prev) => (prev ? prev + '\n✅ UI successfully updated with zero layout shift.' : ''));
    }, 400);
  };

  return (
    <section id="api" className="relative scroll-mt-24 py-24 bg-[#090205]">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-1/3 left-10 h-72 w-72 rounded-full bg-[#9e1b32]/15 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-72 w-72 rounded-full bg-[#4a0d24]/20 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#f6efe2]/15 bg-[#1f0712] px-3.5 py-1 text-xs font-semibold text-[#ebdcc9]">
            <Code2 className="h-3.5 w-3.5 text-[#e11d48]" />
            <span>Developer API & Integration</span>
          </div>
          <h2 className="mt-4 font-serif-luxury text-3xl font-bold tracking-tight text-[#fdfbf7] sm:text-5xl">
            Clean, Expressive JavaScript API
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[#ebdcc9]/80">
            Whether you are building a static plain HTML website or a React single-page app, Langjs requires zero boilerplate.
          </p>
        </div>

        {/* Code Showcase & Interactive Tester */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-[#f6efe2]/15 bg-[#13030b] shadow-2xl backdrop-blur-xl">
          {/* Top Bar with Tabs and Copy Button */}
          <div className="flex flex-wrap items-center justify-between border-b border-[#f6efe2]/10 bg-[#18040f] px-4 py-3 sm:px-6">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0">
              <button
                onClick={() => { setActiveTab('vanilla'); setLiveResult(null); }}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all whitespace-nowrap ${
                  activeTab === 'vanilla'
                    ? 'bg-[#9e1b32] text-white shadow-md'
                    : 'text-[#ebdcc9]/70 hover:text-white'
                }`}
              >
                Vanilla HTML & CDN
              </button>
              <button
                onClick={() => { setActiveTab('customButton'); setLiveResult(null); }}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all whitespace-nowrap ${
                  activeTab === 'customButton'
                    ? 'bg-[#9e1b32] text-white shadow-md'
                    : 'text-[#ebdcc9]/70 hover:text-white'
                }`}
              >
                Custom Button & JS Toggle
              </button>
              <button
                onClick={() => { setActiveTab('overrides'); setLiveResult(null); }}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all whitespace-nowrap ${
                  activeTab === 'overrides'
                    ? 'bg-[#9e1b32] text-white shadow-md'
                    : 'text-[#ebdcc9]/70 hover:text-white'
                }`}
              >
                Custom JSON Overrides
              </button>
              <button
                onClick={() => { setActiveTab('react'); setLiveResult(null); }}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all whitespace-nowrap ${
                  activeTab === 'react'
                    ? 'bg-[#9e1b32] text-white shadow-md'
                    : 'text-[#ebdcc9]/70 hover:text-white'
                }`}
              >
                React / Next.js Hook
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={runSimulation}
                className="luxury-button-primary flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-white transition-all hover:scale-105 active:scale-95"
              >
                <Play className="h-3 w-3 fill-current" />
                <span>Simulate Execution</span>
              </button>
              
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-lg border border-[#f6efe2]/15 bg-[#220715] px-3 py-1.5 text-xs text-[#ebdcc9] transition-all hover:border-[#be185d] hover:text-white"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>
          </div>

          {/* Code Viewer Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="p-6 lg:col-span-8 overflow-x-auto">
              <pre className="font-mono-code text-xs leading-relaxed text-[#ebdcc9]/90">
                <code>{snippets[activeTab]}</code>
              </pre>
            </div>

            {/* Right Interactive Execution / Explanation Panel */}
            <div className="border-t border-[#f6efe2]/10 bg-[#0c0207] p-6 lg:col-span-4 lg:border-t-0 lg:border-l">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#fdfbf7]">
                <Terminal className="h-4 w-4 text-[#e11d48]" />
                <span>API Execution Output</span>
              </div>

              {liveResult ? (
                <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-4 font-mono-code text-xs text-emerald-300 whitespace-pre-line leading-relaxed">
                  {liveResult}
                </div>
              ) : (
                <div className="mt-4 rounded-xl border border-dashed border-[#f6efe2]/15 p-6 text-center text-xs text-[#ebdcc9]/60">
                  <Sliders className="mx-auto h-6 w-6 text-[#e11d48]/60 mb-2" />
                  Click <strong>Simulate Execution</strong> to watch Langjs initialize, discover DOM nodes, apply JSON overrides, and translate.
                </div>
              )}

              {/* Methods Reference */}
              <div className="mt-6 border-t border-[#f6efe2]/10 pt-4">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#cbb89e]/70">
                  Core Methods Available
                </div>
                <ul className="mt-2 space-y-2 text-xs font-mono-code text-[#ebdcc9]/80">
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#be185d]">lang.setLanguage(code)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#be185d]">lang.getLanguage()</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#be185d]">lang.override(dict)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#be185d]">lang.mount(selector)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
