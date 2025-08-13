'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { AlertTriangle, TrendingUp, CheckCircle } from 'lucide-react'

interface ScamScoreMeterProps {
  score: number
  pathName: string
  aiRiskScore?: number
  brutalTruth?: string
}

export default function ScamScoreMeter({ score, pathName, aiRiskScore, brutalTruth }: ScamScoreMeterProps) {
  const [animatedScore, setAnimatedScore] = useState(0)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score)
    }, 500)
    return () => clearTimeout(timer)
  }, [score])

  const getScoreColor = (score: number) => {
    if (score <= 30) return '#10B981' // Green - Smart Investment
    if (score <= 60) return '#F59E0B' // Yellow - Questionable Choice  
    return '#DC2626' // Red - SCAM!
  }

  const getScoreLabel = (score: number) => {
    if (score <= 30) return 'Smart Investment'
    if (score <= 60) return 'Questionable Choice'
    return 'YOU\'RE BEING SCAMMED!'
  }

  const getScoreIcon = (score: number) => {
    if (score <= 30) return <CheckCircle className="h-6 w-6 text-green-600" />
    if (score <= 60) return <TrendingUp className="h-6 w-6 text-yellow-600" />
    return <AlertTriangle className="h-6 w-6 text-red-600" />
  }

  const getScoreDescription = (score: number) => {
    if (score <= 30) return 'This path shows strong ROI potential with reasonable risk levels.'
    if (score <= 60) return 'Mixed signals - decent potential but significant concerns exist.'
    return 'High cost, questionable returns, and major red flags detected!'
  }

  const circumference = 2 * Math.PI * 90
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-gray-50 to-white border-2 shadow-lg">
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Scam Score™</h2>
          <p className="text-sm text-gray-600">for {pathName}</p>
        </div>
        
        {/* Circular Progress Meter */}
        <div className="relative w-48 h-48 mx-auto mb-6">
          <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 200 200">
            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r="90"
              stroke="#E5E7EB"
              strokeWidth="12"
              fill="none"
            />
            {/* Progress circle */}
            <motion.circle
              cx="100"
              cy="100"
              r="90"
              stroke={getScoreColor(score)}
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>
          
          {/* Score display in center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-5xl font-black mb-1" style={{ color: getScoreColor(score) }}>
                {Math.round(animatedScore)}
              </div>
              <div className="text-lg font-semibold text-gray-600">/ 100</div>
            </motion.div>
          </div>
        </div>

        {/* Score Label */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="text-center mb-4"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            {getScoreIcon(score)}
            <h3 
              className="text-xl font-bold"
              style={{ color: getScoreColor(score) }}
            >
              {getScoreLabel(score)}
            </h3>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            {getScoreDescription(score)}
          </p>
        </motion.div>

        {/* AI Risk Alert */}
        {aiRiskScore && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2 }}
            className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">🤖</span>
              <span className="font-semibold text-red-800 text-sm">AI Risk Alert</span>
            </div>
            <p className="text-red-700 text-sm">
              <strong>{aiRiskScore}%</strong> automation risk detected
            </p>
          </motion.div>
        )}

        {/* Brutal Truth */}
        {brutalTruth && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5 }}
            className="bg-gray-100 rounded-lg p-4 border-l-4 border-gray-400"
          >
            <div className="flex items-start gap-2">
              <span className="text-lg mt-0.5">💬</span>
              <div>
                <p className="font-semibold text-gray-800 text-sm mb-1">Reality Check</p>
                <p className="text-gray-700 text-sm italic">"{brutalTruth}"</p>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}
