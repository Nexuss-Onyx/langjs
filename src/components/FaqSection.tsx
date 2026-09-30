import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does Langjs detect and classify text without modifying source HTML?',
      a: 'Langjs uses a high-performance TreeWalker DOM algorithm when your page mounts. It identifies all text nodes, input placeholders, title attributes, and aria-labels. It attaches non-destructive runtime tracking classes (`.langjs-node`) and deterministic hash identifiers (`data-langjs-id="txt_xxx"`), preserving all event listeners, frameworks, and styles.',
    },
    {
      q: 'How does the translation integration work with custom JSON overrides?',
      a: 'Langjs first checks your local override dictionary. If a matching phrase or token key exists, it applies your custom human-crafted translation immediately. For any unmapped text, it queries the translation API and caches the result in LocalStorage, ensuring zero repeat requests.',
    },
    {
      q: 'Can I implement my own custom styled language switcher button?',
      a: 'Absolutely. Langjs provides a lightweight headless JavaScript API. You can design any button or select dropdown in HTML/CSS and call `lang.setLanguage("ja")` in its click handler. You can also listen to `lang.on("languageChanged", ...)` to update button labels and icons dynamically.',
    },
    {
      q: 'Is Langjs compatible with Single Page Apps (React, Vue, Svelte) and static sites?',
      a: 'Yes. Langjs includes built-in MutationObserver support. When your SPA dynamically renders new components or routes, Langjs automatically detects new text nodes and translates them in sub-milliseconds without triggering re-renders.',
    },
    {
      q: 'How does Langjs support Right-to-Left (RTL) languages like Arabic?',
      a: 'When an RTL language (such as Arabic or Hebrew) is selected, Langjs automatically toggles `document.documentElement.dir = "rtl"` and dynamically switches layout alignment.',
    },
    {
      q: 'Can I export all translated strings into a static JSON manifest for offline deployment?',
      a: 'Yes. Calling `lang.downloadJson()` extracts every scanned DOM node and its multi-lingual translations into a portable `lang.json` manifest that can be hosted on your CDN with zero runtime translation dependencies.',
    },
  ];

  return (
    <section className="relative py-20 lg:py-28">
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-mono-code text-[#9e1b32] uppercase tracking-wider font-semibold">
            Questions & Answers
          </div>
          <h2 className="mt-3 font-serif-luxury text-3xl font-bold tracking-tight text-[var(--text-hero)] sm:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[var(--text-secondary)]">
            Everything you need to know about the Langjs DOM crawler, caching layers, and custom locale overrides.
          </p>
        </div>

        {/* Accordion */}
        <div className="mt-12 space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="overflow-hidden rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] transition-colors shadow-xs"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between px-6 py-4.5 text-left text-sm sm:text-base font-semibold text-[var(--text-hero)] transition-colors hover:text-[#9e1b32]"
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-[var(--text-muted)] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#9e1b32]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-[var(--border-color)] bg-[var(--bg-card-hover)] px-6 py-4 text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
