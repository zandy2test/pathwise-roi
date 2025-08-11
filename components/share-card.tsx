'use client'

import { useEffect, useRef } from 'react'
import type { CalculationResult } from '@/lib/types'

interface ShareCardProps {
  result: CalculationResult
  pathName: string
  comparison?: {
    path2Name: string
    result2: CalculationResult
    winner: 'path1' | 'path2'
    differenceMonths: number
    differenceAmount: number
  }
}

export default function ShareCard({ result, pathName, comparison }: ShareCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size (optimized for social media)
    canvas.width = 1200
    canvas.height = 630

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, '#1e40af')
    gradient.addColorStop(1, '#7c3aed')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add subtle pattern overlay
    ctx.globalAlpha = 0.1
    for (let i = 0; i < canvas.width; i += 40) {
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, canvas.height)
      ctx.stroke()
    }
    for (let i = 0; i < canvas.height; i += 40) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(canvas.width, i)
      ctx.stroke()
    }
    ctx.globalAlpha = 1

    // Title
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 72px system-ui, -apple-system, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('PathwiseROI', canvas.width / 2, 100)

    // Subtitle
    ctx.font = '32px system-ui, -apple-system, sans-serif'
    ctx.fillStyle = '#e0e7ff'
    
    if (comparison) {
      ctx.fillText(`${pathName} vs ${comparison.path2Name}`, canvas.width / 2, 150)
    } else {
      ctx.fillText(pathName, canvas.width / 2, 150)
    }

    // Main content box
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'
    ctx.roundRect(100, 200, canvas.width - 200, 300, 20)
    ctx.fill()

    if (comparison) {
      // Comparison view
      const winner = comparison.winner === 'path1' ? pathName : comparison.path2Name
      
      // Winner text
      ctx.fillStyle = '#059669'
      ctx.font = 'bold 48px system-ui, -apple-system, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(`${winner} WINS!`, canvas.width / 2, 280)

      // Comparison stats
      ctx.fillStyle = '#111827'
      ctx.font = '36px system-ui, -apple-system, sans-serif'
      ctx.fillText(
        `Breaks even ${comparison.differenceMonths} months faster`,
        canvas.width / 2,
        350
      )
      
      ctx.font = 'bold 42px system-ui, -apple-system, sans-serif'
      ctx.fillStyle = '#059669'
      ctx.fillText(
        `+$${comparison.differenceAmount.toLocaleString()} richer in 10 years`,
        canvas.width / 2,
        420
      )
    } else {
      // Single path view
      // Breakeven time
      ctx.fillStyle = '#111827'
      ctx.font = '36px system-ui, -apple-system, sans-serif'
      ctx.textAlign = 'left'
      ctx.fillText('Breaks even in:', 150, 280)
      
      ctx.fillStyle = '#2563eb'
      ctx.font = 'bold 56px system-ui, -apple-system, sans-serif'
      ctx.textAlign = 'right'
      const breakevenText = result.breakevenMonths > 120 ? 'Never' : `${result.breakevenMonths} months`
      ctx.fillText(breakevenText, canvas.width - 150, 280)

      // 10-year net worth
      ctx.fillStyle = '#111827'
      ctx.font = '36px system-ui, -apple-system, sans-serif'
      ctx.textAlign = 'left'
      ctx.fillText('10-Year Net Worth:', 150, 380)
      
      ctx.fillStyle = '#059669'
      ctx.font = 'bold 56px system-ui, -apple-system, sans-serif'
      ctx.textAlign = 'right'
      ctx.fillText(`$${result.netWorth10Years.toLocaleString()}`, canvas.width - 150, 380)

      // Total cost
      ctx.fillStyle = '#111827'
      ctx.font = '36px system-ui, -apple-system, sans-serif'
      ctx.textAlign = 'left'
      ctx.fillText('Total Cost:', 150, 460)
      
      ctx.fillStyle = '#dc2626'
      ctx.font = 'bold 42px system-ui, -apple-system, sans-serif'
      ctx.textAlign = 'right'
      ctx.fillText(`$${result.totalCost.toLocaleString()}`, canvas.width - 150, 460)
    }

    // Call to action
    ctx.fillStyle = '#ffffff'
    ctx.font = '28px system-ui, -apple-system, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('Calculate your education ROI at pathwiseroi.com', canvas.width / 2, 570)

    // Add graph visualization (simplified)
    if (!comparison) {
      const graphX = 100
      const graphY = 500
      const graphWidth = canvas.width - 200
      const graphHeight = 80

      // Draw mini timeline
      ctx.strokeStyle = '#e5e7eb'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(graphX, graphY + graphHeight/2)
      ctx.lineTo(graphX + graphWidth, graphY + graphHeight/2)
      ctx.stroke()

      // Draw debt to profit curve
      ctx.strokeStyle = '#2563eb'
      ctx.lineWidth = 3
      ctx.beginPath()
      
      // Start in debt
      ctx.moveTo(graphX, graphY + graphHeight)
      
      // Curve to breakeven
      const breakevenX = result.breakevenMonths <= 120 
        ? graphX + (result.breakevenMonths / 120) * graphWidth
        : graphX + graphWidth
      
      ctx.quadraticCurveTo(
        breakevenX - 50, graphY + graphHeight,
        breakevenX, graphY + graphHeight/2
      )
      
      // Continue to profit
      if (result.breakevenMonths <= 120) {
        ctx.quadraticCurveTo(
          breakevenX + 50, graphY,
          graphX + graphWidth, graphY
        )
      }
      
      ctx.stroke()

      // Mark breakeven point
      if (result.breakevenMonths <= 120) {
        ctx.fillStyle = '#059669'
        ctx.beginPath()
        ctx.arc(breakevenX, graphY + graphHeight/2, 6, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  }, [result, pathName, comparison])

  // Extend CanvasRenderingContext2D with roundRect if needed
  useEffect(() => {
    if (!CanvasRenderingContext2D.prototype.roundRect) {
      CanvasRenderingContext2D.prototype.roundRect = function(
        x: number, 
        y: number, 
        width: number, 
        height: number, 
        radius: number
      ) {
        this.beginPath()
        this.moveTo(x + radius, y)
        this.lineTo(x + width - radius, y)
        this.quadraticCurveTo(x + width, y, x + width, y + radius)
        this.lineTo(x + width, y + height - radius)
        this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
        this.lineTo(x + radius, y + height)
        this.quadraticCurveTo(x, y + height, x, y + height - radius)
        this.lineTo(x, y + radius)
        this.quadraticCurveTo(x, y, x + radius, y)
        this.closePath()
      }
    }
  }, [])

  const handleDownload = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Convert to blob and download
    canvas.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `pathwise-roi-${Date.now()}.png`
      a.click()
      URL.revokeObjectURL(url)
    }, 'image/png')
  }

  const handleShare = async () => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.toBlob(async (blob) => {
      if (!blob) return
      
      const file = new File([blob], 'pathwise-roi.png', { type: 'image/png' })
      
      if (navigator.share && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: 'PathwiseROI Results',
            text: comparison 
              ? `${pathName} vs ${comparison.path2Name} - See the shocking difference!`
              : `My ${pathName} path breaks even in ${result.breakevenMonths} months!`
          })
        } catch (err) {
          console.error('Share failed:', err)
        }
      } else {
        // Fallback to download
        handleDownload()
      }
    }, 'image/png')
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg overflow-hidden shadow-lg">
        <canvas 
          ref={canvasRef}
          className="w-full h-auto"
          style={{ maxWidth: '600px' }}
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleShare}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Share Image
        </button>
        <button
          onClick={handleDownload}
          className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Download Image
        </button>
      </div>
    </div>
  )
}

// TypeScript extension for roundRect
declare global {
  interface CanvasRenderingContext2D {
    roundRect(x: number, y: number, width: number, height: number, radius: number): void
  }
}
