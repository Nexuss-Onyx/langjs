export interface DocItem {
  id: string;
  title: string;
  category: string;
  badge?: string;
  badgeType?: 'get' | 'post' | 'class' | 'method' | 'hook' | 'guide';
  summary: string;
  content: {
    overview: string;
    codeSnippet?: {
      language: string;
      title?: string;
      code: string;
    };
    payloadExample?: {
      title: string;
      json: string;
    };
    fields?: Array<{
      name: string;
      type: string;
      defaultVal?: string;
      required?: boolean;
      description: string;
    }>;
    notes?: Array<{
      type: 'tip' | 'info' | 'warning';
      text: string;
    }>;
    sections?: Array<{
      title: string;
      body: string;
      code?: string;
    }>;
  };
}

export interface DocCategory {
  title: string;
  id: string;
  items: DocItem[];
}

export const DOC_CATEGORIES: DocCategory[] = [
  {
    title: 'GET STARTED',
    id: 'get-started',
    items: [
      {
        id: 'welcome',
        title: 'Welcome to LangJS',
        category: 'GET STARTED',
        badge: 'v1.1.0',
        badgeType: 'guide',
        summary: 'Overview of LangJS, the zero-config client-side and server-side internationalization SDK and dynamic 100+ language neural translation engine.',
        content: {
          overview: 'LangJS is a modern full-stack internationalization (i18n) framework designed for zero-config multi-lingual applications across both client-side and server-side runtimes. It pairs an automated browser DOM TreeWalker with a powerful server-side AST codebase scanner and universal HTML post-render stream interceptor, translating entire web applications into 100+ languages with sub-10ms DOM mutations and sub-3ms SSR stream transformation.',
          notes: [
            {
              type: 'info',
              text: 'LangJS provides complete full-stack flexibility: run purely in the browser with LocalStorage/IndexedDB caching, or run on the server with Express, Fastify, Next.js, and Nuxt to pre-render localized HTML for search engine crawlers and social share bots.'
            }
          ],
          sections: [
            {
              title: 'Key Architectural Advantages',
              body: '• Zero Key Maintenance: No need to maintain thousands of translation keys in separate JSON files.\n• Dynamic DOM Scanning: Non-destructively scans visible nodes, form inputs, placeholders, and ARIA labels.\n• Automatic Bidirectional RTL: Flips layout direction (`dir="rtl"`) automatically for Arabic, Hebrew, Urdu, and Persian.\n• Portable Manifest: One-click export into static `lang/lang.json` for offline deployments and CI/CD pipelines.'
            }
          ]
        }
      },
      {
        id: 'quickstart',
        title: 'Quickstart: 60-Second Setup',
        category: 'GET STARTED',
        badge: 'FAST',
        badgeType: 'guide',
        summary: 'Get up and running with @nexuss0781/langjs in under a minute with zero build step configuration.',
        content: {
          overview: 'Install the package using your favorite package manager and initialize the runtime on `document.body` or your application container.',
          codeSnippet: {
            language: 'typescript',
            title: 'main.ts / App.tsx',
            code: `import { LangJS } from '@nexuss0781/langjs';

// Initialize the LangJS engine
const lang = new LangJS({
  defaultLanguage: 'en',
  languages: ['en', 'es', 'fr', 'de', 'ja', 'ar', 'zh'],
  autoRTL: true,
});

// Switch language dynamically anytime
await lang.setLanguage('es');`
          },
          fields: [
            {
              name: 'defaultLanguage',
              type: 'string',
              defaultVal: "'en'",
              required: false,
              description: 'The native language of the source HTML document before translation.'
            },
            {
              name: 'languages',
              type: 'string[]',
              defaultVal: "['en', 'es', 'fr', ...]",
              required: false,
              description: 'Array of supported ISO-639-1 language codes available in your application.'
            },
            {
              name: 'autoRTL',
              type: 'boolean',
              defaultVal: 'true',
              required: false,
              description: 'Automatically flip document root direction to `rtl` when Arabic, Hebrew, Persian, or Urdu is active.'
            }
          ],
          notes: [
            {
              type: 'tip',
              text: 'You can call `lang.setLanguage("ar")` anywhere in your app — UI text, buttons, placeholders, and aria-labels will update in-place without page refresh.'
            }
          ]
        }
      },
      {
        id: 'installation',
        title: 'Installation',
        category: 'GET STARTED',
        badge: 'NPM',
        badgeType: 'guide',
        summary: 'Package installation options via npm, pnpm, yarn, bun, or direct CDN bundle.',
        content: {
          overview: 'LangJS is published as a dual ESM/CommonJS package with zero runtime dependencies and first-class TypeScript declarations.',
          codeSnippet: {
            language: 'bash',
            title: 'Terminal',
            code: `# Using npm
npm install @nexuss0781/langjs

# Using pnpm
pnpm add @nexuss0781/langjs

# Using yarn
yarn add @nexuss0781/langjs

# Using bun
bun add @nexuss0781/langjs`
          },
          sections: [
            {
              title: 'CDN / Direct Browser Script Tag',
              body: 'For static HTML sites or vanilla prototypes, load the pre-bundled IIFE distribution directly via CDN:',
              code: `<script src="https://cdn.jsdelivr.net/npm/@nexuss0781/langjs/dist/lang.min.js"></script>
<script>
  const lang = new LangJS.LangJS({ defaultLanguage: 'en' });
  lang.setLanguage('fr');
</script>`
            }
          ]
        }
      },
      {
        id: 'configuration',
        title: 'Configuration Reference',
        category: 'GET STARTED',
        badge: 'CONFIG',
        badgeType: 'class',
        summary: 'Complete options interface passed into the LangJS constructor.',
        content: {
          overview: 'All configuration parameters accepted by `new LangJS(options)` with their types, default values, and behaviors.',
          fields: [
            {
              name: 'root',
              type: 'HTMLElement | string',
              defaultVal: 'document.body',
              description: 'The DOM container to scan and translate. Defaults to document.body.'
            },
            {
              name: 'defaultLanguage',
              type: 'string',
              defaultVal: "'en'",
              description: 'Source document language.'
            },
            {
              name: 'currentLanguage',
              type: 'string',
              defaultVal: "'en'",
              description: 'Initial target language to activate on startup.'
            },
            {
              name: 'className',
              type: 'string',
              defaultVal: "'langjs-node'",
              description: 'CSS class assigned to identified text container elements.'
            },
            {
              name: 'storageKey',
              type: 'string',
              defaultVal: "'langjs_storage'",
              description: 'LocalStorage key for persisting active language choice.'
            },
            {
              name: 'observeMutations',
              type: 'boolean',
              defaultVal: 'true',
              description: 'Automatically track new elements appended to the DOM via MutationObserver.'
            },
            {
              name: 'overrides',
              type: 'Record<string, Record<string, string>>',
              defaultVal: '{}',
              description: 'Custom translation overrides to supersede machine translation output.'
            },
            {
              name: 'autoRTL',
              type: 'boolean',
              defaultVal: 'true',
              description: 'Enforces bidirectional switching for right-to-left scripts.'
            }
          ]
        }
      }
    ]
  },
  {
    title: 'CORE CONCEPTS',
    id: 'core-concepts',
    items: [
      {
        id: 'dom-crawler',
        title: 'DOM Crawler Engine',
        category: 'CORE CONCEPTS',
        badge: 'CORE',
        badgeType: 'class',
        summary: 'How LangJS intelligently crawls the DOM tree without corrupting React or Vue virtual DOM reconciliation.',
        content: {
          overview: 'The `DomCrawler` class utilizes a native high-performance `TreeWalker` (`NodeFilter.SHOW_TEXT`) to discover visible text nodes across the subtree. It filters out non-renderable tags (`<script>`, `<style>`, `<svg>`, `<code>`, `<pre>`) and assigns a unique deterministic hash ID to each discrete text fragment.',
          codeSnippet: {
            language: 'typescript',
            title: 'Crawler Inspection',
            code: `import { DomCrawler } from '@nexuss0781/langjs';

const crawler = new DomCrawler('langjs-node');
const nodesMap = crawler.crawl(document.body);

console.log(\`Tracked \${nodesMap.size} visible text nodes\`);
// Inspect individual node
const firstNode = nodesMap.values().next().value;
console.log(firstNode.id, firstNode.originalText, firstNode.type);`
          },
          fields: [
            {
              name: 'id',
              type: 'string',
              description: 'Deterministic 32-bit FNV-1a hash based on clean string content and tag hierarchy.'
            },
            {
              name: 'originalText',
              type: 'string',
              description: 'Unmodified base language text extracted from the node.'
            },
            {
              name: 'type',
              type: "'text' | 'placeholder' | 'aria-label' | 'title' | 'alt' | 'value'",
              description: 'Attribute or node classification.'
            }
          ]
        }
      },
      {
        id: 'translation-engine',
        title: 'Neural Translation & Edge Caching',
        category: 'CORE CONCEPTS',
        badge: 'ENGINE',
        badgeType: 'class',
        summary: 'Multi-tiered translation pipeline with local caching, batch deduplication, and Neural Machine Translation.',
        content: {
          overview: 'The `TranslateEngine` processes text in parallel batches. It first checks the in-memory cache and LocalStorage manifest. Any missing strings are batched together and dispatched to the translation endpoint, minimizing network overhead and keeping mutation latency under 10ms.',
          payloadExample: {
            title: 'Batch Translation Payload',
            json: `{
  "sourceLang": "en",
  "targetLang": "es",
  "strings": [
    "Global Translation Engine",
    "Deploy in seconds",
    "Search 100+ languages..."
  ],
  "cacheHitCount": 2,
  "remoteFetchCount": 1
}`
          },
          notes: [
            {
              type: 'tip',
              text: 'Identical strings across different parts of your page (e.g. repeated buttons or navigation links) are deduplicated into a single translation request.'
            }
          ]
        }
      },
      {
        id: 'bidi-rtl',
        title: 'Bidirectional RTL Auto-Engine',
        category: 'CORE CONCEPTS',
        badge: 'RTL',
        badgeType: 'guide',
        summary: 'Seamless right-to-left layout adaptation for Arabic, Hebrew, Urdu, Persian, and Yiddish.',
        content: {
          overview: 'When switching to an RTL language, LangJS automatically sets `dir="rtl"` on the document root (`<html>`) and updates the active `lang` attribute. When switching back to an LTR language, it seamlessly restores `dir="ltr"`.',
          codeSnippet: {
            language: 'typescript',
            title: 'RTL Handler',
            code: `// Automatically switches document direction
await lang.setLanguage('ar'); // html.dir = 'rtl', html.lang = 'ar'

// Switches back to LTR
await lang.setLanguage('en'); // html.dir = 'ltr', html.lang = 'en'`
          },
          sections: [
            {
              title: 'Supported RTL Locales',
              body: '• Arabic (`ar`)\n• Hebrew (`iw` / `he`)\n• Persian / Farsi (`fa`)\n• Urdu (`ur`)\n• Yiddish (`yi`)\n• Pashto (`ps`)\n• Sindhi (`sd`)\n• Uighur (`ug`)'
            }
          ]
        }
      },
      {
        id: 'manifest-lang-json',
        title: 'Manifest & lang.json Extractor',
        category: 'CORE CONCEPTS',
        badge: 'JSON',
        badgeType: 'guide',
        summary: 'Export complete multi-lingual dictionaries to static JSON files for zero-network deployments.',
        content: {
          overview: 'LangJS allows developers to extract the full dictionary of translated strings across all languages into a portable `lang.json` manifest. This can be stored in `/public/lang/` or your CDN to eliminate runtime API calls completely.',
          payloadExample: {
            title: 'Exported lang.json Structure',
            json: `{
  "meta": {
    "version": "1.0.0",
    "generatedAt": "2026-09-30T14:30:00.000Z",
    "sourceLanguage": "en",
    "totalNodes": 148,
    "totalUniqueStrings": 84
  },
  "strings": {
    "node_a1b2c3": {
      "original": "Deploy Global App",
      "type": "text",
      "translations": {
        "es": "Implementar Aplicación Global",
        "fr": "Déployer une Application Globale",
        "de": "Globale Anwendung Bereitstellen",
        "ja": "グローバルアプリケーションを展開する",
        "ar": "نشر التطبيق العالمي"
      }
    }
  }
}`
          }
        }
      }
    ]
  },
  {
    title: 'SDKS & FRAMEWORKS',
    id: 'sdks-and-frameworks',
    items: [
      {
        id: 'react-hook',
        title: 'React Hook: useLangJS',
        category: 'SDKS & FRAMEWORKS',
        badge: 'REACT',
        badgeType: 'hook',
        summary: 'First-class React integration with automatic component lifecycle tracking and reactive language states.',
        content: {
          overview: 'The `@nexuss0781/langjs` package includes a native `useLangJS` hook that binds directly into React 18 & 19 rendering pipelines.',
          codeSnippet: {
            language: 'tsx',
            title: 'LanguageSwitcher.tsx',
            code: `import React from 'react';
import { useLangJS } from '@nexuss0781/langjs';

export function LanguageSwitcher() {
  const { currentLang, setLanguage, isTranslating, totalNodes } = useLangJS({
    defaultLanguage: 'en',
    autoRTL: true,
  });

  return (
    <div className="flex items-center gap-2">
      <select 
        value={currentLang} 
        onChange={(e) => setLanguage(e.target.value)}
        disabled={isTranslating}
        className="px-3 py-1.5 rounded-lg border bg-zinc-900 text-white"
      >
        <option value="en">English (US)</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
        <option value="de">Deutsch</option>
        <option value="ja">日本語</option>
        <option value="ar">العربية</option>
      </select>

      {isTranslating && <span className="text-xs text-rose-400">Translating...</span>}
    </div>
  );
}`
          }
        }
      },
      {
        id: 'vanilla-js',
        title: 'Vanilla JavaScript & TypeScript',
        category: 'SDKS & FRAMEWORKS',
        badge: 'TS/JS',
        badgeType: 'guide',
        summary: 'Standalone integration in pure JavaScript, Vite, Astro, or plain HTML web projects.',
        content: {
          overview: 'Use LangJS with zero framework dependencies. It works immediately in modern browsers supporting ES2020.',
          codeSnippet: {
            language: 'javascript',
            title: 'app.js',
            code: `import { LangJS } from '@nexuss0781/langjs';

document.addEventListener('DOMContentLoaded', async () => {
  const lang = new LangJS({
    defaultLanguage: 'en',
    autoRTL: true,
  });

  document.querySelectorAll('[data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      lang.setLanguage(btn.getAttribute('data-lang'));
    });
  });
});`
          }
        }
      }
    ]
  },
  {
    title: 'API REFERENCE',
    id: 'api-reference',
    items: [
      {
        id: 'api-langjs-class',
        title: 'LangJS Class',
        category: 'API REFERENCE',
        badge: 'CLASS',
        badgeType: 'class',
        summary: 'The primary orchestrator class managing scanning, translation, mutation, and persistence.',
        content: {
          overview: 'Creates an instance of the LangJS translation runtime. Accepts optional configuration parameters.',
          codeSnippet: {
            language: 'typescript',
            title: 'Constructor Signature',
            code: `const lang = new LangJS(options?: LangOptions);`
          },
          fields: [
            {
              name: 'options.root',
              type: 'HTMLElement | string',
              defaultVal: 'document.body',
              description: 'Target root element or query selector string.'
            },
            {
              name: 'options.defaultLanguage',
              type: 'string',
              defaultVal: "'en'",
              description: 'Original language code.'
            },
            {
              name: 'options.autoRTL',
              type: 'boolean',
              defaultVal: 'true',
              description: 'Enable automatic RTL direction toggling.'
            }
          ]
        }
      },
      {
        id: 'api-set-language',
        title: 'lang.setLanguage()',
        category: 'API REFERENCE',
        badge: 'METHOD',
        badgeType: 'method',
        summary: 'Translates and updates all tracked DOM nodes to the requested language code.',
        content: {
          overview: 'Mutates text nodes, input placeholders, aria labels, and title attributes asynchronously.',
          codeSnippet: {
            language: 'typescript',
            title: 'Method Signature',
            code: `async setLanguage(targetLang: string): Promise<void>`
          },
          fields: [
            {
              name: 'targetLang',
              type: 'string',
              required: true,
              description: 'ISO-639-1 language code (e.g. "es", "fr", "de", "ja", "ar", "zh").'
            }
          ],
          notes: [
            {
              type: 'tip',
              text: 'Returns a Promise that resolves immediately once all DOM node mutations have finished.'
            }
          ]
        }
      },
      {
        id: 'api-scan',
        title: 'lang.scan()',
        category: 'API REFERENCE',
        badge: 'METHOD',
        badgeType: 'method',
        summary: 'Manually re-scans the DOM tree to register newly inserted nodes.',
        content: {
          overview: 'Useful when dynamically inserting HTML or rendering components without MutationObserver.',
          codeSnippet: {
            language: 'typescript',
            title: 'Method Signature',
            code: `scan(root?: HTMLElement | string): Map<string, ExtractedTextNode>`
          },
          fields: [
            {
              name: 'root',
              type: 'HTMLElement | string',
              defaultVal: 'this.root',
              description: 'Specific subtree element to re-scan.'
            }
          ]
        }
      },
      {
        id: 'api-extract-dictionary',
        title: 'lang.extractDictionary()',
        category: 'API REFERENCE',
        badge: 'METHOD',
        badgeType: 'method',
        summary: 'Extracts the complete translation dictionary manifest object.',
        content: {
          overview: 'Returns a complete `LangManifest` containing metadata, all tracked nodes, and their multi-language translations.',
          codeSnippet: {
            language: 'typescript',
            title: 'Method Signature',
            code: `extractDictionary(): LangManifest`
          }
        }
      },
      {
        id: 'api-download-json',
        title: 'lang.downloadJson()',
        category: 'API REFERENCE',
        badge: 'METHOD',
        badgeType: 'method',
        summary: 'Triggers a client-side browser file download for lang.json.',
        content: {
          overview: 'Creates a downloadable Blob URL and prompts the browser to save the dictionary JSON.',
          codeSnippet: {
            language: 'typescript',
            title: 'Method Signature',
            code: `downloadJson(filename?: string): void

// Example:
lang.downloadJson('my-app-translations.json');`
          }
        }
      },
      {
        id: 'api-toggle-highlight',
        title: 'lang.toggleHighlight()',
        category: 'API REFERENCE',
        badge: 'METHOD',
        badgeType: 'method',
        summary: 'Toggles a visual debug overlay highlighting all tracked text nodes.',
        content: {
          overview: 'Adds high-contrast visual outline rings around tracked text nodes for easy debugging and QA.',
          codeSnippet: {
            language: 'typescript',
            title: 'Method Signature',
            code: `toggleHighlight(enable?: boolean): boolean`
          }
        }
      },
      {
        id: 'api-events',
        title: 'lang.on() / lang.off()',
        category: 'API REFERENCE',
        badge: 'EVENTS',
        badgeType: 'method',
        summary: 'Subscribe to lifecycle events like scanned, languageChanging, and languageChanged.',
        content: {
          overview: 'Event bus for subscribing to runtime state changes.',
          codeSnippet: {
            language: 'typescript',
            title: 'Event Listeners',
            code: `lang.on('languageChanging', ({ from, to }) => {
  console.log(\`Switching from \${from} to \${to}...\`);
});

lang.on('languageChanged', ({ language, latencyMs, count }) => {
  console.log(\`Changed to \${language} in \${latencyMs}ms across \${count} nodes\`);
});`
          }
        }
      }
    ]
  },
  {
    title: 'CUSTOM OVERRIDES & RECIPES',
    id: 'recipes',
    items: [
      {
        id: 'custom-overrides',
        title: 'Custom Overrides & Brand Copy',
        category: 'CUSTOM OVERRIDES & RECIPES',
        badge: 'RECIPE',
        badgeType: 'guide',
        summary: 'Preserve specific brand names, slogans, and custom marketing translations.',
        content: {
          overview: 'You can pass explicit copy overrides to prevent neural translation from altering trademarked names or specific idioms.',
          codeSnippet: {
            language: 'typescript',
            title: 'Overrides Configuration',
            code: `const lang = new LangJS({
  defaultLanguage: 'en',
  overrides: {
    es: {
      "LangJS Platform": "Plataforma LangJS Exclusiva",
      "Sign Up Free": "Comenzar Ahora"
    },
    ja: {
      "LangJS Platform": "LangJS プラットフォーム"
    }
  }
});`
          }
        }
      },
      {
        id: 'ignoring-elements',
        title: 'Ignoring Sensitive / Static Nodes',
        category: 'CUSTOM OVERRIDES & RECIPES',
        badge: 'HTML',
        badgeType: 'guide',
        summary: 'Prevent specific DOM nodes from being scanned or translated using attributes.',
        content: {
          overview: 'Add the `data-langjs-ignore` attribute to any HTML element or component to completely exclude its subtree from translation scanning.',
          codeSnippet: {
            language: 'html',
            title: 'index.html',
            code: `<!-- This element will never be translated -->
<div data-langjs-ignore>
  <span>User generated raw markdown: $100.00 USD</span>
  <code>const apiKey = 'secret_key_123';</code>
</div>`
          }
        }
      }
    ]
  },
  {
    title: 'SERVER SUITE & CLI',
    id: 'server-suite',
    items: [
      {
        id: 'server-overview',
        title: 'Server-Side Architecture & Universal Runtime',
        category: 'SERVER SUITE & CLI',
        badge: 'v1.1.0',
        badgeType: 'guide',
        summary: 'Framework-agnostic server-side HTML stream interceptor and codebase scanning suite.',
        content: {
          overview: 'While raw machine translation (such as Google Translate) is fast, it frequently produces inaccuracies on idioms, technical terminology, and brand slogans. LangJS v1.1.0 bridges client-side translation to the server by scanning your codebase, extracting visible strings into a structured side-by-side `lang/lang.json` file, and transforming outgoing HTML streams in sub-3ms using verified translations.',
          notes: [
            {
              type: 'info',
              text: 'The server suite is framework-agnostic. Whether you use React SSR, Vue/Nuxt, SvelteKit, Angular Universal, Astro, Django, Rails, or Laravel, the HTML post-render interceptor handles localization without touching component templates.'
            },
            {
              type: 'tip',
              text: 'Both human developers and AI coding agents can directly edit `lang/lang.json` to correct inaccuracies and lock in translations permanently.'
            }
          ],
          sections: [
            {
              title: 'Why Server-Side Translation Matters',
              body: '1. SEO & Rich Previews: Search engine crawlers and social share bots receive pre-rendered HTML in the target language (e.g. Amharic, Spanish, or Japanese).\n2. Human & AI Verifiability: Translations are stored in side-by-side JSON format with file and line tracking so you can audit and correct mistranslations.\n3. Zero Client CPU Overhead: Text nodes are replaced on the server before reaching the client browser.'
            }
          ]
        }
      },
      {
        id: 'codebase-scanner',
        title: 'Codebase AST Scanner (CodebaseScanner)',
        category: 'SERVER SUITE & CLI',
        badge: 'CLASS',
        badgeType: 'class',
        summary: 'Traverse templates and components across any frontend framework to extract visible strings.',
        content: {
          overview: 'The `CodebaseScanner` recursively analyzes your project directory, respects `.gitignore` and `.langignore` files, and extracts visible text nodes, placeholders, `aria-label`, `alt`, and `title` attributes while filtering out code keywords, CSS classes, URLs, and template interpolations.',
          codeSnippet: {
            language: 'typescript',
            title: 'scripts/scan.ts',
            code: `import { CodebaseScanner } from '@nexuss0781/langjs/server';

const scanner = new CodebaseScanner({
  rootDir: '.',
  // Supported template extensions
  extensions: ['.html', '.vue', '.svelte', '.jsx', '.tsx', '.astro', '.php'],
  sourceLanguage: 'en',
  // Target languages to extract and translate side-by-side
  targetLanguages: ['en', 'am', 'es', 'fr', 'ja', 'de'],
  ignoreFiles: ['.gitignore', '.langignore']
});

// 1. Collect all matching UI files
const files = scanner.collectFiles();
console.log(\`Found \${files.length} UI templates\`);

// 2. Extract visible strings with file and line occurrences
const strings = scanner.scanCodebase();

// 3. Generate side-by-side structured manifest
const manifest = await scanner.generateLangJson(strings);

// 4. Save to lang/lang.json
scanner.writeManifest(manifest, 'lang/lang.json');`
          },
          fields: [
            {
              name: 'rootDir',
              type: 'string',
              defaultVal: "'.'",
              required: false,
              description: 'Project root directory to begin scanning from.'
            },
            {
              name: 'extensions',
              type: 'string[]',
              defaultVal: "['.html', '.vue', '.svelte', '.jsx', '.tsx', '.astro', '.php']",
              required: false,
              description: 'List of template and component extensions to crawl.'
            },
            {
              name: 'sourceLanguage',
              type: 'string',
              defaultVal: "'en'",
              required: false,
              description: 'Immutable source language (defaults to English).'
            },
            {
              name: 'targetLanguages',
              type: 'string[]',
              defaultVal: "['en', 'am', 'es', 'fr', 'ja']",
              required: false,
              description: 'Target language codes to include in the side-by-side dictionary.'
            }
          ]
        }
      },
      {
        id: 'langignore-spec',
        title: 'Ignore Engine (.gitignore & .langignore)',
        category: 'SERVER SUITE & CLI',
        badge: 'CONFIG',
        badgeType: 'guide',
        summary: 'Exclude dependencies, build artifacts, lockfiles, and media from translation scanning.',
        content: {
          overview: 'To ensure the scanner never extracts strings from third-party libraries (`node_modules`), build artifacts (`dist`, `.next`), or generated files, LangJS automatically respects `.gitignore` rules and supports a dedicated `.langignore` configuration file in the project root.',
          codeSnippet: {
            language: 'bash',
            title: '.langignore',
            code: `# Dependencies & Vendors
node_modules/
vendor/
.pnpm-store/

# Build artifacts & caches
dist/
build/
out/
.next/
.nuxt/
.astro/
.svelte-kit/

# Static assets & media
*.png
*.jpg
*.jpeg
*.svg
*.ico
*.woff2

# Lockfiles & Environment
*.lock
*.log
.env
.env.*

# Generated translation files (prevents recursive scanning)
lang/lang.json
lang/`
          },
          notes: [
            {
              type: 'tip',
              text: 'You can test ignored paths programmatically using `new IgnoreRuleMatcher(rootDir).shouldIgnore(relativePath)`.'
            }
          ]
        }
      },
      {
        id: 'structured-lang-json',
        title: 'Structured Side-by-Side lang/lang.json',
        category: 'SERVER SUITE & CLI',
        badge: 'SPEC',
        badgeType: 'guide',
        summary: 'Dual-format JSON with fast O(1) runtime tables and side-by-side human/AI review records.',
        content: {
          overview: 'The generated `lang/lang.json` file contains two synchronized representations: `locales` for instant O(1) runtime lookups, and `sideBySide` for human and AI agent review, allowing you to catch and correct machine translation mistakes directly.',
          payloadExample: {
            title: 'lang/lang.json Structure',
            json: `{
  "$schema": "https://langjs.dev/schema/v1.json",
  "meta": {
    "generator": "LangJS Server Scanner v1.1.0",
    "version": "1.1.0",
    "generatedAt": "2026-10-01T00:00:00.000Z",
    "sourceLanguage": "en",
    "targetLanguages": ["en", "am", "es", "fr", "ja"],
    "totalUniqueStrings": 42
  },
  "locales": {
    "en": {
      "Turn Any Static Website into Multi-Lingual": "Turn Any Static Website into Multi-Lingual"
    },
    "am": {
      "Turn Any Static Website into Multi-Lingual": "ማንኛውንም የማይንቀሳቀስ ድረ-ገጽ ወደ ብዙ ቋንቋ ይለውጡ"
    },
    "es": {
      "Turn Any Static Website into Multi-Lingual": "Convierta cualquier sitio web estático en multilingüe"
    }
  },
  "sideBySide": [
    {
      "id": "str_1",
      "source": "Turn Any Static Website into Multi-Lingual",
      "type": "tag_text",
      "occurrences": [
        { "file": "src/components/Hero.tsx", "line": 42 }
      ],
      "translations": {
        "en": "Turn Any Static Website into Multi-Lingual",
        "am": "ማንኛውንም የማይንቀሳቀስ ድረ-ገጽ ወደ ብዙ ቋንቋ ይለውጡ",
        "es": "Convierta cualquier sitio web estático en multilingüe"
      },
      "verified": true,
      "notes": "Verified by developer/AI agent to ensure idiom accuracy"
    }
  ]
}`
          },
          notes: [
            {
              type: 'info',
              text: 'Whenever an AI agent or developer edits `sideBySide[i].translations[lang]`, the `verified` flag can be set to `true`. LangJS prioritizes verified translations above all else.'
            }
          ]
        }
      },
      {
        id: 'server-middleware',
        title: 'Universal SSR & Express Middleware',
        category: 'SERVER SUITE & CLI',
        badge: 'RUNTIME',
        badgeType: 'class',
        summary: 'Intercept rendered HTML responses and substitute translations in sub-3ms on any server.',
        content: {
          overview: 'The `ServerTranslateRuntime` mounts seamlessly into Node.js, Express, Fastify, Next.js custom servers, or Nuxt SSR. It intercepts the rendered HTML response, parses the visible text stream, substitutes verified translations from `lang/lang.json`, and updates `<html lang="..." dir="...">` automatically.',
          codeSnippet: {
            language: 'typescript',
            title: 'server.ts (Express Example)',
            code: `import express from 'express';
import { ServerTranslateRuntime } from '@nexuss0781/langjs/server';

const app = express();

// Initialize server translation runtime
const runtime = new ServerTranslateRuntime({
  manifestPath: './lang/lang.json',
  defaultLanguage: 'en',
  supportedLanguages: ['en', 'am', 'es', 'fr', 'ja', 'de', 'ar']
});

// Mount HTML localization middleware
app.use(runtime.createMiddleware());

// Route renders normal React/Vue/Blade/HTML template
app.get('/', (req, res) => {
  // If user requests ?lang=am or has langjs cookie, response is automatically
  // transformed into Amharic before sending to client!
  res.send(\`
    <!DOCTYPE html>
    <html>
      <body>
        <h1>Turn Any Static Website into Multi-Lingual</h1>
        <p>Deterministic Hash Keys power sub-10ms mutations.</p>
      </body>
    </html>
  \`);
});

app.listen(3000, () => console.log('Server running on port 3000'));`
          },
          sections: [
            {
              title: 'Direct Standalone HTML String Transformation',
              body: 'You can also call `runtime.translateHtml(rawHtml, targetLang)` directly in serverless functions (AWS Lambda, Vercel Functions, Cloudflare Workers):',
              code: `const localizedHtml = runtime.translateHtml(rawHtml, 'am');`
            }
          ]
        }
      },
      {
        id: 'cli-scanner',
        title: 'CLI Command Runner (langjs-scan)',
        category: 'SERVER SUITE & CLI',
        badge: 'CLI',
        badgeType: 'guide',
        summary: 'Scan your codebase and generate side-by-side lang.json via terminal or CI/CD.',
        content: {
          overview: 'LangJS includes a built-in CLI command to scan codebases directly from your shell or GitHub Actions pipeline.',
          codeSnippet: {
            language: 'bash',
            title: 'Terminal',
            code: `# Run via npx or node
node scripts/scan-codebase.js --languages en,am,es,fr,ja --out lang/lang.json

# Or with npx (when installed globally or locally):
npx @nexuss0781/langjs scan -l en,am,es,fr,ja -o lang/lang.json`
          },
          sections: [
            {
              title: 'CLI Options & Flags',
              body: '- `--languages, -l`: Comma-separated list of target language codes (e.g. `en,am,es,fr,ja`). English (`en`) is always included as source.\n- `--out, -o`: Output destination file path (defaults to `lang/lang.json`).\n- `--ignore, -i`: Additional directory or file patterns to ignore during scan.'
            }
          ]
        }
      },
      {
        id: 'ai-skill-spec',
        title: 'AI Agent Skill Specification (SKILL.md)',
        category: 'SERVER SUITE & CLI',
        badge: 'AI SKILL',
        badgeType: 'guide',
        summary: 'End-to-end AI-first specification and operational playbook for autonomous agents implementing LangJS.',
        content: {
          overview: 'LangJS includes a dedicated, comprehensive AI Agent Skill located at `SKILL/LANGJS/SKILL.md` (and `skills/langjs/SKILL.md`). It primes any AI coding assistant to understand the end-to-end client DOM TreeWalker, codebase AST scanning, side-by-side verification workflows, and universal SSR streaming without hallucination.',
          codeSnippet: {
            language: 'bash',
            title: 'File Location',
            code: `# Read or reference the full AI skill file in your repository:
cat SKILL/LANGJS/SKILL.md

# Key capabilities documented in the skill:
# 1. Zero-key client DOM TreeWalker & in-place patching
# 2. Server-side AST codebase scanning across JSX, Vue, Svelte, Blade, PHP
# 3. .langignore & .gitignore exclusion algorithms
# 4. Structured dual-format lang/lang.json specification
# 5. Universal HTML post-render streaming for Express, Next, Nuxt
# 6. AI Agent verification and translation auditing SOP`
          },
          notes: [
            {
              type: 'tip',
              text: 'Autonomous agents can invoke `node scripts/scan-codebase.js` directly during CI/CD or PR generation to extract newly added strings and verify translation accuracy before merging.'
            }
          ]
        }
      }
    ]
  }
];
