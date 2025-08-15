'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PathBuilder from '@/components/path-builder';
import ROITimeline from '@/components/roi-timeline';
import { GlossaryTerm } from '@/components/glossary-term';
import { Footer } from '@/components/footer';
import { calculateROI, comparePaths } from '@/lib/calculator';
import { validateCalculatorInputs } from '@/lib/validation';
import { educationPaths, viralComparisons } from '@/lib/data';
import analytics from '@/lib/analytics';
import type { CalculatorInputs, CalculationResult } from '@/lib/types';
import { AnimatedGradientHeading, AnimatedGradientText } from '@/components/magic/animated-gradient-text';
import { CTAButton, PremiumButton, ShimmerButton } from '@/components/magic/shimmer-button';
import { NumberTicker, ROITicker } from '@/components/magic/number-ticker';
import {
  ArrowRight,
  Calculator,
  TrendingUp,
  Shield,
  Calendar,
  DollarSign,
  Trophy,
  AlertCircle,
  Plus,
  Share2,
  Check,
  Crown,
  X,
  Sparkles,
  BarChart3,
  GraduationCap,
  Briefcase,
  Zap,
  Target,
  Brain,
  LineChart,
  AlertTriangle,
  TrendingDown,
} from 'lucide-react';

export default function HomePage() {
  const [port, setPort] = useState<string>('....');
  const [mode, setMode] = useState<'intro' | 'calculator' | 'compare'>('intro');
  const [inputs1, setInputs1] = useState<CalculatorInputs>({
    path: '',
    location: '',
    schoolTier: '',
    livingCost: '',
    scholarships: 0,
  });
  const [inputs2, setInputs2] = useState<CalculatorInputs>({
    path: '',
    location: '',
    schoolTier: '',
    livingCost: '',
    scholarships: 0,
  });
  const [errors1, setErrors1] = useState<string[]>([]);
  const [errors2, setErrors2] = useState<string[]>([]);
  const [result1, setResult1] = useState<CalculationResult | null>(null);
  const [result2, setResult2] = useState<CalculationResult | null>(null);
  const [comparison, setComparison] = useState<ReturnType<typeof comparePaths> | null>(null);
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
      title: 'PathwiseROI Calculator',
      text: result1
        ? `My education path breaks even in ${result1.breakevenMonths} months!`
        : 'Calculate your education ROI with PathwiseROI',
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

  const handleQuickCompare = (path1: string, path2: string) => {
    const defaultInputs = {
      location: 'nyc',
      schoolTier: 'average',
      livingCost: 'oncampus',
      scholarships: 0,
    };

    setInputs1({ ...defaultInputs, path: path1 });
    setInputs2({ ...defaultInputs, path: path2 });
    setShowComparison(true);
    setMode('compare');

    setTimeout(() => {
      const result = comparePaths(
        { ...defaultInputs, path: path1 },
        { ...defaultInputs, path: path2 }
      );
      setComparison(result);
      setResult1(result.result1);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
      {/* Version Indicator for Debugging */}
      <div className="fixed bottom-4 left-4 z-50 bg-black/90 text-white px-3 py-1 rounded-full text-xs font-mono">
        v1.2.6 | 8/16 3:42AM | Port: {port}
      </div>

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="#top" className="flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">PathwiseROI</span>
              <span className="text-sm text-blue-600 font-medium">Scam Score</span>
            </a>
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
      <section id="top" className="pt-32 pb-20 bg-gradient-to-b from-red-50 via-white to-white">
        {/* Red Warning Banner at Top */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-red-600 to-red-500 py-4 mb-12"
        >
          <motion.div 
            animate={{ 
              scale: [1, 1.01, 1],
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="container mx-auto px-4 text-center"
          >
            <p className="text-2xl md:text-3xl font-black text-white flex items-center justify-center gap-3">
              <AlertTriangle className="h-8 w-8 animate-pulse" />
              WARNING: 73% OF DEGREES HAVE NEGATIVE ROI
              <AlertTriangle className="h-8 w-8 animate-pulse" />
            </p>
          </motion.div>
        </motion.div>

        <div className="container mx-auto px-4 text-center">
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


      {/* Calculator Section - Always Visible */}
      <div id="calculator" className="container mx-auto px-4 py-24">
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
                  <CTAButton 
                    onClick={handleCalculate} 
                    className="w-full mt-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                  >
                    Calculate Scam Score
                  </CTAButton>
                </CardContent>
              </Card>

              {/* Results Section */}
              {result1 ? (
                <div id="results" className="lg:col-span-2">
                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl text-gray-900">Your Scam Score Results</CardTitle>
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
                    {/* Scam Score Display */}
                    <div className="bg-white rounded-xl p-6 text-center">
                      <p className="text-sm text-gray-600 mb-2">Your Scam Score</p>
                      <div className="text-5xl font-black">
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
                  <CTAButton 
                    onClick={handleCompare} 
                    className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    Calculate Comparison
                  </CTAButton>
                </CardContent>
              </Card>

              {/* Path 2 Results */}
              {result2 ? (
                <div id="comparison-results" className="lg:col-span-2">
                  <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-2xl text-gray-900">Comparison Results</CardTitle>
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

      {/* Premium Modal - Enhanced */}
      {showPremiumModal && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowPremiumModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="max-w-2xl w-full bg-white shadow-2xl">
                <CardHeader className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2"
                    onClick={() => setShowPremiumModal(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center gap-3 mb-2">
                    <Crown className="h-8 w-8 text-yellow-500" />
                    <CardTitle className="text-2xl text-gray-900">
                      Unlock Premium Scam Detection
                    </CardTitle>
                  </div>
                  <CardDescription className="text-gray-600 text-base">
                    Get comprehensive analysis and advanced features
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Premium features grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: BarChart3, title: '20-Year Projections', desc: 'Extended financial timeline' },
                      { icon: Brain, title: 'AI Career Analysis', desc: 'ML-powered path optimization' },
                      { icon: DollarSign, title: 'Salary Benchmarks', desc: 'Industry-specific data' },
                      { icon: Target, title: 'Custom Recommendations', desc: 'Personalized degree advice' },
                      { icon: LineChart, title: 'ROI Optimization', desc: 'Maximize your returns' },
                      { icon: Shield, title: 'Risk Assessment', desc: 'Market volatility analysis' },
                      { icon: Zap, title: 'Unlimited Comparisons', desc: 'Compare all paths' },
                      { icon: AlertCircle, title: 'Scam Alerts', desc: 'Real-time market warnings' },
                    ].map(({ icon: Icon, title, desc }, index) => (
                      <motion.div
                        key={title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex gap-3"
                      >
                        <Icon className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{title}</p>
                          <p className="text-xs text-gray-600">{desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="text-center mb-4">
                      <p className="text-3xl font-bold text-gray-900">$9.99</p>
                      <p className="text-sm text-gray-600">per month</p>
                    </div>
                    <PremiumButton
                      className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500"
                      onClick={() => {
                        analytics.premiumClicked('premium_modal');
                        alert('Payment integration would be implemented here');
                        setShowPremiumModal(false);
                      }}
                    >
                      Get Premium Access
                    </PremiumButton>
                    <p className="text-xs text-gray-500 text-center mt-2">
                      Cancel anytime. 30-day money-back guarantee.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Footer */}
      <Footer onPremiumClick={() => setShowPremiumModal(true)} />
    </div>
  );
}
