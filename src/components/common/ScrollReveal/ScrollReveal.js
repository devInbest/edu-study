'use client';

import { motion, useReducedMotion } from 'framer-motion';

const directions = {
  up: { y: 40, x: 0 },
  down: { y: -28, x: 0 },
  left: { x: 48, y: 0 },
  right: { x: -48, y: 0 },
  none: { x: 0, y: 0 },
};

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  amount = 0.25,
  once = true,
  as = 'div',
}) {
  const reduceMotion = useReducedMotion();
  const offset = directions[direction] || directions.up;
  const Component = motion[as] || motion.div;

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Component
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
