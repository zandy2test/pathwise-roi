import type { CalculatorInputs, CalculationResult } from './types'
import { getEducationPath, getLocationMultiplier, getSchoolTier, getLivingCost } from './data'

export function calculateROI(inputs: CalculatorInputs): CalculationResult | null {
  const path = getEducationPath(inputs.path)
  if (!path) return null

  const locationMultiplier = getLocationMultiplier(inputs.location)
  const schoolTier = getSchoolTier(inputs.schoolTier)
  const livingCost = getLivingCost(inputs.livingCost)

  // Calculate total education cost
  const baseCost = path.totalCost * schoolTier.costMultiplier
  const livingExpenses = livingCost.monthly * path.duration
  const totalCost = baseCost + livingExpenses - (inputs.scholarships || 0)
  const adjustedCost = Math.max(0, totalCost)

  // Calculate adjusted salary
  const adjustedSalary = path.salary.year1 * locationMultiplier * schoolTier.salaryBonus
  const monthlySalary = adjustedSalary / 12

  // Calculate opportunity cost (what you could earn working instead)
  const opportunityCost = 35000 // Base retail salary
  const monthlyOpportunityCost = opportunityCost / 12

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
    doubtScore
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
