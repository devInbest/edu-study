'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { IconBrandFacebook, IconBrandInstagram, IconChevronDown } from '@tabler/icons-react';

import Container from '@/components/common/Container/Container';
import Logo from '@/components/common/Logo/Logo';
import MobileDrawer from '@/components/layout/MobileDrawer/MobileDrawer';
import { navLinks } from '@/constants/navigation';
import { socialLinks } from '@/constants/site';

import classes from './Header.module.scss';

function isLinkActive(link, pathname) {
  if (link.href === '/') return pathname === '/';
  return pathname.startsWith(link.href);
}

function NavDropdown({ link, pathname }) {
  const [open, setOpen] = useState(false);
  const itemRef = useRef(null);
  const active = isLinkActive(link, pathname);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event) => {
      if (itemRef.current && !itemRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <li
      ref={itemRef}
      className={`${classes.hasDropdown}${open ? ` ${classes.dropdownOpen}` : ''}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={`${classes.trigger}${active ? ` ${classes.active}` : ''}`}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((prev) => !prev)}
      >
        {link.label}
        <IconChevronDown size={14} stroke={2.4} className={classes.chevron} aria-hidden />
      </button>

      <ul className={classes.dropdown} role="menu" aria-label={`${link.label} submenu`}>
        {link.children.map((child) => {
          const childActive = pathname.startsWith(child.href);
          return (
            <li key={child.href} role="none">
              <Link
                href={child.href}
                role="menuitem"
                className={childActive ? classes.active : undefined}
                onClick={() => setOpen(false)}
              >
                {child.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
  );
}

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={classes.header}>
      <Container className={classes.inner}>
        <Logo variant="light" />

        <nav className={classes.desktopNav} aria-label="Main navigation">
          <ul>
            {navLinks.map((link) => {
              if (link.children?.length) {
                return <NavDropdown key={link.href} link={link} pathname={pathname} />;
              }

              const active = isLinkActive(link, pathname);
              return (
                <li key={link.href}>
                  <Link href={link.href} className={active ? classes.active : undefined}>
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={classes.desktopActions}>
          <a
            href={socialLinks.facebook || '#'}
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className={`${classes.social} ${classes.facebook}`}
          >
            <IconBrandFacebook size={18} stroke={1.8} />
          </a>
          <a
            href={socialLinks.instagram || '#'}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className={`${classes.social} ${classes.instagram}`}
          >
            <IconBrandInstagram size={18} stroke={1.8} />
          </a>
        </div>

        <MobileDrawer />
      </Container>
    </header>
  );
}
