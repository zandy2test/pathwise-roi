import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock, ArrowLeft, TrendingUp, AlertTriangle, DollarSign, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Student Debt Crisis: 2025 Statistics That Will Shock You - CollegeScam.io',
  description: 'The latest data on student loan debt reveals a system designed to trap students in decades of payments. See the shocking statistics that colleges don\'t want you to know.',
  keywords: 'student debt crisis 2025, student loan statistics, college debt trap, student loan crisis data, education debt statistics, college loan defaults',
  openGraph: {
    title: 'Student Debt Crisis Statistics 2025: The Shocking Reality',
    description: 'Eye-opening statistics about the student debt crisis that reveal how the education system is designed to trap students in debt.',
    url: 'https://collegescam.io/blog/student-debt-crisis-statistics',
  }
};

export default function StudentDebtCrisisPage() {
  const statistics = [
    {
      number: "$1.75T",
      label: "Total U.S. Student Debt",
      context: "More than the GDP of most countries",
      trend: "up"
    },
    {
      number: "45M",
      label: "Americans with Student Debt",
      context: "1 in 8 Americans are trapped",
      trend: "up"
    },
    {
      number: "$37,014",
      label: "Average Debt per Borrower",
      context: "Up 6% from 2024",
      trend: "up"
    },
    {
      number: "10.8%",
      label: "Default Rate (First 3 Years)",
      context: "1 in 10 borrowers default quickly",
      trend: "stable"
    },
    {
      number: "20 Years",
      label: "Average Repayment Period",
      context: "Most borrowers pay for 2 decades",
      trend: "up"
    },
    {
      number: "43%",
      label: "Can't Make Payments",
      context: "Nearly half struggle financially",
      trend: "up"
    }
  ];

  const collegeTypes = [
    {
      type: "Public 4-Year",
      inState: "$10,950",
      outState: "$28,240",
      room: "$12,310",
      total: "$41,550"
    },
    {
      type: "Private Non-Profit",
      inState: "$39,400",
      outState: "$39,400", 
      room: "$13,620",
      total: "$53,020"
    },
    {
      type: "Private For-Profit",
      inState: "$17,825",
      outState: "$17,825",
      room: "$8,990",
      total: "$26,815"
    }
  ];

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
                August 18, 2025
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                6 min read
              </div>
              <span className="bg-red-800/50 px-2 py-1 rounded text-xs">Research</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Student Debt Crisis: 2025 Statistics That Will Shock You
            </h1>
            <p className="text-xl text-red-100 leading-relaxed">
              The latest data on student loan debt reveals a system designed to trap students in decades of payments. 
              These numbers aren't just statistics—they're a wake-up call.
            </p>
          </div>
        </div>
      </section>

      <article className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            Every year, millions of students are told that college debt is "good debt" and an "investment in their future." 
            But what does the data actually show? Spoiler alert: it's not pretty, and it's getting worse.
          </p>
          
          <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
              <div>
                <p className="text-lg font-semibold text-red-800 mb-2">Reality Check:</p>
                <p className="text-gray-800">
                  The student debt crisis has reached unprecedented levels. We're not just talking about individual financial hardship—
                  this is a systemic problem that's damaging the entire economy.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Statistics Grid */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">The Numbers Don't Lie</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {statistics.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className={`text-4xl font-bold mb-2 ${
                      stat.trend === 'up' ? 'text-red-600' : 
                      stat.trend === 'down' ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      {stat.number}
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      {stat.trend === 'up' && <TrendingUp className="h-4 w-4 text-red-600" />}
                      {stat.trend === 'down' && <TrendingUp className="h-4 w-4 text-green-600 transform rotate-180" />}
                      <h3 className="font-semibold text-gray-900">{stat.label}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{stat.context}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* College Costs Breakdown */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Annual College Costs (2024-2025)</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg shadow-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border-b border-gray-200 px-6 py-4 text-left font-semibold text-gray-900">Institution Type</th>
                  <th className="border-b border-gray-200 px-6 py-4 text-center font-semibold text-gray-900">Tuition (In-State)</th>
                  <th className="border-b border-gray-200 px-6 py-4 text-center font-semibold text-gray-900">Tuition (Out-State)</th>
                  <th className="border-b border-gray-200 px-6 py-4 text-center font-semibold text-gray-900">Room & Board</th>
                  <th className="border-b border-gray-200 px-6 py-4 text-center font-semibold text-gray-900">Total (Out-State)</th>
                </tr>
              </thead>
              <tbody>
                {collegeTypes.map((college, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border-b border-gray-200 px-6 py-4 font-medium text-gray-900">{college.type}</td>
                    <td className="border-b border-gray-200 px-6 py-4 text-center text-gray-700">${college.inState}</td>
                    <td className="border-b border-gray-200 px-6 py-4 text-center text-gray-700">${college.outState}</td>
                    <td className="border-b border-gray-200 px-6 py-4 text-center text-gray-700">${college.room}</td>
                    <td className="border-b border-gray-200 px-6 py-4 text-center font-bold text-red-600">${college.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 mt-6">
            <p className="text-yellow-800">
              <strong>Hidden Truth:</strong> These are just the advertised prices. Factor in textbooks ($1,200/year), 
              transportation, personal expenses, and the lost income from not working, and the real cost skyrockets.
            </p>
          </div>
        </section>

        {/* Debt by Demographics */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Who's Getting Hit the Hardest?</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-orange-200 shadow-lg">
              <CardHeader className="bg-orange-50">
                <CardTitle className="text-xl text-orange-800">By Age Group</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Under 30</span>
                    <span className="font-bold text-orange-600">$33,570</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">30-39</span>
                    <span className="font-bold text-orange-600">$42,290</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">40-49</span>
                    <span className="font-bold text-orange-600">$46,850</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">50-61</span>
                    <span className="font-bold text-orange-600">$55,750</span>
                  </div>
                  <div className="flex items-center justify-between border-t pt-2">
                    <span className="text-gray-600">65+</span>
                    <span className="font-bold text-red-600">$39,380</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-purple-200 shadow-lg">
              <CardHeader className="bg-purple-50">
                <CardTitle className="text-xl text-purple-800">By Education Level</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Associate Degree</span>
                    <span className="font-bold text-green-600">$23,840</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Bachelor's Degree</span>
                    <span className="font-bold text-orange-600">$37,150</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Master's Degree</span>
                    <span className="font-bold text-red-600">$68,200</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Professional Degree</span>
                    <span className="font-bold text-red-600">$142,430</span>
                  </div>
                  <div className="flex items-center justify-between border-t pt-2">
                    <span className="text-gray-600">Doctoral Degree</span>
                    <span className="font-bold text-red-600">$102,290</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-red-50 border-l-4 border-red-600 p-6 mt-8">
            <p className="text-red-800 mb-4">
              <strong>Shocking Reality:</strong> People 65 and older still owe an average of $39,380 in student debt. 
              Many will die before paying it off.
            </p>
            <p className="text-red-700">
              This isn't just about young people making mistakes. The system is designed to keep people in debt for decades.
            </p>
          </div>
        </section>

        {/* The Psychology of Debt */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">The Hidden Psychological Cost</h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6">
              Beyond the financial burden, student debt creates psychological trauma that lasts for decades:
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-blue-800">Mental Health Impact</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 67% report anxiety about their debt</li>
                    <li>• 45% experience depression related to finances</li>
                    <li>• 38% avoid seeking mental health care due to cost</li>
                    <li>• 29% have considered suicide due to debt</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-purple-800">Life Decisions Delayed</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 56% delay buying a home</li>
                    <li>• 41% postpone having children</li>
                    <li>• 73% can't save for retirement</li>
                    <li>• 62% avoid starting a business</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* The Real Scam */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How the System Keeps You Trapped</h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6">
              Student loans aren't like other debt. They're designed to be nearly impossible to escape:
            </p>
            
            <div className="bg-gray-100 rounded-lg p-8 mb-8">
              <h3 className="text-xl font-semibold mb-6 text-gray-900">The Debt Trap Features:</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-red-600 mb-2">Can't Discharge in Bankruptcy</h4>
                  <p className="text-gray-700 text-sm">
                    Unlike credit cards or business loans, student debt follows you to the grave.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-red-600 mb-2">Interest Capitalizes</h4>
                  <p className="text-gray-700 text-sm">
                    Miss payments? The interest gets added to your principal, increasing your total debt.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-red-600 mb-2">Wage Garnishment</h4>
                  <p className="text-gray-700 text-sm">
                    The government can take your wages, tax refunds, and Social Security without a court order.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-red-600 mb-2">No Statute of Limitations</h4>
                  <p className="text-gray-700 text-sm">
                    They can pursue you forever. There's no time limit on collecting student debt.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-8">
              <p className="text-red-800">
                <strong>The Truth:</strong> This isn't an accident. These features were lobbied for and implemented by the same institutions that profit from student debt. 
                It's a system designed to extract maximum profit from students over their entire working lives.
              </p>
            </div>
          </div>
        </section>

        {/* What You Can Do */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Breaking Free From the System</h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6">
              If you're already in debt, there are strategies to minimize damage. 
              If you're considering college, there are better alternatives:
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-green-200">
                <CardHeader className="bg-green-50">
                  <CardTitle className="text-green-800">If You're Already in Debt</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-3 text-gray-700">
                    <li>• Look into income-driven repayment plans</li>
                    <li>• Investigate Public Service Loan Forgiveness</li>
                    <li>• Consider refinancing (but lose federal protections)</li>
                    <li>• Make extra payments toward principal</li>
                    <li>• Never ignore your loans - they won't go away</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-blue-200">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-blue-800">Better Alternatives</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-3 text-gray-700">
                    <li>• Trade schools and apprenticeships</li>
                    <li>• Coding bootcamps and certifications</li>
                    <li>• Community college + transfer</li>
                    <li>• Work-study programs</li>
                    <li>• Start a business or learn skills online</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Don't Become Another Statistic</h2>
          <p className="text-red-100 mb-6">
            Before you sign that loan paperwork, see if your education path is actually worth the debt.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/calculate">
                Calculate My Scam Score™
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600" asChild>
              <Link href="/blog">
                Read More Research
              </Link>
            </Button>
          </div>
        </section>

        {/* Sources */}
        <section className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Sources & Data</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p>• Federal Reserve Bank - Consumer Credit Outstanding</p>
            <p>• U.S. Department of Education - Federal Student Aid Data Center</p>
            <p>• College Board - Trends in Student Aid 2024</p>
            <p>• National Association of Student Financial Aid Administrators</p>
            <p>• Federal Reserve Bank of New York - Student Loan Update</p>
          </div>
        </section>
      </article>
    </div>
  );
}