import Image from 'next/image';

import {
  IconBrandWhatsapp,
  IconBuilding,
  IconMail,
  IconMapPin,
  IconPhone,
  IconShare,
} from '@tabler/icons-react';

import facebookIcon from '@/assets/icons/facebook.png';
import instagramIcon from '@/assets/icons/instagram.png';
import Container from '@/components/common/Container/Container';
import PageHero from '@/components/common/PageHero/PageHero';
import EnquiryForm from '@/components/forms/EnquiryForm/EnquiryForm';
import env from '@/constants/env';
import { contactPlaceholders, socialLinks } from '@/constants/site';
import { getWhatsAppUrl } from '@/utils/helpers';

import classes from './contact.module.scss';

export const metadata = {
  title: 'Contact Us',
  description:
    'Contact Edu Study Consultancy for free counselling, admission guidance, and college shortlisting support.',
};

export default function ContactPage() {
  const phoneHref = `tel:${env.contactPhone.replace(/\s/g, '')}`;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s plan your next step together"
        description="Send an enquiry or reach us on WhatsApp. Office address and social links will be updated once confirmed by the client."
      />

      <section className={classes.section}>
        <Container className={classes.layout}>
          <div className={classes.topRow}>
            <div className={classes.info}>
              <article className={classes.officeCard}>
                <h2>
                  <span className={classes.headingIcon}>
                    <IconBuilding size={18} stroke={1.8} />
                  </span>
                  Office
                </h2>
                <p className={classes.item}>
                  <IconMapPin size={16} stroke={1.8} />
                  <span>
                    {contactPlaceholders.address}
                    <br />
                    {contactPlaceholders.city}
                  </span>
                </p>
              </article>

              <article className={classes.reachCard}>
                <h2>
                  <span className={classes.headingIcon}>
                    <IconPhone size={18} stroke={1.8} />
                  </span>
                  Reach us
                </h2>
                <a href={`mailto:${env.contactEmail}`} className={classes.itemLink}>
                  <IconMail size={16} stroke={1.8} />
                  <span>{env.contactEmail}</span>
                </a>
                <a href={phoneHref} className={classes.itemLink}>
                  <IconPhone size={16} stroke={1.8} />
                  <span>{env.contactPhone}</span>
                </a>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className={classes.itemLink}
                >
                  <IconBrandWhatsapp size={16} stroke={1.8} />
                  <span>Chat on WhatsApp</span>
                </a>
              </article>

              <article>
                <h2>
                  <span className={classes.headingIcon}>
                    <IconShare size={18} stroke={1.8} />
                  </span>
                  Social
                </h2>
                <div className={classes.socialIcons}>
                  <a
                    href={socialLinks.facebook || '#'}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    className={classes.socialBtn}
                  >
                    <Image
                      src={facebookIcon}
                      alt=""
                      width={48}
                      height={48}
                      className={classes.socialIcon}
                    />
                  </a>
                  <a
                    href={socialLinks.instagram || '#'}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className={classes.socialBtn}
                  >
                    <Image
                      src={instagramIcon}
                      alt=""
                      width={48}
                      height={48}
                      className={classes.socialIcon}
                    />
                  </a>
                </div>
              </article>
            </div>

            <div className={classes.formCol}>
              <EnquiryForm compact variant="dark" />
            </div>
          </div>

          <div className={classes.map}>
            <iframe
              title="Office location map"
              src={contactPlaceholders.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
