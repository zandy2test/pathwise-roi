'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ScamScoreMeter from '@/components/scam-score-meter'
import { calculateScamScore, generateShockingStats } from '@/lib/scam-score'
import { calculateROI } from '@/lib/calculator'
import { educationPaths } from '@/lib/data'
import type { CalculatorInputs, EducationPath, CalculationResult } from '@/lib/types'
import { AnimatedGradientHeading } from '@/components/magic/animated-gradient-text'
import { CTAButton, ShimmerButton } from '@/components/magic/shimmer-button'
import { NumberTicker } from '@/components/magic/number-ticker'
import { 
  ArrowLeft,
  Share2,
  TrendingDown,
  DollarSign,
  Clock,
  AlertTriangle,
  Brain,
  Sparkles,
  Skull,
  Car,
  Home,
  Plane,
  Coffee,
  Hammer,
  TrendingUp,
  Zap
} from 'lucide-react'
import ShareResultCard from '@/components/share-result-card'
import analytics from '@/lib/analytics'

export default function ResultsPage() {
  const router = useRouter()
  const [inputs, setInputs] = useState<CalculatorInputs | null>(null)
  const [educationPath, setEducationPath] = useState<EducationPath | null>(null)
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [scamScore, setScamScore] = useState<number>(0)
  const [shockingStats, setShockingStats] = useState<string[]>([])
  const [showAlternatives, setShowAlternatives] = useState(false)
  const [showWhatYouCouldBuy, setShowWhatYouCouldBuy] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)

  useEffect(() => {
    // Get inputs from session storage
    const storedInputs = sessionStorage.getItem('calculatorInputs')
    if (!storedInputs) {
      router.push('/calculate')
      return
    }

    const parsedInputs = JSON.parse(storedInputs) as CalculatorInputs
    const path = educationPaths[parsedInputs.path]
    
    if (!path) {
      router.push('/calculate')
      return
    }

    const calculationResult = calculateROI(parsedInputs)
    if (!calculationResult) {
      router.push('/calculate')
      return
    }

    const scamResult = calculateScamScore(path, calculationResult)
    const stats = generateShockingStats(path, calculationResult)

    setInputs(parsedInputs)
    setEducationPath(path)
    setResult(calculationResult)
    setScamScore(scamResult.totalScore)
    setShockingStats(stats)
    
    // Track page view and calculation completion
    analytics.pageView('/results', '/calculate')
    analytics.calculationCompleted(
      path.name, 
      calculationResult.roi, 
      calculationResult.totalCost,
      Math.round(calculationResult.breakevenMonths / 12)
    )
    
    // Track conversion goal
    analytics.conversionGoal('calculation_completed', calculationResult.totalCost)
    
    // Show confetti for good scores, delayed for dramatic effect
    if (scamResult.totalScore < 30) {
      setTimeout(() => setShowConfetti(true), 2000)
    }
    
    // Show alternatives and comparisons after initial load
    setTimeout(() => {
      setShowAlternatives(true)
      if (scamResult.totalScore > 40) {
        analytics.featureEngagement('alternatives', 'shown')
      }
    }, 3000)
    
    setTimeout(() => {
      setShowWhatYouCouldBuy(true)
      if (calculationResult.totalCost > 20000) {
        analytics.featureEngagement('what-you-could-buy', 'shown')
      }
    }, 3500)
  }, [router])

  const handleRecalculate = () => {
    analytics.ctaClicked('recalculate', 'results-page')
    router.push('/calculate')
  }

  const handleCompare = () => {
    analytics.ctaClicked('compare-paths', 'results-page')
    // TODO: Navigate to compare page
    router.push('/calculate')
  }

  if (!inputs || !educationPath || !result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <AlertTriangle className="h-12 w-12 text-red-500" />
        </motion.div>
      </div>
    )
  }

  const getVerdictColor = (score: number) => {
    if (score >= 70) return 'text-red-500'
    if (score >= 50) return 'text-yellow-500'
    if (score >= 30) return 'text-orange-500'
    return 'text-green-500'
  }

  const getVerdictText = (score: number) => {
    if (score >= 70) return "YOU'RE BEING SCAMMED!"
    if (score >= 50) return "Questionable Investment"
    if (score >= 30) return "Proceed with Caution"
    return "Smart Investment"
  }

  // Calculate what you could buy instead of education debt
  const getWhatYouCouldBuy = (totalCost: number) => {
    const items = []
    
    if (totalCost > 200000) {
      items.push({ icon: Home, text: "A starter home in most US cities", amount: "$200,000" })
    }
    if (totalCost > 100000) {
      items.push({ icon: Car, text: "2 Tesla Model 3s", amount: "$90,000" })
    }
    if (totalCost > 50000) {
      items.push({ icon: Plane, text: "120 round-trip flights to Europe", amount: "$48,000" })
    }
    if (totalCost > 20000) {
      items.push({ icon: Coffee, text: "13 years of daily Starbucks", amount: "$18,250" })
    }
    
    return items
  }
  
  // Get alternative education paths
  const getAlternativePaths = () => {
    const alternatives = []
    
    // Always suggest trade school if not already selected
    if (!educationPath?.name.includes('Trade')) {
      alternatives.push({
        name: "Trade School - Electrician",
        scamScore: 15,
        totalCost: 20000,
        breakevenYears: 2,
        icon: Hammer
      })
    }
    
    // Suggest bootcamp for tech fields
    if (educationPath?.name.includes('Computer') || educationPath?.name.includes('Software')) {
      alternatives.push({
        name: "Coding Bootcamp",
        scamScore: 25,
        totalCost: 15000,
        breakevenYears: 1,
        icon: Zap
      })
    }
    
    // Always show self-taught option
    alternatives.push({
      name: "Self-Taught + Certifications",
      scamScore: 10,
      totalCost: 2000,
      breakevenYears: 0.5,
      icon: Sparkles
    })
    
    return alternatives
  }
  
  // Calculate years of life lost to debt
  const getYearsLostToDebt = () => {
    if (!result) return 0
    const yearsPayingDebt = result.breakevenMonths / 12
    const stressYears = yearsPayingDebt * 0.5 // Stress factor
    return Math.round(yearsPayingDebt + stressYears)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden">
      {/* Confetti Animation for Good Scores */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none z-50"
          >
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-gradient-to-br from-green-400 to-green-600"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -20,
                  rotate: 0
                }}
                animate={{
                  y: window.innerHeight + 20,
                  rotate: 360,
                  transition: {
                    duration: Math.random() * 3 + 2,
                    ease: "linear",
                    repeat: 0
                  }
                }}
                style={{
                  left: `${Math.random() * 100}%`
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Warning Animation for Bad Scores */}
      {scamScore >= 70 && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            backgroundColor: ["rgba(220, 38, 38, 0)", "rgba(220, 38, 38, 0.1)", "rgba(220, 38, 38, 0)"]
          }}
          transition={{
            duration: 2,
            repeat: 3,
            ease: "easeInOut"
          }}
        />
      )}
      
      <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            onClick={handleRecalculate}
            variant="ghost"
            className="text-gray-700 hover:text-blue-600 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Calculator
          </Button>
          
          <AnimatedGradientHeading className="text-4xl md:text-5xl font-black text-center mb-4">
            Your Scam Score™ Results
          </AnimatedGradientHeading>
        </motion.div>

        {/* Main Results Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Scam Score Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <ScamScoreMeter 
              score={scamScore}
              pathName={educationPath.name}
              aiRiskScore={educationPath.aiRiskScore}
              brutalTruth={educationPath.brutalTruth}
            />
          </motion.div>

          {/* Key Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            {/* Verdict */}
            <Card className="bg-white/90 border-gray-200 shadow-xl backdrop-blur-sm">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-black mb-2 text-gray-900">The Verdict:</h3>
                <p className={`text-3xl font-black ${getVerdictColor(scamScore)}`}>
                  {getVerdictText(scamScore)}
                </p>
              </CardContent>
            </Card>

            {/* Financial Breakdown */}
            <Card className="bg-white/90 border-gray-200 shadow-xl backdrop-blur-sm">
              <CardContent className="pt-6 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Total Cost
                  </span>
                  <span className="text-xl font-bold text-red-600">
                    $<NumberTicker value={result.totalCost} delay={0.3} />
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Time to Break Even
                  </span>
                  <span className="text-xl font-bold text-yellow-600">
                    <NumberTicker value={Math.round(result.breakevenMonths / 12)} delay={0.5} /> years
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center gap-2">
                    <TrendingDown className="h-4 w-4" />
                    ROI
                  </span>
                  <span className={`text-xl font-bold ${result.roi > 50 ? 'text-green-600' : 'text-orange-600'}`}>
                    <NumberTicker value={result.roi} decimalPlaces={1} suffix="%" delay={0.7} />
                  </span>
                </div>

                {educationPath.aiRiskScore && educationPath.aiRiskScore > 30 && (
                  <div className="flex justify-between items-center pt-2 border-t border-gray-300">
                    <span className="text-gray-600 flex items-center gap-2">
                      <Brain className="h-4 w-4" />
                      AI Risk
                    </span>
                    <span className="text-xl font-bold text-yellow-600">
                      <NumberTicker value={educationPath.aiRiskScore} suffix="%" delay={0.9} />
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Shocking Statistics */}
        {shockingStats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <Card className="bg-white/90 border-gray-200 shadow-xl backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900 flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6 text-red-500" />
                  Reality Check
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {shockingStats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="flex items-start gap-2"
                    >
                      <span className="text-xl">{stat.split(' ')[0]}</span>
                      <p className="text-gray-700">{stat.substring(stat.indexOf(' ') + 1)}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* 10-Year Projection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mb-8"
        >
          <Card className="bg-white/90 border-gray-200 shadow-xl backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">10-Year Financial Projection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <p className="text-gray-600 mb-1">Net Worth at 10 Years</p>
                  <div className={`text-3xl font-bold ${result.netWorth10Years > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    $<NumberTicker value={result.netWorth10Years} delay={1.0} />
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Employment Rate</p>
                  <div className="text-3xl font-bold text-yellow-600">
                    <NumberTicker value={result.employmentRate * 100} suffix="%" delay={1.1} />
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Opportunity Cost</p>
                  <div className="text-3xl font-bold text-orange-600">
                    $<NumberTicker value={result.opportunityCost} delay={1.2} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Years of Life Lost to Debt */}
        {result.totalCost > 50000 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5 }}
            className="mb-8"
          >
            <Card className="bg-red-50 border-2 border-red-400 shadow-xl backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Skull className="h-12 w-12 text-red-600 mx-auto mb-4 animate-pulse" />
                  <h3 className="text-2xl font-black text-red-600 mb-2">
                    Years of Life Lost to Debt
                  </h3>
                  <div className="text-6xl font-black text-red-600">
                    <NumberTicker value={getYearsLostToDebt()} delay={2} />
                  </div>
                  <p className="text-gray-700 mt-2">
                    Years you'll spend stressed about money instead of living
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* What You Could Buy Instead */}
        <AnimatePresence>
          {showWhatYouCouldBuy && result.totalCost > 20000 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.5 }}
              className="mb-8"
            >
              <Card className="bg-white/90 border-yellow-400 border-2 shadow-xl backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900 flex items-center gap-2">
                    <DollarSign className="h-6 w-6 text-yellow-600" />
                    What ${result.totalCost.toLocaleString()} Could Buy Instead
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {getWhatYouCouldBuy(result.totalCost).map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-300"
                      >
                        <item.icon className="h-8 w-8 text-yellow-600 flex-shrink-0" />
                        <div>
                          <p className="text-gray-900 font-semibold">{item.text}</p>
                          <p className="text-yellow-600 text-sm">{item.amount}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Alternative Path Suggestions */}
        <AnimatePresence>
          {showAlternatives && scamScore > 40 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
            >
              <Card className="bg-white/90 border-green-400 border-2 shadow-xl backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900 flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                    Better Alternatives to Consider
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {getAlternativePaths().map((alt, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.15 }}
                        className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-300 hover:bg-green-100 transition-all cursor-pointer"
                        onClick={() => {
                          analytics.featureEngagement('alternative-path', alt.name)
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <alt.icon className="h-8 w-8 text-green-600" />
                          <div>
                            <h4 className="text-gray-900 font-bold">{alt.name}</h4>
                            <p className="text-green-600 text-sm">
                              Scam Score™: {alt.scamScore} | Cost: ${alt.totalCost.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-green-600 font-bold">
                            {alt.breakevenYears} years
                          </p>
                          <p className="text-gray-600 text-xs">to break even</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="text-center text-gray-600 text-sm mt-4"
                  >
                    💡 Pro tip: Trade schools and bootcamps often have better ROI than traditional degrees
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <CTAButton
            onClick={handleRecalculate}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
          >
            Try Different Path
          </CTAButton>
          <ShimmerButton
            onClick={handleCompare}
            className="px-8 py-6"
            shimmerColor="#dc2626"
            background="transparent"
          >
            Compare Paths
          </ShimmerButton>
          <ShimmerButton
            onClick={() => {
              analytics.shareButtonClicked('results-page')
              setShowShareModal(true)
            }}
            className="px-8 py-6"
            shimmerColor="#9ca3af"
            background="transparent"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share Results
          </ShimmerButton>
        </motion.div>

        {/* Bottom Warning */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600 text-sm">
            * Calculations based on current market data and employment statistics. 
            Individual results may vary. This tool is for educational purposes only.
          </p>
        </motion.div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <ShareResultCard
          scamScore={scamScore}
          educationPath={educationPath.name}
          totalCost={result.totalCost}
          breakevenYears={Math.round(result.breakevenMonths / 12)}
          aiRisk={educationPath.aiRiskScore || 0}
          roi={result.roi}
          format="instagram"
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  )
}
