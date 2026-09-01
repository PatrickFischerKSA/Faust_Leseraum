import type { Metadata } from 'next';
import './globals.css';

const [githubOwner, githubRepository] = (process.env.GITHUB_REPOSITORY || '').split('/');
const publicOrigin = process.env.GITHUB_ACTIONS === 'true' && githubOwner && githubRepository
  ? `https://${githubOwner}.github.io/${githubRepository}`
  : 'https://faust-leseraum.patrickoliverfischer.chatgpt.site';

export const metadata: Metadata = {
  metadataBase: new URL(publicOrigin),
  title: 'Am Anfang war der Text · Goethe × Gründgens',
  description: 'Interaktive Lektüre zu Goethes Faust I mit Fragen und Filmsequenzen der Gründgens-Verfilmung von 1960.',
  openGraph: {
    title: 'Am Anfang war der Text',
    description: 'Goethe × Gründgens · interaktive Lektüre',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Am Anfang war der Text – interaktive Faust-Lektüre' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Am Anfang war der Text',
    description: 'Goethe × Gründgens · interaktive Lektüre',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="de"><body>{children}</body></html>;
}
