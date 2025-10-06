import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  site: 'https://recogitostudio.org/',
  integrations: [starlight({
    title: '',
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
    social: [
      { icon: 'github', label: 'github' , href: 'https://github.com/recogito/' },
    ],
    sidebar: [{
      label: 'Guides',
      autogenerate: {
        directory: 'guides'
      }
    }, {
      label: 'Reference',
      autogenerate: {
        directory: 'reference'
      }
    }]
  })],
});