"use client"

import { useMemo } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, ReferenceLine } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { YearlyProjection } from "@/lib/types"
import { TrendingUp, TrendingDown } from "lucide-react"

interface ROITimelineProps {
  projections: YearlyProjection[]
  breakEvenTime: number
}

interface ChartDataPoint {
  year: number
  netWorth: number
  cumulativeEarnings: number
  cumulativeCosts: number
  salary: number
  isDebtPeriod: boolean
}

export function ROITimeline({ projections, breakEvenTime }: ROITimelineProps) {
  const chartData = useMemo(() => {
    return projections.map(
      (projection): ChartDataPoint => ({
        year: projection.year,
        netWorth: projection.netWorth,
        cumulativeEarnings: projection.cumulativeEarnings,
        cumulativeCosts: projection.cumulativeCosts,
        salary: projection.salary,
        isDebtPeriod: projection.netWorth < 0,
      }),
    )
  }, [projections])

  const formatCurrency = (value: number) => {
    if (Math.abs(value) >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`
    }
    if (Math.abs(value) >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`
    }
    return `$${value.toLocaleString()}`
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as ChartDataPoint
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg max-w-xs">
          <div className="font-['Montserrat'] font-bold text-sm mb-2">Year {label}</div>
          <div className="space-y-1 text-xs font-['Open_Sans']">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Net Worth:</span>
              <span className={`font-semibold ${data.netWorth >= 0 ? "text-accent" : "text-destructive"}`}>
                {formatCurrency(data.netWorth)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Earnings:</span>
              <span className="font-semibold">{formatCurrency(data.cumulativeEarnings)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Costs:</span>
              <span className="font-semibold">{formatCurrency(data.cumulativeCosts)}</span>
            </div>
            {data.salary > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Salary:</span>
                <span className="font-semibold text-primary">{formatCurrency(data.salary)}</span>
              </div>
            )}
          </div>
        </div>
      )
    }
    return null
  }

  const minValue = Math.min(...chartData.map((d) => d.netWorth))
  const maxValue = Math.max(...chartData.map((d) => d.netWorth))
  const padding = Math.abs(maxValue - minValue) * 0.1

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="space-y-4">
          <div>
            <CardTitle className="font-['Montserrat'] font-bold text-lg md:text-xl">ROI Timeline</CardTitle>
            <CardDescription className="font-['Open_Sans'] text-sm">
              Your financial journey over the next 10 years
            </CardDescription>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <Badge variant="secondary" className="px-3 py-2 w-fit">
              <TrendingUp className="w-4 h-4 mr-2" />
              <span className="font-['Open_Sans'] text-sm">Break-even at year {breakEvenTime.toFixed(1)}</span>
            </Badge>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-destructive"></div>
                <span className="text-xs font-['Open_Sans'] text-muted-foreground">Debt Period</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-accent"></div>
                <span className="text-xs font-['Open_Sans'] text-muted-foreground">Profit Period</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64 sm:h-80 w-full overflow-hidden">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{
                top: 10,
                right: 10,
                left: 10,
                bottom: 10,
              }}
            >
              <defs>
                <linearGradient id="debtGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0.1} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />

              <XAxis
                dataKey="year"
                stroke="hsl(var(--muted-foreground))"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tick={{ fontFamily: "Open Sans" }}
                interval={0}
              />

              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatCurrency}
                domain={[minValue - padding, maxValue + padding]}
                tick={{ fontFamily: "Open Sans" }}
                width={60}
              />

              <Tooltip content={<CustomTooltip />} />

              <ReferenceLine y={0} stroke="hsl(var(--border))" strokeDasharray="2 2" strokeWidth={2} />

              {/* Debt period area (below zero) */}
              <Area
                type="monotone"
                dataKey="netWorth"
                stroke="hsl(var(--destructive))"
                strokeWidth={2}
                fill="url(#debtGradient)"
                fillOpacity={1}
                connectNulls={false}
                dot={false}
                activeDot={{
                  r: 4,
                  stroke: "hsl(var(--destructive))",
                  strokeWidth: 2,
                  fill: "hsl(var(--background))",
                }}
              />

              {/* Profit period area (above zero) */}
              <Area
                type="monotone"
                dataKey={(entry: ChartDataPoint) => (entry.netWorth >= 0 ? entry.netWorth : 0)}
                stroke="hsl(var(--accent))"
                strokeWidth={2}
                fill="url(#profitGradient)"
                fillOpacity={1}
                connectNulls={false}
                dot={false}
                activeDot={{
                  r: 4,
                  stroke: "hsl(var(--accent))",
                  strokeWidth: 2,
                  fill: "hsl(var(--background))",
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <div className="flex items-center justify-center mb-2">
              <TrendingDown className="w-4 h-4 text-destructive mr-2" />
              <span className="font-['Open_Sans'] font-medium text-xs sm:text-sm">Debt Phase</span>
            </div>
            <div className="text-base sm:text-lg font-black font-['Montserrat'] text-destructive">
              {breakEvenTime.toFixed(1)} years
            </div>
            <div className="text-xs text-muted-foreground font-['Open_Sans']">Investment period</div>
          </div>

          <div className="text-center p-3 rounded-lg bg-muted/50">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-4 h-4 text-accent mr-2" />
              <span className="font-['Open_Sans'] font-medium text-xs sm:text-sm">Growth Phase</span>
            </div>
            <div className="text-base sm:text-lg font-black font-['Montserrat'] text-accent">
              {(10 - breakEvenTime).toFixed(1)} years
            </div>
            <div className="text-xs text-muted-foreground font-['Open_Sans']">Wealth building</div>
          </div>

          <div className="text-center p-3 rounded-lg bg-muted/50">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-4 h-4 text-primary mr-2" />
              <span className="font-['Open_Sans'] font-medium text-xs sm:text-sm">Final Net Worth</span>
            </div>
            <div className="text-base sm:text-lg font-black font-['Montserrat'] text-primary">
              {formatCurrency(chartData[chartData.length - 1]?.netWorth || 0)}
            </div>
            <div className="text-xs text-muted-foreground font-['Open_Sans']">After 10 years</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
