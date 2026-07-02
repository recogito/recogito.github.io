---
title: Server Architecture
description: The Recogito Studio backend — its data model, access control, and where the authoritative schema lives.
sidebar:
  order: 2
---

**[recogito-server](https://github.com/recogito/recogito-server)** is the Recogito Studio backend, built on [Supabase](https://supabase.com/) (Postgres, authentication, storage, and realtime). The database schema is defined entirely by the SQL migrations in the repo, which are the source of truth for tables and columns.

## Data model

The core entities and how they relate:

- **Projects** — the top-level unit. A project holds **contexts** and configures join/edit/lock permissions.
- **Contexts** (also referred to as **assignments**) — groupings of documents within a project.
- **Documents** — text, IIIF image, or PDF resources, optionally organized into **collections**.
- **Layers** — per-document annotation layers, with group-based access control.
- **Annotations** and **bodies** — the annotation data attached to a layer; annotations carry the targets, bodies carry the content (comments, tags, etc.). Both support privacy and versioning.
- **Tags** — applied to annotation targets.
- **Users, groups, and roles** — users belong to organization and project groups, which drive role-based access.

Common conventions across tables: UUID primary keys, soft deletes (archive flags), created/updated audit columns, and cascade deletes from parent records.

## Access control

- **Roles** (Org Admin, Project Admin, Layer Admin, and others) and their permissions are defined in [`config.json`](https://github.com/recogito/recogito-server/blob/main/config.json) and applied to the database by `create-default-groups.js`. See the [Config Tool](/reference/config-tool/) for how that file is authored.
- Access is enforced in Postgres through **Row-Level Security** policies, so permission checks happen at the database layer regardless of client.

## Deployment

The backend runs locally via the Supabase CLI (`supabase start`, `supabase db reset`), then seeded with roles and test users. See [Local Development](/guides/local-development/) for the full setup, and the [Self-Hosting Guide](/guides/self-hosting/) for production deployment.

## See also

- [Client Architecture](/reference/client-architecture/) — the front-end that consumes this backend
- [Config Tool](/reference/config-tool/) — authoring roles, groups, and policies
