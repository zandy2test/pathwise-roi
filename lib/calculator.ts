import type { CalculatorInputs, CalculationResult } from './types'
import { getEducationPath, getLocationMultiplier, getSchoolTier, getLivingCost } from './data'

// Regional multipliers for "Other" location
const regionMultipliers: Record<string, number> = {
  'midwest': 0.85,
  'south': 0.90,
  'northeast': 1.15,
  'west': 1.10,
  'rural': 0.75,
  'international': 1.00
}

// Degree level duration adjustments
const degreeLevelAdjustments: Record<string, number> = {
  'bachelors': 1.0,  // Standard 4 years
  'masters': 1.5,    // 6 years total
  'phd': 2.0         // 8 years total
}

export function calculateROI(inputs: CalculatorInputs): CalculationResult | null {
  const path = getEducationPath(inputs.path)
  if (!path) return null

  // Get location multiplier - use regional if location is "Other"
  let locationMultiplier = getLocationMultiplier(inputs.location)
  if (inputs.location === 'Other' && inputs.region) {
    locationMultiplier = regionMultipliers[inputs.region] || 1.0
  }
  
  const schoolTier = getSchoolTier(inputs.schoolTier)
  const livingCost = getLivingCost(inputs.livingCost)
  
  // Adjust duration based on degree level
  let adjustedDuration = path.duration
  if (inputs.degreeLevel && inputs.educationType === 'college') {
    const durationMultiplier = degreeLevelAdjustments[inputs.degreeLevel] || 1.0
    adjustedDuration = path.duration * durationMultiplier
  }

  // Calculate total education cost
  const baseCost = path.totalCost * schoolTier.costMultiplier
  const livingExpenses = livingCost.monthly * adjustedDuration
  const netEducationCost = baseCost + livingExpenses - (inputs.scholarships || 0)
  
  // Calculate loan interest if applicable
  let totalCost = netEducationCost
  if (netEducationCost > 0 && inputs.loanInterestRate) {
    // Simple interest calculation for demonstration
    // Assumes loan is for the full net cost and paid back over 10 years
    const loanInterest = netEducationCost * (inputs.loanInterestRate / 100) * 10
    totalCost = netEducationCost + loanInterest
  }
  
  const adjustedCost = Math.max(0, totalCost)

  // Calculate adjusted salary
  const adjustedSalary = path.salary.year1 * locationMultiplier * schoolTier.salaryBonus
  const monthlySalary = adjustedSalary / 12

  // Calculate opportunity cost (what you could earn working instead)
  const opportunityCost = 35000 * adjustedDuration / 12 // Base retail salary over education duration
  const monthlyOpportunityCost = 35000 / 12

  // Calculate breakeven months
  const monthlyNetGain = monthlySalary - monthlyOpportunityCost
  const breakevenMonths = monthlyNetGain > 0 
    ? Math.ceil(adjustedCost / monthlyNetGain)
    : 999 // Never breaks even

  // Calculate 10-year net worth
  const year5Salary = path.salary.year5 * locationMultiplier * schoolTier.salaryBonus
  const year10Salary = path.salary.year10 * locationMultiplier * schoolTier.salaryBonus
  
  // Simplified 10-year calculation
  const totalEarnings = (adjustedSalary * 4) + (year5Salary * 5) + year10Salary
  const netWorth10Years = totalEarnings - adjustedCost

  // Calculate ROI (Return on Investment)
  // ROI = (Net Return / Total Investment) * 100
  const netReturn = netWorth10Years
  const roi = adjustedCost > 0 ? (netReturn / adjustedCost) * 100 : 0

  // Calculate doubt score (0-100)
  const doubts = []
  
  if (path.employmentRate < 0.7) doubts.push(30)
  if (path.employmentRate < 0.5) doubts.push(20)
  if (breakevenMonths > 60) doubts.push(20)
  if (breakevenMonths > 120) doubts.push(15)
  if (adjustedCost > 100000) doubts.push(15)
  
  const doubtScore = Math.min(100, doubts.reduce((a, b) => a + b, 0))

  return {
    totalCost: baseCost,
    adjustedCost,
    monthlySalary,
    breakevenMonths,
    netWorth10Years,
    employmentRate: path.employmentRate,
    riskText: path.riskText,
    doubtScore,
    roi,
    opportunityCost
  }
}

export function comparePaths(
  inputs1: CalculatorInputs,
  inputs2: CalculatorInputs
): { 
  result1: CalculationResult | null, 
  result2: CalculationResult | null,
  winner: 'path1' | 'path2' | null,
  differenceMonths: number,
  differenceAmount: number
} {
  const result1 = calculateROI(inputs1)
  const result2 = calculateROI(inputs2)

  if (!result1 || !result2) {
    return {
      result1,
      result2,
      winner: null,
      differenceMonths: 0,
      differenceAmount: 0
    }
  }

  const winner = result1.breakevenMonths < result2.breakevenMonths ? 'path1' : 'path2'
  const differenceMonths = Math.abs(result1.breakevenMonths - result2.breakevenMonths)
  const differenceAmount = Math.abs(result1.netWorth10Years - result2.netWorth10Years)

  return {
    result1,
    result2,
    winner,
    differenceMonths,
    differenceAmount
  }
}
