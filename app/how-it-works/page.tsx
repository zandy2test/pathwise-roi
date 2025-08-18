'use client'

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
            <CardTitle className="text-3xl">How CollegeScam.io Works</CardTitle>
            <CardDescription>Expose the truth about education costs in 6 simple steps</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">1. Choose Your Education Path</h3>
                <p className="text-gray-600">
                  Select from our comprehensive database of 20+ education paths, including overpriced degrees, practical bootcamps, legitimate certifications, and sensible trade schools. Each path includes real data on actual costs, duration, and realistic earning potential.
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
                <h3 className="text-lg font-semibold mb-2">2. Enter Your Financial Reality</h3>
                <p className="text-gray-600">
                  Input the harsh truth of your financial situation including inflated tuition costs, meager scholarships (if you're lucky), crushing living costs, and any current income. Our calculator reveals the real numbers colleges don't want you to see.
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
                <h3 className="text-lg font-semibold mb-2">3. Calculate Your Scam Score™</h3>
                <p className="text-gray-600">
                  Our truth-revealing algorithm exposes the real cost of education:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-600">
                  <li>Total debt burden (tuition + living + interest - token scholarships)</li>
                  <li>Lost earnings while sitting in classrooms</li>
                  <li>Actual 10-year earnings (not the fantasy numbers colleges advertise)</li>
                  <li>Real job availability and market saturation</li>
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
                <h3 className="text-lg font-semibold mb-2">4. Compare the Scams</h3>
                <p className="text-gray-600">
                  Use our comparison tool to see which education path scams you less. Compare overpriced degrees against practical alternatives. See which option actually makes financial sense. Our viral comparisons expose the most shocking education rip-offs.
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
                <h3 className="text-lg font-semibold mb-2">5. See the Red Flags</h3>
                <p className="text-gray-600">
                  Every education path gets a brutal honesty score revealing:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-600">
                  <li>How saturated your field really is</li>
                  <li>Jobs being eliminated by AI and automation</li>
                  <li>Geographic limitations nobody mentions</li>
                  <li>Worthless credentials and degree inflation</li>
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
                <h3 className="text-lg font-semibold mb-2">6. Avoid the Trap</h3>
                <p className="text-gray-600">
                  Armed with the truth about education costs, scam scores, and real alternatives, you can avoid the debt trap. Share these eye-opening results with friends and family before they fall for the same expensive mistakes.
                </p>
              </div>
            </div>

            {/* Key Metrics Section */}
            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Truth Metrics We Expose</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-700">Scam Score™</h4>
                  <p className="text-sm text-gray-600">How badly you're being ripped off</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700">Debt Prison Time</h4>
                  <p className="text-sm text-gray-600">Years enslaved to student loans</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700">Real 10-Year Outcome</h4>
                  <p className="text-sm text-gray-600">Actual earnings minus crushing debt</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700">Red Flag Alert</h4>
                  <p className="text-sm text-gray-600">Warning signs colleges hide from you</p>
                </div>
              </div>
            </div>

            {/* Premium Features */}
            <div className="mt-8 p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">🚀 Premium Truth Reveals</h3>
              <p className="text-gray-600 mb-4">
                Expose even more education scams with CollegeScam.io Premium:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✓</span>
                  20-year debt slavery projections
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✓</span>
                  Real salary data by location (spoiler: it's lower)
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✓</span>
                  Debt escape strategies that actually work
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✓</span>
                  Realistic career progression (not fantasy)
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✓</span>
                  Save and share unlimited scam exposures
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="text-center pt-8">
              <Link href="/">
                <Button size="lg" className="bg-gradient-to-r from-red-600 to-orange-600">
                  Calculate Your Scam Score Now
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
