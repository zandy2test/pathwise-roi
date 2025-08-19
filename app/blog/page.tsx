import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog - CollegeScam.io | Education ROI Insights & Analysis',
  description: 'Get the latest insights on education costs, career alternatives, and college ROI analysis. Expert takes on student debt, trade schools vs college, and career path decisions.',
  keywords: 'college scam blog, education insights, student debt analysis, trade school benefits, college alternatives, career path guidance, education ROI',
  openGraph: {
    title: 'Education ROI Blog - CollegeScam.io',
    description: 'Latest insights on college costs, alternatives, and making smart career decisions. Avoid the education debt trap with data-driven analysis.',
    url: 'https://collegescam.io/blog',
  }
};

const blogPosts = [
  {
    slug: 'trade-school-vs-college-2025',
    title: 'Trade School vs College in 2025: The Numbers Don\'t Lie',
    description: 'A comprehensive analysis of ROI comparing traditional 4-year degrees to skilled trade programs. Spoiler: trades are winning.',
    publishedAt: '2025-08-19',
    readTime: '8 min',
    category: 'Analysis',
    featured: true
  },
  {
    slug: 'student-debt-crisis-statistics',
    title: 'Student Debt Crisis: 2025 Statistics That Will Shock You',
    description: 'The latest data on student loan debt reveals a system designed to trap students in decades of payments.',
    publishedAt: '2025-08-18',
    readTime: '6 min',
    category: 'Research'
  },
  {
    slug: 'college-marketing-scams-exposed',
    title: 'How Colleges Market Their Way to Your Wallet',
    description: 'Inside the billion-dollar marketing machine that convinces students to pay premium prices for questionable value.',
    publishedAt: '2025-08-17',
    readTime: '10 min',
    category: 'Investigation'
  },
  {
    slug: 'bootcamp-job-placement-reality',
    title: 'Coding Bootcamp Job Placement: Reality vs Marketing',
    description: 'We analyzed real job placement data from 50+ coding bootcamps. The results might surprise you.',
    publishedAt: '2025-08-16',
    readTime: '7 min',
    category: 'Analysis'
  },
  {
    slug: 'high-paying-jobs-without-degree',
    title: '25 High-Paying Jobs That Don\'t Require a College Degree',
    description: 'Evidence-based career paths that offer better ROI than most college degrees, with real salary data.',
    publishedAt: '2025-08-15',
    readTime: '12 min',
    category: 'Career Guidance'
  },
  {
    slug: 'college-dropout-success-stories',
    title: 'College Dropouts Who Made Millions (And What They Did Instead)',
    description: 'Real stories of entrepreneurs and professionals who skipped college and built successful careers.',
    publishedAt: '2025-08-14',
    readTime: '9 min',
    category: 'Success Stories'
  }
];

export default function BlogPage() {
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Education ROI <span className="text-yellow-400">Insights</span>
            </h1>
            <p className="text-xl md:text-2xl text-red-100 mb-8">
              Data-driven analysis to help you make smarter career and education decisions
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-red-100">
              <span className="bg-red-800/50 px-3 py-1 rounded-full">Student Debt Analysis</span>
              <span className="bg-red-800/50 px-3 py-1 rounded-full">Career Alternatives</span>
              <span className="bg-red-800/50 px-3 py-1 rounded-full">ROI Comparisons</span>
              <span className="bg-red-800/50 px-3 py-1 rounded-full">Industry Insights</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        {/* Featured Post */}
        {featuredPost && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Article</h2>
            <Card className="overflow-hidden border-2 border-red-200 shadow-lg hover:shadow-xl transition-shadow">
              <div className="md:flex">
                <div className="md:w-1/3 bg-gradient-to-br from-red-100 to-orange-100 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-red-600 mb-2">
                      {featuredPost.category === 'Analysis' ? '📊' : '🎯'}
                    </div>
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                  </div>
                </div>
                <CardContent className="md:w-2/3 p-8">
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <CalendarDays className="h-4 w-4" />
                      {new Date(featuredPost.publishedAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {featuredPost.readTime}
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                      {featuredPost.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {featuredPost.title}
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {featuredPost.description}
                  </p>
                  <Button asChild className="bg-red-600 hover:bg-red-700">
                    <Link href={`/blog/${featuredPost.slug}`}>
                      Read Full Article <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </div>
            </Card>
          </section>
        )}

        {/* Recent Posts */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Recent Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Card key={post.slug} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      post.category === 'Analysis' ? 'bg-blue-100 text-blue-800' :
                      post.category === 'Research' ? 'bg-green-100 text-green-800' :
                      post.category === 'Investigation' ? 'bg-red-100 text-red-800' :
                      post.category === 'Career Guidance' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {post.category}
                    </span>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-xl hover:text-red-600 transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </CardTitle>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <CalendarDays className="h-4 w-4" />
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-700 mb-4">
                    {post.description}
                  </CardDescription>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/blog/${post.slug}`}>
                      Read More <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-16 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Calculate Your Education ROI?</h2>
          <p className="text-red-100 mb-6 max-w-2xl mx-auto">
            Don't let marketing fool you. Get your personalized Scam Score™ and see if your education path is worth the investment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/calculate">
                Calculate My Scam Score™
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600" asChild>
              <Link href="/how-it-works">
                How It Works
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}