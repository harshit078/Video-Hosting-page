'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
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
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <SectionHeader
            badge={data.badge}
            heading={data.heading}
            subheading={data.subheading}
          />
        </motion.div>

      <div className="mt-2xl md:hidden w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <motion.div
          animate={prefersReducedMotion ? undefined : { translateX: '-50%' }}
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 20, repeat: Infinity, ease: 'linear', repeatType: 'loop' }
          }
          className="flex gap-4 w-max"
        >
          {[0, 1].map((copy) => (
            <React.Fragment key={copy}>
              {items.map(({ text, image, name, role }, i) => (
                <div
                  key={i}
                  style={{ width: '72vw', maxWidth: '300px' }}
                  className="rounded-3xl border border-border bg-card p-xl shadow-lg shadow-primary/10"
                >
                  <div className="text-sm leading-relaxed text-muted-foreground">{text}</div>
                  <div className="mt-sm flex items-center gap-2">
                    {image ? (
                      <Image width={40} height={40} src={image} alt={name} className="h-10 w-10 shrink-0 rounded-full object-cover" />
                    ) : (
                      <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-sm font-semibold text-brand">
                        {name.charAt(0).toUpperCase()}
                      </span>
                    )}
                    <div className="flex flex-col">
                      <div className="font-medium leading-5 tracking-tight text-primary">{name}</div>
                      <div className="leading-5 tracking-tight text-muted-foreground/70">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      <div className="relative z-10">
        <div className="mt-2xl hidden md:flex justify-center max-h-[740px] gap-lg overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]">
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
