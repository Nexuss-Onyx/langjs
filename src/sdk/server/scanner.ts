/**
 * @license MIT
 * LangJS Server-Side Codebase Scanner & File System Crawler
 * Traverses templates, HTML, Vue, JSX, TSX, Svelte, and Angular files,
 * respects .gitignore and .langignore, extracts all visible text,
 * and generates structured side-by-side lang/lang.json manifests.
 */

import fs from 'fs';
import path from 'path';

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

// Default list of file extensions containing UI templates/components
export const DEFAULT_TEMPLATE_EXTENSIONS = [
  '.html',
  '.htm',
  '.vue',
  '.svelte',
  '.jsx',
  '.tsx',
  '.astro',
  '.php',
  '.blade.php',
  '.ejs',
  '.njk',
  '.handlebars',
  '.hbs',
];

// Patterns that identify non-translatable code tokens
const CODE_BLACKLIST_REGEX = /^(import|export|const|let|var|function|return|class|interface|type|extends|implements|true|false|null|undefined|void|async|await|default|case|break|continue|new|typeof|instanceof|from|if|else|switch|try|catch|finally|throw|public|private|protected|static|readonly)$/;
const CSS_PROPERTY_REGEX = /^(px|rem|em|vh|vw|pt|cm|mm|auto|none|block|flex|grid|hidden|inherit|initial|unset|transparent|currentcolor|bold|normal|italic|center|left|right|justify|uppercase|lowercase|capitalize)$/i;
const HEX_COLOR_REGEX = /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
const URL_OR_PATH_REGEX = /^(https?:\/\/|\/api\/|\/assets\/|\/dist\/|mailto:|tel:|blob:|\.\/|\.\.\/|[a-z0-9_-]+\.(png|jpg|jpeg|gif|svg|webp|ico|css|js|ts|json)$)/i;

/**
 * Parses .gitignore and .langignore files into matcher patterns
 */
export class IgnoreRuleMatcher {
  private patterns: RegExp[] = [];

  constructor(baseDir: string = '.', ignoreFiles: string[] = ['.gitignore', '.langignore'], extraPatterns: string[] = []) {
    this.loadPatterns(baseDir, ignoreFiles, extraPatterns);
  }

  private loadPatterns(baseDir: string, ignoreFiles: string[], extraPatterns: string[]) {
    const rawLines: string[] = [...extraPatterns];

    // Always exclude critical system directories
    rawLines.push(
      'node_modules/**',
      'node_modules',
      '.git/**',
      '.git',
      '.next/**',
      '.nuxt/**',
      '.svelte-kit/**',
      '.astro/**',
      'dist/**',
      'build/**',
      'out/**',
      '*.lock',
      '*.log',
      'lang/lang.json',
      'lang/**'
    );

    for (const fileName of ignoreFiles) {
      const filePath = path.resolve(baseDir, fileName);
      if (fs.existsSync(filePath)) {
        try {
          const content = fs.readFileSync(filePath, 'utf-8');
          const lines = content.split('\n');
          for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed && !trimmed.startsWith('#')) {
              rawLines.push(trimmed);
            }
          }
        } catch (e) {
          // Ignore read errors
        }
      }
    }

    // Convert glob-like patterns to RegExps
    for (const pat of rawLines) {
      let regexStr = pat
        .replace(/\\/g, '/')
        .replace(/^\//, '')
        .replace(/\./g, '\\.')
        .replace(/\*\*/g, '___DOUBLE_STAR___')
        .replace(/\*/g, '[^/]*')
        .replace(/___DOUBLE_STAR___/g, '.*');

      if (pat.endsWith('/')) {
        regexStr = `(^|/)${regexStr.slice(0, -1)}(/|$)`;
      } else {
        regexStr = `(^|/)${regexStr}($|/)`;
      }

      try {
        this.patterns.push(new RegExp(regexStr));
      } catch {
        // Skip invalid regex
      }
    }
  }

  public shouldIgnore(relativePath: string): boolean {
    const normalized = relativePath.replace(/\\/g, '/');
    return this.patterns.some((re) => re.test(normalized));
  }
}

/**
 * Universal Template & Markup Text Extractor
 */
export class UniversalTextExtractor {
  /**
   * Extracts visible strings from a file's content based on extension
   */
  public extract(content: string, filePath: string): ExtractedCodebaseString[] {
    const results: Map<string, ExtractedCodebaseString> = new Map();
    const lines = content.split('\n');

    // 1. Tag Text: match text between > and <
    const tagTextRegex = />([^<>{}\n]+)</g;
    let match: RegExpExecArray | null;

    for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
      const lineStr = lines[lineIdx];
      const lineNum = lineIdx + 1;

      // Skip lines that are purely code imports, exports, comments
      const trimmedLine = lineStr.trim();
      if (
        trimmedLine.startsWith('//') ||
        trimmedLine.startsWith('/*') ||
        trimmedLine.startsWith('*') ||
        trimmedLine.startsWith('import ') ||
        trimmedLine.startsWith('export {') ||
        trimmedLine.startsWith('from ') ||
        trimmedLine.startsWith('<style') ||
        trimmedLine.startsWith('<script')
      ) {
        continue;
      }

      // Scan >text<
      while ((match = tagTextRegex.exec(lineStr)) !== null) {
        const raw = match[1];
        const cleaned = this.sanitizeText(raw);
        if (this.isValidTranslatableText(cleaned)) {
          this.recordString(results, cleaned, filePath, lineNum, 'tag_text');
        }
      }

      // Scan Translatable Attributes: placeholder, title, alt, aria-label
      const attrRegex = /\b(placeholder|title|alt|aria-label)\s*=\s*["']([^"']+)["']/gi;
      let attrMatch: RegExpExecArray | null;
      while ((attrMatch = attrRegex.exec(lineStr)) !== null) {
        const attrType = attrMatch[1].toLowerCase() as any;
        const attrVal = attrMatch[2];
        const cleaned = this.sanitizeText(attrVal);
        if (this.isValidTranslatableText(cleaned)) {
          this.recordString(results, cleaned, filePath, lineNum, attrType);
        }
      }

      // JSX text within curly quotes or plain JSX text lines: {"Hello World"} or 'Hello World'
      const jsxTextRegex = />\s*\{["'`]([^"'`{}]+)["'`]\}\s*</g;
      let jsxMatch: RegExpExecArray | null;
      while ((jsxMatch = jsxTextRegex.exec(lineStr)) !== null) {
        const cleaned = this.sanitizeText(jsxMatch[1]);
        if (this.isValidTranslatableText(cleaned)) {
          this.recordString(results, cleaned, filePath, lineNum, 'tag_text');
        }
      }
    }

    return Array.from(results.values());
  }

  private sanitizeText(raw: string): string {
    return raw
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, ' ')
      .trim();
  }

  public isValidTranslatableText(text: string): boolean {
    if (!text || text.length < 2) return false;
    // Skip if all digits, punctuation, or spaces
    if (/^[\d\s.,:;!?_#%&*+=\-|/\\()[\]{}<>]+$/.test(text)) return false;
    // Must contain at least one letter
    if (!/[a-zA-Z\u00C0-\u024F\u1200-\u137F\u4E00-\u9FFF\u3040-\u309F\u30A0-\u30FF\u0600-\u06FF]/.test(text)) return false;
    // Skip code keywords
    if (CODE_BLACKLIST_REGEX.test(text.toLowerCase())) return false;
    // Skip CSS units / values
    if (CSS_PROPERTY_REGEX.test(text)) return false;
    // Skip Hex colors
    if (HEX_COLOR_REGEX.test(text)) return false;
    // Skip URLs and asset paths
    if (URL_OR_PATH_REGEX.test(text)) return false;
    // Skip template expressions or JSX brackets
    if (text.startsWith('{') && text.endsWith('}')) return false;
    if (text.startsWith('{{') && text.endsWith('}}')) return false;
    if (text.startsWith('<%') && text.endsWith('%>')) return false;
    // Skip pure class names like "flex items-center text-sm"
    if (/^[a-z0-9_-]+(\s+[a-z0-9_-]+)*$/.test(text) && text.split(' ').some((w) => ['px', 'py', 'mt', 'mb', 'flex', 'text', 'bg', 'border'].some((p) => w.startsWith(p)))) {
      return false;
    }
    return true;
  }

  private recordString(
    map: Map<string, ExtractedCodebaseString>,
    text: string,
    file: string,
    line: number,
    type: ExtractedCodebaseString['type']
  ) {
    const slug = this.slugify(text);
    if (!map.has(text)) {
      map.set(text, {
        id: slug,
        sourceText: text,
        type,
        occurrences: [],
      });
    }
    const entry = map.get(text)!;
    // Avoid duplicate lines for same file
    if (!entry.occurrences.some((o) => o.file === file && o.line === line)) {
      entry.occurrences.push({ file, line });
    }
  }

  private slugify(text: string): string {
    const base = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '')
      .slice(0, 48);
    return base || `str_${Math.abs(this.hashCode(text))}`;
  }

  private hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return hash;
  }
}

/**
 * Main Codebase Scanner Engine
 */
export class CodebaseScanner {
  private options: Required<ScannerOptions>;
  private ignoreMatcher: IgnoreRuleMatcher;
  private extractor: UniversalTextExtractor;

  constructor(options: ScannerOptions = {}) {
    const rootDir = options.rootDir || '.';
    this.options = {
      rootDir,
      extensions: options.extensions || DEFAULT_TEMPLATE_EXTENSIONS,
      sourceLanguage: options.sourceLanguage || 'en',
      targetLanguages: options.targetLanguages || ['en', 'am', 'es', 'fr', 'ja', 'de', 'ar'],
      ignoreFiles: options.ignoreFiles || ['.gitignore', '.langignore'],
      additionalIgnorePatterns: options.additionalIgnorePatterns || [],
      translateCallback: options.translateCallback || (async (texts, lang) => texts),
    };

    this.ignoreMatcher = new IgnoreRuleMatcher(
      this.options.rootDir,
      this.options.ignoreFiles,
      this.options.additionalIgnorePatterns
    );
    this.extractor = new UniversalTextExtractor();
  }

  /**
   * Recursively crawls directories and collects matching template files
   */
  public collectFiles(dir: string = this.options.rootDir): string[] {
    const results: string[] = [];

    const walk = (currentDir: string) => {
      if (!fs.existsSync(currentDir)) return;
      const entries = fs.readdirSync(currentDir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(currentDir, entry.name);
        const relativePath = path.relative(this.options.rootDir, fullPath);

        // Check ignore rules
        if (this.ignoreMatcher.shouldIgnore(relativePath)) {
          continue;
        }

        if (entry.isDirectory()) {
          walk(fullPath);
        } else if (entry.isFile()) {
          const ext = path.extname(entry.name).toLowerCase();
          // Check for multi-part extensions like .blade.php
          const isMatch = this.options.extensions.some((expectedExt) =>
            entry.name.toLowerCase().endsWith(expectedExt)
          );
          if (isMatch) {
            results.push(relativePath);
          }
        }
      }
    };

    walk(dir);
    return results;
  }

  /**
   * Scans all collected files and returns deduplicated visible strings with occurrences
   */
  public scanCodebase(): ExtractedCodebaseString[] {
    const files = this.collectFiles();
    const globalStringMap: Map<string, ExtractedCodebaseString> = new Map();

    for (const relFile of files) {
      const fullPath = path.resolve(this.options.rootDir, relFile);
      try {
        const content = fs.readFileSync(fullPath, 'utf-8');
        const extracted = this.extractor.extract(content, relFile);

        for (const item of extracted) {
          if (!globalStringMap.has(item.sourceText)) {
            globalStringMap.set(item.sourceText, {
              ...item,
              occurrences: [...item.occurrences],
            });
          } else {
            const existing = globalStringMap.get(item.sourceText)!;
            for (const occ of item.occurrences) {
              if (!existing.occurrences.some((o) => o.file === occ.file && o.line === occ.line)) {
                existing.occurrences.push(occ);
              }
            }
          }
        }
      } catch (err) {
        // Skip unreadable files
      }
    }

    return Array.from(globalStringMap.values());
  }

  /**
   * Generates the structured side-by-side lang/lang.json manifest
   */
  public async generateLangJson(
    extractedStrings?: ExtractedCodebaseString[],
    targetLanguages?: string[]
  ): Promise<LangJsonManifest> {
    const strings = extractedStrings || this.scanCodebase();
    const targets = targetLanguages || this.options.targetLanguages;
    const sourceLang = this.options.sourceLanguage;

    // Ensure source language is always included
    const activeLanguages = Array.from(new Set([sourceLang, ...targets]));

    // Initialize locales map
    const locales: Record<string, Record<string, string>> = {};
    for (const lang of activeLanguages) {
      locales[lang] = {};
    }

    // Populate source language
    for (const item of strings) {
      locales[sourceLang][item.sourceText] = item.sourceText;
    }

    // Translate for other selected languages
    const textsToTranslate = strings.map((s) => s.sourceText);
    const sideBySide: SideBySideRecord[] = [];

    // Pre-populate translations dictionary per string
    const stringTranslations: Map<string, Record<string, string>> = new Map();
    for (const item of strings) {
      stringTranslations.set(item.sourceText, {
        [sourceLang]: item.sourceText,
      });
    }

    for (const targetLang of activeLanguages) {
      if (targetLang === sourceLang) continue;

      try {
        const translatedList = await this.options.translateCallback(textsToTranslate, targetLang);
        for (let i = 0; i < textsToTranslate.length; i++) {
          const original = textsToTranslate[i];
          const translated = translatedList[i] || original;
          locales[targetLang][original] = translated;
          stringTranslations.get(original)![targetLang] = translated;
        }
      } catch (e) {
        // Fallback to original text if translation fails
        for (const original of textsToTranslate) {
          locales[targetLang][original] = original;
          stringTranslations.get(original)![targetLang] = original;
        }
      }
    }

    // Build side-by-side records for easy human and AI review/correction
    let totalOccurrences = 0;
    for (const item of strings) {
      totalOccurrences += item.occurrences.length;
      sideBySide.push({
        id: item.id,
        source: item.sourceText,
        type: item.type,
        occurrences: item.occurrences,
        translations: stringTranslations.get(item.sourceText) || { [sourceLang]: item.sourceText },
        verified: false,
        notes: 'Extracted automatically from codebase. Editable by developer or AI agent.',
      });
    }

    const manifest: LangJsonManifest = {
      $schema: 'https://langjs.dev/schema/v1.json',
      meta: {
        generator: 'LangJS Server Scanner v1.1.0',
        version: '1.1.0',
        generatedAt: new Date().toISOString(),
        sourceLanguage: sourceLang,
        targetLanguages: activeLanguages,
        totalUniqueStrings: strings.length,
        totalOccurrences,
      },
      locales,
      sideBySide,
    };

    return manifest;
  }

  /**
   * Writes the manifest to disk (defaults to lang/lang.json)
   */
  public writeManifest(manifest: LangJsonManifest, outputPath: string = 'lang/lang.json'): string {
    const resolvedPath = path.resolve(this.options.rootDir, outputPath);
    const dir = path.dirname(resolvedPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(resolvedPath, JSON.stringify(manifest, null, 2), 'utf-8');
    return resolvedPath;
  }
}
