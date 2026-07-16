import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  build: {
    assets: 'assets',
  },
  // Opciones de prefetch para anticipar la carga cuando el usuario hace hover en un link
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover'
  },
});