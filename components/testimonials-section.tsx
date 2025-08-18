'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  path: string;
  savings: string;
  quote: string;
  avatar: string;
  verified: boolean;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah M.",
    path: "Community college to university transfer",
    savings: "$45,000 saved",
    quote: "I was planning to go straight to a 4-year university. CollegeScam.io showed me I could save $45K by doing my general education at community college first. Same degree, way less debt!",
    avatar: "👩‍🎓",
    verified: true
  },
  {
    name: "Mike R.",
    path: "In-state vs out-of-state comparison",
    savings: "$80,000 saved",
    quote: "I wanted to go out-of-state for the 'college experience' but the calculator opened my eyes. My in-state school has the same program for $20K/year less. I'll graduate debt-free instead.",
    avatar: "👨‍🎓",
    verified: true
  },
  {
    name: "Jessica L.",
    path: "Coding bootcamp route",
    savings: "44 months ahead of CS grads",
    quote: "While my friends were still in college, I was already working as a developer. The scam score calculation was spot-on - I was profitable years before they graduated.",
    avatar: "👩‍💻",
    verified: true
  },
  {
    name: "David K.",
    path: "Trade school vs university",
    savings: "$120,000 debt avoided",
    quote: "My parents thought I was crazy for skipping college. Now I'm an electrician making $75K with no debt while my college friends are still paying loans. This site opened their eyes too.",
    avatar: "👨‍🔧",
    verified: true
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Real Students, Real Savings
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how smart students used our scam detection to avoid financial traps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full bg-white shadow-lg hover:shadow-xl transition-shadow border-2 border-gray-100 hover:border-blue-200">
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-blue-600 mb-4 opacity-50" />
                  
                  <blockquote className="text-gray-700 text-sm leading-relaxed mb-4">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{testimonial.avatar}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-900 text-sm">
                            {testimonial.name}
                          </p>
                          {testimonial.verified && (
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-blue-500 fill-current" />
                              <span className="text-xs text-blue-600 font-medium">Verified</span>
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{testimonial.path}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-green-600">
                        {testimonial.savings}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
