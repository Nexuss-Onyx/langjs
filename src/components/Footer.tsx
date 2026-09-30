import React from 'react';
import { Globe, Github, Twitter, BookOpen, Shield } from 'lucide-react';
import { LANGUAGES, SupportedLanguage } from '../data/translations';

interface FooterProps {
  currentLang: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onLanguageChange }) => {
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
              The high-performance client-side translation engine that dynamically converts static websites and single page apps into multilingual experiences using Google Translate Neural API and custom JSON overrides.
            </p>
            <div className="mt-6 flex items-center gap-4 text-[#ebdcc9]/60">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 transition-colors hover:text-[#fdfbf7]"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </a>
              <span>·</span>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 transition-colors hover:text-[#fdfbf7]"
              >
                <Twitter className="h-4 w-4" />
                <span>Community</span>
              </a>
              <span>·</span>
              <a
                href="#api"
                className="flex items-center gap-1.5 transition-colors hover:text-[#fdfbf7]"
              >
                <BookOpen className="h-4 w-4" />
                <span>Documentation</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="font-semibold uppercase tracking-wider text-[#fdfbf7] text-[11px]">
              Engine Architecture
            </h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a href="#architecture" className="hover:text-[#fdfbf7] transition-colors">
                  DOM Text Crawler
                </a>
              </li>
              <li>
                <a href="#sandbox" className="hover:text-[#fdfbf7] transition-colors">
                  Interactive Sandbox
                </a>
              </li>
              <li>
                <a href="#api" className="hover:text-[#fdfbf7] transition-colors">
                  JavaScript API
                </a>
              </li>
              <li>
                <a href="#overrides" className="hover:text-[#fdfbf7] transition-colors">
                  Custom JSON Overrides
                </a>
              </li>
              <li>
                <a href="#benchmarks" className="hover:text-[#fdfbf7] transition-colors">
                  Performance Metrics
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
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => onLanguageChange(l.code)}
                  className={`rounded-md px-2 py-1 text-[11px] font-medium transition-all ${
                    currentLang === l.code
                      ? 'bg-[#9e1b32] text-white'
                      : 'border border-[#f6efe2]/10 bg-[#14030d] text-[#ebdcc9]/70 hover:text-white'
                  }`}
                >
                  <span className="mr-1">{l.flag}</span>
                  <span>{l.name}</span>
                </button>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-[11px] text-[#ebdcc9]/50">
              <Shield className="h-3.5 w-3.5 text-emerald-400" />
              <span>MIT Licensed · Open Source SDK</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-[#f6efe2]/10 pt-6 text-[11px] text-[#ebdcc9]/50 sm:flex-row">
          <div>© 2026 Langjs Foundation. All rights reserved.</div>
          <div className="mt-3 sm:mt-0 flex gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
