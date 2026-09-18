import Image from 'next/image';
import Link from 'next/link';

import logo from '@/assets/images/eduStudy_logo_NO-BG-long.png';
import env from '@/constants/env';
import { cn } from '@/utils/helpers';

import classes from './Logo.module.scss';

export default function Logo({ compact = false }) {
  return (
    <Link
      href="/"
      className={cn(classes.logo, compact && classes.compact)}
      aria-label={`${env.appName} home`}
    >
      <Image
        src={logo}
        alt={env.appName}
        priority
        className={classes.image}
        sizes={compact ? '160px' : '(min-width: 1024px) 300px, 240px'}
      />
    </Link>
  );
}
