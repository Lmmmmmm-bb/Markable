import { defineNuxtConfig } from 'nuxt';
import eslintPlugin from 'vite-plugin-eslint';

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  vue: {
    config: {
      devtools: true
    }
  },
  vite: {
    plugins: [eslintPlugin()]
  },
  css: [
    'primevue/resources/themes/lara-light-blue/theme.css',
    'primevue/resources/primevue.css',
    'primeicons/primeicons.css',
    'assets/styles/common/global.scss'
  ],
  build: {
    transpile: ['primevue']
  }
});
