import React, { useState } from 'react';
import { Network, Cpu, FileJson, Layers, Compass, SearchCheck, Check, ArrowUpRight, Copy } from 'lucide-react';

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
    <section id="architecture" className="relative scroll-mt-24 py-24 bg-[#090205]">
      {/* Background glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[900px] rounded-full bg-[#be185d]/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#f6efe2]/15 bg-[#1f0712] px-3.5 py-1 text-xs font-semibold text-[#ebdcc9]">
            <Network className="h-3.5 w-3.5 text-[#e11d48]" />
            <span>Core Architecture & Mechanism</span>
          </div>
          <h2 className="mt-4 font-serif-luxury text-3xl font-bold tracking-tight text-[#fdfbf7] sm:text-5xl">
            How Langjs Powers Zero-Effort Localization
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#ebdcc9]/80">
            A surgical architecture designed to localize existing websites without requiring refactoring, template syntax changes, or complex internationalization build pipelines.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Bento Card 1: Visual DOM TreeWalker (Span 2 Columns) */}
          <div className="luxury-card group relative overflow-hidden rounded-2xl p-6 lg:col-span-2 lg:p-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#9e1b32]/30 text-[#e11d48]">
                  <Cpu className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-serif-luxury text-2xl font-bold text-[#fdfbf7]">
                  01. Autonomous DOM Crawler & Token Classifier
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#ebdcc9]/80">
                  Langjs traverses the active document using an optimized DOM TreeWalker. It isolates all rendered text nodes, button captions, aria labels, and placeholders, attaching lightweight tracker classes (<code className="text-rose-300 font-mono text-xs">.langjs-node</code>) while keeping your clean HTML pristine.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-mono-code text-[#ebdcc9]/70">
                  <span className="rounded-md border border-[#f6efe2]/10 bg-[#16040d] px-2.5 py-1">
                    TreeWalker API
                  </span>
                  <span className="rounded-md border border-[#f6efe2]/10 bg-[#16040d] px-2.5 py-1">
                    Deterministic Hashing
                  </span>
                  <span className="rounded-md border border-[#f6efe2]/10 bg-[#16040d] px-2.5 py-1">
                    Zero AST Mutation
                  </span>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-xl border border-[#f6efe2]/15 bg-[#0e0208] lg:col-span-5 aspect-[4/3]">
                <img
                  src="/src/assets/images/bento_dom_neural_network_1790761611142.jpg"
                  alt="DOM neural transformation"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0208]/90 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-center font-mono-code text-[10px] text-emerald-400 bg-[#16040d]/90 py-1.5 px-2 rounded border border-emerald-500/20 backdrop-blur-md">
                  Indexed 42 Nodes in 0.4ms
                </div>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Google Translate Engine + Cache (Span 1 Column) */}
          <div className="luxury-card group rounded-2xl p-6 lg:p-8 flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#be185d]/30 text-rose-300">
                <Network className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-serif-luxury text-2xl font-bold text-[#fdfbf7]">
                02. Neural Google Translate Pipeline
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#ebdcc9]/80">
                Batch translates all unique text tokens via Google Translate Neural Cloud API. Intelligent deduplication and multi-tier edge caching mean phrases are translated once and cached forever.
              </p>
            </div>
            
            <div className="mt-6 rounded-xl border border-[#f6efe2]/10 bg-[#12030b] p-3 text-xs font-mono-code">
              <div className="flex justify-between text-[#ebdcc9]/60 pb-1 border-b border-[#f6efe2]/5 text-[10px]">
                <span>CACHE LAYER</span>
                <span className="text-emerald-400">HIT RATIO 99.4%</span>
              </div>
              <div className="mt-2 text-rose-200">
                &gt; Batching 14 unique tokens...<br />
                &gt; Edge CDN cache: HIT (0ms)<br />
                &gt; Swapped 14 DOM references
              </div>
            </div>
          </div>

          {/* Bento Card 3: Custom JSON Overrides (Span 1 Column) */}
          <div className="luxury-card group rounded-2xl p-6 lg:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-900/30 text-amber-300">
                  <FileJson className="h-5 w-5" />
                </div>
                <button
                  onClick={copyJson}
                  className="flex items-center gap-1 text-[11px] font-mono-code text-[#ebdcc9]/60 hover:text-[#ebdcc9]"
                >
                  {copiedSnippet ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  <span>{copiedSnippet ? 'Copied' : 'Copy JSON'}</span>
                </button>
              </div>
              <h3 className="mt-4 font-serif-luxury text-2xl font-bold text-[#fdfbf7]">
                03. Custom Locale JSON Overrides
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#ebdcc9]/80">
                Machine translations are great, but key marketing copy demands perfection. Place simple JSON files in your project to override any specific token with hand-crafted copy.
              </p>
            </div>

            <div className="mt-6 overflow-x-auto rounded-xl border border-[#f6efe2]/10 bg-[#090205] p-3 font-mono-code text-[11px] text-[#ebdcc9]">
              <pre className="text-amber-200/90">{sampleJsonOverride}</pre>
            </div>
          </div>

          {/* Bento Card 4: Simple JS API & Custom Buttons (Span 1 Column) */}
          <div className="luxury-card group rounded-2xl p-6 lg:p-8 flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-900/40 text-[#f43f5e]">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-serif-luxury text-2xl font-bold text-[#fdfbf7]">
                04. Drop-in Switcher & Clear JS API
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#ebdcc9]/80">
                Developers can bind any existing button, link, or custom select menu with a clean 3-line JavaScript API: <code className="text-rose-300 font-mono text-xs">lang.setLanguage('ja')</code>.
              </p>
            </div>

            <div className="mt-6 rounded-xl border border-[#f6efe2]/10 bg-[#14030d] p-3 font-mono-code text-[11px] text-[#ebdcc9]">
              <span className="text-[#be185d]">import</span> {'{ LangJS }'} <span className="text-[#be185d]">from</span> <span className="text-emerald-300">'langjs'</span>;<br />
              <span className="text-[#be185d]">const</span> lang = <span className="text-[#be185d]">new</span> LangJS();<br />
              <span className="text-amber-300">// Bind your button:</span><br />
              myButton.onclick = () =&gt; lang.toggle();
            </div>
          </div>

          {/* Bento Card 5: RTL & Dynamic SEO (Span 1 Column) */}
          <div className="luxury-card group rounded-2xl p-6 lg:p-8 flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-900/30 text-purple-300">
                <SearchCheck className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-serif-luxury text-2xl font-bold text-[#fdfbf7]">
                05. Automatic RTL & Hreflang SEO
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#ebdcc9]/80">
                Flips document direction to <code className="text-purple-300 font-mono text-xs">dir="rtl"</code> when Arabic or Hebrew are chosen, and dynamically syncs <code className="text-purple-300 font-mono text-xs">&lt;link rel="alternate" hreflang&gt;</code> tags for global search engines.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between rounded-xl border border-[#f6efe2]/10 bg-[#14030d] p-3.5 text-xs text-[#ebdcc9]">
              <span className="flex items-center gap-2">
                <Compass className="h-4 w-4 text-purple-400" />
                <span>SEO Engine Optimized</span>
              </span>
              <span className="rounded bg-emerald-950/70 border border-emerald-500/30 px-2 py-0.5 font-mono-code text-[10px] text-emerald-300">
                100% Crawlable
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
