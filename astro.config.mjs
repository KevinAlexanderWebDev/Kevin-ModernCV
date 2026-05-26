import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Desactivamos la construcción por defecto en /public para que los assets 
  // que pasemos a través de Content Collections y el tag <Image /> se compilen eficientemente
  build: {
    assets: 'assets',
  },
  // Opciones de prefetch para anticipar la carga cuando el usuario hace hover en un link
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover'
  }
});