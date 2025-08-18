'use client';

import { motion } from 'framer-motion';
import { Users, DollarSign, TrendingUp, Shield } from 'lucide-react';
import { NumberTicker } from '@/components/magic/number-ticker';

const stats = [
  {
    icon: Users,
    value: 2400,
    suffix: '+',
    label: 'Students Protected',
    description: 'Smart students who avoided education scams'
  },
  {
    icon: DollarSign,
    value: 15000000,
    prefix: '$',
    suffix: 'M',
    label: 'Debt Prevented',
    description: 'Total student debt savings identified'
  },
  {
    icon: TrendingUp,
    value: 1200,
    suffix: '+',
    label: 'Career Pivots',
    description: 'Students who chose better paths'
  },
  {
    icon: Shield,
    value: 89,
    suffix: '%',
    label: 'Success Rate',
    description: 'Users satisfied with their decision'
  }
];

export function SocialProofSection() {
  return (
    <section className="py-16 bg-white border-t border-b border-gray-200">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Trusted by Thousands of Smart Students
          </h2>
          <p className="text-gray-600">
            Join the community that's revolutionizing education decisions
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-3xl md:text-4xl font-bold text-gray-900">
                  {stat.prefix && <span>{stat.prefix}</span>}
                  <NumberTicker 
                    value={stat.value} 
                    delay={index * 0.2}
                  />
                  {stat.suffix && <span>{stat.suffix}</span>}
                </p>
                <p className="text-sm font-semibold text-gray-700">
                  {stat.label}
                </p>
                <p className="text-xs text-gray-500 max-w-24 mx-auto">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
