# Steamly Video hosting application

Built with Nextjs, TailwindCSS, ShadCN with Strapi public REST API, deployed live on Vercel. CMS (strapi) is deployed using Render and frontend is deployed using vercel

## Stack

- **Next.js 16** (App Router, React Server Components, ISR)
- **React 19**
- **Tailwind CSS v4** with shadcn/ui (Button, Card, Accordion)
- **TypeScript 5**
- **motion** (a.k.a. Framer Motion 11+) for the testimonials marquee and section entrance animations
- **lucide-react** for icons

No state management library, no CSS-in-JS, no codegen — the whole data flow is `fetch → typed JSON → server component → markup`.

## Quick start

```bash
# 1. Start Strapi locally 
cd ../cms && npm install && npm run develop
# 2. Run this app
npm install
cp .env.example .env.local
npm run dev    
```

> If `npm run dev` is heavy on then use  `npx next dev --webpack` — same hot reload, lower memory footprint

## Scripts

```bash
npm run dev
npm run build
npm start
npm run lint
npx tsc --noEmit  
```

## Project structure

```
video-hosting-assigment/
├── app/
│   ├── layout.tsx             # Root layout: Geist fonts + static <Metadata>
│   ├── page.tsx               # Single async server component; one Strapi fetch
│   └── globals.css            # Tailwind v4 setup + design tokens (semantic + custom)
├── components/
│   ├── Navbar.tsx             # Client component — scroll listener swaps bg on >16px scroll
│   ├── Footer.tsx
│   ├── shared/
│   │   └── SectionHeader.tsx  # Badge + heading + subheading — used by every section
│   ├── sections/              # CMS-driven sections, routed via SectionRenderer
│   │   ├── Hero.tsx
│   │   ├── TrustedBySection.tsx       # logo cloud, marquee
│   │   ├── FeatureBlocks.tsx          # bento grid (4 cards, alternating widths)
│   │   ├── PricingCard.tsx            # 4-tier plans with brand-blue hover ring
│   │   ├── Testimonials.tsx           # 3 scrolling columns powered by motion
│   │   ├── FaqSection.tsx             # shadcn Accordion
│   │   ├── CallToActionCard.tsx       # final CTA band
│   │   ├── SectionRenderer.tsx        # switch over section.__component
│   │   └── index.ts                   # explicit named re-exports
│   └── ui/                    # shadcn primitives (Button, Card, Accordion) + the
│                              # testimonials-columns marquee component
├── lib/
│   ├── strapi.ts              # getLandingPage() + mediaUrl(); explicit populate string
│   ├── types.ts               # Section discriminated union keyed on __component
│   └── utils.ts               # cn() — tailwind-merge + clsx
├── public/company_logos/      # Logo SVGs referenced by TrustedBySection via /paths
├── next.config.ts             # images.remotePatterns for Strapi + Unsplash + Cloudinary
├── .env.local                 # NEXT_PUBLIC_STRAPI_URL=...   (gitignored)
└── .env.example
```

## Data flow

1. `app/page.tsx` (server component) calls `getLandingPage()` from `lib/strapi.ts`.
2. `getLandingPage()` issues one HTTP request to `${NEXT_PUBLIC_STRAPI_URL}/api/landing-page` with an **explicit** populate string (no `populate=*` wildcards — they're fragile and slow). ISR is set via `next: { revalidate: 60 }`.
3. The response is typed as `LandingPageData` (`lib/types.ts`) — a `navbar`, `footer`, and a `sections` array of a discriminated union keyed on `__component`.
4. `page.tsx` finds each section by `__component` and passes it through `<SectionRenderer />`.
5. `SectionRenderer` switches on `__component` and renders the matching React component with typed props.
6. Section components are **dumb** — they only render the data they're given. No fallbacks beyond optional-field guards. Editorial decisions live in Strapi.

CMS-driven sections: hero, logo-cloud, feature-blocks, pricing, faq, testimonials, final-cta. Navbar and footer are top-level Single Type fields.
