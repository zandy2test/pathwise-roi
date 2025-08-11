import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PathwiseROI - Education Investment Calculator',
  description: 'Calculate when your education investment pays off. Compare college degrees, trade schools, bootcamps, and work paths to find your optimal education ROI.',
  keywords: 'education ROI, college calculator, trade school, bootcamp, education investment, career paths',
  authors: [{ name: 'PathwiseROI' }],
  openGraph: {
    title: 'PathwiseROI - Education Investment Calculator',
    description: 'Calculate when your education investment pays off',
    url: 'https://pathwiseroi.com',
    siteName: 'PathwiseROI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PathwiseROI - Education Investment Calculator',
    description: 'Calculate when your education investment pays off',
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
        <div className="min-h-screen bg-background">
          {children}
        </div>
      </body>
    </html>
  )
}
