'use client';

import Link from 'next/link';

import { Button } from '@mantine/core';

/**
 * Client-safe Mantine button that can render as Next.js Link or anchor.
 */
export default function AppButton({ href, external = false, children, ...props }) {
  if (!href) {
    return <Button {...props}>{children}</Button>;
  }

  if (external || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return (
      <Button component="a" href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} {...props}>
        {children}
      </Button>
    );
  }

  if (href.startsWith('#')) {
    return (
      <Button component="a" href={href} {...props}>
        {children}
      </Button>
    );
  }

  return (
    <Button component={Link} href={href} {...props}>
      {children}
    </Button>
  );
}
