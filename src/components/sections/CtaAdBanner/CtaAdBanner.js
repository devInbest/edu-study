'use client';

import { useState } from 'react';

import Image from 'next/image';

import studentCutout from '@/assets/images/indian-student-cta-cutout.png';
import AppButton from '@/components/common/AppButton/AppButton';
import Container from '@/components/common/Container/Container';
import EnquiryModal from '@/components/forms/EnquiryModal/EnquiryModal';

import classes from './CtaAdBanner.module.scss';

export default function CtaAdBanner() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  return (
    <section className={classes.section} aria-labelledby="cta-ad-banner-title">
      <div className={classes.band}>
        <div className={classes.shine} aria-hidden="true" />

        <Container className={classes.inner}>
          <div className={classes.copy}>
            <p className={classes.eyebrow}>Don&apos;t miss the opportunity</p>
            <h2 id="cta-ad-banner-title">
              Dreaming of the right college but still confused where to start?
            </h2>
            <AppButton
              type="button"
              size="md"
              className={classes.cta}
              onClick={() => setEnquiryOpen(true)}
            >
              Get Free Counselling
            </AppButton>
          </div>

          <div className={classes.visual}>
            <Image
              src={studentCutout}
              alt="Indian student ready for college counselling"
              className={classes.portrait}
              sizes="(max-width: 768px) 220px, 360px"
            />
          </div>
        </Container>
      </div>

      <EnquiryModal opened={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </section>
  );
}
