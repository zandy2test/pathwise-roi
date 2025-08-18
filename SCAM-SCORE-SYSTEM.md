# The Scam Score™ System - Technical Documentation

## Overview

The Scam Score™ is a proprietary algorithm that measures how badly a student is being "scammed" by their education choice on a scale of 0-100.

**Score Range**:
- **0-29**: Smart Investment 🎯 (Green)
- **30-49**: Proceed with Caution ⚠️ (Yellow)
- **50-69**: Questionable Choice 🤔 (Orange)
- **70-100**: YOU'RE BEING SCAMMED! 🚨 (Red)

## Algorithm Components

### 1. Cost Factor (0-30 points)

Evaluates the total cost burden of education.

```typescript
function calculateCostFactor(totalCost: number): number {
  if (totalCost > 200000) return 30  // Extreme cost
  if (totalCost > 150000) return 25  // Very high cost
  if (totalCost > 100000) return 20  // High cost
  if (totalCost > 75000) return 15   // Significant cost
  if (totalCost > 50000) return 10   // Moderate cost
  if (totalCost > 25000) return 5    // Low cost
  return 0                           // Minimal cost
}
```

**Rationale**: Higher education costs = higher scam potential

### 2. ROI Factor (0-25 points)

Measures return on investment over 10 years.

```typescript
function calculateROIFactor(roi: number): number {
  if (roi < 0) return 25      // Negative ROI (losing money)
  if (roi < 50) return 20     // Poor ROI
  if (roi < 100) return 15    // Below average ROI
  if (roi < 200) return 10    // Average ROI
  if (roi < 500) return 5     // Good ROI
  return 0                     // Excellent ROI
}
```

**Key Insight**: ROI below 100% means you barely double your investment in 10 years.

### 3. Break-Even Factor (0-25 points)

How long until you start profiting from your education.

```typescript
function calculateBreakEvenFactor(breakevenMonths: number): number {
  const years = breakevenMonths / 12
  if (years > 10) return 25   // Over a decade to break even
  if (years > 7) return 20    // Most of a decade
  if (years > 5) return 15    // Half a decade
  if (years > 3) return 10    // Several years
  if (years > 2) return 5     // Couple years
  return 0                     // Quick payback
}
```

**Reality Check**: If it takes 10+ years to break even, that's a massive opportunity cost.

### 4. AI Risk Factor (0-20 points)

Likelihood of AI/automation replacing this career.

```typescript
function calculateAIRiskFactor(aiRiskScore: number): number {
  // aiRiskScore is 0-100 percentage
  return Math.round(aiRiskScore * 0.2)
}
```

**AI Risk Scores by Field**:
- Software Development: 73% (AI writes code)
- Accounting: 68% (Automated bookkeeping)
- Law (Paralegal): 65% (Document automation)
- Radiology: 62% (AI diagnosis)
- Trade Skills: 15% (Physical work harder to automate)
- Nursing: 12% (Human care required)

### 5. Employment Rate Penalty (0-10 points bonus)

Poor employment rates add to the scam score.

```typescript
function calculateEmploymentPenalty(employmentRate: number): number {
  if (employmentRate < 0.5) return 10  // Less than 50% employed
  if (employmentRate < 0.6) return 7   // Poor employment
  if (employmentRate < 0.7) return 5   // Below average
  if (employmentRate < 0.8) return 3   // Slightly below average
  return 0                              // Good employment
}
```

## Complete Scoring Formula

```typescript
function calculateScamScore(
  path: EducationPath, 
  result: CalculationResult
): ScamScoreResult {
  let score = 0
  
  // 1. Cost Factor (30% of score)
  score += calculateCostFactor(result.totalCost)
  
  // 2. ROI Factor (25% of score)
  score += calculateROIFactor(result.roi)
  
  // 3. Break-Even Factor (25% of score)
  score += calculateBreakEvenFactor(result.breakevenMonths)
  
  // 4. AI Risk Factor (20% of score)
  if (path.aiRiskScore) {
    score += calculateAIRiskFactor(path.aiRiskScore)
  }
  
  // 5. Employment Penalty (10% bonus points)
  score += calculateEmploymentPenalty(result.employmentRate)
  
  // Cap at 100
  const totalScore = Math.min(100, Math.round(score))
  
  return {
    totalScore,
    verdict: getVerdict(totalScore),
    color: getVerdictColor(totalScore),
    breakdown: {
      costFactor: calculateCostFactor(result.totalCost),
      roiFactor: calculateROIFactor(result.roi),
      breakEvenFactor: calculateBreakEvenFactor(result.breakevenMonths),
      aiRiskFactor: path.aiRiskScore ? calculateAIRiskFactor(path.aiRiskScore) : 0,
      employmentPenalty: calculateEmploymentPenalty(result.employmentRate)
    }
  }
}
```

## Verdict Classification

```typescript
function getVerdict(score: number): string {
  if (score >= 70) return "YOU'RE BEING SCAMMED!"
  if (score >= 50) return "Questionable Choice"
  if (score >= 30) return "Proceed with Caution"
  return "Smart Investment"
}

function getVerdictDescription(score: number): string {
  if (score >= 70) {
    return "Run away! This education path is a complete ripoff."
  }
  if (score >= 50) {
    return "Mixed signals - decent potential but significant concerns exist."
  }
  if (score >= 30) {
    return "Some red flags, but could work out with careful planning."
  }
  return "Solid choice - good ROI and career prospects."
}
```

## Brutal Truths Database

Each education path has a custom "brutal truth" message:

### Examples:

**4-Year Computer Science Degree** (Score: 45)
> "You'll be competing with AI that codes 24/7 and doesn't ask for equity"

**Law School** (Score: 78)
> "Only 23% of law grads get jobs that require bar passage. Enjoy your $200k debt!"

**MBA Program** (Score: 65)
> "The average MBA adds $0 in value but costs $170,000. It's a networking fee."

**Trade School - Electrician** (Score: 15)
> "Makes more than most college grads with 90% less debt. The smart money is here."

**Medical School** (Score: 35)
> "Yes it's expensive, but at least robots can't do surgery... yet."

**Liberal Arts Degree** (Score: 85)
> "Statistically equivalent to setting $80,000 on fire, but with more reading"

## Shocking Statistics Generator

Generates personalized reality checks based on the user's inputs:

```typescript
function generateShockingStats(
  path: EducationPath, 
  result: CalculationResult
): string[] {
  const stats = []
  
  // Debt growth calculation
  const dailyDebtGrowth = (result.totalCost * 0.065) / 365
  stats.push(`💸 Your debt grows by $${Math.round(dailyDebtGrowth)} every single day`)
  
  // Opportunity cost
  stats.push(`⏰ You're giving up $${result.opportunityCost.toLocaleString()} to sit in classrooms`)
  
  // AI risk warning
  if (path.aiRiskScore > 50) {
    stats.push(`🤖 ${path.aiRiskScore}% chance AI makes your degree worthless`)
  }
  
  // Employment reality
  const unemploymentRate = Math.round((1 - result.employmentRate) * 100)
  stats.push(`📊 ${unemploymentRate}% of graduates can't find relevant work`)
  
  // Time value
  if (result.breakevenMonths > 60) {
    const years = Math.round(result.breakevenMonths / 12)
    stats.push(`⌛ You won't see profit for ${years} years after graduation`)
  }
  
  return stats
}
```

## Live Preview Calculation

During input, we show a live Scam Score preview:

```typescript
// In calculator page
useEffect(() => {
  if (hasMinimumInputs()) {
    const tempResult = calculateROI(currentInputs)
    const tempScore = calculateScamScore(selectedPath, tempResult)
    setLiveScamScore(tempScore.totalScore)
    setLiveVerdict(tempScore.verdict)
  }
}, [selectedPath, location, schoolTier, housingType])
```

## Score Animations

Different score ranges trigger different visual effects:

- **0-29**: Confetti animation 🎉
- **30-49**: Subtle pulse
- **50-69**: Warning shake
- **70-100**: Red alert flash + skull icon

## Controversy Calibration

The scoring is intentionally calibrated to be controversial:

- **Traditional 4-year degrees**: Usually score 40-70 (controversial)
- **Expensive private schools**: Almost always 70+ (scam territory)
- **Trade schools**: Usually 10-30 (smart investment)
- **Bootcamps**: Usually 20-40 (reasonable)
- **Self-taught**: Always < 20 (best ROI)

This calibration ensures most traditional paths look questionable, driving shares and discussions.

## A/B Testing Variants

We can test different scoring weights:

```typescript
// Variant A: Current (balanced)
const WEIGHTS = {
  cost: 0.30,
  roi: 0.25,
  breakEven: 0.25,
  aiRisk: 0.20
}

// Variant B: Cost-heavy (more shocking)
const WEIGHTS_B = {
  cost: 0.40,
  roi: 0.20,
  breakEven: 0.20,
  aiRisk: 0.20
}

// Variant C: AI-fear focused
const WEIGHTS_C = {
  cost: 0.25,
  roi: 0.20,
  breakEven: 0.20,
  aiRisk: 0.35
}
```

## Validation & Accuracy

While controversial, the scoring is based on real data:

- Cost data: US Department of Education
- Employment rates: Bureau of Labor Statistics
- Salary projections: PayScale, Glassdoor
- AI risk assessments: Oxford University automation studies

The "scam" framing is editorial, but the underlying math is solid.

---

*The Scam Score™ is designed to provoke thought and discussion about education value. Individual results may vary.*
