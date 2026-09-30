import React, { useState, useEffect, useRef } from 'react';
import { LangJS } from '../sdk/lang';
import { LangManifest } from '../sdk/types';
import { 
  Terminal, 
  Download, 
  Copy, 
  Check, 
  RefreshCw, 
  FileJson, 
  Cpu, 
  Globe, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Edit3, 
  Save 
} from 'lucide-react';

export const SdkWorkbench: React.FC = () => {
  const [langInstance, setLangInstance] = useState<LangJS | null>(null);
  const [activeTab, setActiveTab] = useState<'manifest' | 'nodes' | 'editor' | 'playground'>('manifest');
  const [manifest, setManifest] = useState<LangManifest | null>(null);
  const [copied, setCopied] = useState(false);
  const [targetLang, setTargetLang] = useState<string>('es');
  const [isScanning, setIsScanning] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [overrideText, setOverrideText] = useState('');
  const [overrideKey, setOverrideKey] = useState('');
  const [overrideSaved, setOverrideSaved] = useState(false);

  // Dynamic test container ref
  const sandboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sandboxRef.current) {
      const sdk = new LangJS({
        root: sandboxRef.current,
        defaultLanguage: 'en',
        languages: ['en', 'es', 'fr', 'de', 'ja', 'ar'],
        overrides: {
          es: {
            'Luxury Horology Collection': 'Colección de Alta Relojería Fina',
            'Order Bespoke Model': 'Encargar Modelo a Medida',
          },
        },
      });

      setLangInstance(sdk);
      const generated = sdk.extractDictionary();
      setManifest(generated);

      sdk.on('languageChanging', () => setIsTranslating(true));
      sdk.on('languageChanged', (e) => {
        setIsTranslating(false);
        setTargetLang(e.language);
      });

      return () => {
        sdk.destroy();
      };
    }
  }, []);

  const handleScanAndGenerate = () => {
    if (!langInstance || !sandboxRef.current) return;
    setIsScanning(true);
    setTimeout(() => {
      langInstance.scan(sandboxRef.current!);
      const generated = langInstance.extractDictionary();
      setManifest(generated);
      setIsScanning(false);
    }, 200);
  };

  const handleLanguageSwitch = async (lang: string) => {
    if (!langInstance) return;
    setTargetLang(lang);
    await langInstance.setLanguage(lang);
    const updated = langInstance.extractDictionary();
    setManifest(updated);
  };

  const handleDownloadJson = () => {
    if (langInstance) {
      langInstance.downloadJson('lang.json');
    }
  };

  const handleCopyJson = () => {
    if (manifest) {
      navigator.clipboard.writeText(JSON.stringify(manifest, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleApplyOverride = () => {
    if (!langInstance || !overrideKey || !overrideText) return;
    langInstance.override({
      [targetLang]: {
        [overrideKey]: overrideText,
      },
    });
    const updated = langInstance.extractDictionary();
    setManifest(updated);
    setOverrideSaved(true);
    setTimeout(() => setOverrideSaved(false), 2000);
  };

  return (
    <section id="sdk-workbench" className="relative scroll-mt-24 py-24 bg-[#070104]">
      {/* Background glow */}
      <div className="pointer-events-none absolute top-1/4 right-10 h-96 w-96 rounded-full bg-[#9e1b32]/15 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-10 left-10 h-80 w-80 rounded-full bg-[#be185d]/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#f6efe2]/15 bg-[#1f0712] px-3.5 py-1 text-xs font-semibold text-[#ebdcc9]">
            <Cpu className="h-3.5 w-3.5 text-[#e11d48]" />
            <span>Compiled Runtime SDK & Manifest Generator</span>
          </div>
          <h2 className="mt-4 font-serif-luxury text-3xl font-bold tracking-tight text-[#fdfbf7] sm:text-5xl">
            Live SDK Engine & Manifest Workbench
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[#ebdcc9]/80">
            The real LangJS runtime actively crawls the live DOM container below, classes every node with <code className="text-rose-300 font-mono">.langjs-node</code>, compiles <code className="text-rose-300 font-mono">lang/lang.json</code>, and hot-swaps translations.
          </p>
        </div>

        {/* Workbench Layout */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Live Monitored DOM Container */}
          <div className="space-y-6 lg:col-span-5">
            <div className="luxury-card rounded-2xl p-6 sm:p-7">
              <div className="flex items-center justify-between border-b border-[#f6efe2]/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#ebdcc9]">
                    Monitored DOM Element
                  </span>
                </div>
                <button
                  onClick={handleScanAndGenerate}
                  disabled={isScanning}
                  className="flex items-center gap-1.5 rounded-lg border border-[#f6efe2]/15 bg-[#250817] px-2.5 py-1 text-xs text-[#ebdcc9] transition-all hover:border-[#be185d] hover:text-white"
                >
                  <RefreshCw className={`h-3 w-3 ${isScanning ? 'animate-spin text-rose-400' : ''}`} />
                  <span>{isScanning ? 'Scanning...' : 'Re-crawl DOM'}</span>
                </button>
              </div>

              {/* Monitored DOM Container target for SDK */}
              <div
                ref={sandboxRef}
                className="mt-6 rounded-xl border border-[#f6efe2]/15 bg-[#12030b] p-5 space-y-4 text-[#fdfbf7]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono-code text-rose-400">
                    &lt;header&gt;
                  </span>
                  <span className="rounded bg-rose-950/60 border border-rose-500/30 px-2 py-0.5 text-[10px] text-rose-300">
                    Heritage Collection
                  </span>
                </div>

                <h3 className="font-serif-luxury text-2xl font-bold text-[#fdfbf7]">
                  Luxury Horology Collection
                </h3>

                <p className="text-xs leading-relaxed text-[#ebdcc9]/85">
                  Handmade chronometers engineered with sovereign precision and timeless burgundy velvet finishes.
                </p>

                <div className="flex items-center gap-3 pt-2">
                  <button className="luxury-button-primary rounded-lg px-4 py-2 text-xs font-semibold text-white">
                    Order Bespoke Model
                  </button>
                  <span className="text-xs text-[#ebdcc9]/60">
                    Available worldwide
                  </span>
                </div>

                <div className="pt-2">
                  <input
                    type="text"
                    placeholder="Enter bespoke referral code..."
                    className="w-full rounded-lg border border-[#f6efe2]/15 bg-[#090205] px-3 py-2 text-xs text-[#fdfbf7] placeholder:text-[#ebdcc9]/40"
                  />
                </div>
              </div>

              {/* Language Switcher Toolbar */}
              <div className="mt-6 border-t border-[#f6efe2]/10 pt-4">
                <div className="text-xs font-medium text-[#cbb89e] mb-2.5 flex items-center justify-between">
                  <span>Trigger SDK Language Switch:</span>
                  <span className="font-mono-code text-[11px] text-emerald-400">
                    {isTranslating ? 'Translating DOM...' : `Active: ${targetLang.toUpperCase()}`}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { code: 'en', flag: '🇬🇧', label: 'English' },
                    { code: 'es', flag: '🇪🇸', label: 'Español' },
                    { code: 'fr', flag: '🇫🇷', label: 'Français' },
                    { code: 'de', flag: '🇩🇪', label: 'Deutsch' },
                    { code: 'ja', flag: '🇯🇵', label: '日本語' },
                    { code: 'ar', flag: '🇸🇦', label: 'العربية' },
                  ].map((l) => (
                    <button
                      key={l.code}
                      onClick={() => handleLanguageSwitch(l.code)}
                      className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                        targetLang === l.code
                          ? 'luxury-button-primary text-white shadow-md'
                          : 'border border-[#f6efe2]/10 bg-[#1e0712] text-[#ebdcc9] hover:bg-[#2c0919]'
                      }`}
                    >
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: SDK Generated Manifest & JSON Inspector */}
          <div className="space-y-6 lg:col-span-7">
            <div className="luxury-card rounded-2xl p-6 sm:p-7">
              {/* Tabs and Actions */}
              <div className="flex flex-wrap items-center justify-between border-b border-[#f6efe2]/10 pb-4 gap-3">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setActiveTab('manifest')}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                      activeTab === 'manifest'
                        ? 'bg-[#9e1b32] text-white'
                        : 'text-[#ebdcc9]/70 hover:text-white'
                    }`}
                  >
                    <FileJson className="h-3.5 w-3.5" />
                    <span>lang/lang.json Manifest</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('editor')}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                      activeTab === 'editor'
                        ? 'bg-[#9e1b32] text-white'
                        : 'text-[#ebdcc9]/70 hover:text-white'
                    }`}
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                    <span>Live Override Editor</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDownloadJson}
                    className="flex items-center gap-1.5 rounded-lg border border-[#f6efe2]/15 bg-[#250817] px-3 py-1.5 text-xs text-[#ebdcc9] transition-all hover:border-[#be185d] hover:text-white"
                    title="Download complete lang.json file"
                  >
                    <Download className="h-3.5 w-3.5 text-[#e11d48]" />
                    <span>Download lang.json</span>
                  </button>

                  <button
                    onClick={handleCopyJson}
                    className="flex items-center gap-1.5 rounded-lg border border-[#f6efe2]/15 bg-[#250817] px-3 py-1.5 text-xs text-[#ebdcc9] transition-all hover:border-[#be185d] hover:text-white"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* Tab 1: Formatted JSON Manifest Display */}
              {activeTab === 'manifest' && (
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-[#ebdcc9]/70 mb-2 font-mono-code">
                    <span>Generated Nodes: {manifest?.meta.totalNodes || 0}</span>
                    <span>Unique Strings: {manifest?.meta.totalUniqueStrings || 0}</span>
                    <span className="text-emerald-400">Ready for Developer Export</span>
                  </div>

                  <div className="max-h-[380px] overflow-auto rounded-xl bg-[#090205] p-4 border border-[#f6efe2]/10">
                    <pre className="font-mono-code text-[11px] leading-relaxed text-rose-200">
                      {manifest ? JSON.stringify(manifest, null, 2) : '// Scanning DOM...'}
                    </pre>
                  </div>
                </div>
              )}

              {/* Tab 2: Live Override Editor */}
              {activeTab === 'editor' && (
                <div className="mt-4 space-y-4">
                  <p className="text-xs text-[#ebdcc9]/80">
                    Supply a custom brand phrase override for language <strong className="text-rose-400 uppercase">[{targetLang}]</strong>. The SDK will prioritize this over machine translation.
                  </p>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#cbb89e] mb-1">
                        Select Original Text
                      </label>
                      <select
                        value={overrideKey}
                        onChange={(e) => {
                          setOverrideKey(e.target.value);
                          setOverrideText('');
                        }}
                        className="w-full rounded-xl border border-[#f6efe2]/15 bg-[#090205] px-3 py-2 text-xs text-[#fdfbf7] focus:border-[#be185d] focus:outline-none"
                      >
                        <option value="">-- Choose phrase to override --</option>
                        {manifest &&
                          Object.values(manifest.strings).map((str, i) => (
                            <option key={i} value={str.original}>
                              {str.original}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#cbb89e] mb-1">
                        Custom Human Translation ({targetLang.toUpperCase()})
                      </label>
                      <input
                        type="text"
                        value={overrideText}
                        onChange={(e) => setOverrideText(e.target.value)}
                        placeholder="e.g. Colección de Relojes de Alta Gama"
                        className="w-full rounded-xl border border-[#f6efe2]/15 bg-[#090205] px-3.5 py-2.5 text-xs text-[#fdfbf7] placeholder:text-[#ebdcc9]/40 focus:border-[#be185d] focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-1">
                      <button
                        onClick={handleApplyOverride}
                        disabled={!overrideKey || !overrideText}
                        className="luxury-button-primary flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold text-white disabled:opacity-50"
                      >
                        <Save className="h-3.5 w-3.5" />
                        <span>Save & Apply Override</span>
                      </button>

                      {overrideSaved && (
                        <span className="flex items-center gap-1 text-xs text-emerald-400 font-mono-code">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>Applied to DOM in 4ms</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
