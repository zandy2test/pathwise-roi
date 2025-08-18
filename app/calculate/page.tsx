'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import PathBuilder from '@/components/path-builder'
import ScamScoreMeter from '@/components/scam-score-meter'
import { calculateScamScore } from '@/lib/scam-score'
import { calculateROI } from '@/lib/calculator'
import { educationPaths } from '@/lib/data'
import type { CalculatorInputs, EducationPath } from '@/lib/types'
import { validateCalculatorInputs } from '@/lib/validation'
import { AnimatedGradientHeading, AnimatedGradientText } from '@/components/magic/animated-gradient-text'
import { CTAButton } from '@/components/magic/shimmer-button'
import { NumberTicker } from '@/components/magic/number-ticker'
import { 
  DollarSign, 
  Brain, 
  Zap,
  Skull,
  CheckCircle2,
  Siren
} from 'lucide-react'
import analytics from '@/lib/analytics'
import { TooltipProvider } from '@/components/ui/tooltip'

export default function CalculatePage() {
  const router = useRouter()
  const [inputs, setInputs] = useState<CalculatorInputs>({
    path: '',
    educationType: '',
    field: '',
    program: '',
    location: '',
    schoolTier: '',
    livingCost: '',
    scholarships: 0
  })
  
  const [errors, setErrors] = useState<string[]>([])
  const [isCalculating, setIsCalculating] = useState(false)
  const [liveScamScore, setLiveScamScore] = useState<number>(0)
  const [debtAmount, setDebtAmount] = useState<number>(0)
  const [selectedPath, setSelectedPath] = useState<EducationPath | null>(null)
  const [showDangerZone, setShowDangerZone] = useState(false)

  // Track page view on mount
  useEffect(() => {
    analytics.pageView('/calculate', '/')
  }, [])

  // Calculate live Scam Score as user fills form
  useEffect(() => {
    if (inputs.path && educationPaths[inputs.path]) {
      const path = educationPaths[inputs.path]
      setSelectedPath(path)
      
      // Calculate estimated debt
      const result = calculateROI(inputs)
      if (result) {
        setDebtAmount(result.totalCost - (inputs.scholarships || 0))
        
        // Calculate live Scam Score
        const scamResult = calculateScamScore(path, result)
        setLiveScamScore(scamResult.totalScore)
        
        // Show danger alerts
        const shouldShowDangerZone = (result.totalCost - (inputs.scholarships || 0)) > 100000
        setShowDangerZone(shouldShowDangerZone)
        
        // Track when user enters danger zone
        if (shouldShowDangerZone && !showDangerZone) {
          analytics.featureEngagement('danger-zone', 'shown')
        }
      }
    } else {
      setSelectedPath(null)
      setLiveScamScore(0)
      setDebtAmount(0)
      setShowDangerZone(false)
    }
  }, [inputs, showDangerZone])

  const handleCalculate = () => {
    const validationErrors = validateCalculatorInputs(inputs)
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      analytics.errorOccurred('Validation failed: ' + validationErrors.join(', '), 'calculate')
      return
    }
    
    setIsCalculating(true)
    
    // Track calculation started
    analytics.ctaClicked('calculate', 'calculate-page')
    analytics.conversionGoal('calculation_started', debtAmount)
    
    // Store inputs and navigate to results
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('calculatorInputs', JSON.stringify(inputs))
      setTimeout(() => {
        router.push('/results')
      }, 1500)
    }
  }

  const getScamVerdict = (score: number) => {
    if (score >= 70) return "🚨 YOU'RE BEING SCAMMED!"
    if (score >= 50) return "⚠️ Questionable Investment"
    if (score >= 30) return "🤔 Proceed with Caution"
    return "✅ Smart Choice"
  }

  const getDebtColor = (amount: number) => {
    if (amount > 150000) return "text-red-600"
    if (amount > 100000) return "text-orange-600"
    if (amount > 50000) return "text-yellow-600"
    return "text-green-600"
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <AnimatedGradientHeading className="text-4xl md:text-5xl font-black mb-4">
            Calculate Your Scam Score™
          </AnimatedGradientHeading>
          <p className="text-xl text-gray-700">
            Let's find out if you're about to get played by the education industrial complex
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Calculator Form */}
          <div className="md:col-span-2">
            <Card className="bg-white/90 border-gray-200 shadow-xl backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">
                  Your Education Path
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Choose wisely... your financial future depends on it
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PathBuilder 
                  inputs={inputs}
                  setInputs={setInputs}
                  errors={errors}
                />
                
                {/* Calculate Button */}
                <motion.div className="mt-8">
                  <CTAButton
                    onClick={handleCalculate}
                    disabled={!inputs.path || isCalculating}
                    className="w-full"
                  >
                    {isCalculating ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Siren className="h-6 w-6" />
                      </motion.div>
                    ) : (
                      <>
                        Calculate My Fate
                        <Zap className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </CTAButton>
                </motion.div>
              </CardContent>
            </Card>
          </div>

          {/* Live Feedback Panel */}
          <div className="space-y-4">
            {/* Live Scam Score */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-white/90 border-gray-200 shadow-xl backdrop-blur-sm overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-gray-900">
                    Live Scam Score™
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {inputs.path ? (
                    <>
                      <ScamScoreMeter 
                        score={liveScamScore} 
                        pathName={selectedPath?.name || 'Education Path'}
                      />
                      <motion.p 
                        key={liveScamScore}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mt-4 font-bold text-lg"
                      >
                        {getScamVerdict(liveScamScore)}
                      </motion.p>
                    </>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      Select an education path to see your Scam Score™
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Debt Counter */}
            <AnimatePresence>
              {debtAmount > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card className="bg-white/90 border-gray-200 shadow-xl backdrop-blur-sm">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-600">Total Debt</span>
                        <DollarSign className="h-5 w-5 text-red-500" />
                      </div>
                      <div className={`text-3xl font-black ${getDebtColor(debtAmount)}`}>
                        $<NumberTicker value={debtAmount} delay={0.2} />
                      </div>
                      {debtAmount > 100000 && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-red-400 text-sm mt-2 font-semibold"
                        >
                          ⚠️ Six-figure debt detected!
                        </motion.p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* AI Risk Alert */}
            <AnimatePresence>
              {selectedPath && (selectedPath.aiRiskScore || 0) > 30 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card className={`border-2 shadow-xl ${
                    (selectedPath.aiRiskScore || 0) > 60 
                      ? 'bg-red-50 border-red-400' 
                      : 'bg-yellow-50 border-yellow-400'
                  }`}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="h-5 w-5 text-yellow-600" />
                        <span className="text-gray-900 font-semibold">AI Risk</span>
                      </div>
                      <div className="text-2xl font-black text-yellow-600">
                        <NumberTicker value={selectedPath.aiRiskScore || 0} suffix="%" delay={0.3} />
                      </div>
                      <p className="text-sm mt-2 text-gray-700">
                        {(selectedPath.aiRiskScore || 0) > 60 
                          ? "🤖 AI APOCALYPSE ALERT!"
                          : "Moderate automation risk"}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Warning Alerts */}
            <AnimatePresence>
              {showDangerZone && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="bg-red-50 border-2 border-red-400 rounded-lg p-4 shadow-xl"
                >
                  <div className="flex items-center gap-2">
                    <Skull className="h-6 w-6 text-red-600 animate-pulse" />
                    <span className="font-bold text-red-600">
                      DANGER ZONE!
                    </span>
                  </div>
                  <p className="text-sm text-red-700 mt-1">
                    You're entering life-crushing debt territory
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success Indicator for Trade Schools */}
            <AnimatePresence>
              {selectedPath && selectedPath.name.toLowerCase().includes('trade') && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="bg-green-50 border-2 border-green-400 rounded-lg p-4 shadow-xl"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                    <span className="font-bold text-green-600">
                      SMART CHOICE!
                    </span>
                  </div>
                  <p className="text-sm text-green-700 mt-1">
                    High ROI potential detected
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Brutal Truth Card */}
            <AnimatePresence>
              {selectedPath && selectedPath.brutalTruth && (
                <motion.div
                  initial={{ opacity: 0, rotate: -2 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 2 }}
                  className="bg-white border border-gray-300 rounded-lg p-4 shadow-xl"
                >
                  <p className="text-sm font-semibold text-gray-600 mb-1">
                    Reality Check:
                  </p>
                  <p className="text-gray-900 italic">
                    "{selectedPath.brutalTruth}"
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Warning */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600 text-sm">
            * Results based on real data. Your mileage may vary. 
            Student loan companies hate this calculator.
          </p>
          </motion.div>
        </div>
      </div>
    </TooltipProvider>
  )
}
