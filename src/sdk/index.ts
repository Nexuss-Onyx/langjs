/**
 * @license
 * Langjs SDK - Main Entry Point
 */

import { useState, useEffect, useRef } from 'react';
import { LangJS } from './lang';
import { LangOptions, LangManifest } from './types';

export * from './types';
export * from './lang';
export * from './dom-crawler';
export * from './translate-engine';
export * from './storage';

/**
 * Factory helper to instantiate LangJS
 */
export function createLangJS(options?: LangOptions): LangJS {
  return new LangJS(options);
}

/**
 * React Hook for seamless SDK integration
 */
export function useLangJS(options?: LangOptions) {
  const [currentLang, setCurrentLang] = useState<string>(options?.defaultLanguage || 'en');
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [manifest, setManifest] = useState<LangManifest | null>(null);
  const langInstanceRef = useRef<LangJS | null>(null);

  useEffect(() => {
    const instance = new LangJS(options);
    langInstanceRef.current = instance;

    instance.on('languageChanging', () => setIsTranslating(true));
    instance.on('languageChanged', (evt) => {
      setIsTranslating(false);
      setCurrentLang(evt.language);
    });

    return () => {
      instance.destroy();
    };
  }, []);

  const setLanguage = async (lang: string) => {
    if (langInstanceRef.current) {
      await langInstanceRef.current.setLanguage(lang);
    }
  };

  const extractManifest = () => {
    if (langInstanceRef.current) {
      const generated = langInstanceRef.current.extractDictionary();
      setManifest(generated);
      return generated;
    }
    return null;
  };

  const downloadJson = (filename?: string) => {
    if (langInstanceRef.current) {
      langInstanceRef.current.downloadJson(filename);
    }
  };

  const override = (dict: Record<string, Record<string, string>>) => {
    if (langInstanceRef.current) {
      langInstanceRef.current.override(dict);
    }
  };

  return {
    lang: langInstanceRef.current,
    currentLang,
    isTranslating,
    manifest,
    setLanguage,
    extractManifest,
    downloadJson,
    override,
  };
}

export default LangJS;
