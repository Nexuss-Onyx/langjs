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
    <section className="relative overflow-hidden py-20 lg:py-28 bg-[#090205]">
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-12">
        <div className="relative overflow-hidden rounded-2xl border border-[#f6efe2]/15 bg-gradient-to-b from-[#1c0512] to-[#0e0208] p-8 text-center shadow-2xl sm:p-14 lg:p-16">
          <div className="text-xs font-mono-code text-rose-300 uppercase tracking-wider">
            Ready to Localize
          </div>

          <h2 className="mt-4 font-serif-luxury text-3xl font-bold tracking-tight text-[#fdfbf7] sm:text-5xl lg:text-6xl">
            Start Localizing Any Website <br />
            <span className="text-[#be185d]">with Langjs Today</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-[#ebdcc9]/80">
            Zero rewrite of your templates. Automatic text crawler, instant Google Translate engine, and complete freedom with custom JSON overrides.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onNavigateToDocs}
              className="w-full sm:w-auto luxury-button-primary flex items-center justify-center gap-2 rounded-xl px-8 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.02]"
            >
              <BookOpen className="h-4 w-4" />
              <span>View Documentation</span>
              <ArrowRight className="h-4 w-4 opacity-70" />
            </button>

            <button
              onClick={copyQuick}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-[#f6efe2]/15 bg-[#12030b] px-6 py-3 text-xs font-mono-code text-[#ebdcc9] hover:border-[#be185d] hover:text-white transition-colors"
            >
              <Terminal className="h-3.5 w-3.5 text-rose-400" />
              <code>npm i @nexuss0781/langjs</code>
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400 ml-1" /> : <Copy className="h-3.5 w-3.5 text-[#ebdcc9]/60 ml-1" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
