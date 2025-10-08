# Documentation Site - Planned Pages

This document tracks planned documentation pages that need to be created for the Recogito Studio documentation site.

**Status Key**:
- 📝 Planned - Not yet started
- 🚧 In Progress - Currently being worked on
- ✅ Complete - Published
- 🔄 Needs Update - Exists but needs revision

---

## Guides Section

### 📝 Plugin Setup for Local Development
**Status**: Planned
**Priority**: High
**File**: `src/content/docs/guides/plugin-setup-local.mdx`

**Content**:
- Setting up existing plugins in local development environment
- Configuration for plugins that depend on external services
  - Trigger.dev setup and configuration
  - External API integrations
  - Environment variables and secrets management
- Testing plugins locally
- Common troubleshooting issues

**Dependencies**:
- Local development guide (✅ complete)
- Plugin SDK documentation (✅ complete)

---

### 📝 Plugin Setup for Self-Hosted Environments
**Status**: Planned
**Priority**: High
**File**: `src/content/docs/guides/plugin-setup-self-hosted.mdx`

**Content**:
- Installing and configuring plugins in production self-hosted deployments
- Managing external service dependencies in production
  - Trigger.dev production setup
  - API key management
  - Service authentication
- Plugin versioning and updates
- Performance considerations
- Security best practices for plugin configurations

**Dependencies**:
- Self-hosting guide (✅ complete)
- Plugin SDK documentation (✅ complete)

---

### 📝 IIIF Image Hosting with FairImage
**Status**: Planned
**Priority**: Medium
**File**: `src/content/docs/guides/iiif-fairimage-setup.mdx`

**Content**:
- Introduction to FairImage (Performant Software's open source IIIF solution)
- Installing FairImage for local development
- Installing FairImage for production
- Configuring Recogito Studio to use FairImage
- Image upload and management workflows
- IIIF manifest generation
- Performance tuning and optimization
- Integration with cloud storage (S3, etc.)

**External Links**:
- FairImage GitHub repository: (need URL)
- FairImage documentation: (need URL)

**Related**:
- Should reference IIIF configuration in environment variables doc

---

## Reference Section

### 📝 Roadmap
**Status**: Planned
**Priority**: Medium
**File**: `src/content/docs/reference/roadmap.md`

**Content**:
- Feature request tracking and status
- Status categories:
  - **Submitted** - New feature requests from community
  - **Under Consideration** - Being evaluated by team
  - **Deferred** - Not planned for immediate development
  - **Accepted (Funded)** - Approved and funded for development
  - **Under Development** - Currently being built
  - **In Testing** - Feature complete, undergoing QA
  - **Released** - Available in latest release
  - **Deployed** - Live on Performant's cloud hosting service
- Timeline estimates (where available)
- How to submit feature requests

**Data Source**:
- May need to integrate with GitHub Projects or external tracking system
- Consider using a dynamic data source vs static page

---

## Top-Level Pages

### 📝 Pricing & Hosted Instance Subscription
**Status**: Planned
**Priority**: High
**File**: `src/content/docs/pricing.md` or separate section

**Content**:
- Hosted instance pricing tiers
- Features included in each tier
- Comparison: hosted vs self-hosted
- Performant Studio subscriber discounts
- How to sign up / get started
- Support included with hosted plans
- SLA information

**External Links**:
- Performant Software Studio pricing: https://www.performantsoftware.com/studio/

**Notes**:
- May need custom Astro component for pricing table
- Consider dynamic pricing (if it changes frequently)
- Legal review for terms of service links

---

### 📝 Support
**Status**: Planned
**Priority**: High
**File**: `src/content/docs/support.md`

**Content**:
- Support channels and how to get help
  - **Community Forum**: https://community.performantsoftware.com/c/recogito/5
  - GitHub issues (for bugs/feature requests)
  - Email support (for hosted customers)
- Documentation resources
  - Link to all guide sections
  - FAQ section
  - Common troubleshooting
- Response time expectations
- How to report bugs
- How to request features
- Contributing to Recogito
  - Code contributions
  - Documentation contributions
  - Translation contributions

**Design Considerations**:
- Use Starlight's Card components for different support options
- Include search tips for finding help in docs

---

## Future Considerations

### Ideas for Additional Pages

- **Tutorials**: Step-by-step project walkthroughs (e.g., "Annotating a manuscript")
- **API Reference**: If/when Recogito exposes public APIs
- **Changelog**: Version history and release notes
- **Case Studies**: Examples of Recogito in use
- **Performance Guide**: Optimization tips for large projects
- **Security Guide**: Best practices for securing self-hosted instances
- **Migration Guide**: Moving from hosted to self-hosted (or vice versa)
- **Backup & Recovery**: Data protection strategies
- **Accessibility**: WCAG compliance and features
- **Internationalization**: How to add new languages

---

## Notes

- All new pages should follow Starlight's content structure
- Include frontmatter with title, description, and sidebar ordering
- Use Starlight components (Card, Steps, Tabs) where appropriate
- Add to `astro.config.mjs` sidebar if manual ordering is needed
- Test all external links before publishing
- Include screenshots/diagrams where helpful
- Maintain consistent tone and style with existing docs
