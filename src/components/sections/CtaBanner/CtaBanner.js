'use client';

import { useState } from 'react';

import AppButton from '@/components/common/AppButton/AppButton';
import Container from '@/components/common/Container/Container';
import ScrollReveal from '@/components/common/ScrollReveal/ScrollReveal';
import WhatsAppIcon from '@/components/common/WhatsAppIcon/WhatsAppIcon';
import EnquiryModal from '@/components/forms/EnquiryModal/EnquiryModal';
import { getWhatsAppUrl } from '@/utils/helpers';

import classes from './CtaBanner.module.scss';

export default function CtaBanner({ className = '' }) {
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  return (
    <section className={`${classes.section} ${className}`.trim()}>
      <Container>
        <ScrollReveal className={classes.inner}>
          <div>
            <h2>Confused About Your Career or Admission?</h2>
            <p>Get free counselling and a clear plan tailored to your goals.</p>
          </div>
          <div className={classes.actions}>
            <AppButton
              type="button"
              size="md"
              className={classes.primary}
              onClick={() => setEnquiryOpen(true)}
            >
              Get Free Counselling
            </AppButton>
            <AppButton
              href={getWhatsAppUrl()}
              external
              size="md"
              leftSection={<WhatsAppIcon size={18} />}
              className={classes.waBtn}
            >
              WhatsApp Us
            </AppButton>
          </div>
        </ScrollReveal>
      </Container>

      <EnquiryModal opened={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </section>
  );
}
