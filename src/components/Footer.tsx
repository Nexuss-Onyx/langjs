import React from 'react';
import { Globe, Github, Package, BookOpen } from 'lucide-react';
import { ALL_100_LANGUAGES } from '../data/languages-100';
import { SupportedLanguage } from '../data/translations';

interface FooterProps {
  currentLang: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onNavigateToDocs?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onLanguageChange, onNavigateToDocs }) => {
  return (
    <footer className="border-t border-[#f6efe2]/10 bg-[#070104] py-14 text-xs text-[#ebdcc9]/70">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:gap-12">
          {/* Col 1: Brand & Bio */}
          <div className="md:col-span-2">
            <a
              href="#"
              className="flex items-center gap-2.5 font-serif-luxury text-2xl font-bold tracking-tight text-[#fdfbf7]"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#9e1b32] to-[#4a0d24] text-xs text-[#fdfbf7]">
                L
              </span>
              <span>
                Lang<span className="text-[#be185d]">js</span>
              </span>
            </a>
            <p className="mt-4 max-w-md text-xs leading-relaxed text-[#ebdcc9]/70">
              The high-performance client-side internationalization SDK and dynamic translation engine that powers 100+ languages in modern web applications without build-step key friction.
            </p>
            <div className="mt-6 flex items-center gap-4 text-[#ebdcc9]/60">
              <a
                href="https://github.com/Nexuss-Onyx/langjs"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 transition-colors hover:text-[#fdfbf7]"
              >
                <Github className="h-4 w-4 text-rose-400" />
                <span>GitHub</span>
              </a>
              <span>·</span>
              <a
                href="https://www.npmjs.com/package/@nexuss0781/langjs"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 transition-colors hover:text-[#fdfbf7]"
              >
                <Package className="h-4 w-4 text-rose-400" />
                <span>NPM Package</span>
              </a>
              <span>·</span>
              {onNavigateToDocs && (
                <button
                  onClick={onNavigateToDocs}
                  className="flex items-center gap-1.5 transition-colors text-rose-300 hover:text-white"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Documentation</span>
                </button>
              )}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="font-semibold uppercase tracking-wider text-[#fdfbf7] text-[11px]">
              Platform & Resources
            </h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <button onClick={onNavigateToDocs} className="hover:text-[#fdfbf7] transition-colors text-left text-rose-300">
                  Documentation & Guides
                </button>
              </li>
              <li>
                <a href="#sandbox" className="hover:text-[#fdfbf7] transition-colors">
                  Interactive Sandbox
                </a>
              </li>
              <li>
                <a href="#languages" className="hover:text-[#fdfbf7] transition-colors">
                  100+ Global Languages
                </a>
              </li>
              <li>
                <a href="#architecture" className="hover:text-[#fdfbf7] transition-colors">
                  DOM TreeWalker Architecture
                </a>
              </li>
              <li>
                <a href="#benchmarks" className="hover:text-[#fdfbf7] transition-colors">
                  Latency Benchmarks
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Language Quick Toggle */}
          <div>
            <h4 className="font-semibold uppercase tracking-wider text-[#fdfbf7] text-[11px]">
              Active Page Language
            </h4>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {ALL_100_LANGUAGES.slice(0, 8).map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => onLanguageChange(lang.code as any)}
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all ${
                    currentLang === lang.code
                      ? 'border border-[#be185d] bg-[#9e1b32]/40 text-[#fdfbf7] shadow-sm'
                      : 'border border-[#f6efe2]/10 bg-[#16040d] text-[#ebdcc9]/70 hover:border-[#f6efe2]/30 hover:text-[#fdfbf7]'
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
        <div className="mt-12 flex flex-col items-center justify-between border-t border-[#f6efe2]/10 pt-6 text-[11px] text-[#ebdcc9]/50 sm:flex-row">
          <div>
            © {new Date().getFullYear()} LangJS Architecture. Published under MIT License.
          </div>
          <div className="mt-2 sm:mt-0 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-emerald-400 font-mono-code">@nexuss0781/langjs@1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
