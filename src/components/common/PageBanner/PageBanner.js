import Image from 'next/image';

import {
  IconBuildingSkyscraper,
  IconMailOpened,
  IconSparkles,
} from '@tabler/icons-react';

import Container from '@/components/common/Container/Container';
import SpotlightNew from '@/components/ui/SpotlightNew/SpotlightNew';

import classes from './PageBanner.module.scss';

const icons = {
  about: IconBuildingSkyscraper,
  services: IconSparkles,
  contact: IconMailOpened,
};

export default function PageBanner({
  image,
  imageAlt = '',
  eyebrow,
  title,
  icon = 'contact',
  priority = false,
}) {
  const Icon = typeof icon === 'string' ? icons[icon] || IconMailOpened : null;

  return (
    <section className={classes.banner} aria-labelledby="page-banner-title">
      <SpotlightNew />

      <div className={classes.media}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1400px) 55vw, 820px"
          className={classes.image}
        />
      </div>

      <Container className={classes.inner}>
        <div className={classes.content}>
          <div className={classes.iconWrap}>
            {Icon ? <Icon stroke={1.4} aria-hidden /> : icon}
          </div>
          <div className={classes.copy}>
            {eyebrow ? <p className={classes.eyebrow}>{eyebrow}</p> : null}
            <h1 id="page-banner-title" className={classes.title}>
              {title}
            </h1>
          </div>
        </div>
      </Container>
    </section>
  );
}
