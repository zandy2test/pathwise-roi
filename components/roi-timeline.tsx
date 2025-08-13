'use client'

import { useMemo } from 'react'
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  AreaChart
} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Info } from 'lucide-react'
import type { CalculationResult } from '@/lib/types'

interface ROITimelineProps {
  result: CalculationResult
  pathName: string
}

interface DataPoint {
  month: number
  year: string
  netWorth: number
  isBreakeven?: boolean
}

interface TooltipProps {
  active?: boolean
  payload?: Array<{
    value: number
    [key: string]: unknown
  }>
  label?: number
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    const value = payload[0].value as number
    const month = label as number
    const years = Math.floor(month / 12)
    const months = month % 12
    
    return (
      <div className="bg-white p-3 border rounded-lg shadow-lg">
        <p className="font-semibold text-sm">
          {years > 0 ? `Year ${years}${months > 0 ? `, Month ${months}` : ''}` : `Month ${month}`}
        </p>
        <p className={`font-bold ${value >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          ${value.toLocaleString()}
        </p>
        {value < 0 && (
          <p className="text-xs text-muted-foreground">Still in debt</p>
        )}
        {value >= 0 && (
          <p className="text-xs text-green-600">Profit!</p>
        )}
      </div>
    )
  }
  return null
}

export default function ROITimeline({ result }: ROITimelineProps) {
  const data = useMemo(() => {
    const points: DataPoint[] = []
    const monthlyNetGain = result.monthlySalary * 0.6 // After taxes and expenses
    const totalDebt = -result.totalCost
    
    // Generate data points for 10 years (120 months)
    for (let month = 0; month <= 120; month += 3) { // Every 3 months for smoother chart
      let netWorth: number
      
      if (month === 0) {
        netWorth = totalDebt
      } else {
        netWorth = totalDebt + (monthlyNetGain * month)
      }
      
      const yearLabel = month === 0 ? 'Start' : 
                       month === 12 ? '1 yr' :
                       month === 24 ? '2 yrs' :
                       month === 36 ? '3 yrs' :
                       month === 48 ? '4 yrs' :
                       month === 60 ? '5 yrs' :
                       month === 72 ? '6 yrs' :
                       month === 84 ? '7 yrs' :
                       month === 96 ? '8 yrs' :
                       month === 108 ? '9 yrs' :
                       month === 120 ? '10 yrs' : ''
      
      points.push({
        month,
        year: yearLabel,
        netWorth: Math.round(netWorth),
        isBreakeven: month === result.breakevenMonths
      })
    }
    
    // Add exact breakeven point if not already included
    if (result.breakevenMonths <= 120 && !points.some(p => p.month === result.breakevenMonths)) {
      const breakevenNetWorth = totalDebt + (monthlyNetGain * result.breakevenMonths)
      points.push({
        month: result.breakevenMonths,
        year: '',
        netWorth: Math.round(breakevenNetWorth),
        isBreakeven: true
      })
      points.sort((a, b) => a.month - b.month)
    }
    
    return points
  }, [result])

  const maxValue = Math.max(...data.map(d => d.netWorth))
  const minValue = Math.min(...data.map(d => d.netWorth))
  const yAxisDomain = [
    Math.floor(minValue * 1.1 / 10000) * 10000,
    Math.ceil(maxValue * 1.1 / 10000) * 10000
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>ROI Timeline</CardTitle>
        <CardDescription>
          Your journey from debt to profit over 10 years
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {/* Breakeven Explanation Card */}
        <Card className="bg-blue-50 border-blue-200 mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p className="font-medium text-blue-900">Understanding Your Breakeven Point</p>
                <p className="text-sm text-blue-800">
                  The breakeven point shows when your cumulative earnings after graduation 
                  equal your total education investment including opportunity costs 
                  (the money you could have earned if working instead of studying).
                </p>
                <p className="text-sm text-blue-800">
                  That's why it's not at $0 - it factors in both what you paid AND 
                  what you didn't earn while in school.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart 
            data={data}
            margin={{ top: 10, right: 30, left: 10, bottom: 40 }}
          >
            <defs>
              <linearGradient id="colorPositive" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorNegative" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted-foreground/20" />
            
            <XAxis 
              dataKey="month"
              domain={[0, 120]}
              ticks={[0, 12, 24, 36, 48, 60, 72, 84, 96, 108, 120]}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => {
                const point = data.find(d => d.month === value)
                return point?.year || ''
              }}
              label={{ 
                value: 'Time', 
                position: 'insideBottom', 
                offset: -30,
                style: { fontSize: 14, fill: '#666' }
              }}
            />
            
            <YAxis 
              domain={yAxisDomain}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              label={{ 
                value: 'Net Worth', 
                angle: -90, 
                position: 'insideLeft',
                style: { fontSize: 14, fill: '#666' }
              }}
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            {/* Reference line at 0 (breakeven) */}
            <ReferenceLine 
              y={0} 
              stroke="#666" 
              strokeDasharray="5 5"
              label={{ 
                value: "Breakeven Line", 
                position: "left",
                style: { fontSize: 12, fill: '#666' }
              }}
            />
            
            {/* Breakeven point marker */}
            {result.breakevenMonths <= 120 && (
              <ReferenceLine 
                x={result.breakevenMonths} 
                stroke="#10b981" 
                strokeDasharray="3 3"
                label={{ 
                  value: `Breakeven: ${result.breakevenMonths} months`, 
                  position: "top",
                  offset: 10, // Add offset to prevent cutoff
                  style: { fontSize: 12, fill: '#10b981', fontWeight: 'bold' }
                }}
              />
            )}
            
            {/* Negative area (debt) */}
            <Area
              type="monotone"
              dataKey={(item) => Math.min(0, item.netWorth)}
              stroke="none"
              fill="url(#colorNegative)"
              fillOpacity={1}
            />
            
            {/* Positive area (profit) */}
            <Area
              type="monotone"
              dataKey={(item) => Math.max(0, item.netWorth)}
              stroke="none"
              fill="url(#colorPositive)"
              fillOpacity={1}
            />
            
            <Line 
              type="monotone" 
              dataKey="netWorth" 
              stroke="#2563eb"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: '#2563eb' }}
            />
          </AreaChart>
        </ResponsiveContainer>
        
        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-muted-foreground">Initial Investment</p>
            <p className="text-xl font-bold text-red-600">
              -${result.totalCost.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Breakeven</p>
            <p className="text-xl font-bold text-primary">
              {result.breakevenMonths > 120 ? 'Never' : `${result.breakevenMonths} months`}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">10-Year Net Worth</p>
            <p className="text-xl font-bold text-green-600">
              ${result.netWorth10Years.toLocaleString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
