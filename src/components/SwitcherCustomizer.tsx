import React, { useState } from 'react';
import { Palette, Copy, Check, Sparkles, Globe, ChevronDown } from 'lucide-react';
import { LANGUAGES, SupportedLanguage } from '../data/translations';

export const SwitcherCustomizer: React.FC = () => {
  const [stylePreset, setStylePreset] = useState<'burgundy' | 'cream' | 'floating' | 'minimal'>('burgundy');
  const [showFlags, setShowFlags] = useState(true);
  const [showNativeNames, setShowNativeNames] = useState(true);
  const [demoActiveLang, setDemoActiveLang] = useState<SupportedLanguage>('en');
  const [copied, setCopied] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const activeLangObj = LANGUAGES.find((l) => l.code === demoActiveLang) || LANGUAGES[0];

  const generateSnippet = () => {
    if (stylePreset === 'burgundy') {
      return `<!-- Burgundy Luxury Switcher -->
<button class="langjs-burgundy-btn" onclick="lang.toggle()">
  ${showFlags ? '<span class="flag">🇬🇧</span>' : ''}
  <span>${showNativeNames ? 'English' : 'EN'}</span>
</button>

<style>
.langjs-burgundy-btn {
  background: linear-gradient(135deg, #a81c3b, #780d27);
  color: #fdfbf7;
  border: 1px solid rgba(255,255,255,0.15);
  padding: 8px 16px;
  border-radius: 10px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(168,28,59,0.3);
}
</style>`;
    }

    if (stylePreset === 'cream') {
      return `<!-- Minimal Cream Switcher -->
<button class="langjs-cream-btn" onclick="lang.toggle()">
  ${showFlags ? '<span class="flag">🇬🇧</span>' : ''}
  <span>${showNativeNames ? 'English' : 'EN'}</span>
</button>

<style>
.langjs-cream-btn {
  background: #fdfbf7;
  color: #1a040b;
  border: 1px solid #ebdcc9;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
</style>`;
    }

    if (stylePreset === 'floating') {
      return `<!-- Floating Glass Widget -->
<div id="langjs-widget" class="langjs-floating"></div>

<script>
  lang.mount('#langjs-widget', {
    position: 'bottom-right',
    theme: 'dark-burgundy-glass'
  });
</script>`;
    }

    return `<!-- Clean Text Trigger -->
<a href="javascript:void(0)" class="langjs-text-link" onclick="lang.toggle()">
  ${showFlags ? '🇬🇧 ' : ''}${showNativeNames ? 'English' : 'EN'} / Español
</a>`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateSnippet());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="overrides" className="relative scroll-mt-24 py-24 bg-[#090205]">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#f6efe2]/15 bg-[#1f0712] px-3.5 py-1 text-xs font-semibold text-[#ebdcc9]">
            <Palette className="h-3.5 w-3.5 text-[#e11d48]" />
            <span>Interactive Switcher Customizer</span>
          </div>
          <h2 className="mt-4 font-serif-luxury text-3xl font-bold tracking-tight text-[#fdfbf7] sm:text-5xl">
            Style Your Switcher with a Few Lines
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[#ebdcc9]/80">
            Design the translation trigger to match your exact brand aesthetic. Choose a preset or copy the vanilla CSS/JS snippet.
          </p>
        </div>

        {/* Customizer Workbench */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Controls Column */}
          <div className="space-y-6 lg:col-span-5">
            <div className="luxury-card rounded-2xl p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#cbb89e]">
                1. Select Design Preset
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => setStylePreset('burgundy')}
                  className={`rounded-xl border p-3 text-left transition-all ${
                    stylePreset === 'burgundy'
                      ? 'border-[#e11d48] bg-[#3b0b1c]/70 text-[#fdfbf7] shadow-lg'
                      : 'border-[#f6efe2]/10 bg-[#16040d] text-[#ebdcc9]/80 hover:border-[#be185d]/40'
                  }`}
                >
                  <div className="text-xs font-bold">Burgundy Velvet</div>
                  <div className="text-[11px] text-[#ebdcc9]/60">Luxury Dark Ruby</div>
                </button>

                <button
                  onClick={() => setStylePreset('cream')}
                  className={`rounded-xl border p-3 text-left transition-all ${
                    stylePreset === 'cream'
                      ? 'border-[#e11d48] bg-[#3b0b1c]/70 text-[#fdfbf7] shadow-lg'
                      : 'border-[#f6efe2]/10 bg-[#16040d] text-[#ebdcc9]/80 hover:border-[#be185d]/40'
                  }`}
                >
                  <div className="text-xs font-bold">Ivory Cream</div>
                  <div className="text-[11px] text-[#ebdcc9]/60">Clean Light Contrast</div>
                </button>

                <button
                  onClick={() => setStylePreset('floating')}
                  className={`rounded-xl border p-3 text-left transition-all ${
                    stylePreset === 'floating'
                      ? 'border-[#e11d48] bg-[#3b0b1c]/70 text-[#fdfbf7] shadow-lg'
                      : 'border-[#f6efe2]/10 bg-[#16040d] text-[#ebdcc9]/80 hover:border-[#be185d]/40'
                  }`}
                >
                  <div className="text-xs font-bold">Floating Glass</div>
                  <div className="text-[11px] text-[#ebdcc9]/60">Corner Auto-Widget</div>
                </button>

                <button
                  onClick={() => setStylePreset('minimal')}
                  className={`rounded-xl border p-3 text-left transition-all ${
                    stylePreset === 'minimal'
                      ? 'border-[#e11d48] bg-[#3b0b1c]/70 text-[#fdfbf7] shadow-lg'
                      : 'border-[#f6efe2]/10 bg-[#16040d] text-[#ebdcc9]/80 hover:border-[#be185d]/40'
                  }`}
                >
                  <div className="text-xs font-bold">Minimal Text Link</div>
                  <div className="text-[11px] text-[#ebdcc9]/60">Understated Anchor</div>
                </button>
              </div>

              <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-[#cbb89e]">
                2. Display Options
              </h3>
              <div className="mt-3 space-y-2">
                <label className="flex items-center gap-3 text-xs text-[#ebdcc9] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showFlags}
                    onChange={(e) => setShowFlags(e.target.checked)}
                    className="rounded border-[#f6efe2]/20 bg-[#090205] text-[#be185d] focus:ring-0"
                  />
                  <span>Show Country Flag Emojis</span>
                </label>

                <label className="flex items-center gap-3 text-xs text-[#ebdcc9] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showNativeNames}
                    onChange={(e) => setShowNativeNames(e.target.checked)}
                    className="rounded border-[#f6efe2]/20 bg-[#090205] text-[#be185d] focus:ring-0"
                  />
                  <span>Show Full Native Language Names (e.g. Français vs FR)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Live Preview & Code Column */}
          <div className="space-y-6 lg:col-span-7">
            {/* Live Interactive Preview Box */}
            <div className="luxury-card rounded-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-[#f6efe2]/10 pb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#ebdcc9]/80">
                  Live Interactive Button Sandbox
                </span>
                <span className="font-mono-code text-[11px] text-emerald-400">
                  Active State: {activeLangObj.name}
                </span>
              </div>

              {/* Centered Preview Canvas */}
              <div className="mt-8 flex min-h-[160px] items-center justify-center rounded-xl border border-dashed border-[#f6efe2]/15 bg-[#0e0208] p-8">
                {stylePreset === 'burgundy' && (
                  <div className="relative">
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="luxury-button-primary flex items-center gap-2.5 rounded-xl px-5 py-2.5 text-xs font-semibold text-white transition-all hover:scale-105 active:scale-95"
                    >
                      {showFlags && <span className="text-base">{activeLangObj.flag}</span>}
                      <span>{showNativeNames ? activeLangObj.nativeName : activeLangObj.code.toUpperCase()}</span>
                      <ChevronDown className="h-3.5 w-3.5 text-rose-200" />
                    </button>

                    {dropdownOpen && (
                      <div className="absolute top-full mt-2 w-44 rounded-xl border border-[#f6efe2]/15 bg-[#17040e] p-1 shadow-2xl z-20">
                        {LANGUAGES.map((l) => (
                          <button
                            key={l.code}
                            onClick={() => {
                              setDemoActiveLang(l.code);
                              setDropdownOpen(false);
                            }}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-[#ebdcc9] hover:bg-[#340b1e] hover:text-white"
                          >
                            <span>{l.flag}</span>
                            <span>{l.nativeName}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {stylePreset === 'cream' && (
                  <button
                    onClick={() => {
                      const next = demoActiveLang === 'en' ? 'es' : 'en';
                      setDemoActiveLang(next);
                    }}
                    className="luxury-button-cream flex items-center gap-2.5 rounded-lg px-5 py-2.5 text-xs font-semibold transition-all hover:scale-105"
                  >
                    {showFlags && <span className="text-base">{activeLangObj.flag}</span>}
                    <span>{showNativeNames ? activeLangObj.nativeName : activeLangObj.code.toUpperCase()}</span>
                  </button>
                )}

                {stylePreset === 'floating' && (
                  <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-gradient-to-r from-[#2c0916]/90 to-[#19040c]/90 px-4 py-2.5 text-xs text-white shadow-2xl backdrop-blur-xl">
                    <Globe className="h-4 w-4 text-[#e11d48]" />
                    <span className="font-semibold">{activeLangObj.nativeName}</span>
                    <span className="text-rose-400">·</span>
                    <button
                      onClick={() => setDemoActiveLang(demoActiveLang === 'en' ? 'ja' : 'en')}
                      className="rounded bg-[#9e1b32] px-2 py-0.5 text-[10px] font-bold text-white hover:bg-rose-600"
                    >
                      Toggle
                    </button>
                  </div>
                )}

                {stylePreset === 'minimal' && (
                  <button
                    onClick={() => setDemoActiveLang(demoActiveLang === 'en' ? 'fr' : 'en')}
                    className="text-xs font-medium text-[#ebdcc9] underline decoration-[#e11d48] decoration-2 underline-offset-4 transition-colors hover:text-white"
                  >
                    {showFlags && `${activeLangObj.flag} `}
                    {showNativeNames ? `${activeLangObj.nativeName} / Switch` : `${activeLangObj.code.toUpperCase()} / Toggle`}
                  </button>
                )}
              </div>

              <p className="mt-3 text-center text-xs text-[#ebdcc9]/60">
                Click the button above to test real-time state changes.
              </p>
            </div>

            {/* Generated Code Snippet */}
            <div className="luxury-card rounded-2xl p-6">
              <div className="flex items-center justify-between border-b border-[#f6efe2]/10 pb-3">
                <span className="font-mono-code text-xs text-[#ebdcc9]/80">
                  Generated Snippet (HTML + CSS)
                </span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 rounded-lg border border-[#f6efe2]/15 bg-[#230815] px-3 py-1 text-xs text-[#ebdcc9] transition-all hover:border-[#be185d] hover:text-white"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Snippet'}</span>
                </button>
              </div>

              <div className="mt-4 overflow-x-auto rounded-xl bg-[#090205] p-4">
                <pre className="font-mono-code text-xs leading-relaxed text-rose-200/90">
                  <code>{generateSnippet()}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
