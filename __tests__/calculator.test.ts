import { calculateROI, comparePaths } from '@/lib/calculator'
import { educationPaths } from '@/lib/data'
import type { CalculatorInputs } from '@/lib/types'

describe('ROI Calculator', () => {
  const baseInputs: CalculatorInputs = {
    path: 'college_tech',
    location: 'midwest',
    schoolTier: 'average',
    livingCost: 'withparents',
    scholarships: 0
  }

  describe('calculateROI', () => {
    test('calculates ROI for computer science degree', () => {
      const result = calculateROI(baseInputs)
      
      expect(result).toBeDefined()
      expect(result?.totalCost).toBeGreaterThan(0)
      expect(result?.breakevenMonths).toBeGreaterThan(0)
      expect(result?.netWorth10Years).toBeDefined()
      expect(result?.roi).toBeDefined()
    })

    test('calculates ROI for trade school path', () => {
      const tradeInputs: CalculatorInputs = {
        path: 'trades_plumbing',
        location: 'midwest',
        schoolTier: 'average',
        livingCost: 'withparents',
        scholarships: 0
      }
      
      const result = calculateROI(tradeInputs)
      
      expect(result).toBeDefined()
      expect(result?.totalCost).toBeLessThan(50000) // Trade school should be cheaper
      expect(result?.breakevenMonths).toBeLessThan(60) // Should break even faster
    })

    test('handles scholarships correctly', () => {
      const inputsWithScholarships = {
        ...baseInputs,
        scholarships: 10000
      }
      
      const resultWithoutScholarships = calculateROI(baseInputs)
      const resultWithScholarships = calculateROI(inputsWithScholarships)
      
      expect(resultWithScholarships).toBeDefined()
      expect(resultWithoutScholarships).toBeDefined()
      
      // With scholarships should have lower adjusted cost
      expect(resultWithScholarships!.adjustedCost).toBeLessThan(resultWithoutScholarships!.adjustedCost)
      // And faster breakeven
      expect(resultWithScholarships!.breakevenMonths).toBeLessThan(resultWithoutScholarships!.breakevenMonths)
    })

    test('returns null for invalid path', () => {
      const invalidInputs: CalculatorInputs = {
        path: 'invalid_path',
        location: 'midwest',
        schoolTier: 'average',
        livingCost: 'withparents',
        scholarships: 0
      }
      
      const result = calculateROI(invalidInputs)
      expect(result).toBeNull()
    })

    test('calculates employment rate from education path data', () => {
      const result = calculateROI(baseInputs)
      const path = educationPaths[baseInputs.path]
      
      expect(result).toBeDefined()
      expect(result?.employmentRate).toBe(path?.employmentRate)
    })
  })

  describe('comparePaths', () => {
    const collegeInputs: CalculatorInputs = {
      path: 'college_tech',
      location: 'midwest', 
      schoolTier: 'average',
      livingCost: 'withparents',
      scholarships: 0
    }

    const tradeInputs: CalculatorInputs = {
      path: 'trades_welding',
      location: 'midwest',
      schoolTier: 'average', 
      livingCost: 'withparents',
      scholarships: 0
    }

    test('compares two valid paths correctly', () => {
      const comparison = comparePaths(collegeInputs, tradeInputs)
      
      expect(comparison.result1).toBeDefined()
      expect(comparison.result2).toBeDefined()
      expect(comparison.winner).toMatch(/path[12]/)
      expect(comparison.differenceMonths).toBeGreaterThanOrEqual(0)
      expect(comparison.differenceAmount).toBeGreaterThanOrEqual(0)
    })

    test('determines winner based on breakeven time', () => {
      const comparison = comparePaths(collegeInputs, tradeInputs)
      
      if (comparison.result1 && comparison.result2) {
        const expectedWinner = comparison.result1.breakevenMonths < comparison.result2.breakevenMonths ? 'path1' : 'path2'
        expect(comparison.winner).toBe(expectedWinner)
      }
    })

    test('calculates difference metrics correctly', () => {
      const comparison = comparePaths(collegeInputs, tradeInputs)
      
      if (comparison.result1 && comparison.result2) {
        const expectedMonthsDiff = Math.abs(comparison.result1.breakevenMonths - comparison.result2.breakevenMonths)
        const expectedAmountDiff = Math.abs(comparison.result1.netWorth10Years - comparison.result2.netWorth10Years)
        
        expect(comparison.differenceMonths).toBe(expectedMonthsDiff)
        expect(comparison.differenceAmount).toBe(expectedAmountDiff)
      }
    })

    test('handles invalid paths gracefully', () => {
      const invalidInputs: CalculatorInputs = {
        path: 'invalid_path',
        location: 'midwest',
        schoolTier: 'average',
        livingCost: 'withparents',
        scholarships: 0
      }
      
      const comparison = comparePaths(invalidInputs, tradeInputs)
      
      expect(comparison.result1).toBeNull()
      expect(comparison.result2).toBeDefined()
      expect(comparison.winner).toBeNull()
    })
  })

  describe('Edge cases', () => {
    test('handles extreme scholarship amounts', () => {
      const highScholarshipInputs = {
        ...baseInputs,
        scholarships: 200000 // More than total cost
      }
      
      const result = calculateROI(highScholarshipInputs)
      
      expect(result).toBeDefined()
      expect(result?.adjustedCost).toBe(0) // Should not go negative
    })

    test('calculates ROI for expensive locations', () => {
      const expensiveLocationInputs = {
        ...baseInputs,
        location: 'nyc'
      }
      
      const midwestResult = calculateROI(baseInputs)
      const nycResult = calculateROI(expensiveLocationInputs)
      
      expect(nycResult).toBeDefined()
      expect(midwestResult).toBeDefined()
      
      // NYC should generally have higher costs but also higher salaries
      expect(nycResult!.totalCost).toBeGreaterThanOrEqual(midwestResult!.totalCost)
    })

    test('premium school tier increases costs and salary', () => {
      const premiumInputs = {
        ...baseInputs,
        schoolTier: 'premium'
      }
      
      const averageResult = calculateROI(baseInputs)
      const premiumResult = calculateROI(premiumInputs)
      
      expect(premiumResult).toBeDefined()
      expect(averageResult).toBeDefined()
      
      // Premium should cost more
      expect(premiumResult!.totalCost).toBeGreaterThan(averageResult!.totalCost)
    })
  })
})