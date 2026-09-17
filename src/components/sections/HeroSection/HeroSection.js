'use client';

import Link from 'next/link';

import { Button } from '@mantine/core';
import {
  IconArrowRight,
  IconBrandWhatsapp,
  IconHomeHeart,
  IconSchool,
  IconUserStar,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';

import Container from '@/components/common/Container/Container';
import EnquiryForm from '@/components/forms/EnquiryForm/EnquiryForm';
import { getWhatsAppUrl } from '@/utils/helpers';

import classes from './HeroSection.module.scss';

const pillars = [
  { label: 'Admission Guidance', icon: IconSchool },
  { label: 'Career Counselling', icon: IconUserStar },
  { label: 'Local Guardian Support', icon: IconHomeHeart },
];

export default function HeroSection() {
  return (
    <section className={classes.hero}>
      <div className={classes.glow} aria-hidden="true" />
      <Container className={classes.inner}>
        <motion.div
          className={classes.copy}
          initial={{ opacity: 0, x: -36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className={classes.tag}>
            <span>Your Future</span>
            <span className={classes.dot}>|</span>
            <span>Our Guidance</span>
          </p>

          <h1>
            Your Journey to the Right <em>Education</em> Starts Here
          </h1>

          <p className={classes.supporting}>
            Expert counselling, college shortlisting, and end-to-end admission support for students
            who want clarity — not confusion.
          </p>

          <div className={classes.pillars}>
            {pillars.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  className={classes.pillar}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + index * 0.08, duration: 0.45 }}
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
              href="#enquiry"
              size="md"
              rightSection={<IconArrowRight size={16} />}
              className={classes.goldBtn}
            >
              Get Free Counselling
            </Button>
            <Button
              component="a"
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              size="md"
              leftSection={<IconBrandWhatsapp size={18} />}
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
          className={classes.visual}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={classes.imageFrame}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
              alt="Students preparing for higher education"
            />
            <div className={classes.imageBadge}>
              <strong>2,500+</strong>
              <span>Students guided</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          id="enquiry"
          className={classes.formWrap}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <EnquiryForm compact variant="dark" />
        </motion.div>
      </Container>
    </section>
  );
}
