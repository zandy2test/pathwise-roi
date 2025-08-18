"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { PathBuilder } from "@/components/path-builder"
import { ROITimeline } from "@/components/roi-timeline"
import { calculateROI, trackEvent } from "@/lib/calculator"
import type { CalculationInput, ROIResult } from "@/lib/types"
import { ArrowLeft, Calculator, TrendingUp, DollarSign, Clock, Target, Share2, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function CalculatorPage() {
  const [input, setInput] = useState<CalculationInput>({
    educationPath: "",
    educationType: "",
    livingExpenses: 15000,
    currentSalary: 35000,
    location: "",
    hasScholarship: false,
    scholarshipAmount: 0,
  })

  const [result, setResult] = useState<ROIResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [showTimeline, setShowTimeline] = useState(false)

  const handlePathChange = (educationType: string, educationPath: string) => {
    setInput((prev) => ({
      ...prev,
      educationType,
      educationPath,
    }))
  }

  const handleCalculate = async () => {
    if (!input.educationType || !input.educationPath) {
      return
    }

    setIsCalculating(true)

    try {
      // Simulate calculation delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const calculationResult = calculateROI(input)
      setResult(calculationResult)

      trackEvent("roi_calculated", {
        educationType: input.educationType,
        educationPath: input.educationPath,
      })
    } catch (error) {
      console.error("Calculation error:", error)
    } finally {
      setIsCalculating(false)
    }
  }

  const canCalculate = input.educationType && input.educationPath

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-['Open_Sans'] hidden sm:inline">Back to Home</span>
              <span className="font-['Open_Sans'] sm:hidden">Back</span>
            </Link>
            <div className="w-px h-6 bg-border"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-black font-['Montserrat'] text-gradient">PathwiseROI</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-['Montserrat'] mb-3 sm:mb-4">
              Calculate Your Education ROI
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground font-['Open_Sans'] max-w-2xl mx-auto px-4">
              Get personalized insights into your education investment and see when it will pay off
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* Input Section */}
            <div className="space-y-4 sm:space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-['Montserrat'] font-bold text-lg sm:text-xl">Education Details</CardTitle>
                  <CardDescription className="font-['Open_Sans'] text-sm sm:text-base">
                    Select your education path to get started
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PathBuilder
                    onPathChange={handlePathChange}
                    selectedType={input.educationType}
                    selectedPath={input.educationPath}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-['Montserrat'] font-bold text-lg sm:text-xl">Financial Details</CardTitle>
                  <CardDescription className="font-['Open_Sans'] text-sm sm:text-base">
                    Help us personalize your calculation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Mobile-optimized form inputs with better touch targets */}
                  <div className="space-y-2">
                    <Label htmlFor="current-salary" className="font-['Open_Sans'] font-medium text-sm sm:text-base">
                      Current Annual Salary
                    </Label>
                    <Input
                      id="current-salary"
                      type="number"
                      value={input.currentSalary}
                      onChange={(e) => setInput((prev) => ({ ...prev, currentSalary: Number(e.target.value) }))}
                      className="h-12 text-base"
                      placeholder="35000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="living-expenses" className="font-['Open_Sans'] font-medium text-sm sm:text-base">
                      Annual Living Expenses During Education
                    </Label>
                    <Input
                      id="living-expenses"
                      type="number"
                      value={input.livingExpenses}
                      onChange={(e) => setInput((prev) => ({ ...prev, livingExpenses: Number(e.target.value) }))}
                      className="h-12 text-base"
                      placeholder="15000"
                    />
                  </div>

                  <div className="flex items-center justify-between py-3 sm:py-2">
                    <div className="space-y-1 flex-1 pr-4">
                      <Label className="font-['Open_Sans'] font-medium text-sm sm:text-base">
                        Do you have a scholarship?
                      </Label>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        This will reduce your total education cost
                      </p>
                    </div>
                    <Switch
                      checked={input.hasScholarship}
                      onCheckedChange={(checked) => setInput((prev) => ({ ...prev, hasScholarship: checked }))}
                    />
                  </div>

                  {input.hasScholarship && (
                    <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                      <Label
                        htmlFor="scholarship-amount"
                        className="font-['Open_Sans'] font-medium text-sm sm:text-base"
                      >
                        Scholarship Amount
                      </Label>
                      <Input
                        id="scholarship-amount"
                        type="number"
                        value={input.scholarshipAmount || 0}
                        onChange={(e) => setInput((prev) => ({ ...prev, scholarshipAmount: Number(e.target.value) }))}
                        className="h-12 text-base"
                        placeholder="10000"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              <Button
                onClick={handleCalculate}
                disabled={!canCalculate || isCalculating}
                size="lg"
                className="w-full h-12 sm:h-14 text-base sm:text-lg font-['Open_Sans'] font-semibold"
              >
                {isCalculating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Calculating Your ROI...
                  </>
                ) : (
                  <>
                    <Calculator className="w-5 h-5 mr-2" />
                    Calculate My ROI
                  </>
                )}
              </Button>
            </div>

            {/* Results Section */}
            <div className="space-y-4 sm:space-y-6">
              {result ? (
                <>
                  <Card className="border-primary/20">
                    <CardHeader>
                      <CardTitle className="font-['Montserrat'] font-bold text-lg sm:text-xl">
                        Your ROI Results
                      </CardTitle>
                      <CardDescription className="font-['Open_Sans'] text-sm sm:text-base">
                        Based on your education path and financial details
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {/* Mobile-optimized results grid with better spacing */}
                      <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <div className="text-center p-3 sm:p-4 rounded-lg bg-accent/10">
                          <Clock className="w-6 sm:w-8 h-6 sm:h-8 text-accent mx-auto mb-2" />
                          <div className="text-lg sm:text-2xl font-black font-['Montserrat'] text-accent">
                            {result.breakEvenTime.toFixed(1)} years
                          </div>
                          <div className="text-xs sm:text-sm text-muted-foreground font-['Open_Sans']">
                            Breakeven Time
                          </div>
                        </div>

                        <div className="text-center p-3 sm:p-4 rounded-lg bg-primary/10">
                          <DollarSign className="w-6 sm:w-8 h-6 sm:h-8 text-primary mx-auto mb-2" />
                          <div className="text-lg sm:text-2xl font-black font-['Montserrat'] text-primary">
                            ${Math.round(result.tenYearNetWorth / 1000)}K
                          </div>
                          <div className="text-xs sm:text-sm text-muted-foreground font-['Open_Sans']">
                            10-Year Net Worth
                          </div>
                        </div>

                        <div className="text-center p-3 sm:p-4 rounded-lg bg-accent/10">
                          <Target className="w-6 sm:w-8 h-6 sm:h-8 text-accent mx-auto mb-2" />
                          <div className="text-lg sm:text-2xl font-black font-['Montserrat'] text-accent">
                            ${Math.round(result.monthlyCashFlow).toLocaleString()}
                          </div>
                          <div className="text-xs sm:text-sm text-muted-foreground font-['Open_Sans']">
                            Monthly Cash Flow
                          </div>
                        </div>

                        <div className="text-center p-3 sm:p-4 rounded-lg bg-primary/10">
                          <TrendingUp className="w-6 sm:w-8 h-6 sm:h-8 text-primary mx-auto mb-2" />
                          <div className="text-lg sm:text-2xl font-black font-['Montserrat'] text-primary">
                            ${Math.round(result.totalInvestment / 1000)}K
                          </div>
                          <div className="text-xs sm:text-sm text-muted-foreground font-['Open_Sans']">
                            Total Investment
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="font-['Montserrat'] font-bold text-lg sm:text-xl">Next Steps</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Button
                          variant="outline"
                          className="w-full justify-start font-['Open_Sans'] bg-transparent h-12"
                          onClick={() => setShowTimeline(!showTimeline)}
                        >
                          <BarChart3 className="w-4 h-4 mr-2" />
                          {showTimeline ? "Hide" : "View"} Detailed Timeline
                        </Button>
                        <Link href="/compare" className="block">
                          <Button
                            variant="outline"
                            className="w-full justify-start font-['Open_Sans'] bg-transparent h-12"
                          >
                            <Target className="w-4 h-4 mr-2" />
                            Compare with Other Paths
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          className="w-full justify-start font-['Open_Sans'] bg-transparent h-12"
                        >
                          <Share2 className="w-4 h-4 mr-2" />
                          Share Your Results
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card className="border-dashed border-2 border-muted-foreground/20">
                  <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12 text-center">
                    <Calculator className="w-12 sm:w-16 h-12 sm:h-16 text-muted-foreground/40 mb-4" />
                    <h3 className="text-base sm:text-lg font-bold font-['Montserrat'] text-muted-foreground mb-2">
                      Ready to Calculate
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground font-['Open_Sans'] max-w-sm px-4">
                      Fill in your education details and financial information to see your personalized ROI analysis
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Enhanced interactive ROI timeline visualization */}
          {result && showTimeline && (
            <div className="animate-in slide-in-from-bottom-4 duration-500">
              <ROITimeline projections={result.yearlyProjections} breakEvenTime={result.breakEvenTime} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
