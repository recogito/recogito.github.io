---
title: Server Architecture
description: Technical overview of the Recogito server database architecture and backend systems.
sidebar:
  order: 2
---

**Recogito Server** is the Supabase-based backend that powers the Recogito platform, providing authentication, data storage, and business logic.

## Architecture Overview

- **Supabase PostgreSQL** - Primary database
- **Row-Level Security (RLS)** - Multi-tenant access control
- **Database triggers** - Automated data management
- **Stored procedures** - 90+ SQL functions for business logic
- **Jest tests** - Database operation testing

## Database Schema

### Core Entities

#### Projects
Top-level organizational unit (`projects` table):
- UUID-based identification
- Creator and updater tracking
- Archive support
- Join/edit permissions (`is_open_join`, `is_open_edit`)
- Lock state (`is_locked`)
- Document view rights configuration

#### Documents
Files and content (`documents` table):
- Name and content type
- Bucket-based storage
- IIIF protocol support with metadata
- Privacy controls
- Collection organization
- Revision tracking

#### Contexts
Document groupings within projects (`contexts` table):
- Named organizational units
- Project associations
- Default context support
- Layer context relationships

#### Layers
Annotation organization (`layers` table):
- Document-specific layers
- Read-only capability
- Collaborative annotation support
- Group-based access control
- Archive support

#### Annotations
Actual annotation data (`annotations` table):
- UUID identification
- Version tracking (auto-incrementing)
- Layer associations with cascade deletion
- Privacy controls (`is_private`)
- Archive support
- Creator/updater tracking

#### Bodies
Annotation content and payloads (`bodies` table):
- Linked to annotations
- Stores actual annotation data
- Version tracking

#### Tags
Tagging system (`tags` table):
- Tag definitions
- Target associations
- Archive support

### Organization & Access Control

#### Profiles
User profiles (`profiles` table):
- User information
- EULA acceptance tracking
- Organization membership

#### Organization Groups
Multi-tenant organization structure (`organization_groups` table):
- Organization-level grouping
- Admin role assignments

#### Default Groups
Role templates (`default_groups` table):
- Predefined roles: org admin, professor, student, tutor, reader
- Template-based group creation

#### Groups
Project-specific groups (`groups` table):
- Project associations
- Admin flags
- Default group indicators
- Member management

#### Group Users
Group membership (`group_users` table):
- User-group relationships
- Membership timestamps

### Collaboration Features

#### Invites
User invitations (`invites` table):
- Email-based invitations
- Project associations
- Group assignments
- Acceptance tracking

#### Join Requests
Project join requests (`join_requests` table):
- User request tracking
- Approval workflow

#### Notifications
User notifications (`notifications` table):
- Event-based notifications
- Read/unread tracking

### Advanced Features

#### Collections
Document collections (`collections` table):
- Collection organization
- Metadata storage

#### Policies
Configurable access policies (`policies` table):
- Fine-grained access control
- Action-based permissions
- Policy assignment to entities

#### Installed Plugins
Plugin system (`installed_plugins` table):
- Plugin management
- Configuration storage

#### Layer Contexts & Groups
Advanced layer organization:
- `layer_contexts` - Layer-context relationships
- `layer_groups` - Layer-group access control

## Security & Permissions

### Row-Level Security (RLS)

All tables protected by RLS policies:
- Multi-tenant data isolation
- User-specific data access
- Group-based permissions
- Policy-driven authorization

### Policy System

Configurable via `config.json`:
- Table-level policies
- Operation-based access (SELECT, INSERT, UPDATE, DELETE)
- UUID-based policy identification
- Hierarchical permission structure

### Permission Check Functions

90+ stored procedures including:
- `check_action_policy_layer_from_context`
- `check_action_policy_layer_from_document`
- Layer, context, and document permission validation
- User role verification

### User Role Hierarchy

1. **Organization Admin** - Highest level access
2. **Group Admin** - Project-level administration
3. **Group Members** - Assigned permissions within projects

## Database Functions (RPC)

### Project Management
- `add_documents_to_project_rpc`
- `archive_project_documents_rpc`
- `accept_join_request_rpc`

### Context Management
- `add_documents_to_context_rpc`
- `add_users_to_context_rpc`
- `archive_context_rpc`
- `archive_context_documents_rpc`

### Document Management
- `archive_document_rpc`
- Document upload handling
- Collection management

### Layer Management
- `add_read_only_layer_rpc`
- Layer group assignments
- Layer context associations

### User Management
- `add_user_to_org_default`
- `change_org_group_membership`
- `anonymize_profile`
- `accept_project_invite`

### Tag Management
- `archive_tag_definition_rpc`
- `archive_tags_for_target`
- Tag assignment operations

## Database Triggers

Automated data management for:
- `annotations` - Versioning, archiving
- `bodies` - Related data updates
- `collections` - Metadata updates
- `contexts` - Cascade operations
- `documents` - File operations
- `group_users` - Membership changes
- `layers` - Access control updates
- `notifications` - Event creation
- `profiles` - User onboarding
- And more...

## Infrastructure

### Local Development

**Supabase Stack:**
- API server: `localhost:54321`
- Database: `localhost:54322`
- Studio UI: `localhost:54323`
- Email testing (Inbucket): `localhost:54324`

**Configuration:** `supabase/config.toml`

### Docker Compose

Local development environment:
- PostgreSQL database
- Supabase services
- Nginx reverse proxy
- Volume management

### Migrations

150+ database migrations tracking schema evolution:
- Timestamped migration files
- Version-controlled schema changes
- Incremental updates from May 2023 onwards

### Seed Data

- Default groups and roles
- Test user creation scripts
- Policy population
- Sample data for development

## Integration

### Client Connection

Via Supabase JS client:
- Browser client for client-side operations
- Server client for SSR operations
- Real-time subscriptions
- Storage bucket access

### External Services

- **IIIF Server** - Image serving and manifest handling
- **Email** - Transactional emails (invites, password resets)
- **JWT Authentication** - 1-hour token expiry

### API Endpoints

Server-side API routes in client:
- User acceptance
- Invitations
- Image handling
- Project operations

## Testing

### Jest Test Suite

Located in `jest/` directory:
- Database operation tests
- RLS policy verification
- Function testing
- TypeScript-based test files

### Test Configuration

- `jest.config.ts` - Test runner configuration
- `database.types.ts` - Type definitions
- Test users with different role levels
- Isolated test environment

## Configuration

### Environment Variables

```bash
SUPABASE_SERVICE_KEY=<service_key>
SUPABASE_HOST=http://localhost:54321

# Test users
ORG_ADMIN_PW=<password>
ORG_ADMIN_GROUP_ID=<uuid>
PROFESSOR_PW=<password>
PROFESSOR_GROUP_ID=<uuid>
STUDENT_PW=<password>
STUDENT_GROUP_ID=<uuid>
TUTOR_PW=<password>
READER_PW=<password>
INVITE_PW=<password>
```

### Policy Configuration

`config.json` - Centralized policy definitions:
- Table-level policies
- Operation permissions
- UUIDs for policy identification
- Version tracking

## Development Tools

### Utility Scripts

- `create-default-groups.js` - Initialize role groups
- `create-test-users.js` - Generate test accounts
- `test-email-signup.js` - Email verification testing
- `run_tests.sh` - Test runner script

### Documentation

- `Documentation/local_development.md` - Local setup guide
- `Documentation/manually-updating-recogito-server.md` - Update procedures
- `docker/useful-commands.md` - Docker operations
- `docker/nginx-install.md` - Nginx configuration

### OpenAPI Specification

`docker/openapi.yaml` - API documentation

## Database Design Patterns

### Soft Deletes

Archive columns instead of hard deletes:
- `is_archived` boolean on most tables
- Archive RPC functions
- Maintains data integrity
- Enables data recovery

### Audit Trails

Comprehensive tracking:
- `created_at` / `created_by`
- `updated_at` / `updated_by`
- Version columns with auto-increment
- Timestamp with timezone

### Cascade Deletes

Proper foreign key constraints:
- Annotations cascade from layers
- Maintain referential integrity
- Prevent orphaned records

### UUID Primary Keys

All tables use UUIDs:
- `uuid_generate_v4()` default
- Globally unique identifiers
- Security through obscurity
- Distribution-friendly
