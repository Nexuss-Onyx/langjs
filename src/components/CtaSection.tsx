import React, { useState } from 'react';
import { Terminal, Copy, Check, ArrowRight, BookOpen } from 'lucide-react';

interface CtaSectionProps {
  onNavigateToDocs: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onNavigateToDocs }) => {
  const [copied, setCopied] = useState(false);

  const copyQuick = () => {
    navigator.clipboard.writeText('npm install @nexuss0781/langjs');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-12">
        <div className="relative overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-8 text-center shadow-xl sm:p-14 lg:p-16">
          <div className="text-xs font-mono-code text-[#9e1b32] uppercase tracking-wider font-semibold">
            Ready to Localize
          </div>

          <h2 className="mt-4 font-serif-luxury text-3xl font-bold tracking-tight text-[var(--text-hero)] sm:text-5xl lg:text-6xl">
            Start Localizing Any Website <br />
            <span className="text-[#9e1b32]">with Langjs Today</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
            Zero rewrite of your templates. Automatic text crawler, instant Google Translate engine, and complete freedom with custom JSON overrides.
          </p>

          {/* Action Buttons: Prominent Burgundy View Documentation + Copy */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onNavigateToDocs}
              className="w-full sm:w-auto luxury-button-primary flex items-center justify-center gap-2 rounded-xl px-8 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.02]"
            >
              <BookOpen className="h-4 w-4" />
              <span>View Documentation</span>
              <ArrowRight className="h-4 w-4 opacity-80" />
            </button>

            <button
              onClick={copyQuick}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-[rgba(75,50,30,0.2)] bg-[#1e1713] px-6 py-3 text-xs font-mono-code text-[#f5ede1] hover:border-[#9e1b32] transition-colors shadow-xs"
            >
              <Terminal className="h-3.5 w-3.5 text-rose-400" />
              <code>npm i @nexuss0781/langjs</code>
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400 ml-1" /> : <Copy className="h-3.5 w-3.5 text-[#d8cab7]/70 ml-1" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
