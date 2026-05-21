'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';

export function AnimatedBadge({ texts }: { texts: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (texts.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % texts.length);
    }, 2800);
    return () => clearInterval(id);
  }, [texts.length]);

  if (!texts.length) return null;

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-4 py-1.5 text-sm font-medium text-primary shadow-sm backdrop-blur-sm">
      <span className="h-2 w-2 rounded-full bg-brand animate-pulse shrink-0" />
      <div className="relative h-[1.25em] overflow-hidden min-w-[24ch]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={index}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            {texts[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
