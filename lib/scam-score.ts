import type { EducationPath, CalculationResult } from '@/lib/types'

export interface ScamScoreBreakdown {
  totalScore: number
  costScore: number
  roiScore: number
  timeScore: number  
  riskScore: number
  aiRiskScore: number
}

/**
 * Calculate the Scam Score™ (0-100) for an education path
 * Higher scores indicate worse value proposition
 */
export function calculateScamScore(
  path: EducationPath, 
  result: CalculationResult
): ScamScoreBreakdown {
  
  // 1. Cost Score (0-25 points) - Higher cost = higher scam score
  const costScore = Math.min(25, (path.totalCost / 200000) * 25)
  
  // 2. ROI Score (0-25 points) - Lower ROI = higher scam score  
  const roiScore = Math.max(0, 25 - (result.roi / 4))
  
  // 3. Time to Payback Score (0-25 points) - Longer payback = higher scam score
  const timeScore = Math.min(25, (result.breakevenMonths / 120) * 25)
  
  // 4. Risk Score (0-15 points) - Lower employment rate = higher scam score
  const riskScore = Math.max(0, (1 - path.employmentRate) * 15)
  
  // 5. AI Risk Score (0-10 points) - Higher AI risk = higher scam score
  const aiRiskScore = (path.aiRiskScore || 0) / 10
  
  const totalScore = Math.min(100, Math.round(
    costScore + roiScore + timeScore + riskScore + aiRiskScore
  ))
  
  return {
    totalScore,
    costScore: Math.round(costScore),
    roiScore: Math.round(roiScore), 
    timeScore: Math.round(timeScore),
    riskScore: Math.round(riskScore),
    aiRiskScore: Math.round(aiRiskScore)
  }
}

/**
 * Get a viral comparison between two education paths
 */
export function generateViralComparison(
  path1: EducationPath,
  path2: EducationPath,
  result1: CalculationResult,
  result2: CalculationResult
): string {
  const score1 = calculateScamScore(path1, result1)
  const score2 = calculateScamScore(path2, result2)
  
  const winner = score1.totalScore < score2.totalScore ? path1 : path2
  const loser = score1.totalScore >= score2.totalScore ? path1 : path2
  const winningScore = Math.min(score1.totalScore, score2.totalScore)
  const losingScore = Math.max(score1.totalScore, score2.totalScore)
  
  const scoreDiff = losingScore - winningScore
  
  if (scoreDiff > 40) {
    return `🚨 SHOCKING: ${winner.name} destroys ${loser.name} (${winningScore} vs ${losingScore} Scam Score)`
  } else if (scoreDiff > 20) {
    return `💰 ${winner.name} beats ${loser.name} by ${scoreDiff} points`
  } else {
    return `⚖️ Close call: ${winner.name} edges out ${loser.name}`
  }
}

/**
 * Generate shocking statistics for viral sharing
 */
export function generateShockingStats(path: EducationPath, result: CalculationResult): string[] {
  const stats: string[] = []
  
  // Debt accumulation
  if (path.totalCost > 100000) {
    stats.push(`💸 Your debt grows by $${Math.round(path.totalCost * 0.07 / 365)} every single day`)
  }
  
  // Opportunity cost
  const opportunityCost = result.opportunityCost
  if (opportunityCost > 50000) {
    stats.push(`⏰ You're giving up $${opportunityCost.toLocaleString()} to sit in classrooms`)
  }
  
  // AI replacement risk
  if (path.aiRiskScore && path.aiRiskScore > 50) {
    stats.push(`🤖 ${path.aiRiskScore}% chance AI makes your degree worthless`)
  }
  
  // Employment reality
  if (path.employmentRate < 0.7) {
    const unemployedPercent = Math.round((1 - path.employmentRate) * 100)
    stats.push(`📊 ${unemployedPercent}% of graduates can't find relevant work`)
  }
  
  // Breakeven shock
  if (result.breakevenMonths > 60) {
    const years = Math.round(result.breakevenMonths / 12)
    stats.push(`📈 Takes ${years} years just to break even - not profit!`)
  }
  
  return stats
}
