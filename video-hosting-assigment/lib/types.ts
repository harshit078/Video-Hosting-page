export type StrapiMedia = {
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
} | null;

export type StrapiLink = {
  id: number;
  label: string;
  href: string;
};

export type SocialLink = {
  id: number;
  name: string;
  url: string;
  icon: StrapiMedia;
};

export type NavbarData = {
  id: number;
  logo: StrapiMedia;
  logoText: string;
  links: StrapiLink[];
  ctaLabel?: string;
  ctaHref?: string;
};

export type FooterColumn = {
  id: number;
  title: string;
  links: StrapiLink[];
};

export type FooterData = {
  id: number;
  logo: StrapiMedia;
  tagline?: string;
  socialLinks?: SocialLink[];
  columns: FooterColumn[];
  copyright?: string;
  legalLinks?: StrapiLink[];
};

export type HeroSection = {
  __component: 'sections.hero';
  id: number;
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  heroImage?: StrapiMedia;
  heroImageUrl?: string;
  backgroundImage?: StrapiMedia;
  backgroundImageUrl?: string;
  badgeTexts?: string[];
};

export type LogoItem = {
  id: number;
  name: string;
  image?: StrapiMedia;
  imageUrl?: string;
};

export type TrustedBySection = {
  __component: 'sections.logo-cloud';
  id: number;
  badge?: string;
  heading?: string;
  subheading?: string;
  logos: LogoItem[];
};

export type TestimonialsSection = {
  __component: 'sections.testimonials';
  id: number;
  badge?: string;
  heading?: string;
  subheading?: string;
  items: Array<{
    id: number;
    quote: string;
    authorName: string;
    authorTitle?: string;
    authorAvatarUrl?: string;
  }>;
};

export type CallToActionCardSection = {
  __component: 'sections.final-cta';
  id: number;
  heading: string;
  subheadline?: string;
  ctaLabel?: string;
  ctaHref?: string;
  note?: string;
  trustItems?: Array<{ id: number; text: string }>;
};

export type FeatureItem = {
  id: number;
  eyebrow?: string;
  heading: string;
  body?: string;
  image?: StrapiMedia;
  iconName: 'gauge' | 'palette' | 'shield' | 'chart';
  accentColor: 'blue' | 'purple' | 'emerald' | 'amber';
  colSpan: 'small' | 'large';
};

export type FeatureBlocksSection = {
  __component: 'sections.feature-blocks';
  id: number;
  badge?: string;
  heading?: string;
  subheading?: string;
  items: FeatureItem[];
};

export type PricingPlan = {
  id: number;
  name: string;
  price: string;
  period?: string;
  description?: string;
  features?: Array<{ id: number; text: string }>;
  ctaLabel?: string;
  ctaHref?: string;
  popular?: boolean;
};

export type PricingSection = {
  __component: 'sections.pricing';
  id: number;
  badge?: string;
  heading?: string;
  subheading?: string;
  plans: PricingPlan[];
  trustItems?: Array<{ id: number; text: string }>;
};

export type FaqItem = {
  id: number;
  question: string;
  answer: string;
};

export type FaqSection = {
  __component: 'sections.faq';
  id: number;
  badge?: string;
  heading?: string;
  subheading?: string;
  items: FaqItem[];
};

export type Section =
  | HeroSection
  | TrustedBySection
  | FeatureBlocksSection
  | PricingSection
  | FaqSection
  | TestimonialsSection
  | CallToActionCardSection;

export type LandingPageData = {
  id: number;
  documentId?: string;
  navbar: NavbarData;
  sections: Section[];
  footer: FooterData;
};
