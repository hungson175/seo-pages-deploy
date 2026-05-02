# GSC Daily Monitoring — Story-012a Canary

## Daily Report Template

```
## GSC Daily Report — {DATE}

**Sitemap:** https://boitoan.com.vn/sitemap.xml
**Forecast URLs:** 24 (TypeScript-backed canary)

### Sitemap Status
- Submitted: {YES/NO}
- Discovered: {count}
- Crawled: {count}

### Index Coverage
- Indexed: {count}/24
- Excluded: {count} (reason: {reason})
- Errors: {count} (type: {type})

### Performance (Forecast pages only)
- Impressions: {count}
- Clicks: {count}
- CTR: {pct}%
- Avg Position: {position}

### Canonical Issues
- {list any duplicate/canonical conflicts or "None"}

### Action Items
- {next steps if any}
```

## Monitoring Checklist (7-14 day window)

- [ ] Day 1: Boss submits sitemap manually
- [ ] Day 1: Verify sitemap shows "Success" in GSC
- [ ] Day 2-3: Check "Discovered" count rising
- [ ] Day 3-5: Check "Crawled" count rising
- [ ] Day 5-7: Check "Indexed" count rising
- [ ] Day 7: First weekly report to Gal
- [ ] Day 14: Final canary assessment — decide on expansion

## Red Flags to Escalate

- Sitemap shows "Couldn't fetch" after 48h
- Indexed count stuck at 0 after 7 days
- Canonical conflicts detected
- Duplicate content warnings
- Manual actions or security issues

## Source of Truth

- SBrain: `teams/seo-pages-team` timeline
- Blocker: `blockers/seo-pages-release-gate`
