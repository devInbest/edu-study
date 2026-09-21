'use client';

import { useEffect, useRef, useState } from 'react';

import { useReducedMotion } from 'framer-motion';

import { cn } from '@/utils/helpers';

import classes from './InfiniteMovingCards.module.scss';

export default function InfiniteMovingCards({
  items,
  direction = 'left',
  speed = 'fast',
  pauseOnHover = true,
  className = '',
  renderItem,
}) {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const [start, setStart] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current || !scrollerRef.current) return;

    if (direction === 'left') {
      containerRef.current.style.setProperty('--animation-direction', 'forwards');
    } else {
      containerRef.current.style.setProperty('--animation-direction', 'reverse');
    }

    if (speed === 'fast') {
      containerRef.current.style.setProperty('--animation-duration', '20s');
    } else if (speed === 'normal') {
      containerRef.current.style.setProperty('--animation-duration', '40s');
    } else {
      containerRef.current.style.setProperty('--animation-duration', '80s');
    }

    if (!reduceMotion) {
      setStart(true);
    }
  }, [direction, speed, reduceMotion]);

  const loopItems = reduceMotion ? items : [...items, ...items];

  return (
    <div ref={containerRef} className={cn(classes.scroller, className)}>
      <ul
        ref={scrollerRef}
        className={cn(
          classes.list,
          start && classes.animate,
          pauseOnHover && !reduceMotion && classes.pauseOnHover,
        )}
      >
        {loopItems.map((item, idx) => (
          <li
            className={classes.item}
            key={`${item.name}-${idx}`}
            aria-hidden={idx >= items.length ? true : undefined}
          >
            {renderItem ? (
              renderItem(item)
            ) : (
              <blockquote className={classes.blockquote}>
                <p className={classes.quote}>{item.quote}</p>
                <footer className={classes.meta}>
                  <span className={classes.name}>{item.name}</span>
                  <span className={classes.title}>{item.title}</span>
                </footer>
              </blockquote>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
