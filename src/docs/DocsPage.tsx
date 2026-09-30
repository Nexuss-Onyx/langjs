import React, { useState, useEffect, useMemo } from 'react';
import { 
  DOC_CATEGORIES, 
  DocItem 
} from './docsData';
import { 
  Search, 
  Copy, 
  Check, 
  ChevronRight, 
  ChevronDown, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  Github, 
  Package, 
  Code2, 
  Terminal, 
  FileJson, 
  ExternalLink,
  Layers,
  X,
  Menu
} from 'lucide-react';

interface DocsPageProps {
  onBackToHome: () => void;
  initialDocId?: string;
}

export const DocsPage: React.FC<DocsPageProps> = ({ onBackToHome, initialDocId }) => {
  const allItems = useMemo(() => {
    return DOC_CATEGORIES.flatMap((c) => c.items);
  }, []);

  const [activeDocId, setActiveDocId] = useState<string>(initialDocId || 'welcome');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<'npm' | 'pnpm' | 'yarn' | 'bun'>('npm');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Handle URL hash sync or initial ID
  useEffect(() => {
    if (initialDocId) {
      setActiveDocId(initialDocId);
    }
  }, [initialDocId]);

  // Keyboard shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      } else if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        setSearchModalOpen(true);
      } else if (e.key === 'Escape') {
        setSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const activeDoc: DocItem = useMemo(() => {
    return allItems.find((item) => item.id === activeDocId) || allItems[0];
  }, [allItems, activeDocId]);

  const activeIndex = useMemo(() => {
    return allItems.findIndex((item) => item.id === activeDoc.id);
  }, [allItems, activeDoc.id]);

  const prevDoc = activeIndex > 0 ? allItems[activeIndex - 1] : null;
  const nextDoc = activeIndex < allItems.length - 1 ? allItems[activeIndex + 1] : null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const toggleCategory = (catId: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return allItems;
    const q = searchQuery.toLowerCase();
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [allItems, searchQuery]);

  const getBadgeStyle = (badgeType?: string) => {
    switch (badgeType) {
      case 'get':
        return 'bg-blue-950/80 text-blue-300 border-blue-800/40';
      case 'post':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-800/40';
      case 'class':
        return 'bg-purple-950/80 text-purple-300 border-purple-800/40';
      case 'method':
        return 'bg-rose-950/80 text-rose-300 border-rose-800/40';
      case 'hook':
        return 'bg-cyan-950/80 text-cyan-300 border-cyan-800/40';
      default:
        return 'bg-[#250817] text-[#ebdcc9]/90 border-[#f6efe2]/15';
    }
  };

  return (
    <div className="min-h-screen bg-[#070205] text-[#fdfbf7] flex flex-col selection:bg-[#9e1b32] selection:text-white">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-[#f6efe2]/10 bg-[#090205]/95 px-4 sm:px-8 backdrop-blur-xl">
        {/* Left: Brand & Version */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#be185d]/40 bg-gradient-to-br from-[#9e1b32] to-[#4c0519] shadow-md shadow-[#9e1b32]/20 group-hover:scale-105 transition-transform">
              <span className="font-serif-luxury text-sm font-black tracking-wider text-white">LJ</span>
            </div>
            <div>
              <span className="font-serif-luxury text-base font-bold text-[#fdfbf7] group-hover:text-rose-200 transition-colors">
                LangJS
              </span>
            </div>
          </button>

          <span className="rounded-full border border-emerald-500/30 bg-emerald-950/60 px-2 py-0.5 font-mono-code text-[11px] font-semibold text-emerald-300">
            • v1.0.0
          </span>
        </div>

        {/* Center: Search Button / Bar */}
        <div className="hidden md:flex items-center">
          <button
            onClick={() => setSearchModalOpen(true)}
            className="flex items-center gap-3 rounded-xl border border-[#f6efe2]/15 bg-[#14040c] px-3.5 py-1.5 text-xs text-[#ebdcc9]/60 hover:border-[#be185d]/60 hover:text-[#fdfbf7] transition-all w-64 justify-between"
          >
            <span className="flex items-center gap-2">
              <Search className="h-3.5 w-3.5 text-[#e11d48]" />
              <span>Search docs...</span>
            </span>
            <kbd className="rounded border border-[#f6efe2]/15 bg-[#200613] px-1.5 py-0.5 font-mono-code text-[10px] text-[#ebdcc9]/80">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="flex md:hidden items-center justify-center rounded-lg border border-[#f6efe2]/15 bg-[#18040f] p-1.5 text-[#ebdcc9] hover:text-white"
            aria-label="Toggle docs navigation"
          >
            {mobileSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>

          <button
            onClick={onBackToHome}
            className="flex items-center gap-1.5 rounded-lg border border-[#f6efe2]/15 bg-[#18040f] px-2.5 sm:px-3 py-1.5 text-xs font-medium text-[#ebdcc9] hover:border-[#be185d] hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-rose-400" />
            <span className="hidden sm:inline">Back to Showcase</span>
          </button>

          <a
            href="https://www.npmjs.com/package/@nexuss0781/langjs"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-[#f6efe2]/15 bg-[#18040f] px-2.5 py-1.5 text-xs font-medium text-[#ebdcc9] hover:border-[#be185d] hover:text-white transition-colors"
            title="NPM Package"
          >
            <Package className="h-3.5 w-3.5 text-rose-400" />
            <span className="hidden sm:inline">NPM</span>
          </a>

          <a
            href="https://github.com/Nexuss-Onyx/langjs"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-[#f6efe2]/15 bg-[#18040f] px-2.5 py-1.5 text-xs font-medium text-[#ebdcc9] hover:border-[#be185d] hover:text-white transition-colors"
            title="GitHub Repository"
          >
            <Github className="h-3.5 w-3.5 text-rose-400" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </header>

      {/* Mobile Sidebar Navigation Drawer */}
      {mobileSidebarOpen && (
        <div className="md:hidden border-b border-[#f6efe2]/15 bg-[#11030c]/98 p-4 shadow-2xl backdrop-blur-3xl z-30 max-h-[70vh] overflow-y-auto custom-scrollbar animate-in slide-in-from-top-2">
          {/* Quick Filter Input */}
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#ebdcc9]/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documentation..."
              className="w-full rounded-xl border border-[#f6efe2]/15 bg-[#18040f] py-1.5 pl-8 pr-7 text-xs text-[#fdfbf7] placeholder:text-[#ebdcc9]/30 focus:border-[#be185d] focus:outline-none"
            />
          </div>

          <div className="space-y-4">
            {DOC_CATEGORIES.map((category) => (
              <div key={category.id} className="space-y-1">
                <div className="px-2 text-[10px] font-bold uppercase tracking-wider text-[#cbb89e]/60">
                  {category.title}
                </div>
                {category.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveDocId(item.id);
                      setMobileSidebarOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition-colors ${
                      item.id === activeDocId
                        ? 'bg-[#9e1b32]/40 text-white font-semibold border border-[#be185d]/40'
                        : 'text-[#ebdcc9]/70 hover:bg-[#1a0510] hover:text-white'
                    }`}
                  >
                    <span className="truncate">{item.title}</span>
                    {item.badge && (
                      <span className={`ml-2 rounded border px-1.5 py-0.2 text-[9px] font-mono-code font-bold uppercase ${getBadgeStyle(item.badgeType)}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Docs Body Layout */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        {/* Left Sidebar */}
        <aside className="w-72 shrink-0 border-r border-[#f6efe2]/10 bg-[#090205] p-4 hidden md:block overflow-y-auto max-h-[calc(100vh-3.5rem)] sticky top-14 custom-scrollbar">
          {/* Quick Filter Input */}
          <div className="relative mb-5">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#ebdcc9]/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Jump to..."
              className="w-full rounded-xl border border-[#f6efe2]/15 bg-[#13040c] py-1.5 pl-8 pr-7 text-xs text-[#fdfbf7] placeholder:text-[#ebdcc9]/30 focus:border-[#be185d] focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#ebdcc9]/40 hover:text-white"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Navigation Categories */}
          <div className="space-y-6">
            {DOC_CATEGORIES.map((category) => {
              const isCollapsed = !!collapsedCategories[category.id];
              const categoryItems = searchQuery
                ? category.items.filter(
                    (item) =>
                      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      item.summary.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                : category.items;

              if (searchQuery && categoryItems.length === 0) return null;

              return (
                <div key={category.id} className="space-y-1.5">
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="flex w-full items-center justify-between px-2 text-[11px] font-bold tracking-wider uppercase text-[#cbb89e]/70 hover:text-[#fdfbf7] transition-colors"
                  >
                    <span>{category.title}</span>
                    <ChevronDown
                      className={`h-3 w-3 transition-transform ${isCollapsed ? '-rotate-90' : ''}`}
                    />
                  </button>

                  {!isCollapsed && (
                    <div className="space-y-0.5 pt-1">
                      {categoryItems.map((item) => {
                        const isActive = item.id === activeDocId;
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              setActiveDocId(item.id);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className={`group flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition-all ${
                              isActive
                                ? 'bg-gradient-to-r from-[#9e1b32]/40 to-[#4c0519]/40 border border-[#be185d]/40 text-[#fdfbf7] font-semibold shadow-sm'
                                : 'text-[#ebdcc9]/70 hover:bg-[#19040f] hover:text-[#fdfbf7]'
                            }`}
                          >
                            <span className="truncate text-left">{item.title}</span>
                            {item.badge && (
                              <span
                                className={`ml-2 rounded border px-1.5 py-0.2 font-mono-code text-[9px] font-semibold shrink-0 uppercase ${getBadgeStyle(
                                  item.badgeType
                                )}`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 sm:p-10 lg:p-12 max-w-4xl min-w-0 overflow-hidden">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-[#cbb89e]/60 mb-3">
            <span>Docs</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#ebdcc9]/80">{activeDoc.category}</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-rose-300 font-medium">{activeDoc.title}</span>
          </div>

          {/* Article Header */}
          <div className="pb-6 border-b border-[#f6efe2]/10">
            <div className="flex items-center gap-3">
              <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold tracking-tight text-[#fdfbf7]">
                {activeDoc.title}
              </h1>
              {activeDoc.badge && (
                <span
                  className={`rounded-full border px-2.5 py-0.5 font-mono-code text-xs font-semibold uppercase ${getBadgeStyle(
                    activeDoc.badgeType
                  )}`}
                >
                  {activeDoc.badge}
                </span>
              )}
            </div>
            <p className="mt-3 text-sm sm:text-base text-[#ebdcc9]/80 leading-relaxed max-w-2xl">
              {activeDoc.summary}
            </p>
          </div>

          {/* Article Body */}
          <div className="mt-8 space-y-8 text-sm sm:text-base text-[#ebdcc9]/90 leading-relaxed">
            {/* Overview */}
            <p className="whitespace-pre-line leading-relaxed">
              {activeDoc.content.overview}
            </p>

            {/* Notes / Callouts */}
            {activeDoc.content.notes?.map((note, idx) => (
              <div
                key={idx}
                className={`rounded-xl border p-4 text-xs sm:text-sm flex items-start gap-3 ${
                  note.type === 'tip'
                    ? 'border-emerald-500/30 bg-emerald-950/30 text-emerald-200'
                    : note.type === 'warning'
                    ? 'border-amber-500/30 bg-amber-950/30 text-amber-200'
                    : 'border-[#be185d]/30 bg-[#1f0513]/60 text-rose-200'
                }`}
              >
                <Sparkles className="h-4 w-4 shrink-0 mt-0.5" />
                <div>{note.text}</div>
              </div>
            ))}

            {/* Code Snippet Box */}
            {activeDoc.content.codeSnippet && (
              <div className="rounded-2xl border border-[#f6efe2]/15 bg-[#0e0308] overflow-hidden shadow-xl shadow-black/60">
                <div className="flex items-center justify-between border-b border-[#f6efe2]/10 bg-[#16040d] px-4 py-2.5 text-xs text-[#ebdcc9]/70">
                  <div className="flex items-center gap-2 font-mono-code">
                    <Code2 className="h-3.5 w-3.5 text-rose-400" />
                    <span>{activeDoc.content.codeSnippet.title || 'Code Example'}</span>
                  </div>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        activeDoc.content.codeSnippet!.code,
                        'main-snippet'
                      )
                    }
                    className="flex items-center gap-1.5 rounded-lg border border-[#f6efe2]/10 bg-[#240615] px-2.5 py-1 text-[11px] font-medium text-[#ebdcc9] hover:text-white transition-colors"
                  >
                    {copiedKey === 'main-snippet' ? (
                      <Check className="h-3 w-3 text-emerald-400" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                    <span>{copiedKey === 'main-snippet' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="p-4 sm:p-5 overflow-x-auto font-mono-code text-xs sm:text-sm text-rose-100 bg-[#080205] leading-relaxed">
                  <code>{activeDoc.content.codeSnippet.code}</code>
                </pre>
              </div>
            )}

            {/* Payload / JSON Example (like the Reference Photo) */}
            {activeDoc.content.payloadExample && (
              <div className="space-y-3">
                <h3 className="font-serif-luxury text-xl font-bold text-[#fdfbf7]">
                  {activeDoc.content.payloadExample.title}
                </h3>
                <div className="rounded-2xl border border-[#f6efe2]/15 bg-[#0a0206] overflow-hidden shadow-xl">
                  <div className="flex items-center justify-between border-b border-[#f6efe2]/10 bg-[#15040d] px-4 py-2 text-xs">
                    <span className="font-mono-code font-bold uppercase text-rose-300">
                      JSON
                    </span>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          activeDoc.content.payloadExample!.json,
                          'payload-snippet'
                        )
                      }
                      className="flex items-center gap-1.5 text-[11px] text-[#ebdcc9]/60 hover:text-white"
                    >
                      {copiedKey === 'payload-snippet' ? (
                        <Check className="h-3 w-3 text-emerald-400" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                      <span>{copiedKey === 'payload-snippet' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="p-4 sm:p-5 overflow-x-auto font-mono-code text-xs sm:text-sm text-emerald-300 bg-[#060104] leading-relaxed">
                    <code>{activeDoc.content.payloadExample.json}</code>
                  </pre>
                </div>
              </div>
            )}

            {/* Parameter & Fields Table (from reference photo) */}
            {activeDoc.content.fields && activeDoc.content.fields.length > 0 && (
              <div className="space-y-4 pt-2">
                <h3 className="font-serif-luxury text-xl font-bold text-[#fdfbf7]">
                  Important Fields & Parameters
                </h3>
                <div className="overflow-x-auto rounded-xl border border-[#f6efe2]/15 bg-[#0f0309]">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-[#f6efe2]/10 bg-[#190510] text-[#cbb89e]">
                        <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[11px]">
                          Field
                        </th>
                        <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[11px]">
                          Type
                        </th>
                        <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[11px]">
                          Default
                        </th>
                        <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[11px]">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f6efe2]/10 font-sans">
                      {activeDoc.content.fields.map((field) => (
                        <tr key={field.name} className="hover:bg-[#18040f]/60 transition-colors">
                          <td className="py-3 px-4 font-mono-code text-rose-300 font-semibold whitespace-nowrap">
                            {field.name}
                            {field.required && (
                              <span className="ml-1 text-[10px] text-rose-500 font-bold">*</span>
                            )}
                          </td>
                          <td className="py-3 px-4 font-mono-code text-purple-300 text-xs whitespace-nowrap">
                            {field.type}
                          </td>
                          <td className="py-3 px-4 font-mono-code text-[#ebdcc9]/60 text-xs whitespace-nowrap">
                            {field.defaultVal || '—'}
                          </td>
                          <td className="py-3 px-4 text-[#ebdcc9]/90 text-xs sm:text-sm">
                            {field.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Custom Sub-sections */}
            {activeDoc.content.sections?.map((sec, idx) => (
              <div key={idx} className="space-y-3 pt-2">
                <h3 className="font-serif-luxury text-xl font-bold text-[#fdfbf7]">
                  {sec.title}
                </h3>
                <p className="whitespace-pre-line text-xs sm:text-sm text-[#ebdcc9]/80 leading-relaxed">
                  {sec.body}
                </p>
                {sec.code && (
                  <pre className="p-4 rounded-xl border border-[#f6efe2]/15 bg-[#090205] overflow-x-auto font-mono-code text-xs text-rose-200">
                    <code>{sec.code}</code>
                  </pre>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Pagination */}
          <div className="mt-14 pt-6 border-t border-[#f6efe2]/10 flex items-center justify-between">
            {prevDoc ? (
              <button
                onClick={() => {
                  setActiveDocId(prevDoc.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group flex flex-col items-start gap-1 rounded-xl border border-[#f6efe2]/10 bg-[#14040c] p-3 text-left hover:border-[#be185d] transition-all"
              >
                <span className="flex items-center gap-1 text-[11px] text-[#cbb89e]/60 group-hover:text-rose-300">
                  <ArrowLeft className="h-3 w-3" />
                  Previous
                </span>
                <span className="font-serif-luxury text-sm font-semibold text-[#fdfbf7]">
                  {prevDoc.title}
                </span>
              </button>
            ) : <div />}

            {nextDoc && (
              <button
                onClick={() => {
                  setActiveDocId(nextDoc.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group flex flex-col items-end gap-1 rounded-xl border border-[#f6efe2]/10 bg-[#14040c] p-3 text-right hover:border-[#be185d] transition-all"
              >
                <span className="flex items-center gap-1 text-[11px] text-[#cbb89e]/60 group-hover:text-rose-300">
                  Next
                  <ArrowRight className="h-3 w-3" />
                </span>
                <span className="font-serif-luxury text-sm font-semibold text-[#fdfbf7]">
                  {nextDoc.title}
                </span>
              </button>
            )}
          </div>
        </main>
      </div>

      {/* Cmd+K Search Modal */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-xl rounded-2xl border border-[#f6efe2]/20 bg-[#16040d] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
            <div className="relative border-b border-[#f6efe2]/10 p-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#e11d48]" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across all documentation..."
                className="w-full bg-transparent pl-8 pr-8 text-sm text-[#fdfbf7] placeholder:text-[#ebdcc9]/40 focus:outline-none"
              />
              <button
                onClick={() => setSearchModalOpen(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#ebdcc9]/40 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2 space-y-1 custom-scrollbar">
              {filteredItems.length === 0 ? (
                <div className="p-6 text-center text-xs text-[#ebdcc9]/50">
                  No documentation pages found for "{searchQuery}"
                </div>
              ) : (
                filteredItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveDocId(item.id);
                      setSearchModalOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left hover:bg-[#250817] transition-colors"
                  >
                    <div>
                      <div className="font-medium text-xs text-[#fdfbf7]">{item.title}</div>
                      <div className="text-[11px] text-[#ebdcc9]/60 line-clamp-1">{item.summary}</div>
                    </div>
                    {item.badge && (
                      <span className={`rounded border px-1.5 py-0.5 text-[9px] font-mono-code font-bold uppercase ${getBadgeStyle(item.badgeType)}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))
              )}
            </div>

            <div className="border-t border-[#f6efe2]/10 bg-[#0c0207] px-4 py-2 text-[11px] text-[#ebdcc9]/50 flex items-center justify-between">
              <span>Navigation: Click to select</span>
              <kbd className="rounded border border-[#f6efe2]/15 bg-[#1a050f] px-1.5 py-0.5 font-mono-code text-[10px]">ESC to close</kbd>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
