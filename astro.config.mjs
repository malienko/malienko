import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://malienko.github.io',
  base: '/malienko',
  // Note: API routes require server-side rendering
  // For production with marketplace AI features, deploy to Netlify or Vercel
  // GitHub Pages only supports static sites
});
