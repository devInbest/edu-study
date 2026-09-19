'use client';

import { useEffect } from 'react';

import { motion, stagger, useAnimate, useReducedMotion } from 'framer-motion';

import { cn } from '@/utils/helpers';

import classes from './TextGenerateEffect.module.scss';

export default function TextGenerateEffect({
  words,
  className = '',
  filter = true,
  duration = 0.5,
  as: Component = 'div',
  highlightWords = [],
}) {
  const [scope, animate] = useAnimate();
  const reduceMotion = useReducedMotion();
  const wordsArray = words.split(' ').filter(Boolean);
  const highlightSet = new Set(highlightWords.map((word) => word.toLowerCase()));

  useEffect(() => {
    if (reduceMotion) {
      animate(
        'span',
        { opacity: 1, filter: 'none' },
        { duration: 0 },
      );
      return;
    }

    animate(
      'span',
      {
        opacity: 1,
        filter: filter ? 'blur(0px)' : 'none',
      },
      {
        duration: duration ?? 1,
        delay: stagger(0.2),
      },
    );
  }, [animate, duration, filter, reduceMotion, words]);

  return (
    <Component className={cn(classes.root, className)}>
      <motion.div ref={scope} className={classes.words} aria-hidden="true">
        {wordsArray.map((word, index) => {
          const isHighlight = highlightSet.has(word.replace(/[^\w]/g, '').toLowerCase());

          return (
            <motion.span
              key={`${word}-${index}`}
              className={cn(classes.word, isHighlight && classes.highlight)}
              style={{
                opacity: reduceMotion ? 1 : 0,
                filter: reduceMotion ? 'none' : filter ? 'blur(10px)' : 'none',
              }}
            >
              {isHighlight ? <em>{word}</em> : word}{' '}
            </motion.span>
          );
        })}
      </motion.div>
      <span className={classes.srOnly}>{words}</span>
    </Component>
  );
}
