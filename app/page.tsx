'use client';

import { useState } from 'react';
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
import {
  ArrowRight,
  Calculator,
  TrendingUp,
  Shield,
  Calendar,
  DollarSign,
  Trophy,
  AlertCircle,
  AlertTriangle,
  Plus,
  Share2,
  Check,
  Crown,
  X,
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
          // User cancelled or error
          analytics.shareAttempted('webshare', undefined, false);
        });
    } else {
      // Fallback: Copy to clipboard
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
    // Set default values for quick comparison
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

    // Auto-calculate after a brief delay to allow state updates
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
    <div className="container mx-auto px-4 py-8">
      {/* VIRAL HERO SECTION */}
      {mode === 'intro' && (
        <section className="text-center py-16 space-y-8 bg-gradient-to-br from-red-50 via-white to-yellow-50">
          {/* Debt Counter */}
          <div className="bg-red-600 text-white px-6 py-3 rounded-xl max-w-2xl mx-auto mb-8">
            <p className="text-sm font-semibold mb-1">🚨 US STUDENT DEBT CRISIS</p>
            <p className="text-2xl font-black">$1.7 TRILLION</p>
            <p className="text-sm opacity-90">Growing by $3,000 every second</p>
          </div>

          <h1 className="text-6xl font-black tracking-tight leading-tight">
            The <span className="text-red-600">$200,000</span> Question:{' '}
            <br className="hidden sm:block" />
            <span className="text-gray-900">Is College Worth It?</span>
          </h1>

          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-2xl font-bold text-gray-800">
              Find out if you're getting <span className="text-red-600 underline">SCAMMED</span>
            </p>
            <p className="text-lg text-gray-600">
              Our controversial calculator exposes the brutal truth about education ROI. Compare
              degrees vs trades vs going straight to work - the results will shock you.
            </p>
          </div>

          {/* Shocking Stats */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto py-8">
            <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-3xl font-black text-red-700">73%</p>
              <p className="text-sm font-semibold text-red-800">of CS jobs at risk from AI</p>
            </div>
            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-r-lg">
              <p className="text-3xl font-black text-yellow-700">42%</p>
              <p className="text-sm font-semibold text-yellow-800">of grads underemployed</p>
            </div>
            <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-3xl font-black text-green-700">96%</p>
              <p className="text-sm font-semibold text-green-800">of welders find work</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-bold"
              onClick={() => setMode('calculator')}
            >
              <AlertTriangle className="h-6 w-6" />
              Calculate My Scam Score™
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 border-2 border-red-600 text-red-600 hover:bg-red-50 px-8 py-4 text-lg font-semibold"
              onClick={() => handleQuickCompare('trades_plumbing', 'college_liberal_arts')}
            >
              <TrendingUp className="h-6 w-6" />
              See Shocking Comparisons
            </Button>
          </div>

          {/* Warning Message */}
          <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-6 max-w-2xl mx-auto">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-yellow-600 mt-1 flex-shrink-0" />
              <div className="text-left">
                <p className="font-bold text-yellow-800 mb-2">⚠️ Reality Check Incoming</p>
                <p className="text-sm text-yellow-700">
                  This calculator uses REAL data from Bureau of Labor Statistics, MIT studies, and
                  industry reports. Prepare to question everything you've been told about education.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Calculator/Comparison Section */}
      {(mode === 'calculator' || mode === 'compare') && (
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              {showComparison ? 'Compare Education Paths' : 'Calculate Your Education ROI'}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {showComparison
                ? 'Compare two different education paths side by side'
                : 'Enter your details to see when your education investment pays off'}
            </p>
          </div>

          <div className={`grid ${showComparison ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-8`}>
            {/* Path 1 Input */}
            <Card
              className={showComparison && comparison?.winner === 'path1' ? 'border-primary' : ''}
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
                  <Button onClick={handleCalculate} className="w-full">
                    Calculate ROI
                  </Button>
                )}
                {showComparison && (
                  <Button
                    onClick={() => {
                      setShowComparison(false);
                      setMode('calculator');
                      setInputs2({
                        path: '',
                        location: '',
                        schoolTier: '',
                        livingCost: '',
                        scholarships: 0,
                      });
                      setComparison(null);
                    }}
                    variant="outline"
                    className="w-full mt-4 gap-2"
                  >
                    <X className="h-4 w-4" />
                    Switch to Single Path
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Path 2 Input (Compare mode) */}
            {showComparison && (
              <Card className={comparison?.winner === 'path2' ? 'border-primary' : ''}>
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
              </Card>
            )}

            {/* Results Section */}
            {!showComparison && result1 && (
              <Card className="lg:col-span-2">
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
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        <GlossaryTerm
                          term="Total Cost"
                          definition="The complete cost of your education including tuition, fees, materials, and living expenses throughout the entire program duration."
                          example="A 4-year degree with $30,000/year tuition plus $15,000/year living costs = $180,000 total"
                        >
                          Total Cost
                        </GlossaryTerm>
                      </p>
                      <p className="text-2xl font-bold">${result1.totalCost.toLocaleString()}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        <GlossaryTerm
                          term="Net Cost"
                          definition="Your actual out-of-pocket expense after subtracting scholarships, grants, and other financial aid from the total cost."
                          example="$180,000 total cost - $40,000 scholarships = $140,000 net cost"
                        >
                          Net Cost
                        </GlossaryTerm>
                      </p>
                      <p className="text-2xl font-bold">${result1.adjustedCost.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <p className="text-sm font-medium">
                        <GlossaryTerm
                          term="Breakeven Time"
                          definition="The point when your cumulative earnings after graduation equal your total education investment. This is when your education has 'paid for itself'."
                          example="If you spent $100,000 on education and earn $50,000/year more than without the degree, you break even in 2 years"
                        >
                          Breakeven Time
                        </GlossaryTerm>
                      </p>
                    </div>
                    <p className="text-3xl font-bold text-primary">
                      {result1.breakevenMonths > 120
                        ? 'Never'
                        : `${result1.breakevenMonths} months`}
                    </p>
                    {result1.breakevenMonths <= 120 && (
                      <p className="text-sm text-muted-foreground">
                        ({Math.floor(result1.breakevenMonths / 12)} years{' '}
                        {result1.breakevenMonths % 12} months)
                      </p>
                    )}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <p className="text-sm font-medium">Monthly Salary</p>
                    </div>
                    <p className="text-2xl font-bold">
                      ${Math.round(result1.monthlySalary).toLocaleString()}
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <p className="text-sm font-medium">
                        <GlossaryTerm
                          term="10-Year Net Worth"
                          definition="Your projected total accumulated wealth 10 years after starting your education path, accounting for all income earned minus education costs and living expenses."
                          example="Earning $70,000/year for 6 years after a 4-year degree, minus costs = $250,000 net worth"
                        >
                          10-Year Net Worth
                        </GlossaryTerm>
                      </p>
                    </div>
                    <p className="text-2xl font-bold text-green-600">
                      ${result1.netWorth10Years.toLocaleString()}
                    </p>
                  </div>

                  {result1.doubtScore > 50 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                        <p className="text-sm font-medium text-yellow-900">Risk Warning</p>
                      </div>
                      <p className="text-sm text-yellow-800">{result1.riskText}</p>
                    </div>
                  )}

                  {/* Premium CTA in results */}
                  <Card className="border-primary bg-gradient-to-r from-blue-50 to-purple-50">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Crown className="h-6 w-6 text-yellow-500" />
                        <h3 className="font-semibold">Want deeper insights?</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Premium members get 20-year projections, tax optimization strategies, and
                        personalized career pathway recommendations.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => setShowPremiumModal(true)}
                      >
                        Unlock Premium Features
                      </Button>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Timeline Graph - Show after results for single path */}
          {!showComparison && result1 && (
            <ROITimeline
              result={result1}
              pathName={educationPaths[inputs1.path]?.name || 'Your Path'}
            />
          )}

          {/* Compare Button */}
          {showComparison && (
            <div className="mb-8">
              <Button onClick={handleCompare} className="w-full" size="lg">
                Compare Paths
              </Button>
            </div>
          )}

          {/* Comparison Results */}
          {showComparison && comparison && comparison.result1 && comparison.result2 && (
            <div className="space-y-6">
              {/* Winner Card */}
              {comparison.winner && (
                <Card className="border-primary">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Trophy className="h-6 w-6 text-primary" />
                      <CardTitle>
                        Winner: Path {comparison.winner === 'path1' ? '1' : '2'}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg">
                      Breaks even{' '}
                      <span className="font-bold text-primary">
                        {comparison.differenceMonths} months faster
                      </span>{' '}
                      and generates{' '}
                      <span className="font-bold text-primary">
                        ${comparison.differenceAmount.toLocaleString()}
                      </span>{' '}
                      more wealth over 10 years
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Side by Side Comparison */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className={comparison.winner === 'path1' ? 'border-primary' : ''}>
                  <CardHeader>
                    <CardTitle>Path 1: {educationPaths[inputs1.path]?.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Cost</p>
                        <p className="text-xl font-bold">
                          ${comparison.result1.totalCost.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Net Cost</p>
                        <p className="text-xl font-bold">
                          ${comparison.result1.adjustedCost.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="h-4 w-4" />
                        <p className="text-sm text-muted-foreground">Breakeven</p>
                      </div>
                      <p className="text-2xl font-bold">
                        {comparison.result1.breakevenMonths > 120
                          ? 'Never'
                          : `${comparison.result1.breakevenMonths} months`}
                      </p>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="h-4 w-4" />
                        <p className="text-sm text-muted-foreground">10-Year Net Worth</p>
                      </div>
                      <p className="text-2xl font-bold text-green-600">
                        ${comparison.result1.netWorth10Years.toLocaleString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className={comparison.winner === 'path2' ? 'border-primary' : ''}>
                  <CardHeader>
                    <CardTitle>Path 2: {educationPaths[inputs2.path]?.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Cost</p>
                        <p className="text-xl font-bold">
                          ${comparison.result2.totalCost.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Net Cost</p>
                        <p className="text-xl font-bold">
                          ${comparison.result2.adjustedCost.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="h-4 w-4" />
                        <p className="text-sm text-muted-foreground">Breakeven</p>
                      </div>
                      <p className="text-2xl font-bold">
                        {comparison.result2.breakevenMonths > 120
                          ? 'Never'
                          : `${comparison.result2.breakevenMonths} months`}
                      </p>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="h-4 w-4" />
                        <p className="text-sm text-muted-foreground">10-Year Net Worth</p>
                      </div>
                      <p className="text-2xl font-bold text-green-600">
                        ${comparison.result2.netWorth10Years.toLocaleString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Timeline Graphs for Comparison */}
              <div className="grid lg:grid-cols-2 gap-6 mt-6">
                <ROITimeline
                  result={comparison.result1}
                  pathName={educationPaths[inputs1.path]?.name || 'Path 1'}
                />
                <ROITimeline
                  result={comparison.result2}
                  pathName={educationPaths[inputs2.path]?.name || 'Path 2'}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Viral Comparisons - Show on intro and after results */}
      {(mode === 'intro' ||
        (mode === 'calculator' && result1) ||
        (mode === 'compare' && comparison)) && (
        <section className="py-16 space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Mind-Blowing Comparisons</h2>
            <p className="text-muted-foreground mt-2">
              Real data that challenges conventional wisdom
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {viralComparisons.slice(0, 3).map((comparison, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{comparison.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => handleQuickCompare(comparison.path1, comparison.path2)}
                  >
                    See Comparison <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Premium Section - Always visible, anchor for footer link */}
      <section
        id="premium"
        className="py-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl my-8"
      >
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <Crown className="h-16 w-16 text-yellow-500" />
            </div>
            <h2 className="text-4xl font-bold">Unlock Premium Insights</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Take your education planning to the next level with advanced analytics, personalized
              recommendations, and long-term financial projections
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 mb-8">
              <Card className="text-left">
                <CardContent className="pt-6">
                  <TrendingUp className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">20-Year Projections</h3>
                  <p className="text-sm text-muted-foreground">
                    See career growth and compound earnings over two decades
                  </p>
                </CardContent>
              </Card>

              <Card className="text-left">
                <CardContent className="pt-6">
                  <Shield className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">Risk Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Understand job market volatility and career stability metrics
                  </p>
                </CardContent>
              </Card>

              <Card className="text-left">
                <CardContent className="pt-6">
                  <Calculator className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">Debt Optimization</h3>
                  <p className="text-sm text-muted-foreground">
                    Smart loan repayment strategies to minimize interest
                  </p>
                </CardContent>
              </Card>

              <Card className="text-left">
                <CardContent className="pt-6">
                  <Trophy className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">Career Pathways</h3>
                  <p className="text-sm text-muted-foreground">
                    Alternative routes to reach your income goals faster
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-white rounded-lg p-8 max-w-md mx-auto shadow-lg">
              <div className="text-3xl font-bold mb-2">$9.99/month</div>
              <p className="text-muted-foreground mb-6">
                Cancel anytime • 30-day money-back guarantee
              </p>
              <Button
                size="lg"
                className="w-full gap-2"
                onClick={() => {
                  setShowPremiumModal(true);
                  analytics.premiumClicked('premium_section');
                }}
              >
                <Crown className="h-5 w-5" />
                Get Premium Access
              </Button>
              <p className="text-xs text-muted-foreground mt-4">
                Join thousands of students making smarter education investments
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Modal */}
      {showPremiumModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
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
                <CardTitle>Upgrade to Premium</CardTitle>
              </div>
              <CardDescription>Unlock advanced features and deeper insights</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Extended 20-Year Projections</p>
                    <p className="text-sm text-muted-foreground">
                      See long-term career growth and earnings
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Location-Specific Adjustments</p>
                    <p className="text-sm text-muted-foreground">
                      Precise salary data for 100+ cities
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Debt Optimization</p>
                    <p className="text-sm text-muted-foreground">Smart repayment strategies</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Unlimited Comparisons</p>
                    <p className="text-sm text-muted-foreground">
                      Save and export all calculations
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="text-center mb-4">
                  <p className="text-3xl font-bold">$9.99</p>
                  <p className="text-sm text-muted-foreground">per month</p>
                </div>
                <Button
                  className="w-full"
                  onClick={() => {
                    analytics.premiumClicked('premium_modal');
                    // Here you would integrate Stripe or your payment processor
                    alert(
                      'Payment integration would be implemented here with Stripe, PayPal, or similar service'
                    );
                    setShowPremiumModal(false);
                  }}
                >
                  Get Premium Access
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Cancel anytime. 30-day money-back guarantee.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Premium CTA Button - Float on bottom right */}
      {(mode === 'calculator' || mode === 'compare') && !showPremiumModal && (
        <Button
          className="fixed bottom-8 right-8 gap-2 shadow-lg"
          onClick={() => setShowPremiumModal(true)}
        >
          <Crown className="h-4 w-4" />
          Unlock Premium
        </Button>
      )}
    </div>
  );
}
