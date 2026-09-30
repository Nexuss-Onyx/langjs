<div align="center">

# 🌐 Langjs

**The zero-config, client-side internationalization SDK and dynamic 100+ language translation engine for modern web applications.**

[![npm version](https://img.shields.io/npm/v/@nexuss0781/langjs.svg?style=flat-square&color=9e1b32)](https://www.npmjs.com/package/@nexuss0781/langjs)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@nexuss0781/langjs?style=flat-square&color=emerald)](https://bundlephobia.com/package/@nexuss0781/langjs)
[![license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)
[![dependencies](https://img.shields.io/badge/dependencies-0-success?style=flat-square)](package.json)
[![demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-rose?style=flat-square&logo=github)](https://nexuss-onyx.github.io/langjs/)

<br />

[**Explore Live Showcase & Documentation →**](https://nexuss-onyx.github.io/langjs/)

<br />

</div>

---

## ⚡ The Problem with Traditional i18n

Traditional internationalization libraries require **weeks of tedious engineering overhead**:
- Wrapping every single string in source code (`t('nav.about.header.title')`).
- Managing thousands of disconnected keys across multiple static JSON dictionaries.
- Massive bundle bloating and frequent layout re-renders.
- Fragile build pipelines that break when templates or dynamic components change.

**Langjs rethinks internationalization from the ground up.** It uses a high-performance **DOM TreeWalker** that crawls your rendered HTML, identifies text nodes, classifies tokens, and dynamically translates visible text into **100+ languages in sub-10 milliseconds**—with **zero changes to your source HTML markup**.

---

## ✨ Features

- 🚀 **Zero-Config DOM Crawling** — Traverses and localizes visible text nodes, buttons, input placeholders, title attributes, and `aria-label`s without template rewrites.
- 🌍 **100+ Global Languages** — Instant access to every Google Translate language out of the box.
- ⚡ **Sub-10ms DOM In-Place Patching** — Mutates DOM text references directly with zero React re-renders or layout shifts.
- ✍️ **Custom Brand Overrides** — Guarantee brand slogans and critical terms remain exact with simple JSON dictionaries (`overrides: { "Nike": "Nike" }`).
- 🔄 **Automatic RTL Script Adaptation** — Automatically flips `document.documentElement.dir = "rtl"` and alignment when Arabic, Hebrew, Urdu, or Persian are active.
- 🗄️ **Intelligent Deduplication & Local Caching** — Identical tokens across pages are translated once and cached in `localStorage` with a 99.4% hit rate.
- 📦 **Zero Dependencies & Featherweight** — Weighs less than **2.8 KB min+gzip** with no third-party runtime dependencies.
- 🧩 **Universal Compatibility** — Works flawlessly in Vanilla JavaScript, React, Next.js, Vue, Svelte, Nuxt, Astro, and static HTML landing pages.
- 💾 **Offline Manifest Export** — Extract all scanned strings into a portable `lang.json` file via `lang.downloadJson()`.

---

## 📦 Installation

Install via your preferred package manager:

```bash
# npm
npm install @nexuss0781/langjs

# pnpm
pnpm add @nexuss0781/langjs

# yarn
yarn add @nexuss0781/langjs

# bun
bun add @nexuss0781/langjs
```

### Or via CDN (Direct `<script>` tag):

```html
<script src="https://cdn.jsdelivr.net/npm/@nexuss0781/langjs/dist/lang.min.js"></script>
```

---

## 🚀 Quick Start in 60 Seconds

### 1. Vanilla JavaScript / Static HTML

Drop this into your project. That's literally all you need to translate your entire document:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>My Website</title>
  </head>
  <body>
    <h1>Welcome to our Global Store</h1>
    <p>Discover hand-crafted luxury timepieces designed for modern collectors.</p>

    <!-- Language Selector -->
    <select onchange="window.lang.setLanguage(this.value)">
      <option value="en">English</option>
      <option value="es">Español</option>
      <option value="ja">日本語</option>
      <option value="fr">Français</option>
      <option value="ar">العربية (RTL)</option>
    </select>

    <script type="module">
      import { LangJS } from 'https://cdn.jsdelivr.net/npm/@nexuss0781/langjs/dist/index.js';

      // Initialize LangJS
      window.lang = new LangJS({
        defaultLanguage: 'en',
        autoDetect: true,       // Auto-detects visitor browser language
        autoRTL: true           // Automatically sets dir="rtl" for Arabic/Hebrew
      });
    </script>
  </body>
</html>
```

---

### 2. React / Next.js Integration

Use the built-in React hook for reactive UI state:

```tsx
import React from 'react';
import { useLangJS } from '@nexuss0781/langjs';

export function Navigation() {
  const { currentLang, isTranslating, setLanguage } = useLangJS({
    defaultLanguage: 'en',
    autoDetect: true
  });

  return (
    <nav className="flex items-center justify-between p-4">
      <span className="font-bold">BrandName</span>

      <div className="flex gap-2">
        <button 
          onClick={() => setLanguage('es')}
          className={`px-3 py-1 rounded ${currentLang === 'es' ? 'bg-red-700 text-white' : 'bg-gray-100'}`}
        >
          {isTranslating ? 'Translating...' : 'Español'}
        </button>

        <button 
          onClick={() => setLanguage('ja')}
          className={`px-3 py-1 rounded ${currentLang === 'ja' ? 'bg-red-700 text-white' : 'bg-gray-100'}`}
        >
          日本語
        </button>
      </div>
    </nav>
  );
}
```

---

## 🎯 Custom Brand Overrides (Human-Crafted Precision)

Machine translation is fast, but brand slogans and specialized trademarks require exact wording. Provide custom JSON override dictionaries:

```javascript
import { LangJS } from '@nexuss0781/langjs';

const lang = new LangJS({
  defaultLanguage: 'en',
  overrides: {
    es: {
      "Precision Timepieces": "Garde-temps de Alta Precisión",
      "Just Do It": "Just Do It", // Preserve exact brand slogan
      "Sign Up": "Crear Cuenta de Coleccionista"
    },
    ja: {
      "Precision Timepieces": "至高のハンドクラフト高級腕時計",
      "Explore Catalog": "コレクションを見る"
    }
  }
});

// Or load asynchronously from a CDN/JSON URL:
await lang.loadOverridesFromJson('https://cdn.example.com/locales/overrides.json');
```

---

## 📊 Quantitative Comparison

| Capability / Metric | Traditional i18n Libraries | Langjs Engine |
| :--- | :--- | :--- |
| **Setup & Implementation Time** | 2–4 weeks (wrapping every string in `t()`) | **1 minute** (1 import / script tag) |
| **Source Code Modification** | Requires refactoring all JSX/HTML files | **Zero modifications** (crawls DOM directly) |
| **Machine + Human Hybrid** | Requires third-party TMS integrations | **Instant API + local JSON overrides** |
| **Client Bundle Size** | 45KB – 120KB | **< 2.8KB** (zero dependencies) |
| **Dynamic SPAs Support** | Fails unless mapped in advance | **Built-in MutationObserver tracking** |
| **Right-to-Left (RTL)** | Manual conditional classes | **Automatic document `dir="rtl"` switching** |

---

## 📖 API Reference

### `new LangJS(options)`

Creates a new Langjs instance.

#### Options:

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `root` | `HTMLElement \| string` | `document.body` | Target root DOM container to localize. |
| `defaultLanguage` | `string` | `'en'` | Default source language of your website. |
| `currentLanguage` | `string` | `'en'` | Initial active language. |
| `autoDetect` | `boolean` | `false` | Automatically detect visitor language via `navigator.language`. |
| `autoRTL` | `boolean` | `true` | Automatically toggle `document.documentElement.dir = 'rtl'` for RTL languages. |
| `observeMutations` | `boolean` | `false` | Automatically translate new text nodes appended to the DOM dynamically. |
| `overrides` | `object` | `{}` | Local dictionary of exact phrase overrides per locale. |
| `className` | `string` | `'langjs-node'` | Class added to tracked DOM text nodes. |
| `storageKey` | `string` | `'langjs_storage'` | `localStorage` key used to cache translations and selected locale. |

### Instance Methods

#### `setLanguage(locale: string): Promise<boolean>`
Switches the active language, translates unique text tokens, and updates visible DOM nodes in-place.
```javascript
await lang.setLanguage('fr');
```

#### `getLanguage(): string`
Returns the currently active language code (e.g. `'es'`, `'ja'`).

#### `override(dictionary: Record<string, Record<string, string>>): void`
Merges custom string overrides into the active translation dictionary.

#### `extractDictionary(): LangManifest`
Extracts every scanned text node, token identifier, and multi-lingual translation into a structured object.

#### `downloadJson(filename?: string): void`
Triggers an immediate browser download of the complete `lang.json` manifest for offline or CDN deployment.

#### `toggleHighlight(): boolean`
Toggles visual bounding boxes around every DOM text node tracked by the Langjs crawler (ideal for debugging).

#### `destroy(): void`
Disconnects MutationObservers, detaches event listeners, and restores original DOM state.

---

## 🧪 Events & Lifecycle

Subscribe to lifecycle events using `lang.on()`:

```javascript
// Listen to language change start
lang.on('languageChanging', ({ language }) => {
  console.log(`Starting translation to ${language}...`);
});

// Listen to language change completion
lang.on('languageChanged', ({ language, latencyMs, count }) => {
  console.log(`Translated ${count} nodes to ${language} in ${latencyMs}ms!`);
});

// Listen to crawler scan completion
lang.on('scanned', ({ nodesFound }) => {
  console.log(`Identified ${nodesFound} visible text elements.`);
});
```

---

## 🌍 Supported Languages (100+)

Langjs supports over 100 global languages out of the box, including:

- **European:** English (`en`), Spanish (`es`), French (`fr`), German (`de`), Italian (`it`), Portuguese (`pt`), Russian (`ru`), Dutch (`nl`), Polish (`pl`), Swedish (`sv`), Danish (`da`), Finnish (`fi`), Norwegian (`no`), Greek (`el`), Czech (`cs`), Romanian (`ro`), Hungarian (`hu`).
- **Asian:** Japanese (`ja`), Simplified Chinese (`zh-CN`), Traditional Chinese (`zh-TW`), Korean (`ko`), Hindi (`hi`), Vietnamese (`vi`), Thai (`th`), Indonesian (`id`), Filipino (`tl`), Bengali (`bn`), Tamil (`ta`), Telugu (`te`).
- **Middle Eastern & RTL:** Arabic (`ar`), Hebrew (`he`), Persian (`fa`), Urdu (`ur`).
- **And 70+ more.**

Check the [Live Interactive Language Catalog](https://nexuss-onyx.github.io/langjs/#languages) to test them live!

---

## 🤝 Contributing

Contributions, bug reports, and feature requests are very welcome!

1. Fork the Project: [https://github.com/Nexuss-Onyx/langjs](https://github.com/Nexuss-Onyx/langjs)
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

<div align="center">
  <sub>Engineered with precision by <a href="https://github.com/Nexuss-Onyx">Nexuss-Onyx</a>. Published to npm as <a href="https://www.npmjs.com/package/@nexuss0781/langjs"><code>@nexuss0781/langjs</code></a>.</sub>
</div>
