import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  site: 'https://recogito.github.io/',
  integrations: [starlight({
    title: 'Developer Documentation',
    defaultLocale: 'root',
    // optional
    locales: {
      root: {
        label: 'English',
        lang: 'en' // lang is required for root locales
      }
    },
    logo: {
      light: '/src/assets/recogito_logo_horizontal_black.png',
      dark: '/src/assets/recogito_logo_horizontal_white.png'
    },
    social: {
      github: 'https://github.com/recogito/'
    },
    sidebar: [{
      label: 'Guides',
      items: [
      // Each item here is one entry in the navigation menu.
      {
        label: 'Example Guide',
        link: '/guides/example/'
      }]
    }, {
      label: 'Reference',
      autogenerate: {
        directory: 'reference'
      }
    }]
  })],
});