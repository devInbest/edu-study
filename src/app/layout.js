import '@mantine/core/styles.css';
import './globals.scss';

import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';

import SiteShell from '@/components/layout/SiteShell/SiteShell';
import env from '@/constants/env';
import MantineProvider from '@/providers/MantineProvider';

const displayFont = Outfit({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const bodyFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(env.siteUrl),
  title: {
    default: `${env.appName} | Education Counselling & Admissions`,
    template: `%s | ${env.appName}`,
  },
  description:
    'Edu Study Consultancy helps students with admission guidance, career counselling, college selection, and local guardian support across India.',
  openGraph: {
    title: env.appName,
    description:
      'Your journey to the right education starts here — free counselling and trusted college guidance.',
    url: env.siteUrl,
    siteName: env.appName,
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${displayFont.variable} ${bodyFont.variable}`}
    >
      <body>
        <MantineProvider>
          <SiteShell>{children}</SiteShell>
        </MantineProvider>
      </body>
    </html>
  );
}
