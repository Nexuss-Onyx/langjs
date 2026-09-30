import React from 'react';
import { Check, X } from 'lucide-react';

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
      langjs: 'Google Translate API + simple local JSON overrides',
      highlight: true,
    },
    {
      feature: 'Client Bundle Impact',
      traditional: '45KB – 120KB (heavy dictionaries loaded on init)',
      langjs: '< 2.8KB core runtime (zero dependencies)',
      highlight: true,
    },
    {
      feature: 'Handling Dynamic Text',
      traditional: 'Fails unless manually mapped in key registries',
      langjs: 'Automatic MutationObserver tracks dynamic DOM updates',
      highlight: false,
    },
    {
      feature: 'RTL & Script Styling Adaptation',
      traditional: 'Manual CSS conditional classes and direction wrappers',
      langjs: 'Automatic document dir="rtl" switcher',
      highlight: false,
    },
  ];

  return (
    <section id="benchmarks" className="relative scroll-mt-24 py-20 lg:py-28 bg-[#090205]">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center">
          <div className="text-xs font-mono-code text-rose-300 uppercase tracking-wider">
            Quantitative Comparison
          </div>
          <h2 className="mt-3 font-serif-luxury text-3xl font-bold tracking-tight text-[#fdfbf7] sm:text-5xl">
            Why Modern Teams Migrate to Langjs
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-[#ebdcc9]/80">
            Eliminate weeks of painful key extraction and broken localization pipelines with a client-side DOM localization engine.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-[#f6efe2]/10 bg-[#12030b] shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#f6efe2]/10 bg-[#1a0510]">
                  <th className="py-4 px-6 font-semibold text-[#fdfbf7]">Capability / Metric</th>
                  <th className="py-4 px-6 font-semibold text-[#ebdcc9]/60">Traditional i18n Libraries</th>
                  <th className="py-4 px-6 font-semibold text-rose-300">Langjs Engine</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f6efe2]/5">
                {comparisonData.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`transition-colors hover:bg-[#1c0612]/50 ${
                      row.highlight ? 'bg-[#18040f]/40' : ''
                    }`}
                  >
                    <td className="py-4 px-6 font-medium text-[#fdfbf7]">
                      {row.feature}
                    </td>
                    <td className="py-4 px-6 text-[#ebdcc9]/60">
                      <div className="flex items-start gap-2">
                        <X className="h-4 w-4 text-rose-500/70 shrink-0 mt-0.5" />
                        <span>{row.traditional}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-[#fdfbf7] font-medium">
                      <div className="flex items-start gap-2 text-emerald-300">
                        <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{row.langjs}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
