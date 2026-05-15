import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionRenderer from '@/components/sections/SectionRenderer';
import { getLandingPage } from '@/lib/strapi';

export const revalidate = 60;

export default async function HomePage() {
  const data = await getLandingPage();

  const heroSection = data.sections?.find((s) => s.__component === 'sections.hero');
  const trustedBySection = data.sections?.find((s) => s.__component === 'sections.logo-cloud');
  const featureBlocksSection = data.sections?.find(
    (s) => s.__component === 'sections.feature-blocks'
  );
  const pricingSection = data.sections?.find((s) => s.__component === 'sections.pricing');
  const faqSection = data.sections?.find((s) => s.__component === 'sections.faq');
  const testimonialsSection = data.sections?.find(
    (s) => s.__component === 'sections.testimonials'
  );
  const finalCtaSection = data.sections?.find((s) => s.__component === 'sections.final-cta');

  return (
    <>
      {data.navbar && <Navbar data={data.navbar} />}
      <main className="flex-1">
        {/* Hero */}
        {heroSection && <SectionRenderer section={heroSection} />}

        {/* Logo Cloud */}
        {trustedBySection && <SectionRenderer section={trustedBySection} />}

        {/* Feature blocks (bento) */}
        {featureBlocksSection && <SectionRenderer section={featureBlocksSection} />}

        {/* Pricing */}
        {pricingSection && <SectionRenderer section={pricingSection} />}

        {/* Testimonials */}
        {testimonialsSection && <SectionRenderer section={testimonialsSection} />}

        {/* FAQ */}
        {faqSection && <SectionRenderer section={faqSection} />}

        {/* Final CTA */}
        {finalCtaSection && <SectionRenderer section={finalCtaSection} />}
      </main>
      {data.footer && <Footer data={data.footer} />}
    </>
  );
}
