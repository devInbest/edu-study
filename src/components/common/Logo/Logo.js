import Image from 'next/image';
import Link from 'next/link';

import logoDark from '@/assets/images/eduStudy_logo_dark-long.png';
import logoLight from '@/assets/images/eduStudy_logo_light-long.png';
import env from '@/constants/env';
import { cn } from '@/utils/helpers';

import classes from './Logo.module.scss';

export default function Logo({ variant = 'light', compact = false }) {
  const src = variant === 'dark' ? logoDark : logoLight;

  return (
    <Link
      href="/"
      className={cn(classes.logo, compact && classes.compact)}
      aria-label={`${env.appName} home`}
    >
      <Image
        src={src}
        alt={env.appName}
        priority={variant === 'light'}
        className={classes.image}
        sizes={compact ? '160px' : '220px'}
      />
    </Link>
  );
}
