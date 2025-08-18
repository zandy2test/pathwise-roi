import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, GraduationCap, Briefcase } from 'lucide-react';
import { educationPaths } from '@/lib/data';
import type { CalculatorInputs, CalculationResult } from '@/lib/types';

interface CareerTrajectoryChartProps {
  inputs: CalculatorInputs;
  result: CalculationResult;
}

export function CareerTrajectoryChart({ inputs }: CareerTrajectoryChartProps) {
  const path = educationPaths[inputs.path];
  if (!path) return null;

  // Generate 20-year salary progression using actual data points
  const years = Array.from({ length: 21 }, (_, i) => i);
  
  // Education path salary progression (with degree) - using actual data
  const educationSalaries = years.map(year => {
    if (year < path.duration / 12) return 0; // Still in school
    const yearsWorking = year - path.duration / 12;
    
    // Use actual data points from data.json and interpolate
    if (yearsWorking <= 1) return path.salary.year1;
    if (yearsWorking <= 5) {
      // Interpolate between year1 and year5
      const progress = (yearsWorking - 1) / 4;
      return Math.round(path.salary.year1 + (path.salary.year5 - path.salary.year1) * progress);
    }
    if (yearsWorking <= 10) {
      // Interpolate between year5 and year10
      const progress = (yearsWorking - 5) / 5;
      return Math.round(path.salary.year5 + (path.salary.year10 - path.salary.year5) * progress);
    }
    // After year 10, continue growing at 2% annually
    const yearsBeyond10 = yearsWorking - 10;
    return Math.round(path.salary.year10 * Math.pow(1.02, yearsBeyond10));
  });

  // Alternative path (no degree, immediate work)
  const noDegreeSalaries = years.map(year => {
    const baseSalary = 35000; // Starting salary without degree
    // Slower growth rate: 2-3% per year
    const growthRate = Math.max(0.015, 0.03 - year * 0.001);
    return Math.round(baseSalary * Math.pow(1 + growthRate, year));
  });

  // Find crossover point
  const crossoverYear = years.find(year => 
    educationSalaries[year] > noDegreeSalaries[year]
  ) || -1;

  // Find max values for scaling
  const maxSalary = Math.max(...educationSalaries, ...noDegreeSalaries);
  const salaryScale = 200 / maxSalary;

  return (
    <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
          <TrendingUp className="h-5 w-5 text-indigo-600" />
          20-Year Career Trajectory
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* SVG Chart */}
        <div className="bg-white rounded-lg p-4">
          <svg width="100%" height="250" viewBox="0 0 400 250" className="overflow-visible">
            {/* Grid lines - Fix Y-axis overflow */}
            {[0, 50000, 100000, 150000, 200000].map((salary) => {
              const yPos = Math.max(20, Math.min(220, 220 - (salary * salaryScale))); // Constrain Y position
              const textYPos = Math.max(25, Math.min(225, 225 - (salary * salaryScale))); // Constrain text Y position
              return (
                <g key={salary}>
                  <line
                    x1="40"
                    y1={yPos}
                    x2="380"
                    y2={yPos}
                    stroke="#e5e7eb"
                    strokeDasharray="2,2"
                  />
                  <text
                    x="35"
                    y={textYPos}
                    fontSize="10"
                    fill="#6b7280"
                    textAnchor="end"
                  >
                    ${(salary / 1000)}k
                  </text>
                </g>
              );
            })}

            {/* X-axis labels */}
            {[0, 5, 10, 15, 20].map(year => (
              <text
                key={year}
                x={40 + (year * 17)}
                y="240"
                fontSize="10"
                fill="#6b7280"
                textAnchor="middle"
              >
                Y{year}
              </text>
            ))}

            {/* Education path line */}
            <polyline
              points={educationSalaries.map((salary, i) => 
                `${40 + i * 17},${220 - salary * salaryScale}`
              ).join(' ')}
              fill="none"
              stroke="#4f46e5"
              strokeWidth="3"
            />

            {/* No degree path line */}
            <polyline
              points={noDegreeSalaries.map((salary, i) => 
                `${40 + i * 17},${220 - salary * salaryScale}`
              ).join(' ')}
              fill="none"
              stroke="#10b981"
              strokeWidth="3"
            />

            {/* Crossover point */}
            {crossoverYear > 0 && (
              <circle
                cx={40 + crossoverYear * 17}
                cy={220 - educationSalaries[crossoverYear] * salaryScale}
                r="5"
                fill="#ef4444"
              />
            )}

            {/* Legend */}
            <g transform="translate(250, 20)">
              <rect x="0" y="0" width="15" height="3" fill="#4f46e5" />
              <text x="20" y="4" fontSize="11" fill="#374151">With Degree</text>
              
              <rect x="0" y="15" width="15" height="3" fill="#10b981" />
              <text x="20" y="19" fontSize="11" fill="#374151">Without Degree</text>
            </g>
          </svg>
        </div>

        {/* Key Insights */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-lg p-3">
            <div className="flex items-center gap-1 mb-1">
              <GraduationCap className="h-4 w-4 text-indigo-600" />
              <p className="text-xs font-medium text-gray-700">Projected Salary</p>
            </div>
            <p className="text-lg font-bold text-indigo-600">
              ${Math.round(educationSalaries[20] / 1000)}k
            </p>
            <p className="text-xs text-gray-500">After 20 years (est.)</p>
          </div>

          <div className="bg-white rounded-lg p-3">
            <div className="flex items-center gap-1 mb-1">
              <Briefcase className="h-4 w-4 text-green-600" />
              <p className="text-xs font-medium text-gray-700">Crossover Point</p>
            </div>
            <p className="text-lg font-bold text-green-600">
              {crossoverYear > 0 ? `Year ${crossoverYear}` : 'Never'}
            </p>
            <p className="text-xs text-gray-500">When degree pays off</p>
          </div>
        </div>

        <div className="bg-indigo-100 rounded-lg p-3">
          <p className="text-sm font-medium text-indigo-900 mb-1">
            💡 Career Growth Analysis
          </p>
          <p className="text-xs text-indigo-800">
            {crossoverYear > 0 && crossoverYear <= 10 
              ? `Your degree starts paying off in year ${crossoverYear}. The investment shows positive returns within a reasonable timeframe.`
              : crossoverYear > 10
              ? `It takes ${crossoverYear} years for your degree to pay off. Consider if this timeline aligns with your career goals.`
              : `The immediate workforce path may provide better lifetime earnings. Consider alternative education options or certifications.`
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
