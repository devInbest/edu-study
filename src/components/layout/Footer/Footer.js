import Image from 'next/image';
import Link from 'next/link';

import { IconMail, IconPhone } from '@tabler/icons-react';

import facebookIcon from '@/assets/icons/facebook.png';
import instagramIcon from '@/assets/icons/instagram.png';
import Container from '@/components/common/Container/Container';
import Logo from '@/components/common/Logo/Logo';
import env from '@/constants/env';
import { quickLinks, serviceLinks } from '@/constants/navigation';
import { socialLinks } from '@/constants/site';
import { courseLinks } from '@/data/courses';

import classes from './Footer.module.scss';

export default function Footer() {
  const year = new Date().getFullYear();
  const phoneHref = `tel:${env.contactPhone.replace(/\s/g, '')}`;

  const social = [
    {
      href: socialLinks.facebook || '#',
      label: 'Facebook',
      icon: facebookIcon,
    },
    {
      href: socialLinks.instagram || '#',
      label: 'Instagram',
      icon: instagramIcon,
    },
  ];

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.brand}>
          <Logo />

          <div className={classes.connect}>
            <h3>Connect With Us</h3>

            <a href={`mailto:${env.contactEmail}`} className={classes.contactItem}>
              <span className={classes.contactIcon}>
                <IconMail size={16} stroke={1.8} />
              </span>
              {env.contactEmail}
            </a>

            <a href={phoneHref} className={classes.contactItem}>
              <span className={classes.contactIcon}>
                <IconPhone size={16} stroke={1.8} />
              </span>
              {env.contactPhone}
            </a>

            <div className={classes.socialIcons}>
              {social.map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className={classes.socialBtn}
                >
                  <Image src={icon} alt="" width={48} height={48} className={classes.socialIcon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={classes.column}>
          <h3>Quick Links</h3>
          <ul>
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={classes.column}>
          <h3>Services</h3>
          <ul>
            {serviceLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={classes.column}>
          <h3>Courses</h3>
          <ul>
            {courseLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className={classes.bottom}>
        <Container className={classes.bottomInner}>
          <p>
            © {year} {env.appName}. All rights reserved.
          </p>
          <p className={classes.credit}>
            Developed by <strong className={classes.creditBrand}>DigitallyChalo</strong>
          </p>
        </Container>
      </div>
    </footer>
  );
}
