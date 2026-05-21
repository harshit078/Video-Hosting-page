"use client";

import { Check, X } from "lucide-react";
import { motion } from "motion/react";
import SectionHeader from "@/components/shared/SectionHeader";
import type { CompareSection } from "@/lib/types";

export default function CompareSection({ data }: { data: CompareSection }) {
  const productLabel = data.productLabel;
  const competitorLabel = data.competitorLabel;

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

      <div className="mt-3xl">
        <div className="mb-sm grid grid-cols-[1fr_80px_140px] items-center gap-4 px-md">
          <div />
          <div className="text-right text-sm text-muted-foreground">
            {productLabel}
          </div>
          <div className="text-right text-sm text-muted-foreground">
            {competitorLabel}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl">
          {data.items.map(({ id, text }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                delay: i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewport={{ once: true }}
              className={`grid grid-cols-[1fr_80px_140px] items-center gap-4 px-md py-lg rounded-2xl ${
                i % 2 === 0 ? "bg-zinc-200/30" : "bg-background"
              }`}
            >
              <span className="text-sm font-medium text-primary">{text}</span>
              <div className="flex justify-center">
                <Check size={16} strokeWidth={3} className="text-emerald-500" />
              </div>

              <div className="flex justify-center">
                <X size={16} strokeWidth={3} className="text-red-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
