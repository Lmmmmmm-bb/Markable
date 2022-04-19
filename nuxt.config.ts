import { defineNuxtConfig } from 'nuxt3';
import eslintPlugin from 'vite-plugin-eslint';

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  vite: {
    plugins: [eslintPlugin()]
  },
  css: [
    'primevue/resources/themes/saga-blue/theme.css',
    'primevue/resources/primevue.css',
    'primeicons/primeicons.css'
  ]
});
