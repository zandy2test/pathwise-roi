import dataJson from './data.json'
import hierarchicalData from './data-hierarchical.json'
import type { EducationPath, SchoolTier, LivingCost, ViralComparison } from './types'

export const educationPaths = dataJson.educationPaths as Record<string, EducationPath>
export const locationMultipliers = dataJson.locationMultipliers
export const schoolTiers = dataJson.schoolTiers as Record<string, SchoolTier>
export const livingCosts = dataJson.livingCosts as Record<string, LivingCost>
export const viralComparisons = dataJson.viralComparisons as ViralComparison[]

// Hierarchical data exports
export const educationTypes = hierarchicalData.educationTypes
export const pathMappings = hierarchicalData.pathMappings

export function getEducationPath(pathKey: string): EducationPath | undefined {
  return educationPaths[pathKey]
}

export function getLocationMultiplier(location: string): number {
  return (locationMultipliers as any)[location] || 1.0
}

export function getSchoolTier(tier: string): SchoolTier {
  return schoolTiers[tier] || schoolTiers.standard
}

export function getLivingCost(costType: string): LivingCost {
  return livingCosts[costType] || livingCosts.home
}

// Hierarchical data functions
export function getEducationTypeOptions() {
  return Object.entries(educationTypes).map(([key, type]) => ({
    value: key,
    label: type.name
  }))
}

export function getFieldOptions(educationType: string) {
  const type = educationTypes[educationType as keyof typeof educationTypes]
  if (!type) return []
  
  return Object.entries(type.fields).map(([key, field]) => ({
    value: key,
    label: field.name
  }))
}

export function getProgramOptions(educationType: string, field: string) {
  const type = educationTypes[educationType as keyof typeof educationTypes]
  if (!type) return []
  
  const fieldData = type.fields[field as keyof typeof type.fields]
  if (!fieldData) return []
  
  // Determine the property name (degrees, programs, etc.)
  const programsKey = 'degrees' in fieldData ? 'degrees' : 'programs'
  const programs = fieldData[programsKey as keyof typeof fieldData] as any
  
  if (!programs) return []
  
  return Object.entries(programs).map(([key, program]: [string, any]) => ({
    value: key,
    label: program.name
  }))
}

export function getEducationPathFromHierarchy(educationType: string, field: string, program: string): EducationPath | undefined {
  const type = educationTypes[educationType as keyof typeof educationTypes]
  if (!type) return undefined
  
  const fieldData = type.fields[field as keyof typeof type.fields]
  if (!fieldData) return undefined
  
  // Determine the property name (degrees, programs, etc.)
  const programsKey = 'degrees' in fieldData ? 'degrees' : 'programs'
  const programs = fieldData[programsKey as keyof typeof fieldData] as any
  
  if (!programs) return undefined
  
  return programs[program]
}

export function getPathFromMapping(path: string) {
  return pathMappings[path as keyof typeof pathMappings]
}

export function buildPathKey(educationType: string, field: string, program: string): string | undefined {
  // Find the key that matches this combination
  for (const [key, mapping] of Object.entries(pathMappings)) {
    if (mapping.type === educationType && mapping.field === field && mapping.program === program) {
      return key
    }
  }
  return undefined
}
