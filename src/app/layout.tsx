import type { Metadata } from 'next';
import { Inconsolata } from 'next/font/google';
import '@/css/globals.css';
import { Providers } from './providers';

const inconsolata = Inconsolata({
  variable: '--font-inconsolata',
  subsets: ['latin'],
  weight: ['700', '500', '400'],
});

export const metadata: Metadata = {
  title: 'SolChad - a set of utilities for Solana projects',
  description: 'A fully opensource set of solana utilities without any hidden fees',
  openGraph: {
    title: 'SolChad - a set of utilities for Solana projects',
    description: 'A fully opensource set of Solana utilities without any hidden fees',
    url: 'https://solchad.dev',
    siteName: 'SolChad',
    images: [
      {
        url: 'https://solchad.dev/assets/og.png',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inconsolata.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
