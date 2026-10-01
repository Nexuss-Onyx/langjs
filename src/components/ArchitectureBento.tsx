import React, { useState } from 'react';
import { Cpu, FileJson, Layers, Compass, Check, Copy } from 'lucide-react';
import bentoNeuralImg from '../assets/images/bento_dom_neural_network_1790761611142.jpg';

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
    <section id="architecture" className="relative scroll-mt-24 py-20 lg:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-mono-code text-[#9e1b32] uppercase tracking-wider font-semibold">
            Architecture & Principles
          </div>
          <h2 className="mt-3 font-serif-luxury text-3xl font-bold tracking-tight text-[var(--text-hero)] sm:text-5xl">
            Engineered for Zero-Friction Localization
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
            A surgical full-stack framework combining client-side DOM TreeWalker crawling with server-side AST template scanning, .langignore rules, and universal HTML post-render stream interception.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {/* Bento Card 1: Visual DOM TreeWalker (Span 2 Columns) */}
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 lg:col-span-2 lg:p-8 shadow-xs">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#9e1b32]/10 text-[#9e1b32]">
                  <Cpu className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-serif-luxury text-2xl font-bold text-[var(--text-hero)]">
                  01. DOM TreeWalker & Token Classifier
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                  Langjs traverses the active document using an optimized DOM TreeWalker. It isolates all rendered text nodes, button captions, aria labels, and placeholders, tracking elements while keeping your clean HTML markup intact.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-mono-code text-[var(--text-muted)]">
                  <span>TreeWalker API</span>
                  <span>·</span>
                  <span>Deterministic Hash Keys</span>
                  <span>·</span>
                  <span className="text-[#9e1b32] font-medium">Sub-10ms Mutations</span>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-xl border border-[var(--border-color)] bg-[#1a1410] lg:col-span-5 aspect-[4/3] shadow-inner">
                <img
                  src={bentoNeuralImg}
                  alt="DOM TreeWalker Architecture"
                  className="h-full w-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1410]/90 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-center font-mono-code text-[11px] text-emerald-400 bg-[#16040d]/90 py-1.5 px-2 rounded border border-emerald-500/20 backdrop-blur-md">
                  Parsed 42 DOM Nodes in 0.4ms
                </div>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Translation Pipeline + Cache */}
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 lg:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#9e1b32]/10 text-[#9e1b32]">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-serif-luxury text-2xl font-bold text-[var(--text-hero)]">
                02. Intelligent Batch Caching
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                Batch translates all unique text tokens with deduplication and LocalStorage caching. Phrases are requested once and cached instantly on the client.
              </p>
            </div>
            
            <div className="mt-6 rounded-xl border border-[rgba(75,50,30,0.15)] bg-[#1e1713] p-3 text-xs font-mono-code shadow-xs">
              <div className="flex justify-between text-[#d8cab7]/70 pb-1 border-b border-white/10 text-[10px]">
                <span>CACHE LAYER</span>
                <span className="text-emerald-400 font-semibold">99.4% CACHE HIT</span>
              </div>
              <div className="mt-2 text-rose-200">
                &gt; Batching 14 unique tokens...<br />
                &gt; Local memory cache: HIT (0ms)<br />
                &gt; Mutated 14 DOM references
              </div>
            </div>
          </div>

          {/* Bento Card 3: Custom JSON Overrides */}
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 lg:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-900/10 text-amber-700">
                  <FileJson className="h-5 w-5" />
                </div>
                <button
                  onClick={copyJson}
                  className="flex items-center gap-1 text-[11px] font-mono-code text-[var(--text-muted)] hover:text-[var(--text-hero)]"
                >
                  {copiedSnippet ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                  <span>{copiedSnippet ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <h3 className="mt-4 font-serif-luxury text-2xl font-bold text-[var(--text-hero)]">
                03. Custom Locale JSON Overrides
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                Machine translations provide great baselines, but brand slogans demand exact precision. Provide simple JSON dictionaries to override any specific string.
              </p>
            </div>

            <div className="mt-6 overflow-x-auto rounded-xl border border-[rgba(75,50,30,0.15)] bg-[#1e1713] p-3 font-mono-code text-[11px] text-[#f5ede1] shadow-xs">
              <pre className="text-amber-200/90">{sampleJsonOverride}</pre>
            </div>
          </div>

          {/* Bento Card 4: Simple JS API */}
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 lg:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#9e1b32]/10 text-[#9e1b32]">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-serif-luxury text-2xl font-bold text-[var(--text-hero)]">
                04. Minimal JavaScript API
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                Integrate anywhere with 3 clean lines of code: import the package, create an instance, and switch language on demand.
              </p>
            </div>

            <div className="mt-6 rounded-xl border border-[rgba(75,50,30,0.15)] bg-[#1e1713] p-3 font-mono-code text-[11px] text-[#f5ede1] shadow-xs">
              <span className="text-[#e11d48]">import</span> {'{ LangJS }'} <span className="text-[#e11d48]">from</span> <span className="text-emerald-300">'@nexuss0781/langjs'</span>;<br />
              <span className="text-[#e11d48]">const</span> lang = <span className="text-[#e11d48]">new</span> LangJS();<br />
              <span className="text-[#d8cab7]/50">// Switch to Japanese:</span><br />
              <span className="text-rose-300">await</span> lang.setLanguage(<span className="text-emerald-300">'ja'</span>);
            </div>
          </div>

          {/* Bento Card 5: RTL Support */}
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 lg:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-900/10 text-purple-700">
                <Compass className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-serif-luxury text-2xl font-bold text-[var(--text-hero)]">
                05. Automatic RTL Switching
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                Automatically adjusts root document direction to <code className="text-[#9e1b32] font-mono text-xs">dir="rtl"</code> when Arabic, Hebrew, Urdu, or Persian are active.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-hover)] p-3 text-xs text-[var(--text-primary)]">
              <span className="font-mono-code text-[11px] text-[var(--text-secondary)]">
                HTML dir: 'rtl' | 'ltr'
              </span>
              <span className="text-emerald-700 font-mono-code text-[11px] font-semibold">
                Auto-Adaptive
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
