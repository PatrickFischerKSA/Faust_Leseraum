import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Faust Leseraum · Goethe × Gründgens',
  description: 'Interaktive Lektüre zu Goethes Faust I mit Fragen und Filmsequenzen der Gründgens-Verfilmung von 1960.',
  openGraph: {
    title: 'Faust Leseraum',
    description: 'Goethe × Gründgens · interaktive Lektüre',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Faust Leseraum – Goethe × Gründgens' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Faust Leseraum',
    description: 'Goethe × Gründgens · interaktive Lektüre',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="de"><body>{children}</body></html>;
}
