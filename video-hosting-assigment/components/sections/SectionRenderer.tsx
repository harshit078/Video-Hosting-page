import type { Section } from '@/lib/types';
import Hero from './Hero';
import TrustedBySection from './TrustedBySection';
import Testimonials from './Testimonials';
import CallToActionCard from './CallToActionCard';
import FeatureBlocks from './FeatureBlocks';
import PricingCard from './PricingCard';
import FaqSection from './FaqSection';
import CompareSection from './CompareSection';

export default function SectionRenderer({ section }: { section: Section }) {
  switch (section.__component) {
    case 'sections.hero':
      return <Hero data={section} />;
    case 'sections.logo-cloud':
      return <TrustedBySection data={section} />;
    case 'sections.feature-blocks':
      return <FeatureBlocks data={section} />;
    case 'sections.pricing':
      return <PricingCard data={section} />;
    case 'sections.faq':
      return <FaqSection data={section} />;
    case 'sections.testimonials':
      return <Testimonials data={section} />;
    case 'sections.final-cta':
      return <CallToActionCard data={section} />;
    case 'sections.compare':
      return <CompareSection data={section} />;
    default:
      return null;
  }
}
