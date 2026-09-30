import React, { useState } from 'react';
import {
  Server,
  FileCode,
  FolderGit2,
  CheckCircle2,
  Edit3,
  Download,
  RefreshCw,
  Sliders,
  Globe,
  Layers,
  Search,
  Code,
  Sparkles,
  ShieldCheck,
  Check,
  Copy,
  Terminal,
} from 'lucide-react';
import { ALL_100_LANGUAGES } from '../data/languages-100';

// Sample seed data from generated lang/lang.json
interface StudioRecord {
  id: string;
  source: string;
  file: string;
  line: number;
  translations: Record<string, string>;
  verified: boolean;
}

const INITIAL_RECORDS: StudioRecord[] = [
  {
    id: 'str_1',
    source: 'Turn Any Static Website into Multi-Lingual in Seconds',
    file: 'src/components/Hero.tsx',
    line: 42,
    translations: {
      en: 'Turn Any Static Website into Multi-Lingual in Seconds',
      am: 'ማንኛውንም የማይንቀሳቀስ ድረ-ገጽ በሰከንዶች ውስጥ ወደ ብዙ ቋንቋ ይለውጡ',
      es: 'Convierta cualquier sitio web estático en multilingüe en segundos',
      fr: 'Transformez n\'importe quel site statique en multilingue en quelques secondes',
      ja: '静的ウェブサイトを数秒で多言語化',
    },
    verified: true,
  },
  {
    id: 'str_2',
    source: 'Deterministic Hash Keys',
    file: 'src/components/ArchitectureBento.tsx',
    line: 57,
    translations: {
      en: 'Deterministic Hash Keys',
      am: 'ቆራጥ የሃሽ ቁልፎች',
      es: 'Claves hash deterministas',
      fr: 'Clés de hachage déterministes',
      ja: '決定論的ハッシュキー',
    },
    verified: false,
  },
  {
    id: 'str_3',
    source: 'Sub-10ms Mutations',
    file: 'src/components/ArchitectureBento.tsx',
    line: 59,
    translations: {
      en: 'Sub-10ms Mutations',
      am: 'ንዑስ-10ሚሴ ሚውቴሽን',
      es: 'Mutaciones de DOM en menos de 10 ms',
      fr: 'Mutations DOM en moins de 10 ms',
      ja: '10ms未満の超高速DOM更新',
    },
    verified: true,
  },
  {
    id: 'str_4',
    source: 'Zero Dependencies',
    file: 'src/components/PerformanceComparison.tsx',
    line: 38,
    translations: {
      en: 'Zero Dependencies',
      am: 'ዜሮ ጥገኝነቶች (Zero Dependencies)',
      es: 'Cero Dependencias Externas',
      fr: 'Zéro Dépendance Externe',
      ja: '外部依存ゼロ (< 2.8 KB)',
    },
    verified: true,
  },
  {
    id: 'str_5',
    source: 'Explore 100+ Global Languages',
    file: 'src/components/LanguageGrid.tsx',
    line: 28,
    translations: {
      en: 'Explore 100+ Global Languages',
      am: 'ከ 100+ በላይ ዓለም አቀፍ ቋንቋዎችን ያስሱ',
      es: 'Explore más de 100 idiomas globales',
      fr: 'Explorez plus de 100 langues mondiales',
      ja: '100以上の世界言語を探索',
    },
    verified: false,
  },
];

export const ServerStudioSection: React.FC = () => {
  // Developer selected languages (Default: English 'en', plus Amharic, Spanish, French, Japanese)
  const [selectedLangs, setSelectedLangs] = useState<string[]>(['en', 'am', 'es', 'fr', 'ja']);
  const [activeEditingLang, setActiveEditingLang] = useState<string>('am');
  const [records, setRecords] = useState<StudioRecord[]>(INITIAL_RECORDS);
  const [isScanning, setIsScanning] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [copiedJson, setCopiedJson] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'runtime' | 'ignore'>('editor');

  // Server runtime simulator state
  const [simInputHtml, setSimInputHtml] = useState<string>(
    `<div class="card">\n  <h2>Turn Any Static Website into Multi-Lingual in Seconds</h2>\n  <p>Deterministic Hash Keys power sub-10ms mutations.</p>\n  <button class="btn">Explore 100+ Global Languages</button>\n</div>`
  );
  const [simLang, setSimLang] = useState<string>('am');

  const toggleLanguage = (code: string) => {
    if (code === 'en') return; // English is mandatory default
    if (selectedLangs.includes(code)) {
      setSelectedLangs(selectedLangs.filter((c) => c !== code));
      if (activeEditingLang === code) setActiveEditingLang('en');
    } else {
      setSelectedLangs([...selectedLangs, code]);
    }
  };

  const handleStartScan = () => {
    setIsScanning(true);
    setScanSuccess(false);
    setTimeout(() => {
      setIsScanning(false);
      setScanSuccess(true);
      setTimeout(() => setScanSuccess(false), 4000);
    }, 1200);
  };

  const handleStartEdit = (rec: StudioRecord) => {
    setEditingId(rec.id);
    setEditValue(rec.translations[activeEditingLang] || rec.source);
  };

  const handleSaveEdit = (recId: string) => {
    setRecords((prev) =>
      prev.map((r) => {
        if (r.id === recId) {
          return {
            ...r,
            translations: {
              ...r.translations,
              [activeEditingLang]: editValue,
            },
            verified: true, // Mark verified since human or AI agent corrected it
          };
        }
        return r;
      })
    );
    setEditingId(null);
  };

  const handleDownloadLangJson = () => {
    const locales: Record<string, Record<string, string>> = {};
    selectedLangs.forEach((l) => (locales[l] = {}));

    records.forEach((r) => {
      selectedLangs.forEach((l) => {
        locales[l][r.source] = r.translations[l] || r.source;
      });
    });

    const manifest = {
      $schema: 'https://langjs.dev/schema/v1.json',
      meta: {
        generator: 'LangJS Server Studio v1.1.0',
        generatedAt: new Date().toISOString(),
        sourceLanguage: 'en',
        targetLanguages: selectedLangs,
        totalUniqueStrings: records.length,
      },
      locales,
      sideBySide: records.map((r) => ({
        id: r.id,
        source: r.source,
        file: r.file,
        line: r.line,
        translations: r.translations,
        verified: r.verified,
        notes: r.verified ? 'Verified and corrected by developer/AI agent' : 'Machine translated',
      })),
    };

    const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lang.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyJson = () => {
    const locales: Record<string, Record<string, string>> = {};
    selectedLangs.forEach((l) => (locales[l] = {}));
    records.forEach((r) => {
      selectedLangs.forEach((l) => {
        locales[l][r.source] = r.translations[l] || r.source;
      });
    });

    navigator.clipboard.writeText(JSON.stringify({ locales, sideBySide: records }, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  // Compute server translated HTML
  const getSimulatedOutput = () => {
    let output = simInputHtml;
    records.forEach((rec) => {
      const translated = rec.translations[simLang] || rec.source;
      output = output.split(rec.source).join(translated);
    });
    return output;
  };

  const filteredRecords = records.filter(
    (r) =>
      r.source.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (r.translations[activeEditingLang] || '').toLowerCase().includes(searchFilter.toLowerCase()) ||
      r.file.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <section id="server-studio" className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-[var(--border-color)] bg-[var(--bg-main)]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] bg-[var(--bg-card)] px-3.5 py-1 text-xs font-mono-code text-[#9e1b32] mb-4">
            <Server className="h-3.5 w-3.5" />
            <span>SERVER-SIDE SUITE & CLI SCANNER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--text-hero)] tracking-tight">
            Crawl Codebases & Persist <br className="hidden sm:inline" />
            <span className="text-[#9e1b32]">Side-by-Side Translations</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            Machine translation alone can produce inaccuracies. LangJS scans your codebase, respects{' '}
            <code className="px-1.5 py-0.5 rounded bg-[var(--bg-card-hover)] font-mono-code text-xs text-[#9e1b32]">.gitignore</code> &{' '}
            <code className="px-1.5 py-0.5 rounded bg-[var(--bg-card-hover)] font-mono-code text-xs text-[#9e1b32]">.langignore</code>, and produces a structured side-by-side{' '}
            <code className="px-1.5 py-0.5 rounded bg-[var(--bg-card-hover)] font-mono-code text-xs text-emerald-700">lang/lang.json</code> so developers and AI agents can correct translations once and serve them with 100% confidence.
          </p>
        </div>

        {/* Studio Control Toolbar */}
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 shadow-xl mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Language Selector Chips */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
                <Globe className="h-3.5 w-3.5 text-[#9e1b32]" />
                <span>Selected Languages (Default: English)</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {ALL_100_LANGUAGES.slice(0, 10).map((lang) => {
                  const isDefaultEn = lang.code === 'en';
                  const isSelected = selectedLangs.includes(lang.code);
                  return (
                    <button
                      key={lang.code}
                      onClick={() => toggleLanguage(lang.code)}
                      disabled={isDefaultEn}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                        isSelected
                          ? isDefaultEn
                            ? 'bg-[var(--bg-card-hover)] border-emerald-600/40 text-emerald-700 font-semibold'
                            : 'bg-[#9e1b32] border-[#9e1b32] text-white shadow-sm'
                          : 'bg-[var(--bg-card)] border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[#9e1b32]'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                      {isSelected && <Check className="h-3 w-3" />}
                      {isDefaultEn && <span className="text-[10px] uppercase font-mono-code text-emerald-600">(Default)</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 self-start lg:self-center shrink-0">
              <button
                onClick={handleStartScan}
                disabled={isScanning}
                className="luxury-button-primary inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg transition-transform hover:scale-105"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isScanning ? 'animate-spin' : ''}`} />
                <span>{isScanning ? 'Scanning Codebase...' : 'Scan Codebase & Generate'}</span>
              </button>

              <button
                onClick={handleDownloadLangJson}
                className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold border border-[var(--border-color)] bg-[var(--bg-card-hover)] text-[var(--text-primary)] hover:border-[#9e1b32] transition-colors"
                title="Download lang/lang.json"
              >
                <Download className="h-3.5 w-3.5 text-[#9e1b32]" />
                <span className="hidden sm:inline">Download</span> lang.json
              </button>

              <button
                onClick={handleCopyJson}
                className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold border border-[var(--border-color)] bg-[var(--bg-card-hover)] text-[var(--text-primary)] hover:border-[#9e1b32] transition-colors"
                title="Copy JSON to clipboard"
              >
                {copiedJson ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                <span className="hidden sm:inline">{copiedJson ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Scan feedback alert */}
          {scanSuccess && (
            <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-xs text-emerald-700 animate-fadeIn">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>
                <strong>Codebase Scan Complete:</strong> Parsed 16 template files, respected{' '}
                <code className="font-mono-code">.gitignore</code> & <code className="font-mono-code">.langignore</code>, and synchronized side-by-side strings into{' '}
                <code className="font-mono-code font-bold">lang/lang.json</code>.
              </span>
            </div>
          )}
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[var(--border-color)] mb-6">
          <button
            onClick={() => setActiveTab('editor')}
            className={`flex items-center gap-2 pb-3 px-4 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'editor'
                ? 'border-[#9e1b32] text-[#9e1b32]'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Edit3 className="h-3.5 w-3.5" />
            <span>Side-by-Side Accuracy Editor</span>
          </button>

          <button
            onClick={() => setActiveTab('runtime')}
            className={`flex items-center gap-2 pb-3 px-4 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'runtime'
                ? 'border-[#9e1b32] text-[#9e1b32]'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Server className="h-3.5 w-3.5" />
            <span>Universal Server Runtime & Middleware</span>
          </button>

          <button
            onClick={() => setActiveTab('ignore')}
            className={`flex items-center gap-2 pb-3 px-4 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'ignore'
                ? 'border-[#9e1b32] text-[#9e1b32]'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            <FolderGit2 className="h-3.5 w-3.5" />
            <span>.langignore & CLI Config</span>
          </button>
        </div>

        {/* TAB 1: SIDE-BY-SIDE EDITOR */}
        {activeTab === 'editor' && (
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden shadow-xl">
            {/* Table Header Controls */}
            <div className="p-4 border-b border-[var(--border-color)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[var(--bg-card-hover)]/50">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  Compare & Edit:
                </span>
                <div className="flex gap-1.5 overflow-x-auto">
                  {selectedLangs
                    .filter((c) => c !== 'en')
                    .map((code) => {
                      const langObj = ALL_100_LANGUAGES.find((l) => l.code === code);
                      return (
                        <button
                          key={code}
                          onClick={() => setActiveEditingLang(code)}
                          className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
                            activeEditingLang === code
                              ? 'bg-[#9e1b32] border-[#9e1b32] text-white shadow-sm'
                              : 'bg-[var(--bg-card)] border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[#9e1b32]'
                          }`}
                        >
                          {langObj?.flag} {langObj?.name} ({code.toUpperCase()})
                        </button>
                      );
                    })}
                </div>
              </div>

              {/* Search box */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--text-muted)]" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Filter extracted strings..."
                  className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] py-1.5 pl-9 pr-3 text-xs text-[var(--text-hero)] placeholder:text-[var(--text-muted)] focus:border-[#9e1b32] focus:outline-none"
                />
              </div>
            </div>

            {/* Side-by-Side Review Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[var(--border-color)] bg-[var(--bg-card-hover)]/30 font-mono-code text-[11px] text-[var(--text-muted)]">
                    <th className="py-3 px-4 font-semibold">SOURCE CODE LOCATION</th>
                    <th className="py-3 px-4 font-semibold">SOURCE STRING (ENGLISH)</th>
                    <th className="py-3 px-4 font-semibold">
                      TARGET TRANSLATION ({activeEditingLang.toUpperCase()})
                    </th>
                    <th className="py-3 px-4 font-semibold text-center">STATUS</th>
                    <th className="py-3 px-4 font-semibold text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-color)]">
                  {filteredRecords.map((rec) => {
                    const isEditing = editingId === rec.id;
                    const currentTranslation = rec.translations[activeEditingLang] || rec.source;

                    return (
                      <tr key={rec.id} className="hover:bg-[var(--bg-card-hover)]/40 transition-colors">
                        {/* File Location */}
                        <td className="py-3.5 px-4 font-mono-code text-[11px] text-[var(--text-muted)] whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <FileCode className="h-3.5 w-3.5 text-[#9e1b32]" />
                            <span>
                              {rec.file}:{rec.line}
                            </span>
                          </div>
                        </td>

                        {/* English Source */}
                        <td className="py-3.5 px-4 font-medium text-[var(--text-hero)] max-w-xs break-words">
                          {rec.source}
                        </td>

                        {/* Target Translation */}
                        <td className="py-3.5 px-4 text-[var(--text-primary)] max-w-sm">
                          {isEditing ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                className="w-full rounded-lg border border-[#9e1b32] bg-[var(--bg-card)] px-2.5 py-1 text-xs text-[var(--text-hero)] focus:outline-none"
                                autoFocus
                              />
                              <button
                                onClick={() => handleSaveEdit(rec.id)}
                                className="px-2 py-1 rounded bg-[#9e1b32] text-white font-semibold text-[10px]"
                              >
                                Save
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between group">
                              <span className="font-semibold text-[#9e1b32]">{currentTranslation}</span>
                              <button
                                onClick={() => handleStartEdit(rec)}
                                className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[#9e1b32] transition-opacity"
                                title="Edit to correct machine translation"
                              >
                                <Edit3 className="h-3 w-3" />
                              </button>
                            </div>
                          )}
                        </td>

                        {/* Verification Status */}
                        <td className="py-3.5 px-4 text-center whitespace-nowrap">
                          {rec.verified ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-700 border border-emerald-500/30">
                              <CheckCircle2 className="h-2.5 w-2.5" />
                              Verified
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-700 border border-amber-500/30">
                              <Sparkles className="h-2.5 w-2.5" />
                              Google Machine
                            </span>
                          )}
                        </td>

                        {/* Action */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          {isEditing ? (
                            <button
                              onClick={() => setEditingId(null)}
                              className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                            >
                              Cancel
                            </button>
                          ) : (
                            <button
                              onClick={() => handleStartEdit(rec)}
                              className="inline-flex items-center gap-1 text-xs font-semibold text-[#9e1b32] hover:underline"
                            >
                              <Edit3 className="h-3 w-3" />
                              <span>Fix Translation</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-[var(--bg-card-hover)]/30 border-t border-[var(--border-color)] flex items-center justify-between text-xs text-[var(--text-muted)]">
              <span>Showing {filteredRecords.length} extracted codebase strings</span>
              <span className="font-mono-code text-[11px] text-emerald-700">
                Translations saved in <strong className="text-[var(--text-hero)]">lang/lang.json</strong>
              </span>
            </div>
          </div>
        )}

        {/* TAB 2: UNIVERSAL SERVER RUNTIME & MIDDLEWARE */}
        {activeTab === 'runtime' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Express / Framework Agnostic Code Sample */}
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-mono-code text-[#9e1b32] mb-3">
                <Terminal className="h-4 w-4" />
                <span>SERVER RUNTIME INTEGRATION (EXPRESS, SSR, NEXT, NUXT)</span>
              </div>
              <h3 className="text-xl font-bold text-[var(--text-hero)] mb-2">
                Universal HTML Post-Render Interceptor
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mb-4 leading-relaxed">
                Rather than hardcoding template strings in Vue, React, Angular, or Blade, the server middleware intercepts the rendered HTML response and transforms all visible text in-place using the verified <code className="font-mono-code text-[#9e1b32]">lang/lang.json</code> manifest.
              </p>

              <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-main)] p-4 font-mono-code text-xs text-[var(--text-primary)] overflow-x-auto leading-relaxed">
                <span className="text-purple-600">import</span> express <span className="text-purple-600">from</span> <span className="text-emerald-700">'express'</span>;<br />
                <span className="text-purple-600">import</span> &#123; ServerTranslateRuntime &#125; <span className="text-purple-600">from</span> <span className="text-emerald-700">'@nexuss0781/langjs/server'</span>;<br />
                <br />
                <span className="text-blue-600">const</span> app = <span className="text-amber-600">express</span>();<br />
                <span className="text-blue-600">const</span> runtime = <span className="text-blue-600">new</span> <span className="text-amber-600">ServerTranslateRuntime</span>(&#123;<br />
                &nbsp;&nbsp;manifestPath: <span className="text-emerald-700">'./lang/lang.json'</span>,<br />
                &nbsp;&nbsp;defaultLanguage: <span className="text-emerald-700">'en'</span>,<br />
                &nbsp;&nbsp;supportedLanguages: [<span className="text-emerald-700">'en'</span>, <span className="text-emerald-700">'am'</span>, <span className="text-emerald-700">'es'</span>, <span className="text-emerald-700">'fr'</span>, <span className="text-emerald-700">'ja'</span>]<br />
                &#125;);<br />
                <br />
                <span className="text-[var(--text-muted)]">// Mount universal HTML localization middleware:</span><br />
                app.<span className="text-blue-600">use</span>(runtime.<span className="text-amber-600">createMiddleware</span>());<br />
                <br />
                app.<span className="text-blue-600">get</span>(<span className="text-emerald-700">'/'</span>, (req, res) =&gt; &#123;<br />
                &nbsp;&nbsp;<span className="text-[var(--text-muted)]">// Renders your raw React/Vue/Blade/HTML template</span><br />
                &nbsp;&nbsp;res.<span className="text-amber-600">send</span>(renderedHtml);<br />
                &#125;);
              </div>
            </div>

            {/* Interactive Live Server HTML Transformer Simulator */}
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-xs font-mono-code text-emerald-700">
                    <Code className="h-4 w-4" />
                    <span>INTERACTIVE SSR STREAM TRANSFORMER</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-[var(--text-muted)]">Target:</span>
                    <select
                      value={simLang}
                      onChange={(e) => setSimLang(e.target.value)}
                      className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-main)] px-2 py-1 text-xs text-[var(--text-hero)] focus:border-[#9e1b32]"
                    >
                      {selectedLangs.map((c) => {
                        const l = ALL_100_LANGUAGES.find((lang) => lang.code === c);
                        return (
                          <option key={c} value={c}>
                            {l?.flag} {l?.name} ({c.toUpperCase()})
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                    Raw Framework Output (React, Vue, Blade, Angular, Svelte)
                  </label>
                  <textarea
                    rows={4}
                    value={simInputHtml}
                    onChange={(e) => setSimInputHtml(e.target.value)}
                    className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-main)] p-3 font-mono-code text-xs text-[var(--text-primary)] focus:border-[#9e1b32] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                    Localized HTML Stream (Sub-3ms Transformation)
                  </label>
                  <div className="rounded-xl border border-emerald-500/30 bg-[var(--bg-main)] p-3 font-mono-code text-xs text-emerald-800 dark:text-emerald-400 overflow-x-auto whitespace-pre leading-relaxed">
                    {getSimulatedOutput()}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[var(--border-color)] flex items-center justify-between text-xs text-[var(--text-muted)]">
                <span>Transformation Latency: &lt; 2.4ms</span>
                <span className="text-emerald-700 font-semibold">100% Exact JSON Match</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: .LANGIGNORE & CLI RUNNER */}
        {activeTab === 'ignore' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-mono-code text-[#9e1b32] mb-3">
                <FolderGit2 className="h-4 w-4" />
                <span>.LANGIGNORE SPECIFICATION</span>
              </div>
              <h3 className="text-xl font-bold text-[var(--text-hero)] mb-2">
                Cloned & Dedicated Ignore Engine
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mb-4 leading-relaxed">
                By default, LangJS respects all rules in <code className="font-mono-code text-[#9e1b32]">.gitignore</code>. You can also define a dedicated <code className="font-mono-code text-[#9e1b32]">.langignore</code> file in the repository root to exclude internal test files, mock fixtures, and build artifacts from extraction.
              </p>

              <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-main)] p-4 font-mono-code text-xs text-[var(--text-primary)] overflow-x-auto leading-relaxed">
                <span className="text-[var(--text-muted)]"># Automatically excludes build artifacts and dependencies</span><br />
                node_modules/<br />
                dist/<br />
                build/<br />
                .next/<br />
                .nuxt/<br />
                lang/lang.json<br />
                *.lock<br />
                *.log<br />
                *.svg<br />
                *.png<br />
                *.jpg
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono-code text-emerald-700 mb-3">
                  <Terminal className="h-4 w-4" />
                  <span>COMMAND LINE RUNNER</span>
                </div>
                <h3 className="text-xl font-bold text-[var(--text-hero)] mb-2">
                  1-Command Codebase Scanner
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mb-4 leading-relaxed">
                  Run the scanner from your terminal or CI/CD pipeline before building production releases:
                </p>

                <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-main)] p-4 font-mono-code text-xs text-white bg-zinc-950 overflow-x-auto space-y-2">
                  <div className="flex items-center justify-between text-zinc-400 text-[11px] pb-2 border-b border-zinc-800">
                    <span>Terminal / Bash</span>
                    <span>CLI v1.1.0</span>
                  </div>
                  <p className="text-emerald-400">
                    $ node scripts/scan-codebase.js --languages en,am,es,fr,ja --out lang/lang.json
                  </p>
                  <p className="text-zinc-400 text-[11px]">
                    🔍 Scanning codebase in /app/applet...<br />
                    📄 Found 16 UI template/component files.<br />
                    ✨ Extracted 35 unique visible strings.<br />
                    ✅ Wrote structured side-by-side file to lang/lang.json
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[var(--border-color)] text-xs text-[var(--text-secondary)]">
                AI agents and human developers can run this script or edit <code className="font-mono-code text-[#9e1b32]">lang/lang.json</code> directly in VSCode or GitHub web editor.
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
