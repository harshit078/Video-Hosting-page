import type { Section } from '@/lib/types';
import Hero from './Hero';
import TrustedBySection from './TrustedBySection';
import Testimonials from './Testimonials';
import CallToActionCard from './CallToActionCard';

export default function SectionRenderer({ section }: { section: Section }) {
  switch (section.__component) {
    case 'sections.hero':
      return <Hero data={section} />;
    case 'sections.logo-cloud':
      return <TrustedBySection data={section} />;
    case 'sections.testimonials':
      return <Testimonials data={section} />;
    case 'sections.final-cta':
      return <CallToActionCard data={section} />;
    default:
      return null;
  }
}
