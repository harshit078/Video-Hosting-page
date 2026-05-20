import type { LandingPageData, StrapiMedia } from './types';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

const POPULATE = [
  'populate[navbar][populate][logo]=true',
  'populate[navbar][populate][links]=true',
  'populate[footer][populate][logo]=true',
  'populate[footer][populate][socialLinks][populate][icon]=true',
  'populate[footer][populate][columns][populate]=links',
  'populate[footer][populate][legalLinks]=true',
  'populate[sections][on][sections.hero][populate][heroImage]=true',
  'populate[sections][on][sections.hero][populate][backgroundImage]=true',
  'populate[sections][on][sections.logo-cloud][populate][logos][populate][image]=true',
  'populate[sections][on][sections.feature-blocks][populate][items][populate][image]=true',
  'populate[sections][on][sections.pricing][populate][plans][populate]=features',
  'populate[sections][on][sections.pricing][populate][trustItems]=true',
  'populate[sections][on][sections.faq][populate]=items',
  'populate[sections][on][sections.testimonials][populate]=items',
  'populate[sections][on][sections.final-cta][populate][trustItems]=true',
].join('&');

export async function getLandingPage(): Promise<LandingPageData> {
  const url = `${STRAPI_URL}/api/landing-page?${POPULATE}`;
  const res = await fetch(url, { next: { revalidate: 60 } });

  if (!res.ok) {
    throw new Error(`Failed to fetch landing page: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  return json.data;
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
