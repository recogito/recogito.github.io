---
title: System Requirements
description: Technical requirements and specifications for hosting Recogito Studio.
---

This page outlines the technical requirements for self-hosting Recogito Studio.

## Server Specifications

### Minimum Requirements
- **Operating System**: Ubuntu Linux 20.04+ (Ubuntu 24.04 LTS recommended)
- **CPU**: 2 cores minimum
- **Memory**: 4GB RAM minimum
- **Storage**: 50GB available disk space
- **Network**: Reliable internet connection with public IP

### Recommended for Production
- **CPU**: 4+ cores
- **Memory**: 8GB+ RAM
- **Storage**: 100GB+ SSD storage
- **Network**: High-bandwidth connection
- **Backups**: Automated backup strategy

## Software Dependencies

### Required Software
- **Docker** - Container runtime
- **Docker Compose** - Container orchestration
- **Nginx** - Web server and reverse proxy
- **Git** - Version control (for installation)
- **NPM/Node.js** - JavaScript runtime

### Optional Software
- **UFW** - Uncomplicated Firewall (recommended)
- **Certbot** - Let's Encrypt certificate management

## Network Requirements

### Ports
The following ports need to be accessible:
- **80 (HTTP)** - Web traffic (redirects to HTTPS)
- **443 (HTTPS)** - Secure web traffic
- **22 (SSH)** - Server administration

### Domain Names
You'll need access to configure DNS records for:
- Main server domain (`server.yourdomain.com`)
- Client application (`client.yourdomain.com`) 
- Administration interfaces:
  - Portainer (`portainer.yourdomain.com`)
  - pgAdmin (`pgadmin.yourdomain.com`)
  - MinIO (`minio.yourdomain.com`)

Optional for plugins:
- Trigger.dev (`trigger.yourdomain.com`)

## Security Considerations

### Firewall Configuration
- Close unnecessary ports
- Allow only required services
- Use UFW or equivalent firewall management

### SSL/TLS Certificates
- HTTPS required for all services
- Let's Encrypt certificates recommended
- Automatic renewal configured

### Authentication
- Strong passwords for all service accounts
- Secure JWT secrets and API keys
- Regular password rotation policy

## Performance Considerations

### Database
- PostgreSQL with proper indexing
- Regular maintenance and optimization
- Backup and recovery strategy

### File Storage
- MinIO for object storage
- Adequate disk space for documents
- Consider S3-compatible external storage

### Monitoring
- System resource monitoring
- Application performance tracking
- Log aggregation and analysis

## Supported Platforms

### Tested Environments
- **Digital Ocean Droplets** - Fully tested
- **AWS EC2** - Compatible
- **Google Cloud Platform** - Compatible
- **Azure VMs** - Compatible
- **On-premises servers** - Compatible

### Operating Systems
- **Ubuntu 24.04 LTS** - Recommended
- **Ubuntu 22.04 LTS** - Supported
- **Ubuntu 20.04 LTS** - Supported
- **Other Debian-based** - May work with modifications

## Container Resources

### Docker Requirements
The installation includes multiple containers:
- **Supabase stack** - Database, API, Auth
- **Client application** - Astro.js frontend
- **MinIO** - Object storage
- **Portainer** - Container management
- **pgAdmin** - Database administration

### Resource Allocation
Each container has specific resource needs:
- Database containers require consistent CPU and memory
- Client application needs adequate memory for builds
- Storage containers need reliable disk I/O

## Scaling Considerations

### Horizontal Scaling
- Load balancer for multiple instances
- Shared database and storage
- Session management strategy

### Vertical Scaling
- Increase server resources as needed
- Monitor performance metrics
- Plan for growth in users and content

## Backup Requirements

### Critical Data
- PostgreSQL database backups
- MinIO object storage backups
- Configuration files and secrets
- SSL certificates

### Backup Strategy
- Daily automated backups recommended
- Off-site backup storage
- Regular restoration testing
- Document recovery procedures