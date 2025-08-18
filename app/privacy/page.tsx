import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronLeft } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Calculator
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Privacy Policy</CardTitle>
            <CardDescription>Last updated: January 8, 2025</CardDescription>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <h2 className="text-xl font-semibold mt-6 mb-3">1. Information We Collect</h2>
            <p className="mb-4">
              CollegeScam.io collects information you provide directly to us when using our Scam Score™ calculator:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Education path selections and comparisons</li>
              <li>Financial information for scam score calculations (tuition, debt, living costs)</li>
              <li>Usage data and analytics to expose more education scams</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">2. How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Calculate your Scam Score™ and expose education rip-offs</li>
              <li>Save and retrieve your scam exposure history</li>
              <li>Improve our truth-revealing algorithms</li>
              <li>Send you alerts about new education scams (with your consent)</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">3. Data Security</h2>
            <p className="mb-4">
              We implement industry-standard security measures to protect your personal information. Your financial data is encrypted both in transit and at rest. We never sell your personal information to third parties, especially not to colleges trying to scam you.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">4. Data Retention</h2>
            <p className="mb-4">
              We retain your scam score history for up to 2 years to help you track and avoid education traps. You can request deletion of your data at any time by contacting our support team.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">5. Cookies and Tracking</h2>
            <p className="mb-4">
              We use cookies and similar tracking technologies to improve your experience on our platform. You can control cookie preferences through your browser settings.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">6. Third-Party Services</h2>
            <p className="mb-4">
              We may share anonymous, aggregated data to expose education scams and help students avoid debt traps. We use third-party services for:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Analytics (Google Analytics)</li>
              <li>Payment processing (Stripe)</li>
              <li>Email communications (SendGrid)</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">7. Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Export your scam score history</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">8. Children's Privacy</h2>
            <p className="mb-4">
              Our service is intended for users 16 years and older. We do not knowingly collect personal information from children under 16.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">9. Changes to This Policy</h2>
            <p className="mb-4">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">10. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <ul className="list-none mb-4">
              <li>Email: privacy@collegescam.io</li>
              <li>Phone: 1-800-NO-SCAMS</li>
              <li>Address: [Company Address]</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
