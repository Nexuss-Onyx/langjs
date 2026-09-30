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

// 1. Build Client ESM
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

// 2. Build Client CommonJS
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

// 4. Build Server ESM
esbuild.buildSync({
  entryPoints: ['src/sdk/server/index.ts'],
  outfile: path.join(distDir, 'server.js'),
  bundle: true,
  platform: 'node',
  format: 'esm',
  target: 'node18',
  sourcemap: true,
  minify: false,
});

// 5. Build Server CommonJS
esbuild.buildSync({
  entryPoints: ['src/sdk/server/index.ts'],
  outfile: path.join(distDir, 'server.cjs'),
  bundle: true,
  platform: 'node',
  format: 'cjs',
  target: 'node18',
  sourcemap: true,
  minify: false,
});

// 6. Write Client TypeScript declaration file
const dtsContent = `/**
 * @license MIT
 * @nexuss0781/langjs TypeScript Definitions
 */

export type SupportedLanguageCode = 
  | 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'nl' | 'ru' 
  | 'zh' | 'ja' | 'ko' | 'ar' | 'hi' | 'tr' | 'pl' | 'sv' 
  | 'am' | string;

export interface LangOptions {
  root?: HTMLElement | string;
  defaultLanguage?: string;
  currentLanguage?: string;
  languages?: string[];
  className?: string;
  storageKey?: string;
  autoDetect?: boolean;
  observeMutations?: boolean;
  overrides?: Record<string, Record<string, string>>;
  autoRTL?: boolean;
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

// 7. Write Server TypeScript declaration file
const serverDtsContent = `/**
 * @license MIT
 * @nexuss0781/langjs/server TypeScript Definitions
 */

export interface ScanOccurrence {
  file: string;
  line: number;
  snippet?: string;
}

export interface ExtractedCodebaseString {
  id: string;
  sourceText: string;
  occurrences: ScanOccurrence[];
  type: 'tag_text' | 'placeholder' | 'aria-label' | 'title' | 'alt';
}

export interface SideBySideRecord {
  id: string;
  source: string;
  type: string;
  occurrences: ScanOccurrence[];
  translations: Record<string, string>;
  verified: boolean;
  notes?: string;
  lastEditedBy?: string;
}

export interface LangJsonManifest {
  $schema?: string;
  meta: {
    generator: string;
    version: string;
    generatedAt: string;
    sourceLanguage: string;
    targetLanguages: string[];
    totalUniqueStrings: number;
    totalOccurrences: number;
  };
  locales: Record<string, Record<string, string>>;
  sideBySide: SideBySideRecord[];
}

export interface ScannerOptions {
  rootDir?: string;
  extensions?: string[];
  sourceLanguage?: string;
  targetLanguages?: string[];
  ignoreFiles?: string[];
  additionalIgnorePatterns?: string[];
  translateCallback?: (texts: string[], targetLang: string) => Promise<string[]>;
}

export declare class IgnoreRuleMatcher {
  constructor(baseDir?: string, ignoreFiles?: string[], extraPatterns?: string[]);
  shouldIgnore(relativePath: string): boolean;
}

export declare class UniversalTextExtractor {
  extract(content: string, filePath: string): ExtractedCodebaseString[];
  isValidTranslatableText(text: string): boolean;
}

export declare class CodebaseScanner {
  constructor(options?: ScannerOptions);
  collectFiles(dir?: string): string[];
  scanCodebase(): ExtractedCodebaseString[];
  generateLangJson(
    extractedStrings?: ExtractedCodebaseString[],
    targetLanguages?: string[]
  ): Promise<LangJsonManifest>;
  writeManifest(manifest: LangJsonManifest, outputPath?: string): string;
}

export interface ServerRuntimeOptions {
  manifestPath?: string;
  initialManifest?: LangJsonManifest;
  defaultLanguage?: string;
  supportedLanguages?: string[];
  autoPersistMissing?: boolean;
}

export declare class ServerTranslateRuntime {
  constructor(options?: ServerRuntimeOptions);
  loadManifest(filePath: string): boolean;
  getManifest(): LangJsonManifest | null;
  setManifest(manifest: LangJsonManifest): void;
  translateHtml(rawHtml: string, targetLang: string): string;
  persistCorrection(
    sourceText: string,
    targetLang: string,
    correctedTranslation: string,
    editedBy?: string
  ): boolean;
  createMiddleware(): (req: any, res: any, next: () => void) => void;
}
`;

fs.writeFileSync(path.join(distDir, 'server.d.ts'), serverDtsContent);

// Copy README and LICENSE
if (fs.existsSync('README.md')) {
  fs.copyFileSync('README.md', path.join(pkgDir, 'README.md'));
}
if (fs.existsSync('LICENSE')) {
  fs.copyFileSync('LICENSE', path.join(pkgDir, 'LICENSE'));
}

console.log('✅ Package build complete in pkg/dist (Client, Server, ESM, CJS, and Types)');
