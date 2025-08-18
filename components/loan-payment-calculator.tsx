import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, DollarSign, Calendar, TrendingUp } from 'lucide-react';
import type { CalculationResult } from '@/lib/types';

interface LoanPaymentCalculatorProps {
  result: CalculationResult;
  loanInterestRate: number;
}

export function LoanPaymentCalculator({ result, loanInterestRate }: LoanPaymentCalculatorProps) {
  // Calculate loan amount (70% of total cost is typical)
  const loanAmount = Math.round(result.totalCost * 0.7);
  const monthlyRate = loanInterestRate / 100 / 12;
  const loanTermMonths = 120; // 10-year standard repayment
  
  // Calculate monthly payment using loan formula
  const monthlyPayment = loanAmount * 
    (monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths)) / 
    (Math.pow(1 + monthlyRate, loanTermMonths) - 1);
  
  const totalPaid = monthlyPayment * loanTermMonths;
  const totalInterest = totalPaid - loanAmount;
  
  // Calculate some key milestones
  const firstYearInterest = Math.round(
    Array.from({ length: 12 }, (_, month) => {
      const remainingBalance = loanAmount * 
        (Math.pow(1 + monthlyRate, loanTermMonths) - Math.pow(1 + monthlyRate, month + 1)) /
        (Math.pow(1 + monthlyRate, loanTermMonths) - 1);
      return monthlyPayment - (loanAmount - remainingBalance) / (month + 1);
    }).reduce((sum, interest) => sum + interest, 0)
  );

  return (
    <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calculator className="h-5 w-5 text-orange-600" />
          Student Loan Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-3">
            <p className="text-xs text-gray-600 mb-1">Loan Amount</p>
            <p className="text-lg font-bold text-gray-900">
              ${loanAmount.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500">70% of total cost</p>
          </div>
          
          <div className="bg-white rounded-lg p-3">
            <p className="text-xs text-gray-600 mb-1">Interest Rate</p>
            <p className="text-lg font-bold text-gray-900">
              {loanInterestRate}%
            </p>
            <p className="text-xs text-gray-500">Annual rate</p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-4 w-4 text-red-600" />
            <p className="text-sm font-medium text-gray-700">Monthly Payment</p>
          </div>
          <p className="text-2xl font-bold text-red-600">
            ${Math.round(monthlyPayment).toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-1">For 10 years</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-lg p-3">
            <div className="flex items-center gap-1 mb-1">
              <TrendingUp className="h-3 w-3 text-orange-600" />
              <p className="text-xs text-gray-600">Total Interest</p>
            </div>
            <p className="text-lg font-bold text-orange-600">
              ${Math.round(totalInterest).toLocaleString()}
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-3">
            <div className="flex items-center gap-1 mb-1">
              <Calendar className="h-3 w-3 text-purple-600" />
              <p className="text-xs text-gray-600">Total Paid</p>
            </div>
            <p className="text-lg font-bold text-purple-600">
              ${Math.round(totalPaid).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-orange-100 rounded-lg p-3 text-sm">
          <p className="font-medium text-orange-900 mb-1">⚠️ First Year Reality Check</p>
          <p className="text-orange-800">
            You'll pay <span className="font-bold">${Math.round(firstYearInterest).toLocaleString()}</span> in 
            interest alone during your first year of payments.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
