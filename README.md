# langjs

> Zero-config client-side internationalization SDK and dynamic 100+ language translation engine for modern web applications.

[![npm version](https://img.shields.io/npm/v/langjs.svg?style=flat-square)](https://www.npmjs.com/package/langjs)
[![License: MIT](https://img.shields.io/badge/License-MIT-burgundy.svg?style=flat-square)](https://opensource.org/licenses/MIT)

## Features

- **Automated DOM Crawling**: Discovers visible text nodes and assigns deterministic CSS tokens without breaking React/Vue virtual DOMs.
- **100+ Global Languages**: Powered by Google Translate Neural API with intelligent batching and multi-tier edge caching.
- **Sub-10ms In-Place Mutations**: Mutates exact text nodes in-place without triggering layout recalculations or iframe reload flashes.
- **Automatic RTL Switching**: Seamless bidirectional flipping for Arabic (`ar`), Hebrew (`iw`), Persian (`fa`), Urdu (`ur`), etc.
- **Dynamic Manifest Generator**: Extracts all tracked DOM nodes into portable `lang/lang.json` dictionaries.

## Installation

```bash
npm install langjs
```

Or load directly via CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/langjs/dist/lang.min.js"></script>
```

## Quick Start

### 1. Vanilla JavaScript

```javascript
import { LangJS } from 'langjs';

const lang = new LangJS({
  defaultLanguage: 'en',
  languages: ['en', 'es', 'fr', 'de', 'ja', 'ar', 'zh'],
  autoRTL: true,
});

// Switch language dynamically
await lang.setLanguage('es');

// Export complete translation dictionary
lang.downloadJson('lang.json');
```

### 2. CDN & HTML

```html
<script src="https://cdn.jsdelivr.net/npm/langjs/dist/lang.min.js"></script>
<script>
  const lang = new LangJS.LangJS({
    defaultLanguage: 'en',
    languages: ['en', 'es', 'fr', 'ja', 'ar']
  });

  document.getElementById('switch-btn').addEventListener('click', () => {
    lang.setLanguage('ja');
  });
</script>
```

### 3. Custom Copy Overrides

```javascript
const lang = new LangJS({
  defaultLanguage: 'en',
  overrides: {
    es: {
      "Welcome to our Platform": "Bienvenido a nuestra Plataforma Exclusiva"
    }
  }
});
```

## API Reference

### `new LangJS(options)`

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `root` | `HTMLElement \| string` | `document.body` | Target root element to scan. |
| `defaultLanguage` | `string` | `'en'` | Source language of the document. |
| `languages` | `string[]` | `['en', 'es', ...]` | Supported language codes. |
| `className` | `string` | `'langjs-node'` | Class added to tracked elements. |
| `autoRTL` | `boolean` | `true` | Automatically sets `dir="rtl"` for Arabic/Hebrew/Urdu. |
| `storageKey` | `string` | `'langjs_storage'` | LocalStorage cache key. |

### Methods

- `lang.setLanguage(code: string): Promise<void>`: Switches active language across all DOM nodes.
- `lang.scan(root?: HTMLElement): Map<string, ExtractedTextNode>`: Re-scans the DOM for dynamic nodes.
- `lang.extractDictionary(): LangManifest`: Generates complete `lang.json` translation manifest.
- `lang.downloadJson(filename?: string): void`: Downloads `lang.json` directly in browser.
- `lang.toggleHighlight(enable?: boolean): boolean`: Outlines all tracked DOM nodes.

## License

MIT © [nexuss0781](https://github.com/Nexuss-Onyx)
