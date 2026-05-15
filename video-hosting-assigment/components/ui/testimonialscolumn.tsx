'use client';

import React from 'react';
import { motion } from 'motion/react';

export type TestimonialItem = {
  text: string;
  image: string;
  name: string;
  role: string;
};

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: TestimonialItem[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: '-50%',
        }}
        transition={{
          duration: props.duration,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
        className="flex flex-col gap-sm pb-sm bg-background"
      >
        {[...new Array(2).fill(0)].map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, image, name, role }, i) => (
              <div
                className="w-full rounded-3xl border border-border bg-card p-xl shadow-lg shadow-primary/10"
                key={i}
              >
                <div className="text-sm leading-relaxed text-muted-foreground">{text}</div>
                <div className="mt-sm flex items-center gap-2">
                  <img
                    width={40}
                    height={40}
                    src={image}
                    alt={name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
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
