import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { Footer } from '@/components/footer'
import ErrorBoundary from '@/components/error-boundary'
import { EnhancedErrorBoundary } from '@/components/error-tracking'
import { VercelToolbarIntegration } from '@/components/vercel-toolbar-integration'
import { FloatingFeedbackButton } from '@/components/feedback-widget'
import { Analytics } from '@vercel/analytics/next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CollegeScam.io - Expose the Truth Behind Education Costs',
  description: 'Uncover the real cost of college with our Scam Score™ calculator. Compare college degrees, trade schools, bootcamps, and work paths to avoid the education debt trap.',
  keywords: 'college scam, education debt, student loans, ROI calculator, college truth, trade school, bootcamp, education investment, career paths, scam score, is college worth it, college alternatives, trade school vs college',
  authors: [{ name: 'CollegeScam.io' }],
  openGraph: {
    title: 'CollegeScam.io - Expose the Truth Behind Education Costs',
    description: 'Is college worth it? Find out with our Scam Score™ calculator. Compare college vs trade school vs bootcamp paths and avoid the debt trap. 73% of college grads earn less than trades workers.',
    url: 'https://collegescam.io',
    siteName: 'CollegeScam.io',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://collegescam.io/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CollegeScam.io - Expose the Truth Behind Education Costs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CollegeScam.io - Expose the Truth Behind Education Costs',
    description: 'Is college worth it? Find out with our Scam Score™ calculator. Avoid the debt trap. 73% of college grads earn less than trades workers.',
    images: ['https://collegescam.io/og-image.png'],
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
  alternates: {
    canonical: 'https://collegescam.io',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-NSSK9CWEXN`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-NSSK9CWEXN');
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <EnhancedErrorBoundary>
          <ErrorBoundary>
            <VercelToolbarIntegration />
            <div className="min-h-screen bg-background flex flex-col">
              {children}
            </div>
            <FloatingFeedbackButton />
          </ErrorBoundary>
        </EnhancedErrorBoundary>
        <Analytics />
      </body>
    </html>
  )
}
