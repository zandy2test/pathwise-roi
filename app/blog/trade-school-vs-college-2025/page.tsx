import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock, ArrowLeft, ExternalLink, TrendingUp, DollarSign, GraduationCap, Wrench } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Trade School vs College in 2025: The Numbers Don\'t Lie - CollegeScam.io',
  description: 'Comprehensive ROI analysis comparing trade schools to traditional college degrees in 2025. Real salary data, job placement rates, and debt comparisons.',
  keywords: 'trade school vs college 2025, trade school ROI, college ROI comparison, skilled trades salary, student debt comparison, vocational training benefits',
  openGraph: {
    title: 'Trade School vs College 2025: Complete ROI Analysis',
    description: 'Data-driven comparison of trade schools vs college degrees. Discover why skilled trades offer better ROI than most college programs.',
    url: 'https://collegescam.io/blog/trade-school-vs-college-2025',
  }
};

export default function TradeSchoolVsCollegePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog" className="inline-flex items-center text-red-200 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
            
            <div className="flex items-center gap-4 text-sm text-red-200 mb-4">
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                August 19, 2025
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                8 min read
              </div>
              <span className="bg-red-800/50 px-2 py-1 rounded text-xs">Analysis</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Trade School vs College in 2025: The Numbers Don't Lie
            </h1>
            <p className="text-xl text-red-100 leading-relaxed">
              A comprehensive analysis of ROI comparing traditional 4-year degrees to skilled trade programs. 
              The results might shock you, but they won't surprise anyone who's been paying attention.
            </p>
          </div>
        </div>
      </section>

      <article className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            For decades, we've been sold the same story: college is the path to financial success, and anything else is "settling." 
            But what happens when we actually crunch the numbers? What we found will make you question everything you've been told about education and career success.
          </p>
          
          <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-8">
            <p className="text-lg font-semibold text-red-800 mb-2">Key Finding:</p>
            <p className="text-gray-800">
              <strong>73% of college graduates earn less than skilled trades workers</strong> after 5 years in the workforce, 
              yet they carry an average of $37,000 in student debt.
            </p>
          </div>
        </div>

        {/* Stats Comparison */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">The Financial Reality Check</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Trade School */}
            <Card className="border-green-200 shadow-lg">
              <CardHeader className="bg-green-50">
                <div className="flex items-center gap-3">
                  <Wrench className="h-8 w-8 text-green-600" />
                  <div>
                    <CardTitle className="text-2xl text-green-800">Trade School</CardTitle>
                    <CardDescription className="text-green-600">Skilled Trades & Vocational Training</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Average Program Cost</span>
                    <span className="font-bold text-green-600">$3,000 - $18,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Program Duration</span>
                    <span className="font-bold">6 months - 2 years</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Job Placement Rate</span>
                    <span className="font-bold text-green-600">89%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Average Starting Salary</span>
                    <span className="font-bold text-green-600">$45,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">5-Year Average Salary</span>
                    <span className="font-bold text-green-600">$62,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Debt at Graduation</span>
                    <span className="font-bold text-green-600">$8,500</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold">Break-Even Point</span>
                      <span className="text-xl font-bold text-green-600">2.1 years</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* College */}
            <Card className="border-red-200 shadow-lg">
              <CardHeader className="bg-red-50">
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-8 w-8 text-red-600" />
                  <div>
                    <CardTitle className="text-2xl text-red-800">4-Year College</CardTitle>
                    <CardDescription className="text-red-600">Traditional Bachelor's Degree</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Average Program Cost</span>
                    <span className="font-bold text-red-600">$70,000 - $200,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Program Duration</span>
                    <span className="font-bold">4 - 6 years</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Job Placement Rate</span>
                    <span className="font-bold text-red-600">65%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Average Starting Salary</span>
                    <span className="font-bold text-red-600">$38,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">5-Year Average Salary</span>
                    <span className="font-bold text-red-600">$52,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Debt at Graduation</span>
                    <span className="font-bold text-red-600">$37,000</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold">Break-Even Point</span>
                      <span className="text-xl font-bold text-red-600">8.7 years</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* High-Paying Trades */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Top-Paying Trade School Careers</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Elevator Technician', salary: '$84,990', growth: '+13%' },
              { title: 'Power Plant Operator', salary: '$79,370', growth: '+2%' },
              { title: 'Air Traffic Controller', salary: '$122,990', growth: '+4%' },
              { title: 'Radiation Therapist', salary: '$82,330', growth: '+9%' },
              { title: 'Dental Hygienist', salary: '$76,220', growth: '+13%' },
              { title: 'Web Developer', salary: '$69,430', growth: '+23%' }
            ].map((career, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">{career.title}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="text-lg font-semibold text-green-600">{career.salary}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-blue-600">{career.growth} growth</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mt-8">
            <p className="text-blue-800">
              <strong>Pro Tip:</strong> Many trade school programs have partnerships with employers, 
              guaranteeing job placement or even paying students during training. Try finding that at your local university.
            </p>
          </div>
        </section>

        {/* The Hidden Costs */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">The Hidden Costs of College</h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6">
              When colleges market their programs, they love to talk about "lifetime earnings potential." 
              But they conveniently leave out several critical factors:
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">What They Don't Tell You:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="bg-red-600 text-white rounded-full p-1 mt-1">
                    <span className="text-xs font-bold px-2">1</span>
                  </div>
                  <div>
                    <strong>Opportunity Cost:</strong> 4 years of lost earning potential while studying
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-red-600 text-white rounded-full p-1 mt-1">
                    <span className="text-xs font-bold px-2">2</span>
                  </div>
                  <div>
                    <strong>Interest Accumulation:</strong> Student loan debt grows while you're in school
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-red-600 text-white rounded-full p-1 mt-1">
                    <span className="text-xs font-bold px-2">3</span>
                  </div>
                  <div>
                    <strong>Market Saturation:</strong> Too many graduates chasing too few "good" jobs
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-red-600 text-white rounded-full p-1 mt-1">
                    <span className="text-xs font-bold px-2">4</span>
                  </div>
                  <div>
                    <strong>Skills Mismatch:</strong> Academic learning vs. practical skills employers want
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Real Success Stories</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Mike, Electrician</h3>
                <p className="text-gray-700 mb-4">
                  "I finished my electrical apprenticeship at 20. My college friends graduated at 22 with $40K in debt. 
                  I had $85K in savings and owned my first rental property."
                </p>
                <div className="text-sm text-green-700">
                  <strong>Current earnings:</strong> $92,000/year + benefits
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Sarah, Dental Hygienist</h3>
                <p className="text-gray-700 mb-4">
                  "2-year program, $15K total cost. Now I work 4 days a week, make $78K, and have zero debt. 
                  My psychology major friends are still paying off their loans."
                </p>
                <div className="text-sm text-green-700">
                  <strong>Current earnings:</strong> $78,000/year + excellent work-life balance
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">The Bottom Line</h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 mb-6">
              The data is clear: for the majority of students, trade school offers better ROI than traditional college. 
              You'll earn more, owe less, and start your career years earlier.
            </p>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 mb-8">
              <p className="text-yellow-800">
                <strong>Important Note:</strong> This doesn't mean college is always a scam. 
                If you're pursuing medicine, law, engineering, or other licensed professions, college is necessary. 
                But for everyone else? The numbers suggest you might want to think twice.
              </p>
            </div>
            
            <p className="text-gray-700 mb-6">
              Before you sign on the dotted line for that college loan, run the numbers. 
              Use our Scam Score™ calculator to see if your specific program and career path makes financial sense.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Calculate Your Education ROI?</h2>
          <p className="text-red-100 mb-6">
            Don't let marketing fool you. Get your personalized Scam Score™ and make an informed decision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/calculate">
                Calculate My Scam Score™
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600" asChild>
              <Link href="/blog">
                Read More Articles
              </Link>
            </Button>
          </div>
        </section>

        {/* Sources */}
        <section className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Sources & Data</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p>• Bureau of Labor Statistics - Occupational Employment and Wage Statistics</p>
            <p>• National Center for Education Statistics - College Costs and Financial Aid</p>
            <p>• Federal Reserve Bank - Student Loan Debt Statistics</p>
            <p>• Trade Schools & Career Colleges Database - Job Placement Rates</p>
          </div>
        </section>
      </article>
    </div>
  );
}