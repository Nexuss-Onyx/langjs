import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does Langjs detect and class text without modifying our source HTML?',
      a: 'Langjs uses a high-performance TreeWalker DOM algorithm when your page mounts. It identifies all text nodes, input placeholders, title attributes, and aria-labels. It attaches non-destructive runtime tracking classes (`.langjs-node`) and deterministic hash identifiers (`data-langjs-id="txt_xxx"`), preserving all event listeners, frameworks, and styles.',
    },
    {
      q: 'How does the Google Translate integration work with custom JSON overrides?',
      a: 'Langjs first checks your local override dictionary (e.g. `locales/es.json`). If a matching phrase or token key exists, it applies your custom human-crafted translation immediately. For any unmapped text, it queries the Google Translate Neural Cloud API and caches the result locally and at the edge CDN, ensuring zero repeat requests.',
    },
    {
      q: 'Can I implement my own custom styled language switcher button?',
      a: 'Absolutely. Langjs provides a lightweight headless JavaScript API. You can design any button or select dropdown in HTML/CSS and call `lang.setLanguage("ja")` or `lang.toggle()` in its click handler. You can also listen to `lang.on("change", ...)` to update button labels and icons dynamically.',
    },
    {
      q: 'Is Langjs compatible with Single Page Apps (React, Vue, Svelte) and static sites?',
      a: 'Yes. Langjs includes built-in MutationObserver support. When your SPA dynamically renders new components or routes, Langjs automatically detects new text nodes and translates them in sub-milliseconds without triggering re-renders.',
    },
    {
      q: 'How does Langjs support Right-to-Left (RTL) languages like Arabic?',
      a: 'When an RTL language (such as Arabic or Hebrew) is selected, Langjs automatically toggles `document.documentElement.dir = "rtl"` and dynamically switches font styling to language-appropriate typography stacks.',
    },
    {
      q: 'Does it support SEO and Googlebot crawling for localized versions?',
      a: 'Yes. Langjs can dynamically update `<html lang="...">`, meta descriptions, and inject `<link rel="alternate" hreflang="...">` tags for search engine bots, or integrate with static prerendering workflows.',
    },
  ];

  return (
    <section className="relative py-24 bg-[#090205]">
      <div className="relative mx-auto max-w-4xl px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#f6efe2]/15 bg-[#1f0712] px-3.5 py-1 text-xs font-semibold text-[#ebdcc9]">
            <HelpCircle className="h-3.5 w-3.5 text-[#e11d48]" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="mt-4 font-serif-luxury text-3xl font-bold tracking-tight text-[#fdfbf7] sm:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#ebdcc9]/80">
            Everything you need to know about the Langjs DOM crawler, caching layers, and custom locale overrides.
          </p>
        </div>

        {/* Accordion */}
        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="luxury-card overflow-hidden rounded-xl border border-[#f6efe2]/10 transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between p-5 text-left text-sm font-semibold text-[#fdfbf7] hover:text-[#ebdcc9]"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-[#e11d48] transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-[#f6efe2]/5 px-5 pb-5 pt-3 text-xs sm:text-sm leading-relaxed text-[#ebdcc9]/80">
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
