import React from 'react';
import { Check, X, Zap, Shield, Clock, TrendingUp } from 'lucide-react';

export const PerformanceComparison: React.FC = () => {
  const comparisonData = [
    {
      feature: 'Setup & Implementation Time',
      traditional: '2–4 weeks (extracting keys manually, wrapping every string)',
      langjs: '1 minute (drop in 1 script tag or npm import)',
      highlight: true,
    },
    {
      feature: 'Source Code Modification',
      traditional: 'Requires refactoring all JSX/HTML files with t() keys',
      langjs: 'Zero modifications (TreeWalker crawls rendered DOM directly)',
      highlight: false,
    },
    {
      feature: 'Machine + Human Hybrid Workflow',
      traditional: 'Requires separate translation management system (TMS)',
      langjs: 'Google Translate Neural API + simple local JSON overrides',
      highlight: true,
    },
    {
      feature: 'Client Bundle Impact',
      traditional: '45KB – 120KB (heavy dictionaries loaded on init)',
      langjs: '< 0.8KB core runtime (async dynamic chunking)',
      highlight: true,
    },
    {
      feature: 'Handling Dynamic & Third-Party Text',
      traditional: 'Fails unless manually mapped in key registries',
      langjs: 'Automatic MutationObserver catches dynamic DOM updates',
      highlight: false,
    },
    {
      feature: 'RTL & Script Styling Adaptation',
      traditional: 'Manual CSS conditional classes and direction wrappers',
      langjs: 'Automatic document dir="rtl" & font pairing switcher',
      highlight: false,
    },
  ];

  return (
    <section id="benchmarks" className="relative scroll-mt-24 py-24 bg-[#090205]">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#f6efe2]/15 bg-[#1f0712] px-3.5 py-1 text-xs font-semibold text-[#ebdcc9]">
            <TrendingUp className="h-3.5 w-3.5 text-[#e11d48]" />
            <span>Quantitative Comparison</span>
          </div>
          <h2 className="mt-4 font-serif-luxury text-3xl font-bold tracking-tight text-[#fdfbf7] sm:text-5xl">
            Why Modern Teams Migrate to Langjs
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[#ebdcc9]/80">
            Eliminate weeks of painful key extraction and broken localization pipelines with a real-time DOM localization engine.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="mt-14 overflow-hidden rounded-2xl border border-[#f6efe2]/15 bg-[#14040d] shadow-2xl backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#f6efe2]/10 bg-[#1e0714]">
                  <th className="py-4.5 px-6 font-semibold text-[#fdfbf7]">Capability / Metric</th>
                  <th className="py-4.5 px-6 font-semibold text-[#ebdcc9]/60">Traditional i18n Libraries</th>
                  <th className="py-4.5 px-6 font-semibold text-[#e11d48]">Langjs Engine</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f6efe2]/5">
                {comparisonData.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`transition-colors hover:bg-[#200816]/50 ${
                      row.highlight ? 'bg-[#1b0612]/30' : ''
                    }`}
                  >
                    <td className="py-4 px-6 font-medium text-[#fdfbf7]">
                      {row.feature}
                    </td>
                    <td className="py-4 px-6 text-[#ebdcc9]/70">
                      <div className="flex items-start gap-2">
                        <X className="mt-0.5 h-4 w-4 shrink-0 text-rose-500/70" />
                        <span>{row.traditional}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-medium text-emerald-200">
                      <div className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        <span>{row.langjs}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3 Value Pillars */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="luxury-card rounded-2xl p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#9e1b32]/30 text-[#e11d48]">
              <Clock className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-serif-luxury text-xl font-bold text-[#fdfbf7]">
              98% Reduction in Dev Time
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-[#ebdcc9]/75">
              Launch multilingual support in a single afternoon rather than spending entire sprint cycles refactoring codebase strings.
            </p>
          </div>

          <div className="luxury-card rounded-2xl p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-900/30 text-amber-300">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-serif-luxury text-xl font-bold text-[#fdfbf7]">
              Sub-Millisecond Edge Swapping
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-[#ebdcc9]/75">
              Instant in-memory DOM text node mutation with 0 cumulative layout shift and lightning-fast client hydration.
            </p>
          </div>

          <div className="luxury-card rounded-2xl p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#be185d]/30 text-rose-300">
              <Shield className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-serif-luxury text-xl font-bold text-[#fdfbf7]">
              Zero Vendor Lock-In
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-[#ebdcc9]/75">
              All custom copy lives in standard open JSON files in your repository. Export, edit, or commit them whenever you want.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
