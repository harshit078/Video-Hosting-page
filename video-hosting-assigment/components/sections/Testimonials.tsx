'use client';

import { motion } from 'motion/react';
import { TestimonialsColumn, type TestimonialItem } from '@/components/ui';
import SectionHeader from '@/components/shared/SectionHeader';
import type { TestimonialsSection } from '@/lib/types';

// Divide the array into parts of equal size
function divideArray<T>(arr: T[], parts: number): T[][] {
  const out: T[][] = Array.from({ length: parts }, () => []);
  arr.forEach((item, i) => out[i % parts].push(item));
  return out;
}

// Testimonials component
export default function Testimonials({ data }: { data: TestimonialsSection }) {
  const items: TestimonialItem[] = (data.items || []).map((item) => ({
    text: item.quote,
    name: item.authorName,
    role: item.authorTitle || '',
    image: item.authorAvatarUrl,
  }));

  const [firstColumn, secondColumn, thirdColumn] = divideArray(items, 3);

  return (
    <section className="relative my-5xl bg-background">
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <SectionHeader
            badge="Testimonials"
            heading={data.heading}
            subheading="See what our customers have to say about us."
          />
        </motion.div>

        {/* Testimonials columns in 3 columns*/}
        <div className="mt-2xl sm:w-full md:w-3/4 lg:w-2/3 justify-center mx-auto flex max-h-[740px] gap-lg overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]">
          <TestimonialsColumn
            testimonials={firstColumn || []}
            duration={6}
          />
          <TestimonialsColumn
            testimonials={secondColumn || []}
            duration={8}
          />
          <TestimonialsColumn
            testimonials={thirdColumn || []}
            duration={7}
          />
        </div>
      </div>
    </section>
  );
}
