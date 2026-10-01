import React, { useState, useEffect, useRef } from 'react';
import { ALL_100_LANGUAGES } from './data/languages-100';
import { LangJS } from './sdk/lang';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LanguageGrid } from './components/LanguageGrid';
import { ArchitectureBento } from './components/ArchitectureBento';
import { ServerStudioSection } from './components/ServerStudioSection';
import { SwitcherCustomizer } from './components/SwitcherCustomizer';
import { PerformanceComparison } from './components/PerformanceComparison';
import { FaqSection } from './components/FaqSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { GitHubPushModal } from './components/GitHubPushModal';
import { DocsPage } from './docs/DocsPage';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'docs'>('home');
  const [docsInitialId, setDocsInitialId] = useState<string>('welcome');
  const [currentLang, setCurrentLang] = useState<string>('en');
  const [gitHubModalOpen, setGitHubModalOpen] = useState(false);
  const langInstanceRef = useRef<LangJS | null>(null);

  // Check URL pathname or hash on load
  useEffect(() => {
    const syncRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/docs' || path.startsWith('/docs') || hash === '#docs' || hash.startsWith('#docs')) {
        setCurrentView('docs');
      } else {
        setCurrentView('home');
      }
    };

    syncRoute();
    window.addEventListener('popstate', syncRoute);
    return () => window.removeEventListener('popstate', syncRoute);
  }, []);

  const navigateTo = (view: 'home' | 'docs') => {
    setCurrentView(view);
    if (view === 'docs') {
      window.history.pushState(null, '', '/docs');
    } else {
      window.history.pushState(null, '', '/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openDocs = (docId: string = 'welcome') => {
    setDocsInitialId(docId);
    navigateTo('docs');
  };

  // Initialize global LangJS library on the landing page
  useEffect(() => {
    if (currentView !== 'home') return;

    const sdk = new LangJS({
      root: document.body,
      defaultLanguage: 'en',
      currentLanguage: currentLang,
      languages: ALL_100_LANGUAGES.map((l) => l.code),
      autoRTL: true,
      overrides: {
        es: {
          'Turn Any Static Website': 'Transforma Cualquier Sitio Estático',
          'into Multi-Lingual in Seconds': 'en Multilingüe en Segundos',
          'Quick Install': 'Instalación Rápida',
          'Get Started': 'Comenzar',
          'Architecture': 'Arquitectura',
        },
        fr: {
          'Turn Any Static Website': 'Transformez N’importe Quel Site Statique',
          'into Multi-Lingual in Seconds': 'en Multilingue en Quelques Secondes',
          'Quick Install': 'Installation Rapide',
          'Get Started': 'Commencer',
          'Architecture': 'Architecture',
        },
        de: {
          'Turn Any Static Website': 'Verwandeln Sie Jede Statische Website',
          'into Multi-Lingual in Seconds': 'Sekundenschnell in Mehrsprachig',
          'Quick Install': 'Schnellinstallation',
          'Get Started': 'Loslegen',
          'Architecture': 'Architektur',
        },
        ja: {
          'Turn Any Static Website': 'あらゆる静的ウェブサイトを',
          'into Multi-Lingual in Seconds': '瞬時に多言語サイトへ',
          'Quick Install': 'クイックインストール',
          'Get Started': '使ってみる',
          'Architecture': 'アーキテクチャ',
        },
        ar: {
          'Turn Any Static Website': 'حوّل أي موقع إلكتروني ثابت',
          'into Multi-Lingual in Seconds': 'إلى لغات متعددة في ثوانٍ',
          'Quick Install': 'تثبيت سريع',
          'Get Started': 'ابدأ الآن',
          'Architecture': 'البنية الهندسية',
        }
      },
    });

    langInstanceRef.current = sdk;

    // Initial scan
    sdk.scan();

    sdk.on('languageChanged', (evt) => {
      setCurrentLang(evt.language);
    });

    return () => {
      sdk.destroy();
    };
  }, [currentView]);

  const handleLanguageChange = async (langCode: string) => {
    setCurrentLang(langCode);
    if (langInstanceRef.current) {
      await langInstanceRef.current.setLanguage(langCode);
    }
  };

  // If on Documentation view, render dedicated DocsPage
  if (currentView === 'docs') {
    return (
      <DocsPage
        onBackToHome={() => navigateTo('home')}
        initialDocId={docsInitialId}
      />
    );
  }

  // Welcoming Landing Page
  return (
    <div className="relative min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] selection:bg-[#9e1b32] selection:text-white transition-colors duration-300 overflow-x-hidden">
      {/* Architectural Background Ambient Elements (Non-destructive, cool & professional) */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-tech-dots opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_90%)]" />
      <div className="pointer-events-none fixed -top-40 right-[-10%] h-[600px] w-[600px] rounded-full bg-gradient-to-br from-[#9e1b32]/10 via-[#dfd3c3]/15 to-transparent blur-[140px] z-0" />
      <div className="pointer-events-none fixed top-1/2 left-[-15%] h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-[#9e1b32]/8 via-amber-700/5 to-transparent blur-[150px] z-0" />

      {/* Navigation Bar */}
      <Navbar
        currentLang={currentLang as any}
        onLanguageChange={handleLanguageChange}
        onOpenGitHub={() => setGitHubModalOpen(true)}
        onNavigateToDocs={() => openDocs('welcome')}
        onNavigateToAiSkill={() => openDocs('ai-skill')}
      />

      <main className="relative z-10">
        {/* Welcoming Hero Section */}
        <Hero
          currentLang={currentLang as any}
          onNavigateToDocs={() => openDocs('welcome')}
          onNavigateToAiSkill={() => openDocs('ai-skill')}
        />

        <div className="max-w-7xl mx-auto px-6">
          <div className="section-beam-divider" />
        </div>

        {/* 100+ Global Languages Catalog & Search */}
        <LanguageGrid onSelectLanguage={handleLanguageChange} activeLanguage={currentLang} />

        <div className="max-w-7xl mx-auto px-6">
          <div className="section-beam-divider" />
        </div>

        {/* Architecture & Asymmetric Bento Grid */}
        <ArchitectureBento />

        <div className="max-w-7xl mx-auto px-6">
          <div className="section-beam-divider" />
        </div>

        {/* Server-Side Scanner & Studio */}
        <ServerStudioSection />

        <div className="max-w-7xl mx-auto px-6">
          <div className="section-beam-divider" />
        </div>

        {/* Switcher Button Customizer & Standalone Generator */}
        <SwitcherCustomizer />

        <div className="max-w-7xl mx-auto px-6">
          <div className="section-beam-divider" />
        </div>

        {/* Quantitative Comparison & Benchmarks */}
        <PerformanceComparison />

        {/* FAQ Section */}
        <FaqSection />

        {/* Call to Action Section */}
        <CtaSection onNavigateToDocs={() => navigateTo('docs')} />
      </main>

      {/* 3-Zone Footer */}
      <Footer
        currentLang={currentLang as any}
        onLanguageChange={handleLanguageChange}
        onNavigateToDocs={() => navigateTo('docs')}
      />

      {/* GitHub Repository Push Modal */}
      <GitHubPushModal
        isOpen={gitHubModalOpen}
        onClose={() => setGitHubModalOpen(false)}
      />
    </div>
  );
}
