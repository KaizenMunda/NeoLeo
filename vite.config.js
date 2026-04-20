import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        spa: resolve(__dirname, 'spa.html'),
        about: resolve(__dirname, 'about.html'),
        blog: resolve(__dirname, 'blog.html'),
        contact: resolve(__dirname, 'contact.html'),
        features: resolve(__dirname, 'features.html'),
        pricing: resolve(__dirname, 'pricing.html'),
        faq: resolve(__dirname, 'faq.html'),
        'detail-blog': resolve(__dirname, 'detail_blog-posts.html'),
        'detail-faq': resolve(__dirname, 'detail_faq.html'),
        '404': resolve(__dirname, '404.html'),
        '401': resolve(__dirname, '401.html'),
        changelog: resolve(__dirname, 'other/changelog.html'),
        instruction: resolve(__dirname, 'other/instruction.html'),
        license: resolve(__dirname, 'other/license.html'),
        'style-guide': resolve(__dirname, 'other/style-guide.html'),
      },
    },
  },
});
