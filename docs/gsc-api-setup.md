# GSC API Access Setup — Future Automation

## Why

Daily monitoring requires programmatic GSC access. Manual checking is not sustainable for scaling beyond 24 pages.

## Prerequisites

1. Google Cloud project with Search Console API enabled
2. Service account JSON key (or OAuth2 credentials)
3. GSC property verified for `boitoan.com.vn`

## Setup Steps

### 1. Create Google Cloud Project

```bash
# Go to https://console.cloud.google.com
# Create project: "boitoan-seo-monitoring"
# Enable: Google Search Console API
```

### 2. Create Service Account

```bash
# In Google Cloud Console → IAM → Service Accounts
# Create: "seo-monitoring@boitoan-seo-monitoring.iam.gserviceaccount.com"
# Download JSON key to: ~/dev/gsc-service-account.json
```

### 3. Add Service Account to GSC

```bash
# In Google Search Console → Settings → Users and permissions
# Add: seo-monitoring@boitoan-seo-monitoring.iam.gserviceaccount.com
# Role: "Restricted" (read-only is sufficient)
```

### 4. Store Credentials

```bash
# Add to ~/dev/.env:
GSC_PROPERTY_URL=https://boitoan.com.vn
GSC_SERVICE_ACCOUNT_PATH=/home/hungson175/dev/gsc-service-account.json
```

### 5. Verify Access

```bash
# Test with curl or Node.js client
# Endpoint: https://searchconsole.googleapis.com/webmasters/v3/sites
```

## API Endpoints for Daily Monitoring

| Endpoint | Purpose |
|----------|---------|
| `GET /sites` | List verified properties |
| `GET /sitemaps` | List submitted sitemaps |
| `GET /sitemaps/{feedpath}` | Get sitemap status |
| `POST /searchAnalytics/query` | Performance data (impressions, CTR, position) |

## Monitoring Script (Future)

```bash
#!/bin/bash
# scripts/gsc-daily-report.sh
# Runs daily via cron, sends to Gal via tm-send

PROPERTY="https://boitoan.com.vn"
SITEMAP="sitemap.xml"

# Fetch sitemap status
# Fetch performance data for /tu-vi-2026/* pages
# Format as daily report template
# Send to Gal
```

## Cron Schedule (After Setup)

```
# Daily at 08:00 UTC+7
0 8 * * * /home/hungson175/tools/seo-pages-team/scripts/gsc-daily-report.sh
```

## Blocker Status

**Current:** No GSC API credentials configured. Boss submitting sitemap manually for canary.
**Next cycle:** Set up service account for automated daily monitoring.
