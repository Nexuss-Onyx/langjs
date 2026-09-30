import React from 'react';
import { Github, Package, BookOpen } from 'lucide-react';
import { ALL_100_LANGUAGES } from '../data/languages-100';
import { SupportedLanguage } from '../data/translations';

interface FooterProps {
  currentLang: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onNavigateToDocs?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onLanguageChange, onNavigateToDocs }) => {
  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg-card)] py-14 text-xs text-[var(--text-secondary)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:gap-12">
          {/* Col 1: Brand & Bio */}
          <div className="md:col-span-2">
            <a
              href="#"
              className="flex items-center gap-2.5 font-serif-luxury text-2xl font-bold tracking-tight text-[var(--text-hero)]"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#9e1b32] to-[#4a0d24] text-xs text-[#fdfbf7]">
                L
              </span>
              <span>
                Lang<span className="text-[#9e1b32]">js</span>
              </span>
            </a>
            <p className="mt-4 max-w-md text-xs leading-relaxed text-[var(--text-secondary)]">
              The high-performance client-side internationalization SDK and dynamic translation engine that powers 100+ languages in modern web applications without build-step key friction.
            </p>
            <div className="mt-6 flex items-center gap-4 text-[var(--text-muted)]">
              <a
                href="https://github.com/Nexuss-Onyx/langjs"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 transition-colors hover:text-[#9e1b32]"
              >
                <Github className="h-4 w-4 text-[#9e1b32]" />
                <span>GitHub</span>
              </a>
              <span>·</span>
              <a
                href="https://www.npmjs.com/package/@nexuss0781/langjs"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 transition-colors hover:text-[#9e1b32]"
              >
                <Package className="h-4 w-4 text-[#9e1b32]" />
                <span>NPM Package</span>
              </a>
              <span>·</span>
              {onNavigateToDocs && (
                <button
                  onClick={onNavigateToDocs}
                  className="flex items-center gap-1.5 transition-colors text-[#9e1b32] hover:text-[#b8223d] font-medium"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Documentation</span>
                </button>
              )}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="font-semibold uppercase tracking-wider text-[var(--text-hero)] text-[11px]">
              Platform & Resources
            </h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <button onClick={onNavigateToDocs} className="hover:text-[#9e1b32] transition-colors text-left text-[#9e1b32] font-medium">
                  Documentation & Guides
                </button>
              </li>
              <li>
                <a href="#languages" className="hover:text-[#9e1b32] transition-colors">
                  100+ Global Languages
                </a>
              </li>
              <li>
                <a href="#architecture" className="hover:text-[#9e1b32] transition-colors">
                  DOM TreeWalker Architecture
                </a>
              </li>
              <li>
                <a href="#benchmarks" className="hover:text-[#9e1b32] transition-colors">
                  Latency Benchmarks
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Language Quick Toggle */}
          <div>
            <h4 className="font-semibold uppercase tracking-wider text-[var(--text-hero)] text-[11px]">
              Active Page Language
            </h4>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {ALL_100_LANGUAGES.slice(0, 8).map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => onLanguageChange(lang.code as any)}
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all ${
                    currentLang === lang.code
                      ? 'border border-[#9e1b32] bg-[#9e1b32]/10 text-[#9e1b32] shadow-xs'
                      : 'border border-[var(--border-color)] bg-[var(--bg-card-hover)] text-[var(--text-secondary)] hover:border-[#9e1b32] hover:text-[#9e1b32]'
                  }`}
                >
                  <span className="mr-1">{lang.flag}</span>
                  <span>{lang.nativeName}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Subfooter */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-[var(--border-color)] pt-6 text-[11px] text-[var(--text-muted)] sm:flex-row">
          <div>
            © {new Date().getFullYear()} LangJS Architecture. Published under MIT License.
          </div>
          <div className="mt-2 sm:mt-0 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
            <span className="text-emerald-700 font-mono-code font-semibold">@nexuss0781/langjs@1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
