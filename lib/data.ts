import dataJson from './data.json'
import type { EducationPath, SchoolTier, LivingCost, ViralComparison } from './types'

export const educationPaths = dataJson.educationPaths as Record<string, EducationPath>
export const locationMultipliers = dataJson.locationMultipliers
export const schoolTiers = dataJson.schoolTiers as Record<string, SchoolTier>
export const livingCosts = dataJson.livingCosts as Record<string, LivingCost>
export const viralComparisons = dataJson.viralComparisons as ViralComparison[]

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
