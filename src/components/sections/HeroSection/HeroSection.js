'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@mantine/core';
import {
  IconHomeHeart,
  IconSchool,
  IconUserStar,
} from '@tabler/icons-react';
import { motion, useReducedMotion } from 'framer-motion';

import aboutBanner from '@/assets/images/banners/about.jpg';
import contactBanner from '@/assets/images/banners/contact.jpg';
import servicesBanner from '@/assets/images/banners/services.jpg';
import Container from '@/components/common/Container/Container';
import WhatsAppIcon from '@/components/common/WhatsAppIcon/WhatsAppIcon';
import EnquiryForm from '@/components/forms/EnquiryForm/EnquiryForm';
import TextGenerateEffect from '@/components/ui/TextGenerateEffect/TextGenerateEffect';
import { getWhatsAppUrl } from '@/utils/helpers';

import classes from './HeroSection.module.scss';

const pillars = [
  { label: 'Admission Guidance', icon: IconSchool },
  { label: 'Career Counselling', icon: IconUserStar },
  { label: 'Local Guardian Support', icon: IconHomeHeart },
];

const slides = [
  { src: aboutBanner, alt: 'Students exploring campus life' },
  { src: servicesBanner, alt: 'Education counselling and guidance' },
  { src: contactBanner, alt: 'Students planning their future' },
];

const HERO_HEADING = 'Your Journey to the Right Education Starts Here';

const SLIDE_INTERVAL_MS = 5500;

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [activeSlide]);

  return (
    <section className={classes.hero}>
      <div className={classes.slider} aria-hidden="true">
        {slides.map((slide, index) => (
          <div
            key={slide.alt}
            className={`${classes.slide} ${index === activeSlide ? classes.slideActive : ''}`}
          >
            <Image
              src={slide.src}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className={classes.slideImage}
            />
          </div>
        ))}
        <div className={classes.overlay} />
      </div>

      <Container>
        <div className={classes.inner}>
          <motion.div
            className={classes.copy}
            initial={reduceMotion ? false : { opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className={classes.tag}>
              <span>Your Future</span>
              <span className={classes.dot}>|</span>
              <span>Our Guidance</span>
            </p>

            <TextGenerateEffect
              as="h1"
              words={HERO_HEADING}
              highlightWords={['Education']}
              className={classes.title}
              duration={0.45}
              filter
            />

            <div className={classes.pillars}>
              {pillars.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    className={classes.pillar}
                    initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 + index * 0.08, duration: 0.45 }}
                  >
                    <span className={classes.pillarIcon}>
                      <Icon size={18} stroke={1.8} />
                    </span>
                    <span>{item.label}</span>
                  </motion.div>
                );
              })}
            </div>

            <div className={classes.actions}>
              <Button
                component="a"
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                size="md"
                leftSection={<WhatsAppIcon size={18} />}
                className={classes.waBtn}
              >
                WhatsApp Us
              </Button>
              <Button
                component={Link}
                href="/contact"
                size="md"
                variant="outline"
                className={classes.outlineBtn}
              >
                Apply Now
              </Button>
            </div>
          </motion.div>

          <motion.div
            id="enquiry"
            className={classes.formWrap}
            initial={reduceMotion ? false : { opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <EnquiryForm
              compact
              variant="glass"
              title="Get Free counselling"
              eyebrow=""
              accentTitle
            />
          </motion.div>
        </div>
      </Container>

      <div className={classes.dots} role="tablist" aria-label="Hero background slides">
        {slides.map((slide, index) => (
          <button
            key={slide.alt}
            type="button"
            role="tab"
            aria-selected={index === activeSlide}
            aria-label={`Show slide ${index + 1}`}
            className={`${classes.dotBtn} ${index === activeSlide ? classes.dotBtnActive : ''}`}
            onClick={() => setActiveSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}
