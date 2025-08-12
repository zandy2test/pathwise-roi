'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  educationPaths, 
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

  // Initialize from existing path if available
  useEffect(() => {
    if (inputs.path && !educationType) {
      const mapping = getPathFromMapping(inputs.path)
      if (mapping) {
        setEducationType(mapping.type)
        setField(mapping.field)
        setProgram(mapping.program)
      }
    }
  }, [inputs.path, educationType])

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
    setProgram(value)
    const pathKey = buildPathKey(educationType, field, value)
    setInputs({
      ...inputs,
      program: value,
      path: pathKey || ''
    })
  }

  const educationTypeOptions = getEducationTypeOptions()
  const fieldOptions = educationType ? getFieldOptions(educationType) : []
  const programOptions = educationType && field ? getProgramOptions(educationType, field) : []
  return (
    <TooltipProvider>
      <div className="space-y-4">
        {title && (
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
        )}
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="educationType">Education Type</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-3 w-3 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">Choose your type of education, from traditional college to trade schools and bootcamps</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Select value={educationType} onValueChange={handleEducationTypeChange}>
            <SelectTrigger>
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
              <Label htmlFor="field">Field of Study</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">Select your specific field of study or specialization</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Select value={field} onValueChange={handleFieldChange}>
              <SelectTrigger>
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
              <Label htmlFor="program">Program/Degree</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">Select the specific program or degree level</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Select value={program} onValueChange={handleProgramChange}>
              <SelectTrigger>
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
            <Label htmlFor="location">Your Location</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-3 w-3 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">Location affects both education costs and future salary potential</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Select value={inputs.location} onValueChange={(value) => setInputs({...inputs, location: value})}>
            <SelectTrigger>
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

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="schoolTier">School Quality</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-3 w-3 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">Higher-tier schools cost more but may lead to better salary outcomes</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Select value={inputs.schoolTier} onValueChange={(value) => setInputs({...inputs, schoolTier: value})}>
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
          <div className="flex items-center gap-2">
            <Label htmlFor="livingCost">Living Situation</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-3 w-3 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">Living expenses during education significantly impact total cost</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Select value={inputs.livingCost} onValueChange={(value) => setInputs({...inputs, livingCost: value})}>
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
          <div className="flex items-center gap-2">
            <Label htmlFor="scholarships">Scholarships/Aid ($)</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-3 w-3 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">Total financial aid, grants, and scholarships you expect to receive</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input
            type="number"
            placeholder="0"
            value={inputs.scholarships || ''}
            onChange={(e) => setInputs({...inputs, scholarships: parseFloat(e.target.value) || 0})}
            max={100000}
          />
          <p className="text-xs text-muted-foreground">Maximum: $100,000</p>
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
    </TooltipProvider>
  )
}
