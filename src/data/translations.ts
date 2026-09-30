export type SupportedLanguage = 'en' | 'es' | 'fr' | 'de' | 'ja' | 'ar';

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  dir: 'ltr' | 'rtl';
}

export const LANGUAGES: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', dir: 'ltr' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl' },
];

export interface TranslationDictionary {
  [key: string]: {
    en: string;
    es: string;
    fr: string;
    de: string;
    ja: string;
    ar: string;
  };
}

export const DICTIONARY: TranslationDictionary = {
  nav_architecture: {
    en: 'Architecture',
    es: 'Arquitectura',
    fr: 'Architecture',
    de: 'Architektur',
    ja: 'アーキテクチャ',
    ar: 'البنية الهندسية',
  },
  nav_demo: {
    en: 'Live Sandbox',
    es: 'Demo en Vivo',
    fr: 'Démonstration',
    de: 'Live-Demo',
    ja: 'ライブデモ',
    ar: 'تجربة حية',
  },
  nav_api: {
    en: 'API & Code',
    es: 'API y Código',
    fr: 'API et Code',
    de: 'API & Code',
    ja: 'APIとコード',
    ar: 'واجهة البرمجة',
  },
  nav_overrides: {
    en: 'Custom Overrides',
    es: 'Sobrescrituras JSON',
    fr: 'Remplacements JSON',
    de: 'JSON-Überschreibungen',
    ja: 'カスタム辞書',
    ar: 'تخصيص الترجمة',
  },
  nav_get_started: {
    en: 'Get Started',
    es: 'Comenzar Ahora',
    fr: 'Commencer',
    de: 'Loslegen',
    ja: '使ってみる',
    ar: 'ابدأ الآن',
  },
  hero_badge: {
    en: 'Langjs 2.0 Engine · Zero-Config Static DOM Localization',
    es: 'Motor Langjs 2.0 · Localización DOM Estática Sin Configuración',
    fr: 'Moteur Langjs 2.0 · Traduction Statique Sans Configuration',
    de: 'Langjs 2.0 Engine · Zero-Config Statische DOM-Lokalisierung',
    ja: 'Langjs 2.0 エンジン · 静的サイトの自動多言語化',
    ar: 'محرك Langjs 2.0 · ترجمة فورية للمواقع الثابتة بدون إعدادات',
  },
  hero_title_1: {
    en: 'Turn Any Static Website',
    es: 'Transforma Cualquier Sitio Estático',
    fr: 'Transformez N’importe Quel Site Statique',
    de: 'Verwandeln Sie Jede Statische Website',
    ja: 'あらゆる静的ウェブサイトを',
    ar: 'حوّل أي موقع إلكتروني ثابت',
  },
  hero_title_2: {
    en: 'into Multi-Lingual in Seconds',
    es: 'en Multilingüe en Segundos',
    fr: 'en Multilingue en Quelques Secondes',
    de: 'Sekundenschnell in Mehrsprachig',
    ja: '瞬時に多言語サイトへ',
    ar: 'إلى لغات متعددة في ثوانٍ',
  },
  hero_subtitle: {
    en: 'Langjs scans your frontend DOM, classifies all visible text nodes with reactive tokens, and dynamically switches languages powered by Google Translate with custom JSON override files.',
    es: 'Langjs escanea el DOM del frontend, clasifica todos los nodos de texto con tokens reactivos y cambia de idioma dinámicamente con Google Translate y archivos JSON de sobrescritura.',
    fr: 'Langjs analyse le DOM de votre frontend, classifie tous les nœuds de texte avec des jetons réactifs et traduit dynamiquement votre site grâce à Google Translate et des fichiers JSON personnalisés.',
    de: 'Langjs scannt das Frontend-DOM, klassifiziert alle sichtbaren Textknoten mit reaktiven Tokens und wechselt Sprachen dynamisch via Google Translate und benutzerdefinierten JSON-Overrides.',
    ja: 'LangjsはフロントエンドのDOMを自動スキャンし、すべてのテキストノードにリアクティブトークンを付与。Google翻訳とカスタムJSON辞書で瞬時に多言語切り替えを実現します。',
    ar: 'يقوم Langjs بفحص نصوص الواجهة الأمامية تلقائياً، وتصنيفها بروابط ديناميكية، ثم ترجمتها فورياً عبر Google Translate مع دعم التخصيص الكامل بملفات JSON.',
  },
  hero_cta_primary: {
    en: 'Launch Live Playground',
    es: 'Abrir Sandbox Interactivo',
    fr: 'Lancer le Bac à Sable',
    de: 'Live-Playground Starten',
    ja: 'ライブデモを試す',
    ar: 'جرّب المنصة التفاعلية',
  },
  hero_cta_secondary: {
    en: 'View Documentation',
    es: 'Ver Documentación',
    fr: 'Voir la Documentation',
    de: 'Dokumentation Anzeigen',
    ja: 'ドキュメントを見る',
    ar: 'عرض التوثيق',
  },
  hero_stats_nodes: {
    en: 'Automatic Node Detection',
    es: 'Detección Automática de Nodos',
    fr: 'Détection Automatique des Nœuds',
    de: 'Automatische Knotenerkennung',
    ja: 'DOMノードの自動検出',
    ar: 'كشف تلقائي لنصوص DOM',
  },
  hero_stats_speed: {
    en: 'Sub-Millisecond DOM Swapping',
    es: 'Intercambio DOM Sub-Milisegundo',
    fr: 'Échange DOM Sub-Milliseconde',
    de: 'Sub-Millisekunden DOM-Wechsel',
    ja: 'ミリ秒未満のDOM書き換え',
    ar: 'تبديل فوري للنصوص بأجزاء من الثانية',
  },
  hero_stats_override: {
    en: 'Custom Locale JSON Overrides',
    es: 'Sobrescrituras JSON Personalizadas',
    fr: 'Surcharges JSON Personnalisées',
    de: 'Individuelle JSON-Overrides',
    ja: 'カスタムJSONによる上書き対応',
    ar: 'تجاوز الترجمة بملفات JSON مخصصة',
  },
  feature_1_title: {
    en: '01. Deep DOM Crawler & Classifier',
    es: '01. Rastreador y Clasificador DOM Profundo',
    fr: '01. Analyseur & Classificateur DOM',
    de: '01. Deep DOM Crawler & Klassifikator',
    ja: '01. ディープDOMクローラー＆自動分類',
    ar: '01. زاحف ومصنف عناصر DOM الذكي',
  },
  feature_1_desc: {
    en: 'Recursively parses all rendered text nodes, button captions, aria-labels, and input placeholders, assigning deterministic class tokens without altering source HTML files.',
    es: 'Analiza de forma recursiva todos los nodos de texto, botones, aria-labels y placeholders, asignando clases deterministas sin modificar los archivos HTML fuente.',
    fr: 'Parcourt récursivement tous les nœuds de texte, boutons, aria-labels et placeholders, en attribuant des classes déterministes sans altérer vos fichiers HTML sources.',
    de: 'Analysiert rekursiv alle Textknoten, Button-Beschriftungen, Aria-Labels und Input-Platzhalter und vergibt deterministische Klassen-Tokens ohne Quellcode-Änderung.',
    ja: '描画されたすべてのテキストノード、ボタン、aria-label、プレースホルダーを再帰的に解析。元のHTMLを変更することなく一意のトークンクラスを自動付与します。',
    ar: 'يفحص جميع النصوص الظاهرة والأزرار والتسميات التوضيحية بدقة، ويعين لها معرّفات فريدة دون الحاجة لتعديل كود HTML الأصلي.',
  },
  feature_2_title: {
    en: '02. Powered by Google Translate & Edge Cache',
    es: '02. Impulsado por Google Translate y Edge Cache',
    fr: '02. Propulsé par Google Translate & Edge Cache',
    de: '02. Powered by Google Translate & Edge-Cache',
    ja: '02. Google翻訳＆エッジキャッシュによる高速配信',
    ar: '02. مدعوم بمحرك Google Translate والذاكرة المؤقتة',
  },
  feature_2_desc: {
    en: 'Translates content into 100+ global languages dynamically. Local client storage and edge caching ensure zero latency and zero repeated API costs for returning visitors.',
    es: 'Traduce contenido a más de 100 idiomas dinámicamente. El almacenamiento local y la caché en el borde garantizan cero latencia y cero costos repetidos.',
    fr: 'Traduit dynamiquement en plus de 100 langues. La mise en cache locale et edge garantit une latence nulle et supprime les coûts d’API redondants.',
    de: 'Übersetzt Inhalte dynamisch in über 100 Sprachen. Lokaler Speicher und Edge-Caching sorgen für minimale Latenz und verhindern doppelte API-Kosten.',
    ja: '100以上の言語に対応。ブラウザのローカルストレージとエッジキャッシュにより、ゼロ遅延での表示と不要なAPIコストの削減を実現します。',
    ar: 'يدعم أكثر من 100 لغة عالمية فورياً. مع تخزين مؤقت على السيرفر والمتصفح لضمان سرعة فائقة وعدم تكرار استهلاك واجهة البرمجة.',
  },
  feature_3_title: {
    en: '03. Custom Locale Overrides (.json)',
    es: '03. Sobrescrituras de Idioma Personalizadas (.json)',
    fr: '03. Remplacements Personnalisés (.json)',
    de: '03. Benutzerdefinierte Overrides (.json)',
    ja: '03. カスタムJSON辞書による上書き',
    ar: '03. تخصيص الترجمات بملفات JSON خاصة',
  },
  feature_3_desc: {
    en: 'Want human-polished copy for your slogan or pricing? Simply supply a custom JSON dictionary (`locales/es.json`) to override any machine translation seamlessly.',
    es: '¿Quieres texto perfecto para tu eslogan o precios? Añade un diccionario JSON (`locales/es.json`) para sobrescribir cualquier traducción automática al instante.',
    fr: 'Besoin d’une touche humaine pour vos slogans ou vos tarifs ? Fournissez un dictionnaire JSON (`locales/fr.json`) pour surcharger les traductions automatiques.',
    de: 'Perfekte Formulierungen für Slogans oder Preise? Erstellen Sie einfach eine JSON-Datei (`locales/de.json`), um automatische Übersetzungen zu überschreiben.',
    ja: 'キャッチコピーや料金表に人の手による翻訳を適用したい場合、`locales/ja.json` を配置するだけで自動翻訳を完全に上書き可能です。',
    ar: 'هل تريد عبارات تسويقية مصاغة بعناية؟ ما عليك سوى إضافة ملف JSON لتجاوز الترجمة الآلية في أي عبارة تختارها.',
  },
  feature_4_title: {
    en: '04. One-Line Button & Dropdown Switcher',
    es: '04. Botón y Selector Desplegable en 1 Línea',
    fr: '04. Bouton & Menu Déroulant en 1 Ligne',
    de: '04. 1-Zeilen Button- & Dropdown-Switcher',
    ja: '04. 1行で組み込める言語切替ボタン＆UI',
    ar: '04. زر تبديل وقائمة منسدلة بسطر برمجي واحد',
  },
  feature_4_desc: {
    en: 'Implement a stylish language toggle with 3 lines of JavaScript. Style it directly via CSS classes or use the built-in modern dropdown.',
    es: 'Implementa un botón de cambio elegante con 3 líneas de JavaScript. Dale estilo con tus propias clases CSS o usa el menú desplegable integrado.',
    fr: 'Intégrez un sélecteur élégant en 3 lignes de JavaScript. Personnalisez-le avec vos classes CSS ou utilisez notre composant prêt à l’emploi.',
    de: 'Integrieren Sie einen stylischen Umschalter mit 3 Zeilen JavaScript. Nutzen Sie eigene CSS-Klassen oder das integrierte Dropdown.',
    ja: 'わずか3行のJavaScriptで美しい言語スイッチャーを設置。CSSで自由にカスタマイズするか、洗練された標準ドロップダウンを利用できます。',
    ar: 'أضف زر تغيير اللغة بتصميم أنيق بأسطر بسيطة من جافاسكريبت، وقم بتنسيقه بحرية تامة باستخدام CSS.',
  },
};
