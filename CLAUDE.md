# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the documentation website for Recogito Studio, built with Astro and Starlight. Recogito Studio is described as "An Extensible Platform for Collaborative, Standards-Based Annotation of TEI Text, IIIF Images, and PDFs."

The site is deployed at https://recogitostudio.org/ and serves as the main documentation hub, linking to:
- Demo scheduling at Performant Software
- Self-hosting documentation on GitHub
- Community forum for support

## Architecture

### Framework Stack
- **Astro 5.13.0** - Static site generator with Starlight theme
- **@astrojs/starlight 0.35.2** - Documentation theme with built-in navigation, search, and internationalization
- **TypeScript** - Configured with strict mode via `astro/tsconfigs/strict`

### Site Configuration
- **Base URL**: https://recogitostudio.org/
- **Branding**: Custom logos (light/dark variants) stored in `/src/assets/`
- **Navigation**: Configured in `astro.config.mjs` with manual sidebar for guides and auto-generated reference section
- **Localization**: Default English locale with i18n structure in place

### Content Structure
- **Homepage**: Uses Starlight's "splash" template with hero section and card grid
- **Documentation**: Markdown/MDX files in `src/content/docs/`
- **Content Schema**: Configured via `src/content/config.ts` using Starlight's schema
- **Assets**: Images and logos in `src/assets/`, static files in `public/`

## Development Commands

All commands run from project root:

- `npm run dev` - Start development server at localhost:4321
- `npm run build` - Build production site with type checking (`astro check && astro build`)
- `npm run preview` - Preview production build locally
- `npm run astro` - Direct Astro CLI access

## Content Management

### Adding Documentation
- Create `.md` or `.mdx` files in `src/content/docs/`
- File-based routing: `src/content/docs/guides/example.md` → `/guides/example/`
- Use frontmatter for page metadata (title, description, template)

### Navigation Updates
- Manual sidebar configuration in `astro.config.mjs`
- Reference section auto-generates from `src/content/docs/reference/` directory
- Update social links and branding in the same config file

### Assets
- Add images to `src/assets/` and reference with relative paths in Markdown
- Static assets (favicon, etc.) go in `public/` directory
- Logo variants configured for light/dark themes

## Key Files

- `astro.config.mjs` - Main configuration, sidebar, branding, and site settings
- `src/content/config.ts` - Content schema definition
- `src/content/docs/index.mdx` - Homepage with hero and card components
- `package.json` - Dependencies and build scripts

## Deployment

Site builds to `./dist/` and is configured for deployment to https://recogitostudio.org/. The build process includes TypeScript checking before compilation.