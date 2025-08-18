import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ROITimeline from '@/components/roi-timeline'
import { CalculationResult } from '@/lib/types'
import { TooltipProvider } from '@/components/ui/tooltip'

interface MockProps {
  children?: React.ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

interface DataPoint {
  month: number
  netWorth: number
  year: string
  isBreakeven?: boolean
}

// Mock recharts components - handle SVG elements properly to avoid React warnings
jest.mock('recharts', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react')
  const LinearGradient = React.forwardRef(({ children, ...props }: MockProps, ref: unknown) => 
    React.createElement('linearGradient', { ...props, ref }, children)
  )
  LinearGradient.displayName = 'LinearGradient'
  
  const Stop = React.forwardRef((props: MockProps, ref: unknown) => 
    React.createElement('stop', { ...props, ref })
  )
  Stop.displayName = 'Stop'
  
  const Defs = React.forwardRef(({ children, ...props }: MockProps, ref: unknown) => 
    React.createElement('defs', { ...props, ref }, children)
  )
  Defs.displayName = 'Defs'
  
  return {
    ResponsiveContainer: ({ children }: MockProps) => <div data-testid="responsive-container">{children}</div>,
    LineChart: ({ children, data }: MockProps) => <div data-testid="line-chart" data-points={JSON.stringify(data)}>{children}</div>,
    Line: ({ dataKey }: MockProps) => <div data-testid={`line-${dataKey}`} />,
    XAxis: ({ label }: MockProps) => <div data-testid="x-axis" data-label={label?.value} />,
    YAxis: ({ label }: MockProps) => <div data-testid="y-axis" data-label={label?.value} />,
    CartesianGrid: () => <div data-testid="grid" />,
    Tooltip: ({ content }: MockProps) => <div data-testid="tooltip">{content && typeof content === 'function' ? 'CustomTooltip' : null}</div>,
    ReferenceLine: ({ x, y, label }: MockProps) => <div data-testid="reference-line" data-x={x} data-y={y} data-label={label?.value} />,
    linearGradient: LinearGradient,
    stop: Stop,
    defs: Defs
  }
})

describe('ROITimeline Component', () => {
  const defaultResult: CalculationResult = {
    totalCost: 100000,
    adjustedCost: 100000,
    monthlySalary: 5000,
    breakevenMonths: 48,
    netWorth10Years: 260000,
    employmentRate: 85,
    riskText: 'Medium Risk',
    doubtScore: 35,
    roi: 160,
    opportunityCost: 80000
  }

  describe('Rendering', () => {
    it('should render with all main elements', () => {
      render(
        <TooltipProvider>
          <ROITimeline result={defaultResult} pathName="Computer Science BS" />
        </TooltipProvider>
      )

      expect(screen.getByText('ROI Timeline')).toBeInTheDocument()
      expect(screen.getByText('Your journey from debt to profit over 10 years')).toBeInTheDocument()
      expect(screen.getByTestId('responsive-container')).toBeInTheDocument()
      expect(screen.getByTestId('line-chart')).toBeInTheDocument()
    })

    it('should display the breakeven explanation tooltip icon', () => {
      render(
        <TooltipProvider>
          <ROITimeline result={defaultResult} pathName="Computer Science BS" />
        </TooltipProvider>
      )

      // Check for the help icon instead of the explanation card
      const helpIcon = document.querySelector('.lucide-circle-help')
      expect(helpIcon).toBeInTheDocument()
      expect(helpIcon).toHaveClass('cursor-help')
    })

    it('should display summary statistics', () => {
      render(
        <TooltipProvider>
          <ROITimeline result={defaultResult} pathName="Computer Science BS" />
        </TooltipProvider>
      )

      expect(screen.getByText('Initial Investment')).toBeInTheDocument()
      expect(screen.getByText('-$100,000')).toBeInTheDocument()
      
      expect(screen.getByText('Breakeven')).toBeInTheDocument()
      expect(screen.getByText('48 months')).toBeInTheDocument()
      
      expect(screen.getByText('10-Year Net Worth')).toBeInTheDocument()
      expect(screen.getByText('$260,000')).toBeInTheDocument()
    })
  })

  describe('Data Processing', () => {
    it('should generate correct data points for the chart', () => {
      render(
        <TooltipProvider>
          <ROITimeline result={defaultResult} pathName="Computer Science BS" />
        </TooltipProvider>
      )

      const chart = screen.getByTestId('line-chart')
      const dataPoints = JSON.parse(chart.getAttribute('data-points') || '[]')

      // Should have data points every 3 months for 10 years
      expect(dataPoints.length).toBeGreaterThan(0)
      
      // Check first point (start)
      const firstPoint = dataPoints[0]
      expect(firstPoint.month).toBe(0)
      expect(firstPoint.netWorth).toBe(-100000)
      expect(firstPoint.year).toBe('Start')

      // Check if breakeven point is included
      const breakevenPoint = dataPoints.find((p: DataPoint) => p.isBreakeven)
      expect(breakevenPoint).toBeDefined()
    })

    it('should calculate net worth correctly over time', () => {
      render(
        <TooltipProvider>
          <ROITimeline result={defaultResult} pathName="Computer Science BS" />
        </TooltipProvider>
      )

      const chart = screen.getByTestId('line-chart')
      const dataPoints = JSON.parse(chart.getAttribute('data-points') || '[]')

      // Monthly net gain = $5000 * 0.6 = $3000
      // After 12 months: -100000 + (3000 * 12) = -64000
      const yearOnePoint = dataPoints.find((p: DataPoint) => p.month === 12)
      expect(yearOnePoint?.netWorth).toBe(-64000)
      expect(yearOnePoint?.year).toBe('1 yr')

      // After 24 months: -100000 + (3000 * 24) = -28000
      const yearTwoPoint = dataPoints.find((p: DataPoint) => p.month === 24)
      expect(yearTwoPoint?.netWorth).toBe(-28000)
      expect(yearTwoPoint?.year).toBe('2 yrs')
    })

    it('should handle never breakeven scenario', () => {
      const neverBreakevenResult = {
        ...defaultResult,
        breakevenMonths: 150, // More than 120 months
        monthlySalary: 1000 // Very low salary
      }

      render(
        <TooltipProvider>
          <ROITimeline result={neverBreakevenResult} pathName="Low Paying Path" />
        </TooltipProvider>
      )

      expect(screen.getByText('Never')).toBeInTheDocument()
    })
  })

  describe('Chart Components', () => {
    it('should render all required chart components', () => {
      render(
        <TooltipProvider>
          <ROITimeline result={defaultResult} pathName="Computer Science BS" />
        </TooltipProvider>
      )

      // Check axes
      expect(screen.getByTestId('x-axis')).toBeInTheDocument()
      expect(screen.getByTestId('y-axis')).toBeInTheDocument()
      expect(screen.getByTestId('x-axis')).toHaveAttribute('data-label', 'Time')
      expect(screen.getByTestId('y-axis')).toHaveAttribute('data-label', 'Net Worth')

      // Check grid
      expect(screen.getByTestId('grid')).toBeInTheDocument()

      // Check tooltip
      expect(screen.getByTestId('tooltip')).toBeInTheDocument()

      // Check line
      expect(screen.getByTestId('line-netWorth')).toBeInTheDocument()
    })

    it('should render reference lines', () => {
      render(
        <TooltipProvider>
          <ROITimeline result={defaultResult} pathName="Computer Science BS" />
        </TooltipProvider>
      )

      const referenceLines = screen.getAllByTestId('reference-line')
      
      // Should have at least 2 reference lines (breakeven line at y=0 and breakeven point)
      expect(referenceLines.length).toBeGreaterThanOrEqual(2)

      // Check breakeven line at y=0
      const breakevenLine = referenceLines.find(line => line.getAttribute('data-y') === '0')
      expect(breakevenLine).toBeDefined()
      expect(breakevenLine).toHaveAttribute('data-label', 'Breakeven Line')

      // Check breakeven point marker
      const breakevenPoint = referenceLines.find(line => line.getAttribute('data-x') === '48')
      expect(breakevenPoint).toBeDefined()
      expect(breakevenPoint).toHaveAttribute('data-label', 'Breakeven: 48 months')
    })

    it('should not render breakeven marker if beyond 10 years', () => {
      const lateBreakevenResult = {
        ...defaultResult,
        breakevenMonths: 150 // Beyond chart range
      }

      render(
        <TooltipProvider>
          <ROITimeline result={lateBreakevenResult} pathName="Late Breakeven Path" />
        </TooltipProvider>
      )

      const referenceLines = screen.getAllByTestId('reference-line')
      const breakevenPoint = referenceLines.find(line => line.getAttribute('data-x') === '150')
      expect(breakevenPoint).toBeUndefined()
    })
  })

  describe('Edge Cases', () => {
    it('should handle zero monthly salary', () => {
      const zeroSalaryResult = {
        ...defaultResult,
        monthlySalary: 0,
        breakevenMonths: 999
      }

      render(
        <TooltipProvider>
          <ROITimeline result={zeroSalaryResult} pathName="No Income Path" />
        </TooltipProvider>
      )

      const chart = screen.getByTestId('line-chart')
      const dataPoints = JSON.parse(chart.getAttribute('data-points') || '[]')

      // All points should remain at initial debt
      const allNegative = dataPoints.every((p: DataPoint) => p.netWorth === -100000)
      expect(allNegative).toBe(true)
    })

    it('should handle very high salary', () => {
      const highSalaryResult = {
        ...defaultResult,
        monthlySalary: 20000,
        breakevenMonths: 12,
        netWorth10Years: 1340000
      }

      render(
        <TooltipProvider>
          <ROITimeline result={highSalaryResult} pathName="High Income Path" />
        </TooltipProvider>
      )

      expect(screen.getByText('12 months')).toBeInTheDocument()
      expect(screen.getByText('$1,340,000')).toBeInTheDocument()

      const chart = screen.getByTestId('line-chart')
      const dataPoints = JSON.parse(chart.getAttribute('data-points') || '[]')

      // Should reach positive quickly
      const positivePoints = dataPoints.filter((p: DataPoint) => p.netWorth > 0)
      expect(positivePoints.length).toBeGreaterThan(0)
    })

    it('should handle negative ROI scenario', () => {
      const negativeROIResult = {
        ...defaultResult,
        totalCost: 500000,
        monthlySalary: 2000,
        breakevenMonths: 200,
        netWorth10Years: -356000,
        roi: -71
      }

      render(
        <TooltipProvider>
          <ROITimeline result={negativeROIResult} pathName="Negative ROI Path" />
        </TooltipProvider>
      )

      expect(screen.getByText('-$500,000')).toBeInTheDocument()
      expect(screen.getByText('Never')).toBeInTheDocument() // Breakeven beyond 120 months
      // Check for the final net worth - it might be formatted differently
      const finalNetWorthElement = screen.getByText('10-Year Net Worth').parentElement?.parentElement
      expect(finalNetWorthElement?.textContent).toContain('356')
    })

    it('should handle exact breakeven at chart boundary', () => {
      const boundaryResult = {
        ...defaultResult,
        breakevenMonths: 120 // Exactly at 10 years
      }

      render(
        <TooltipProvider>
          <ROITimeline result={boundaryResult} pathName="Boundary Path" />
        </TooltipProvider>
      )

      expect(screen.getByText('120 months')).toBeInTheDocument()

      const referenceLines = screen.getAllByTestId('reference-line')
      const breakevenPoint = referenceLines.find(line => line.getAttribute('data-x') === '120')
      expect(breakevenPoint).toBeDefined()
    })
  })

  describe('Year Labels', () => {
    it('should display correct year labels on x-axis', () => {
      render(
        <TooltipProvider>
          <ROITimeline result={defaultResult} pathName="Computer Science BS" />
        </TooltipProvider>
      )

      const chart = screen.getByTestId('line-chart')
      const dataPoints = JSON.parse(chart.getAttribute('data-points') || '[]')

      // Check specific year labels
      expect(dataPoints.find((p: DataPoint) => p.month === 0)?.year).toBe('Start')
      expect(dataPoints.find((p: DataPoint) => p.month === 12)?.year).toBe('1 yr')
      expect(dataPoints.find((p: DataPoint) => p.month === 24)?.year).toBe('2 yrs')
      expect(dataPoints.find((p: DataPoint) => p.month === 36)?.year).toBe('3 yrs')
      expect(dataPoints.find((p: DataPoint) => p.month === 48)?.year).toBe('4 yrs')
      expect(dataPoints.find((p: DataPoint) => p.month === 60)?.year).toBe('5 yrs')
      expect(dataPoints.find((p: DataPoint) => p.month === 120)?.year).toBe('10 yrs')
    })
  })

  describe('Responsive Design', () => {
    it('should use ResponsiveContainer for chart sizing', () => {
      render(
        <TooltipProvider>
          <ROITimeline result={defaultResult} pathName="Computer Science BS" />
        </TooltipProvider>
      )

      const container = screen.getByTestId('responsive-container')
      expect(container).toBeInTheDocument()
      
      // The actual LineChart should be inside the ResponsiveContainer
      const chart = container.querySelector('[data-testid="line-chart"]')
      expect(chart).toBeInTheDocument()
    })
  })
})
