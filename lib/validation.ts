import type { CalculatorInputs } from './types'

export function validateCalculatorInputs(inputs: CalculatorInputs): string[] {
  const errors: string[] = []

  if (!inputs.path) {
    errors.push('Please select an education path')
  }

  if (!inputs.location) {
    errors.push('Please select a location')
  }

  if (!inputs.schoolTier) {
    errors.push('Please select a school tier')
  }

  if (!inputs.livingCost) {
    errors.push('Please select a living situation')
  }

  if (inputs.scholarships !== undefined && inputs.scholarships !== null) {
    if (isNaN(inputs.scholarships) || inputs.scholarships < 0) {
      errors.push('Scholarship amount must be a positive number')
    }
    if (inputs.scholarships > 100000) {
      errors.push('Scholarships cannot exceed $100,000')
    }
  }

  return errors
}
