'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  locationMultipliers, 
  schoolTiers, 
  livingCosts,
  getEducationTypeOptions,
  getFieldOptions,
  getProgramOptions,
  buildPathKey,
  getPathFromMapping
} from '@/lib/data'
import type { CalculatorInputs } from '@/lib/types'
import { AlertCircle, HelpCircle } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import analytics from '@/lib/analytics'

// Region options for "Other" location
const regions = [
  { value: 'midwest', label: 'Midwest (e.g., Ohio, Michigan)', multiplier: 0.85 },
  { value: 'south', label: 'South (e.g., Texas, Florida)', multiplier: 0.90 },
  { value: 'northeast', label: 'Northeast (e.g., Boston, NYC suburbs)', multiplier: 1.15 },
  { value: 'west', label: 'West (e.g., Denver, Portland)', multiplier: 1.10 },
  { value: 'rural', label: 'Rural/Small Town', multiplier: 0.75 },
  { value: 'international', label: 'International', multiplier: 1.0 }
]

// Degree level options
const degreeLevels = [
  { value: 'bachelors', label: 'Bachelor\'s Degree', years: 4 },
  { value: 'masters', label: 'Master\'s Degree', years: 6 },
  { value: 'phd', label: 'PhD/Doctorate', years: 8 }
]

interface PathBuilderProps {
  inputs: CalculatorInputs
  setInputs: (inputs: CalculatorInputs) => void
  errors?: string[]
  title?: string
  description?: string
}

// Properly formatted city names
const formatLocation = (location: string): string => {
  const locationNames: Record<string, string> = {
    'nyc': 'New York City',
    'sf': 'San Francisco',
    'la': 'Los Angeles',
    'chicago': 'Chicago',
    'houston': 'Houston',
    'phoenix': 'Phoenix',
    'philadelphia': 'Philadelphia',
    'atlanta': 'Atlanta',
    'denver': 'Denver',
    'seattle': 'Seattle'
  }
  return locationNames[location] || location
}

export default function PathBuilder({ 
  inputs, 
  setInputs, 
  errors = [], 
  title = "Education Path",
  description = "Select your education and personal details"
}: PathBuilderProps) {
  const [educationType, setEducationType] = useState<string>(inputs.educationType || '')
  const [field, setField] = useState<string>(inputs.field || '')
  const [program, setProgram] = useState<string>(inputs.program || '')

  // Initialize from existing path if available AND reset when path is cleared
  useEffect(() => {
    // When path is set directly (e.g., from comparison cards)
    if (inputs.path) {
      const mapping = getPathFromMapping(inputs.path)
      if (mapping) {
        // Only update if values are different to avoid infinite loops
        if (mapping.type !== educationType || mapping.field !== field || mapping.program !== program) {
          setEducationType(mapping.type)
          setField(mapping.field)
          setProgram(mapping.program)
        }
      }
    } 
    // When inputs are cleared (path is empty)
    else if (!inputs.path && !inputs.educationType && !inputs.field && !inputs.program) {
      // Only clear if currently has values
      if (educationType || field || program) {
        setEducationType('')
        setField('')
        setProgram('')
      }
    }
    // When education type is set from inputs but not local state
    else if (inputs.educationType && !educationType) {
      setEducationType(inputs.educationType)
    }
    // When field is set from inputs but not local state
    else if (inputs.field && !field) {
      setField(inputs.field)
    }
    // When program is set from inputs but not local state
    else if (inputs.program && !program) {
      setProgram(inputs.program)
    }
  }, [inputs.path, inputs.educationType, inputs.field, inputs.program])

  // Update the path when selections change
  useEffect(() => {
    if (educationType && field && program) {
      const pathKey = buildPathKey(educationType, field, program)
      if (pathKey && pathKey !== inputs.path) {
        setInputs({
          ...inputs,
          path: pathKey,
          educationType,
          field,
          program
        })
      }
    }
  }, [educationType, field, program, inputs, setInputs])

  const handleEducationTypeChange = (value: string) => {
    // Track analytics
    if (educationType) {
      analytics.pathChanged(educationType, value, 1)
    } else {
      analytics.pathSelected(value)
    }
    
    setEducationType(value)
    setField('') // Reset field when education type changes
    setProgram('') // Reset program when education type changes
    setInputs({
      ...inputs,
      educationType: value,
      field: '',
      program: '',
      path: '' // Clear path until all selections are made
    })
  }

  const handleFieldChange = (value: string) => {
    // Track analytics
    if (field) {
      analytics.pathChanged(field, value, 2)
    } else {
      analytics.pathSelected(educationType, value)
    }
    
    setField(value)
    setProgram('') // Reset program when field changes
    setInputs({
      ...inputs,
      field: value,
      program: '',
      path: '' // Clear path until all selections are made
    })
  }

  const handleProgramChange = (value: string) => {
    // Track analytics
    if (program) {
      analytics.pathChanged(program, value, 3)
    } else {
      analytics.pathSelected(educationType, field, value)
    }
    
    setProgram(value)
    const pathKey = buildPathKey(educationType, field, value)
    setInputs({
      ...inputs,
      program: value,
      path: pathKey || ''
    })
    
    // Track funnel completion when all selections are made
    if (pathKey) {
      analytics.funnelStep(3, 'Program Selected', true)
    }
  }

  const educationTypeOptions = getEducationTypeOptions()
  const fieldOptions = educationType ? getFieldOptions(educationType) : []
  const programOptions = educationType && field ? getProgramOptions(educationType, field) : []
  return (
    <div className="space-y-4">
      {title && (
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="educationType" className="text-gray-900">Education Type</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-3 w-3 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">Choose your type of education, from traditional college to trade schools and bootcamps</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
          <Select value={educationType} onValueChange={handleEducationTypeChange}>
            <SelectTrigger data-testid="education-type-select">
              <SelectValue placeholder="Select education type" />
            </SelectTrigger>
            <SelectContent>
              {educationTypeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

      {educationType && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="field" className="text-gray-900">Field of Study</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">Select your specific field of study or specialization</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
            <Select value={field} onValueChange={handleFieldChange}>
              <SelectTrigger data-testid="field-select">
                <SelectValue placeholder="Select field of study" />
              </SelectTrigger>
              <SelectContent>
                {fieldOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

      {educationType && field && programOptions.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="program" className="text-gray-900">Program/Degree</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">Select the specific program or degree level</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
            <Select value={program} onValueChange={handleProgramChange}>
              <SelectTrigger data-testid="program-select">
                <SelectValue placeholder="Select program" />
              </SelectTrigger>
              <SelectContent>
                {programOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="location" className="text-gray-900">Your Location</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-3 w-3 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">Location affects both education costs and future salary potential</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
          <Select value={inputs.location} onValueChange={(value) => {
            analytics.featureEngagement('location', value)
            setInputs({...inputs, location: value})
          }}>
            <SelectTrigger data-testid="location-select">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(locationMultipliers).map((location) => (
                <SelectItem key={location} value={location}>
                  {formatLocation(location)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

      {/* Regional Selector - Shows when location is "Other" */}
      {inputs.location === 'Other' && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="region" className="text-gray-900">Select Region</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">Select your region for more accurate cost and salary estimates</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
            <Select value={inputs.region || ''} onValueChange={(value) => {
              analytics.featureEngagement('region', value)
              setInputs({...inputs, region: value})
            }}>
              <SelectTrigger data-testid="region-select">
                <SelectValue placeholder="Select your region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region.value} value={region.value}>
                    {region.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="schoolTier" className="text-gray-900">School Quality</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-3 w-3 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">Higher-tier schools cost more but may lead to better salary outcomes</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
          <Select value={inputs.schoolTier} onValueChange={(value) => {
            analytics.featureEngagement('schoolTier', value)
            setInputs({...inputs, schoolTier: value})
          }}>
            <SelectTrigger data-testid="school-tier-select">
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
        <div className="flex items-center gap-2">
          <Label htmlFor="livingCost" className="text-gray-900">Living Situation</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-3 w-3 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">Living expenses during education significantly impact total cost</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
          <Select value={inputs.livingCost} onValueChange={(value) => {
            analytics.featureEngagement('livingCost', value)
            setInputs({...inputs, livingCost: value})
          }}>
            <SelectTrigger data-testid="living-cost-select">
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

      {/* Degree Level Selector - New Field */}
      {educationType === 'college' && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="degreeLevel" className="text-gray-900">Degree Level</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">Select your target degree level. Higher degrees take longer but may lead to better salaries</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
            <Select value={inputs.degreeLevel || 'bachelors'} onValueChange={(value) => {
              analytics.featureEngagement('degreeLevel', value)
              setInputs({...inputs, degreeLevel: value})
            }}>
              <SelectTrigger data-testid="degree-level-select">
                <SelectValue placeholder="Select degree level" />
              </SelectTrigger>
              <SelectContent>
                {degreeLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label} ({level.years} years)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="scholarships" className="text-gray-900">Scholarships/Aid ($)</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-3 w-3 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">Total financial aid, grants, and scholarships you expect to receive. Maximum: $100,000</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
          <Input
            type="number"
            placeholder="0"
            value={inputs.scholarships || ''}
            onChange={(e) => {
              const value = parseFloat(e.target.value) || 0
              analytics.costEntered('scholarships', value, inputs.path || 'unknown')
              setInputs({...inputs, scholarships: value})
            }}
            onBlur={() => {
              // Track when user finishes entering scholarships
              if (inputs.scholarships) {
                analytics.featureEngagement('scholarships', 'completed')
              }
            }}
            max={100000}
            data-testid="scholarships-input"
          />
        </div>

      {/* Loan Interest Rate Field - New Field */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="loanRate" className="text-gray-900">Student Loan Interest Rate (%)</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-3 w-3 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">Enter the interest rate for student loans. Average federal loan rate is 5-7%, private loans 4-15%</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
          <Input
            id="loanRate"
            type="number"
            min="0"
            max="30"
            step="0.5"
            placeholder="7"
            value={inputs.loanInterestRate ?? 7}
            onChange={(e) => {
              let value = parseFloat(e.target.value) || 0
              // Cap the value at 30% max
              if (value > 30) {
                value = 30
                e.target.value = '30'
              }
              if (value < 0) {
                value = 0
                e.target.value = '0'
              }
              analytics.featureEngagement('loanInterestRate', value.toString())
              setInputs({...inputs, loanInterestRate: value})
            }}
            data-testid="loan-rate-input"
          />
          <p className="text-sm text-gray-600 mt-1">
            Average federal loan rate is 5-7%, private loans 4-15%
          </p>
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
    </div>
  )
}
