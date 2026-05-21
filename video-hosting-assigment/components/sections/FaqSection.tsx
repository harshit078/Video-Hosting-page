'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui';
import SectionHeader from '@/components/shared/SectionHeader';
import type { FaqSection as FaqSectionType } from '@/lib/types';

export default function FaqSection({ data }: { data: FaqSectionType }) {
  const faqs = data.items ?? [];

  return (
    <section className="section-container">
          <SectionHeader
            badge={data.badge}
            heading={data.heading}
            subheading={data.subheading}
          />

          <div className="mt-4xl">
            <Accordion type="single" collapsible className="space-y-md">
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={`item-${faq.id}`}
                  className="rounded-xl border border-border/50 bg-white px-lg shadow-sm transition-all hover:shadow-md data-[state=open]:ring-1 data-[state=open]:ring-primary/10"
                >
                  <AccordionTrigger className="text-left text-base font-semibold text-primary hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
    </section>
  );
}
