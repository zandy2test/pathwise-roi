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
import { 
  AlertTriangle, 
  TrendingUp, 
  DollarSign, 
  Brain, 
  AlertCircle,
  Zap,
  Skull,
  CheckCircle2,
  Siren
} from 'lucide-react'

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
  const [showAIAlert, setShowAIAlert] = useState(false)

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
        setShowDangerZone(debtAmount > 100000)
        setShowAIAlert((path.aiRiskScore || 0) > 60)
      }
    } else {
      setSelectedPath(null)
      setLiveScamScore(0)
      setDebtAmount(0)
      setShowDangerZone(false)
      setShowAIAlert(false)
    }
  }, [inputs])

  const handleCalculate = () => {
    const validationErrors = validateCalculatorInputs(inputs)
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }
    
    setIsCalculating(true)
    
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
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Calculate Your <span className="text-red-500">Scam Score™</span>
          </h1>
          <p className="text-xl text-gray-300">
            Let's find out if you're about to get played by the education industrial complex
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Calculator Form */}
          <div className="md:col-span-2">
            <Card className="bg-gray-900/90 border-red-900/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-white">
                  Your Education Path
                </CardTitle>
                <CardDescription className="text-gray-400">
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
                  <Button
                    onClick={handleCalculate}
                    disabled={!inputs.path || isCalculating}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-6 text-lg shadow-lg transition-all duration-200 disabled:opacity-50"
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
                  </Button>
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
              <Card className="bg-gray-900/90 border-red-900/50 backdrop-blur-sm overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white">
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
                  <Card className="bg-gray-900/90 border-red-900/50 backdrop-blur-sm">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400">Total Debt</span>
                        <DollarSign className="h-5 w-5 text-red-500" />
                      </div>
                      <motion.div
                        key={debtAmount}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className={`text-3xl font-black ${getDebtColor(debtAmount)}`}
                      >
                        ${debtAmount.toLocaleString()}
                      </motion.div>
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
                  <Card className={`border ${
                    (selectedPath.aiRiskScore || 0) > 60 
                      ? 'bg-red-950/90 border-red-500' 
                      : 'bg-yellow-950/90 border-yellow-600'
                  }`}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="h-5 w-5 text-yellow-500" />
                        <span className="text-white font-semibold">AI Risk</span>
                      </div>
                      <div className="text-2xl font-black text-yellow-400">
                        {selectedPath.aiRiskScore || 0}%
                      </div>
                      <p className="text-sm mt-2 text-gray-300">
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
                  className="bg-red-600/20 border-2 border-red-600 rounded-lg p-4"
                >
                  <div className="flex items-center gap-2">
                    <Skull className="h-6 w-6 text-red-500 animate-pulse" />
                    <span className="font-bold text-red-400">DANGER ZONE!</span>
                  </div>
                  <p className="text-sm text-red-300 mt-1">
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
                  className="bg-green-600/20 border-2 border-green-600 rounded-lg p-4"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                    <span className="font-bold text-green-400">SMART CHOICE!</span>
                  </div>
                  <p className="text-sm text-green-300 mt-1">
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
                  className="bg-gray-800/90 border border-gray-700 rounded-lg p-4"
                >
                  <p className="text-sm font-semibold text-gray-400 mb-1">
                    Reality Check:
                  </p>
                  <p className="text-white italic">
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
          <p className="text-gray-500 text-sm">
            * Results based on real data. Your mileage may vary. 
            Student loan companies hate this calculator.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
