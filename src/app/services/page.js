import {
  IconBook,
  IconBuildingSkyscraper,
  IconCompass,
  IconFileDescription,
  IconSchool,
  IconShieldHeart,
} from '@tabler/icons-react';

import AppButton from '@/components/common/AppButton/AppButton';
import Container from '@/components/common/Container/Container';
import PageHero from '@/components/common/PageHero/PageHero';
import CtaBanner from '@/components/sections/CtaBanner/CtaBanner';
import { services } from '@/data/services';
import { getWhatsAppUrl } from '@/utils/helpers';

import classes from './services.module.scss';

const icons = {
  school: IconSchool,
  compass: IconCompass,
  building: IconBuildingSkyscraper,
  file: IconFileDescription,
  shield: IconShieldHeart,
  book: IconBook,
};

export const metadata = {
  title: 'Services',
  description:
    'Admission guidance, career counselling, college selection, application assistance, local guardian support, and course selection.',
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything you need for a confident admission journey"
        description="Six focused services designed to take students from first questions to campus support."
      />

      <section className={classes.section}>
        <Container className={classes.list}>
          {services.map((service) => {
            const Icon = icons[service.icon] || IconSchool;
            return (
              <article key={service.id} id={service.id} className={classes.item}>
                <span className={classes.icon}>
                  <Icon size={24} stroke={1.6} />
                </span>
                <div className={classes.content}>
                  <h2>{service.title}</h2>
                  <p>{service.description}</p>
                  <div className={classes.actions}>
                    <AppButton href="/contact" size="sm">
                      Enquire now
                    </AppButton>
                    <AppButton
                      href={getWhatsAppUrl(`Hi, I need help with ${service.title}.`)}
                      external
                      size="sm"
                      variant="outline"
                      color="navy"
                    >
                      WhatsApp
                    </AppButton>
                  </div>
                </div>
              </article>
            );
          })}
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
