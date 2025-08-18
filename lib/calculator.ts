import type { CalculationInput, ROIResult, YearlyProjection } from "./types"
import { educationPaths } from "./data"

export function calculateROI(input: CalculationInput): ROIResult {
  const educationPath = educationPaths[input.educationType]?.find((path) => path.id === input.educationPath)

  if (!educationPath) {
    throw new Error("Education path not found")
  }

  const totalCost = input.customCost || educationPath.averageCost
  const scholarshipAdjustedCost = input.hasScholarship ? totalCost - (input.scholarshipAmount || 0) : totalCost

  const totalInvestment = scholarshipAdjustedCost + input.livingExpenses * educationPath.duration
  const opportunityCost = input.currentSalary * educationPath.duration

  const yearlyProjections: YearlyProjection[] = []
  let cumulativeEarnings = 0
  let cumulativeCosts = totalInvestment + opportunityCost
  let currentSalary = educationPath.averageStartingSalary

  // Calculate projections for 10 years post-graduation
  for (let year = 1; year <= 10; year++) {
    if (year <= educationPath.duration) {
      // During education - only costs, no earnings
      cumulativeEarnings += 0
      cumulativeCosts += input.livingExpenses
    } else {
      // Post-graduation - earning phase
      cumulativeEarnings += currentSalary
      currentSalary *= 1 + educationPath.salaryGrowthRate
    }

    const netWorth = cumulativeEarnings - cumulativeCosts

    yearlyProjections.push({
      year,
      cumulativeEarnings,
      cumulativeCosts,
      netWorth,
      salary: year <= educationPath.duration ? 0 : currentSalary,
    })
  }

  // Find break-even point
  const breakEvenYear = yearlyProjections.find((p) => p.netWorth >= 0)
  const breakEvenTime = breakEvenYear ? breakEvenYear.year : 10

  const tenYearProjection = yearlyProjections[9] // 10th year (index 9)
  const monthlyCashFlow = tenYearProjection.salary / 12

  return {
    breakEvenTime,
    tenYearNetWorth: tenYearProjection.netWorth,
    totalInvestment,
    monthlyCashFlow,
    yearlyProjections,
  }
}

// Analytics tracking function
export function trackEvent(eventName: string, properties?: Record<string, any>) {
  // Placeholder for analytics integration
  console.log("Analytics Event:", eventName, properties)
}
