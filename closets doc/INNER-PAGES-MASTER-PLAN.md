# MAXIMUS CLOSETS — INNER PAGES MASTER PLAN
> Companion to `MASTER-PROMPT.md` (homepage rulebook). All tech rules, design tokens, motion system, content rules, and honesty rules from that file apply here unchanged. This file only adds: page list, per-page section blueprints, and page-specific schema/SEO notes.

---

## 0. FILE STRUCTURE (vanilla, no build tools — same rule as homepage)

Each page is its own folder with its own `index.html`, sharing the site's one `css/style.css` and `js/main.js`:

```
/custom-closets/index.html
/custom-home-storage/index.html
/closet-design-ideas/index.html
/gallery/index.html
/guides/index.html
/about/index.html
/contact/index.html
```

Every page: same header/footer/mobile-menu markup as homepage (copy-paste, not templated — no build tools). Every page adds its own `<title>`, meta description, canonical, breadcrumb JSON-LD, and page-specific schema.

---

## 1. BUILD ORDER

Nav order, highest commercial value first:

1. **Custom Closets** (hub)
2. **Custom Home Storage** (hub)
3. **Contact** (needed standalone for future ads/citations — quick build, mostly reused parts)
4. **About** (trust page)
5. **Design Ideas** (hub)
6. **Gallery** (standalone, full version)
7. **Guides** (hub)

Same workflow as homepage: **one page at a time, section by section within it, wait for approval before moving on.** Never build ahead.

---

## 2. PAGE BLUEPRINTS

### A) Custom Closets — hub page
**Search intent:** "custom closets nj", "custom closet company", category browse.
**H1:** Custom Closets — [benefit line naturally including NJ & PA]

| # | Section | Notes |
|---|---|---|
| 1 | Header + breadcrumb | Home / Custom Closets |
| 2 | Compact hero | Single strong photo, H1, 1-line sub, no slideshow (that's homepage's signature move, don't repeat it here) |
| 3 | Sub-category grid | 7 cards → Walk-In, Reach-In, Wardrobes & Armoires, Kids/Nursery, Linen/Utility, Specialty Storage, Systems & Organizers (these link to L2 pages — build later, link now) |
| 4 | Why Maximus strip | Reuse homepage's `.why__tiles` component as-is (Own Installers / 3D Design / Local Build / Honest Pricing) |
| 5 | Featured gallery strip | 4-6 closet photos only, links to `/gallery/?cat=closets`-style anchor or plain link to Gallery |
| 6 | FAQ | 4-5 Qs (cost range, timeline, materials, warranty) — `FAQPage` schema, real numbers |
| 7 | CTA band | Reuse homepage `.cta-band` component verbatim |
| 8 | Footer | Reused |

Schema: `Service` (parent) + `FAQPage`.

### B) Custom Home Storage — hub page
Same skeleton as A, swapped content:
- Sub-category grid → Pantries, Home Offices, Garage Storage, Murphy Beds, Mudrooms & Entryways, Laundry Rooms, Media Walls, Home Bars & Wine, Craft/Play Spaces, Basement Storage (10 cards — grid, not slider, since this is a browse page not a homepage teaser)
- FAQ swapped to storage-relevant questions.

### C) Contact — standalone
Quick build, mostly reused parts:
| # | Section | Notes |
|---|---|---|
| 1 | Header + breadcrumb |
| 2 | Same `.contact` section as homepage (bg photo + scrim + form) — moved here as the canonical version |
| 3 | Footer |

Homepage's `#contact` anchor can either stay as its own in-page section (simplest, zero risk to existing working CTAs) or later redirect to this page — **decide when we get here**, not now.

### D) About
| # | Section | Notes |
|---|---|---|
| 1 | Header + breadcrumb |
| 2 | Brand story band | Honest founder-voice copy (no fabricated bio/photo — same rule as homepage's "Maximus Closets Team" signature) |
| 3 | Why Maximus tiles | Reused component |
| 4 | Process recap | Condensed version of homepage Process section, or link to `#process` |
| 5 | Licensed & insured strip | Reuse Trust Strip component, real badge numbers once available |
| 6 | CTA band |
| 7 | Footer |

Schema: `AboutPage` + `LocalBusiness`.

### E) Design Ideas — hub
| # | Section | Notes |
|---|---|---|
| 1 | Header + breadcrumb |
| 2 | Compact hero | H1: Closet Design Ideas & Inspiration |
| 3 | Style categories grid | Modern/Minimalist, Traditional/Classic, Transitional/Contemporary, Boutique Luxury (4 cards, big photos — this page is the most visual, should feel like a lookbook) |
| 4 | Colors & Materials teaser | Row of finish swatch-style images |
| 5 | Hardware & Lighting teaser | Row |
| 6 | Small Space Solutions teaser | Row |
| 7 | CTA band |
| 8 | Footer |

No FAQ here — this page is pure inspiration, not a buying-decision page (that's Guides' job).

### F) Gallery — standalone full version
| # | Section | Notes |
|---|---|---|
| 1 | Header + breadcrumb |
| 2 | Compact hero |
| 3 | Filter chips | (Closets / Pantries / Garages / Home Offices / Mudrooms & Laundry / All) — homepage version deliberately skipped this; this page is where it belongs |
| 4 | Full grid | All real project photos, same `aspect-ratio:1/1` grid treatment as homepage |
| 5 | Lightbox | Reuse homepage's lightbox JS/CSS verbatim |
| 6 | CTA band |
| 7 | Footer |

### G) Guides — hub
**This page matters most for AI/AEO visibility (Phase 6) — direct-answer tone, real numbers, dated content.**
| # | Section | Notes |
|---|---|---|
| 1 | Header + breadcrumb |
| 2 | Compact hero | H1: Custom Closet Cost & Planning Guides |
| 3 | Featured guide | Custom Closet Cost Guide — the cornerstone piece, called out per Phase 6 priority #1 |
| 4 | Guide category grid | Cost Guides / Comparisons / Planning Guides / Materials Education / Organization Tips |
| 5 | CTA band |
| 6 | Footer |

Individual guide articles (Level 3/4) are separate future pages — this is just the directory.

---

## 3. CONTENT RULES REMINDER (senior SEO writer mode, unchanged from MASTER-PROMPT)
- Real draft copy on every page, no lorem ipsum.
- COPY LAW still applies: never "free."
- Every hub page links down to its real children even before those children exist — internal linking structure is built now, content fills in as pages are built (matches your explicit "no hundreds of pages now" instruction — links can point ahead, that's normal phased rollout).
- FAQ sections only where genuine buying-decision questions exist (Custom Closets, Custom Home Storage) — not on pure-inspiration pages (Design Ideas).

---

## 4. OPEN DECISIONS (flag when we reach them, not blocking now)
- Contact: keep homepage's `#contact` anchor as-is, or redirect all CTAs to `/contact/` once it exists?
- Should Gallery filter chips use the same 6 categories as the deleted homepage version, or expand to match the 10 Home Storage sub-categories?
