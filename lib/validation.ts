export function validateCalculatorInputs(inputs: any): string[] {
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
  }

  return errors
}
