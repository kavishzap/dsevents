import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DS EVENTS & SHOWS',
  description: 'DS Events - Premier entertainment company offering DJ services, live band performances, karaoke shows, and concert management. Experience unforgettable celebrations with top-tier entertainment services.',
  keywords: 'DS Events, entertainment company, DJ services, live band, karaoke, concerts, event management, Mauritius, music events, party entertainment',
  authors: [{ name: 'DS Events' }],
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: 'DS EVENTS & SHOWS',
    description: 'Premier entertainment company offering DJ services, live band performances, karaoke shows, and concert management.',
    type: 'website',
    locale: 'en_US',
    images: ['/DS Events Logo without BG.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DS EVENTS & SHOWS',
    description: 'Premier entertainment company offering DJ services, live band performances, karaoke shows, and concert management.',
    images: ['/DS Events Logo without BG.png'],
  },
  icons: {
    icon: '/DS Events Logo without BG.png',
    apple: '/DS Events Logo without BG.png',
    shortcut: '/DS Events Logo without BG.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="m-0 p-0">{children}</body>
    </html>
  )
}



