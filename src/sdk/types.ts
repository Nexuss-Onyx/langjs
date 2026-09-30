/**
 * @license
 * Langjs SDK - Types and Interfaces
 */

export type SupportedLanguageCode = 
  | 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'nl' | 'ru' 
  | 'zh' | 'ja' | 'ko' | 'ar' | 'hi' | 'tr' | 'pl' | 'sv';

export interface LangOptions {
  /** Target root element to scan (defaults to document.body) */
  root?: HTMLElement | string;
  /** Default source language of the website (defaults to 'en') */
  defaultLanguage?: string;
  /** Current active language */
  currentLanguage?: string;
  /** Array of supported languages */
  languages?: string[];
  /** Custom class name added to scanned elements (defaults to 'langjs-node') */
  className?: string;
  /** Storage key for persistence (defaults to 'langjs_storage') */
  storageKey?: string;
  /** Whether to automatically detect browser language (defaults to false) */
  autoDetect?: boolean;
  /** Whether to observe dynamic DOM mutations (defaults to true) */
  observeMutations?: boolean;
  /** Custom overrides dictionary or path to JSON */
  overrides?: Record<string, Record<string, string>>;
  /** Automatically manage document.documentElement.dir for RTL languages */
  autoRTL?: boolean;
  /** Custom API endpoint for Google Translate / Neural proxy (optional) */
  translateApiEndpoint?: string;
}

export interface ExtractedTextNode {
  id: string;
  originalText: string;
  element: HTMLElement;
  rawTextNode?: Node;
  type: 'text' | 'placeholder' | 'aria-label' | 'title' | 'alt' | 'value';
  tagName: string;
  xpath?: string;
}

export interface LangManifest {
  meta: {
    version: string;
    generatedAt: string;
    sourceLanguage: string;
    totalNodes: number;
    totalUniqueStrings: number;
  };
  strings: Record<string, {
    original: string;
    type: string;
    translations: Record<string, string>;
  }>;
}

export type LangEventType = 
  | 'initialized'
  | 'scanned'
  | 'languageChanging'
  | 'languageChanged'
  | 'overrideLoaded'
  | 'error';

export type LangEventListener = (data: any) => void;
