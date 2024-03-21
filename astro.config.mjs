import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://recogito.github.io/',
	integrations: [
		starlight({
			title: 'Recogito v4.0.0',
			defaultLocale: 'root', // optional
			locales: {
				root: {
					label: 'English',
					lang: 'en', // lang is required for root locales
				},
			},
			logo: {
				src: './src/assets/logo.svg',
			},			
			social: {
				github: 'https://github.com/recogito/',
			},
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', link: '/guides/example/' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
