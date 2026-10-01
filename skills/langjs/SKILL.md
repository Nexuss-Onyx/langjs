---
name: langjs
description: End-to-end AI-first specification, API reference, integration patterns, and operational protocols for LangJS—the universal zero-config client-side and server-side internationalization (i18n) framework. Use this skill when localizing web applications, auditing codebase templates, running AST scans, maintaining side-by-side lang/lang.json manifests, or configuring sub-3ms SSR HTML post-render streams.
---

# LangJS Framework — Comprehensive AI Agent Skill & End-to-End Reference

> **Identity**: This document is the authoritative, end-to-end engineering specification and operational playbook for **LangJS** (`@nexuss0781/langjs` v1.1.0+).  
> **Audience**: AI software engineering agents, autonomous coding assistants, and senior architects implementing, debugging, or maintaining multi-lingual web systems.

---

## Table of Contents
1. [Core Mental Model & Philosophy](#1-core-mental-model--philosophy)
2. [Package Distribution & Installation Protocols](#2-package-distribution--installation-protocols)
3. [Client-Side SDK API Reference](#3-client-side-sdk-api-reference)
4. [Client Framework Integration Patterns](#4-client-framework-integration-patterns)
5. [Server-Side Architecture & Universal SSR Stream Runtime](#5-server-side-architecture--universal-ssr-stream-runtime)
6. [Codebase AST Scanner (`CodebaseScanner`)](#6-codebase-ast-scanner-codebasescanner)
7. [Ignore Engine (`.gitignore` & `.langignore`)](#7-ignore-engine-gitignore--langignore)
8. [Structured Side-by-Side `lang/lang.json` Specification](#8-structured-side-by-side-langlangjson-specification)
9. [CLI Command Runner & CI/CD Pipelines](#9-cli-command-runner--cicd-pipelines)
10. [AI Agent Verification & Translation Auditing Workflows](#10-ai-agent-verification--translation-auditing-workflows)
11. [Troubleshooting, Performance & Edge Cases](#11-troubleshooting-performance--edge-cases)

---

## 1. Core Mental Model & Philosophy

### 1.1 The Fundamental Flaw of Traditional i18n
Traditional i18n libraries (`i18next`, `react-intl`, `vue-i18n`) impose massive developer friction:
- **Source Code Mutilation**: Wrapping thousands of strings with keys: `t('dashboard.header.welcome_message')`.
- **Key Desynchronization**: Renaming a UI caption requires updating multiple language JSON files simultaneously.
- **Massive Bundle Bloating**: Forcing users to download multi-megabyte static translation bundles on initial load.
- **Layout Jitter & Re-renders**: Triggering full component tree unmounting/re-rendering upon language change.

### 1.2 The LangJS Dual Approach
LangJS provides a unified full-stack solution:
1. **Client-Side**: Uses an optimized **DOM TreeWalker** and **MutationObserver** to crawl rendered text nodes, assign deterministic hash tokens, and patch visible text in-place in **< 10ms** with zero layout shift (CLS: 0.00) and zero template modifications.
2. **Server-Side**: Uses an **AST Codebase Scanner** to extract visible text across all template syntaxes (`.html`, `.jsx`, `.tsx`, `.vue`, `.svelte`, `.astro`, `.php`, `.blade.php`), writes a structured **side-by-side `lang/lang.json`** for human and AI review, and mounts a **universal post-render HTML stream interceptor** that transforms outgoing responses in **< 3ms** for instant SEO and zero-CPU client delivery.

### 1.3 Why Pure Machine Translation Fails & How LangJS Fixes It
Raw machine translation engines (e.g. Google Translate) frequently fail on:
- **Brand Names & Slogans**: Translating "Apple Watch" or "Just Do It" literally.
- **Technical & Industry Idioms**: Misinterpreting "Push changes", "Commit", or "Checkout".
- **Grammatical Conjugations**: Misgendering nouns or corrupting RTL layouts.

**The LangJS Solution**:
- **Dual-Layer Manifest**: Stored in `lang/lang.json` with a human- and AI-editable `sideBySide` table.
- **`verified: true` Flag**: When an AI agent or developer audits a phrase and sets `verified: true`, LangJS locks in that exact translation, completely bypassing raw machine translation mistakes.

---

## 2. Package Distribution & Installation Protocols

### 2.1 Package Registry Information
- **Package Name**: `@nexuss0781/langjs`
- **Current Version**: `^1.1.0`
- **Dependencies**: `0` (Zero third-party runtime dependencies)
- **Minified Size**: `< 2.8 KB` (Client bundle)

### 2.2 Installation Protocol for Modern Build Tools
For React, Vite, Next.js, Nuxt, Astro, SvelteKit, Express, Fastify:

```bash
# Using npm
npm install @nexuss0781/langjs

# Using pnpm
pnpm add @nexuss0781/langjs

# Using bun
bun add @nexuss0781/langjs
```

### 2.3 Subpath Exports
The package provides clean subpath exports defined in `package.json`:
- `@nexuss0781/langjs` — Client-side SDK (`LangJS`, `useLangJS`, `ALL_100_LANGUAGES`, language utilities).
- `@nexuss0781/langjs/server` — Server-side suite (`CodebaseScanner`, `ServerTranslateRuntime`, `IgnoreRuleMatcher`).

### 2.4 CDN / Direct HTML Script Tag Protocol
For static landing pages, WordPress, Shopify, Webflow, or legacy MPAs with no build step:

```html
<!-- Include via CDN (loads LangJS into window.LangJS) -->
<script src="https://cdn.jsdelivr.net/npm/@nexuss0781/langjs/dist/lang.min.js"></script>

<script>
  document.addEventListener('DOMContentLoaded', async () => {
    const lang = new window.LangJS({
      defaultLanguage: 'en',
      autoDetect: true
    });
    // Dynamically switch language:
    // await lang.setLanguage('es');
  });
</script>
```

---

## 3. Client-Side SDK API Reference

### 3.1 Class: `new LangJS(options)`

```typescript
import { LangJS } from '@nexuss0781/langjs';

const lang = new LangJS(options);
```

#### Constructor Configuration Options (`LangJSOptions`)

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `root` | `HTMLElement \| string` | `document.body` | Target root DOM element or CSS selector to crawl and localize. |
| `defaultLanguage` | `string` | `'en'` | Source language of the initial un-translated HTML markup. |
| `currentLanguage` | `string` | `'en'` | Active initial language. |
| `autoDetect` | `boolean` | `false` | Detect visitor language via `navigator.language` on boot. |
| `autoRTL` | `boolean` | `true` | Automatically toggle `document.documentElement.dir = 'rtl'` for Arabic, Hebrew, Urdu, Persian. |
| `observeMutations`| `boolean` | `false` | Mounts a `MutationObserver` to automatically scan and localize dynamically appended DOM elements. |
| `overrides` | `Record<string, Record<string, string>>` | `{}` | Local dictionary of exact phrase overrides per locale code. |
| `className` | `string` | `'langjs-node'` | CSS class added to every DOM text node tracked by the engine. |
| `storageKey` | `string` | `'langjs_storage'`| LocalStorage key for persisting cached translations and selected locale. |
| `cacheExpiryMs` | `number` | `604800000` (7d)| Cache invalidation TTL in milliseconds. |

---

### 3.2 Instance Methods

#### `setLanguage(locale: string): Promise<boolean>`
Switches the active language, queries translation cache/API, and mutates visible DOM text nodes in-place.
```typescript
const success = await lang.setLanguage('am'); // Switches to Amharic
```

#### `getLanguage(): string`
Returns the currently active ISO 639-1 language code.
```typescript
const current = lang.getLanguage(); // e.g. 'es'
```

#### `override(dictionary: Record<string, Record<string, string>>): void`
Merges custom string overrides into the active translation memory.
```typescript
lang.override({
  es: {
    "Sign In": "Acceso de Miembros",
    "Commit": "Confirmar Cambios"
  }
});
```

#### `loadOverridesFromJson(url: string): Promise<boolean>`
Asynchronously fetches and activates a remote JSON override dictionary.
```typescript
await lang.loadOverridesFromJson('/lang/lang.json');
```

#### `scan(container?: HTMLElement): number`
Triggers an immediate DOM crawl starting from `container` (or `options.root`). Returns the number of newly classified text nodes.
```typescript
const newNodesCount = lang.scan(document.getElementById('modal'));
```

#### `extractDictionary(): LangManifest`
Exports all currently discovered text nodes, deterministic hash identifiers, and active translations.
```typescript
const manifest = lang.extractDictionary();
console.log(manifest.locales.es);
```

#### `downloadJson(filename?: string): void`
Triggers an immediate client-side browser file download of `lang.json`.
```typescript
lang.downloadJson('my-app-translations.json');
```

#### `toggleHighlight(): boolean`
Toggles visual bounding boxes around every tracked DOM node (invaluable for debugging and inspection).
```typescript
const isHighlighted = lang.toggleHighlight();
```

#### `destroy(): void`
Disconnects MutationObservers, detaches DOM event listeners, and restores original DOM source text.
```typescript
lang.destroy();
```

---

### 3.3 Event Subscription (`lang.on`)
Subscribe to lifecycle events:

```typescript
// 1. Language transition started
lang.on('languageChanging', ({ language }) => {
  console.log(`Starting transition to ${language}...`);
});

// 2. Language transition completed
lang.on('languageChanged', ({ language, nodeCount, durationMs }) => {
  console.log(`Localized ${nodeCount} nodes to ${language} in ${durationMs}ms`);
});

// 3. Translation progress (for batching large pages)
lang.on('translationProgress', ({ current, total }) => {
  console.log(`Progress: ${current} / ${total} tokens`);
});

// 4. Error handling
lang.on('translationError', ({ error, language }) => {
  console.error(`Failed to localize to ${language}:`, error);
});
```

---

### 3.4 HTML Node Exclusion Rules
To prevent sensitive data, user-entered markdown, or API tokens from being translated, use attributes:

```html
<!-- Attribute 1: Official LangJS Ignore -->
<div data-langjs-ignore>
  <span>API Key: sk-live-98723498234</span>
</div>

<!-- Attribute 2: Standard HTML translate attribute -->
<span translate="no">Acme Corp</span>

<!-- Attribute 3: Google Translate legacy class -->
<code class="notranslate">const token = "x89a";</code>
```

---

## 4. Client Framework Integration Patterns

### 4.1 React Integration (`useLangJS` Hook)

```tsx
import React from 'react';
import { useLangJS } from '@nexuss0781/langjs';

export function Header() {
  const { currentLang, isTranslating, setLanguage, languages } = useLangJS({
    defaultLanguage: 'en',
    autoDetect: true,
    observeMutations: true
  });

  return (
    <header className="flex items-center justify-between p-4">
      <h1 className="font-bold text-xl">My Global Platform</h1>

      <div className="flex gap-2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            disabled={isTranslating}
            className={`px-3 py-1 rounded ${currentLang === lang.code ? 'bg-burgundy text-white' : 'bg-gray-100'}`}
          >
            {lang.nativeName}
          </button>
        ))}
      </div>
    </header>
  );
}
```

### 4.2 React Global Provider Pattern

```tsx
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { LangJS } from '@nexuss0781/langjs';

interface LangContextValue {
  currentLang: string;
  setLanguage: (lang: string) => Promise<void>;
  isTranslating: boolean;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [currentLang, setCurrentLang] = useState('en');
  const [isTranslating, setIsTranslating] = useState(false);
  const langRef = useRef<LangJS | null>(null);

  useEffect(() => {
    const instance = new LangJS({
      defaultLanguage: 'en',
      observeMutations: true
    });
    langRef.current = instance;

    instance.on('languageChanged', (e) => {
      setCurrentLang(e.language);
      setIsTranslating(false);
    });

    instance.scan();

    return () => instance.destroy();
  }, []);

  const handleSetLanguage = async (code: string) => {
    setIsTranslating(true);
    setCurrentLang(code);
    await langRef.current?.setLanguage(code);
  };

  return (
    <LangContext.Provider value={{ currentLang, setLanguage: handleSetLanguage, isTranslating }}>
      {children}
    </LangContext.Provider>
  );
}

export const useAppLanguage = () => {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useAppLanguage must be used within LangProvider');
  return ctx;
};
```

---

## 5. Server-Side Architecture & Universal SSR Stream Runtime

### 5.1 Architecture Overview
The server runtime solves three critical challenges:
1. **Pre-rendered HTML for Search Crawlers**: Googlebot, Bingbot, and Twitter/OpenGraph crawlers receive pre-localized HTML without running client-side JavaScript.
2. **Sub-3ms Performance**: Streaming post-render string replacement requires no virtual DOM rebuild or component re-hydration.
3. **Framework Independence**: Works uniformly on Node.js Express, Fastify, Next.js, Nuxt Nitro, SvelteKit, and Cloudflare Workers.

### 5.2 Server Runtime API: `ServerTranslateRuntime`

```typescript
import { ServerTranslateRuntime } from '@nexuss0781/langjs/server';

const runtime = new ServerTranslateRuntime({
  manifestPath: './lang/lang.json',
  defaultLanguage: 'en',
  supportedLanguages: ['en', 'am', 'es', 'fr', 'ja', 'de', 'ar'],
  cookieName: 'langjs_locale', // Cookie to read locale from
  queryParam: 'lang'           // URL query parameter (e.g. ?lang=es)
});
```

### 5.3 Express & Connect Middleware Pattern

```typescript
import express from 'express';
import { ServerTranslateRuntime } from '@nexuss0781/langjs/server';

const app = express();
const runtime = new ServerTranslateRuntime({
  manifestPath: './lang/lang.json',
  defaultLanguage: 'en',
  supportedLanguages: ['en', 'am', 'es', 'fr', 'ja']
});

// Mount middleware BEFORE route handlers:
app.use(runtime.createMiddleware());

app.get('/', (req, res) => {
  // If request has ?lang=ja or cookie 'langjs_locale=ja',
  // this HTML response is automatically converted to Japanese in < 2ms!
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <body>
        <h1>Turn Any Static Website into Multi-Lingual</h1>
        <p>Zero key extraction and instant DOM mutations.</p>
      </body>
    </html>
  `);
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

### 5.4 Standalone Serverless / Edge Function Pattern

```typescript
import { ServerTranslateRuntime } from '@nexuss0781/langjs/server';

const runtime = new ServerTranslateRuntime({
  manifestPath: './lang/lang.json'
});

export async function handler(event: any) {
  const rawHtml = await renderAppToString();
  const targetLocale = event.queryStringParameters?.lang || 'es';

  // Direct HTML string transformation:
  const localizedHtml = runtime.translateHtml(rawHtml, targetLocale);

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
    body: localizedHtml
  };
}
```

---

## 6. Codebase AST Scanner (`CodebaseScanner`)

The `CodebaseScanner` recursively analyzes template and component files across the repository to extract all visible text nodes, button captions, input placeholders, title attributes, and `aria-label` values while filtering out script tags, styles, code keywords, and URLs.

### 6.1 Programmatic Scanner Usage

```typescript
import { CodebaseScanner } from '@nexuss0781/langjs/server';

const scanner = new CodebaseScanner({
  rootDir: '.',
  // Supported template extensions across frameworks
  extensions: [
    '.html',
    '.vue',
    '.svelte',
    '.jsx',
    '.tsx',
    '.astro',
    '.php',
    '.blade.php'
  ],
  sourceLanguage: 'en',
  targetLanguages: ['en', 'am', 'es', 'fr', 'ja', 'de', 'ar'],
  ignoreFiles: ['.gitignore', '.langignore'],
  excludeDirs: ['node_modules', 'dist', 'build', '.next', '.nuxt']
});

// 1. Collect all matching UI files
const files = scanner.collectFiles();
console.log(`Found ${files.length} UI templates`);

// 2. Extract visible strings with file and line occurrences
const extracted = scanner.scanCodebase();
console.log(`Extracted ${extracted.length} unique visible strings`);

// 3. Generate side-by-side structured manifest
const manifest = await scanner.generateLangJson(extracted);

// 4. Save to disk
scanner.writeManifest(manifest, 'lang/lang.json');
```

---

## 7. Ignore Engine (`.gitignore` & `.langignore`)

To ensure third-party vendors, build artifacts, lockfiles, and static media are never scanned into `lang.json`, LangJS implements an ignore engine matching `.gitignore` and `.langignore`.

### 7.1 `.langignore` Specification File Format
Place `.langignore` in the project root:

```bash
# ==========================================
# Dependencies & Package Managers
# ==========================================
node_modules/
vendor/
.pnpm-store/

# ==========================================
# Build Artifacts & Framework Output
# ==========================================
dist/
build/
out/
.next/
.nuxt/
.astro/
.svelte-kit/

# ==========================================
# Static Media & Binary Assets
# ==========================================
*.png
*.jpg
*.jpeg
*.svg
*.gif
*.webp
*.ico
*.woff2
*.ttf
*.mp4

# ==========================================
# Lockfiles, Env & Logs
# ==========================================
package-lock.json
pnpm-lock.yaml
bun.lock
yarn.lock
.env
.env.*
*.log

# ==========================================
# Generated Translation Files (Prevents recursive scan)
# ==========================================
lang/lang.json
lang/
```

### 7.2 Programmatic Rule Matcher
```typescript
import { IgnoreRuleMatcher } from '@nexuss0781/langjs/server';

const matcher = new IgnoreRuleMatcher('.');
if (matcher.shouldIgnore('src/assets/logo.svg')) {
  // Path is ignored
}
```

---

## 8. Structured Side-by-Side `lang/lang.json` Specification

The `lang/lang.json` file uses a dual-format schema designed for both **O(1) runtime lookup speed** and **human/AI review clarity**.

### 8.1 Schema Specification

```json
{
  "$schema": "https://langjs.dev/schema/v1.json",
  "meta": {
    "generator": "LangJS Server Scanner v1.1.0",
    "version": "1.1.0",
    "generatedAt": "2026-10-01T00:00:00.000Z",
    "sourceLanguage": "en",
    "targetLanguages": ["en", "am", "es", "fr", "ja"],
    "totalUniqueStrings": 2
  },
  "locales": {
    "en": {
      "Turn Any Static Website into Multi-Lingual": "Turn Any Static Website into Multi-Lingual",
      "Get Started": "Get Started"
    },
    "am": {
      "Turn Any Static Website into Multi-Lingual": "ማንኛውንም የማይንቀሳቀስ ድረ-ገጽ ወደ ብዙ ቋንቋ ይለውጡ",
      "Get Started": "በነጻ ይጀምሩ"
    },
    "es": {
      "Turn Any Static Website into Multi-Lingual": "Convierta cualquier sitio web estático en multilingüe",
      "Get Started": "Comience Gratis"
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
      "notes": "Verified by AI agent to ensure idiom accuracy"
    },
    {
      "id": "str_2",
      "source": "Get Started",
      "type": "button_text",
      "occurrences": [
        { "file": "src/components/Navbar.tsx", "line": 88 },
        { "file": "src/components/Footer.tsx", "line": 104 }
      ],
      "translations": {
        "en": "Get Started",
        "am": "በነጻ ይጀምሩ",
        "es": "Comience Gratis"
      },
      "verified": true,
      "notes": ""
    }
  ]
}
```

### 8.2 Field Definitions
- `locales`: Direct dictionary table `locales[locale][sourceText]`. Used by `ServerTranslateRuntime` and client `LangJS` for instantaneous O(1) lookups.
- `sideBySide`: Array of translation records.
  - `id`: Unique deterministic hash.
  - `source`: The verbatim English/source string.
  - `occurrences`: Array of `{ file: string, line: number }` detailing exactly where the string appears in the codebase.
  - `translations`: Object mapping each language code to its translated string.
  - `verified`: Boolean flag (`true` when audited and approved by an AI agent or human).
  - `notes`: Operational notes regarding tone, brand guidelines, or context.

---

## 9. CLI Command Runner & CI/CD Pipelines

### 9.1 CLI Command

```bash
# Scan codebase and generate lang/lang.json
node scripts/scan-codebase.js --languages en,am,es,fr,ja --out lang/lang.json

# Using global/local npx package runner:
npx @nexuss0781/langjs scan -l en,am,es,fr,ja -o lang/lang.json
```

#### CLI Flags
- `--languages, -l`: Comma-separated list of target language codes (e.g. `en,am,es,fr,ja`).
- `--out, -o`: Output path for the manifest (default: `lang/lang.json`).
- `--ignore, -i`: Path to custom ignore file (default: `.langignore`).
- `--verify`: Checks if all strings in the codebase have verified translations in `lang/lang.json` (exits with code 1 if unverified strings exist).

### 9.2 GitHub Actions Automated CI Workflow

```yaml
name: LangJS Translation Sync & Verification
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  i18n-audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - run: npm ci
      - name: Scan Codebase & Audit Translations
        run: node scripts/scan-codebase.js --languages en,am,es,fr,ja --out lang/lang.json

      - name: Verify Git Cleanliness
        run: |
          git diff --exit-code lang/lang.json || (echo "lang/lang.json is out of date. Run 'npm run scan' and commit." && exit 1)
```

---

## 10. AI Agent Verification & Translation Auditing Workflows

When an AI agent is tasked with adding languages, auditing translations, or fixing UI copy, the agent MUST follow this standard operating procedure:

### Step 1: Run Codebase AST Scan
Execute the scan script to extract any newly added JSX/HTML/Vue strings into `lang/lang.json`:
```bash
node scripts/scan-codebase.js --languages en,am,es,fr,ja --out lang/lang.json
```

### Step 2: Audit Translations in `sideBySide`
Inspect `lang/lang.json`:
1. Locate items where `verified: false`.
2. Check `item.occurrences` to understand the UI context (e.g., button caption vs. heading vs. tooltip).
3. Correct machine translation errors:
   - Ensure brand names remain uncorrupted.
   - Verify proper grammatical voice (imperative for buttons, descriptive for headings).
   - Ensure RTL languages (Arabic, Hebrew, Persian) use proper grammatical order.
4. Set `item.verified = true`.
5. Mirror the corrected string into `manifest.locales[lang][item.source]`.

### Step 3: Run Validation & Compilation
Verify that the application compiles without errors:
```bash
npm run build
```

---

## 11. Troubleshooting, Performance & Edge Cases

### 11.1 Preventing Hydration Mismatches in SSR
When using Next.js SSR or Nuxt with client hydration:
- Ensure the server runtime passes the active locale to the client via an HTML attribute:
  `<html lang="es" data-langjs-locale="es">`
- In React/Vue client initialization, read `document.documentElement.lang` as `currentLanguage` so client and server states match identically.

### 11.2 Handling Dynamic Interpolations
If a sentence has dynamic variables (e.g. `Welcome back, John! You have 3 messages.`):
- Ensure dynamic variables are isolated in child elements:
  ```html
  <p>Welcome back, <span>John</span>! You have <span>3</span> messages.</p>
  ```
- This allows LangJS to match `"Welcome back, "` and `"! You have "` deterministically across all pages.

### 11.3 RTL Layout Flipping
When switching to Arabic (`ar`), Hebrew (`he`), Persian (`fa`), or Urdu (`ur`):
- LangJS automatically sets `document.documentElement.dir = 'rtl'`.
- Use logical CSS properties (`ms-*`, `me-*`, `text-start`, `text-end`) instead of absolute (`ml-*`, `mr-*`, `text-left`, `text-right`) in Tailwind CSS.

---

## Summary Checklist for AI Agents
- [ ] Install `@nexuss0781/langjs` via npm, or reference via CDN.
- [ ] Use `LangJS` in client components or `useLangJS` in React.
- [ ] Mount `ServerTranslateRuntime` middleware in Express/SSR servers.
- [ ] Maintain `.langignore` to avoid indexing dependencies.
- [ ] Keep `lang/lang.json` updated with side-by-side human/AI verified translations.
- [ ] Set `verified: true` for approved translations.
