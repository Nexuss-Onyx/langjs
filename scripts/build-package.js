import esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const pkgDir = path.resolve('pkg');
const distDir = path.join(pkgDir, 'dist');

if (!fs.existsSync(pkgDir)) {
  fs.mkdirSync(pkgDir, { recursive: true });
}
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// 1. Build ESM
esbuild.buildSync({
  entryPoints: ['src/sdk/index.ts'],
  outfile: path.join(distDir, 'index.js'),
  bundle: true,
  format: 'esm',
  target: 'es2020',
  sourcemap: true,
  minify: true,
});

// 2. Build CommonJS
esbuild.buildSync({
  entryPoints: ['src/sdk/index.ts'],
  outfile: path.join(distDir, 'index.cjs'),
  bundle: true,
  format: 'cjs',
  target: 'es2020',
  sourcemap: true,
  minify: true,
});

// 3. Build Browser Global IIFE (lang.min.js)
esbuild.buildSync({
  entryPoints: ['src/sdk/index.ts'],
  outfile: path.join(distDir, 'lang.min.js'),
  bundle: true,
  format: 'iife',
  globalName: 'LangJS',
  target: 'es2018',
  sourcemap: true,
  minify: true,
});

// 4. Generate TypeScript declaration files
try {
  execSync('npx tsc src/sdk/index.ts --declaration --emitDeclarationOnly --outDir pkg/dist/types --skipLibCheck --target es2020 --moduleResolution node', { stdio: 'inherit' });
  if (fs.existsSync('pkg/dist/types/sdk/index.d.ts')) {
    fs.copyFileSync('pkg/dist/types/sdk/index.d.ts', path.join(distDir, 'index.d.ts'));
  }
} catch (e) {
  console.warn('Type generation warning:', e.message);
}

// Write fallback index.d.ts if not present
if (!fs.existsSync(path.join(distDir, 'index.d.ts'))) {
  fs.writeFileSync(
    path.join(distDir, 'index.d.ts'),
    `export * from './types';\nexport { LangJS } from './lang';\nexport { DomCrawler } from './dom-crawler';\nexport { TranslateEngine } from './translate-engine';\nexport { StorageManager } from './storage';\n`
  );
}

// Copy README and LICENSE
fs.copyFileSync('README.md', path.join(pkgDir, 'README.md'));
fs.copyFileSync('LICENSE', path.join(pkgDir, 'LICENSE'));

console.log('✅ Package build complete in pkg/');
