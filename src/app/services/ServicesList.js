'use client';

import {
  IconBook,
  IconBuildingSkyscraper,
  IconCompass,
  IconFileDescription,
  IconSchool,
  IconShieldHeart,
} from '@tabler/icons-react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

import AppButton from '@/components/common/AppButton/AppButton';
import EnquiryModal from '@/components/forms/EnquiryModal/EnquiryModal';
import { services } from '@/data/services';

import classes from './services.module.scss';

const icons = {
  school: IconSchool,
  compass: IconCompass,
  building: IconBuildingSkyscraper,
  file: IconFileDescription,
  shield: IconShieldHeart,
  book: IconBook,
};

const ease = [0.22, 1, 0.36, 1];

function ServiceBlock({ service, index, onEnquire }) {
  const reduceMotion = useReducedMotion();
  const Icon = icons[service.icon] || IconSchool;
  const imageFirst = index % 2 === 0;
  const tinted = index % 2 === 1;
  // Keep slide distances modest so mid-animation frames never spill the viewport
  const mediaX = imageFirst ? -28 : 28;
  const copyX = imageFirst ? 20 : -20;

  const fadeIn = { duration: 0.55, ease };
  const fadeOut = { duration: 0.4, ease };

  const blockVariants = {
    hidden: {
      opacity: 0,
      transition: fadeOut,
    },
    visible: {
      opacity: 1,
      transition: fadeIn,
    },
  };

  const innerVariants = {
    hidden: {
      transition: {
        when: 'afterChildren',
        staggerChildren: 0.04,
        staggerDirection: -1,
      },
    },
    visible: {
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.14,
      },
    },
  };

  const mediaVariants = {
    hidden: {
      opacity: 0,
      x: reduceMotion ? 0 : mediaX,
      scale: reduceMotion ? 1 : 0.96,
      transition: fadeOut,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.8, ease },
    },
  };

  const imageVariants = {
    hidden: {
      scale: reduceMotion ? 1 : 1.08,
      transition: fadeOut,
    },
    visible: {
      scale: 1,
      transition: { duration: 1.05, ease },
    },
  };

  const copyVariants = {
    hidden: {
      transition: {
        when: 'afterChildren',
        staggerChildren: 0.04,
        staggerDirection: -1,
      },
    },
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.06 },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: reduceMotion ? 0 : copyX,
      y: reduceMotion ? 0 : 14,
      transition: fadeOut,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.65, ease },
    },
  };

  const cta = (
    <AppButton
      type="button"
      size="md"
      className={`${classes.cta} ${tinted ? classes.ctaOutline : classes.ctaFilled}`}
      onClick={onEnquire}
    >
      Enquire Now
    </AppButton>
  );

  const copyBody = (
    <>
      <div className={classes.headingRow}>
        <span className={classes.icon}>
          <Icon size={20} stroke={1.7} />
        </span>
        <h2>{service.title}</h2>
      </div>
      <p>{service.description}</p>
      {service.details ? <p className={classes.details}>{service.details}</p> : null}
      {service.highlights?.length ? (
        <ul className={classes.highlights}>
          {service.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {cta}
    </>
  );

  if (reduceMotion) {
    return (
      <article
        id={service.id}
        className={`${classes.block} ${tinted ? classes.tinted : ''} ${imageFirst ? classes.imageFirst : classes.textFirst}`}
      >
        <div className={classes.inner}>
          <div className={classes.media}>
            <Image
              src={service.image}
              alt={service.imageAlt || service.title}
              fill
              sizes="(max-width: 768px) 100vw, 48vw"
              className={classes.image}
            />
          </div>
          <div className={classes.copy}>{copyBody}</div>
        </div>
      </article>
    );
  }

  return (
    <motion.article
      id={service.id}
      className={`${classes.block} ${tinted ? classes.tinted : ''} ${imageFirst ? classes.imageFirst : classes.textFirst}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.28 }}
      variants={blockVariants}
    >
      <motion.div className={classes.inner} variants={innerVariants}>
        <motion.div className={classes.media} variants={mediaVariants}>
          <motion.div className={classes.imageMotion} variants={imageVariants}>
            <Image
              src={service.image}
              alt={service.imageAlt || service.title}
              fill
              sizes="(max-width: 768px) 100vw, 48vw"
              className={classes.image}
            />
          </motion.div>
        </motion.div>

        <motion.div className={classes.copy} variants={copyVariants}>
          <motion.div className={classes.headingRow} variants={itemVariants}>
            <span className={classes.icon}>
              <Icon size={20} stroke={1.7} />
            </span>
            <h2>{service.title}</h2>
          </motion.div>
          <motion.p variants={itemVariants}>{service.description}</motion.p>
          {service.details ? (
            <motion.p className={classes.details} variants={itemVariants}>
              {service.details}
            </motion.p>
          ) : null}
          {service.highlights?.length ? (
            <motion.ul className={classes.highlights} variants={itemVariants}>
              {service.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </motion.ul>
          ) : null}
          <motion.div variants={itemVariants}>{cta}</motion.div>
        </motion.div>
      </motion.div>
    </motion.article>
  );
}

export default function ServicesList() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  return (
    <section className={classes.section}>
      <div className={classes.list}>
        {services.map((service, index) => (
          <ServiceBlock
            key={service.id}
            service={service}
            index={index}
            onEnquire={() => setEnquiryOpen(true)}
          />
        ))}
      </div>

      <EnquiryModal opened={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </section>
  );
}
