'use client';

import { ActionIcon, Tooltip } from '@mantine/core';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import { motion } from 'framer-motion';

import { getWhatsAppUrl } from '@/utils/helpers';

import classes from './WhatsAppFab.module.scss';

export default function WhatsAppFab() {
  return (
    <motion.div
      className={classes.fab}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.6, type: 'spring', stiffness: 260, damping: 18 }}
    >
      <Tooltip label="Chat on WhatsApp" position="left">
        <ActionIcon
          component="a"
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noreferrer"
          size={56}
          radius="xl"
          className={classes.button}
          aria-label="Chat on WhatsApp"
        >
          <IconBrandWhatsapp size={28} />
        </ActionIcon>
      </Tooltip>
    </motion.div>
  );
}
