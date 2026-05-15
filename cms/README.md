# CMS — Strapi

Backend for the video-hosting landing page. Single Strapi instance exposing one Single Type (`landing-page`) consumed by the Next.js frontend in `../video-hosting-assigment`.

## Scripts

```bash
npm run develop 
npm run start 
npm run build 
npm run strapi 
```

Default admin URL: <http://localhost:1337/admin>
Default public API: <http://localhost:1337/api/landing-page>

## Content model

Single Type: **`landing-page`**

| Field | Type | Notes |
|---|---|---|
| `navbar` | Component (single) | Top-level chrome — kept out of the Dynamic Zone so editors can't reorder it. |
| `sections` | Dynamic Zone | Ordered list of section components. |
| `footer` | Component (single) | Top-level chrome. |

Allowed `sections` components, rendered in source order:

- `sections.hero` — headline, subheadline, eyebrow, primary/secondary CTAs, hero image
- `sections.logo-cloud` — heading + repeatable `shared.logo-item` (name, image, imageUrl)
- `sections.feature-blocks` — bento grid; badge, heading, subheading, repeatable `shared.feature-item` (heading, body, image, `iconName` / `accentColor` / `colSpan` enums)
- `sections.pricing` — pricing table; badge, heading, subheading, repeatable `shared.pricing-plan`, `shared.bullet-point` trust items
- `sections.faq` — accordion; repeatable `shared.faq-item`
- `sections.testimonials` — scrolling columns; repeatable `shared.testimonial-item` (quote, authorName, authorTitle, authorAvatarUrl)
- `sections.final-cta` — heading, subheadline, CTA

Schema source of truth lives in `src/components/**/*.json` and `src/api/landing-page/content-types/landing-page/schema.json`. Strapi regenerates the TS types in `types/generated/` on every boot.

## Bootstrap (`src/index.ts`)

- Grants `find` on `api::landing-page.landing-page` to the **Public** role on first boot so the FE can fetch anonymously.
- Calls `src/seed/landing-page.ts` which creates a fully populated entry if no landing-page exists yet. If an entry already exists but is missing the `sections.feature-blocks` section (older schema), it logs a warning and tells you to wipe `.tmp/data.db` for a fresh re-seed.

## Local setup

```bash
cp .env.example .env       # already exists with sqlite defaults
npm install
npm run develop
```
