import React, { useState } from 'react';
import { Cpu, FileJson, Layers, Compass, Check, Copy } from 'lucide-react';

export const ArchitectureBento: React.FC = () => {
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const sampleJsonOverride = `{
  "locale": "es",
  "overrides": {
    "Artisanal Velvet Timepieces": "Relojes de Terciopelo Artesanales",
    "Reserve Limited Edition": "Reservar Edición de Colección",
    "Pricing": "Tarifas Especiales"
  }
}`;

  const copyJson = () => {
    navigator.clipboard.writeText(sampleJsonOverride);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <section id="architecture" className="relative scroll-mt-24 py-20 lg:py-28 bg-[#090205]">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-mono-code text-rose-300 uppercase tracking-wider">
            Architecture & Principles
          </div>
          <h2 className="mt-3 font-serif-luxury text-3xl font-bold tracking-tight text-[#fdfbf7] sm:text-5xl">
            Engineered for Zero-Friction Localization
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#ebdcc9]/80">
            A surgical client-side framework designed to localize existing websites without requiring code refactoring, template syntax rewriting, or complicated translation pipelines.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {/* Bento Card 1: Visual DOM TreeWalker (Span 2 Columns) */}
          <div className="rounded-2xl border border-[#f6efe2]/10 bg-[#12030b] p-6 lg:col-span-2 lg:p-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#9e1b32]/20 text-[#e11d48]">
                  <Cpu className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-serif-luxury text-2xl font-bold text-[#fdfbf7]">
                  01. DOM TreeWalker & Token Classifier
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#ebdcc9]/80">
                  Langjs traverses the active document using an optimized DOM TreeWalker. It isolates all rendered text nodes, button captions, aria labels, and placeholders, tracking elements while keeping your clean HTML markup intact.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-mono-code text-[#ebdcc9]/60">
                  <span>TreeWalker API</span>
                  <span>·</span>
                  <span>Deterministic Hash Keys</span>
                  <span>·</span>
                  <span>Sub-10ms Mutations</span>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-xl border border-[#f6efe2]/10 bg-[#090205] lg:col-span-5 aspect-[4/3]">
                <img
                  src="/src/assets/images/bento_dom_neural_network_1790761611142.jpg"
                  alt="DOM TreeWalker Architecture"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0208]/90 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-center font-mono-code text-[11px] text-emerald-400 bg-[#16040d]/90 py-1.5 px-2 rounded border border-emerald-500/20 backdrop-blur-md">
                  Parsed 42 DOM Nodes in 0.4ms
                </div>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Translation Pipeline + Cache */}
          <div className="rounded-2xl border border-[#f6efe2]/10 bg-[#12030b] p-6 lg:p-8 flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#be185d]/20 text-rose-300">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-serif-luxury text-2xl font-bold text-[#fdfbf7]">
                02. Intelligent Batch Caching
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#ebdcc9]/80">
                Batch translates all unique text tokens with deduplication and LocalStorage caching. Phrases are requested once and cached instantly on the client.
              </p>
            </div>
            
            <div className="mt-6 rounded-xl border border-[#f6efe2]/10 bg-[#0a0206] p-3 text-xs font-mono-code">
              <div className="flex justify-between text-[#ebdcc9]/60 pb-1 border-b border-[#f6efe2]/5 text-[10px]">
                <span>CACHE LAYER</span>
                <span className="text-emerald-400">99.4% CACHE HIT</span>
              </div>
              <div className="mt-2 text-rose-200">
                &gt; Batching 14 unique tokens...<br />
                &gt; Local memory cache: HIT (0ms)<br />
                &gt; Mutated 14 DOM references
              </div>
            </div>
          </div>

          {/* Bento Card 3: Custom JSON Overrides */}
          <div className="rounded-2xl border border-[#f6efe2]/10 bg-[#12030b] p-6 lg:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-900/20 text-amber-300">
                  <FileJson className="h-5 w-5" />
                </div>
                <button
                  onClick={copyJson}
                  className="flex items-center gap-1 text-[11px] font-mono-code text-[#ebdcc9]/60 hover:text-[#ebdcc9]"
                >
                  {copiedSnippet ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  <span>{copiedSnippet ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <h3 className="mt-4 font-serif-luxury text-2xl font-bold text-[#fdfbf7]">
                03. Custom Locale JSON Overrides
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#ebdcc9]/80">
                Machine translations provide great baselines, but brand slogans demand exact precision. Provide simple JSON dictionaries to override any specific string.
              </p>
            </div>

            <div className="mt-6 overflow-x-auto rounded-xl border border-[#f6efe2]/10 bg-[#090205] p-3 font-mono-code text-[11px] text-[#ebdcc9]">
              <pre className="text-amber-200/90">{sampleJsonOverride}</pre>
            </div>
          </div>

          {/* Bento Card 4: Simple JS API */}
          <div className="rounded-2xl border border-[#f6efe2]/10 bg-[#12030b] p-6 lg:p-8 flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-900/20 text-rose-300">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-serif-luxury text-2xl font-bold text-[#fdfbf7]">
                04. Minimal JavaScript API
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#ebdcc9]/80">
                Integrate anywhere with 3 clean lines of code: import the package, create an instance, and switch language on demand.
              </p>
            </div>

            <div className="mt-6 rounded-xl border border-[#f6efe2]/10 bg-[#090205] p-3 font-mono-code text-[11px] text-[#ebdcc9]">
              <span className="text-[#be185d]">import</span> {'{ LangJS }'} <span className="text-[#be185d]">from</span> <span className="text-emerald-300">'@nexuss0781/langjs'</span>;<br />
              <span className="text-[#be185d]">const</span> lang = <span className="text-[#be185d]">new</span> LangJS();<br />
              <span className="text-[#ebdcc9]/50">// Switch to Japanese:</span><br />
              <span className="text-rose-300">await</span> lang.setLanguage(<span className="text-emerald-300">'ja'</span>);
            </div>
          </div>

          {/* Bento Card 5: RTL Support */}
          <div className="rounded-2xl border border-[#f6efe2]/10 bg-[#12030b] p-6 lg:p-8 flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-900/20 text-purple-300">
                <Compass className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-serif-luxury text-2xl font-bold text-[#fdfbf7]">
                05. Automatic RTL Switching
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#ebdcc9]/80">
                Automatically adjusts root document direction to <code className="text-purple-300 font-mono text-xs">dir="rtl"</code> when Arabic, Hebrew, Urdu, or Persian are active.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between rounded-xl border border-[#f6efe2]/10 bg-[#090205] p-3 text-xs text-[#ebdcc9]">
              <span className="font-mono-code text-[11px] text-[#ebdcc9]/70">
                HTML dir: 'rtl' | 'ltr'
              </span>
              <span className="text-emerald-400 font-mono-code text-[11px]">
                Auto-Adaptive
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
