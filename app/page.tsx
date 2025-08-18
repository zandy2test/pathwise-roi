'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PathBuilder from '@/components/path-builder';
import ROITimeline from '@/components/roi-timeline';
import { Footer } from '@/components/footer';
import { LoanPaymentCalculator } from '@/components/loan-payment-calculator';
import { CareerTrajectoryChart } from '@/components/career-trajectory-chart';
import { AIRiskIndicator } from '@/components/ai-risk-indicator';
import { calculateROI } from '@/lib/calculator';
import { validateCalculatorInputs } from '@/lib/validation';
import { educationPaths } from '@/lib/data';
import analytics from '@/lib/analytics';
import type { CalculatorInputs, CalculationResult } from '@/lib/types';
import { AnimatedGradientHeading } from '@/components/magic/animated-gradient-text';
import { CTAButton, PremiumButton, ShimmerButton } from '@/components/magic/shimmer-button';
import { NumberTicker } from '@/components/magic/number-ticker';
import { EmailCaptureModal } from '@/components/email-capture-modal';
import { TestimonialsSection } from '@/components/testimonials-section';
import { SocialProofSection } from '@/components/social-proof-section';
import {
  TrendingUp,
  Calendar,
  Trophy,
  Plus,
  Share2,
  Check,
  Sparkles,
  BarChart3,
  Target,
  Brain,
  LineChart,
  AlertTriangle,
} from 'lucide-react';

export default function HomePage() {
  const [port, setPort] = useState<string>('....');
  const [inputs1, setInputs1] = useState<CalculatorInputs>({
    path: '',
    location: '',
    schoolTier: '',
    livingCost: '',
    scholarships: 0,
    loanInterestRate: 7,
    degreeLevel: 'bachelors',
    region: '',
  });
  const [inputs2, setInputs2] = useState<CalculatorInputs>({
    path: '',
    location: '',
    schoolTier: '',
    livingCost: '',
    scholarships: 0,
    loanInterestRate: 7,
    degreeLevel: 'bachelors',
    region: '',
  });
  const [errors1, setErrors1] = useState<string[]>([]);
  const [errors2, setErrors2] = useState<string[]>([]);
  const [result1, setResult1] = useState<CalculationResult | null>(null);
  const [result2, setResult2] = useState<CalculationResult | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  // Fix hydration by only accessing window on client
  useEffect(() => {
    setPort(window.location.port || '3000');
  }, []);

  const handleCalculate = () => {
    const validationErrors = validateCalculatorInputs(inputs1);
    if (validationErrors.length > 0) {
      setErrors1(validationErrors);
      setResult1(null);
      return;
    }

    setErrors1([]);
    const calculationResult = calculateROI(inputs1);
    setResult1(calculationResult);

    // Auto-scroll to results
    setTimeout(() => {
      const resultsElement = document.getElementById('results');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);

    // Track analytics
    const path = educationPaths[inputs1.path];
    if (path && calculationResult) {
      const roi =
        ((calculationResult.netWorth10Years - calculationResult.totalCost) /
          calculationResult.totalCost) *
        100;
      analytics.calculationCompleted(path.name, roi, calculationResult.totalCost);
    }
  };

  const handleAddComparison = () => {
    setShowComparison(true);
    // Auto-scroll to comparison section
    setTimeout(() => {
      const compareElement = document.getElementById('comparison-section');
      if (compareElement) {
        compareElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleCompare = () => {
    const validationErrors2 = validateCalculatorInputs(inputs2);
    setErrors2(validationErrors2);

    if (validationErrors2.length > 0) {
      setResult2(null);
      return;
    }

    const calculationResult2 = calculateROI(inputs2);
    setResult2(calculationResult2);

    // Auto-scroll to comparison results
    setTimeout(() => {
      const compareElement = document.getElementById('comparison-results');
      if (compareElement) {
        compareElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);

    // Track analytics
    const path2 = educationPaths[inputs2.path];
    if (path2 && calculationResult2) {
      const roi =
        ((calculationResult2.netWorth10Years - calculationResult2.totalCost) /
          calculationResult2.totalCost) *
        100;
      analytics.calculationCompleted(path2.name, roi, calculationResult2.totalCost);
    }
  };

  const handleShare = () => {
    const shareData = {
      title: 'CollegeScam.io - Education Scam Score',
      text: result1
        ? `My education has a ${result1.breakevenMonths > 120 ? 'EXTREME SCAM' : result1.breakevenMonths > 60 ? 'HIGH RISK' : result1.breakevenMonths > 36 ? 'MODERATE RISK' : 'LEGITIMATE'} score! Check yours at CollegeScam.io`
        : 'Is your degree a scam? Find out at CollegeScam.io',
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare(shareData)) {
      navigator
        .share(shareData)
        .then(() => {
          analytics.shareAttempted('webshare', undefined, true);
        })
        .catch(() => {
          analytics.shareAttempted('webshare', undefined, false);
        });
    } else {
      const shareText = `${shareData.text} - ${shareData.url}`;
      navigator.clipboard
        .writeText(shareText)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
          analytics.shareAttempted('clipboard', undefined, true);
        })
        .catch(() => {
          analytics.shareAttempted('clipboard', undefined, false);
        });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
      {/* Version Indicator for Debugging */}
      <div className="fixed bottom-4 left-4 z-50 bg-black/90 text-white px-3 py-1 rounded-full text-xs font-mono">
        CollegeScam.io v1.4.3 | Port: {port}
      </div>

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <span className="text-xl font-bold text-gray-900">CollegeScam</span>
              <span className="text-sm text-red-600 font-medium">.io</span>
            </button>
            <ShimmerButton
              onClick={() => setShowPremiumModal(true)}
              className="px-4 py-2"
              shimmerColor="rgba(59, 130, 246, 0.3)"
              background="linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)"
            >
              Premium
            </ShimmerButton>
          </div>
        </div>
      </nav>

      {/* HERO SECTION - Progressive Disclosure Design */}
      <section id="top" className="pt-32 pb-20 relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-red-100 via-orange-50 to-yellow-100 animate-gradient-shift" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-red-50/30 to-transparent animate-gradient-shift-reverse" />
        </div>
        {/* Red Warning Banner at Top - Solid and Prominent */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-20 bg-red-600 py-6 mb-12 shadow-xl"
          style={{
            background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 50%, #991b1b 100%)',
            boxShadow: '0 10px 25px rgba(220, 38, 38, 0.3)'
          }}
        >
          <motion.div 
            animate={{ 
              scale: [1, 1.02, 1],
            }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="container mx-auto px-4 text-center"
          >
            <p className="text-2xl md:text-4xl font-black text-white flex items-center justify-center gap-3 drop-shadow-lg">
              <AlertTriangle className="h-8 w-8 md:h-10 md:w-10 animate-pulse" />
              WARNING: 73% OF DEGREES HAVE NEGATIVE ROI
              <AlertTriangle className="h-8 w-8 md:h-10 md:w-10 animate-pulse" />
            </p>
          </motion.div>
        </motion.div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            {/* Main Heading - Minimal and Focused */}
            <div>
              <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-6">
                Is Your Education
              </h1>
              <AnimatedGradientHeading className="text-6xl md:text-8xl font-black">
                WORTH IT?
              </AnimatedGradientHeading>
            </div>

            {/* Simple Subheading */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl md:text-3xl text-gray-700 font-medium max-w-2xl mx-auto"
            >
              Calculate your SCAM SCORE and find out
            </motion.p>

            {/* CTA Button - Large and Prominent, CENTERED */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex justify-center"
            >
              <CTAButton
                onClick={() => {
                  const calculatorElement = document.getElementById('calculator');
                  if (calculatorElement) {
                    calculatorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="px-12 py-8 text-2xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 shadow-2xl"
              >
                Get My Reality Check
              </CTAButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Popular Comparisons Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
              📊 Eye-Opening Comparisons
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { title: "Nursing vs Business: Healthcare provides steadier ROI", path1: "nursing_bachelor", path2: "college_business" },
                { title: "Computer Science vs MBA: Tech skills compound faster", path1: "college_tech", path2: "mba_top20" },
                { title: "Engineering vs Medicine: Engineers build wealth while doctors train", path1: "college_engineering", path2: "medical_school" },
                { title: "Community College + Transfer: Smart path saves $40K", path1: "community_transfer", path2: "college_business" },
                { title: "Data Analytics vs Marketing: Both viable, different timelines", path1: "bootcamp_data", path2: "college_business" }
              ].map((comparison, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className="cursor-pointer hover:shadow-xl transition-all hover:scale-105 bg-white border-2 border-gray-200 hover:border-blue-400"
                    onClick={(event) => {
                      // Prevent rapid clicking
                      const target = event.currentTarget;
                      if (target.style.pointerEvents === 'none') return;
                      target.style.pointerEvents = 'none';
                      setTimeout(() => target.style.pointerEvents = 'auto', 2000);
                      
                      // Create inputs for both paths
                      const newInputs1 = {
                        path: comparison.path1,
                        location: 'nyc',
                        schoolTier: 'standard',
                        livingCost: 'offcampus',
                        scholarships: 0,
                        loanInterestRate: 7,
                        degreeLevel: 'bachelors',
                        region: 'northeast',
                      };
                      
                      const newInputs2 = {
                        path: comparison.path2,
                        location: 'nyc',
                        schoolTier: 'standard',
                        livingCost: 'offcampus',
                        scholarships: 0,
                        loanInterestRate: 7,
                        degreeLevel: 'bachelors',
                        region: 'northeast',
                      };
                      
                      try {
                        // Calculate results
                        const result1New = calculateROI(newInputs1);
                        const result2New = calculateROI(newInputs2);
                        
                        // Batch all state updates
                        setInputs1(newInputs1);
                        setInputs2(newInputs2);
                        setResult1(result1New);
                        setResult2(result2New);
                        setShowComparison(true);
                        setErrors1([]);
                        setErrors2([]);
                        
                        // Scroll after a short delay
                        requestAnimationFrame(() => {
                          setTimeout(() => {
                            const resultsElement = document.getElementById('results');
                            if (resultsElement) {
                              resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          }, 100);
                        });
                      } catch (error) {
                        console.error('Comparison calculation failed:', error);
                      }
                    }}
                  >
                    <CardContent className="p-4">
                      <p className="font-semibold text-gray-800">{comparison.title}</p>
                      <p className="text-sm text-blue-600 mt-2">Click to see comparison →</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Calculator Section - Always Visible */}
      <div id="calculator" className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="text-center">
              <AnimatedGradientHeading className="text-4xl font-bold mb-4">
                Calculate Your Scam Score
              </AnimatedGradientHeading>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Enter your details to expose if your education is a financial trap
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Path 1 Input */}
              <Card className="bg-white shadow-xl border-2 border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-900">Your Education Path</CardTitle>
                  <CardDescription className="text-gray-600">
                    Select your education details to calculate Scam Score
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PathBuilder
                    inputs={inputs1}
                    setInputs={setInputs1}
                    errors={errors1}
                    title=""
                    description=""
                  />
                  <div className="flex gap-2 mt-6">
                    <CTAButton 
                      onClick={handleCalculate} 
                      className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                    >
                      Calculate Scam Score
                    </CTAButton>
                    <Button
                      variant="outline"
                      onClick={() => {
                        // Clear all fields including education-specific ones
                        const clearInputs = {
                          path: '',
                          location: '',
                          schoolTier: '',
                          livingCost: '',
                          scholarships: 0,
                          loanInterestRate: 7,
                          degreeLevel: 'bachelors',
                          region: '',
                          educationType: '',
                          field: '',
                          program: '',
                        };
                        
                        setInputs1(clearInputs);
                        setInputs2(clearInputs);
                        setResult1(null);
                        setResult2(null);
                        setShowComparison(false);
                        setErrors1([]);
                        setErrors2([]);
                      }}
                      className="px-4"
                    >
                      Clear
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Results Section */}
              {result1 ? (
                <div id="results" className="lg:col-span-2">
                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl text-gray-900">
                      {inputs1.path && educationPaths[inputs1.path] ? 
                        `${educationPaths[inputs1.path].name} - Scam Score Results` : 
                        'Your Scam Score Results'}
                    </CardTitle>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm" onClick={handleShare} className="gap-2 bg-white text-gray-700 hover:text-gray-900">
                        {copied ? (
                          <>
                            <Check className="h-4 w-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Share2 className="h-4 w-4" />
                            Share
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleAddComparison}
                        className="gap-2 bg-white text-gray-700 hover:text-gray-900"
                      >
                        <Plus className="h-4 w-4" />
                        Compare with Another Path
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Scam Score Display with Detailed Explanation */}
                    <div className="bg-white rounded-xl p-6">
                      <p className="text-sm text-gray-600 mb-2 text-center">Your Scam Score</p>
                      <div className="text-5xl font-black text-center mb-4">
                        {result1.breakevenMonths > 120 ? (
                          <span className="text-red-600">EXTREME SCAM</span>
                        ) : result1.breakevenMonths > 60 ? (
                          <span className="text-orange-600">HIGH RISK</span>
                        ) : result1.breakevenMonths > 36 ? (
                          <span className="text-yellow-600">MODERATE RISK</span>
                        ) : (
                          <span className="text-green-600">LEGITIMATE</span>
                        )}
                      </div>
                      
                      {/* Detailed Explanation */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm font-medium text-gray-900 mb-2">Why this score?</p>
                        <p className="text-xs text-gray-700 leading-relaxed">
                          {result1.breakevenMonths > 120 ? (
                            <>🚨 <strong>EXTREME SCAM:</strong> You'll NEVER break even on this investment. After 10+ years, you're still losing money compared to working immediately. The education costs far exceed any salary benefits, creating a financial trap that grows worse over time.</>
                          ) : result1.breakevenMonths > 60 ? (
                            <>⚠️ <strong>HIGH RISK:</strong> It takes over 5 years to break even. This is a questionable investment that ties up your money and time for too long. Many people change careers before seeing returns, making this a risky bet on your future.</>
                          ) : result1.breakevenMonths > 36 ? (
                            <>🤔 <strong>MODERATE RISK:</strong> Break-even takes 3-5 years. While not terrible, this investment has significant opportunity costs. Consider if you could achieve similar results through alternative paths with less debt.</>
                          ) : (
                            <>✅ <strong>LEGITIMATE:</strong> This education pays off within 3 years. The investment makes financial sense with reasonable payback period and positive long-term returns. This appears to be a sound financial decision.</>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg p-4">
                        <p className="text-sm text-gray-600">Total Cost</p>
                        <p className="text-2xl font-bold text-gray-900">
                          <NumberTicker
                            value={result1.totalCost}
                            prefix="$"
                            delay={0.3}
                          />
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <p className="text-sm text-gray-600">Net Cost</p>
                        <p className="text-2xl font-bold text-gray-900">
                          <NumberTicker
                            value={result1.adjustedCost}
                            prefix="$"
                            delay={0.5}
                          />
                        </p>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <p className="text-sm font-medium text-gray-600">
                          Breakeven Time
                        </p>
                      </div>
                      <p className="text-3xl font-bold text-blue-600">
                        {result1.breakevenMonths > 120
                          ? 'Never (Scam Alert!)'
                          : `${result1.breakevenMonths} months`}
                      </p>
                      
                      {/* Breakeven Explanation */}
                      {result1.breakevenMonths > 120 ? (
                        <div className="mt-3 bg-red-50 rounded-lg p-3">
                          <p className="text-xs text-red-800 leading-relaxed">
                            <strong>🚨 DEBT TRAP DETECTED:</strong> The salary increase from this education never compensates for its cost. You'd be financially better off working immediately and investing the education money elsewhere. This creates permanent wealth loss.
                          </p>
                        </div>
                      ) : result1.breakevenMonths > 60 ? (
                        <div className="mt-3 bg-orange-50 rounded-lg p-3">
                          <p className="text-xs text-orange-800 leading-relaxed">
                            <strong>⚠️ LONG PAYBACK:</strong> Over 5 years to recover your investment. High risk of career changes, economic shifts, or industry disruption before you see returns.
                          </p>
                        </div>
                      ) : result1.breakevenMonths > 36 ? (
                        <div className="mt-3 bg-yellow-50 rounded-lg p-3">
                          <p className="text-xs text-yellow-800 leading-relaxed">
                            <strong>🤔 MODERATE TIMELINE:</strong> 3-5 year payback period. Consider opportunity costs and whether faster alternatives exist.
                          </p>
                        </div>
                      ) : (
                        <div className="mt-3 bg-green-50 rounded-lg p-3">
                          <p className="text-xs text-green-800 leading-relaxed">
                            <strong>✅ QUICK RETURNS:</strong> Fast payback period under 3 years. This investment recovers its cost quickly and generates positive returns.
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <p className="text-sm font-medium text-gray-600">
                          10-Year Net Worth
                        </p>
                      </div>
                      <p className="text-2xl font-bold text-green-600">
                        <NumberTicker
                          value={result1.netWorth10Years}
                          prefix="$"
                          delay={0.7}
                        />
                      </p>
                    </div>

                    {/* ROI Timeline Chart */}
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <LineChart className="h-4 w-4 text-purple-600" />
                        <p className="text-sm font-medium text-gray-600">
                          ROI Timeline
                        </p>
                      </div>
                      <ROITimeline result={result1} pathName="Your Path" />
                    </div>
                  </CardContent>
                </Card>

                {/* New Phase 3 Components */}
                <div className="mt-6 space-y-6">
                  {/* Loan Payment Calculator */}
                  <LoanPaymentCalculator 
                    result={result1} 
                    loanInterestRate={inputs1.loanInterestRate || 7} 
                  />
                  
                  {/* Career Trajectory Chart */}
                  <CareerTrajectoryChart inputs={inputs1} result={result1} />
                  
                  {/* AI Risk Indicator */}
                  <AIRiskIndicator inputs={inputs1} />
                </div>
                </div>
              ) : (
                <div id="results" className="lg:col-span-2">
                  <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300 shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-2xl text-gray-900">Your Scam Score Results</CardTitle>
                    </CardHeader>
                    <CardContent className="py-20 text-center">
                      <div className="flex items-center justify-center gap-4">
                        <span className="text-4xl">👈</span>
                        <p className="text-xl text-gray-600">
                          Input your details to calculate your ROI
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>

          </motion.div>
        </div>

      {/* Comparison Section - Appears below when comparing */}
      {showComparison && (
        <div id="comparison-section" className="container mx-auto px-4 pb-24">
          <div className="border-t-4 border-gray-300 my-12" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="text-center">
              <AnimatedGradientHeading className="text-4xl font-bold mb-4">
                Compare With Another Path
              </AnimatedGradientHeading>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Add a second education path to compare Scam Scores
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Path 2 Input */}
              <Card className="bg-white shadow-xl border-2 border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-900">Comparison Path</CardTitle>
                  <CardDescription className="text-gray-600">
                    Second education path to evaluate
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PathBuilder
                    inputs={inputs2}
                    setInputs={setInputs2}
                    errors={errors2}
                    title=""
                    description=""
                  />
                  <div className="flex gap-2 mt-6">
                    <CTAButton 
                      onClick={handleCompare} 
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      Calculate Comparison
                    </CTAButton>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setInputs2({
                          path: '',
                          location: '',
                          schoolTier: '',
                          livingCost: '',
                          scholarships: 0,
                          loanInterestRate: 7,
                          degreeLevel: 'bachelors',
                          region: '',
                        });
                        setResult2(null);
                      }}
                      className="px-4"
                    >
                      Clear
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Path 2 Results */}
              {result2 ? (
                <div id="comparison-results" className="lg:col-span-2">
                  <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-2xl text-gray-900">
                        {inputs2.path && educationPaths[inputs2.path] ? 
                          `${educationPaths[inputs2.path].name} - Comparison Results` : 
                          'Comparison Results'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Winner Analysis */}
                      {result1 && result2 && (
                        <div className="bg-white rounded-xl p-6">
                          <div className="flex items-center gap-2 mb-4">
                            <Trophy className="h-6 w-6 text-yellow-500" />
                            <p className="text-lg font-bold text-gray-900">Winner Analysis</p>
                          </div>
                          {result1.breakevenMonths < result2.breakevenMonths ? (
                            <p className="text-gray-700">
                              Your original path breaks even{' '}
                              <span className="font-bold text-green-600">
                                {result2.breakevenMonths - result1.breakevenMonths} months faster
                              </span>{' '}
                              and generates{' '}
                              <span className="font-bold text-green-600">
                                ${(result1.netWorth10Years - result2.netWorth10Years).toLocaleString()}
                              </span>{' '}
                              more wealth over 10 years.
                            </p>
                          ) : result2.breakevenMonths < result1.breakevenMonths ? (
                            <p className="text-gray-700">
                              The comparison path breaks even{' '}
                              <span className="font-bold text-green-600">
                                {result1.breakevenMonths - result2.breakevenMonths} months faster
                              </span>{' '}
                              and generates{' '}
                              <span className="font-bold text-green-600">
                                ${(result2.netWorth10Years - result1.netWorth10Years).toLocaleString()}
                              </span>{' '}
                              more wealth over 10 years.
                            </p>
                          ) : (
                            <p className="text-gray-700">
                              Both paths have similar breakeven times. Compare other factors to make your decision.
                            </p>
                          )}
                        </div>
                      )}

                      {/* Scam Score Display */}
                      <div className="bg-white rounded-xl p-6 text-center">
                        <p className="text-sm text-gray-600 mb-2">Comparison Scam Score</p>
                        <div className="text-5xl font-black">
                          {result2.breakevenMonths > 120 ? (
                            <span className="text-red-600">EXTREME SCAM</span>
                          ) : result2.breakevenMonths > 60 ? (
                            <span className="text-orange-600">HIGH RISK</span>
                          ) : result2.breakevenMonths > 36 ? (
                            <span className="text-yellow-600">MODERATE RISK</span>
                          ) : (
                            <span className="text-green-600">LEGITIMATE</span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg p-4">
                          <p className="text-sm text-gray-600">Total Cost</p>
                          <p className="text-2xl font-bold text-gray-900">
                            <NumberTicker
                              value={result2.totalCost}
                              prefix="$"
                              delay={0.3}
                            />
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-4">
                          <p className="text-sm text-gray-600">Net Cost</p>
                          <p className="text-2xl font-bold text-gray-900">
                            <NumberTicker
                              value={result2.adjustedCost}
                              prefix="$"
                              delay={0.5}
                            />
                          </p>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-4 w-4 text-purple-600" />
                          <p className="text-sm font-medium text-gray-600">
                            Breakeven Time
                          </p>
                        </div>
                        <p className="text-3xl font-bold text-purple-600">
                          {result2.breakevenMonths > 120
                            ? 'Never (Scam Alert!)'
                            : `${result2.breakevenMonths} months`}
                        </p>
                      </div>

                      <div className="bg-white rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          <p className="text-sm font-medium text-gray-600">
                            10-Year Net Worth
                          </p>
                        </div>
                        <p className="text-2xl font-bold text-green-600">
                          <NumberTicker
                            value={result2.netWorth10Years}
                            prefix="$"
                            delay={0.7}
                          />
                        </p>
                      </div>

                      {/* ROI Timeline Chart */}
                      <div className="bg-white rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <LineChart className="h-4 w-4 text-purple-600" />
                          <p className="text-sm font-medium text-gray-600">
                            ROI Timeline
                          </p>
                        </div>
                        <ROITimeline result={result2} pathName="Comparison Path" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* New Phase 3 Components for Comparison Path */}
                  <div className="mt-6 space-y-6">
                    {/* Loan Payment Calculator */}
                    <LoanPaymentCalculator 
                      result={result2} 
                      loanInterestRate={inputs2.loanInterestRate || 7} 
                    />
                    
                    {/* Career Trajectory Chart */}
                    <CareerTrajectoryChart inputs={inputs2} result={result2} />
                    
                    {/* AI Risk Indicator */}
                    <AIRiskIndicator inputs={inputs2} />
                  </div>
                </div>
              ) : (
                <div className="lg:col-span-2">
                  <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300 shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-2xl text-gray-900">Comparison Results</CardTitle>
                    </CardHeader>
                    <CardContent className="py-20 text-center">
                      <div className="flex items-center justify-center gap-4">
                        <span className="text-4xl">👈</span>
                        <p className="text-xl text-gray-600">
                          Input comparison details to calculate ROI
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Social Proof Section */}
      <SocialProofSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Premium CTA Section - Redesigned */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Unlock Premium Scam Detection
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Get the full picture with advanced analytics and AI-powered insights
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Premium Feature Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 h-full">
                <CardContent className="p-6 text-center">
                  <BarChart3 className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">20-Year Projections</h3>
                  <p className="text-sm text-white/80">
                    See your complete financial trajectory over two decades
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 h-full">
                <CardContent className="p-6 text-center">
                  <Brain className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">AI Career Analysis</h3>
                  <p className="text-sm text-white/80">
                    Machine learning predicts your optimal career path
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 h-full">
                <CardContent className="p-6 text-center">
                  <Target className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">Industry Benchmarks</h3>
                  <p className="text-sm text-white/80">
                    Compare against real salary data from your industry
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 h-full">
                <CardContent className="p-6 text-center">
                  <Sparkles className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">Custom Recommendations</h3>
                  <p className="text-sm text-white/80">
                    Get personalized degree and certification suggestions
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col items-center"
          >
            <PremiumButton
              onClick={() => setShowPremiumModal(true)}
              className="px-10 py-5 text-xl bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 shadow-2xl mx-auto"
            >
              Get Premium Access - $9.99/month
            </PremiumButton>
            <p className="text-white/80 mt-4 text-sm">
              30-day money-back guarantee • Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>

      {/* Email Capture Modal */}
      <EmailCaptureModal 
        showModal={showPremiumModal} 
        setShowModal={setShowPremiumModal} 
      />

      {/* Footer */}
      <Footer onPremiumClick={() => setShowPremiumModal(true)} />
    </div>
  );
}
