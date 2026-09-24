import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';

const repoName = 'bella-brazil-beauty-salon.dev';
const base = `/${repoName}/`;

function fixSourceImages() {
  return {
    name: 'fix-source-images',

    apply: 'build',

    generateBundle() {
      const sourceDir = path.resolve(__dirname, 'src/assets/images');
      const outputDir = path.resolve(
        __dirname,
        'dist/src/assets/images'
      );

      if (!fs.existsSync(sourceDir)) {
        console.warn(`Image folder not found: ${sourceDir}`);
        return;
      }

      fs.mkdirSync(outputDir, { recursive: true });

      for (const file of fs.readdirSync(sourceDir)) {
        const sourceFile = path.join(sourceDir, file);
        const outputFile = path.join(outputDir, file);

        if (fs.statSync(sourceFile).isFile()) {
          fs.copyFileSync(sourceFile, outputFile);
        }
      }
    },

    transform(code: string, id: string) {
      if (
        id.includes('node_modules') ||
        !/\.(tsx?|jsx?|vue|svelte)$/.test(id)
      ) {
        return null;
      }

      const fixedCode = code.replace(
        /(["'`])\/src\/assets\/images\//g,
        `$1${base}src/assets/images/`
      );

      if (fixedCode === code) {
        return null;
      }

      return {
        code: fixedCode,
        map: null
      };
    }
  };
}

export default defineConfig({
  base,

  plugins: [
    react(),
    tailwindcss(),
    fixSourceImages()
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.')
    }
  },

  server: {
    hmr: process.env.DISABLE_HMR !== 'true',
    watch: process.env.DISABLE_HMR === 'true' ? null : {}
  }
});
