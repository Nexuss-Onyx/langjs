import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, Copy, Check, ArrowRight, ShieldCheck, Terminal } from 'lucide-react';

interface EarlyAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EarlyAccessModal: React.FC<EarlyAccessModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [framework, setFramework] = useState('vanilla');
  const [submitted, setSubmitted] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  if (!isOpen) return null;

  const mockApiKey = 'ljs_live_9b8f2c7a4e1d9023_free_tier';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubmitted(true);
    }
  };

  const copyKey = () => {
    navigator.clipboard.writeText(mockApiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-2xl border border-[#f6efe2]/20 bg-[#16040d] p-6 shadow-2xl sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rounded-lg border border-[#f6efe2]/10 bg-[#250817] p-1.5 text-[#ebdcc9] hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        {!submitted ? (
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#f6efe2]/15 bg-[#250817] px-3 py-1 text-xs font-semibold text-[#ebdcc9]">
              <Sparkles className="h-3 w-3 text-[#e11d48]" />
              <span>Developer Starter Access</span>
            </div>

            <h3 className="mt-3 font-serif-luxury text-2xl font-bold text-[#fdfbf7]">
              Get Your Free Langjs Starter Key
            </h3>

            <p className="mt-2 text-xs sm:text-sm text-[#ebdcc9]/80 leading-relaxed">
              Receive immediate CDN credentials and early access to the custom locale cloud sync dashboard.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#ebdcc9] mb-1">
                  Your Developer Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full rounded-xl border border-[#f6efe2]/15 bg-[#0a0206] px-3.5 py-2.5 text-xs text-[#fdfbf7] placeholder:text-[#ebdcc9]/40 focus:border-[#be185d] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#ebdcc9] mb-1">
                  Primary Tech Stack
                </label>
                <select
                  value={framework}
                  onChange={(e) => setFramework(e.target.value)}
                  className="w-full rounded-xl border border-[#f6efe2]/15 bg-[#0a0206] px-3.5 py-2.5 text-xs text-[#fdfbf7] focus:border-[#be185d] focus:outline-none"
                >
                  <option value="vanilla">Vanilla HTML / Static Site (Astro, Hugo, 11ty)</option>
                  <option value="react">React / Next.js</option>
                  <option value="vue">Vue / Nuxt</option>
                  <option value="wordpress">WordPress / Webflow / Shopify</option>
                  <option value="other">Other Framework</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="luxury-button-primary w-full flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-semibold text-white transition-transform hover:scale-[1.02]"
                >
                  <span>Generate Free Credentials</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400">
              <CheckCircle2 className="h-6 w-6" />
            </div>

            <h3 className="mt-4 font-serif-luxury text-2xl font-bold text-[#fdfbf7]">
              Credentials Generated!
            </h3>

            <p className="mt-2 text-xs text-[#ebdcc9]/80">
              Your free developer tier token is ready. Include it in your script initialization:
            </p>

            <div className="mt-5 rounded-xl border border-[#f6efe2]/15 bg-[#090205] p-3 text-left font-mono-code text-xs">
              <div className="flex items-center justify-between text-[#ebdcc9]/60 pb-1 border-b border-[#f6efe2]/10 text-[10px]">
                <span>API TOKEN</span>
                <button
                  onClick={copyKey}
                  className="flex items-center gap-1 text-rose-300 hover:text-white"
                >
                  {copiedKey ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  <span>{copiedKey ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <div className="mt-2 text-rose-200 select-all truncate">
                {mockApiKey}
              </div>
            </div>

            <div className="mt-4 text-[11px] text-[#ebdcc9]/60 flex items-center justify-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Full documentation & starter kit emailed to {email}</span>
            </div>

            <button
              onClick={onClose}
              className="mt-6 luxury-card w-full rounded-xl py-2.5 text-xs font-semibold text-[#fdfbf7] hover:bg-[#2c0919]"
            >
              Close & Start Building
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
