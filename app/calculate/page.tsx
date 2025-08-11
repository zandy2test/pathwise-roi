'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { calculateROI } from '@/lib/calculator'
import { validateCalculatorInputs } from '@/lib/validation'
import { educationPaths, locationMultipliers, schoolTiers, livingCosts } from '@/lib/data'
import type { CalculatorInputs, CalculationResult } from '@/lib/types'
import { ArrowRight, AlertCircle, TrendingUp, Calendar, DollarSign } from 'lucide-react'

export default function CalculatePage() {
  const router = useRouter()
  const [inputs, setInputs] = useState<CalculatorInputs>({
    path: '',
    location: '',
    schoolTier: '',
    livingCost: '',
    scholarships: 0
  })
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [errors, setErrors] = useState<string[]>([])

  const handleCalculate = () => {
    const validationErrors = validateCalculatorInputs(inputs)
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      setResult(null)
      return
    }
    
    setErrors([])
    const calculationResult = calculateROI(inputs)
    setResult(calculationResult)
  }

  const handleCompare = () => {
    const params = new URLSearchParams({
      path1: inputs.path,
      location1: inputs.location,
      schoolTier1: inputs.schoolTier,
      livingCost1: inputs.livingCost,
      scholarships1: inputs.scholarships?.toString() || '0'
    })
    router.push(`/compare?${params.toString()}`)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Calculate Your Education ROI</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Enter your details to see when your education investment pays off
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle>Your Education Path</CardTitle>
            <CardDescription>Select your education and personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="path">Education Path</Label>
              <Select value={inputs.path} onValueChange={(value) => setInputs({...inputs, path: value})}>
                <SelectTrigger id="path">
                  <SelectValue placeholder="Select education path" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(educationPaths).map(([key, path]) => (
                    <SelectItem key={key} value={key}>
                      {path.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Your Location</Label>
              <Select value={inputs.location} onValueChange={(value) => setInputs({...inputs, location: value})}>
                <SelectTrigger id="location">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(locationMultipliers).map((location) => (
                    <SelectItem key={location} value={location}>
                      {location.replace(/_/g, ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="schoolTier">School Quality</Label>
              <Select value={inputs.schoolTier} onValueChange={(value) => setInputs({...inputs, schoolTier: value})}>
                <SelectTrigger id="schoolTier">
                  <SelectValue placeholder="Select school tier" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(schoolTiers).map(([key, tier]) => (
                    <SelectItem key={key} value={key}>
                      {tier.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="livingCost">Living Situation</Label>
              <Select value={inputs.livingCost} onValueChange={(value) => setInputs({...inputs, livingCost: value})}>
                <SelectTrigger id="livingCost">
                  <SelectValue placeholder="Select living situation" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(livingCosts).map(([key, cost]) => (
                    <SelectItem key={key} value={key}>
                      {cost.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="scholarships">Scholarships/Aid ($)</Label>
              <Input
                id="scholarships"
                type="number"
                placeholder="0"
                value={inputs.scholarships || ''}
                onChange={(e) => setInputs({...inputs, scholarships: parseFloat(e.target.value) || 0})}
              />
            </div>

            {errors.length > 0 && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                {errors.map((error, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                ))}
              </div>
            )}

            <Button onClick={handleCalculate} className="w-full">
              Calculate ROI
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-6">
          {result && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Your Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Total Cost</p>
                      <p className="text-2xl font-bold">${result.totalCost.toLocaleString()}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Net Cost</p>
                      <p className="text-2xl font-bold">${result.adjustedCost.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <p className="text-sm font-medium">Breakeven Time</p>
                    </div>
                    <p className="text-3xl font-bold text-primary">
                      {result.breakevenMonths > 120 ? 'Never' : `${result.breakevenMonths} months`}
                    </p>
                    {result.breakevenMonths <= 120 && (
                      <p className="text-sm text-muted-foreground">
                        ({Math.floor(result.breakevenMonths / 12)} years {result.breakevenMonths % 12} months)
                      </p>
                    )}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <p className="text-sm font-medium">Monthly Salary</p>
                    </div>
                    <p className="text-2xl font-bold">${Math.round(result.monthlySalary).toLocaleString()}</p>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <p className="text-sm font-medium">10-Year Net Worth</p>
                    </div>
                    <p className="text-2xl font-bold text-green-600">
                      ${result.netWorth10Years.toLocaleString()}
                    </p>
                  </div>

                  {result.doubtScore > 50 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                        <p className="text-sm font-medium text-yellow-900">Risk Alert</p>
                      </div>
                      <p className="text-sm text-yellow-800">{result.riskText}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <Button onClick={handleCompare} className="w-full" variant="outline">
                    Compare with Another Path
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
