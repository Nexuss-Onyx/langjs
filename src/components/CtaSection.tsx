import React, { useState } from 'react';
import { Terminal, Copy, Check, ArrowRight, ShieldCheck } from 'lucide-react';

interface CtaSectionProps {
  onOpenEarlyAccess: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenEarlyAccess }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubscribed(true);
    }
  };

  const copyQuick = () => {
    navigator.clipboard.writeText('npm i @nexuss0781/langjs');
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
            Localize Any Website <br />
            <span className="text-[#be185d]">in Less Than 60 Seconds</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-[#ebdcc9]/80">
            Zero rewrite of your templates. Automatic text crawler, instant Google Translate engine, and complete freedom with custom JSON overrides.
          </p>

          {/* Email Newsletter / Waitlist form */}
          <div className="mx-auto mt-8 max-w-md">
            {isSubscribed ? (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-4 text-xs font-semibold text-emerald-300 flex items-center justify-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                <span>You are on the priority developer list.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email..."
                  required
                  className="flex-1 rounded-xl border border-[#f6efe2]/15 bg-[#090205] px-4 py-3 text-xs text-[#fdfbf7] placeholder:text-[#ebdcc9]/40 focus:border-[#be185d] focus:outline-none"
                />
                <button
                  type="submit"
                  className="luxury-button-primary flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-xs font-semibold text-[#fdfbf7] transition-all hover:scale-[1.02]"
                >
                  <span>Get Started</span>
                  <ArrowRight className="h-4 w-4 opacity-70" />
                </button>
              </form>
            )}
          </div>

          {/* Quick Copy Terminal Link */}
          <div className="mt-8 flex items-center justify-center gap-2 text-xs font-mono-code text-[#ebdcc9]/60">
            <span>Terminal:</span>
            <button
              onClick={copyQuick}
              className="flex items-center gap-1.5 rounded-lg border border-[#f6efe2]/10 bg-[#090205] px-3 py-1 text-[11px] text-rose-200 hover:border-[#be185d] transition-colors"
            >
              <Terminal className="h-3 w-3 text-rose-400" />
              <code>npm i @nexuss0781/langjs</code>
              {copied ? <Check className="h-3 w-3 text-emerald-400 ml-1" /> : <Copy className="h-3 w-3 text-[#ebdcc9]/60 ml-1" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
