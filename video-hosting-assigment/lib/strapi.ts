import type { LandingPageData, StrapiMedia } from './types';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

const POPULATE = [
  'populate[navbar][populate][logo]=true',
  'populate[navbar][populate][links]=true',
  'populate[footer][populate][logo]=true',
  'populate[footer][populate][socialLinks][populate][icon]=true',
  'populate[footer][populate][columns][populate]=links',
  'populate[footer][populate][legalLinks]=true',
  'populate[sections][on][sections.hero][populate][heroVideo]=true',
  'populate[sections][on][sections.hero][populate][backgroundImage]=true',
  'populate[sections][on][sections.hero][populate][badgeTexts]=true',
  'populate[sections][on][sections.logo-cloud][populate][logos][populate][image]=true',
  'populate[sections][on][sections.feature-blocks][populate][items][populate][image]=true',
  'populate[sections][on][sections.pricing][populate][plans][populate]=features',
  'populate[sections][on][sections.pricing][populate][trustItems]=true',
  'populate[sections][on][sections.faq][populate]=items',
  'populate[sections][on][sections.testimonials][populate]=items',
  'populate[sections][on][sections.final-cta][populate][trustItems]=true',
  'populate[sections][on][sections.compare][populate][items]=true',
].join('&');

// Retry logic for strapi
const MAX_ATTEMPTS = 3;
const ATTEMPT_TIMEOUT_MS = 25_000;

export async function getLandingPage(): Promise<LandingPageData> {
  const url = `${STRAPI_URL}/api/landing-page?${POPULATE}`;
  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const res = await fetch(url, {
        next: { revalidate: 60 },
        signal: AbortSignal.timeout(ATTEMPT_TIMEOUT_MS),
      });

      if (res.ok) {
        return (await res.json()).data;
      }
      lastError = new Error(`Strapi responded ${res.status} ${res.statusText}`);
    } catch (err) {
      lastError = err;
    }

    if (attempt < MAX_ATTEMPTS) {
      await new Promise((resolve) => setTimeout(resolve, 3000 * attempt));
    }
  }

  throw new Error(
    `Failed to fetch landing page after ${MAX_ATTEMPTS} attempts: ${
      lastError instanceof Error ? lastError.message : String(lastError)
    }`,
  );
}

export function mediaUrl(media: StrapiMedia | undefined, fallback?: string): string | undefined {
  if (media?.url) {
    return media.url.startsWith('http') ? media.url : `${STRAPI_URL}${media.url}`;
  }
  if (fallback) {
    return fallback.startsWith('http') ? fallback : `${STRAPI_URL}${fallback}`;
  }
  return undefined;
}
