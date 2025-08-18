"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PathBuilder } from "@/components/path-builder"
import { ROITimeline } from "@/components/roi-timeline"
import { calculateROI } from "@/lib/calculator"
import type { CalculationInput, ROIResult } from "@/lib/types"
import { TrendingUp, Clock, DollarSign, Target, ArrowRight, Zap, CheckCircle } from "lucide-react"

interface ComparisonData {
  input: CalculationInput
  result: ROIResult | null
  label: string
}

export function PathComparison() {
  const [pathA, setPathA] = useState<ComparisonData>({
    input: {
      educationPath: "",
      educationType: "",
      livingExpenses: 15000,
      currentSalary: 35000,
      location: "",
      hasScholarship: false,
      scholarshipAmount: 0,
    },
    result: null,
    label: "Path A",
  })

  const [pathB, setPathB] = useState<ComparisonData>({
    input: {
      educationPath: "",
      educationType: "",
      livingExpenses: 15000,
      currentSalary: 35000,
      location: "",
      hasScholarship: false,
      scholarshipAmount: 0,
    },
    result: null,
    label: "Path B",
  })

  const [activeTab, setActiveTab] = useState("pathA")
  const [isCalculating, setIsCalculating] = useState(false)

  const handlePathChange = (pathKey: "pathA" | "pathB", educationType: string, educationPath: string) => {
    const setter = pathKey === "pathA" ? setPathA : setPathB
    setter((prev) => ({
      ...prev,
      input: {
        ...prev.input,
        educationType,
        educationPath,
      },
    }))
  }

  const handleInputChange = (pathKey: "pathA" | "pathB", field: keyof CalculationInput, value: any) => {
    const setter = pathKey === "pathA" ? setPathA : setPathB
    setter((prev) => ({
      ...prev,
      input: {
        ...prev.input,
        [field]: value,
      },
    }))
  }

  const calculateBoth = async () => {
    if (
      !pathA.input.educationType ||
      !pathA.input.educationPath ||
      !pathB.input.educationType ||
      !pathB.input.educationPath
    ) {
      return
    }

    setIsCalculating(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const resultA = calculateROI(pathA.input)
      const resultB = calculateROI(pathB.input)

      setPathA((prev) => ({ ...prev, result: resultA }))
      setPathB((prev) => ({ ...prev, result: resultB }))
    } catch (error) {
      console.error("Comparison calculation error:", error)
    } finally {
      setIsCalculating(false)
    }
  }

  const canCompare =
    pathA.input.educationType && pathA.input.educationPath && pathB.input.educationType && pathB.input.educationPath

  const formatCurrency = (value: number) => {
    if (Math.abs(value) >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`
    }
    if (Math.abs(value) >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`
    }
    return `$${value.toLocaleString()}`
  }

  const ComparisonMetric = ({
    label,
    valueA,
    valueB,
    formatter = (v: number) => v.toString(),
    icon: Icon,
    higherIsBetter = true,
  }: {
    label: string
    valueA: number
    valueB: number
    formatter?: (value: number) => string
    icon: any
    higherIsBetter?: boolean
  }) => {
    const aIsBetter = higherIsBetter ? valueA > valueB : valueA < valueB
    const bIsBetter = higherIsBetter ? valueB > valueA : valueB < valueA

    return (
      <div className="grid grid-cols-3 gap-4 items-center py-4 border-b border-border last:border-b-0">
        <div className="flex items-center space-x-2">
          <Icon className="w-5 h-5 text-muted-foreground" />
          <span className="font-['Open_Sans'] font-medium">{label}</span>
        </div>

        <div className="text-center">
          <div className={`text-lg font-black font-['Montserrat'] ${aIsBetter ? "text-accent" : "text-foreground"}`}>
            {formatter(valueA)}
          </div>
          {aIsBetter && <CheckCircle className="w-4 h-4 text-accent mx-auto mt-1" />}
        </div>

        <div className="text-center">
          <div className={`text-lg font-black font-['Montserrat'] ${bIsBetter ? "text-accent" : "text-foreground"}`}>
            {formatter(valueB)}
          </div>
          {bIsBetter && <CheckCircle className="w-4 h-4 text-accent mx-auto mt-1" />}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Mobile-First Tabs for Path Selection */}
      <div className="lg:hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pathA" className="font-['Open_Sans']">
              Path A
            </TabsTrigger>
            <TabsTrigger value="pathB" className="font-['Open_Sans']">
              Path B
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pathA" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-['Montserrat'] font-bold">Path A - Education Details</CardTitle>
                <CardDescription className="font-['Open_Sans']">Configure your first education option</CardDescription>
              </CardHeader>
              <CardContent>
                <PathBuilder
                  onPathChange={(type, path) => handlePathChange("pathA", type, path)}
                  selectedType={pathA.input.educationType}
                  selectedPath={pathA.input.educationPath}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pathB" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-['Montserrat'] font-bold">Path B - Education Details</CardTitle>
                <CardDescription className="font-['Open_Sans']">Configure your second education option</CardDescription>
              </CardHeader>
              <CardContent>
                <PathBuilder
                  onPathChange={(type, path) => handlePathChange("pathB", type, path)}
                  selectedType={pathB.input.educationType}
                  selectedPath={pathB.input.educationPath}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Desktop Side-by-Side Layout */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-['Montserrat'] font-bold">Path A - Education Details</CardTitle>
            <CardDescription className="font-['Open_Sans']">Configure your first education option</CardDescription>
          </CardHeader>
          <CardContent>
            <PathBuilder
              onPathChange={(type, path) => handlePathChange("pathA", type, path)}
              selectedType={pathA.input.educationType}
              selectedPath={pathA.input.educationPath}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-['Montserrat'] font-bold">Path B - Education Details</CardTitle>
            <CardDescription className="font-['Open_Sans']">Configure your second education option</CardDescription>
          </CardHeader>
          <CardContent>
            <PathBuilder
              onPathChange={(type, path) => handlePathChange("pathB", type, path)}
              selectedType={pathB.input.educationType}
              selectedPath={pathB.input.educationPath}
            />
          </CardContent>
        </Card>
      </div>

      {/* Compare Button */}
      <div className="text-center">
        <Button
          onClick={calculateBoth}
          disabled={!canCompare || isCalculating}
          size="lg"
          className="px-8 py-6 text-lg font-['Open_Sans'] font-semibold animate-pulse-glow"
        >
          {isCalculating ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Comparing Paths...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5 mr-2" />
              Compare These Paths
              <ArrowRight className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
      </div>

      {/* Comparison Results */}
      {pathA.result && pathB.result && (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
          {/* Quick Comparison Card */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="font-['Montserrat'] font-bold text-xl">Head-to-Head Comparison</CardTitle>
              <CardDescription className="font-['Open_Sans']">
                See how your education paths stack up against each other
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-4 items-center pb-4 border-b border-border">
                  <div className="font-['Open_Sans'] font-semibold text-muted-foreground">Metric</div>
                  <div className="text-center font-['Montserrat'] font-bold text-primary">Path A</div>
                  <div className="text-center font-['Montserrat'] font-bold text-primary">Path B</div>
                </div>

                <ComparisonMetric
                  label="Breakeven Time"
                  valueA={pathA.result.breakEvenTime}
                  valueB={pathB.result.breakEvenTime}
                  formatter={(v) => `${v.toFixed(1)} years`}
                  icon={Clock}
                  higherIsBetter={false}
                />

                <ComparisonMetric
                  label="10-Year Net Worth"
                  valueA={pathA.result.tenYearNetWorth}
                  valueB={pathB.result.tenYearNetWorth}
                  formatter={formatCurrency}
                  icon={DollarSign}
                  higherIsBetter={true}
                />

                <ComparisonMetric
                  label="Total Investment"
                  valueA={pathA.result.totalInvestment}
                  valueB={pathB.result.totalInvestment}
                  formatter={formatCurrency}
                  icon={Target}
                  higherIsBetter={false}
                />

                <ComparisonMetric
                  label="Monthly Cash Flow"
                  valueA={pathA.result.monthlyCashFlow}
                  valueB={pathB.result.monthlyCashFlow}
                  formatter={formatCurrency}
                  icon={TrendingUp}
                  higherIsBetter={true}
                />
              </div>
            </CardContent>
          </Card>

          {/* Winner Badge */}
          <div className="text-center">
            {(() => {
              const aScore =
                pathA.result.tenYearNetWorth -
                pathB.result.tenYearNetWorth +
                (pathB.result.breakEvenTime - pathA.result.breakEvenTime) * 10000
              const winner = aScore > 0 ? "A" : "B"
              const winnerPath = winner === "A" ? pathA : pathB

              return (
                <Badge variant="secondary" className="px-6 py-3 text-lg animate-pulse-glow">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  <span className="font-['Open_Sans'] font-semibold">Path {winner} has the better overall ROI</span>
                </Badge>
              )
            })()}
          </div>

          {/* Timeline Comparisons */}
          <div className="space-y-6">
            <h3 className="text-2xl font-black font-['Montserrat'] text-center">Timeline Comparison</h3>

            <div className="space-y-8">
              <div>
                <h4 className="text-lg font-bold font-['Montserrat'] mb-4 text-primary">Path A Timeline</h4>
                <ROITimeline projections={pathA.result.yearlyProjections} breakEvenTime={pathA.result.breakEvenTime} />
              </div>

              <div>
                <h4 className="text-lg font-bold font-['Montserrat'] mb-4 text-primary">Path B Timeline</h4>
                <ROITimeline projections={pathB.result.yearlyProjections} breakEvenTime={pathB.result.breakEvenTime} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
