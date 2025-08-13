export interface EducationPath {
  name: string
  totalCost: number
  duration: number // months
  salary: {
    year1: number
    year5: number
    year10: number
  }
  riskText: string
  employmentRate: number
  // Viral metrics
  aiRiskScore?: number
  aiRiskDescription?: string
  jobSecurityScore?: number
  brutalTruth?: string
  inflationVulnerability?: 'high' | 'medium' | 'low'
}

export interface LocationMultiplier {
  [key: string]: number
}

export interface SchoolTier {
  costMultiplier: number
  salaryBonus: number
  name: string
}

export interface LivingCost {
  monthly: number
  name: string
}

export interface ViralComparison {
  title: string
  path1: string
  path2: string
}

export interface CalculatorInputs {
  path: string
  educationType?: string
  field?: string
  program?: string
  location: string
  schoolTier: string
  livingCost: string
  scholarships?: number
}

export interface CalculationResult {
  totalCost: number
  adjustedCost: number
  monthlySalary: number
  breakevenMonths: number
  netWorth10Years: number
  employmentRate: number
  riskText: string
  doubtScore: number
  roi: number
  opportunityCost: number
}

export interface ComparisonResult {
  path1: CalculationResult & { name: string }
  path2: CalculationResult & { name: string }
  winner: 'path1' | 'path2'
  differenceMonths: number
  differenceAmount: number
}
