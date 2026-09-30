import React, { useState, useEffect, useRef } from 'react';
import { ALL_100_LANGUAGES } from './data/languages-100';
import { LangJS } from './sdk/lang';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LiveInteractiveDemo } from './components/LiveInteractiveDemo';
import { LanguageGrid } from './components/LanguageGrid';
import { SdkWorkbench } from './components/SdkWorkbench';
import { ArchitectureBento } from './components/ArchitectureBento';
import { CodePlayground } from './components/CodePlayground';
import { SwitcherCustomizer } from './components/SwitcherCustomizer';
import { PerformanceComparison } from './components/PerformanceComparison';
import { FaqSection } from './components/FaqSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { EarlyAccessModal } from './components/EarlyAccessModal';
import { FloatingLangEngineBar } from './components/FloatingLangEngineBar';

export default function App() {
  const [currentLang, setCurrentLang] = useState<string>('en');
  const [modalOpen, setModalOpen] = useState(false);
  const [totalNodes, setTotalNodes] = useState<number>(148);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [latencyMs, setLatencyMs] = useState<number>(8);
  const langInstanceRef = useRef<LangJS | null>(null);

  // Initialize global LangJS library to translate the entire landing page DOM
  useEffect(() => {
    const sdk = new LangJS({
      root: document.body,
      defaultLanguage: 'en',
      currentLanguage: 'en',
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
        },
        zh: {
          'Turn Any Static Website': '将任何静态网站',
          'into Multi-Lingual in Seconds': '数秒内转化为多语言站点',
          'Quick Install': '极速安装',
          'Get Started': '立即体验',
          'Architecture': '核心架构',
          'Live Sandbox': '在线演示',
        },
        ru: {
          'Turn Any Static Website': 'Превратите любой статический сайт',
          'into Multi-Lingual in Seconds': 'в многоязычный за считанные секунды',
          'Quick Install': 'Быстрая установка',
          'Get Started': 'Начать',
          'Architecture': 'Архитектура',
          'Live Sandbox': 'Интерактивная песочница',
        },
        hi: {
          'Turn Any Static Website': 'किसी भी स्टेटिक वेबसाइट को',
          'into Multi-Lingual in Seconds': 'सेकंडों में बहुभाषी बनाएं',
          'Quick Install': 'त्वरित स्थापना',
          'Get Started': 'शुरू करें',
          'Architecture': 'संरचना',
          'Live Sandbox': 'लाइव डेमो',
        }
      },
    });

    langInstanceRef.current = sdk;

    // Scan the live landing page DOM
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
  }, []);

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

  return (
    <div className="min-h-screen bg-[#090205] text-[#f6efe2] selection:bg-[#9e1b32] selection:text-white">
      {/* Navigation Bar */}
      <Navbar
        currentLang={currentLang as any}
        onLanguageChange={handleLanguageChange}
        onOpenEarlyAccess={() => setModalOpen(true)}
      />

      <main>
        {/* Hero Section with Burgundy Ambient Light & Visual Globe */}
        <Hero
          currentLang={currentLang as any}
          onOpenEarlyAccess={() => setModalOpen(true)}
          onScrollToSandbox={scrollToSandbox}
        />

        {/* Live Interactive Sandbox */}
        <LiveInteractiveDemo />

        {/* 100+ Global Languages Catalog & Search */}
        <LanguageGrid onSelectLanguage={handleLanguageChange} activeLanguage={currentLang} />

        {/* Live SDK Engine & Manifest Workbench */}
        <SdkWorkbench />

        {/* Architecture & Asymmetric Bento Grid */}
        <ArchitectureBento />

        {/* JavaScript API & Interactive Code Playground */}
        <CodePlayground />

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
    </div>
  );
}
