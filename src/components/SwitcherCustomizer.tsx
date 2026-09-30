import React, { useState } from 'react';
import { Copy, Check, Globe, ChevronDown } from 'lucide-react';
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
  background: linear-gradient(135deg, #9e1b32, #6e1022);
  color: #ffffff;
  border: 1px solid rgba(255,255,255,0.15);
  padding: 8px 16px;
  border-radius: 10px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(158,27,50,0.3);
}
</style>`;
    }

    if (stylePreset === 'cream') {
      return `<!-- Warm Ivory Cream Switcher -->
<button class="langjs-cream-btn" onclick="lang.toggle()">
  ${showFlags ? '<span class="flag">🇬🇧</span>' : ''}
  <span>${showNativeNames ? 'English' : 'EN'}</span>
</button>

<style>
.langjs-cream-btn {
  background: #f8f3eb;
  color: #1a130e;
  border: 1px solid rgba(75,50,30,0.2);
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
    theme: 'burgundy-luxury'
  });
</script>`;
    }

    return `<!-- Minimal Text Anchor -->
<a href="#" class="langjs-link" onclick="lang.toggle(); return false;">
  ${showFlags ? '🇬🇧 ' : ''}${showNativeNames ? 'English' : 'EN'} / Switch
</a>`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateSnippet());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative py-20 lg:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-mono-code text-[#9e1b32] uppercase tracking-wider font-semibold">
            Component Customizer
          </div>
          <h2 className="mt-3 font-serif-luxury text-3xl font-bold tracking-tight text-[var(--text-hero)] sm:text-5xl">
            Custom Switcher Components
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-[var(--text-secondary)]">
            Design translation triggers to match your exact brand aesthetic. Choose a preset or copy the standalone HTML/CSS snippet.
          </p>
        </div>

        {/* Customizer Workbench */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Controls Column */}
          <div className="space-y-6 lg:col-span-5">
            <div className="luxury-card rounded-2xl p-6 shadow-xs">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                1. Select Design Preset
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => setStylePreset('burgundy')}
                  className={`rounded-xl border p-3 text-left transition-all ${
                    stylePreset === 'burgundy'
                      ? 'border-[#9e1b32] bg-[#9e1b32]/10 text-[var(--text-hero)] shadow-xs ring-1 ring-[#9e1b32]'
                      : 'border-[var(--border-color)] bg-[var(--bg-card-hover)] text-[var(--text-primary)] hover:border-[#9e1b32]/40'
                  }`}
                >
                  <div className="text-xs font-bold">Burgundy Velvet</div>
                  <div className="text-[11px] text-[var(--text-muted)]">Luxury Rich Ruby</div>
                </button>

                <button
                  onClick={() => setStylePreset('cream')}
                  className={`rounded-xl border p-3 text-left transition-all ${
                    stylePreset === 'cream'
                      ? 'border-[#9e1b32] bg-[#9e1b32]/10 text-[var(--text-hero)] shadow-xs ring-1 ring-[#9e1b32]'
                      : 'border-[var(--border-color)] bg-[var(--bg-card-hover)] text-[var(--text-primary)] hover:border-[#9e1b32]/40'
                  }`}
                >
                  <div className="text-xs font-bold">Ivory Cream</div>
                  <div className="text-[11px] text-[var(--text-muted)]">Clean Warm Contrast</div>
                </button>

                <button
                  onClick={() => setStylePreset('floating')}
                  className={`rounded-xl border p-3 text-left transition-all ${
                    stylePreset === 'floating'
                      ? 'border-[#9e1b32] bg-[#9e1b32]/10 text-[var(--text-hero)] shadow-xs ring-1 ring-[#9e1b32]'
                      : 'border-[var(--border-color)] bg-[var(--bg-card-hover)] text-[var(--text-primary)] hover:border-[#9e1b32]/40'
                  }`}
                >
                  <div className="text-xs font-bold">Floating Glass</div>
                  <div className="text-[11px] text-[var(--text-muted)]">Corner Auto-Widget</div>
                </button>

                <button
                  onClick={() => setStylePreset('minimal')}
                  className={`rounded-xl border p-3 text-left transition-all ${
                    stylePreset === 'minimal'
                      ? 'border-[#9e1b32] bg-[#9e1b32]/10 text-[var(--text-hero)] shadow-xs ring-1 ring-[#9e1b32]'
                      : 'border-[var(--border-color)] bg-[var(--bg-card-hover)] text-[var(--text-primary)] hover:border-[#9e1b32]/40'
                  }`}
                >
                  <div className="text-xs font-bold">Minimal Text Link</div>
                  <div className="text-[11px] text-[var(--text-muted)]">Understated Anchor</div>
                </button>
              </div>

              <h3 className="mt-6 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                2. Display Options
              </h3>
              <div className="mt-3 space-y-2">
                <label className="flex items-center gap-3 text-xs text-[var(--text-primary)] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showFlags}
                    onChange={(e) => setShowFlags(e.target.checked)}
                    className="rounded border-[var(--border-color)] text-[#9e1b32] focus:ring-0"
                  />
                  <span>Show Country Flag Emojis</span>
                </label>

                <label className="flex items-center gap-3 text-xs text-[var(--text-primary)] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showNativeNames}
                    onChange={(e) => setShowNativeNames(e.target.checked)}
                    className="rounded border-[var(--border-color)] text-[#9e1b32] focus:ring-0"
                  />
                  <span>Show Full Native Language Names (e.g. Français vs FR)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Live Preview & Code Column */}
          <div className="space-y-6 lg:col-span-7">
            {/* Live Interactive Preview Box */}
            <div className="luxury-card rounded-2xl p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                  Live Interactive Button Sandbox
                </span>
                <span className="font-mono-code text-[11px] text-[#9e1b32]">
                  Active: {activeLangObj.name}
                </span>
              </div>

              {/* Centered Preview Canvas */}
              <div className="mt-8 flex min-h-[160px] items-center justify-center rounded-xl border border-dashed border-[var(--border-color)] bg-[var(--bg-card-hover)] p-8">
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
                      <div className="absolute top-full mt-2 w-44 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-1 shadow-2xl z-20">
                        {LANGUAGES.map((l) => (
                          <button
                            key={l.code}
                            onClick={() => {
                              setDemoActiveLang(l.code);
                              setDropdownOpen(false);
                            }}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-[var(--text-primary)] hover:bg-[#9e1b32]/10 hover:text-[#9e1b32]"
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
                    className="flex items-center gap-2.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] px-5 py-2.5 text-xs font-semibold text-[var(--text-hero)] shadow-xs transition-all hover:border-[#9e1b32] hover:scale-105"
                  >
                    {showFlags && <span className="text-base">{activeLangObj.flag}</span>}
                    <span>{showNativeNames ? activeLangObj.nativeName : activeLangObj.code.toUpperCase()}</span>
                  </button>
                )}

                {stylePreset === 'floating' && (
                  <div className="flex items-center gap-3 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] px-4 py-2.5 text-xs text-[var(--text-hero)] shadow-xl">
                    <Globe className="h-4 w-4 text-[#9e1b32]" />
                    <span className="font-semibold">{activeLangObj.nativeName}</span>
                    <span className="text-[var(--text-muted)]">·</span>
                    <button
                      onClick={() => setDemoActiveLang(demoActiveLang === 'en' ? 'ja' : 'en')}
                      className="rounded luxury-button-primary px-2 py-0.5 text-[10px] font-bold text-white"
                    >
                      Toggle
                    </button>
                  </div>
                )}

                {stylePreset === 'minimal' && (
                  <button
                    onClick={() => setDemoActiveLang(demoActiveLang === 'en' ? 'fr' : 'en')}
                    className="text-xs font-medium text-[var(--text-hero)] underline decoration-[#9e1b32] decoration-2 underline-offset-4 transition-colors hover:text-[#9e1b32]"
                  >
                    {showFlags && `${activeLangObj.flag} `}
                    {showNativeNames ? `${activeLangObj.nativeName} / Switch` : `${activeLangObj.code.toUpperCase()} / Toggle`}
                  </button>
                )}
              </div>

              <p className="mt-3 text-center text-xs text-[var(--text-muted)]">
                Click the button above to test real-time state changes.
              </p>
            </div>

            {/* Generated Code Snippet */}
            <div className="luxury-card rounded-2xl p-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
                <span className="font-mono-code text-xs text-[var(--text-secondary)] font-medium">
                  Generated Snippet (HTML + CSS)
                </span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-hover)] px-3 py-1 text-xs text-[var(--text-primary)] transition-all hover:border-[#9e1b32] hover:text-[#9e1b32]"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Snippet'}</span>
                </button>
              </div>

              <div className="mt-4 overflow-x-auto rounded-xl bg-[#1e1713] p-4 border border-[rgba(75,50,30,0.15)] shadow-xs">
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
