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
    <section className="relative py-20 lg:py-28 bg-[#090205]">
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center">
          <div className="text-xs font-mono-code text-rose-300 uppercase tracking-wider">
            Questions & Answers
          </div>
          <h2 className="mt-3 font-serif-luxury text-3xl font-bold tracking-tight text-[#fdfbf7] sm:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#ebdcc9]/80">
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
                className="overflow-hidden rounded-xl border border-[#f6efe2]/10 bg-[#12030b] transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-[#190510]"
                >
                  <span className="font-serif-luxury text-base sm:text-lg font-semibold text-[#fdfbf7] pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-rose-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#ebdcc9]/80 leading-relaxed border-t border-[#f6efe2]/5">
                    {faq.a}
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
