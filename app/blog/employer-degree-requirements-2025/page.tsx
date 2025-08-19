import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock, ArrowLeft, Building2, CheckCircle, TrendingUp, Users, Target } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Major Employers Drop Degree Requirements in 2025: What This Means for Your Career - CollegeScam.io',
  description: 'Apple, Google, IBM, and Bank of America no longer require college degrees. See how the job market is changing and which skills really matter in 2025.',
  keywords: 'employers no degree requirements 2025, Apple Google IBM hiring, skills based hiring, college degree not required jobs, alternative career paths',
  openGraph: {
    title: 'Major Employers Drop Degree Requirements: The End of Degree Inflation?',
    description: 'Fortune 500 companies are abandoning degree requirements. Here\'s what skills they actually want and how to get hired without a degree.',
    url: 'https://collegescam.io/blog/employer-degree-requirements-2025',
  }
};

export default function EmployerDegreeRequirementsPage() {
  const companiesDroppedDegrees = [
    {
      company: "Apple",
      initiative: "Skills-First Hiring",
      focus: "Portfolio-based assessment, practical skills demonstration",
      roles: "Software engineering, design, technical support",
      quote: "What we care about is your ability to do the work, not where you learned it."
    },
    {
      company: "Google",
      initiative: "Google Career Certificates",
      focus: "6-month certificate programs, hands-on experience",
      roles: "Data analytics, UX design, project management, IT support",
      quote: "We treat our certificates as the equivalent of four-year degrees."
    },
    {
      company: "IBM",
      initiative: "New Collar Jobs",
      focus: "Skills-based assessments, continuous learning",
      roles: "Cybersecurity, cloud computing, data science, AI",
      quote: "The skills required for success are changing faster than degree programs can adapt."
    },
    {
      company: "Bank of America",
      initiative: "Skills-Based Talent Acquisition",
      focus: "Competency testing, real-world problem solving",
      roles: "Technology, operations, customer service, analytics",
      quote: "We evaluate candidates based on their potential and demonstrated abilities."
    },
    {
      company: "Microsoft",
      initiative: "Skills-First Approach",
      focus: "Technical assessments, project portfolios",
      roles: "Software development, cloud architecture, sales",
      quote: "The best predictor of job performance is actual performance, not academic credentials."
    },
    {
      company: "Salesforce",
      initiative: "Pathfinder Program",
      focus: "Alternative education pathways, mentorship",
      roles: "Administration, development, consulting",
      quote: "Talent can come from anywhere, and we're committed to finding it."
    }
  ];

  const inDemandSkills = [
    {
      category: "Technology",
      skills: ["Python/JavaScript Programming", "Cloud Computing (AWS/Azure)", "Data Analysis", "Cybersecurity", "AI/Machine Learning"],
      median_salary: "$75,000 - $130,000",
      time_to_learn: "3-18 months"
    },
    {
      category: "Digital Marketing",
      skills: ["SEO/SEM", "Content Strategy", "Analytics", "Social Media Management", "Email Marketing"],
      median_salary: "$45,000 - $85,000",
      time_to_learn: "2-12 months"
    },
    {
      category: "Design",
      skills: ["UI/UX Design", "Graphic Design", "Video Editing", "3D Modeling", "Brand Design"],
      median_salary: "$50,000 - $95,000",
      time_to_learn: "6-18 months"
    },
    {
      category: "Project Management",
      skills: ["Agile/Scrum", "Risk Management", "Process Improvement", "Team Leadership", "Budget Planning"],
      median_salary: "$65,000 - $110,000",
      time_to_learn: "3-12 months"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-purple-700 text-white">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog" className="inline-flex items-center text-blue-200 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
            
            <div className="flex items-center gap-4 text-sm text-blue-200 mb-4">
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                August 19, 2025
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                9 min read
              </div>
              <span className="bg-purple-800/50 px-2 py-1 rounded text-xs">Industry Shift</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              The End of Degree Inflation: Fortune 500 Companies Abandon College Requirements
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Apple, Google, IBM, and dozens of other major employers no longer require college degrees. 
              Here's what they actually want—and how to get hired without spending four years in debt.
            </p>
          </div>
        </div>
      </section>

      <article className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            The seismic shift is happening faster than anyone predicted. In 2025, more Fortune 500 companies 
            are dropping college degree requirements than ever before. But this isn't just about being "nice" 
            to non-graduates—it's about survival in a competitive market where skills matter more than diplomas.
          </p>
          
          <div className="bg-green-50 border-l-4 border-green-600 p-6 mb-8">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <p className="text-lg font-semibold text-green-800 mb-2">The Proof Is in Performance:</p>
                <p className="text-gray-800">
                  Companies that adopted skills-first hiring report 25% better job performance, 
                  40% longer employee retention, and significantly more diverse teams. 
                  The results speak louder than any degree ever could.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Major Companies Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">The Companies Leading the Revolution</h2>
          
          <div className="space-y-8">
            {companiesDroppedDegrees.map((company, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="flex items-center gap-4">
                    <Building2 className="h-8 w-8 text-blue-600" />
                    <div>
                      <CardTitle className="text-2xl text-gray-900">{company.company}</CardTitle>
                      <CardDescription className="text-blue-600 font-medium">{company.initiative}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Focus Areas:</h4>
                      <p className="text-gray-700 text-sm mb-4">{company.focus}</p>
                      <h4 className="font-semibold text-gray-900 mb-2">Open Roles:</h4>
                      <p className="text-gray-700 text-sm">{company.roles}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Company Statement:</h4>
                      <p className="text-gray-700 text-sm italic">"{company.quote}"</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Skills in Demand */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">What Skills Actually Matter in 2025</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {inDemandSkills.map((category, index) => (
              <Card key={index} className="border-purple-200 hover:shadow-lg transition-shadow">
                <CardHeader className="bg-purple-50">
                  <CardTitle className="text-xl text-purple-800 flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Key Skills:</h4>
                      <ul className="space-y-1">
                        {category.skills.map((skill, skillIndex) => (
                          <li key={skillIndex} className="text-sm text-gray-700 flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="border-t pt-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Salary Range:</span>
                        <span className="text-sm font-semibold text-green-600">{category.median_salary}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Time to Learn:</span>
                        <span className="text-sm font-semibold text-blue-600">{category.time_to_learn}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Why This Is Happening */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Smart Companies Are Making This Shift</h2>
          
          <div className="space-y-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Skills Evolve Faster Than Degrees
              </h3>
              <p className="text-gray-700 mb-4">
                Technology changes every 18 months, but college curricula change every 8-10 years. 
                By the time a computer science student graduates, half their knowledge is already outdated.
              </p>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-600">
                  <strong>Example:</strong> A self-taught developer who's been building React apps for 2 years 
                  has more relevant skills than a recent CS graduate who learned Java in 2021.
                </p>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Better Performance, Better Retention
              </h3>
              <p className="text-gray-700 mb-4">
                Companies report that skills-based hires:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Perform 25% better in role-specific tasks</li>
                <li>• Stay with the company 40% longer</li>
                <li>• Require 30% less training time</li>
                <li>• Show higher job satisfaction scores</li>
                <li>• Bring more diverse perspectives and problem-solving approaches</li>
              </ul>
            </div>

            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-purple-800 mb-4 flex items-center gap-2">
                <Target className="h-5 w-5" />
                Competitive Advantage
              </h3>
              <p className="text-gray-700">
                While other companies fight over the same pool of college graduates, 
                forward-thinking employers are tapping into a much larger talent pool. 
                They get first pick of motivated, skilled workers who might have been 
                overlooked due to outdated hiring practices.
              </p>
            </div>
          </div>
        </section>

        {/* How to Position Yourself */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">How to Position Yourself in This New Market</h2>
          
          <div className="prose prose-lg max-w-none">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <Card className="text-center border-green-200">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-green-600 mb-2">1</div>
                  <h3 className="text-lg font-semibold mb-2">Build Real Skills</h3>
                  <p className="text-sm text-gray-600">Focus on practical, in-demand skills that solve real business problems</p>
                </CardContent>
              </Card>
              
              <Card className="text-center border-blue-200">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-blue-600 mb-2">2</div>
                  <h3 className="text-lg font-semibold mb-2">Create a Portfolio</h3>
                  <p className="text-sm text-gray-600">Show, don't tell. Build projects that demonstrate your abilities</p>
                </CardContent>
              </Card>
              
              <Card className="text-center border-purple-200">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-purple-600 mb-2">3</div>
                  <h3 className="text-lg font-semibold mb-2">Get Certified</h3>
                  <p className="text-sm text-gray-600">Industry certifications often carry more weight than degrees</p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 mb-8">
              <h3 className="text-xl font-semibold text-yellow-800 mb-4">The New Job Application Strategy</h3>
              <p className="text-gray-800 mb-4">Instead of:</p>
              <p className="text-sm text-gray-700 mb-4">
                "I have a bachelor's degree in business and I'm a hard worker..."
              </p>
              <p className="text-gray-800 mb-4">Try:</p>
              <p className="text-sm text-gray-700">
                "I built a React application that increased user engagement by 35% for my last project. 
                Here's my GitHub repository and live demo. I can solve similar problems for your team."
              </p>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">Action Steps for 2025:</h3>
            
            <ol className="space-y-4 text-gray-700">
              <li>
                <strong>1. Research Target Companies:</strong> Identify which companies in your field have dropped degree requirements
              </li>
              <li>
                <strong>2. Skill Gap Analysis:</strong> Compare current job postings with your skills—focus on the gaps
              </li>
              <li>
                <strong>3. Learn in Public:</strong> Document your learning journey on LinkedIn, GitHub, or personal blog
              </li>
              <li>
                <strong>4. Network Strategically:</strong> Connect with hiring managers and employees at target companies
              </li>
              <li>
                <strong>5. Apply Confidently:</strong> Don't self-select out of opportunities—let them decide
              </li>
            </ol>
          </div>
        </section>

        {/* The Future */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What This Means for the Future</h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 mb-8">
              We're witnessing the end of "degree inflation"—the practice of requiring college degrees for jobs that don't actually need them.
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">The Domino Effect:</h3>
              <ul className="space-y-3 text-gray-700">
                <li>• More companies will follow suit to stay competitive for talent</li>
                <li>• College enrollment will continue declining as alternatives prove viable</li>
                <li>• Skills-based hiring will become the norm, not the exception</li>
                <li>• Traditional HR practices will be forced to evolve</li>
                <li>• The "college premium" will shrink as supply/demand rebalances</li>
              </ul>
            </div>

            <p className="text-gray-700 mb-6">
              For job seekers, this represents the greatest opportunity in decades. 
              The playing field is finally leveling, and merit matters more than credentials.
            </p>

            <p className="text-gray-700">
              The question isn't whether you should go to college—it's whether you should 
              develop the skills that employers actually value. In 2025, the answer is clear.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Skip the Debt, Build the Skills</h2>
          <p className="text-blue-100 mb-6">
            Before you invest years and thousands in a degree that might not matter, 
            see what path actually makes financial sense for your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/calculate">
                Calculate My Career ROI
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
              <Link href="/blog/trade-school-vs-college-2025">
                Compare All Alternatives
              </Link>
            </Button>
          </div>
        </section>

        {/* Sources */}
        <section className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Sources & References</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p>• Harvard Business Review - Skills-Based Hiring Studies</p>
            <p>• Company Career Pages - Apple, Google, IBM, Microsoft, Bank of America, Salesforce</p>
            <p>• Bureau of Labor Statistics - Job Requirements Analysis</p>
            <p>• LinkedIn Economic Graph - Skills Demand Trends</p>
            <p>• Society for Human Resource Management (SHRM) - Hiring Practices Survey</p>
          </div>
        </section>
      </article>
    </div>
  );
}