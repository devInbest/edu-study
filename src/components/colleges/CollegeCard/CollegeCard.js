'use client';

import Image from 'next/image';
import Link from 'next/link';

import { IconMapPin, IconStar, IconStarFilled, IconStarHalfFilled } from '@tabler/icons-react';
import { motion } from 'framer-motion';

import classes from './CollegeCard.module.scss';

function StarRating({ rating, reviewCount }) {
  const value = Math.max(0, Math.min(5, Number(rating) || 0));
  const full = Math.floor(value);
  const fraction = value - full;
  const showHalf = fraction >= 0.25 && fraction < 0.75;
  const filled = fraction >= 0.75 ? full + 1 : full;

  return (
    <div className={classes.rating} aria-label={`${value.toFixed(1)} out of 5 on Google`}>
      <span className={classes.stars} aria-hidden>
        {Array.from({ length: 5 }, (_, index) => {
          if (index < filled) {
            return <IconStarFilled key={index} size={15} />;
          }
          if (index === full && showHalf) {
            return <IconStarHalfFilled key={index} size={15} />;
          }
          return <IconStar key={index} size={15} />;
        })}
      </span>
      <span className={classes.ratingValue}>{value.toFixed(1)}</span>
      {reviewCount ? (
        <span className={classes.reviewCount}>({reviewCount.toLocaleString('en-IN')})</span>
      ) : null}
    </div>
  );
}

export default function CollegeCard({ college }) {
  return (
    <Link href={`/colleges/${college.slug}`} className={classes.card}>
      <div className={classes.media}>
        <Image
          src={college.image}
          alt={college.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={classes.image}
        />

        <motion.div
          className={classes.coursesRow}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {college.degrees.map((degree, index) => (
            <motion.span
              key={degree}
              className={classes.courseChip}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 * index, duration: 0.35 }}
            >
              {degree}
            </motion.span>
          ))}
        </motion.div>
      </div>

      <div className={classes.body}>
        <motion.h3
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {college.name}
        </motion.h3>

        <motion.span
          className={classes.location}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.12 }}
        >
          <IconMapPin size={14} />
          {college.city}, {college.state}
        </motion.span>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.18 }}
        >
          <StarRating rating={college.rating} reviewCount={college.reviewCount} />
        </motion.div>
      </div>
    </Link>
  );
}
