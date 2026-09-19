'use client';

import { motion, useReducedMotion } from 'framer-motion';

import classes from './SpotlightNew.module.scss';

const DEFAULT_GRADIENT_FIRST =
  'radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(0, 0%, 100%, 0.78) 0, hsla(195, 85%, 78%, 0.32) 45%, hsla(210, 70%, 45%, 0) 78%)';
const DEFAULT_GRADIENT_SECOND =
  'radial-gradient(50% 50% at 50% 50%, hsla(0, 0%, 100%, 0.5) 0, hsla(195, 80%, 70%, 0.18) 75%, transparent 100%)';
const DEFAULT_GRADIENT_THIRD =
  'radial-gradient(50% 50% at 50% 50%, hsla(45, 100%, 78%, 0.28) 0, hsla(210, 55%, 50%, 0.1) 75%, transparent 100%)';

export default function SpotlightNew({
  gradientFirst = DEFAULT_GRADIENT_FIRST,
  gradientSecond = DEFAULT_GRADIENT_SECOND,
  gradientThird = DEFAULT_GRADIENT_THIRD,
  translateY = -180,
  width = 460,
  height = 900,
  smallWidth = 200,
  duration = 7,
  xOffset = 80,
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={classes.root}
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduceMotion ? 0 : 1.5 }}
      aria-hidden="true"
    >
      <motion.div
        className={classes.left}
        animate={reduceMotion ? undefined : { x: [0, xOffset, 0] }}
        transition={
          reduceMotion
            ? undefined
            : {
                duration,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }
        }
      >
        <div
          className={classes.beam}
          style={{
            transform: `translateY(${translateY}px) rotate(-45deg)`,
            background: gradientFirst,
            width: `${width}px`,
            height: `${height}px`,
          }}
        />
        <div
          className={`${classes.beam} ${classes.originTopLeft}`}
          style={{
            transform: 'rotate(-45deg) translate(5%, -50%)',
            background: gradientSecond,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
        />
        <div
          className={`${classes.beam} ${classes.originTopLeft}`}
          style={{
            transform: 'rotate(-45deg) translate(-180%, -70%)',
            background: gradientThird,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
        />
      </motion.div>

      <motion.div
        className={classes.right}
        animate={reduceMotion ? undefined : { x: [0, -xOffset, 0] }}
        transition={
          reduceMotion
            ? undefined
            : {
                duration,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }
        }
      >
        <div
          className={`${classes.beam} ${classes.alignRight}`}
          style={{
            transform: `translateY(${translateY}px) rotate(45deg)`,
            background: gradientFirst,
            width: `${width}px`,
            height: `${height}px`,
          }}
        />
        <div
          className={`${classes.beam} ${classes.alignRight} ${classes.originTopRight}`}
          style={{
            transform: 'rotate(45deg) translate(-5%, -50%)',
            background: gradientSecond,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
        />
        <div
          className={`${classes.beam} ${classes.alignRight} ${classes.originTopRight}`}
          style={{
            transform: 'rotate(45deg) translate(180%, -70%)',
            background: gradientThird,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
        />
      </motion.div>
    </motion.div>
  );
}
