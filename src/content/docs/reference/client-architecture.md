---
title: Client Architecture
description: How the Recogito Studio client is structured, and where to find things in the codebase.
sidebar:
  order: 1
---

**[recogito-client](https://github.com/recogito/recogito-client)** is the front-end of Recogito Studio: an Astro application (server-rendered, with React components) that talks to the [Supabase-based backend](/reference/server-architecture/).

## Stack

- [**Astro**](https://astro.build/) — server-rendered app framework, with React for interactive UI
- [**Supabase**](https://supabase.com/) — authentication, database, storage, and realtime
- [**Radix UI**](https://www.radix-ui.com/) — accessible component primitives
- **Annotation libraries** — [`@recogito/text-annotator`](https://github.com/recogito/text-annotator) (text/TEI), [`@recogito/pdf-annotator`](https://github.com/recogito/pdf-annotator) (PDF), and [Annotorious](https://annotorious.dev/) with OpenSeadragon (IIIF images)

## File structure

- **`src/apps/`** — feature modules (the dashboard, the text and image annotation views, project settings, collaboration, auth flows, user management, and more)
- **`src/backend/`** — Supabase browser/server clients, entity CRUD, and domain helpers
- **`src/components/`** — shared React components
- **`src/pages/`** — Astro routes, internationalized under `[lang]/`, plus the `api/` server endpoints
- **`src/plugins/`** — the plugin registry and extension mount points (see the [Plugins guide](/guides/plugins/) and [SDK guide](/guides/sdk/))
- **`src/i18n/`** — translations
- **`src/config.json`** — per-instance branding and authentication config (see the [Config Tool](/reference/config-tool/))

## Deployment

The client can be built in two ways, each with its own Astro adapter:

- **Netlify** (`npm run build`, `astro.config.mjs`) — used by the hosted service.
- **Node standalone** (`npm run build-node`, `astro.config.node.mjs`) — used for [self-hosting](/guides/self-hosting/); runs with `node ./dist/server/entry.mjs`.

## See also

- [Local Development](/guides/local-development/) — run the client and backend locally
- [Self-Hosting Guide](/guides/self-hosting/) — deploy to production, including all environment variables
- [Server Architecture](/reference/server-architecture/) — the data model and backend
