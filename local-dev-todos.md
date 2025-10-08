# Local Development Setup - Todo List

**Last Updated**: 2025-10-06

## Progress Tracking

### Core Setup (Completed)
- [x] Install system prerequisites (Docker, Node.js, Git, Supabase CLI)
- [x] Set up Supabase local development environment (pgsodium issue resolved)
- [x] Clone recogito-server repository
- [x] Run Supabase migrations to populate database schema (156 migrations applied)
- [x] Populate database with roles and groups from config.json (create-default-groups.js)
- [x] Create and populate test users in database (5 test users created)
- [x] Assign test users to organization groups (assign-test-user-groups.js script created)
- [x] Clone recogito-client repository
- [x] Fix Netlify adapter issue (swap to Node adapter for local dev)
- [x] Configure client environment variables (.env)
- [x] Install client dependencies and start dev server
- [x] Verify complete stack is running (Supabase, Client)
- [x] Test authentication (professor@example.com works)
- [x] Test basic functionality (project creation, document upload)

### Documentation Updates (Completed)
- [x] Update local-development.mdx guide with:
  - [x] Supabase CLI pgsodium fix
  - [x] Node adapter requirement
  - [x] Database population step (create-default-groups.js)
  - [x] Test user creation step
  - [x] Test user group assignment step
  - [x] Complete troubleshooting section
- [x] Create assign-test-user-groups.js script for recogito-server
- [x] Document known issues in local-dev-setup-log.md:
  - [x] Issue #1: Document upload UI doesn't refresh (recogito-client)
- [x] Create DOCUMENTATION_TODOS.md with planned pages:
  - [x] Plugin setup guides (local and self-hosted)
  - [x] IIIF/FairImage setup guide
  - [x] Roadmap page
  - [x] Pricing page
  - [x] Support page

### Config Tool (Optional - Not Required for Basic Setup)
- [x] ~~Clone recogito-config repository~~ (already cloned, but optional)
- [x] ~~Set up recogito-config tool environment~~ (optional for basic dev)
- [x] ~~Generate configuration file using config tool~~ (default configs work)
- [x] ~~Deploy configuration file to client~~ (using default config.json)

**Note**: The config tool is optional for local development. Both recogito-server and recogito-client come with default config.json files that work out of the box.

## Current Status

**Current Task**: ✅ Local development environment fully operational

**Environment Running**:
- ✅ Supabase (PostgreSQL + Auth + Storage): http://127.0.0.1:54321
- ✅ Supabase Studio: http://127.0.0.1:54323
- ✅ Mailpit (email testing): http://127.0.0.1:54324
- ✅ Recogito Client: http://localhost:4322
- ✅ Documentation site: http://localhost:4323 (preview mode)

**Test Users Available** (all with password: `password123`):
- admin@example.com (Org Admin)
- professor@example.com (Org Professor - can create projects)
- student@example.com (Org Reader)
- tutor@example.com (Org Reader)
- reader@example.com (Org Reader)
- invited@example.com (Org Reader)

**Current Blocker**: None

**Tested Features**:
- ✅ User authentication and login
- ✅ Project creation
- ✅ Document upload (backend works, UI requires refresh)
- ✅ Navigation and routing
- ✅ Database operations
- ✅ Storage operations

## Known Issues Discovered

### Issue #1: Document Upload UI Doesn't Refresh
- **Status**: Documented in local-dev-setup-log.md
- **Repository**: recogito-client
- **Impact**: Low (workaround: refresh page)
- **Workaround**: Refresh browser after upload completes

## Scripts Created

1. **assign-test-user-groups.js** (recogito-server)
   - Assigns test users to appropriate organization groups
   - Required for role-based access testing
   - Idempotent (safe to run multiple times)
   - Location: `/Users/jamie/repos/recogito-server/assign-test-user-groups.js`

## Documentation Deliverables

### Completed
1. **Local Development Guide** (`src/content/docs/guides/local-development.mdx`)
   - Complete step-by-step setup instructions
   - Troubleshooting section
   - Common development tasks
   - Version badge (v1.5.0)

2. **Local Development Setup Log** (`local-dev-setup-log.md`)
   - Detailed issue tracking and solutions
   - Known issues for GitHub
   - Critical issues and recommendations

3. **Documentation Todos** (`DOCUMENTATION_TODOS.md`)
   - Planned pages with priorities
   - Content outlines
   - Dependencies and links

### In Progress
- Documenting additional edge cases as discovered

## Next Steps

### Immediate Tasks
- [ ] Continue testing application features
- [ ] Document any additional issues discovered
- [ ] Test collaborative annotation features
- [ ] Verify realtime features work

### Future Tasks
- [ ] Create GitHub issues from local-dev-setup-log.md
- [ ] Implement planned documentation pages from DOCUMENTATION_TODOS.md
- [ ] Add plugin setup guides
- [ ] Create IIIF/FairImage guide
- [ ] Build roadmap page
- [ ] Design pricing page
- [ ] Expand support page

## Reference

### Repository Locations
- **Documentation**: `/Users/jamie/repos/recogito.github.io`
- **Server**: `/Users/jamie/repos/recogito-server`
- **Client**: `/Users/jamie/repos/recogito-client`
- **Config Tool**: `/Users/jamie/repos/recogito-config` (optional)

### Key Files
- **Local Dev Guide**: `src/content/docs/guides/local-development.mdx`
- **Setup Log**: `local-dev-setup-log.md`
- **Doc Todos**: `DOCUMENTATION_TODOS.md`
- **Server Config**: `recogito-server/config.json`
- **Client Config**: `recogito-client/src/config.json`

### Service Endpoints
- Supabase API: http://localhost:54321
- Supabase Studio: http://localhost:54323
- Mailpit: http://localhost:54324
- Client: http://localhost:4322
- Docs Preview: http://localhost:4323
