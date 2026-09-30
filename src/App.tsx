import React, { useState, useEffect, useRef } from 'react';
import { ALL_100_LANGUAGES } from './data/languages-100';
import { LangJS } from './sdk/lang';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LiveInteractiveDemo } from './components/LiveInteractiveDemo';
import { LanguageGrid } from './components/LanguageGrid';
import { ArchitectureBento } from './components/ArchitectureBento';
import { SwitcherCustomizer } from './components/SwitcherCustomizer';
import { PerformanceComparison } from './components/PerformanceComparison';
import { FaqSection } from './components/FaqSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { EarlyAccessModal } from './components/EarlyAccessModal';
import { FloatingLangEngineBar } from './components/FloatingLangEngineBar';
import { GitHubPushModal } from './components/GitHubPushModal';
import { DocsPage } from './docs/DocsPage';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'docs'>('home');
  const [currentLang, setCurrentLang] = useState<string>('en');
  const [modalOpen, setModalOpen] = useState(false);
  const [gitHubModalOpen, setGitHubModalOpen] = useState(false);
  const [totalNodes, setTotalNodes] = useState<number>(148);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [latencyMs, setLatencyMs] = useState<number>(8);
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
          'Live Sandbox': 'Demo en Vivo',
        },
        fr: {
          'Turn Any Static Website': 'Transformez N’importe Quel Site Statique',
          'into Multi-Lingual in Seconds': 'en Multilingue en Quelques Secondes',
          'Quick Install': 'Installation Rapide',
          'Get Started': 'Commencer',
          'Architecture': 'Architecture',
          'Live Sandbox': 'Bac à Sable',
        },
        de: {
          'Turn Any Static Website': 'Verwandeln Sie Jede Statische Website',
          'into Multi-Lingual in Seconds': 'Sekundenschnell in Mehrsprachig',
          'Quick Install': 'Schnellinstallation',
          'Get Started': 'Loslegen',
          'Architecture': 'Architektur',
          'Live Sandbox': 'Live-Demo',
        },
        ja: {
          'Turn Any Static Website': 'あらゆる静的ウェブサイトを',
          'into Multi-Lingual in Seconds': '瞬時に多言語サイトへ',
          'Quick Install': 'クイックインストール',
          'Get Started': '使ってみる',
          'Architecture': 'アーキテクチャ',
          'Live Sandbox': 'ライブデモ',
        },
        ar: {
          'Turn Any Static Website': 'حوّل أي موقع إلكتروني ثابت',
          'into Multi-Lingual in Seconds': 'إلى لغات متعددة في ثوانٍ',
          'Quick Install': 'تثبيت سريع',
          'Get Started': 'ابدأ الآن',
          'Architecture': 'البنية الهندسية',
          'Live Sandbox': 'تجربة حية',
        }
      },
    });

    langInstanceRef.current = sdk;

    // Initial scan
    const tracked = sdk.scan();
    setTotalNodes(tracked.size || 148);

    sdk.on('languageChanging', () => setIsTranslating(true));
    sdk.on('languageChanged', (evt) => {
      setIsTranslating(false);
      setCurrentLang(evt.language);
      if (evt.totalNodes) setTotalNodes(evt.totalNodes);
      if (evt.latencyMs) setLatencyMs(evt.latencyMs);
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

  const handleToggleHighlight = () => {
    if (langInstanceRef.current) {
      return langInstanceRef.current.toggleHighlight();
    }
    return false;
  };

  const handleDownloadManifest = () => {
    if (langInstanceRef.current) {
      langInstanceRef.current.downloadJson('landing-page-manifest.json');
    }
  };

  const scrollToSandbox = () => {
    const el = document.getElementById('sandbox');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If on Documentation view, render dedicated DocsPage
  if (currentView === 'docs') {
    return (
      <DocsPage
        onBackToHome={() => navigateTo('home')}
      />
    );
  }

  // Welcoming Landing Page
  return (
    <div className="min-h-screen bg-[#090205] text-[#f6efe2] selection:bg-[#9e1b32] selection:text-white">
      {/* Navigation Bar */}
      <Navbar
        currentLang={currentLang as any}
        onLanguageChange={handleLanguageChange}
        onOpenEarlyAccess={() => setModalOpen(true)}
        onOpenGitHub={() => setGitHubModalOpen(true)}
        onNavigateToDocs={() => navigateTo('docs')}
      />

      <main>
        {/* Welcoming Hero Section with Burgundy Ambient Light & Visual Globe */}
        <Hero
          currentLang={currentLang as any}
          onOpenEarlyAccess={() => setModalOpen(true)}
          onScrollToSandbox={scrollToSandbox}
          onNavigateToDocs={() => navigateTo('docs')}
        />

        {/* Live Interactive Sandbox */}
        <LiveInteractiveDemo />

        {/* 100+ Global Languages Catalog & Search */}
        <LanguageGrid onSelectLanguage={handleLanguageChange} activeLanguage={currentLang} />

        {/* Architecture & Asymmetric Bento Grid */}
        <ArchitectureBento />

        {/* Switcher Button Customizer & Live Generator */}
        <SwitcherCustomizer />

        {/* Quantitative Comparison & Benchmarks */}
        <PerformanceComparison />

        {/* FAQ Section */}
        <FaqSection />

        {/* Call to Action Section */}
        <CtaSection onOpenEarlyAccess={() => setModalOpen(true)} />
      </main>

      {/* 3-Zone Footer */}
      <Footer
        currentLang={currentLang as any}
        onLanguageChange={handleLanguageChange}
        onNavigateToDocs={() => navigateTo('docs')}
      />

      {/* Floating Live LangJS Engine Status & 100+ Selector Bar */}
      <FloatingLangEngineBar
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        onToggleHighlight={handleToggleHighlight}
        onDownloadManifest={handleDownloadManifest}
        totalTrackedNodes={totalNodes}
        isTranslating={isTranslating}
        latencyMs={latencyMs}
      />

      {/* Developer Starter / Early Access Modal */}
      <EarlyAccessModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      {/* GitHub Repository Push Modal */}
      <GitHubPushModal
        isOpen={gitHubModalOpen}
        onClose={() => setGitHubModalOpen(false)}
      />
    </div>
  );
}
