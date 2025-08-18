'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronLeft, Calculator, TrendingUp, DollarSign, BarChart, Target, Shield, HelpCircle, AlertTriangle, Zap } from 'lucide-react'
import { useState } from 'react'

export default function HowItWorksPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      question: "Is CollegeScam.io really free to use?",
      answer: "Yes! Our core calculator and comparison tools are 100% free. We believe everyone deserves to know the truth about education costs before making life-changing financial decisions. Premium features offer advanced analysis for those who want deeper insights."
    },
    {
      question: "How accurate are your ROI calculations?",
      answer: "Our calculations use real data from the Bureau of Labor Statistics, Department of Education, and industry reports. We factor in actual tuition costs, realistic salary projections, loan interest rates, and opportunity costs. Unlike college marketing materials, we show you the harsh reality."
    },
    {
      question: "What makes your Scam Score™ different?",
      answer: "Our Scam Score™ is the only metric that combines total debt burden, opportunity cost, market saturation, AI displacement risk, and actual 10-year earnings potential. It's designed to cut through marketing BS and show you which education paths are genuinely worth it."
    },
    {
      question: "Can I compare multiple education paths?",
      answer: "Absolutely! Our comparison tool lets you pit expensive degrees against practical alternatives. See side-by-side how a $200K MBA stacks up against a $5K certification or trade school. The results might shock you."
    },
    {
      question: "Why do you call it CollegeScam?",
      answer: "Because charging $200,000+ for degrees that lead to $40K jobs IS a scam. The education industrial complex has inflated costs 1,200% since 1980 while wages barely budged. We're here to expose this broken system and help you find smarter alternatives."
    },
    {
      question: "Do you hate all education?",
      answer: "Not at all! We love education that provides real value. Trade schools, bootcamps, certifications, and reasonably-priced degrees can be excellent investments. We hate the predatory pricing and false promises that trap millions in debt."
    },
    {
      question: "How do you calculate opportunity cost?",
      answer: "We calculate what you could earn working instead of attending school, plus the compound interest that money could generate if invested. A 4-year degree doesn't just cost tuition - it costs 4 years of lost earnings and investment growth."
    },
    {
      question: "What data sources do you use?",
      answer: "We aggregate data from the Bureau of Labor Statistics, National Center for Education Statistics, Federal Reserve Economic Data, PayScale, Glassdoor, and industry-specific salary surveys. All sources are updated regularly."
    },
    {
      question: "Can this help if I'm already in debt?",
      answer: "Yes! While we can't undo past decisions, our calculator can help you decide whether additional education is worth it, or if you should focus on your current path. Knowledge is power, even retroactively."
    },
    {
      question: "Why should I trust your analysis over my college advisor?",
      answer: "College advisors work for the college - they're salespeople. We have no financial incentive to push you toward expensive education. Our only goal is to reveal the true costs and help you make informed decisions."
    }
  ]

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Calculate Your Education ROI and Avoid College Debt Traps",
            "description": "Learn how to use CollegeScam.io's calculator to expose the true cost of education and compare degrees, bootcamps, and trade schools to make smarter financial decisions.",
            "image": "https://collegescam.io/og-image.png",
            "totalTime": "PT5M",
            "estimatedCost": {
              "@type": "MonetaryAmount",
              "currency": "USD",
              "value": "0"
            },
            "supply": [],
            "tool": [
              {
                "@type": "HowToTool",
                "name": "CollegeScam.io ROI Calculator"
              }
            ],
            "step": [
              {
                "@type": "HowToStep",
                "name": "Choose Your Education Path",
                "text": "Select from 20+ education paths including degrees, bootcamps, certifications, and trade schools.",
                "url": "https://collegescam.io/how-it-works#step1"
              },
              {
                "@type": "HowToStep",
                "name": "Enter Financial Details",
                "text": "Input tuition costs, scholarships, living expenses, and current income.",
                "url": "https://collegescam.io/how-it-works#step2"
              },
              {
                "@type": "HowToStep",
                "name": "Calculate Scam Score",
                "text": "Our algorithm reveals total debt, lost earnings, and 10-year ROI.",
                "url": "https://collegescam.io/how-it-works#step3"
              },
              {
                "@type": "HowToStep",
                "name": "Compare Options",
                "text": "Compare expensive degrees against practical alternatives.",
                "url": "https://collegescam.io/how-it-works#step4"
              },
              {
                "@type": "HowToStep",
                "name": "Identify Red Flags",
                "text": "See market saturation, AI risk, and geographic limitations.",
                "url": "https://collegescam.io/how-it-works#step5"
              },
              {
                "@type": "HowToStep",
                "name": "Make Informed Decision",
                "text": "Avoid debt traps with data-driven education choices.",
                "url": "https://collegescam.io/how-it-works#step6"
              }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />
      
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
            {/* Hero Section for SEO */}
            <div className="p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                The Student Debt Crisis Calculator That Colleges Don't Want You to See
              </h2>
              <p className="text-gray-700 mb-4">
                With student debt exceeding $1.7 trillion and the average graduate owing $37,000+, 
                making the wrong education choice can destroy your financial future. CollegeScam.io's 
                revolutionary ROI calculator exposes the true cost of education by comparing degrees, 
                bootcamps, certifications, and trade schools using real salary data, actual job availability, 
                and honest debt projections.
              </p>
              <p className="text-gray-700">
                Unlike college brochures filled with fantasy statistics, our calculator reveals which 
                education paths are genuine investments and which are overpriced debt traps. Whether 
                you're considering a $200,000 MBA, a $15,000 coding bootcamp, or a $5,000 trade 
                certification, we'll show you the brutal truth about your 10-year financial outcome.
              </p>
            </div>

            {/* Step 1 */}
            <div className="flex gap-4" id="step1">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">1. Choose Your Education Path</h3>
                <p className="text-gray-600 mb-3">
                  Select from our comprehensive database of 20+ education paths, including overpriced degrees, practical bootcamps, legitimate certifications, and sensible trade schools. Each path includes real data on actual costs, duration, and realistic earning potential.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2 text-gray-700">Popular Comparisons:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Computer Science BS ($120K) vs Coding Bootcamp ($15K)</li>
                    <li>• MBA ($180K) vs PMP Certification ($3K)</li>
                    <li>• Liberal Arts BA ($160K) vs Trade School ($20K)</li>
                    <li>• Nursing BSN ($80K) vs RN Associate Degree ($30K)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4" id="step2">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">2. Enter Your Financial Reality</h3>
                <p className="text-gray-600 mb-3">
                  Input the harsh truth of your financial situation including inflated tuition costs, meager scholarships (if you're lucky), crushing living costs, and any current income. Our calculator reveals the real numbers colleges don't want you to see.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2 text-gray-700">Costs We Calculate:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Total tuition and fees (including annual increases)</li>
                    <li>• Living expenses (rent, food, transportation)</li>
                    <li>• Loan interest accumulation (6-8% average)</li>
                    <li>• Opportunity cost of not working</li>
                    <li>• Hidden fees and required expenses</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4" id="step3">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">3. Calculate Your Scam Score™</h3>
                <p className="text-gray-600 mb-3">
                  Our truth-revealing algorithm exposes the real cost of education:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-600 mb-3">
                  <li>Total debt burden (tuition + living + interest - token scholarships)</li>
                  <li>Lost earnings while sitting in classrooms</li>
                  <li>Actual 10-year earnings (not the fantasy numbers colleges advertise)</li>
                  <li>Real job availability and market saturation</li>
                </ul>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2 text-purple-700">Scam Score Breakdown:</h4>
                  <ul className="text-sm text-purple-600 space-y-1">
                    <li>🟢 0-20: Solid investment with positive ROI</li>
                    <li>🟡 21-50: Questionable value, proceed with caution</li>
                    <li>🟠 51-80: Likely debt trap, consider alternatives</li>
                    <li>🔴 81-100: Total scam, run away immediately</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4" id="step4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <BarChart className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">4. Compare the Scams</h3>
                <p className="text-gray-600 mb-3">
                  Use our comparison tool to see which education path scams you less. Compare overpriced degrees against practical alternatives. See which option actually makes financial sense. Our viral comparisons expose the most shocking education rip-offs.
                </p>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2 text-yellow-700">Shocking Discoveries:</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Electricians out-earn most liberal arts grads by age 30</li>
                    <li>• Coding bootcamp grads match CS degree salaries in 5 years</li>
                    <li>• Trade school ROI beats 70% of bachelor's degrees</li>
                    <li>• Certificate programs offer 10x better ROI than many masters</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex gap-4" id="step5">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">5. See the Red Flags</h3>
                <p className="text-gray-600 mb-3">
                  Every education path gets a brutal honesty score revealing:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-600 mb-3">
                  <li>How saturated your field really is</li>
                  <li>Jobs being eliminated by AI and automation</li>
                  <li>Geographic limitations nobody mentions</li>
                  <li>Worthless credentials and degree inflation</li>
                </ul>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2 text-red-700">
                    <AlertTriangle className="inline w-4 h-4 mr-1" />
                    Biggest Red Flags:
                  </h4>
                  <ul className="text-sm text-red-600 space-y-1">
                    <li>• "Flexible" degrees with no clear career path</li>
                    <li>• Fields requiring unpaid internships to get hired</li>
                    <li>• Careers where a masters is the new bachelors</li>
                    <li>• Jobs concentrated in expensive cities only</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 6 */}
            <div className="flex gap-4" id="step6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">6. Avoid the Trap</h3>
                <p className="text-gray-800 mb-3">
                  Armed with the truth about education costs, scam scores, and real alternatives, you can avoid the debt trap. Share these eye-opening results with friends and family before they fall for the same expensive mistakes.
                </p>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2 text-indigo-700">
                    <Zap className="inline w-4 h-4 mr-1" />
                    Smart Alternatives:
                  </h4>
                  <ul className="text-sm text-indigo-600 space-y-1">
                    <li>• Community college + transfer (save 50%+)</li>
                    <li>• Industry certifications ($1-5K)</li>
                    <li>• Apprenticeships (get paid to learn)</li>
                    <li>• Online courses + portfolio building</li>
                    <li>• Military education benefits</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Key Metrics Section */}
            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Truth Metrics We Expose</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-700">Scam Score™</h4>
                  <p className="text-sm text-gray-600">How badly you're being ripped off (0-100 scale)</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700">Debt Prison Time</h4>
                  <p className="text-sm text-gray-600">Years enslaved to student loans (average: 21 years)</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700">Real 10-Year Outcome</h4>
                  <p className="text-sm text-gray-600">Actual earnings minus crushing debt</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700">Break-Even Point</h4>
                  <p className="text-sm text-gray-600">When you'll actually start profiting (if ever)</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700">Opportunity Cost</h4>
                  <p className="text-sm text-gray-600">Money lost by not working + investing</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700">AI Displacement Risk</h4>
                  <p className="text-sm text-gray-600">Chance your job won't exist in 10 years</p>
                </div>
              </div>
            </div>

            {/* Why This Matters Section */}
            <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Why Traditional College ROI Calculators Are Lying to You
              </h3>
              <p className="text-gray-700 mb-4">
                Most college ROI calculators are marketing tools designed to justify outrageous tuition. 
                They use inflated salary projections, ignore opportunity costs, hide true loan interest, 
                and pretend everyone graduates on time with a job waiting.
              </p>
              <h4 className="font-semibold text-gray-800 mb-2">What They Hide:</h4>
              <ul className="space-y-2 text-gray-600 mb-4">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <span><strong>Dropout rates:</strong> 40% don't finish, but still owe the debt</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <span><strong>Underemployment:</strong> 41% of grads work jobs that don't require degrees</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <span><strong>Salary inflation:</strong> They use top 10% earner data as "average"</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <span><strong>Geographic reality:</strong> That $80K average? It's $45K in most cities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <span><strong>Interest capitalization:</strong> Your $100K loan becomes $180K+ to repay</span>
                </li>
              </ul>
              <h4 className="font-semibold text-gray-800 mb-2">What We Show:</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Real median salaries by location and experience</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Actual time to degree completion (5-6 years average)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>True total cost including interest and fees</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Opportunity cost of lost wages and investments</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Market saturation and job availability reality</span>
                </li>
              </ul>
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
                  20-year debt slavery projections with compound interest
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
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✓</span>
                  $10,000+ scholarship finder for paths worth pursuing
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✓</span>
                  Hidden gem degree programs with actual ROI
                </li>
              </ul>
            </div>

            {/* FAQ Section */}
            <div className="mt-12">
              <h3 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                <HelpCircle className="mr-2 h-6 w-6" />
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border rounded-lg">
                    <button
                      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                      onClick={() => toggleFaq(index)}
                    >
                      <span className="font-semibold text-gray-900">{faq.question}</span>
                      <ChevronLeft 
                        className={`h-5 w-5 text-gray-500 transform transition-transform ${
                          openFaq === index ? '-rotate-90' : ''
                        }`} 
                      />
                    </button>
                    {openFaq === index && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-800">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Statistics Section */}
            <div className="mt-12 p-6 bg-blue-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                The Student Debt Crisis by the Numbers
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold text-blue-600">$1.75T</div>
                  <p className="text-sm text-gray-600">Total U.S. student debt</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">43.4M</div>
                  <p className="text-sm text-gray-600">Americans with student loans</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">$37,574</div>
                  <p className="text-sm text-gray-600">Average debt per borrower</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">21 years</div>
                  <p className="text-sm text-gray-600">Average repayment time</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">1,200%</div>
                  <p className="text-sm text-gray-600">Tuition increase since 1980</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">41%</div>
                  <p className="text-sm text-gray-600">Grads in jobs not requiring degrees</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Sources: Federal Reserve, Department of Education, Bureau of Labor Statistics (2024)
              </p>
            </div>

            {/* CTA */}
            <div className="text-center pt-8">
              <Link href="/">
                <Button size="lg" className="bg-gradient-to-r from-red-600 to-orange-600">
                  Calculate Your Scam Score Now
                </Button>
              </Link>
              <p className="text-sm text-gray-500 mt-4">
                Takes less than 2 minutes • No email required • 100% free
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Bottom SEO Content */}
        <div className="mt-8 prose prose-gray max-w-none">
          <h2 className="text-2xl font-bold mb-4">
            Make Smarter Education Decisions with Data, Not Marketing
          </h2>
          <p className="text-gray-600 mb-4">
            The education system has become a profit machine that preys on young people's dreams. 
            Universities spend millions on marketing to convince you that their overpriced degrees 
            are "investments in your future" while hiding the brutal reality of student debt, 
            underemployment, and careers that don't require the degree you're paying for.
          </p>
          <p className="text-gray-600 mb-4">
            CollegeScam.io strips away the marketing veneer to show you exactly what you're buying. 
            Our calculator doesn't just compare tuition costs – it reveals the complete financial 
            picture including opportunity costs, realistic salaries, job market saturation, geographic 
            limitations, and the years you'll spend paying off loans instead of building wealth.
          </p>
          <h3 className="text-xl font-semibold mb-3">
            Who Should Use This Calculator?
          </h3>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
            <li><strong>High school students:</strong> Before you sign your financial future away</li>
            <li><strong>Parents:</strong> See if you're really helping or hurting your kids</li>
            <li><strong>College students:</strong> Decide if continuing is worth it</li>
            <li><strong>Career changers:</strong> Evaluate if more education makes sense</li>
            <li><strong>Recent grads:</strong> Understand your financial reality</li>
            <li><strong>Anyone considering education:</strong> Make data-driven decisions</li>
          </ul>
          <p className="text-gray-600 mb-4">
            Don't let colleges gaslight you into life-destroying debt. Use our calculator to see 
            the truth, compare your options, and make the smartest financial decision of your life. 
            Your future self will thank you.
          </p>
        </div>
      </div>
    </div>
  )
}
