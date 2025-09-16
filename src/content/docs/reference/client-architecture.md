---
title: Client Architecture
description: Technical overview of the Recogito client application architecture and components.
---

**Recogito Client** is a collaborative text and image annotation platform built with modern web technologies.

## Core Stack

- **Astro** (v5.7) - SSR framework with React integration
- **React** (v18.3) - UI components
- **TypeScript** - Type safety
- **Supabase** - Backend (authentication, database, storage)
- **Radix UI** - Accessible component primitives

## Key Features

### Multi-format Annotation

- **Text annotation** - `@recogito/text-annotator`
- **Image annotation** - IIIF-based with OpenSeadragon
- **PDF annotation** - `@recogito/pdf-annotator`
- **Annotorious integration** - Annotation UI framework

### Project Management

- Multi-user collaboration with roles and groups
- Project-based document organization
- Document contexts and layers
- Assignment tracking

### Authentication

- Username/password
- SAML/SSO
- Keycloak integration

## Architecture

### Directory Structure

- **src/apps/** - Feature modules (annotation-text, annotation-image, dashboard, auth, project management)
- **src/backend/** - CRUD operations, helpers, Supabase clients
- **src/components/** - 50+ React components
- **src/pages/** - Astro routes with i18n support (en/de)
- **src/plugins/** - Extensibility layer

### Data Model

#### Projects
Projects contain documents, contexts, and layers with configurable permissions:
- `is_open_join` - Allow users to join without invitation
- `is_open_edit` - Allow open editing
- `is_locked` - Prevent modifications
- `document_view_right` - Control document visibility

#### Users & Groups
Users organized into groups with permissions:
- Organization groups for multi-tenant support
- Project-specific groups
- Role-based access control

#### Documents
Support for multiple content types:
- IIIF protocol integration
- Metadata storage
- Collection organization
- Privacy controls

#### Annotations
Layered annotation system:
- Multiple layers per document
- Context-based organization
- Private/shared annotations
- Version tracking

### Backend Integration

#### Supabase Client
- **Browser client** (`supabaseBrowserClient.ts`) - Client-side operations
- **Server client** (`supabaseServerClient.ts`) - SSR operations

#### CRUD Operations
Organized by entity:
- `collections.ts`
- `contexts.ts`
- `documents.ts`
- `groups.ts`
- `layers.ts`
- `projects.ts`
- `tags.ts`
- `users.ts`

#### Helpers
Business logic for each domain:
- `annotationHelpers.ts`
- `documentHelpers.ts`
- `projectHelpers.ts`
- `userPermissionsHelpers.ts`
- And more...

### API Routes

- `accept-new-user.ts` - User onboarding
- `images.ts` - Image handling
- `invite-user-to-project.ts` - Project invitations
- `invite-user.ts` - Platform invitations

## Deployment

### Primary: Netlify
```bash
npm run build
```

### Alternative: Node.js Standalone
```bash
npm run build-node
node ./dist/server/entry.mjs
```

## Configuration

### Environment Variables
- `PUBLIC_SUPABASE` - Supabase project URL
- `PUBLIC_SUPABASE_API_KEY` - Anonymous key
- `PUBLIC_IIIF_CONFIGURATION` - IIIF server type
- `SUPABASE_SERVICE_KEY` - Service role key
- `ROOM_SECRET` - Realtime room identifier salt
- `IIIF_URL` - IIIF server location
- Mail configuration for transactional emails

### Branding
Configurable via `src/config.json`:
- Platform name and site name
- Colors and logos
- Authentication methods
- Welcome messaging

## Internationalization

- Support for multiple languages (en, de)
- Language-specific routes via `[lang]` parameter
- Translation files in `src/i18n/`

## Components

### Key Component Categories

- **Annotation** - Desktop and mobile annotation interfaces
- **Document** - Document cards, library views
- **Project** - Project creation, settings, collaboration
- **User Management** - User profiles, invitations, groups
- **Dashboard** - Account management, project dashboard
- **Authentication** - Login, signup, password reset
- **UI Primitives** - Buttons, dialogs, dropdowns, forms

## Development

### Installation
```bash
npm install
npm start  # Development mode on port 4321
```

### Build
```bash
npm run build  # Netlify build
npm run build-node  # Node.js build
```
