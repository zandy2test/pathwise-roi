'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronLeft, Calculator, TrendingUp, DollarSign, BarChart, Target, Shield, HelpCircle, AlertTriangle, Zap, ArrowRight, Brain, Search } from 'lucide-react'
import { useState } from 'react'
import { AnimatedGradientText } from '@/components/magic/animated-gradient-text'
import { NumberTicker } from '@/components/magic/number-ticker'
import { ShimmerButton } from '@/components/magic/shimmer-button'
import { EmailCaptureModal } from '@/components/email-capture-modal'

export default function HowItWorksPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [showPremiumModal, setShowPremiumModal] = useState(false)

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

  const steps = [
    {
      id: 1,
      icon: Calculator,
      title: "Choose Your Education Path",
      description: "Select from our comprehensive database of 20+ education paths, including overpriced degrees, practical bootcamps, legitimate certifications, and sensible trade schools.",
      details: [
        "Computer Science BS ($120K) vs Coding Bootcamp ($15K)",
        "MBA ($180K) vs PMP Certification ($3K)",
        "Liberal Arts BA ($160K) vs Trade School ($20K)",
        "Nursing BSN ($80K) vs RN Associate Degree ($30K)"
      ],
      color: "red"
    },
    {
      id: 2,
      icon: DollarSign,
      title: "Enter Your Financial Reality",
      description: "Input the harsh truth of your financial situation including inflated tuition costs, meager scholarships, crushing living costs, and any current income.",
      details: [
        "Total tuition and fees (including annual increases)",
        "Living expenses (rent, food, transportation)",
        "Loan interest accumulation (6-8% average)",
        "Opportunity cost of not working",
        "Hidden fees and required expenses"
      ],
      color: "green"
    },
    {
      id: 3,
      icon: TrendingUp,
      title: "Calculate Your Scam Score™",
      description: "Our truth-revealing algorithm exposes the real cost of education with brutal honesty.",
      details: [
        "🟢 0-20: Solid investment with positive ROI",
        "🟡 21-50: Questionable value, proceed with caution",
        "🟠 51-80: Likely debt trap, consider alternatives",
        "🔴 81-100: Total scam, run away immediately"
      ],
      color: "purple"
    },
    {
      id: 4,
      icon: BarChart,
      title: "Compare the Scams",
      description: "Use our comparison tool to see which education path scams you less. Compare overpriced degrees against practical alternatives.",
      details: [
        "Electricians out-earn most liberal arts grads by age 30",
        "Coding bootcamp grads match CS degree salaries in 5 years",
        "Trade school ROI beats 70% of bachelor's degrees",
        "Certificate programs offer 10x better ROI than many masters"
      ],
      color: "yellow"
    },
    {
      id: 5,
      icon: Shield,
      title: "See the Red Flags",
      description: "Every education path gets a brutal honesty score revealing market saturation, AI displacement risk, and geographic limitations.",
      details: [
        "\"Flexible\" degrees with no clear career path",
        "Fields requiring unpaid internships to get hired",
        "Careers where a masters is the new bachelors",
        "Jobs concentrated in expensive cities only"
      ],
      color: "red"
    },
    {
      id: 6,
      icon: Target,
      title: "Avoid the Trap",
      description: "Armed with the truth about education costs, scam scores, and real alternatives, you can avoid the debt trap.",
      details: [
        "Community college + transfer (save 50%+)",
        "Industry certifications ($1-5K)",
        "Apprenticeships (get paid to learn)",
        "Online courses + portfolio building",
        "Military education benefits"
      ],
      color: "indigo"
    }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      red: {
        bg: "bg-red-100",
        text: "text-red-600",
        border: "border-red-200",
        gradient: "from-red-50 to-red-100"
      },
      green: {
        bg: "bg-green-100",
        text: "text-green-600",
        border: "border-green-200",
        gradient: "from-green-50 to-green-100"
      },
      purple: {
        bg: "bg-purple-100",
        text: "text-purple-600",
        border: "border-purple-200",
        gradient: "from-purple-50 to-purple-100"
      },
      yellow: {
        bg: "bg-yellow-100",
        text: "text-yellow-600",
        border: "border-yellow-200",
        gradient: "from-yellow-50 to-yellow-100"
      },
      indigo: {
        bg: "bg-indigo-100",
        text: "text-indigo-600",
        border: "border-indigo-200",
        gradient: "from-indigo-50 to-indigo-100"
      }
    }
    return colors[color as keyof typeof colors] || colors.red
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Fixed Navigation Bar - Same as Home Page */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                <span className="text-xl font-bold text-gray-900">CollegeScam</span>
                <span className="text-sm text-red-600 font-medium">.io</span>
              </button>
            </Link>
            <ShimmerButton
              onClick={() => setShowPremiumModal(true)}
              className="px-4 py-2"
              shimmerColor="rgba(59, 130, 246, 0.3)"
              background="linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)"
            >
              Premium
            </ShimmerButton>
          </div>
        </div>
      </nav>

      <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen pt-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HowTo",
              "name": "How to Calculate Your Education ROI and Avoid College Debt Traps",
              "description": "Learn how to use CollegeScam.io's AI-optimized calculator to expose the true cost of education and compare degrees, bootcamps, and trade schools to make smarter financial decisions.",
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
        
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Navigation */}
          <Link href="/">
            <Button variant="ghost" className="mb-8 hover:bg-gray-100 transition-colors">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Calculator
            </Button>
          </Link>

          {/* Hero Section - Fixed Text Visibility */}
          <div className="text-center mb-16">
            <div className="mb-6">
              <AnimatedGradientText className="mb-4">
                🤖 AI-Optimized Truth Engine
              </AnimatedGradientText>
              <div className="mb-6">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6 text-gray-900">
                  How CollegeScam.io Works
                </h1>
              </div>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              The student debt crisis calculator that colleges don't want you to see. 
              Now optimized for AI search engines to expose education scams to millions.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <AnimatedGradientText>
                <Brain className="w-4 h-4 mr-2 inline" />
                Cited by AI Models
              </AnimatedGradientText>
              <AnimatedGradientText>
                <Search className="w-4 h-4 mr-2 inline" />
                First-Mover AI Advantage
              </AnimatedGradientText>
              <AnimatedGradientText>
                <Zap className="w-4 h-4 mr-2 inline" />
                Gen Z Truth Engine
              </AnimatedGradientText>
            </div>
          </div>

          {/* Crisis Statistics Hero */}
          <Card className="mb-16 overflow-hidden bg-gradient-to-r from-red-500 to-orange-500 text-white">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-center">
                The Student Debt Crisis by the Numbers
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">
                    $<NumberTicker value={1.75} />T
                  </div>
                  <p className="text-red-100">Total U.S. student debt</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">
                    <NumberTicker value={43.4} />M
                  </div>
                  <p className="text-red-100">Americans with student loans</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">
                    $<NumberTicker value={37574} />
                  </div>
                  <p className="text-red-100">Average debt per borrower</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">
                    <NumberTicker value={21} /> years
                  </div>
                  <p className="text-red-100">Average repayment time</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">
                    <NumberTicker value={1200} />%
                  </div>
                  <p className="text-red-100">Tuition increase since 1980</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">
                    <NumberTicker value={41} />%
                  </div>
                  <p className="text-red-100">Grads in jobs not requiring degrees</p>
                </div>
              </div>
              <p className="text-center text-red-100 text-sm mt-6">
                Sources: Federal Reserve, Department of Education, Bureau of Labor Statistics (2024)
              </p>
            </CardContent>
          </Card>

          {/* How It Works Steps - Fixed Light Backgrounds */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
              Expose Education Scams in 6 Steps
            </h2>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Our AI-optimized truth engine cuts through college marketing BS to reveal the brutal reality of education costs
            </p>

            <div className="space-y-8">
              {steps.map((step, index) => {
                const colors = getColorClasses(step.color)
                const Icon = step.icon
                const isActive = activeStep === step.id
                
                return (
                  <Card 
                    key={step.id}
                    className={`group transition-all duration-300 hover:shadow-xl cursor-pointer border-2 bg-white ${
                      isActive ? `${colors.border} shadow-lg` : 'border-gray-200'
                    }`}
                    onClick={() => setActiveStep(isActive ? null : step.id)}
                  >
                    <CardContent className="p-8">
                      <div className="flex gap-6 items-start">
                        {/* Step Number & Icon */}
                        <div className="flex-shrink-0">
                          <div className={`w-16 h-16 ${colors.bg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className={`w-8 h-8 ${colors.text}`} />
                          </div>
                          <div className="text-center mt-2">
                            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r ${colors.gradient} text-gray-700 font-bold text-sm`}>
                              {step.id}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-gray-800 transition-colors">
                            {step.title}
                          </h3>
                          <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                            {step.description}
                          </p>
                          
                          {/* Expandable Details */}
                          <div className={`transition-all duration-300 overflow-hidden ${
                            isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                          }`}>
                            <div className={`p-4 rounded-lg bg-gradient-to-r ${colors.gradient} mt-4`}>
                              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                                <ArrowRight className="w-4 h-4 mr-2" />
                                {step.id === 1 ? "Popular Comparisons:" :
                                 step.id === 2 ? "Costs We Calculate:" :
                                 step.id === 3 ? "Scam Score Breakdown:" :
                                 step.id === 4 ? "Shocking Discoveries:" :
                                 step.id === 5 ? "Biggest Red Flags:" :
                                 "Smart Alternatives:"}
                              </h4>
                              <ul className="space-y-2">
                                {step.details.map((detail, idx) => (
                                  <li key={idx} className="text-gray-700 flex items-start">
                                    <span className="text-gray-500 mr-2">•</span>
                                    <span>{detail}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Click to expand hint */}
                          {!isActive && (
                            <div className="text-sm text-gray-500 mt-2 flex items-center opacity-70 group-hover:opacity-100 transition-opacity">
                              <ArrowRight className="w-4 h-4 mr-1" />
                              Click to see detailed breakdown
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* AI Optimization Section */}
          <Card className="mb-16 overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="mb-6">
                  <Brain className="w-16 h-16 mx-auto mb-4 opacity-90" />
                  <h2 className="text-3xl font-bold mb-4">
                    🚀 AI Search Engine Optimized
                  </h2>
                  <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                    CollegeScam.io is the first education calculator optimized for AI search engines. 
                    When millions ask AI "Is college worth it?", they'll get our brutal truth.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-2">
                      <NumberTicker value={115} />% 
                    </div>
                    <p className="text-blue-100">Expected AI search traffic increase</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-2">
                      <NumberTicker value={5} />+ AI Models
                    </div>
                    <p className="text-blue-100">Citation-ready data sources</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-2">
                      First-Mover
                    </div>
                    <p className="text-blue-100">Advantage in education ROI space</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Truth Metrics Grid - Fixed Light Backgrounds */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center mb-8 text-gray-900">Truth Metrics We Expose</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Scam Score™", desc: "How badly you're being ripped off (0-100 scale)", icon: "🎯" },
                { title: "Debt Prison Time", desc: "Years enslaved to student loans (average: 21 years)", icon: "⛓️" },
                { title: "Real 10-Year Outcome", desc: "Actual earnings minus crushing debt", icon: "💰" },
                { title: "Break-Even Point", desc: "When you'll actually start profiting (if ever)", icon: "📈" },
                { title: "Opportunity Cost", desc: "Money lost by not working + investing", icon: "💸" },
                { title: "AI Displacement Risk", desc: "Chance your job won't exist in 10 years", icon: "🤖" }
              ].map((metric, idx) => (
                <Card key={idx} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white border-gray-200">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl mb-3">{metric.icon}</div>
                    <h4 className="font-bold text-lg mb-2 text-gray-900">{metric.title}</h4>
                    <p className="text-gray-600">{metric.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Why Traditional Calculators Lie - Fixed Light Background */}
          <Card className="mb-16 border-2 border-red-200 bg-white">
            <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50">
              <CardTitle className="text-2xl flex items-center text-gray-900">
                <AlertTriangle className="mr-3 h-6 w-6 text-red-600" />
                Why Traditional College ROI Calculators Are Lying to You
              </CardTitle>
              <CardDescription className="text-lg text-gray-700">
                Most college ROI calculators are marketing tools designed to justify outrageous tuition
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* What They Hide */}
                <div>
                  <h4 className="text-xl font-bold text-red-600 mb-4">What They Hide:</h4>
                  <ul className="space-y-3">
                    {[
                      { stat: "40%", text: "don't finish, but still owe the debt" },
                      { stat: "41%", text: "of grads work jobs that don't require degrees" },
                      { stat: "Top 10%", text: "earner data used as \"average\" salary" },
                      { stat: "$45K", text: "real salary in most cities (not $80K)" },
                      { stat: "$180K+", text: "total repayment for $100K loan" }
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-red-600 mr-3 font-bold">✗</span>
                        <span className="text-gray-700">
                          <strong className="text-red-600">{item.stat}:</strong> {item.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What We Show */}
                <div>
                  <h4 className="text-xl font-bold text-green-600 mb-4">What We Show:</h4>
                  <ul className="space-y-3">
                    {[
                      "Real median salaries by location and experience",
                      "Actual time to degree completion (5-6 years average)",
                      "True total cost including interest and fees",
                      "Opportunity cost of lost wages and investments",
                      "Market saturation and job availability reality"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-green-600 mr-3 font-bold">✓</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Premium Features - Fixed Light Background */}
          <Card className="mb-16 bg-white border-2 border-purple-200">
            <CardHeader className="bg-gradient-to-br from-purple-50 to-pink-50">
              <CardTitle className="text-2xl flex items-center text-gray-900">
                <Zap className="mr-3 h-6 w-6 text-purple-600" />
                🚀 Premium Truth Reveals
              </CardTitle>
              <CardDescription className="text-lg text-gray-700">
                Expose even more education scams with advanced analytics and AI insights
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  "20-year debt slavery projections with compound interest",
                  "Real salary data by location (spoiler: it's lower)",
                  "Debt escape strategies that actually work",
                  "Realistic career progression (not fantasy)",
                  "Save and share unlimited scam exposures",
                  "$10,000+ scholarship finder for paths worth pursuing",
                  "Hidden gem degree programs with actual ROI",
                  "AI-powered market trend analysis"
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start">
                    <span className="text-purple-600 mr-3 font-bold">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section - Fixed Light Background */}
          <Card className="mb-16 bg-white border-gray-200">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl flex items-center justify-center text-gray-900">
                <HelpCircle className="mr-3 h-8 w-8 text-blue-600" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription className="text-lg text-gray-700">
                Get the brutal truth about education, debt, and your financial future
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div 
                    key={index} 
                    className={`border-2 rounded-xl transition-all duration-300 bg-white ${
                      openFaq === index 
                        ? 'border-blue-300 shadow-lg bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    <button
                      className="w-full px-6 py-4 text-left flex justify-between items-center transition-colors"
                      onClick={() => toggleFaq(index)}
                    >
                      <span className="font-bold text-gray-900 text-lg">{faq.question}</span>
                      <ChevronLeft 
                        className={`h-5 w-5 text-gray-500 transform transition-transform duration-300 ${
                          openFaq === index ? '-rotate-90' : ''
                        }`} 
                      />
                    </button>
                    <div className={`transition-all duration-300 overflow-hidden ${
                      openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="px-6 pb-4">
                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Bottom SEO Content - Fixed Light Background */}
          <Card className="mb-16 bg-white border-gray-200">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50">
              <CardTitle className="text-2xl text-gray-900">
                Make Smarter Education Decisions with Data, Not Marketing
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-800 mb-4 text-lg">
                  The education system has become a profit machine that preys on young people's dreams. 
                  Universities spend millions on marketing to convince you that their overpriced degrees 
                  are "investments in your future" while hiding the brutal reality of student debt, 
                  underemployment, and careers that don't require the degree you're paying for.
                </p>
                <p className="text-gray-800 mb-4">
                  CollegeScam.io strips away the marketing veneer to show you exactly what you're buying. 
                  Our calculator doesn't just compare tuition costs – it reveals the complete financial 
                  picture including opportunity costs, realistic salaries, job market saturation, geographic 
                  limitations, and the years you'll spend paying off loans instead of building wealth.
                </p>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Who Should Use This Calculator?
                </h3>
                <ul className="list-disc pl-6 text-gray-800 space-y-2 mb-4">
                  <li><strong>High school students:</strong> Before you sign your financial future away</li>
                  <li><strong>Parents:</strong> See if you're really helping or hurting your kids</li>
                  <li><strong>College students:</strong> Decide if continuing is worth it</li>
                  <li><strong>Career changers:</strong> Evaluate if more education makes sense</li>
                  <li><strong>Recent grads:</strong> Understand your financial reality</li>
                  <li><strong>Anyone considering education:</strong> Make data-driven decisions</li>
                </ul>
                <p className="text-gray-800 mb-4">
                  Don't let colleges gaslight you into life-destroying debt. Use our calculator to see 
                  the truth, compare your options, and make the smartest financial decision of your life. 
                  Your future self will thank you.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Final CTA */}
          <div className="text-center py-16">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                Ready to Expose Your Education's Scam Score?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Join thousands who've avoided debt traps with our AI-optimized truth calculator
              </p>
            </div>
            <Link href="/">
              <Button size="lg" className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                Calculate Your Scam Score Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <p className="text-sm text-gray-600 mt-4">
              Takes less than 2 minutes • No email required • 100% free • AI-verified data
            </p>
          </div>
        </div>

        {/* Email Capture Modal */}
        <EmailCaptureModal 
          showModal={showPremiumModal} 
          setShowModal={setShowPremiumModal} 
        />
      </div>
    </div>
  )
}
