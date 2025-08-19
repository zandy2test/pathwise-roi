import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock, ArrowLeft, TrendingDown, AlertTriangle, DollarSign, Target } from 'lucide-react';

export const metadata: Metadata = {
  title: 'College Debt Crisis 2025: The Reality Check Students Need - CollegeScam.io',
  description: '47% of students now prioritize cost over prestige. See why 2025 is the year students are finally waking up to the college debt trap and what smart alternatives exist.',
  keywords: 'college debt crisis 2025, student debt statistics, college alternatives 2025, trade school growth, education cost reality, college enrollment decline',
  openGraph: {
    title: 'College Debt Crisis 2025: Students Are Finally Waking Up',
    description: 'New data shows students are prioritizing cost over college prestige. Here\'s what the 2025 education landscape really looks like.',
    url: 'https://collegescam.io/blog/college-debt-crisis-2025-reality-check',
  }
};

export default function CollegeDebtCrisis2025Page() {
  const trendingStats = [
    {
      number: "$1.814T",
      label: "Total U.S. Student Debt",
      trend: "up",
      context: "Highest in history"
    },
    {
      number: "47%",
      label: "Students Prioritizing Cost",
      trend: "up",
      context: "Up from 40% in 2021"
    },
    {
      number: "6%",
      label: "Considering Trade School",
      trend: "up",
      context: "Tripled since 2021"
    },
    {
      number: "35-40%",
      label: "High School → 4-Year College",
      trend: "down",
      context: "Down from 50% previously"
    }
  ];

  const alternativePathways = [
    {
      path: "Trade Schools",
      duration: "Under 2 years",
      cost: "$33,000 average",
      employment: "90%+ placement rates",
      growth: "300% increase in interest"
    },
    {
      path: "Coding Bootcamps",
      duration: "3-9 months",
      cost: "$10,000-$20,000",
      employment: "80%+ in tech roles",
      growth: "High demand careers"
    },
    {
      path: "Professional Certifications",
      duration: "6 months - 1 year",
      cost: "$1,000-$5,000",
      employment: "Industry-specific",
      growth: "Employer recognition"
    },
    {
      path: "Apprenticeships",
      duration: "2-4 years",
      cost: "Paid while learning",
      employment: "Near 100% retention",
      growth: "Corporate partnerships"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-br from-orange-600 via-red-600 to-red-700 text-white">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog" className="inline-flex items-center text-orange-200 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
            
            <div className="flex items-center gap-4 text-sm text-orange-200 mb-4">
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                August 19, 2025
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                7 min read
              </div>
              <span className="bg-red-800/50 px-2 py-1 rounded text-xs">Breaking News</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              College Debt Crisis 2025: Students Are Finally Waking Up
            </h1>
            <p className="text-xl text-orange-100 leading-relaxed">
              For the first time in decades, students are prioritizing cost over college prestige. 
              Here's what the 2025 education revolution looks like—and why it's about time.
            </p>
          </div>
        </div>
      </section>

      <article className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            Something unprecedented is happening in American education. For the first time since tracking began, 
            nearly half of all students (47%) are putting cost ahead of prestige when choosing their education path. 
            This isn't just a trend—it's a seismic shift that's reshaping the entire landscape.
          </p>
          
          <div className="bg-orange-50 border-l-4 border-orange-600 p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-orange-600 mt-1 flex-shrink-0" />
              <div>
                <p className="text-lg font-semibold text-orange-800 mb-2">The Tipping Point:</p>
                <p className="text-gray-800">
                  When 47% of students prioritize cost over college brand (up from 40% in 2021), 
                  and trade school interest triples in just 4 years, we're witnessing the collapse 
                  of the "college at any cost" mentality that dominated for decades.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Statistics */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">The Numbers Tell the Story</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingStats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className={`text-3xl font-bold mb-2 ${
                      stat.trend === 'up' && stat.label.includes('Debt') ? 'text-red-600' :
                      stat.trend === 'up' ? 'text-green-600' :
                      stat.trend === 'down' ? 'text-red-600' : 'text-orange-600'
                    }`}>
                      {stat.number}
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      {stat.trend === 'up' && !stat.label.includes('Debt') && (
                        <TrendingDown className="h-4 w-4 text-green-600 transform rotate-180" />
                      )}
                      {(stat.trend === 'up' && stat.label.includes('Debt')) || stat.trend === 'down' ? (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      ) : null}
                      <h3 className="font-semibold text-gray-900 text-sm">{stat.label}</h3>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">{stat.context}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* What's Driving the Change */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">What's Driving This Revolution?</h2>
          
          <div className="space-y-8">
            <div className="bg-red-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-red-800 mb-4">💸 The Financial Reality</h3>
              <ul className="space-y-3 text-gray-700">
                <li>• Average in-state public university: <strong>$29,910 per year</strong></li>
                <li>• Average student debt at graduation: <strong>$37,000-$60,000</strong></li>
                <li>• Total national student debt: <strong>$1.814 trillion</strong></li>
                <li>• Percentage of degrees with negative ROI: <strong>25%+</strong></li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">🏢 Employer Attitude Shift</h3>
              <p className="text-gray-700 mb-4">Major companies dropping degree requirements:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Apple</strong> - Skills over credentials</li>
                    <li>• <strong>Google</strong> - Certificate programs accepted</li>
                    <li>• <strong>IBM</strong> - "New collar jobs" initiative</li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Bank of America</strong> - Portfolio-based hiring</li>
                    <li>• <strong>Microsoft</strong> - Skills assessments</li>
                    <li>• <strong>Salesforce</strong> - Alternative pathways</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-green-800 mb-4">📈 Success Stories Going Viral</h3>
              <p className="text-gray-700">
                Social media is full of stories about trade school graduates out-earning college graduates, 
                entrepreneurs who skipped college entirely, and skilled workers with zero debt making six figures. 
                These aren't isolated cases—they're becoming the norm in many industries.
              </p>
            </div>
          </div>
        </section>

        {/* Alternative Pathways */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">The Smart Alternatives Students Are Choosing</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {alternativePathways.map((pathway, index) => (
              <Card key={index} className="border-green-200 hover:shadow-lg transition-shadow">
                <CardHeader className="bg-green-50">
                  <CardTitle className="text-xl text-green-800">{pathway.path}</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-semibold text-green-600">{pathway.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Average Cost:</span>
                      <span className="font-semibold text-green-600">{pathway.cost}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Employment:</span>
                      <span className="font-semibold text-green-600">{pathway.employment}</span>
                    </div>
                    <div className="border-t pt-3">
                      <span className="text-sm text-gray-500">Growth: </span>
                      <span className="text-sm font-medium text-green-700">{pathway.growth}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Real-World Impact */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">The Real-World Impact</h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6">
              At Flagstaff High School, the percentage of students heading to four-year institutions 
              dropped from 50% to 35-40%. This isn't an outlier—it's happening nationwide.
            </p>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 mb-8">
              <h3 className="text-xl font-semibold text-yellow-800 mb-4">Case Study: The New High School Graduate</h3>
              <p className="text-gray-800 mb-4">
                <strong>Traditional Path (2020):</strong> $200K+ for college → $37K debt → 
                uncertain job market → potentially negative ROI
              </p>
              <p className="text-gray-800">
                <strong>Smart Path (2025):</strong> $33K trade school → immediate employment → 
                $50K+ starting salary → debt-free by age 25 → house down payment ready
              </p>
            </div>

            <p className="text-gray-700 mb-6">
              Students aren't just making different choices—they're making <em>smarter</em> choices. 
              And for the first time, parents are supporting them.
            </p>
          </div>
        </section>

        {/* The Future */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What This Means for 2025 and Beyond</h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 mb-8">
              We're witnessing the beginning of the end of the college-industrial complex as we know it.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <Card className="text-center">
                <CardContent className="p-6">
                  <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Skills-First Hiring</h3>
                  <p className="text-sm text-gray-600">Employers focus on what you can do, not where you learned it</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <DollarSign className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Faster ROI</h3>
                  <p className="text-sm text-gray-600">Alternative paths offer quicker returns and less debt</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <TrendingDown className="h-12 w-12 text-red-600 mx-auto mb-4 transform rotate-180" />
                  <h3 className="text-lg font-semibold mb-2">Market Evolution</h3>
                  <p className="text-sm text-gray-600">Traditional colleges forced to adapt or become irrelevant</p>
                </CardContent>
              </Card>
            </div>

            <p className="text-gray-700">
              The students making smart financial decisions today will be the success stories of tomorrow. 
              Meanwhile, those still buying into the "college at any cost" mindset may find themselves 
              with expensive degrees and limited opportunities.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Don't Get Left Behind</h2>
          <p className="text-orange-100 mb-6">
            See if your education path makes financial sense in the new economy. 
            Get your personalized analysis before making a decision you can't afford to regret.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/calculate">
                Calculate My Path ROI
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600" asChild>
              <Link href="/blog">
                Read More Analysis
              </Link>
            </Button>
          </div>
        </section>

        {/* Sources */}
        <section className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Sources & Data</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p>• Fidelity Study on Changing Views of Student Debt (2025)</p>
            <p>• Education Data Initiative - Student Loan Debt Statistics</p>
            <p>• Council on Foreign Relations - Rising Student Loan Debt Analysis</p>
            <p>• Research.com - Trade School vs College Analysis 2025</p>
            <p>• CNBC - College Debt Crisis Student Migration Report</p>
          </div>
        </section>
      </article>
    </div>
  );
}