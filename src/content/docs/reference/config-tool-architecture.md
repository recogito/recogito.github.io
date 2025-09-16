---
title: Configuration Tool Architecture
description: Technical overview of the Recogito configuration management tool.
---

**Recogito Config Tool** is a web-based configuration management application for administering and customizing Recogito platform deployments.

## Core Stack

- **Vite** - Build tool and dev server
- **React** (v18.2) - UI framework
- **TypeScript** - Type safety
- **Material UI (MUI)** - Component library and design system
- **TanStack Query (React Query)** - Data fetching and state management
- **Supabase JS Client** - Database integration
- **AJV** - JSON schema validation

## Purpose

The Config Tool provides a graphical interface for managing platform-wide configuration that controls:

- Access control policies
- User role definitions
- Default group structures
- Platform branding
- Authentication methods
- Multi-language content
- Administrative settings

## Architecture

### Application Structure

```
src/
├── components/        # UI components
│   ├── Admin/        # Admin settings management
│   ├── Authentication/  # Auth method configuration
│   ├── Branding/     # Visual customization
│   ├── DynamicText/  # Multi-language text
│   ├── Groups/       # Default group management
│   ├── Main/         # Main app layout with tabs
│   ├── Policies/     # Policy management
│   └── Roles/        # Role definition
├── config/           # App configuration
├── providers/        # React context providers
├── supabase/         # Database queries
├── types/            # TypeScript definitions
└── utilities/        # Helper functions
```

### Configuration File Structure

The tool manages a comprehensive JSON configuration file:

```typescript
{
  project_name: string;
  author: string;
  version: string;
  created_at: string;
  updated_at: string;
  supported_languages: string[];
  default_language: string;
  policies: PolicyDefinition[];
  roles: RoleDefinition[];
  org_groups: GroupDefinition[];
  project_groups: GroupDefinition[];
  layer_groups: GroupDefinition[];
  branding: Branding;
  dynamic_text: DynamicText;
  admin: {
    admin_email: string;
    admin_groups: string[];
  };
  authentication: {
    methods: AuthenticationMethod[];
  };
}
```

## Key Components

### 1. Policies

**Purpose:** Define database-level access control rules

**Structure:**
- `id` - Unique policy identifier (UUID)
- `table_name` - Database table name
- `operation` - CRUD operation (SELECT, INSERT, UPDATE, DELETE)

**Data Source:** Loaded from Supabase `policies` table

**Functionality:**
- View all available policies
- Grid-based display
- Read from database at startup
- Foundation for role-based access control

### 2. Roles

**Purpose:** Group policies into reusable permission sets

**Structure:**
- `id` - Unique role identifier
- `name` - Role name
- `description` - Role description
- `policies` - Array of policy IDs

**Functionality:**
- Create new roles
- Assign policies to roles
- Edit role definitions
- Delete roles
- Validation against available policies

### 3. Groups

**Purpose:** Define default group templates for organizations, projects, and layers

**Types:**
- **Organization Groups** - Tenant-level groups
- **Project Groups** - Project-specific groups
- **Layer Groups** - Annotation layer groups

**Structure:**
- `id` - Unique identifier
- `name` - Group name
- `description` - Group description
- `role_id` - Associated role
- `is_admin` - Admin privileges flag
- `is_default` - Default group flag
- `is_read_only` - Read-only restriction

**Functionality:**
- Create groups for each type
- Assign roles to groups
- Set admin and default flags
- Configure read-only access

### 4. Branding

**Purpose:** Customize platform visual identity

**Configuration:**
- `platform_name` - Platform display name
- `site_name` - Site-specific name
- `welcome_blurb` - Welcome message
- `site_color` - Primary color
- `home_banner` - Banner image URL
- `background_color` - Background color
- `contrast_color` - Text/contrast color
- `bottom_logos_enabled` - Footer logo toggle
- `footer_message` - Footer text
- `top_logos_enabled` - Header logo toggle
- `login_logo_enabled` - Login page logo toggle
- `favicon` - Favicon path

**Functionality:**
- Visual customization
- Color scheme configuration
- Logo and image management
- Welcome messaging

### 5. Authentication

**Purpose:** Configure authentication methods

**Supported Methods:**
- `username_password` - Traditional login
- `saml` - SAML/SSO integration
- `oauth` - OAuth providers
- `magic_link` - Passwordless email links
- `keycloak` - Keycloak integration

**Structure:**
- `name` - Display name
- `type` - Authentication type
- `domain` - Domain restriction (optional)

**Functionality:**
- Enable/disable auth methods
- Configure multiple methods
- Domain-based restrictions

### 6. Dynamic Text

**Purpose:** Manage multi-language platform text

**Structure:**
```typescript
{
  public_document_warning: [
    { language: 'en', text: 'English text' },
    { language: 'de', text: 'German text' }
  ]
}
```

**Functionality:**
- Multi-language support
- Translatable UI text
- Language-specific content

### 7. Admin Settings

**Purpose:** Configure platform administrators

**Configuration:**
- `admin_email` - Primary admin email
- `admin_groups` - Admin group IDs

**Functionality:**
- Define admin access
- Group-based admin rights

## Data Flow

### Loading Configuration

1. **Connect to Supabase** - Local instance at `localhost:54321`
2. **Fetch Policies** - Query `policies` table via React Query
3. **Load Config File** - Upload existing JSON config
4. **Merge Data** - Combine database policies with file configuration
5. **Display in UI** - Render in tabbed interface

### Editing Configuration

1. **Select Tab** - Navigate to configuration section
2. **Modify Settings** - Use form inputs and dialogs
3. **Update State** - Changes stored in React context
4. **Validation** - Validate against schemas and constraints

### Saving Configuration

1. **Update Version** - Increment version, update metadata
2. **Serialize Config** - Convert state to JSON
3. **Download File** - Save as JSON to local filesystem
4. **Manual Deployment** - Admin deploys to target environments

## State Management

### ConfigToolProvider

React Context provider managing:
- Loaded configuration file
- Policy data from database
- Role definitions
- Group configurations
- Branding settings
- Authentication methods
- Dynamic text

### Operations

- `setConfigFile()` - Load configuration
- `setFileName()` - Set active filename
- `getRole()` - Retrieve role by ID
- `addRole()` / `removeRole()` / `saveRole()` - Role CRUD
- `addGroup()` / `removeGroup()` - Group management
- `saveAdmin()` - Admin settings
- `saveVersion()` - Version metadata
- `saveBranding()` - Branding config
- `saveDynamicText()` - Multi-language text
- `addAuthMethod()` / `removeAuthMethod()` - Auth methods
- `onSaveConfig()` - Export configuration

## Database Integration

### Supabase Queries

**Policy Query:**
```typescript
supabase.from('policies').select('id, table_name, operation')
```

**Roles Query:**
```typescript
supabase.from('roles').select('*')
```

### Connection

- **Local Development:** `http://localhost:54321`
- **Authentication:** Service key via `VITE_SERVICE_KEY` environment variable
- **Read-Only:** Queries database but doesn't write back
- **One-Way Sync:** Policies loaded from DB, exported to JSON config

## User Interface

### Main Layout

**App Bar:**
- Application title
- Current config filename display
- Load/Save config buttons

**Tabs:**
1. **Policies** - Always accessible (database view)
2. **Roles** - Enabled after config load
3. **Default Groups** - Enabled after config load
4. **Admin** - Enabled after config load
5. **Branding** - Enabled after config load
6. **Dynamic Text** - Enabled after config load
7. **Authentication** - Enabled after config load

### Dialogs

- **LoadConfigDialog** - Upload existing config file
- **UpdateVersionDialog** - Update metadata before save
- **CreateGroupDialog** - Create new group
- **CreateAuthenticationMethodDialog** - Add auth method

### Data Grids

Material UI Data Grid for:
- Policy listing
- Role management
- Group overview

## Workflow

### Initial Setup

1. Start Supabase local development environment
2. Run config tool with `npm run dev`
3. Tool connects to `localhost:54321`
4. Policies auto-load from database

### Creating Configuration

1. Click "Load Config" to upload existing config or start fresh
2. Navigate through tabs to configure each section:
   - Define roles from available policies
   - Create default groups (org/project/layer)
   - Configure admin settings
   - Customize branding
   - Set authentication methods
   - Add multi-language text
3. Click "Save Config" to export
4. Enter metadata (project name, author, version)
5. Download JSON file

### Deploying Configuration

Configuration files are deployed manually:
- **Client:** Place in `src/config.json`
- **Server:** Place in `config.json` at root
- Both applications read config on startup

## Development

### Environment Variables

```bash
VITE_SERVICE_KEY=<supabase_service_key>
```

### Running Locally

```bash
npm install
npm run dev  # Starts on port 5173 by default
```

### Building

```bash
npm run build  # TypeScript compile + Vite build
npm run preview  # Preview production build
```

### Docker Deployment

```dockerfile
FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080
```

## Validation

### JSON Schema Validation

Uses AJV for:
- Configuration file structure validation
- Type checking
- Required field enforcement

### Business Logic Validation

- Role must reference existing policies
- Groups must reference existing roles
- No duplicate IDs
- Valid color formats for branding
- Valid authentication types

## Integration with Platform

### Client Integration

Client application (`recogito-client`) reads:
- Branding configuration for UI customization
- Authentication methods for login options
- Dynamic text for multi-language support

### Server Integration

Server application (`recogito-server`) uses:
- Policies for RLS policy seeding
- Roles for permission checking
- Default groups for initial setup
- Admin configuration for access control

### Configuration Flow

1. **Admin creates config** using Config Tool
2. **Export JSON** with all settings
3. **Deploy to client and server** repositories
4. **Applications read on startup** and apply settings
5. **Database seeded** with policies and groups

## File Management

### Default Configuration

`dafault-config.json` - Template configuration with:
- Standard policies for all tables
- Common roles (admin, professor, student, etc.)
- Default group structures
- Sample branding

### Export Format

Compact JSON with:
- No formatting for production
- All configuration in single file
- Timestamp metadata
- Version tracking

### Import/Export Utilities

```javascript
// Download configuration
download(data, filename)

// Deep copy objects
copyObject(object)
```

## Security Considerations

- **Service Key Required** - Admin-level database access
- **Local Only** - Designed for local development use
- **Manual Deployment** - No automated config push
- **Validation** - Schema checking prevents invalid configs
- **Audit Trail** - Version and author tracking

## Limitations

- **No Real-Time Sync** - Changes not pushed to database
- **Manual Export** - No automated deployment
- **Local Supabase Only** - Hardcoded to localhost:54321
- **No Collaboration** - Single-user tool
- **File-Based** - Configuration stored as JSON files
