'use client';

import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

const directions = {
  up: { y: 40, x: 0 },
  down: { y: -28, x: 0 },
  left: { x: 48, y: 0 },
  right: { x: -48, y: 0 },
  none: { x: 0, y: 0 },
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return reduced;
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  amount = 0.25,
  once = true,
  as = 'div',
  id,
}) {
  const [mounted, setMounted] = useState(false);
  const reduceMotion = usePrefersReducedMotion();
  const offset = directions[direction] || directions.up;
  const Component = motion[as] || motion.div;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || reduceMotion) {
    const Tag = as === 'div' || as === 'article' || as === 'section' ? as : 'div';
    return (
      <Tag id={id} className={className}>
        {children}
      </Tag>
    );
  }

  return (
    <Component
      id={id}
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </Component>
  );
}
