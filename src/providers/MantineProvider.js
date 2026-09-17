'use client';

import { MantineProvider as MantineCoreProvider } from '@mantine/core';

const navy = [
  '#f2f6fb',
  '#dce7f5',
  '#b5cce8',
  '#8aafd8',
  '#5f91c5',
  '#3a74ad',
  '#1f5a96',
  '#0a3d7a',
  '#002d62',
  '#001d40',
];

const gold = [
  '#fff8e6',
  '#ffefc2',
  '#ffe08a',
  '#ffd056',
  '#fdb813',
  '#e0a100',
  '#c48b00',
  '#a37300',
  '#825c00',
  '#664800',
];

const theme = {
  primaryColor: 'navy',
  defaultRadius: 'md',
  defaultGradient: {
    from: 'navy.8',
    to: 'navy.6',
    deg: 135,
  },
  breakpoints: {
    xs: '20em',
    sm: '30em',
    md: '48em',
    lg: '64em',
    xl: '90em',
  },
  colors: {
    navy,
    gold,
  },
  fontFamily: 'var(--font-body), "Segoe UI", sans-serif',
  headings: {
    fontFamily: 'var(--font-display), var(--font-body), sans-serif',
  },
  components: {
    Button: {
      defaultProps: {
        radius: 'xl',
      },
    },
  },
};

export default function MantineProvider({ children }) {
  return (
    <MantineCoreProvider theme={theme} defaultColorScheme="light" forceColorScheme="light">
      {children}
    </MantineCoreProvider>
  );
}
