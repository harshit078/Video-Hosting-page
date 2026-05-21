'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';

export type TestimonialItem = {
  text: string;
  image?: string;
  name: string;
  role: string;
};

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: TestimonialItem[];
  duration?: number;
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={props.className}>
      <motion.div
        animate={prefersReducedMotion ? undefined : { translateY: '-50%' }}
        transition={
          prefersReducedMotion
            ? undefined
            : {
                duration: props.duration,
                repeat: Infinity,
                ease: 'linear',
                repeatType: 'loop',
              }
        }
        className="flex flex-col gap-sm pb-sm"
      >
        {[...new Array(2).fill(0)].map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, image, name, role }, i) => (
              <div
                className="rounded-3xl border border-border w-full bg-card p-xl shadow-lg shadow-primary/10"
                key={i}
              >
                <div className="text-sm leading-relaxed text-muted-foreground">{text}</div>
                <div className="mt-sm flex items-center gap-2">
                  {image ? (
                    <Image
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-sm font-semibold text-brand"
                    >
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
  );
};
