/**
 * @license
 * Langjs SDK - High-Performance DOM Crawler and Classifier
 */

import { ExtractedTextNode } from './types';

export class DomCrawler {
  private className: string;
  private trackedNodes: Map<string, ExtractedTextNode> = new Map();
  private ignoredTags = new Set([
    'SCRIPT', 'STYLE', 'CODE', 'PRE', 'NOSCRIPT', 'TEMPLATE', 
    'IFRAME', 'SVG', 'MATH', 'CANVAS', 'AUDIO', 'VIDEO'
  ]);

  constructor(className: string = 'langjs-node') {
    this.className = className;
  }

  /**
   * Generates a stable deterministic hash ID for a string
   */
  private generateId(text: string, prefix: string = 'txt'): string {
    let hash = 0;
    const clean = text.trim();
    for (let i = 0; i < clean.length; i++) {
      const char = clean.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(6, '0').slice(0, 6);
    return `${prefix}_${hex}`;
  }

  /**
   * Recursively crawls a root element, discovering all visible text and attributes
   */
  public crawl(root: HTMLElement): Map<string, ExtractedTextNode> {
    this.trackedNodes.clear();

    const walker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node: Node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as HTMLElement;
            if (this.ignoredTags.has(el.tagName)) {
              return NodeFilter.FILTER_REJECT;
            }
            if (el.hasAttribute('data-langjs-ignore') || el.closest('[data-langjs-ignore]')) {
              return NodeFilter.FILTER_REJECT;
            }
            if (el.isContentEditable) {
              return NodeFilter.FILTER_REJECT;
            }
            return NodeFilter.FILTER_ACCEPT;
          }

          if (node.nodeType === Node.TEXT_NODE) {
            const text = node.nodeValue?.trim() || '';
            const parent = node.parentElement;
            if (!parent || this.ignoredTags.has(parent.tagName) || parent.hasAttribute('data-langjs-ignore') || parent.closest('[data-langjs-ignore]')) {
              return NodeFilter.FILTER_REJECT;
            }
            // Ignore pure whitespace or single symbols
            if (text.length > 0 && /[a-zA-Z0-9\u00C0-\u024F\u1E00-\u1EFF\u0400-\u04FF\u0600-\u06FF\u0590-\u05FF\u3040-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uAC00-\uD7AF]/.test(text)) {
              return NodeFilter.FILTER_ACCEPT;
            }
            return NodeFilter.FILTER_SKIP;
          }

          return NodeFilter.FILTER_SKIP;
        },
      }
    );

    let currentNode: Node | null = walker.nextNode();
    let index = 0;

    while (currentNode) {
      if (currentNode.nodeType === Node.ELEMENT_NODE) {
        const el = currentNode as HTMLElement;

        // Check attributes: placeholder, aria-label, title, alt
        this.checkAttribute(el, 'placeholder', 'placeholder');
        this.checkAttribute(el, 'aria-label', 'aria-label');
        this.checkAttribute(el, 'title', 'title');
        if (el.tagName === 'IMG') {
          this.checkAttribute(el, 'alt', 'alt');
        }
      } else if (currentNode.nodeType === Node.TEXT_NODE) {
        const parent = currentNode.parentElement;
        const text = currentNode.nodeValue || '';
        const trimmed = text.trim();

        if (parent && trimmed.length > 0) {
          if (!parent.classList.contains(this.className)) {
            parent.classList.add(this.className);
          }

          index++;
          const id = `${this.generateId(trimmed, 'txt')}_${index}`;
          parent.setAttribute('data-langjs-id', id);

          this.trackedNodes.set(id, {
            id,
            originalText: trimmed,
            element: parent,
            rawTextNode: currentNode,
            type: 'text',
            tagName: parent.tagName.toLowerCase(),
          });
        }
      }

      currentNode = walker.nextNode();
    }

    return this.trackedNodes;
  }

  private checkAttribute(el: HTMLElement, attrName: string, type: ExtractedTextNode['type']) {
    const val = el.getAttribute(attrName)?.trim();
    if (val && val.length > 0) {
      const id = this.generateId(val, attrName.slice(0, 3));
      el.setAttribute(`data-langjs-${attrName}-id`, id);
      if (!el.hasAttribute(`data-langjs-orig-${attrName}`)) {
        el.setAttribute(`data-langjs-orig-${attrName}`, val);
      }
      if (!el.classList.contains(this.className)) {
        el.classList.add(this.className);
      }

      this.trackedNodes.set(`${id}_${attrName}`, {
        id: `${id}_${attrName}`,
        originalText: val,
        element: el,
        type,
        tagName: el.tagName.toLowerCase(),
      });
    }
  }

  public getTrackedNodes(): Map<string, ExtractedTextNode> {
    return this.trackedNodes;
  }
}
