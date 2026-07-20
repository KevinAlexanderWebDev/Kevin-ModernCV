import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://kevinalexanderwebdev.github.io',
  base: '/My-Portfolio_New',
  build: {
    assets: 'assets',
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover'
  },
});