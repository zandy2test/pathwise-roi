import { validateCalculatorInputs } from '@/lib/validation'
import type { CalculatorInputs } from '@/lib/types'

describe('Input Validation', () => {
  const validInputs: CalculatorInputs = {
    path: 'college_tech',
    location: 'midwest',
    schoolTier: 'average',
    livingCost: 'withparents',
    scholarships: 5000
  }

  describe('validateCalculatorInputs', () => {
    test('validates all required fields', () => {
      const errors = validateCalculatorInputs(validInputs)
      expect(errors).toHaveLength(0)
    })

    test('detects missing education path', () => {
      const invalidInputs = {
        ...validInputs,
        path: ''
      }
      
      const errors = validateCalculatorInputs(invalidInputs)
      expect(errors).toContain('Please select an education path')
    })

    test('detects missing location', () => {
      const invalidInputs = {
        ...validInputs,
        location: ''
      }
      
      const errors = validateCalculatorInputs(invalidInputs)
      expect(errors).toContain('Please select a location')
    })

    test('detects missing school tier', () => {
      const invalidInputs = {
        ...validInputs,
        schoolTier: ''
      }
      
      const errors = validateCalculatorInputs(invalidInputs)
      expect(errors).toContain('Please select a school tier')
    })

    test('detects missing living cost option', () => {
      const invalidInputs = {
        ...validInputs,
        livingCost: ''
      }
      
      const errors = validateCalculatorInputs(invalidInputs)
      expect(errors).toContain('Please select a living situation')
    })

    test('validates scholarship amount bounds', () => {
      const negativeScholarships = {
        ...validInputs,
        scholarships: -1000
      }
      
      const errors = validateCalculatorInputs(negativeScholarships)
      expect(errors).toContain('Scholarship amount must be a positive number')
    })

    test('validates maximum scholarship amount', () => {
      const excessiveScholarships = {
        ...validInputs,
        scholarships: 150000
      }
      
      const errors = validateCalculatorInputs(excessiveScholarships)
      expect(errors).toContain('Scholarships cannot exceed $100,000')
    })

    test('allows zero scholarships', () => {
      const noScholarships = {
        ...validInputs,
        scholarships: 0
      }
      
      const errors = validateCalculatorInputs(noScholarships)
      expect(errors).toHaveLength(0)
    })

    test('allows maximum valid scholarship amount', () => {
      const maxScholarships = {
        ...validInputs,
        scholarships: 100000
      }
      
      const errors = validateCalculatorInputs(maxScholarships)
      expect(errors).toHaveLength(0)
    })

    test('reports multiple validation errors', () => {
      const invalidInputs: CalculatorInputs = {
        path: '',
        location: '',
        schoolTier: '',
        livingCost: '',
        scholarships: -500
      }
      
      const errors = validateCalculatorInputs(invalidInputs)
      expect(errors.length).toBeGreaterThan(1)
      expect(errors).toContain('Please select an education path')
      expect(errors).toContain('Please select a location')
      expect(errors).toContain('Please select a school tier') 
      expect(errors).toContain('Please select a living situation')
      expect(errors).toContain('Scholarship amount must be a positive number')
    })

    test('handles edge case scholarship values', () => {
      const edgeCases = [
        { scholarships: 0.01, shouldPass: true },
        { scholarships: 99999.99, shouldPass: true },
        { scholarships: 100000, shouldPass: true },
        { scholarships: 100000.01, shouldPass: false }
      ]
      
      edgeCases.forEach(({ scholarships, shouldPass }) => {
        const inputs = { ...validInputs, scholarships }
        const errors = validateCalculatorInputs(inputs)
        
        if (shouldPass) {
          expect(errors.filter(e => e.toLowerCase().includes('scholarship')).length).toBe(0)
        } else {
          expect(errors.some(e => e.toLowerCase().includes('scholarship'))).toBe(true)
        }
      })
    })
  })
})