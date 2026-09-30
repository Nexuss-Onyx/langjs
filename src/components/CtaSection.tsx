import React, { useState } from 'react';
import { Sparkles, Terminal, Copy, Check, ArrowRight, ShieldCheck } from 'lucide-react';

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
    navigator.clipboard.writeText('npm i langjs');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden py-24 bg-[#090205]">
      {/* Background glow arch */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-gradient-to-t from-[#9e1b32]/30 via-[#4a0d24]/20 to-transparent blur-[120px]" />

      <div className="relative mx-auto max-w-5xl px-6 lg:px-12">
        <div className="relative overflow-hidden rounded-3xl border border-[#f6efe2]/20 bg-gradient-to-b from-[#250817] to-[#12030b] p-8 text-center shadow-2xl backdrop-blur-2xl sm:p-14 lg:p-16">
          {/* Subtle top ambient ring */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-96 rounded-full bg-[#be185d]/30 blur-2xl" />

          <div className="inline-flex items-center gap-2 rounded-full border border-[#f6efe2]/15 bg-[#19040f] px-3.5 py-1 text-xs font-semibold text-[#ebdcc9]">
            <Sparkles className="h-3.5 w-3.5 text-[#e11d48]" />
            <span>Developer Early Access & Documentation</span>
          </div>

          <h2 className="mt-6 font-serif-luxury text-3xl font-bold tracking-tight text-[#fdfbf7] sm:text-5xl lg:text-6xl">
            Localize Any Website <br />
            <span className="italic text-[#be185d]">in Less Than 60 Seconds</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm sm:text-base leading-relaxed text-[#ebdcc9]/85">
            Zero rewrite of your templates. Automatic text crawler, instant Google Translate engine, and complete freedom with custom JSON overrides.
          </p>

          {/* Email Newsletter / Waitlist form */}
          <div className="mx-auto mt-10 max-w-md">
            {isSubscribed ? (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-4 text-xs font-semibold text-emerald-300 flex items-center justify-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                <span>You are on the priority developer list! Check your inbox for API keys.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 sm:flex-row">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email..."
                  className="flex-1 rounded-xl border border-[#f6efe2]/20 bg-[#0c0207] px-4 py-3 text-xs text-[#fdfbf7] placeholder:text-[#ebdcc9]/50 focus:border-[#be185d] focus:outline-none"
                />
                <button
                  type="submit"
                  className="luxury-button-primary flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs font-semibold text-white transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
                >
                  <span>Request Starter Key</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </form>
            )}
          </div>

          {/* Quick CLI pill */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-mono-code text-[#ebdcc9]/70">
            <div className="flex items-center gap-2 rounded-lg border border-[#f6efe2]/10 bg-[#0e0208] px-3 py-1.5">
              <Terminal className="h-3.5 w-3.5 text-[#e11d48]" />
              <span>npm i langjs</span>
              <button
                onClick={copyQuick}
                className="ml-1 text-[#ebdcc9]/60 hover:text-white"
                title="Copy command"
              >
                {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
              </button>
            </div>
            <span>·</span>
            <button
              onClick={onOpenEarlyAccess}
              className="text-[#ebdcc9] underline underline-offset-4 hover:text-white"
            >
              Read Quickstart Guide →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
