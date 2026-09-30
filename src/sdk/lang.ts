/**
 * @license
 * Langjs SDK - Main Client Runtime
 * Automatically identifies frontend text elements, classes them, generates lang/lang.json manifests,
 * and dynamically translates static applications into 100+ languages powered by Google Translate.
 */

import { DomCrawler } from './dom-crawler';
import { StorageManager } from './storage';
import { TranslateEngine } from './translate-engine';
import {
  LangOptions,
  ExtractedTextNode,
  LangManifest,
  LangEventType,
  LangEventListener,
} from './types';

export class LangJS {
  private options: Required<LangOptions>;
  private crawler: DomCrawler;
  private storage: StorageManager;
  private engine: TranslateEngine;
  private currentLanguage: string;
  private mutationObserver: MutationObserver | null = null;
  private listeners: Map<LangEventType, Set<LangEventListener>> = new Map();
  private isTranslating: boolean = false;
  private rtlLanguages = new Set(['ar', 'he', 'iw', 'fa', 'ur', 'yi', 'ps', 'sd', 'ug', 'ku']);
  private highlightEnabled: boolean = false;
  private lastLatencyMs: number = 0;

  constructor(options: LangOptions = {}) {
    this.options = {
      root: options.root || (typeof document !== 'undefined' ? document.body : (null as any)),
      defaultLanguage: options.defaultLanguage || 'en',
      currentLanguage: options.currentLanguage || options.defaultLanguage || 'en',
      languages: options.languages || ['en', 'es', 'fr', 'de', 'ja', 'ar', 'zh', 'ru', 'it', 'pt'],
      className: options.className || 'langjs-node',
      storageKey: options.storageKey || 'langjs_storage',
      autoDetect: options.autoDetect ?? false,
      observeMutations: options.observeMutations ?? false,
      overrides: options.overrides || {},
      autoRTL: options.autoRTL ?? true,
      translateApiEndpoint: options.translateApiEndpoint || '',
    };

    this.storage = new StorageManager(this.options.storageKey);
    this.crawler = new DomCrawler(this.options.className);
    this.engine = new TranslateEngine(this.storage, this.options.translateApiEndpoint);

    if (this.options.overrides) {
      this.engine.setOverrides(this.options.overrides);
    }

    let initialLang = this.storage.getSavedLanguage(this.options.defaultLanguage);
    if (this.options.autoDetect && typeof navigator !== 'undefined') {
      const browserLang = navigator.language?.split('-')[0];
      if (browserLang) {
        initialLang = browserLang;
      }
    }
    this.currentLanguage = initialLang;

    if (typeof document !== 'undefined') {
      this.init();
    }
  }

  public init(): this {
    const rootEl = this.getRootElement();
    if (!rootEl) return this;

    this.scan(rootEl);

    if (this.options.observeMutations && typeof MutationObserver !== 'undefined') {
      this.mutationObserver = new MutationObserver((mutations) => {
        let shouldRescan = false;
        for (const mut of mutations) {
          if (mut.type === 'childList' && mut.addedNodes.length > 0) {
            shouldRescan = true;
            break;
          }
        }
        if (shouldRescan && !this.isTranslating) {
          this.scan(rootEl);
          if (this.currentLanguage !== this.options.defaultLanguage) {
            this.setLanguage(this.currentLanguage);
          }
        }
      });

      this.mutationObserver.observe(rootEl, {
        childList: true,
        subtree: true,
      });
    }

    if (this.currentLanguage !== this.options.defaultLanguage) {
      this.setLanguage(this.currentLanguage);
    }

    this.emit('initialized', { language: this.currentLanguage });
    return this;
  }

  public scan(root?: HTMLElement | string): Map<string, ExtractedTextNode> {
    const target = root ? this.resolveElement(root) : this.getRootElement();
    if (!target) return new Map();

    const nodes = this.crawler.crawl(target);
    this.emit('scanned', { totalNodes: nodes.size });
    return nodes;
  }

  public extractDictionary(): LangManifest {
    const nodes = this.crawler.getTrackedNodes();
    const manifest: LangManifest = {
      meta: {
        version: '2.0.0',
        generatedAt: new Date().toISOString(),
        sourceLanguage: this.options.defaultLanguage,
        totalNodes: nodes.size,
        totalUniqueStrings: 0,
      },
      strings: {},
    };

    const uniqueMap = new Map<string, ExtractedTextNode>();
    nodes.forEach((node) => {
      if (!uniqueMap.has(node.originalText)) {
        uniqueMap.set(node.originalText, node);
      }
    });

    manifest.meta.totalUniqueStrings = uniqueMap.size;

    uniqueMap.forEach((node, text) => {
      const overrides = this.engine.getOverrides();
      const translations: Record<string, string> = {};

      this.options.languages.forEach((lang) => {
        if (lang === this.options.defaultLanguage) {
          translations[lang] = text;
        } else if (overrides[lang] && overrides[lang][text]) {
          translations[lang] = overrides[lang][text];
        } else {
          translations[lang] = '';
        }
      });

      manifest.strings[node.id] = {
        original: text,
        type: node.type,
        translations,
      };
    });

    this.storage.saveManifest(manifest);
    return manifest;
  }

  public exportJson(pretty: boolean = true): string {
    const manifest = this.extractDictionary();
    return JSON.stringify(manifest, null, pretty ? 2 : 0);
  }

  public downloadJson(filename: string = 'lang.json'): void {
    if (typeof document === 'undefined') return;
    const jsonStr = this.exportJson(true);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  public async setLanguage(targetLang: string): Promise<void> {
    if (this.isTranslating) return;
    this.isTranslating = true;
    const startTime = performance.now();

    this.emit('languageChanging', { from: this.currentLanguage, to: targetLang });

    const rootEl = this.getRootElement();
    if (rootEl) {
      this.crawler.crawl(rootEl);
    }

    const nodes = this.crawler.getTrackedNodes();
    const isRtl = this.rtlLanguages.has(targetLang);

    if (typeof document !== 'undefined') {
      document.documentElement.lang = targetLang;
      if (this.options.autoRTL) {
        document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
      }
    }

    if (targetLang === this.options.defaultLanguage) {
      nodes.forEach((node) => {
        if (node.type === 'text') {
          if (node.rawTextNode) {
            node.rawTextNode.nodeValue = node.originalText;
          } else {
            node.element.textContent = node.originalText;
          }
        } else if (node.type === 'placeholder') {
          node.element.setAttribute('placeholder', node.originalText);
        } else if (node.type === 'aria-label') {
          node.element.setAttribute('aria-label', node.originalText);
        } else if (node.type === 'title') {
          node.element.setAttribute('title', node.originalText);
        } else if (node.type === 'alt') {
          node.element.setAttribute('alt', node.originalText);
        }
      });
    } else {
      const textsToTranslate: string[] = [];
      nodes.forEach((node) => {
        textsToTranslate.push(node.originalText);
      });

      const translatedMap = await this.engine.translateBatch(
        textsToTranslate,
        targetLang,
        this.options.defaultLanguage
      );

      nodes.forEach((node) => {
        const translated = translatedMap[node.originalText];
        if (translated) {
          if (node.type === 'text') {
            if (node.rawTextNode) {
              node.rawTextNode.nodeValue = translated;
            } else {
              node.element.textContent = translated;
            }
          } else if (node.type === 'placeholder') {
            node.element.setAttribute('placeholder', translated);
          } else if (node.type === 'aria-label') {
            node.element.setAttribute('aria-label', translated);
          } else if (node.type === 'title') {
            node.element.setAttribute('title', translated);
          } else if (node.type === 'alt') {
            node.element.setAttribute('alt', translated);
          }
        }
      });
    }

    this.lastLatencyMs = Math.round(performance.now() - startTime);
    this.currentLanguage = targetLang;
    this.storage.saveLanguage(targetLang);
    this.isTranslating = false;

    this.emit('languageChanged', { 
      language: targetLang, 
      isRtl, 
      totalNodes: nodes.size,
      latencyMs: this.lastLatencyMs 
    });
  }

  public toggleHighlight(enable?: boolean): boolean {
    this.highlightEnabled = enable !== undefined ? enable : !this.highlightEnabled;
    if (typeof document !== 'undefined') {
      if (this.highlightEnabled) {
        document.body.classList.add('langjs-highlight-active');
      } else {
        document.body.classList.remove('langjs-highlight-active');
      }
    }
    return this.highlightEnabled;
  }

  public getLanguage(): string {
    return this.currentLanguage;
  }

  public getLatency(): number {
    return this.lastLatencyMs;
  }

  public override(overrides: Record<string, Record<string, string>>): this {
    this.engine.setOverrides(overrides);
    this.emit('overrideLoaded', overrides);
    if (this.currentLanguage !== this.options.defaultLanguage) {
      this.setLanguage(this.currentLanguage);
    }
    return this;
  }

  public on(event: LangEventType, listener: LangEventListener): this {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(listener);
    return this;
  }

  public off(event: LangEventType, listener: LangEventListener): this {
    this.listeners.get(event)?.delete(listener);
    return this;
  }

  private emit(event: LangEventType, data: any) {
    this.listeners.get(event)?.forEach((fn) => {
      try {
        fn(data);
      } catch (err) {
        console.error(`[LangJS] Error in listener for ${event}:`, err);
      }
    });
  }

  private getRootElement(): HTMLElement | null {
    if (typeof document === 'undefined') return null;
    return this.resolveElement(this.options.root);
  }

  private resolveElement(target: HTMLElement | string): HTMLElement | null {
    if (typeof target === 'string') {
      return document.querySelector(target) as HTMLElement;
    }
    return target || null;
  }

  public destroy(): void {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
      this.mutationObserver = null;
    }
    this.listeners.clear();
  }
}
