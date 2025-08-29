---
title: Environment Variables
description: Complete reference for configuring Recogito Studio environment variables.
---

This reference covers all environment variables used in Recogito Studio configuration.

## Security Variables

### Database Authentication
```bash
POSTGRES_PASSWORD="your_secure_password"
```
**Required**. Secure password for PostgreSQL database. Recommend 12+ characters with mixed case, numbers.

### JWT Configuration
```bash
JWT_SECRET="base64_encoded_secret"
ANON_KEY="generated_jwt_token" 
SERVICE_ROLE_KEY="generated_jwt_token"
```
**Required**. Generate JWT_SECRET with `openssl rand -base64 36`. Use [Supabase JWT Generator](https://supabase.com/docs/guides/self-hosting/docker#securing-your-services) for keys.

### Admin Passwords
```bash
DASHBOARD_PASSWORD="supabase_dashboard_password"
ORG_ADMIN_PW="initial_superuser_password"
```
**Required**. Dashboard password for Supabase studio. Org admin password for initial admin@example.com account.

## Application Configuration

### Site URLs
```bash
SITE_URL="https://server.yourdomain.com"
```
**Required**. Base URL for your Recogito Studio server. Must match your SSL certificate.

### Communication Secrets
```bash
ROOM_SECRET="base64_encoded_secret"
```
**Required**. Secures real-time communication channels. Generate with `openssl rand -base64 24`.

## Storage Configuration

### MinIO Object Storage
```bash
MINIO_ROOT_USER="minio_admin_username"
MINIO_ROOT_PASSWORD="minio_admin_password"
```
**Required**. Credentials for MinIO dashboard and API access.

### Database Administration
```bash
PGADMIN_ADMIN_EMAIL="admin@yourdomain.com"
PGADMIN_ADMIN_PASSWORD="pgadmin_password"
```
**Required**. Login credentials for pgAdmin web interface.

## Optional Plugin Variables

### Trigger.dev (Background Jobs)
```bash
TRIGGER_SECRET_KEY="trigger_secret_key"
TRIGGER_PUBLIC_KEY="trigger_public_key"
```
**Optional**. Required only if using plugin-ner or other Trigger.dev-based plugins.

### Stanford CoreNLP
```bash
CORENLP_SERVER_URL="http://corenlp:9000"
```
**Optional**. URL for Stanford CoreNLP service. Required for NER plugin.

## Advanced Configuration

### Database Connection
```bash
DATABASE_URL="postgresql://postgres:${POSTGRES_PASSWORD}@db:5432/postgres"
```
**Auto-configured**. PostgreSQL connection string. Usually doesn't need modification.

### Supabase Internal URLs
```bash
SUPABASE_URL="http://kong:8000"
SUPABASE_ANON_KEY="${ANON_KEY}"
SUPABASE_SERVICE_KEY="${SERVICE_ROLE_KEY}"
```
**Auto-configured**. Internal Supabase service URLs. Usually doesn't need modification.

## Security Best Practices

### Password Generation
Generate strong passwords for all accounts:
```bash
# For passwords (12+ characters, alphanumeric)
openssl rand -base64 18 | tr -d "=+/" | cut -c1-16

# For secrets (base64 encoded)
openssl rand -base64 36

# For shorter secrets  
openssl rand -base64 24
```

### Environment File Security
- Store `.env` file securely with restricted permissions
- Never commit `.env` to version control
- Use different secrets for each installation
- Rotate secrets periodically

### JWT Token Generation
1. Generate JWT secret: `openssl rand -base64 36`
2. Visit [Supabase JWT Generator](https://supabase.com/docs/guides/self-hosting/docker#securing-your-services)
3. Enter your JWT secret
4. Generate ANON_KEY with "anon" payload
5. Generate SERVICE_ROLE_KEY with "service_role" payload

## Configuration Template

Copy this template to your `.env` file:

```bash
# Database
POSTGRES_PASSWORD=

# JWT Configuration  
JWT_SECRET=
ANON_KEY=
SERVICE_ROLE_KEY=

# Admin Access
DASHBOARD_PASSWORD=
ORG_ADMIN_PW=

# Site Configuration
SITE_URL=https://server.yourdomain.com

# Communication
ROOM_SECRET=

# Storage Services
MINIO_ROOT_USER=
MINIO_ROOT_PASSWORD=

# Database Admin
PGADMIN_ADMIN_EMAIL=
PGADMIN_ADMIN_PASSWORD=

# Optional: Plugin Configuration
# TRIGGER_SECRET_KEY=
# TRIGGER_PUBLIC_KEY=
# CORENLP_SERVER_URL=http://corenlp:9000
```

## Validation

### Required Variables Checklist
Ensure these variables are set before installation:
- [ ] POSTGRES_PASSWORD
- [ ] JWT_SECRET  
- [ ] ANON_KEY
- [ ] SERVICE_ROLE_KEY
- [ ] DASHBOARD_PASSWORD
- [ ] ORG_ADMIN_PW
- [ ] SITE_URL
- [ ] ROOM_SECRET
- [ ] MINIO_ROOT_USER
- [ ] MINIO_ROOT_PASSWORD
- [ ] PGADMIN_ADMIN_EMAIL
- [ ] PGADMIN_ADMIN_PASSWORD

### Testing Configuration
After configuration, verify:
1. All required variables have values
2. Passwords meet security requirements
3. URLs match your domain setup
4. JWT tokens generated correctly

## Troubleshooting

### Common Issues
- **Authentication errors**: Check JWT_SECRET and generated keys match
- **Database connection**: Verify POSTGRES_PASSWORD is correct
- **CORS errors**: Ensure SITE_URL matches your domain exactly
- **Plugin failures**: Verify optional plugin variables if using plugins