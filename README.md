# Latitude.sh Changelog

Markdown-based changelog content for [latitude.sh/changelog](https://www.latitude.sh/changelog).

## Structure

```
entries/          # Markdown files, one per changelog entry
images/           # Images referenced by entries
index.json        # Auto-generated manifest (do not edit manually)
scripts/          # Build and maintenance scripts
```

## Adding a new entry

1. Create a new `.md` file in `entries/` with this format:

```markdown
---
title: "Your Release Title"
slug: "your-release-slug"
type: "Platform"
dateOfRelease: "2025-04-01"
externalUrl: ""
images:
  - url: "images/your-release-slug/hero.png"
    alt: "Description of image"
    width: 1200
    height: 675
---

Your changelog content in **Markdown**.

![Screenshot](images/your-release-slug/screenshot.png)
```

2. Add any images to `images/<slug>/`
3. Push to `main` — the GitHub Action will auto-generate `index.json` and trigger a website revalidation.

## Entry fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Entry title |
| `slug` | Yes | URL slug (must match filename without `.md`) |
| `type` | Yes | Category: Platform, Metal, Network, Storage, Databases, Virtual Machines |
| `dateOfRelease` | Yes | Release date in YYYY-MM-DD format |
| `externalUrl` | No | If set, the title links to this URL instead of the detail page |
| `images` | No | Array of featured images shown above the content |

## Images

- Place images in `images/<slug>/`
- Reference them in markdown body as `![alt](images/<slug>/filename.png)`
- Featured/hero images go in the `images` frontmatter array
