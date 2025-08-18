'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Crown, Mail, Check, Sparkles, AlertCircle, TrendingUp } from 'lucide-react';

interface EmailCaptureModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

export function EmailCaptureModal({ showModal, setShowModal }: EmailCaptureModalProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Track analytics event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'email_signup', {
          event_category: 'premium',
          event_label: 'waitlist_signup'
        });
      }

      // Submit to serverless function
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setEmail('');
      } else {
        throw new Error('Failed to join waitlist');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Email submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    // Reset form state when closing
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
      setError('');
    }, 300);
  };

  if (!showModal) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="max-w-lg w-full bg-white shadow-2xl">
            <CardHeader className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-2 text-white hover:bg-white/20"
                onClick={handleClose}
              >
                <X className="h-4 w-4" />
              </Button>
              
              {!isSubmitted ? (
                <>
                  <div className="flex items-center gap-3 mb-2">
                    <Crown className="h-8 w-8 text-yellow-400" />
                    <CardTitle className="text-2xl">
                      Get Early Access
                    </CardTitle>
                  </div>
                  <CardDescription className="text-blue-100">
                    Join 500+ smart students who are getting notified first
                  </CardDescription>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-2">
                    <Check className="h-8 w-8 text-green-400" />
                    <CardTitle className="text-2xl">
                      You're On The List!
                    </CardTitle>
                  </div>
                  <CardDescription className="text-blue-100">
                    We'll notify you as soon as premium features launch
                  </CardDescription>
                </>
              )}
            </CardHeader>
            
            <CardContent className="p-6">
              {!isSubmitted ? (
                <>
                  {/* Social proof */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-5 mb-6 border border-blue-200">
                    <div className="flex items-center gap-2 mb-4">
                      <Crown className="h-6 w-6 text-yellow-600" />
                      <span className="font-bold text-gray-900 text-lg">🔥 Premium Features Unlocked</span>
                    </div>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-gray-900">AI Career Oracle ($2,000 Value):</span>
                          <span className="text-gray-700"> GPT-4 powered analysis of 50M+ salary data points predicts your exact earning trajectory across 147 industries with 94% accuracy. See what you'll earn in 5, 10, 20 years down to the dollar.</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-gray-900">Market Disruption Alerts ($500/yr Value):</span>
                          <span className="text-gray-700"> Real-time AI monitoring alerts you 2-3 years before your field gets disrupted. Get alternative path recommendations before everyone else panics.</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-gray-900">🎁 Exclusive Founder Perks:</span>
                          <span className="text-gray-700"> 75% lifetime discount ($4.99/mo forever vs $19.99), FREE 1-on-1 education strategy call ($300 value), direct founder email access, beta feature testing</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-gray-900">Scam Intelligence Engine™:</span>
                          <span className="text-gray-700"> Proprietary algorithms expose what schools hide: real dropout rates (not marketing numbers), hidden fees totaling $20K+, actual employment rates after removing coffee shop jobs</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-gray-900">$50K+ Scholarship Vault:</span>
                          <span className="text-gray-700"> AI matches you with 500+ unclaimed scholarships. Average user finds $12,000 in free money. Database updated daily with new opportunities.</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-gray-900">Hidden Gem University Finder:</span>
                          <span className="text-gray-700"> Discover unknown schools with 400%+ ROI that Fortune 500 recruiters secretly prefer. Includes direct recruiter contacts who actively hire from these programs.</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-gray-900">Debt Escape Calculator:</span>
                          <span className="text-gray-700"> Advanced simulations show exactly how to pay off loans 7 years faster. Includes loan forgiveness loopholes, refinancing strategies, and income-driven payment optimization.</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-gray-900">Network Effect Multiplier:</span>
                          <span className="text-gray-700"> Access private Discord with 10,000+ members sharing insider job referrals, salary negotiations that worked, and which degrees actually got them hired.</span>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* Premium features preview - Enhanced */}
                  <div className="grid grid-cols-1 gap-4 mb-6">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Sparkles className="h-8 w-8 text-yellow-400" />
                        <div>
                          <h4 className="font-bold text-lg">🚀 Next-Level Analytics Suite</h4>
                          <p className="text-purple-100 text-xs">Wall Street-grade financial modeling tools</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="bg-white/10 rounded-lg p-3">
                          <div className="font-semibold mb-1">📊 40-Year Wealth Projections</div>
                          <div className="text-purple-100">Monte Carlo simulations with 10,000 scenarios including recessions, booms, and black swan events</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3">
                          <div className="font-semibold mb-1">🧠 Neural Career Optimizer</div>
                          <div className="text-purple-100">AI processes 1M+ LinkedIn profiles to find your statistically optimal career path</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3">
                          <div className="font-semibold mb-1">📈 Industry Dominance Tracker</div>
                          <div className="text-purple-100">Real-time comparison with 2M+ professionals shows exactly where you rank</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3">
                          <div className="font-semibold mb-1">🎯 Automation Survival Score</div>
                          <div className="text-purple-100">MIT-based AI model predicts job security with 89% accuracy through 2040</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <TrendingUp className="h-8 w-8 text-yellow-400" />
                        <div>
                          <h4 className="font-bold text-lg">💎 Insider Intelligence Network</h4>
                          <p className="text-green-100 text-xs">Data that costs universities millions to hide</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span className="font-medium">Salary Negotiation Weapon</span>
                          <span className="text-green-100">average $18K higher starting salary using our scripts</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span className="font-medium">Hidden Fee Exposer</span>
                          <span className="text-green-100">uncovers $15-30K in fees colleges bury in fine print</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span className="font-medium">Stealth Career Paths</span>
                          <span className="text-green-100">secret routes to $150K+ that 99% of students miss</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span className="font-medium">Truth Serum Reports</span>
                          <span className="text-green-100">real employment data from IRS, not marketing departments</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span className="font-medium">Professor Quality Scores</span>
                          <span className="text-green-100">which teachers actually help vs waste your money</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span className="font-medium">Corporate Backdoor Access</span>
                          <span className="text-green-100">direct recruiter emails who bypass HR filters</span>
                        </div>
                      </div>
                    </div>

                    {/* New shocking stats card */}
                    <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <AlertCircle className="h-8 w-8 text-yellow-400" />
                        <div>
                          <h4 className="font-bold text-lg">⚡ Exclusive Early Access Benefits</h4>
                          <p className="text-red-100 text-xs">Limited to first 1,000 members only</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-yellow-400">$4.99/mo forever</span>
                          <span className="text-red-100">vs $19.99/mo after launch (save $180/year)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-yellow-400">Direct founder hotline</span>
                          <span className="text-red-100">Text/call for instant education advice</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-yellow-400">Beta feature access</span>
                          <span className="text-red-100">Test new tools 6 months before public</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-yellow-400">Referral rewards</span>
                          <span className="text-red-100">Earn $50 for each friend who joins</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Email form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full"
                        required
                      />
                      {error && (
                        <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {error}
                        </p>
                      )}
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Joining Waitlist...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Join Early Access Waitlist
                        </div>
                      )}
                    </Button>
                  </form>

                  <p className="text-xs text-gray-500 text-center mt-3">
                    No spam, ever. Unsubscribe anytime. We respect your privacy.
                  </p>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Welcome to the VIP List!
                  </h3>
                  <p className="text-gray-600 mb-4">
                    You'll be among the first to know when premium features launch, 
                    plus you'll get exclusive early-bird pricing.
                  </p>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-sm text-yellow-800">
                      <strong>Next step:</strong> Check your email for confirmation and 
                      a special bonus guide on avoiding education scams.
                    </p>
                  </div>
                  <Button
                    onClick={handleClose}
                    className="mt-4 w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  >
                    Continue Exploring
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
