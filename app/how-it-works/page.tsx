import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronLeft, Calculator, TrendingUp, DollarSign, BarChart, Target, Shield } from 'lucide-react'

export default function HowItWorksPage() {
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
            <CardTitle className="text-3xl">How PathwiseROI Works</CardTitle>
            <CardDescription>Understanding your education investment in 6 simple steps</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">1. Choose Your Education Path</h3>
                <p className="text-gray-600">
                  Select from our comprehensive database of 20+ education paths, including traditional degrees, bootcamps, certifications, and trade schools. Each path includes industry-validated data on costs, duration, and earning potential.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">2. Enter Your Financial Details</h3>
                <p className="text-gray-600">
                  Input your specific financial situation including tuition costs, available scholarships (up to $100,000), expected living costs, and any current income. Our calculator uses your exact numbers to provide personalized results.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">3. Advanced ROI Calculation</h3>
                <p className="text-gray-600">
                  Our proprietary algorithm calculates your return on investment using multiple factors:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-600">
                  <li>Total investment cost (tuition + living expenses - scholarships)</li>
                  <li>Opportunity cost of lost income during education</li>
                  <li>Projected 10-year earnings based on real market data</li>
                  <li>Industry growth rates and job market stability</li>
                </ul>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <BarChart className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">4. Compare Multiple Paths</h3>
                <p className="text-gray-600">
                  Use our comparison tool to evaluate up to two education paths side-by-side. See which option provides better ROI, faster break-even time, and higher long-term earnings. Our viral comparisons feature lets you explore popular path combinations with one click.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">5. Understand Your Risk</h3>
                <p className="text-gray-600">
                  Every education path comes with a Risk Warning score that factors in:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-600">
                  <li>Job market volatility in your chosen field</li>
                  <li>Industry automation trends</li>
                  <li>Geographic employment variations</li>
                  <li>Credential recognition and transferability</li>
                </ul>
              </div>
            </div>

            {/* Step 6 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">6. Make an Informed Decision</h3>
                <p className="text-gray-600">
                  Armed with comprehensive ROI data, risk assessments, and comparison insights, you can make a confident decision about your education investment. Share your results with advisors, family, or mentors using our built-in sharing feature.
                </p>
              </div>
            </div>

            {/* Key Metrics Section */}
            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Key Metrics We Calculate</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-700">ROI Percentage</h4>
                  <p className="text-sm text-gray-600">Your return relative to total investment</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700">Break-Even Time</h4>
                  <p className="text-sm text-gray-600">Years to recover your education investment</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700">10-Year Net Earnings</h4>
                  <p className="text-sm text-gray-600">Total earnings minus total costs</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700">Risk Warning Score</h4>
                  <p className="text-sm text-gray-600">Market stability and future outlook</p>
                </div>
              </div>
            </div>

            {/* Premium Features */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">🚀 Premium Features</h3>
              <p className="text-gray-600 mb-4">
                Unlock advanced analysis with PathwiseROI Premium:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Extended 20-year financial projections
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Location-specific salary adjustments
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Debt repayment optimization strategies
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Career progression modeling
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Unlimited saved calculations and comparisons
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="text-center pt-8">
              <Link href="/">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600">
                  Start Calculating Your ROI
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
