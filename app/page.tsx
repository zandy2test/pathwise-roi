"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calculator, TrendingUp, Users, Zap, DollarSign, Clock, Target, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"

export default function HomePage() {
  const [isCalculating, setIsCalculating] = useState(false)

  const handleCalculateClick = () => {
    setIsCalculating(true)
    // Simulate navigation to calculator
    setTimeout(() => setIsCalculating(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Enhanced mobile-first header with hamburger menu */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-black font-['Montserrat'] text-gradient">PathwiseROI</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#features"
              className="text-muted-foreground hover:text-primary transition-colors font-['Open_Sans']"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-muted-foreground hover:text-primary transition-colors font-['Open_Sans']"
            >
              How It Works
            </a>
            <a
              href="#premium"
              className="text-muted-foreground hover:text-primary transition-colors font-['Open_Sans']"
            >
              Premium
            </a>
          </nav>

          <div className="flex items-center space-x-2">
            <Button variant="outline" className="hidden sm:flex font-['Open_Sans'] bg-transparent">
              Sign In
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden bg-transparent">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  <a
                    href="#features"
                    className="text-lg font-['Open_Sans'] text-foreground hover:text-primary transition-colors py-2"
                  >
                    Features
                  </a>
                  <a
                    href="#how-it-works"
                    className="text-lg font-['Open_Sans'] text-foreground hover:text-primary transition-colors py-2"
                  >
                    How It Works
                  </a>
                  <a
                    href="#premium"
                    className="text-lg font-['Open_Sans'] text-foreground hover:text-primary transition-colors py-2"
                  >
                    Premium
                  </a>
                  <div className="pt-4 border-t">
                    <Button className="w-full font-['Open_Sans']">Sign In</Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Mobile-optimized hero section with better spacing and typography */}
      <section className="container mx-auto px-4 py-12 sm:py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4 sm:mb-6 animate-pulse-glow">
            <Zap className="w-4 h-4 mr-2" />
            Trusted by 50,000+ students
          </Badge>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black font-['Montserrat'] mb-4 sm:mb-6 leading-tight px-2">
            Unlock Your <span className="text-gradient">Education's Value</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 sm:mb-8 font-['Open_Sans'] max-w-3xl mx-auto leading-relaxed px-4">
            Calculate your ROI and make informed decisions about your future. See exactly when your education investment
            pays off.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4">
            <Link href="/calculator" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 font-['Open_Sans'] font-semibold animate-pulse-glow min-h-[48px]"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Calculate Your Path
              </Button>
            </Link>

            <Link href="/compare" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 font-['Open_Sans'] font-semibold hover:bg-accent hover:text-accent-foreground transition-all duration-300 bg-transparent min-h-[48px]"
              >
                <Users className="w-5 h-5 mr-2" />
                Compare Paths
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Mobile-optimized key metrics with better grid layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-primary/20">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-3 mx-auto">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-center font-['Montserrat'] font-bold text-base sm:text-lg">
                  Breakeven Time
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-2xl sm:text-3xl font-black font-['Montserrat'] text-accent mb-2">2.3 years</div>
                <CardDescription className="font-['Open_Sans'] text-sm">
                  Average time to recoup investment
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-primary/20">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3 mx-auto">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-center font-['Montserrat'] font-bold text-base sm:text-lg">
                  10-Year Net Worth
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-2xl sm:text-3xl font-black font-['Montserrat'] text-primary mb-2">$847K</div>
                <CardDescription className="font-['Open_Sans'] text-sm">Projected wealth accumulation</CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-primary/20 sm:col-span-2 lg:col-span-1">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-3 mx-auto">
                  <Target className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-center font-['Montserrat'] font-bold text-base sm:text-lg">
                  ROI Accuracy
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-2xl sm:text-3xl font-black font-['Montserrat'] text-accent mb-2">94%</div>
                <CardDescription className="font-['Open_Sans'] text-sm">Prediction accuracy rate</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="features" className="py-12 sm:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-['Montserrat'] mb-4">
              Make Smarter Education Decisions
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground font-['Open_Sans'] max-w-2xl mx-auto px-4">
              Our comprehensive calculator considers all factors to give you accurate ROI projections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="font-['Montserrat'] font-bold">Comprehensive Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-['Open_Sans'] text-base">
                  Factor in tuition, living costs, opportunity cost, and expected salary growth for accurate
                  projections.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="font-['Montserrat'] font-bold">Visual Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-['Open_Sans'] text-base">
                  See your financial journey with interactive graphs showing debt and profit periods clearly.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 md:col-span-2 lg:col-span-1">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="font-['Montserrat'] font-bold">Path Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-['Open_Sans'] text-base">
                  Compare multiple education options side-by-side to find the best investment for your future.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-['Montserrat'] mb-4 sm:mb-6">
              Ready to Calculate Your Future?
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 font-['Open_Sans'] px-4">
              Join thousands of students who've made smarter education decisions with PathwiseROI
            </p>
            <Link href="/calculator">
              <Button
                size="lg"
                className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 font-['Open_Sans'] font-semibold animate-pulse-glow min-h-[48px]"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Start Calculating Your ROI Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t bg-muted/30 py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-black font-['Montserrat'] text-gradient">PathwiseROI</span>
            </div>
            <div className="text-sm text-muted-foreground font-['Open_Sans'] text-center">
              © 2024 PathwiseROI. Making education decisions smarter.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
