import esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';

const pkgDir = path.resolve('pkg');
const distDir = path.join(pkgDir, 'dist');

if (!fs.existsSync(pkgDir)) {
  fs.mkdirSync(pkgDir, { recursive: true });
}
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// 1. Build ESM
esbuild.buildSync({
  entryPoints: ['src/sdk/index.ts'],
  outfile: path.join(distDir, 'index.js'),
  bundle: true,
  format: 'esm',
  target: 'es2020',
  sourcemap: true,
  minify: true,
  external: ['react', 'react-dom'],
});

// 2. Build CommonJS
esbuild.buildSync({
  entryPoints: ['src/sdk/index.ts'],
  outfile: path.join(distDir, 'index.cjs'),
  bundle: true,
  format: 'cjs',
  target: 'es2020',
  sourcemap: true,
  minify: true,
  external: ['react', 'react-dom'],
});

// 3. Build Browser Global IIFE (lang.min.js)
esbuild.buildSync({
  entryPoints: ['src/sdk/index.ts'],
  outfile: path.join(distDir, 'lang.min.js'),
  bundle: true,
  format: 'iife',
  globalName: 'LangJS',
  target: 'es2018',
  sourcemap: true,
  minify: true,
  external: ['react', 'react-dom'],
});

// 4. Write pristine, comprehensive TypeScript declaration file
const dtsContent = `/**
 * @license MIT
 * @nexuss0781/langjs TypeScript Definitions
 */

export type SupportedLanguageCode = 
  | 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'nl' | 'ru' 
  | 'zh' | 'ja' | 'ko' | 'ar' | 'hi' | 'tr' | 'pl' | 'sv' 
  | string;

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
  /** Whether to observe dynamic DOM mutations (defaults to false) */
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

export declare class LangJS {
  constructor(options?: LangOptions);
  scan(targetRoot?: HTMLElement | string): ExtractedTextNode[];
  setLanguage(language: string): Promise<boolean>;
  getLanguage(): string;
  getDefaultLanguage(): string;
  getSupportedLanguages(): string[];
  isTranslating(): boolean;
  getLastLatency(): number;
  extractDictionary(): LangManifest;
  downloadJson(filename?: string): void;
  override(dict: Record<string, Record<string, string>>): void;
  loadOverridesFromJson(urlOrJson: string | object): Promise<void>;
  toggleHighlight(): boolean;
  startObserving(): void;
  stopObserving(): void;
  on(event: LangEventType, listener: LangEventListener): () => void;
  destroy(): void;
}

export declare function createLangJS(options?: LangOptions): LangJS;

export declare function useLangJS(options?: LangOptions): {
  lang: LangJS | null;
  currentLang: string;
  isTranslating: boolean;
  manifest: LangManifest | null;
  setLanguage: (lang: string) => Promise<void>;
  extractManifest: () => LangManifest | null;
  downloadJson: (filename?: string) => void;
  override: (dict: Record<string, Record<string, string>>) => void;
};

export default LangJS;
`;

fs.writeFileSync(path.join(distDir, 'index.d.ts'), dtsContent);

// Copy README and LICENSE
if (fs.existsSync('README.md')) {
  fs.copyFileSync('README.md', path.join(pkgDir, 'README.md'));
}
if (fs.existsSync('LICENSE')) {
  fs.copyFileSync('LICENSE', path.join(pkgDir, 'LICENSE'));
}

console.log('✅ Package build complete in pkg/dist (ESM, CJS, IIFE, and Types)');
