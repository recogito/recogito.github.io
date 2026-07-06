---
title: Configuration Tool
description: The Recogito Studio config tool and the config.json it produces — roles, groups, branding, and authentication.
sidebar:
  order: 3
---

**[recogito-config](https://github.com/recogito/recogito-config)** is a web-based tool for authoring a Recogito Studio instance's `config.json`, the file that defines its roles, groups, access policies, branding, and sign-in methods. You can edit `config.json` by hand, but the tool provides a UI and validates the result.

`config.json` is consumed in two places: the **server** applies its roles, groups, and policies to the database (via `create-default-groups.js`), and the **client** reads its branding and authentication settings at build time.

## Configuration structure

```typescript
{
  project_name: string;
  author: string;
  version: string;
  created_at: string;
  supported_languages: string[];   // e.g. ["en", "de"]
  default_language: string;

  policies: PolicyDefinition[];     // named permission sets (per-resource actions)
  roles: RoleDefinition[];          // roles, each bundling a set of policies
  org_groups: GroupDefinition[];    // default organization-level groups, each mapped to a role
  project_groups: GroupDefinition[];// default per-project groups
  layer_groups: GroupDefinition[];  // default per-layer groups

  admin: {
    admin_email: string;            // the initial admin user
    admin_groups: string[];
  };

  branding: Branding;               // platform/site name, colors, logos, favicon, welcome text
  authentication: {
    methods: AuthenticationMethod[];// e.g. username_password, saml, keycloak
  };
  dynamic_text: DynamicText;        // customizable UI strings
}
```

For a complete working example, see [`default-config.json`](https://github.com/recogito/recogito-config/blob/main/default-config.json).

## Running the tool

The config tool is a Vite app run locally. See [Local Development](/guides/local-development/#phase-1-database-setup-recogito-server) (the "generate a custom configuration" step) for setup: it connects to your Supabase instance with `VITE_SUPABASE_API_URL` and `VITE_SUPABASE_SERVICE_KEY`, loads the current `config.json`, and exports an updated file to deploy to the client and server.

It provides a UI for each part of `config.json`:

### Branding

Platform and site name, colors, logos, favicon, and welcome text. The client reads these to render its header, footer, login page, and page title.

### Authentication

The sign-in methods offered on the login page — username/password, SAML/SSO, and Keycloak — each with a display name (and, for SSO, a domain).

### Dynamic Text

Customizable, multi-language UI strings. Note: this field is authored by the tool but is not currently read by the client or server, so editing it has no effect yet.

### Admin

The initial admin user's email and which groups count as admins. Applied to the database by `create-default-groups.js` when the config is deployed.

### Roles, groups, and policies

:::note
**Most installations should keep the default `policies`, `roles`, and group-to-role mappings as-is.** They encode Recogito Studio's standard permission model, and the app expects the default roles (Org Admin, Project Admin, Layer Admin, and so on) to exist. Editing them changes database-level access rules, so verify changes on a non-production instance first.
:::

Editing these allows you to change what a role can do, or to add a permission tier the defaults don't cover. A permission tier is modeled as a **role** plus a related **group**:

1. In **Roles**, click **Add Role**, name it, and toggle the permissions it should have (each table's SELECT / INSERT / UPDATE / DELETE).
2. In **Groups**, add a group at the scope you want — organization, project, or layer — and assign it your new role. Mark it default to auto-assign new members.
3. Save the config, then apply it with `create-default-groups.js` (or redeploy). Assign users to the group from the client's User Management UI.

If a permission can't be expressed as a table/operation toggle (for example, row-conditional rules or a brand-new table), it requires a server SQL migration instead of a config change.

## See also

- [Self-Hosting Guide](/guides/self-hosting/#customization) — applying a custom `config.json` to a deployment
- [Server Architecture](/reference/server-architecture/) — how roles and policies are enforced
