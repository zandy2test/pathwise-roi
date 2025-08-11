import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { viralComparisons } from '@/lib/data'
import { ArrowRight, Calculator, TrendingUp, Shield } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-16 space-y-6">
        <h1 className="text-5xl font-bold tracking-tight">
          When Does Your Education{' '}
          <span className="text-primary">Actually Pay Off?</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Compare college degrees, trade schools, bootcamps, and work paths. 
          Find your breakeven point with real salary data and location adjustments.
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <Link href="/calculate">
            <Button size="lg" className="gap-2">
              <Calculator className="h-5 w-5" />
              Calculate Your ROI
            </Button>
          </Link>
          <Link href="/compare">
            <Button size="lg" variant="outline" className="gap-2">
              Compare Paths
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Viral Comparisons */}
      <section className="py-16 space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Mind-Blowing Comparisons</h2>
          <p className="text-muted-foreground mt-2">
            Real data that challenges conventional wisdom
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {viralComparisons.slice(0, 3).map((comparison, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{comparison.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Link href={`/compare?path1=${comparison.path1}&path2=${comparison.path2}`}>
                  <Button variant="ghost" className="w-full">
                    See Comparison <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 space-y-8">
        <h2 className="text-3xl font-bold text-center">Why PathwiseROI?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Calculator className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Real Data</CardTitle>
              <CardDescription>
                Actual salary data from 20+ education paths, adjusted for your location
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <TrendingUp className="h-10 w-10 text-primary mb-4" />
              <CardTitle>True Costs</CardTitle>
              <CardDescription>
                Including living expenses, opportunity costs, and employment rates
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Risk Factors</CardTitle>
              <CardDescription>
                See dropout rates, employment challenges, and industry-specific risks
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center bg-muted/50 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Ready to Calculate Your Path?</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands making informed education decisions with real data
        </p>
        <Link href="/calculate">
          <Button size="lg">
            Start Your Calculation <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </section>
    </div>
  )
}
