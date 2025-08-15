'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PathBuilder from '@/components/path-builder';
import ROITimeline from '@/components/roi-timeline';
import { GlossaryTerm } from '@/components/glossary-term';
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
  const [comparison, setComparison] = useState<ReturnType<typeof comparePaths> | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

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
    setMode('calculator');

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
    setMode('compare');
  };

  const handleCompare = () => {
    const validationErrors1 = validateCalculatorInputs(inputs1);
    const validationErrors2 = validateCalculatorInputs(inputs2);

    setErrors1(validationErrors1);
    setErrors2(validationErrors2);

    if (validationErrors1.length > 0 || validationErrors2.length > 0) {
      setComparison(null);
      return;
    }

    const result = comparePaths(inputs1, inputs2);
    setComparison(result);
    setResult1(result.result1);

    // Track analytics
    const path1 = educationPaths[inputs1.path];
    const path2 = educationPaths[inputs2.path];
    if (path1 && path2 && result.winner && result.result1 && result.result2) {
      const path1ROI =
        ((result.result1.netWorth10Years - result.result1.totalCost) / result.result1.totalCost) *
        100;
      const path2ROI =
        ((result.result2.netWorth10Years - result.result2.totalCost) / result.result2.totalCost) *
        100;
      analytics.comparisonCompleted(
        path1.name,
        path2.name,
        result.winner === 'path1' ? path1.name : path2.name,
        path1ROI,
        path2ROI
      );
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
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">PathwiseROI</span>
              <span className="text-sm text-blue-600 font-medium">Scam Score™</span>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => setMode('intro')}
                className="text-gray-700 hover:text-blue-600"
              >
                Home
              </Button>
              <Button
                variant="ghost"
                onClick={() => setMode('calculator')}
                className="text-gray-700 hover:text-blue-600"
              >
                Calculate
              </Button>
              <ShimmerButton
                onClick={() => setShowPremiumModal(true)}
                className="px-4 py-2"
                shimmerColor="rgba(59, 130, 246, 0.3)"
                background="linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)"
              >
                <Crown className="h-4 w-4 mr-2" />
                Premium
              </ShimmerButton>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION - Light Theme with Scam Score Branding */}
      {mode === 'intro' && (
        <section className="pt-24 pb-20">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Warning Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="flex justify-center"
              >
                <div className="bg-red-50 border border-red-200 px-6 py-3 rounded-full inline-flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span className="text-sm font-medium text-red-700">
                    Warning: 73% of Degrees Have Negative ROI
                  </span>
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                </div>
              </motion.div>

              {/* Main Heading */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-4">
                  Calculate Your
                </h1>
                <AnimatedGradientHeading className="text-5xl md:text-7xl font-black mb-4">
                  SCAM SCORE™
                </AnimatedGradientHeading>
                <p className="text-2xl md:text-3xl font-bold text-gray-700">
                  Are You Being Scammed by Your Education?
                </p>
              </motion.div>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto"
              >
                Expose the truth about education ROI with data-driven analysis. 
                Find out if your degree is an investment or a financial trap.
              </motion.p>

              {/* Statistics Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="grid grid-cols-3 gap-8 max-w-3xl mx-auto py-8"
              >
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                  <div className="text-4xl font-bold text-red-600">
                    <NumberTicker value={1.7} suffix="T" prefix="$" delay={1.2} />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Student Debt Crisis</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                  <div className="text-4xl font-bold text-orange-600">
                    <NumberTicker value={73} suffix="%" delay={1.4} />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Negative ROI Degrees</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                  <div className="text-4xl font-bold text-yellow-600">
                    <NumberTicker value={42} suffix="%" delay={1.6} />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Underemployed Grads</p>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="flex flex-col sm:flex-row justify-center gap-4 pt-4"
              >
                <CTAButton
                  onClick={() => setMode('calculator')}
                  className="px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                >
                  <AlertTriangle className="h-6 w-6 mr-2" />
                  Calculate My Scam Score™
                </CTAButton>
                <Button
                  onClick={() => handleQuickCompare('college_stem', 'trades_electrical')}
                  className="px-8 py-6 text-lg bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600"
                  size="lg"
                >
                  <LineChart className="h-6 w-6 mr-2" />
                  See Live Comparisons
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* FEATURE CARDS SECTION - Light Theme */}
      {mode === 'intro' && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Expose the Education Scam
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Data-driven tools to reveal if your education investment is legitimate or a financial trap
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card className="h-full bg-white border-2 border-gray-200 hover:border-blue-400 transition-colors shadow-lg hover:shadow-xl">
                  <CardContent className="p-6 space-y-4">
                    <Brain className="h-12 w-12 text-blue-600" />
                    <h3 className="text-2xl font-bold text-gray-900">
                      Scam Score™ Algorithm
                    </h3>
                    <p className="text-gray-600">
                      Our proprietary algorithm exposes which degrees are financial scams 
                      based on ROI, employment rates, and debt-to-income ratios.
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
                <Card className="h-full bg-white border-2 border-gray-200 hover:border-cyan-400 transition-colors shadow-lg hover:shadow-xl">
                  <CardContent className="p-6 space-y-4">
                    <TrendingDown className="h-12 w-12 text-red-600" />
                    <h3 className="text-2xl font-bold text-gray-900">
                      Debt Trap Detection
                    </h3>
                    <p className="text-gray-600">
                      See exactly when (or if) you'll break even. Many degrees never pay off - 
                      we'll tell you the brutal truth others won't.
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
                <Card className="h-full bg-white border-2 border-gray-200 hover:border-green-400 transition-colors shadow-lg hover:shadow-xl">
                  <CardContent className="p-6 space-y-4">
                    <Target className="h-12 w-12 text-green-600" />
                    <h3 className="text-2xl font-bold text-gray-900">
                      Reality-Based Projections
                    </h3>
                    <p className="text-gray-600">
                      No sugar-coating. Real salary data, actual employment rates, and true 
                      costs including opportunity loss and compound interest.
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
                <Card className="h-full bg-white border-2 border-gray-200 hover:border-orange-400 transition-colors shadow-lg hover:shadow-xl">
                  <CardContent className="p-6 space-y-4">
                    <Zap className="h-12 w-12 text-orange-600" />
                    <h3 className="text-2xl font-bold text-gray-900">
                      Hidden Cost Exposure
                    </h3>
                    <p className="text-gray-600">
                      Reveals what colleges don't want you to know - lost wages, compound 
                      interest on debt, and the true opportunity cost of your time.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Card className="h-full bg-white border-2 border-gray-200 hover:border-purple-400 transition-colors shadow-lg hover:shadow-xl">
                  <CardContent className="p-6 space-y-4">
                    <GraduationCap className="h-12 w-12 text-purple-600" />
                    <h3 className="text-2xl font-bold text-gray-900">
                      Path Comparison Tool
                    </h3>
                    <p className="text-gray-600">
                      Compare traditional college vs trades, bootcamps, or self-learning. 
                      The results might shock you - trades often win by millions.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Card className="h-full bg-white border-2 border-gray-200 hover:border-pink-400 transition-colors shadow-lg hover:shadow-xl">
                  <CardContent className="p-6 space-y-4">
                    <AlertCircle className="h-12 w-12 text-pink-600" />
                    <h3 className="text-2xl font-bold text-gray-900">
                      Scam Alert System
                    </h3>
                    <p className="text-gray-600">
                      Red flags for education scams: low employment rates, high debt ratios, 
                      and degrees that statistically never pay off.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Calculator/Comparison Section - Light Theme */}
      {(mode === 'calculator' || mode === 'compare') && (
        <div className="container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="text-center">
              <AnimatedGradientHeading className="text-4xl font-bold mb-4">
                {showComparison ? 'Compare Scam Scores™' : 'Calculate Your Scam Score™'}
              </AnimatedGradientHeading>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                {showComparison
                  ? 'Compare two education paths to see which is the bigger scam'
                  : 'Enter your details to expose if your education is a financial trap'}
              </p>
            </div>

            <div className={`grid ${showComparison ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-8`}>
              {/* Path 1 Input */}
              <Card
                className={`bg-white shadow-xl border-2 ${
                  showComparison && comparison?.winner === 'path1' 
                    ? 'border-green-500 ring-4 ring-green-100' 
                    : 'border-gray-200'
                }`}
              >
                <CardHeader>
                  <CardTitle>{showComparison ? 'Path 1' : 'Your Education Path'}</CardTitle>
                  <CardDescription>
                    {showComparison
                      ? 'First education path to evaluate'
                      : 'Select your education details to calculate Scam Score™'}
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
                  {!showComparison && (
                    <CTAButton 
                      onClick={handleCalculate} 
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                    >
                      Calculate Scam Score™
                    </CTAButton>
                  )}
                </CardContent>
              </Card>

              {/* Path 2 Input (Compare mode) */}
              {showComparison && (
                <Card
                  className={`bg-white shadow-xl border-2 ${
                    comparison?.winner === 'path2' 
                      ? 'border-green-500 ring-4 ring-green-100' 
                      : 'border-gray-200'
                  }`}
                >
                  <CardHeader>
                    <CardTitle>Path 2</CardTitle>
                    <CardDescription>Second education path to evaluate</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PathBuilder
                      inputs={inputs2}
                      setInputs={setInputs2}
                      errors={errors2}
                      title=""
                      description=""
                    />
                  </CardContent>
                </Card>
              )}

              {/* Results Section */}
              {!showComparison && result1 && (
                <Card className="lg:col-span-2 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl">Your Scam Score™ Results</CardTitle>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm" onClick={handleShare} className="gap-2 bg-white">
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
                        className="gap-2 bg-white"
                      >
                        <Plus className="h-4 w-4" />
                        Compare with Another Path
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Scam Score Display */}
                    <div className="bg-white rounded-xl p-6 text-center">
                      <p className="text-sm text-gray-600 mb-2">Your Scam Score™</p>
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
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Compare Button */}
            {showComparison && (
              <div className="mb-8">
                <CTAButton 
                  onClick={handleCompare} 
                  className="w-full py-4 text-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                >
                  Compare Scam Scores™
                </CTAButton>
              </div>
            )}

            {/* Comparison Results */}
            {showComparison && comparison && comparison.result1 && comparison.result2 && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  {/* Winner Card */}
                  {comparison.winner && (
                    <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400">
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <Trophy className="h-6 w-6 text-green-600" />
                          <CardTitle className="text-gray-900">
                            Less Scammy: Path {comparison.winner === 'path1' ? '1' : '2'}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-lg text-gray-700">
                          Breaks even{' '}
                          <span className="font-bold text-green-600">
                            {comparison.differenceMonths} months faster
                          </span>{' '}
                          and generates{' '}
                          <span className="font-bold text-green-600">
                            ${comparison.differenceAmount.toLocaleString()}
                          </span>{' '}
                          more wealth over 10 years
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  {/* Detailed Comparison */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-white border-2 border-gray-200">
                      <CardHeader>
                        <CardTitle>Path 1 Scam Score™</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-600">Breakeven</p>
                            <p className="text-xl font-bold">
                              {comparison.result1.breakevenMonths > 120
                                ? 'Never'
                                : `${comparison.result1.breakevenMonths} months`}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">10-Year Net Worth</p>
                            <p className="text-xl font-bold">
                              ${comparison.result1.netWorth10Years.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-white border-2 border-gray-200">
                      <CardHeader>
                        <CardTitle>Path 2 Scam Score™</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-600">Breakeven</p>
                            <p className="text-xl font-bold">
                              {comparison.result2.breakevenMonths > 120
                                ? 'Never'
                                : `${comparison.result2.breakevenMonths} months`}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">10-Year Net Worth</p>
                            <p className="text-xl font-bold">
                              ${comparison.result2.netWorth10Years.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </motion.div>
        </div>
      )}

      {/* Premium CTA Section - Light Theme */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <Card className="bg-white border-2 border-blue-300 shadow-2xl p-12 text-center">
            <Crown className="h-16 w-16 text-yellow-500 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Unlock Premium Scam Detection
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Advanced algorithms, 20-year projections, and AI-powered career path analysis
            </p>
            <PremiumButton
              onClick={() => setShowPremiumModal(true)}
              className="px-8 py-4 text-lg bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500"
            >
              <Crown className="h-5 w-5 mr-2" />
              Get Premium Access - $9.99/month
            </PremiumButton>
          </Card>
        </div>
      </section>

      {/* Premium Modal - Light Theme */}
      {showPremiumModal && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Card className="max-w-md w-full bg-white shadow-2xl">
                <CardHeader className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2"
                    onClick={() => setShowPremiumModal(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="h-6 w-6 text-yellow-500" />
                    <CardTitle className="text-gray-900">
                      Upgrade to Premium
                    </CardTitle>
                  </div>
                  <CardDescription className="text-gray-600">
                    Unlock advanced scam detection features
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Premium features list */}
                  <div className="space-y-3">
                    {[
                      'Advanced Scam Score™ Algorithm',
                      '20-Year Financial Projections',
                      'AI Career Path Risk Analysis',
                      'Unlimited Path Comparisons',
                      'Priority Support & Updates',
                    ].map((feature, index) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-2"
                      >
                        <Check className="h-5 w-5 text-green-600 mt-0.5" />
                        <p className="text-gray-700">{feature}</p>
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
    </div>
  );
}
