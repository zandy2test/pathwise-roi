import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronLeft } from 'lucide-react'

export default function TermsPage() {
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
            <CardTitle className="text-3xl">Terms of Service</CardTitle>
            <CardDescription>Last updated: January 8, 2025</CardDescription>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <h2 className="text-xl font-semibold mt-6 mb-3">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using CollegeScam.io ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">2. Description of Service</h2>
            <p className="mb-4">
              CollegeScam.io provides a Scam Score™ calculator that exposes the truth about education costs and helps users avoid debt traps. The Service includes:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Scam Score™ calculations for various education paths</li>
              <li>Comparison tools to expose education rip-offs</li>
              <li>Truth-revealing resources and insights</li>
              <li>Premium features for deeper scam analysis</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">3. User Responsibilities</h2>
            <p className="mb-4">You agree to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide accurate information for calculations</li>
              <li>Use the Service for lawful purposes only</li>
              <li>Not attempt to disrupt or compromise the Service</li>
              <li>Keep your account credentials secure</li>
              <li>Not scrape or extract data from the Service without permission</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">4. Disclaimer of Educational Advice</h2>
            <p className="mb-4 font-semibold">
              IMPORTANT: CollegeScam.io provides calculations and information for educational awareness purposes only. We do not provide:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Financial advice or recommendations</li>
              <li>Guaranteed outcomes or returns</li>
              <li>Career counseling services</li>
              <li>Admission guarantees to any institution</li>
            </ul>
            <p className="mb-4">
              Users should consult with qualified financial advisors and education counselors before making significant education investment decisions.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">5. Intellectual Property</h2>
            <p className="mb-4">
              All content, features, and functionality of the Service, including our proprietary Scam Score™ algorithm, are owned by CollegeScam.io and are protected by international copyright, trademark, and other intellectual property laws. You may not:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Copy or modify any part of the Service</li>
              <li>Use the Service for commercial purposes without permission</li>
              <li>Reverse engineer our algorithms or software</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">6. Premium Services</h2>
            <p className="mb-4">
              Premium features are available through paid subscriptions. By purchasing a premium subscription:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>You agree to pay all fees associated with your subscription</li>
              <li>Subscriptions automatically renew unless cancelled</li>
              <li>Refunds are available within 30 days of purchase</li>
              <li>We reserve the right to change pricing with 30 days notice</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">7. Limitation of Liability</h2>
            <p className="mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, COLLEGESCAM.IO SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES RESULTING FROM YOUR USE OF THE SERVICE.
            </p>
            <p className="mb-4">
              Our total liability for any claim arising from these Terms or your use of the Service shall not exceed the amount you paid to us in the 12 months preceding the claim.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">8. Indemnification</h2>
            <p className="mb-4">
              You agree to indemnify and hold harmless CollegeScam.io, its officers, directors, employees, and agents from any claims, damages, or expenses arising from your use of the Service or violation of these Terms.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">9. Termination</h2>
            <p className="mb-4">
              We reserve the right to terminate or suspend your access to the Service at any time, without notice, for conduct that we believe:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Violates these Terms</li>
              <li>Is harmful to other users</li>
              <li>Could create liability for us</li>
              <li>Is fraudulent or illegal</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">10. Governing Law</h2>
            <p className="mb-4">
              These Terms shall be governed by and construed in accordance with the laws of [Your State], without regard to its conflict of law provisions. Any disputes shall be resolved in the courts of [Your County], [Your State].
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">11. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these Terms at any time. We will notify users of any material changes via email or through the Service. Your continued use of the Service after such modifications constitutes acceptance of the updated Terms.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">12. Contact Information</h2>
            <p className="mb-4">
              For questions about these Terms of Service, please contact us at:
            </p>
            <ul className="list-none mb-4">
              <li>Email: legal@collegescam.io</li>
              <li>Phone: 1-800-NO-SCAMS</li>
              <li>Address: [Company Address]</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
