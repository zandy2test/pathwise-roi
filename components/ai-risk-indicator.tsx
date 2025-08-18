import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Bot, Shield, TrendingDown, Sparkles } from 'lucide-react';
import { educationPaths } from '@/lib/data';
import type { CalculatorInputs } from '@/lib/types';

interface AIRiskIndicatorProps {
  inputs: CalculatorInputs;
}

// AI disruption risk by field (0-100 scale)
const aiRiskScores: Record<string, { score: number; timeline: string; alternatives: string[] }> = {
  college_tech: { 
    score: 45, 
    timeline: '5-10 years',
    alternatives: ['AI/ML specialization', 'Cybersecurity', 'Quantum computing']
  },
  college_business: { 
    score: 65, 
    timeline: '3-7 years',
    alternatives: ['Data analytics', 'AI strategy', 'Digital transformation']
  },
  college_liberal_arts: { 
    score: 75, 
    timeline: '2-5 years',
    alternatives: ['Creative writing', 'Philosophy + Tech', 'UX design']
  },
  college_sciences: { 
    score: 30, 
    timeline: '10-15 years',
    alternatives: ['Biotech', 'Materials science', 'Research methodology']
  },
  trades_electrical: { 
    score: 20, 
    timeline: '15+ years',
    alternatives: ['Smart home tech', 'Solar installation', 'EV charging']
  },
  trades_plumbing: { 
    score: 15, 
    timeline: '20+ years',
    alternatives: ['Water system design', 'Green building', 'Inspection services']
  },
  trades_welding: { 
    score: 35, 
    timeline: '10-15 years',
    alternatives: ['Robotic welding operation', 'Underwater welding', 'Inspection']
  },
  bootcamp_coding: { 
    score: 55, 
    timeline: '3-7 years',
    alternatives: ['AI prompt engineering', 'System architecture', 'DevOps']
  },
  bootcamp_data: { 
    score: 40, 
    timeline: '5-10 years',
    alternatives: ['ML engineering', 'Data strategy', 'AI ethics']
  },
  community_transfer: { 
    score: 50, 
    timeline: '5-10 years',
    alternatives: ['Specialized certifications', 'Trade skills', 'Entrepreneurship']
  },
  nursing_bachelor: { 
    score: 25, 
    timeline: '15+ years',
    alternatives: ['Nurse practitioner', 'Healthcare IT', 'Telemedicine']
  },
  law_degree: { 
    score: 60, 
    timeline: '5-10 years',
    alternatives: ['Tech law', 'Compliance', 'Legal tech consulting']
  },
  mba_top20: { 
    score: 70, 
    timeline: '3-5 years',
    alternatives: ['AI strategy', 'Innovation management', 'Venture capital']
  },
};

export function AIRiskIndicator({ inputs }: AIRiskIndicatorProps) {
  const path = educationPaths[inputs.path];
  if (!path) return null;

  const riskData = aiRiskScores[inputs.path] || { 
    score: 50, 
    timeline: '5-10 years',
    alternatives: ['Continuous learning', 'Skill diversification', 'Specialization']
  };

  // Determine risk level and color
  const getRiskLevel = (score: number) => {
    if (score >= 70) return { level: 'EXTREME', color: 'red', bg: 'from-red-50 to-orange-50' };
    if (score >= 50) return { level: 'HIGH', color: 'orange', bg: 'from-orange-50 to-yellow-50' };
    if (score >= 30) return { level: 'MODERATE', color: 'yellow', bg: 'from-yellow-50 to-green-50' };
    return { level: 'LOW', color: 'green', bg: 'from-green-50 to-blue-50' };
  };

  const risk = getRiskLevel(riskData.score);

  return (
    <Card className={`bg-gradient-to-br ${risk.bg} border-2 border-${risk.color}-200`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
          <Bot className="h-5 w-5 text-gray-700" />
          AI Disruption Risk Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Risk Meter */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-700">Automation Risk Score</p>
            <span className={`text-2xl font-bold text-${risk.color}-600`}>
              {riskData.score}/100
            </span>
          </div>
          
          {/* Visual meter */}
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${
                risk.color === 'red' ? 'from-red-500 to-red-600' :
                risk.color === 'orange' ? 'from-orange-500 to-orange-600' :
                risk.color === 'yellow' ? 'from-yellow-500 to-yellow-600' :
                'from-green-500 to-green-600'
              } transition-all duration-500`}
              style={{ width: `${riskData.score}%` }}
            />
          </div>
          
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-500">Safe</span>
            <span className={`text-sm font-bold text-${risk.color}-600`}>
              {risk.level} RISK
            </span>
            <span className="text-xs text-gray-500">At Risk</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <TrendingDown className="h-4 w-4 text-purple-600" />
            <p className="text-sm font-medium text-gray-700">Disruption Timeline</p>
          </div>
          <p className="text-lg font-bold text-purple-600">{riskData.timeline}</p>
          <p className="text-xs text-gray-500 mt-1">
            Expected timeframe for significant AI impact
          </p>
        </div>

        {/* Future-Proof Recommendations */}
        <div className="bg-white rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-4 w-4 text-blue-600" />
            <p className="text-sm font-medium text-gray-700">Future-Proof Skills</p>
          </div>
          <ul className="space-y-1">
            {riskData.alternatives.map((alt, index) => (
              <li key={index} className="flex items-start gap-2">
                <Sparkles className="h-3 w-3 text-blue-500 mt-0.5" />
                <span className="text-xs text-gray-700">{alt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Risk Alert */}
        {riskData.score >= 50 && (
          <div className={`bg-${risk.color}-100 rounded-lg p-3`}>
            <div className="flex items-start gap-2">
              <AlertTriangle className={`h-4 w-4 text-${risk.color}-600 mt-0.5`} />
              <div>
                <p className={`text-sm font-medium text-${risk.color}-900 mb-1`}>
                  ⚠️ High Automation Risk Detected
                </p>
                <p className={`text-xs text-${risk.color}-800`}>
                  {riskData.score >= 70 
                    ? 'This field faces extreme disruption risk. Consider pivoting to AI-complementary skills immediately.'
                    : 'Significant portions of this field may be automated. Focus on skills that AI cannot easily replace.'}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
