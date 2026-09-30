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
    <section id="benchmarks" className="relative scroll-mt-24 py-20 lg:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-mono-code text-[#9e1b32] uppercase tracking-wider font-semibold">
            Quantitative Comparison
          </div>
          <h2 className="mt-3 font-serif-luxury text-3xl font-bold tracking-tight text-[var(--text-hero)] sm:text-5xl">
            Why Modern Teams Migrate to Langjs
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-[var(--text-secondary)]">
            Eliminate weeks of painful key extraction and broken localization pipelines with a client-side DOM localization engine.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[var(--border-color)] bg-[var(--bg-elevated)]">
                  <th className="py-4 px-6 font-semibold text-[var(--text-hero)]">Capability / Metric</th>
                  <th className="py-4 px-6 font-semibold text-[var(--text-muted)]">Traditional i18n Libraries</th>
                  <th className="py-4 px-6 font-semibold text-[#9e1b32]">Langjs Engine</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)]">
                {comparisonData.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`transition-colors hover:bg-[var(--bg-card-hover)] ${
                      row.highlight ? 'bg-[#9e1b32]/5' : ''
                    }`}
                  >
                    <td className="py-4 px-6 font-medium text-[var(--text-hero)]">
                      {row.feature}
                    </td>
                    <td className="py-4 px-6 text-[var(--text-secondary)]">
                      <div className="flex items-start gap-2">
                        <X className="h-4 w-4 text-rose-500/80 shrink-0 mt-0.5" />
                        <span>{row.traditional}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-[var(--text-hero)] font-medium">
                      <div className="flex items-start gap-2 text-emerald-800">
                        <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="font-semibold">{row.langjs}</span>
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
