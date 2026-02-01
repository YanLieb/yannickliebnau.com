import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  build: {
    sourcemap: true,
    outDir: 'public/dist',
    rollupOptions: {
      input: {
        'script': 'public/src/ts/script.ts',
        'style': 'public/src/css/style.css'
      },
      output: {
        entryFileNames: '[name].js',
        assetFileNames: '[name].css',
      }
    }
  },
  plugins: [
    tailwindcss(),
  ],
  publicDir: false
})