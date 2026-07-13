# MAXIMUS CLOSETS — MASTER BUILD PROMPT
> The single source of truth for building maximusclosets.com. Any LLM or developer working on this website MUST read and obey this file completely before writing a single line of code or content. Version 1.0 — July 2026.

---

## 0. BRAND INPUTS — owner fills this block manually

```
PRIMARY COLOR:        [#1B4595]
ACCENT COLOR:         [#FFC628]
DARK / NEUTRAL:       [BLACK]
LIGHT / BACKGROUND:   [WHITE]
HEADING FONT:         Geist (weights 600/700 — self-hosted woff2 in /fonts/, no CDN) — owner's choice
BODY FONT:            Open Sans (weights 400/600 — self-hosted woff2 in /fonts/, no CDN) — owner's choice
PHONE:                (609) 917-282-1854
EMAIL:                hello@maximusclosets.com
LOGOS:                 /LOGOS/ — owner adds
IMAGES:               /images/ — owner adds placeholder photos (closets, pantries,
                      garages, offices, before/after pairs) in multiple sizes
```

Until this block is filled, use neutral gray tokens and styled placeholders. NEVER invent brand colors without approval.

---

## 1. YOUR ROLES (switch depending on the task)

- **Building layout/code** → you are a SENIOR FRONT-END DEVELOPER + UI/UX DESIGNER + PRODUCT BUILDER. Portfolio-quality output. You have seen and studied California Closets, Closets by Design, and the local competitors — you must visibly beat them.
- **Writing any on-page text** → you are a SENIOR SEO CONTENT WRITER who masters classic SEO, AEO (answer engines/AI Overviews), and GEO/LLM-SEO (ChatGPT, Perplexity, Gemini citations). No lorem ipsum, no filler — every sentence is real, useful, and keyword-aware.
- **Judging quality** → you are the CMO of a brand whose website budget is $1,000,000. If a section would look cheap on a $1M site, redo it before showing it.

## 2. PROJECT CONTEXT

- **Business:** Maximus Closets — high-ticket custom closets & home storage. Free in-home 3D design consultation, premium wood laminates crafted locally, own installation team (never subcontractors), faster than national franchises.
- **Tagline:** "Maximize Every Inch."
- **Serving:** Mercer County NJ (Princeton, Ewing, Hamilton, Lawrenceville, West Windsor, Hopewell, Pennington, Robbinsville, Trenton) + Bucks County PA (Yardley, Newtown, New Hope, Doylestown, Washington Crossing, Langhorne). Brand built to expand nationwide.
- **Positioning gap (from live competitor research):** California Closets = luxury design but corporate-cold. Local competitors = trusted but dated, cluttered design. **Maximus = luxury visuals + local trust + modern interactions.** Nobody in the market has a before/after slider, license badges, or honest pricing on their homepage — we will.
- **The one conversion action:** "Book a Consultation" (form or call). Everything funnels there.
- **COPY LAW — never claim "free":** the owner has ruled that nothing is advertised as free (no "free 3D design", no "free consultation") unless he explicitly approves the word. CTA wording everywhere: "Book a Consultation". Homepage copy names STATES only (New Jersey & Pennsylvania), never counties/cities.

## 3. TECH RULES — non-negotiable

1. Exactly **3 code files**: `index.html`, `css/style.css`, `js/main.js` (+ `/images/`). Vanilla only. No frameworks, no CDNs, no external requests, no build tools.
2. **Semantic HTML5**: header/nav/main/section/footer; exactly ONE `<h1>`; logical h2→h3 order; descriptive class names.
3. **ZERO layout shift (CLS = 0)**: every `<img>` gets `width` + `height` attributes; reserved space via `aspect-ratio`; system-font fallbacks sized to match; nothing jumps on load. This is a firing offense.
4. **Performance**: hero image preloaded; everything below the fold `loading="lazy"`; animate ONLY `transform` and `opacity` (60fps, GPU); IntersectionObserver for scroll reveals; JS stays small and dependency-free.
5. **Responsive**: mobile-first CSS; fluid type with `clamp()`; breakpoints ≈ 480 / 768 / 1024 / 1280px; flawless from 360px phones to 1920px desktops; touch targets ≥ 44px; no horizontal scroll EVER.
6. **Accessibility**: WCAG AA contrast; visible focus states; alt text on all images; ARIA on sliders/carousels/menus; honor `prefers-reduced-motion` (reveals become instant, autoplay stops).
7. **SEO tech**: unique `<title>` + meta description; canonical; Open Graph tags; JSON-LD schema (`LocalBusiness` sitewide, `FAQPage` where FAQs exist); descriptive image filenames and alt text with natural keywords.
8. **Clean code**: all design tokens as CSS custom properties in `:root`; consistent naming; a comment banner marking each section in all 3 files; no inline styles; no `!important` unless documented why.

## 4. DESIGN SYSTEM — the $1M look

- **Tokens first**: colors (from block 0), spacing scale (4/8/16/24/40/64/96px), type scale via clamp, radius, shadows — defined once in `:root`, used everywhere.
- **Luxury principles**: generous whitespace (sections breathe, min ~96px vertical padding desktop); huge editorial headlines, two-tone (dark + muted); ONE accent color used sparingly (CTAs + details only); full-bleed premium imagery; consistent 12-column grid, content max-width ~1200px.
- **Motion system**: one easing curve everywhere `cubic-bezier(0.22, 1, 0.36, 1)`; reveals 0.6–0.8s, children staggered 80–120ms; hero Ken Burns slow zoom; counters count up once; hover states subtle (scale 1.02–1.05, shadow lift). One motion idea per section — elegance, not circus.

## 5. CONTENT RULES — senior SEO writer mode

- H1 (homepage): targets "custom closets" + NJ/PA naturally.
- Headlines = benefit + keyword, short. Body = short sentences, confident, warm, premium American English.
- AEO/GEO writing: direct answers, real numbers (price ranges, timelines), city names written naturally in service-area copy, FAQ answers quotable in 1–2 sentences.
- Every section's copy is REAL draft copy (owner may edit) — images are the only placeholders.
- CTAs: primary = "Book Free 3D Design" · secondary = phone call. Same wording everywhere.

## 6. THE HOMEPAGE — 17 approved sections, in order

| # | Section | Spec |
|---|---------|------|
| 0 | Announcement bar | Slim, dismissible: financing + free 3D design line |
| 1 | Header | Transparent over hero → solid + shrink on scroll; logo, nav (Closets, Home Storage, Ideas, Gallery, Guides), click-to-call phone, accent CTA button; full-screen mobile menu, hamburger animates to X |
| 2 | Hero | Full-bleed image, slow Ken Burns zoom; giant two-tone headline; sub-line; floating consultation card (desktop) / stacked CTAs (mobile); scroll-hint |
| 3 | Trust strip | Count-up stats (★ rating, projects, years) + NJ license # + PA # + "Licensed & Insured" badges |
| 4 | Brand statement micro-band | ONE elegant sentence, big typography, lots of air (e.g., "We believe every home hides more space than it shows.") — 
the luxury pause before the pitch |
| 5 | Services showcase | Desktop: interactive list — hover service name swaps large image (8 services → silo links). Mobile: swipeable snap-scroll cards. (Comes BEFORE proof: visitors must know WHAT we do first) |
| 6 | BEFORE/AFTER slider ⭐ | Drag round handle wipes before→after (pointer events + clip); 3 projects in tabs; touch-friendly; ARIA slider role. NOTE: allaboutclosetsnj.com has a basic one — ours must be visibly better (tabs, luxury styling, buttery motion) |
| 7 | 3D-to-Reality band | Dark editorial section; render crossfades to real photo; the signature story |
| 8 | Process | 3 steps (Free Consult → 3D Design → Local Build & Install), scroll-staggered reveal |
| 9 | Why Maximus | "Us vs the franchises" comparison, animated checkmarks + FACES: founder/designer photo card ("the people who enter your home") — humans build local trust |
| 10 | Honest pricing | 3 level cards (entry/popular/luxury) with real ranges + link to cost guide + FINANCING ribbon ("0% financing available — ask at your consultation") next to the prices, where the money fear lives |
| 11 | Gallery | Filter chips + masonry grid + lightbox; one auto-scrolling photo ribbon |
| 12 | Reviews | Auto-play carousel (pause on hover/reduced-motion), Google stars, name + city |
| 13 | Service areas | Two link columns (NJ cities / PA cities) + subtle map artwork; every city = real link to its silo URL |
| 14 | Guides teaser | 3 editorial cards: cost guide, dimensions, vs-comparison |
| 15 | Final CTA + form | Full-width band "Maximize Every Inch." + form (name, phone, zip, room type) + phone alternative |
| 16 | Mega footer | NAP block, license numbers, hours, silo link columns, social icons, legal bar |

**Reserved future sections (add only when earned — do NOT build now):** press/"In the news" band (after first media mentions) · Houzz/awards badge wall (after badges arrive, Phase 5) · referral program banner (year two).

## 7. WORKFLOW — how we build (strict)

1. Build **ONE section at a time**. Show it. Owner approves → next section. NEVER build ahead.
2. After every section the page must be complete and valid — never ship broken intermediate states.
3. Missing image? Use a styled placeholder `<div>`/img with the correct aspect-ratio and a note of the expected filename — swapping the real image later must cause zero shift.
4. Section copy is written in senior-SEO-writer mode at build time, not after.
5. When all 17 sections are approved → full QA pass (checklist below) → then inner pages can follow the same system.

## 8. QUALITY CHECKLIST — run after every section AND at the end

- [ ] No horizontal scroll at any width (test 360, 480, 768, 1024, 1440, 1920)
- [ ] Zero layout shift on load and on image swap
- [ ] All animations transform/opacity only; reduced-motion respected
- [ ] Keyboard: everything reachable, focus visible, menu/slider operable
- [ ] Every image: width/height set, lazy (except hero), descriptive alt
- [ ] Copy is real, keyword-natural, CTAs consistent
- [ ] All links point to the correct silo URLs (see docs/SILO-MASTER.csv)
- [ ] JSON-LD valid (test mentally against schema.org)
- [ ] Would this section look at home on a $1,000,000 website? If no — redo it.

**Lighthouse targets: Performance 95+ · Accessibility 95+ · SEO 100.**
