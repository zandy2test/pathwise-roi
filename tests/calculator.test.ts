import { describe, it, expect } from 'vitest';
import { calculateROI } from '@/lib/calculator';
import type { CalculatorInputs } from '@/lib/types';

describe('calculateROI', () => {
  it('should calculate ROI for a standard 4-year degree path', () => {
    const inputs: CalculatorInputs = {
      path: 'college_tech', // A known path from data.json
      location: 'usa_average',
      schoolTier: 'mid_tier',
      livingCost: 'on_campus',
      scholarships: 10000,
    };

    const result = calculateROI(inputs);

    // Basic checks to ensure the function returns a valid result object
    expect(result).not.toBeNull();
    expect(result).toBeTypeOf('object');

    // Check that key metrics are calculated and are numbers
    if (result) {
      expect(result.totalCost).toBeTypeOf('number');
      expect(result.adjustedCost).toBeTypeOf('number');
      expect(result.monthlySalary).toBeTypeOf('number');
      expect(result.breakevenMonths).toBeTypeOf('number');
      expect(result.netWorth10Years).toBeTypeOf('number');
      expect(result.doubtScore).toBeTypeOf('number');

      // Check for plausible values
      expect(result.breakevenMonths).toBeGreaterThan(0);
      expect(result.adjustedCost).toBeGreaterThan(0);
      expect(result.doubtScore).toBeGreaterThanOrEqual(0);
      expect(result.doubtScore).toBeLessThanOrEqual(100);
    }
  });

  it('should return null for an invalid education path', () => {
    const inputs: CalculatorInputs = {
      path: 'invalid_path_that_does_not_exist',
      location: 'usa_average',
      schoolTier: 'mid_tier',
      livingCost: 'on_campus',
      scholarships: 0,
    };

    const result = calculateROI(inputs);
    expect(result).toBeNull();
  });

  it('should factor scholarships into the adjusted cost', () => {
    const inputs_no_scholarship: CalculatorInputs = {
        path: 'college_tech',
        location: 'usa_average',
        schoolTier: 'mid_tier',
        livingCost: 'on_campus',
        scholarships: 0,
    };

    const inputs_with_scholarship: CalculatorInputs = {
        path: 'college_tech',
        location: 'usa_average',
        schoolTier: 'mid_tier',
        livingCost: 'on_campus',
        scholarships: 25000,
    };

    const result_no_scholarship = calculateROI(inputs_no_scholarship);
    const result_with_scholarship = calculateROI(inputs_with_scholarship);

    if (result_no_scholarship && result_with_scholarship) {
        // The adjusted cost should be exactly 25000 less with the scholarship
        expect(result_no_scholarship.adjustedCost).toBe(result_with_scholarship.adjustedCost + 25000);
        // The breakeven time should be shorter with a scholarship
        expect(result_with_scholarship.breakevenMonths).toBeLessThan(result_no_scholarship.breakevenMonths);
    } else {
        // Fail the test if either result is null
        expect(result_no_scholarship).not.toBeNull();
        expect(result_with_scholarship).not.toBeNull();
    }
  });
});
