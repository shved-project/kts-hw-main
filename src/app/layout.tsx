import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { cookies } from 'next/headers';
import '@/styles/global.scss';
import '@/config/configureMobX';
import { RootStoreProvider } from '@/store';
import type { Theme } from '@/store/globals/theme';
import { themeScript } from '@/lib/themeScript';

export const metadata: Metadata = {
  title: {
    template: '%s | Lalasia',
    default: 'Lalasia - Discover Unique Treasures',
  },
  metadataBase: new URL('https://lalasia.com'),
  description:
    'Discover unique handmade items, vintage finds, and creative goods from independent sellers around the world.',
  openGraph: {
    title: 'Lalasia',
    description:
      'Discover unique handmade items, vintage finds, and creative goods from independent sellers around the world.',
    siteName: 'Lalasia',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lalasia',
    description:
      'Discover unique handmade items, vintage finds, and creative goods from independent sellers.',
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    'handmade',
    'vintage',
    'unique gifts',
    'artisan crafts',
    'independent sellers',
  ],
  authors: [{ name: 'Lalasia Team' }],
  creator: 'Lalasia',
  publisher: 'Lalasia',
};

const robotoFont = localFont({
  src: [
    {
      path: '../assets/fonts/Roboto-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Roboto-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Roboto-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Roboto-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const theme = (cookieStore.get('theme')?.value ?? 'light') as Theme;

  return (
    <html lang="en" data-theme={theme} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={robotoFont.className}>
        <div id="root">
          <RootStoreProvider>
            {children}
          </RootStoreProvider>
        </div>
      </body>
    </html>
  );
}
