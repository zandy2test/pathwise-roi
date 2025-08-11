import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { Footer } from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PathwiseROI - Education Investment Calculator',
  description: 'Calculate when your education investment pays off. Compare college degrees, trade schools, bootcamps, and work paths to find your optimal education ROI.',
  keywords: 'education ROI, college calculator, trade school, bootcamp, education investment, career paths',
  authors: [{ name: 'PathwiseROI' }],
  openGraph: {
    title: 'PathwiseROI - Education Investment Calculator',
    description: 'Discover when your education pays for itself. Compare college vs trade school vs bootcamp paths with our free ROI calculator.',
    url: 'https://pathwiseroi.com',
    siteName: 'PathwiseROI',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://pathwiseroi.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PathwiseROI - Education Investment Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PathwiseROI - Education Investment Calculator',
    description: 'Discover when your education pays for itself. Free ROI calculator.',
    images: ['https://pathwiseroi.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
        <div className="min-h-screen bg-background flex flex-col">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
