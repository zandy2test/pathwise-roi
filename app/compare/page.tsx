'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { comparePaths } from '@/lib/calculator'
import { validateCalculatorInputs } from '@/lib/validation'
import { educationPaths, locationMultipliers, schoolTiers, livingCosts } from '@/lib/data'
import type { CalculatorInputs } from '@/lib/types'
import { AlertCircle, TrendingUp, Calendar, DollarSign, Trophy } from 'lucide-react'

export default function ComparePage() {
  const searchParams = useSearchParams()
  
  const [inputs1, setInputs1] = useState<CalculatorInputs>({
    path: searchParams.get('path1') || '',
    location: searchParams.get('location1') || '',
    schoolTier: searchParams.get('schoolTier1') || '',
    livingCost: searchParams.get('livingCost1') || '',
    scholarships: parseFloat(searchParams.get('scholarships1') || '0') || 0
  })
  
  const [inputs2, setInputs2] = useState<CalculatorInputs>({
    path: searchParams.get('path2') || '',
    location: searchParams.get('location2') || '',
    schoolTier: searchParams.get('schoolTier2') || '',
    livingCost: searchParams.get('livingCost2') || '',
    scholarships: parseFloat(searchParams.get('scholarships2') || '0') || 0
  })
  
  const [comparison, setComparison] = useState<ReturnType<typeof comparePaths> | null>(null)
  const [errors1, setErrors1] = useState<string[]>([])
  const [errors2, setErrors2] = useState<string[]>([])

  const handleCompare = () => {
    const validationErrors1 = validateCalculatorInputs(inputs1)
    const validationErrors2 = validateCalculatorInputs(inputs2)
    
    setErrors1(validationErrors1)
    setErrors2(validationErrors2)
    
    if (validationErrors1.length > 0 || validationErrors2.length > 0) {
      setComparison(null)
      return
    }
    
    const result = comparePaths(inputs1, inputs2)
    setComparison(result)
  }

  // Auto-compare if we have all params from URL
  useEffect(() => {
    if (inputs1.path && inputs1.location && inputs1.schoolTier && inputs1.livingCost &&
        inputs2.path && inputs2.location && inputs2.schoolTier && inputs2.livingCost) {
      handleCompare()
    }
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Compare Education Paths</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Compare two different education paths side by side
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Path 1 Form */}
        <Card>
          <CardHeader>
            <CardTitle>Path 1</CardTitle>
            <CardDescription>First education path</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Education Path</Label>
              <Select value={inputs1.path} onValueChange={(value) => setInputs1({...inputs1, path: value})}>
                <SelectTrigger>
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
              <Label>Location</Label>
              <Select value={inputs1.location} onValueChange={(value) => setInputs1({...inputs1, location: value})}>
                <SelectTrigger>
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
              <Label>School Quality</Label>
              <Select value={inputs1.schoolTier} onValueChange={(value) => setInputs1({...inputs1, schoolTier: value})}>
                <SelectTrigger>
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
              <Label>Living Situation</Label>
              <Select value={inputs1.livingCost} onValueChange={(value) => setInputs1({...inputs1, livingCost: value})}>
                <SelectTrigger>
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
              <Label>Scholarships/Aid ($)</Label>
              <Input
                type="number"
                placeholder="0"
                value={inputs1.scholarships || ''}
                onChange={(e) => setInputs1({...inputs1, scholarships: parseFloat(e.target.value) || 0})}
              />
            </div>

            {errors1.length > 0 && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                {errors1.map((error, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Path 2 Form */}
        <Card>
          <CardHeader>
            <CardTitle>Path 2</CardTitle>
            <CardDescription>Second education path</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Education Path</Label>
              <Select value={inputs2.path} onValueChange={(value) => setInputs2({...inputs2, path: value})}>
                <SelectTrigger>
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
              <Label>Location</Label>
              <Select value={inputs2.location} onValueChange={(value) => setInputs2({...inputs2, location: value})}>
                <SelectTrigger>
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
              <Label>School Quality</Label>
              <Select value={inputs2.schoolTier} onValueChange={(value) => setInputs2({...inputs2, schoolTier: value})}>
                <SelectTrigger>
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
              <Label>Living Situation</Label>
              <Select value={inputs2.livingCost} onValueChange={(value) => setInputs2({...inputs2, livingCost: value})}>
                <SelectTrigger>
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
              <Label>Scholarships/Aid ($)</Label>
              <Input
                type="number"
                placeholder="0"
                value={inputs2.scholarships || ''}
                onChange={(e) => setInputs2({...inputs2, scholarships: parseFloat(e.target.value) || 0})}
              />
            </div>

            {errors2.length > 0 && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                {errors2.map((error, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <Button onClick={handleCompare} className="w-full" size="lg">
          Compare Paths
        </Button>
      </div>

      {/* Comparison Results */}
      {comparison && comparison.result1 && comparison.result2 && (
        <div className="space-y-6">
          {/* Winner Card */}
          {comparison.winner && (
            <Card className="border-primary">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-primary" />
                  <CardTitle>Winner: Path {comparison.winner === 'path1' ? '1' : '2'}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-lg">
                  Breaks even <span className="font-bold text-primary">{comparison.differenceMonths} months faster</span> and 
                  generates <span className="font-bold text-primary">${comparison.differenceAmount.toLocaleString()}</span> more 
                  wealth over 10 years
                </p>
              </CardContent>
            </Card>
          )}

          {/* Side by Side Comparison */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className={comparison.winner === 'path1' ? 'border-primary' : ''}>
              <CardHeader>
                <CardTitle>Path 1: {educationPaths[inputs1.path]?.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Cost</p>
                    <p className="text-xl font-bold">${comparison.result1.totalCost.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Net Cost</p>
                    <p className="text-xl font-bold">${comparison.result1.adjustedCost.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-4 w-4" />
                    <p className="text-sm text-muted-foreground">Breakeven</p>
                  </div>
                  <p className="text-2xl font-bold">
                    {comparison.result1.breakevenMonths > 120 ? 'Never' : `${comparison.result1.breakevenMonths} months`}
                  </p>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="h-4 w-4" />
                    <p className="text-sm text-muted-foreground">10-Year Net Worth</p>
                  </div>
                  <p className="text-2xl font-bold text-green-600">
                    ${comparison.result1.netWorth10Years.toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className={comparison.winner === 'path2' ? 'border-primary' : ''}>
              <CardHeader>
                <CardTitle>Path 2: {educationPaths[inputs2.path]?.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Cost</p>
                    <p className="text-xl font-bold">${comparison.result2.totalCost.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Net Cost</p>
                    <p className="text-xl font-bold">${comparison.result2.adjustedCost.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-4 w-4" />
                    <p className="text-sm text-muted-foreground">Breakeven</p>
                  </div>
                  <p className="text-2xl font-bold">
                    {comparison.result2.breakevenMonths > 120 ? 'Never' : `${comparison.result2.breakevenMonths} months`}
                  </p>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="h-4 w-4" />
                    <p className="text-sm text-muted-foreground">10-Year Net Worth</p>
                  </div>
                  <p className="text-2xl font-bold text-green-600">
                    ${comparison.result2.netWorth10Years.toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
