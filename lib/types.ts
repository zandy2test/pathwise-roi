export interface CalculationInput {
  educationPath: string
  educationType: string
  customCost?: number
  livingExpenses: number
  currentSalary: number
  location: string
  hasScholarship: boolean
  scholarshipAmount?: number
}

export interface ROIResult {
  breakEvenTime: number // in years
  tenYearNetWorth: number
  totalInvestment: number
  monthlyCashFlow: number
  yearlyProjections: YearlyProjection[]
}

export interface YearlyProjection {
  year: number
  cumulativeEarnings: number
  cumulativeCosts: number
  netWorth: number
  salary: number
}
