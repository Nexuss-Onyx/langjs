/**
 * @license
 * Langjs SDK - Storage and Persistence Manager
 */

import { LangManifest } from './types';

export class StorageManager {
  private storageKey: string;
  private memoryFallback: Map<string, string> = new Map();

  constructor(storageKey: string = 'langjs_storage') {
    this.storageKey = storageKey;
  }

  public getSavedLanguage(defaultLang: string): string {
    try {
      const saved = localStorage.getItem(`${this.storageKey}_lang`);
      return saved || defaultLang;
    } catch {
      return this.memoryFallback.get('lang') || defaultLang;
    }
  }

  public saveLanguage(lang: string): void {
    try {
      localStorage.setItem(`${this.storageKey}_lang`, lang);
    } catch {
      this.memoryFallback.set('lang', lang);
    }
  }

  public saveManifest(manifest: LangManifest): void {
    try {
      localStorage.setItem(`${this.storageKey}_manifest`, JSON.stringify(manifest));
    } catch {
      this.memoryFallback.set('manifest', JSON.stringify(manifest));
    }
  }

  public getManifest(): LangManifest | null {
    try {
      const raw = localStorage.getItem(`${this.storageKey}_manifest`);
      return raw ? JSON.parse(raw) : null;
    } catch {
      const mem = this.memoryFallback.get('manifest');
      return mem ? JSON.parse(mem) : null;
    }
  }

  public saveTranslationCache(cache: Record<string, Record<string, string>>): void {
    try {
      localStorage.setItem(`${this.storageKey}_cache`, JSON.stringify(cache));
    } catch {
      this.memoryFallback.set('cache', JSON.stringify(cache));
    }
  }

  public getTranslationCache(): Record<string, Record<string, string>> {
    try {
      const raw = localStorage.getItem(`${this.storageKey}_cache`);
      return raw ? JSON.parse(raw) : {};
    } catch {
      const mem = this.memoryFallback.get('cache');
      return mem ? JSON.parse(mem) : {};
    }
  }

  public clear(): void {
    try {
      localStorage.removeItem(`${this.storageKey}_lang`);
      localStorage.removeItem(`${this.storageKey}_manifest`);
      localStorage.removeItem(`${this.storageKey}_cache`);
    } catch {
      this.memoryFallback.clear();
    }
  }
}
