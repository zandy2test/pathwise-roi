'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingNavbar } from '@/components/premium/floating-navbar';
import { GradientHero } from '@/components/premium/gradient-hero';
import { SpotlightCard } from '@/components/premium/spotlight-card';
import { GlassCard } from '@/components/premium/glass-card';
import { AnimatedText } from '@/components/premium/animated-text';
import { AuroraBackground } from '@/components/premium/aurora-background';
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
    <AuroraBackground>
      <FloatingNavbar />
      
      {/* PREMIUM HERO SECTION */}
      {mode === 'intro' && (
        <GradientHero variant="mesh">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Premium Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="flex justify-center"
              >
                <div className="glass-dark px-6 py-3 rounded-full inline-flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-premium-accent-primary" />
                  <span className="text-sm font-medium text-premium-text-secondary">
                    Trusted by 50,000+ Students
                  </span>
                  <Sparkles className="h-4 w-4 text-premium-accent-secondary" />
                </div>
              </motion.div>

              {/* Main Heading */}
              <AnimatedText
                text="The Financial Intelligence Platform for Your Education Journey"
                className="text-5xl md:text-7xl font-bold text-premium-text-primary"
                gradient={true}
                delay={0.2}
              />

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-xl md:text-2xl text-premium-text-secondary max-w-3xl mx-auto"
              >
                Make data-driven decisions about your education investment with real-time ROI 
                calculations, AI risk analysis, and personalized career pathways.
              </motion.p>

              {/* Statistics Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="grid grid-cols-3 gap-8 max-w-3xl mx-auto py-8"
              >
                <div className="text-center">
                  <div className="text-4xl font-bold text-premium-accent-primary">
                    <NumberTicker value={1.7} suffix="T" prefix="$" delay={1.2} />
                  </div>
                  <p className="text-sm text-premium-text-secondary mt-2">Student Debt</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-premium-accent-secondary">
                    <NumberTicker value={73} suffix="%" delay={1.4} />
                  </div>
                  <p className="text-sm text-premium-text-secondary mt-2">AI Job Risk</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-premium-success">
                    <NumberTicker value={42} suffix="%" delay={1.6} />
                  </div>
                  <p className="text-sm text-premium-text-secondary mt-2">Underemployed</p>
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
                  className="px-8 py-6 text-lg bg-gradient-to-r from-premium-accent-primary to-premium-accent-secondary"
                >
                  <Calculator className="h-6 w-6 mr-2" />
                  Start Intelligence Analysis
                </CTAButton>
                <ShimmerButton
                  onClick={() => handleQuickCompare('college_stem', 'trades_electrical')}
                  className="px-8 py-6 text-lg"
                  shimmerColor="var(--color-accent-secondary)"
                  background="transparent"
                >
                  <LineChart className="h-6 w-6 mr-2" />
                  View Live Comparisons
                </ShimmerButton>
              </motion.div>
            </motion.div>
          </div>
        </GradientHero>
      )}

      {/* FEATURE CARDS SECTION */}
      {mode === 'intro' && (
        <section className="py-20 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-premium-text-primary mb-4">
              Financial Intelligence at Your Fingertips
            </h2>
            <p className="text-xl text-premium-text-secondary max-w-2xl mx-auto">
              Advanced analytics and visualizations to guide your education investment decisions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <SpotlightCard>
                <div className="space-y-4">
                  <Brain className="h-12 w-12 text-premium-accent-primary" />
                  <h3 className="text-2xl font-bold text-premium-text-primary">
                    AI Risk Analysis
                  </h3>
                  <p className="text-premium-text-secondary">
                    Understand how automation and AI will impact your chosen career path 
                    over the next decade with our proprietary risk scoring.
                  </p>
                </div>
              </SpotlightCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <SpotlightCard>
                <div className="space-y-4">
                  <BarChart3 className="h-12 w-12 text-premium-accent-secondary" />
                  <h3 className="text-2xl font-bold text-premium-text-primary">
                    Real-Time Projections
                  </h3>
                  <p className="text-premium-text-secondary">
                    Interactive timelines show exactly when your education investment 
                    breaks even and your 10-year wealth accumulation trajectory.
                  </p>
                </div>
              </SpotlightCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <SpotlightCard>
                <div className="space-y-4">
                  <Target className="h-12 w-12 text-premium-success" />
                  <h3 className="text-2xl font-bold text-premium-text-primary">
                    Precision Calculations
                  </h3>
                  <p className="text-premium-text-secondary">
                    Location-specific salary data, school tier adjustments, and living 
                    cost factors ensure accuracy tailored to your exact situation.
                  </p>
                </div>
              </SpotlightCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <SpotlightCard>
                <div className="space-y-4">
                  <Zap className="h-12 w-12 text-premium-warning" />
                  <h3 className="text-2xl font-bold text-premium-text-primary">
                    Opportunity Cost Engine
                  </h3>
                  <p className="text-premium-text-secondary">
                    See what you're really giving up - lost wages, compound interest, 
                    and alternative investment returns during your education years.
                  </p>
                </div>
              </SpotlightCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <SpotlightCard>
                <div className="space-y-4">
                  <GraduationCap className="h-12 w-12 text-premium-danger" />
                  <h3 className="text-2xl font-bold text-premium-text-primary">
                    20+ Career Paths
                  </h3>
                  <p className="text-premium-text-secondary">
                    From Ivy League to trade schools, bootcamps to apprenticeships - 
                    compare any education path with accurate, unbiased data.
                  </p>
                </div>
              </SpotlightCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <SpotlightCard>
                <div className="space-y-4">
                  <Briefcase className="h-12 w-12 text-premium-glow" />
                  <h3 className="text-2xl font-bold text-premium-text-primary">
                    Career Intelligence
                  </h3>
                  <p className="text-premium-text-secondary">
                    Employment rates, industry growth projections, and median salaries 
                    from Bureau of Labor Statistics and industry reports.
                  </p>
                </div>
              </SpotlightCard>
            </motion.div>
          </div>
        </section>
      )}

      {/* Calculator/Comparison Section - Keep existing functionality but with new styling */}
      {(mode === 'calculator' || mode === 'compare') && (
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="text-center">
              <AnimatedGradientHeading className="text-4xl font-bold mb-4">
                {showComparison ? 'Compare Education Paths' : 'Calculate Your Education ROI'}
              </AnimatedGradientHeading>
              <p className="text-premium-text-secondary max-w-2xl mx-auto">
                {showComparison
                  ? 'Compare two different education paths side by side'
                  : 'Enter your details to see when your education investment pays off'}
              </p>
            </div>

            <div className={`grid ${showComparison ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-8`}>
              {/* Path 1 Input */}
              <GlassCard
                variant={showComparison && comparison?.winner === 'path1' ? 'gradient' : 'default'}
                hover={false}
                className="p-0"
              >
                <CardHeader>
                  <CardTitle>{showComparison ? 'Path 1' : 'Your Education Path'}</CardTitle>
                  <CardDescription>
                    {showComparison
                      ? 'First education path'
                      : 'Select your education and personal details'}
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
                    <CTAButton onClick={handleCalculate} className="w-full">
                      Calculate ROI
                    </CTAButton>
                  )}
                </CardContent>
              </GlassCard>

              {/* Path 2 Input (Compare mode) */}
              {showComparison && (
                <GlassCard
                  variant={comparison?.winner === 'path2' ? 'gradient' : 'default'}
                  hover={false}
                  className="p-0"
                >
                  <CardHeader>
                    <CardTitle>Path 2</CardTitle>
                    <CardDescription>Second education path</CardDescription>
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
                </GlassCard>
              )}

              {/* Results Section */}
              {!showComparison && result1 && (
                <SpotlightCard className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Your Results</CardTitle>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm" onClick={handleShare} className="gap-2">
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
                        className="gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Compare with Another Path
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Results content remains the same but with premium styling */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-premium-text-secondary">Total Cost</p>
                        <p className="text-2xl font-bold text-premium-text-primary">
                          <NumberTicker
                            value={result1.totalCost}
                            prefix="$"
                            delay={0.3}
                          />
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-premium-text-secondary">Net Cost</p>
                        <p className="text-2xl font-bold text-premium-text-primary">
                          <NumberTicker
                            value={result1.adjustedCost}
                            prefix="$"
                            delay={0.5}
                          />
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-premium-accent-primary/20 pt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-premium-accent-primary" />
                        <p className="text-sm font-medium text-premium-text-secondary">
                          Breakeven Time
                        </p>
                      </div>
                      <p className="text-3xl font-bold text-premium-accent-primary">
                        {result1.breakevenMonths > 120
                          ? 'Never'
                          : `${result1.breakevenMonths} months`}
                      </p>
                    </div>

                    <div className="border-t border-premium-accent-primary/20 pt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-premium-success" />
                        <p className="text-sm font-medium text-premium-text-secondary">
                          10-Year Net Worth
                        </p>
                      </div>
                      <p className="text-2xl font-bold text-premium-success">
                        <NumberTicker
                          value={result1.netWorth10Years}
                          prefix="$"
                          delay={0.7}
                        />
                      </p>
                    </div>
                  </CardContent>
                </SpotlightCard>
              )}
            </div>

            {/* Compare Button */}
            {showComparison && (
              <div className="mb-8">
                <CTAButton onClick={handleCompare} className="w-full py-4 text-lg">
                  Compare Paths
                </CTAButton>
              </div>
            )}

            {/* Comparison Results - Keep existing but with premium styling */}
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
                    <GlassCard variant="gradient">
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <Trophy className="h-6 w-6 text-premium-gold animate-float" />
                          <CardTitle className="text-premium-text-primary">
                            Winner: Path {comparison.winner === 'path1' ? '1' : '2'}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-lg text-premium-text-secondary">
                          Breaks even{' '}
                          <span className="font-bold text-premium-accent-primary">
                            {comparison.differenceMonths} months faster
                          </span>{' '}
                          and generates{' '}
                          <span className="font-bold text-premium-success">
                            ${comparison.differenceAmount.toLocaleString()}
                          </span>{' '}
                          more wealth over 10 years
                        </p>
                      </CardContent>
                    </GlassCard>
                  )}

                  {/* Comparison results content continues... */}
                </motion.div>
              </AnimatePresence>
            )}
          </motion.div>
        </div>
      )}

      {/* Premium CTA Section - Always visible */}
      <section className="py-20 container mx-auto px-4">
        <GlassCard variant="gradient" className="p-12 text-center">
          <Crown className="h-16 w-16 text-premium-gold mx-auto mb-6 animate-float" />
          <h2 className="text-4xl font-bold text-premium-text-primary mb-4">
            Unlock Premium Intelligence
          </h2>
          <p className="text-xl text-premium-text-secondary max-w-2xl mx-auto mb-8">
            Advanced analytics, 20-year projections, and personalized career pathways
          </p>
          <PremiumButton
            onClick={() => setShowPremiumModal(true)}
            className="px-8 py-4 text-lg"
          >
            <Crown className="h-5 w-5 mr-2" />
            Get Premium Access - $9.99/month
          </PremiumButton>
        </GlassCard>
      </section>

      {/* Premium Modal - Keep existing but with glass styling */}
      {showPremiumModal && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <GlassCard variant="dark" className="max-w-md w-full">
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
                    <Crown className="h-6 w-6 text-premium-gold" />
                    <CardTitle className="text-premium-text-primary">
                      Upgrade to Premium
                    </CardTitle>
                  </div>
                  <CardDescription className="text-premium-text-secondary">
                    Unlock advanced features and deeper insights
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Premium features list */}
                  <div className="space-y-3">
                    {[
                      'Extended 20-Year Projections',
                      'Location-Specific Adjustments',
                      'Debt Optimization Strategies',
                      'Unlimited Comparisons',
                      'Priority Support',
                    ].map((feature, index) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-2"
                      >
                        <Check className="h-5 w-5 text-premium-success mt-0.5" />
                        <p className="text-premium-text-primary">{feature}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="border-t border-premium-accent-primary/20 pt-4">
                    <div className="text-center mb-4">
                      <p className="text-3xl font-bold text-premium-text-primary">$9.99</p>
                      <p className="text-sm text-premium-text-secondary">per month</p>
                    </div>
                    <PremiumButton
                      className="w-full"
                      onClick={() => {
                        analytics.premiumClicked('premium_modal');
                        alert('Payment integration would be implemented here');
                        setShowPremiumModal(false);
                      }}
                    >
                      Get Premium Access
                    </PremiumButton>
                    <p className="text-xs text-premium-text-secondary text-center mt-2">
                      Cancel anytime. 30-day money-back guarantee.
                    </p>
                  </div>
                </CardContent>
              </GlassCard>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </AuroraBackground>
  );
}
