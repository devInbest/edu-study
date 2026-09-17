'use client';

import { IconBrandWhatsapp } from '@tabler/icons-react';

import AppButton from '@/components/common/AppButton/AppButton';
import Container from '@/components/common/Container/Container';
import ScrollReveal from '@/components/common/ScrollReveal/ScrollReveal';
import { getWhatsAppUrl } from '@/utils/helpers';

import classes from './CtaBanner.module.scss';

export default function CtaBanner() {
  return (
    <section className={classes.section}>
      <Container>
        <ScrollReveal className={classes.inner}>
          <div>
            <h2>Confused About Your Career or Admission?</h2>
            <p>Get free counselling and a clear plan tailored to your goals.</p>
          </div>
          <div className={classes.actions}>
            <AppButton href="/contact" size="md" className={classes.primary}>
              Get Free Counselling
            </AppButton>
            <AppButton
              href={getWhatsAppUrl()}
              external
              size="md"
              variant="white"
              leftSection={<IconBrandWhatsapp size={18} />}
            >
              WhatsApp Us
            </AppButton>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
