'use client';

import { useState } from 'react';
import Link from 'next/link';

import { Burger, Drawer, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';

import AppButton from '@/components/common/AppButton/AppButton';
import Logo from '@/components/common/Logo/Logo';
import { navLinks } from '@/constants/navigation';

import classes from './MobileDrawer.module.scss';

export default function MobileDrawer() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const handleClose = () => {
    setOpenSubmenu(null);
    close();
  };

  return (
    <div className={classes.mobileOnly}>
      <Burger opened={opened} onClick={toggle} aria-label="Open navigation menu" color="#ffffff" />

      <Drawer
        opened={opened}
        onClose={handleClose}
        title={<Logo compact />}
        padding="md"
        position="right"
        size="88%"
      >
        <Stack className={classes.drawerContent} gap="lg">
          <nav>
            <ul className={classes.navList}>
              {navLinks.map((link) => {
                if (link.children?.length) {
                  const expanded = openSubmenu === link.href;
                  return (
                    <li key={link.href} className={classes.submenuItem}>
                      <button
                        type="button"
                        className={classes.submenuTrigger}
                        aria-expanded={expanded}
                        onClick={() =>
                          setOpenSubmenu((prev) => (prev === link.href ? null : link.href))
                        }
                      >
                        {link.label}
                        <IconChevronDown
                          size={16}
                          stroke={2.4}
                          className={`${classes.chevron}${expanded ? ` ${classes.chevronOpen}` : ''}`}
                          aria-hidden
                        />
                      </button>
                      {expanded ? (
                        <ul className={classes.submenu}>
                          {link.children.map((child) => (
                            <li key={child.href}>
                              <Link href={child.href} onClick={handleClose}>
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  );
                }

                return (
                  <li key={link.href}>
                    <Link href={link.href} onClick={handleClose}>
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link href="/terms" onClick={handleClose}>
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </nav>

          <AppButton href="/contact" onClick={handleClose} fullWidth>
            Free Counselling
          </AppButton>
        </Stack>
      </Drawer>
    </div>
  );
}
