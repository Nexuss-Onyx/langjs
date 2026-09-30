import React, { useState, useEffect, useMemo } from 'react';
import { 
  DOC_CATEGORIES, 
} from './docsData';
import { 
  Search, 
  Copy, 
  Check, 
  ChevronRight, 
  ChevronDown, 
  ArrowLeft, 
  ArrowRight, 
  Info, 
  Github, 
  Package, 
  Code2, 
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
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Handle URL hash sync or initial ID
  useEffect(() => {
    if (initialDocId) {
      setActiveDocId(initialDocId);
    }
  }, [initialDocId]);

  const activeDoc = useMemo(() => {
    return allItems.find((item) => item.id === activeDocId) || allItems[0];
  }, [allItems, activeDocId]);

  const currentIndex = allItems.findIndex((item) => item.id === activeDoc.id);
  const prevDoc = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const nextDoc = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

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
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'post':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'class':
        return 'bg-purple-100 text-purple-900 border-purple-300';
      case 'method':
        return 'bg-rose-100 text-rose-900 border-rose-300';
      case 'hook':
        return 'bg-cyan-100 text-cyan-900 border-cyan-300';
      default:
        return 'bg-[#9e1b32]/10 text-[#9e1b32] border-[#9e1b32]/30';
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] flex flex-col selection:bg-[#9e1b32] selection:text-white">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-[var(--border-color)] bg-[var(--bg-main)]/95 px-4 sm:px-8 backdrop-blur-xl">
        {/* Left: Brand & Version */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#9e1b32] to-[#701124] shadow-sm group-hover:scale-105 transition-transform">
              <span className="font-serif-luxury text-sm font-black tracking-wider text-white">LJ</span>
            </div>
            <div>
              <span className="font-serif-luxury text-base font-bold text-[var(--text-hero)] group-hover:text-[#9e1b32] transition-colors">
                LangJS
              </span>
            </div>
          </button>

          <span className="font-mono-code text-xs text-[var(--text-muted)]">
            v1.0.0
          </span>
        </div>

        {/* Center: Search Button / Bar */}
        <div className="hidden md:flex items-center">
          <button
            onClick={() => setSearchModalOpen(true)}
            className="flex items-center gap-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] px-3.5 py-1.5 text-xs text-[var(--text-secondary)] hover:border-[#9e1b32] hover:text-[var(--text-hero)] transition-all w-64 justify-between shadow-xs"
          >
            <span className="flex items-center gap-2">
              <Search className="h-3.5 w-3.5 text-[#9e1b32]" />
              <span>Search docs...</span>
            </span>
            <kbd className="rounded border border-[var(--border-color)] bg-[var(--bg-card-hover)] px-1.5 py-0.5 font-mono-code text-[10px] text-[var(--text-muted)]">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="flex md:hidden items-center justify-center rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-hero)]"
            aria-label="Toggle docs navigation"
          >
            {mobileSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>

          <button
            onClick={onBackToHome}
            className="flex items-center gap-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] px-2.5 sm:px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] hover:border-[#9e1b32] hover:text-[#9e1b32] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-[#9e1b32]" />
            <span className="hidden sm:inline">Back to Showcase</span>
          </button>

          <a
            href="https://www.npmjs.com/package/@nexuss0781/langjs"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] px-2.5 py-1.5 text-xs font-medium text-[var(--text-primary)] hover:border-[#9e1b32] hover:text-[#9e1b32] transition-colors"
            title="NPM Package"
          >
            <Package className="h-3.5 w-3.5 text-[#9e1b32]" />
            <span className="hidden sm:inline">NPM</span>
          </a>

          <a
            href="https://github.com/Nexuss-Onyx/langjs"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] px-2.5 py-1.5 text-xs font-medium text-[var(--text-primary)] hover:border-[#9e1b32] hover:text-[#9e1b32] transition-colors"
            title="GitHub Repository"
          >
            <Github className="h-3.5 w-3.5 text-[#9e1b32]" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </header>

      {/* Mobile Sidebar Navigation Drawer */}
      {mobileSidebarOpen && (
        <div className="md:hidden border-b border-[var(--border-color)] bg-[var(--bg-card)] p-4 shadow-2xl z-30 max-h-[70vh] overflow-y-auto custom-scrollbar animate-in slide-in-from-top-2">
          {/* Quick Filter Input */}
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--text-muted)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documentation..."
              className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-hover)] py-1.5 pl-8 pr-7 text-xs text-[var(--text-hero)] placeholder:text-[var(--text-muted)] focus:border-[#9e1b32] focus:outline-none"
            />
          </div>

          <div className="space-y-4">
            {DOC_CATEGORIES.map((category) => (
              <div key={category.id} className="space-y-1">
                <div className="px-2 text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
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
                        ? 'bg-[#9e1b32]/10 text-[#9e1b32] font-semibold border border-[#9e1b32]'
                        : 'text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)]'
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
        <aside className="w-72 shrink-0 border-r border-[var(--border-color)] bg-[var(--bg-card)] p-4 hidden md:block overflow-y-auto max-h-[calc(100vh-3.5rem)] sticky top-14 custom-scrollbar">
          {/* Quick Filter Input */}
          <div className="relative mb-5">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--text-muted)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Jump to..."
              className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-hover)] py-1.5 pl-8 pr-7 text-xs text-[var(--text-hero)] placeholder:text-[var(--text-muted)] focus:border-[#9e1b32] focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-hero)]"
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
                    className="flex w-full items-center justify-between px-2 text-[11px] font-bold tracking-wider uppercase text-[var(--text-muted)] hover:text-[var(--text-hero)] transition-colors"
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
                                ? 'bg-[#9e1b32]/10 border border-[#9e1b32] text-[#9e1b32] font-semibold shadow-xs'
                                : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-hero)]'
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
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-3">
            <span>Docs</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[var(--text-secondary)]">{activeDoc.category}</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#9e1b32] font-medium">{activeDoc.title}</span>
          </div>

          {/* Article Header */}
          <div className="pb-6 border-b border-[var(--border-color)]">
            <div className="flex items-center gap-3">
              <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-hero)]">
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
            <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl">
              {activeDoc.summary}
            </p>
          </div>

          {/* Article Body */}
          <div className="mt-8 space-y-8 text-sm sm:text-base text-[var(--text-primary)] leading-relaxed">
            {/* Overview */}
            <p className="whitespace-pre-line leading-relaxed">
              {activeDoc.content.overview}
            </p>

            {/* Notes / Callouts */}
            {activeDoc.content.notes?.map((note, idx) => (
              <div
                key={idx}
                className={`rounded-xl border p-4 text-xs sm:text-sm flex items-start gap-3 shadow-xs ${
                  note.type === 'tip'
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
                    : note.type === 'warning'
                    ? 'border-amber-300 bg-amber-50 text-amber-900'
                    : 'border-[#9e1b32]/30 bg-[#9e1b32]/10 text-[#701124]'
                }`}
              >
                <Info className="h-4 w-4 shrink-0 mt-0.5 text-[#9e1b32]" />
                <div>{note.text}</div>
              </div>
            ))}

            {/* Code Snippet Box (Dark Mocha Editor for maximum clarity) */}
            {activeDoc.content.codeSnippet && (
              <div className="rounded-2xl border border-[rgba(75,50,30,0.2)] bg-[#1e1713] overflow-hidden shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 bg-[#28201a] px-4 py-2.5 text-xs text-[#d8cab7]">
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
                    className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-[#362b23] px-2.5 py-1 text-[11px] font-medium text-[#f5ede1] hover:text-white transition-colors"
                  >
                    {copiedKey === 'main-snippet' ? (
                      <Check className="h-3 w-3 text-emerald-400" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                    <span>{copiedKey === 'main-snippet' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="p-4 sm:p-5 overflow-x-auto font-mono-code text-xs sm:text-sm text-rose-100 bg-[#16110d] leading-relaxed">
                  <code>{activeDoc.content.codeSnippet.code}</code>
                </pre>
              </div>
            )}

            {/* Payload / JSON Example */}
            {activeDoc.content.payloadExample && (
              <div className="space-y-3">
                <h3 className="font-serif-luxury text-xl font-bold text-[var(--text-hero)]">
                  {activeDoc.content.payloadExample.title}
                </h3>
                <div className="rounded-2xl border border-[rgba(75,50,30,0.2)] bg-[#1e1713] overflow-hidden shadow-xl">
                  <div className="flex items-center justify-between border-b border-white/10 bg-[#28201a] px-4 py-2 text-xs">
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
                      className="flex items-center gap-1.5 text-[11px] text-[#d8cab7]/70 hover:text-white"
                    >
                      {copiedKey === 'payload-snippet' ? (
                        <Check className="h-3 w-3 text-emerald-400" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                      <span>{copiedKey === 'payload-snippet' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="p-4 sm:p-5 overflow-x-auto font-mono-code text-xs sm:text-sm text-emerald-300 bg-[#16110d] leading-relaxed">
                    <code>{activeDoc.content.payloadExample.json}</code>
                  </pre>
                </div>
              </div>
            )}

            {/* Parameter & Fields Table */}
            {activeDoc.content.fields && activeDoc.content.fields.length > 0 && (
              <div className="space-y-4 pt-2">
                <h3 className="font-serif-luxury text-xl font-bold text-[var(--text-hero)]">
                  Important Fields & Parameters
                </h3>
                <div className="overflow-x-auto rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-xs">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-muted)]">
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
                    <tbody className="divide-y divide-[var(--border-color)] font-sans">
                      {activeDoc.content.fields.map((field) => (
                        <tr key={field.name} className="hover:bg-[var(--bg-card-hover)] transition-colors">
                          <td className="py-3 px-4 font-mono-code text-[#9e1b32] font-semibold whitespace-nowrap">
                            {field.name}
                            {field.required && (
                              <span className="ml-1 text-[10px] text-rose-600 font-bold">*</span>
                            )}
                          </td>
                          <td className="py-3 px-4 font-mono-code text-purple-700 text-xs whitespace-nowrap font-medium">
                            {field.type}
                          </td>
                          <td className="py-3 px-4 font-mono-code text-[var(--text-muted)] text-xs whitespace-nowrap">
                            {field.defaultVal || '—'}
                          </td>
                          <td className="py-3 px-4 text-[var(--text-secondary)] text-xs sm:text-sm">
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
                <h3 className="font-serif-luxury text-xl font-bold text-[var(--text-hero)]">
                  {sec.title}
                </h3>
                <p className="whitespace-pre-line text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {sec.body}
                </p>
                {sec.code && (
                  <pre className="p-4 rounded-xl border border-[rgba(75,50,30,0.2)] bg-[#1e1713] overflow-x-auto font-mono-code text-xs text-rose-200">
                    <code>{sec.code}</code>
                  </pre>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Pagination */}
          <div className="mt-14 pt-6 border-t border-[var(--border-color)] flex items-center justify-between">
            {prevDoc ? (
              <button
                onClick={() => {
                  setActiveDocId(prevDoc.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group flex flex-col items-start gap-1 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-3 text-left hover:border-[#9e1b32] transition-all shadow-xs"
              >
                <span className="flex items-center gap-1 text-[11px] text-[var(--text-muted)] group-hover:text-[#9e1b32]">
                  <ArrowLeft className="h-3 w-3" />
                  Previous
                </span>
                <span className="font-serif-luxury text-sm font-semibold text-[var(--text-hero)]">
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
                className="group flex flex-col items-end gap-1 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-3 text-right hover:border-[#9e1b32] transition-all shadow-xs"
              >
                <span className="flex items-center gap-1 text-[11px] text-[var(--text-muted)] group-hover:text-[#9e1b32]">
                  Next
                  <ArrowRight className="h-3 w-3" />
                </span>
                <span className="font-serif-luxury text-sm font-semibold text-[var(--text-hero)]">
                  {nextDoc.title}
                </span>
              </button>
            )}
          </div>
        </main>
      </div>

      {/* Cmd+K Search Modal */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-md">
          <div className="w-full max-w-xl rounded-2xl border border-[var(--border-hover)] bg-[var(--bg-card)] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
            <div className="relative border-b border-[var(--border-color)] p-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9e1b32]" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across all documentation..."
                className="w-full bg-transparent pl-8 pr-8 text-sm text-[var(--text-hero)] placeholder:text-[var(--text-muted)] focus:outline-none"
              />
              <button
                onClick={() => setSearchModalOpen(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-hero)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2 space-y-1 custom-scrollbar">
              {filteredItems.length === 0 ? (
                <div className="p-6 text-center text-xs text-[var(--text-muted)]">
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
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left hover:bg-[#9e1b32]/10 transition-colors"
                  >
                    <div>
                      <div className="font-medium text-xs text-[var(--text-hero)]">{item.title}</div>
                      <div className="text-[11px] text-[var(--text-muted)] line-clamp-1">{item.summary}</div>
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

            <div className="border-t border-[var(--border-color)] bg-[var(--bg-elevated)] px-4 py-2 text-[11px] text-[var(--text-muted)] flex items-center justify-between">
              <span>Navigation: Click to select</span>
              <kbd className="rounded border border-[var(--border-color)] bg-[var(--bg-card)] px-1.5 py-0.5 font-mono-code text-[10px]">ESC to close</kbd>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
