/**
 * @license
 * Langjs SDK - Neural Translation Engine with Google Translate API & Fallback
 */

import { StorageManager } from './storage';

export class TranslateEngine {
  private storage: StorageManager;
  private memoryCache: Record<string, Record<string, string>> = {};
  private customOverrides: Record<string, Record<string, string>> = {};
  private apiEndpoint?: string;

  constructor(storage: StorageManager, apiEndpoint?: string) {
    this.storage = storage;
    this.apiEndpoint = apiEndpoint;
    this.memoryCache = this.storage.getTranslationCache();
  }

  public setOverrides(overrides: Record<string, Record<string, string>>) {
    this.customOverrides = { ...this.customOverrides, ...overrides };
  }

  public addOverride(lang: string, original: string, translation: string) {
    if (!this.customOverrides[lang]) {
      this.customOverrides[lang] = {};
    }
    this.customOverrides[lang][original] = translation;
  }

  public getOverrides(): Record<string, Record<string, string>> {
    return this.customOverrides;
  }

  /**
   * Translates a single phrase via Overrides -> Cache -> Google Translate API
   */
  public async translateText(
    text: string,
    targetLang: string,
    sourceLang: string = 'en'
  ): Promise<string> {
    if (!text || targetLang === sourceLang) return text;

    const trimmed = text.trim();

    // 1. Check custom user overrides (Highest Priority)
    if (this.customOverrides[targetLang] && this.customOverrides[targetLang][trimmed]) {
      return this.customOverrides[targetLang][trimmed];
    }

    // 2. Check translation cache
    if (this.memoryCache[targetLang] && this.memoryCache[targetLang][trimmed]) {
      return this.memoryCache[targetLang][trimmed];
    }

    // 3. Query Google Translate Neural API (100+ Languages)
    try {
      const endpoints = [
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(trimmed)}`,
        `https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=auto&tl=${targetLang}&q=${encodeURIComponent(trimmed)}`
      ];

      for (const url of endpoints) {
        try {
          const res = await fetch(url);
          if (res.ok) {
            const data = await res.json();
            let translated = '';
            if (Array.isArray(data)) {
              if (Array.isArray(data[0])) {
                translated = data[0].map((item: any) => (Array.isArray(item) ? item[0] : item)).join('');
              } else if (typeof data[0] === 'string') {
                translated = data[0];
              }
            } else if (typeof data === 'string') {
              translated = data;
            }

            if (translated && translated.trim().length > 0) {
              this.cacheTranslation(targetLang, trimmed, translated);
              return translated;
            }
          }
        } catch {
          // Continue to next endpoint or fallback
        }
      }
    } catch {
      // Handled by dictionary fallback below
    }

    // 4. Intelligent Fallback for standard UI words if offline/blocked
    const fallback = this.getDictionaryFallback(trimmed, targetLang);
    if (fallback) {
      this.cacheTranslation(targetLang, trimmed, fallback);
      return fallback;
    }

    return text;
  }

  /**
   * Batch translates an array of texts in parallel
   */
  public async translateBatch(
    texts: string[],
    targetLang: string,
    sourceLang: string = 'en'
  ): Promise<Record<string, string>> {
    const results: Record<string, string> = {};
    const unique = Array.from(new Set(texts));

    await Promise.all(
      unique.map(async (text) => {
        results[text] = await this.translateText(text, targetLang, sourceLang);
      })
    );

    return results;
  }

  private cacheTranslation(lang: string, original: string, translation: string) {
    if (!this.memoryCache[lang]) {
      this.memoryCache[lang] = {};
    }
    this.memoryCache[lang][original] = translation;
    this.storage.saveTranslationCache(this.memoryCache);
  }

  private getDictionaryFallback(text: string, lang: string): string | null {
    const commonDictionary: Record<string, Record<string, string>> = {
      es: {
        'Home': 'Inicio',
        'Features': 'Características',
        'About': 'Acerca de',
        'Contact': 'Contacto',
        'Get Started': 'Comenzar',
        'Documentation': 'Documentación',
        'Pricing': 'Precios',
        'Sign In': 'Iniciar Sesión',
        'Submit': 'Enviar',
        'Search': 'Buscar',
      },
      fr: {
        'Home': 'Accueil',
        'Features': 'Fonctionnalités',
        'About': 'À propos',
        'Contact': 'Contact',
        'Get Started': 'Commencer',
        'Documentation': 'Documentation',
        'Pricing': 'Tarifs',
        'Sign In': 'Connexion',
        'Submit': 'Envoyer',
        'Search': 'Rechercher',
      },
      de: {
        'Home': 'Startseite',
        'Features': 'Funktionen',
        'About': 'Über uns',
        'Contact': 'Kontakt',
        'Get Started': 'Loslegen',
        'Documentation': 'Dokumentation',
        'Pricing': 'Preise',
        'Sign In': 'Anmelden',
        'Submit': 'Absenden',
        'Search': 'Suchen',
      },
      ja: {
        'Home': 'ホーム',
        'Features': '機能',
        'About': '概要',
        'Contact': 'お問い合わせ',
        'Get Started': '使ってみる',
        'Documentation': 'ドキュメント',
        'Pricing': '料金',
        'Sign In': 'ログイン',
        'Submit': '送信',
        'Search': '検索',
      },
      ar: {
        'Home': 'الرئيسية',
        'Features': 'المميزات',
        'About': 'من نحن',
        'Contact': 'اتصل بنا',
        'Get Started': 'ابدأ الآن',
        'Documentation': 'التوثيق',
        'Pricing': 'الأسعار',
        'Sign In': 'تسجيل الدخول',
        'Submit': 'إرسال',
        'Search': 'بحث',
      },
    };

    return commonDictionary[lang]?.[text] || null;
  }
}
