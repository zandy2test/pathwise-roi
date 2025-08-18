import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Bot, Shield, TrendingDown, Sparkles } from 'lucide-react';
import { educationPaths } from '@/lib/data';
import type { CalculatorInputs } from '@/lib/types';

interface AIRiskIndicatorProps {
  inputs: CalculatorInputs;
}

export function AIRiskIndicator({ inputs }: AIRiskIndicatorProps) {
  const path = educationPaths[inputs.path];
  if (!path) return null;

  // Use actual data from data.json
  const aiRiskScore = path.aiRiskScore || 50;
  const aiRiskDescription = path.aiRiskDescription || 'AI impact assessment not available';
  const brutalTruth = path.brutalTruth || 'Consider the long-term viability of this field';

  // Determine risk level and color
  const getRiskLevel = (score: number) => {
    if (score >= 70) return { level: 'EXTREME', color: 'red', bg: 'from-red-50 to-orange-50' };
    if (score >= 50) return { level: 'HIGH', color: 'orange', bg: 'from-orange-50 to-yellow-50' };
    if (score >= 30) return { level: 'MODERATE', color: 'yellow', bg: 'from-yellow-50 to-green-50' };
    return { level: 'LOW', color: 'green', bg: 'from-green-50 to-blue-50' };
  };

  const risk = getRiskLevel(aiRiskScore);

  // Timeline based on risk score
  const getTimeline = (score: number) => {
    if (score >= 70) return '2-5 years';
    if (score >= 50) return '5-8 years';
    if (score >= 30) return '8-15 years';
    return '15+ years';
  };

  // Future-proof alternatives based on field
  const getAlternatives = (pathKey: string) => {
    const alternatives: Record<string, string[]> = {
      college_tech: ['AI/ML specialization', 'Cybersecurity expertise', 'System architecture'],
      college_business: ['AI strategy consulting', 'Data-driven decision making', 'Digital transformation'],
      college_liberal_arts: ['Creative direction', 'Content strategy', 'Human-centered design'],
      bootcamp_coding: ['AI prompt engineering', 'DevOps automation', 'Technical leadership'],
      trades_welding: ['Robotic welding operation', 'Quality inspection', 'Underwater welding'],
      trades_plumbing: ['Smart home systems', 'Water system design', 'Green building'],
      nursing_bachelor: ['Nurse practitioner', 'Healthcare technology', 'Patient advocacy'],
      law_degree: ['Tech law', 'AI ethics', 'Regulatory compliance'],
      mba_top20: ['AI strategy', 'Innovation management', 'Venture capital'],
    };
    return alternatives[pathKey] || ['Continuous learning', 'Skill diversification', 'Leadership skills'];
  };

  const timeline = getTimeline(aiRiskScore);
  const alternatives = getAlternatives(inputs.path);

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
              {aiRiskScore}/100
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
              style={{ width: `${aiRiskScore}%` }}
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

        {/* AI Impact Description */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <p className="text-sm font-medium text-gray-700">AI Impact Analysis</p>
          </div>
          <p className="text-xs text-gray-700 leading-relaxed mb-3">
            {aiRiskDescription}
          </p>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs font-medium text-gray-800 mb-1">💀 Brutal Truth:</p>
            <p className="text-xs text-gray-700 italic">"{brutalTruth}"</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <TrendingDown className="h-4 w-4 text-purple-600" />
            <p className="text-sm font-medium text-gray-700">Disruption Timeline</p>
          </div>
          <p className="text-lg font-bold text-purple-600">{timeline}</p>
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
            {alternatives.map((alt: string, index: number) => (
              <li key={index} className="flex items-start gap-2">
                <Sparkles className="h-3 w-3 text-blue-500 mt-0.5" />
                <span className="text-xs text-gray-700">{alt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Risk Alert */}
        {aiRiskScore >= 50 && (
          <div className={`bg-${risk.color}-100 rounded-lg p-3`}>
            <div className="flex items-start gap-2">
              <AlertTriangle className={`h-4 w-4 text-${risk.color}-600 mt-0.5`} />
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">
                  ⚠️ High Automation Risk Detected
                </p>
                <p className="text-xs text-gray-800 leading-relaxed">
                  {aiRiskScore >= 70 
                    ? 'This field faces EXTREME disruption risk. AI is rapidly replacing human workers in these roles. Consider pivoting to AI-complementary skills immediately or risk career obsolescence.'
                    : 'Significant portions of this field may be automated within the next decade. Start developing skills that complement AI rather than compete with it.'}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
