'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Crown, Mail, Check, AlertCircle } from 'lucide-react';

interface EmailCaptureModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

export function EmailCaptureModal({ showModal, setShowModal }: EmailCaptureModalProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [startTime, setStartTime] = useState(Date.now());
  const [honeypot, setHoneypot] = useState('');

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

      // Submit to serverless function with bot protection
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          honeypot,
          startTime
        }),
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
      setStartTime(Date.now()); // Reset timing
      setHoneypot('');
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
          <Card className="max-w-2xl w-full bg-white shadow-2xl">
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
                  {/* Two Column Layout */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Left Column - Benefits */}
                    <div className="space-y-4">
                      <h3 className="font-bold text-gray-900 text-lg mb-3">Premium Features</h3>
                      
                      {/* Key Benefits - More Detailed */}
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="text-2xl">🧠</div>
                          <div>
                            <div className="font-semibold text-sm text-gray-900">AI Career Analysis</div>
                            <div className="text-xs text-gray-600">Machine learning predicts your optimal career path based on industry trends</div>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="text-2xl">💰</div>
                          <div>
                            <div className="font-semibold text-sm text-gray-900">$50K+ Hidden Scholarships</div>
                            <div className="text-xs text-gray-600">Access our database of 10,000+ lesser-known grants and scholarships</div>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="text-2xl">📊</div>
                          <div>
                            <div className="font-semibold text-sm text-gray-900">20-Year Financial Projections</div>
                            <div className="text-xs text-gray-600">See your complete wealth trajectory including retirement impact</div>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="text-2xl">🎯</div>
                          <div>
                            <div className="font-semibold text-sm text-gray-900">Real Industry Data</div>
                            <div className="text-xs text-gray-600">Compare against actual salaries from 50,000+ professionals</div>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="text-2xl">🚀</div>
                          <div>
                            <div className="font-semibold text-sm text-gray-900">Alternative Path Finder</div>
                            <div className="text-xs text-gray-600">Discover bootcamps, certifications, and trade schools that match your goals</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Form and Deal */}
                    <div className="space-y-4">
                      {/* Early Access Deal */}
                      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg p-4">
                        <div className="text-center">
                          <div className="font-bold text-lg mb-2">🔥 Early Access Special</div>
                          <div className="text-2xl font-black">$4.99/mo</div>
                          <div className="text-sm opacity-90 line-through">Regular: $19.99/mo</div>
                          <div className="text-sm font-bold mt-2">Save 75% Forever</div>
                          <div className="text-xs mt-2 opacity-75">Limited to first 1,000 members</div>
                        </div>
                      </div>

                      {/* What You Get */}
                      <div className="bg-blue-50 rounded-lg p-3">
                        <h4 className="font-semibold text-sm text-gray-900 mb-2">What You'll Get:</h4>
                        <ul className="text-xs text-gray-700 space-y-1">
                          <li>✅ Instant access to all premium features</li>
                          <li>✅ Weekly personalized career insights</li>
                          <li>✅ Priority support from education experts</li>
                          <li>✅ Early access to new features</li>
                          <li>✅ Exclusive ROI optimization guides</li>
                        </ul>
                      </div>

                      {/* Email form */}
                      <form onSubmit={handleSubmit} className="space-y-3">
                        {/* Honeypot field - hidden from users */}
                        <input
                          type="text"
                          name="website"
                          value={honeypot}
                          onChange={(e) => setHoneypot(e.target.value)}
                          style={{ display: 'none' }}
                          tabIndex={-1}
                          autoComplete="off"
                        />
                        
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

                      <p className="text-xs text-gray-500 text-center">
                        No spam, ever. Unsubscribe anytime.
                      </p>
                    </div>
                  </div>
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
