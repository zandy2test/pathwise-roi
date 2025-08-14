# Technical Implementation Guide - The College Scam Calculator

## Architecture Overview

### Component Hierarchy
```
app/
├── page.tsx (Landing Page - Viral messaging)
├── calculate/page.tsx (Calculator with live Scam Score preview)
├── results/page.tsx (Results with social sharing)
└── layout.tsx (Global layout wrapper)

components/
├── scam-score-meter.tsx (NEW - Viral score display)
├── share-result-card.tsx (NEW - Social media card generator)
├── share-card.tsx (Existing - Basic share component)
└── ui/ (Reusable UI components)

lib/
├── scam-score.ts (NEW - Scoring algorithm)
├── calculator.ts (MODIFIED - Fixed ROI calculations)
├── types.ts (MODIFIED - Updated interfaces)
└── data.json (MODIFIED - Added AI risk & brutal truths)
```

## New Components Deep Dive

### 1. ScamScoreMeter Component (`components/scam-score-meter.tsx`)

**Purpose**: Display the Scam Score™ with maximum visual impact

**Key Features**:
- Animated score counter
- Color-coded verdict system
- AI risk warnings
- Brutal truth display

**Implementation Details**:
```typescript
interface ScamScoreMeterProps {
  score: number
  pathName: string
  aiRiskScore?: number
  brutalTruth?: string
}

// Verdict thresholds
score >= 70: "Total Scam" (red)
score >= 50: "Questionable Choice" (orange)
score >= 30: "Proceed with Caution" (yellow)
score < 30: "Smart Investment" (green)
```

**Animations**:
- Score counts up from 0 using framer-motion
- Pulsing effect for high-risk scores
- Shake animation for "Total Scam" verdict

### 2. ShareResultCard Component (`components/share-result-card.tsx`)

**Purpose**: Generate platform-specific share cards

**Key Features**:
- Three format support (Instagram, Twitter, TikTok)
- HTML to image conversion
- Downloadable PNG generation
- Copy-to-clipboard functionality

**Technical Implementation**:
```typescript
interface ShareResultCardProps {
  scamScore: number
  educationPath: string
  totalCost: number
  breakevenYears: number
  aiRisk: number
  roi: number
  format: 'instagram' | 'twitter' | 'tiktok'
  onClose: () => void
}

// Platform dimensions
const dimensions = {
  instagram: { width: 1080, height: 1080 },
  twitter: { width: 1200, height: 675 },
  tiktok: { width: 1080, height: 1920 }
}
```

**Image Generation Process**:
1. Render HTML/CSS card with proper dimensions
2. Use `html-to-image` library to convert to canvas
3. Convert canvas to blob
4. Trigger download with generated filename

## Modified Systems

### Calculator Logic (`lib/calculator.ts`)

**Bug Fixed**: Missing ROI calculation
```typescript
// Before (BUG)
return {
  totalCost,
  breakevenMonths,
  netWorth10Years,
  employmentRate
  // Missing: roi, opportunityCost
}

// After (FIXED)
const roi = ((lifetimeEarnings - totalCost) / totalCost) * 100
const opportunityCost = path.duration * 35000 // Lost wages during education

return {
  totalCost,
  breakevenMonths,
  netWorth10Years,
  employmentRate,
  roi,           // ADDED
  opportunityCost // ADDED
}
```

### Scam Score Algorithm (`lib/scam-score.ts`)

**Scoring Formula**:
```typescript
function calculateScamScore(path: EducationPath, result: CalculationResult) {
  let score = 0
  
  // Cost factor (0-30 points)
  if (result.totalCost > 200000) score += 30
  else if (result.totalCost > 100000) score += 20
  else if (result.totalCost > 50000) score += 10
  
  // ROI factor (0-25 points)
  if (result.roi < 50) score += 25
  else if (result.roi < 100) score += 15
  else if (result.roi < 200) score += 5
  
  // Break-even factor (0-25 points)
  const breakevenYears = result.breakevenMonths / 12
  if (breakevenYears > 10) score += 25
  else if (breakevenYears > 5) score += 15
  else if (breakevenYears > 3) score += 5
  
  // AI risk factor (0-20 points)
  if (path.aiRiskScore) {
    score += Math.round(path.aiRiskScore * 0.2)
  }
  
  return { totalScore: Math.min(100, score) }
}
```

### Data Structure Updates (`lib/data.json`)

**Added Fields to Each Education Path**:
```json
{
  "name": "4-Year Computer Science Degree",
  "duration": 4,
  "aiRiskScore": 73,  // NEW: AI automation risk percentage
  "brutalTruth": "You'll be competing with AI that codes 24/7",  // NEW
  "shockingStats": [  // NEW: Array of reality checks
    "73% of coding tasks will be automated by 2030",
    "Average debt: $37,000",
    "35% can't find relevant work"
  ]
}
```

## State Management

### Calculator Page State
```typescript
const [selectedPath, setSelectedPath] = useState<string>('')
const [liveScamScore, setLiveScamScore] = useState<number>(0)
const [isCalculating, setIsCalculating] = useState(false)

// Live preview updates
useEffect(() => {
  if (selectedPath && location && schoolTier && housingType) {
    const tempResult = calculateROI(inputs)
    const tempScore = calculateScamScore(path, tempResult)
    setLiveScamScore(tempScore.totalScore)
  }
}, [selectedPath, location, schoolTier, housingType])
```

### Results Page State
```typescript
const [showShareModal, setShowShareModal] = useState(false)
const [shareFormat, setShareFormat] = useState<'instagram' | 'twitter' | 'tiktok'>('instagram')
const [isDownloading, setIsDownloading] = useState(false)
```

## Performance Optimizations

### Image Generation
- Lazy load html-to-image library
- Cache generated images in memory
- Debounce format switching
- Use web workers for heavy calculations (future)

### Animation Performance
- Use CSS transforms instead of position changes
- Implement will-change for animated elements
- Reduce motion for accessibility preferences
- Use requestAnimationFrame for smooth counting

## Dependencies Added

### Package.json Updates
```json
{
  "dependencies": {
    "html-to-image": "^1.11.11",  // For share card generation
    "framer-motion": "^11.0.3"     // Already existed, used more extensively
  }
}
```

## Error Handling

### Share Card Generation
```typescript
try {
  const node = document.getElementById('share-card')
  if (!node) throw new Error('Share card element not found')
  
  const blob = await htmlToImage.toBlob(node, {
    width: dimensions[format].width,
    height: dimensions[format].height,
    pixelRatio: 2  // For retina displays
  })
  
  // Download logic
} catch (error) {
  console.error('Failed to generate share card:', error)
  toast.error('Failed to generate image. Please try again.')
}
```

### Calculator Validation
```typescript
// Prevent division by zero
const roi = totalCost > 0 
  ? ((lifetimeEarnings - totalCost) / totalCost) * 100 
  : 0

// Handle negative net worth
const netWorth10Years = Math.max(0, calculatedNetWorth)

// Validate employment rate
const employmentRate = Math.min(1, Math.max(0, path.employmentRate))
```

## Browser Compatibility

### Tested Browsers
- Chrome 120+ ✅
- Firefox 121+ ✅
- Safari 17+ ✅
- Edge 120+ ✅

### Known Issues
- Safari: Share API not fully supported (fallback to download)
- Firefox: Minor rendering differences in gradients
- Mobile: Touch events properly handled for all interactions

## Deployment Considerations

### Build Optimization
```bash
# Production build
npm run build

# Analyze bundle size
npm run analyze

# Key metrics:
- First Contentful Paint: < 1.2s
- Time to Interactive: < 2.5s
- Bundle size: < 250KB gzipped
```

### Environment Variables
No additional environment variables required for viral features.

### Caching Strategy
- Static assets: 1 year cache
- API responses: 5 minute cache
- Share cards: Generated client-side (no caching)

## Security Considerations

### XSS Prevention
- All user inputs sanitized
- Content Security Policy headers configured
- No innerHTML usage with user data

### Data Privacy
- No personal data collected for sharing
- Results stored only in sessionStorage
- Share cards generated client-side

## Testing Strategy

### Unit Tests Needed
```typescript
// Test files to create
- scam-score.test.ts       // Algorithm validation
- share-card.test.tsx      // Component rendering
- calculator-fixes.test.ts // ROI calculation fixes
```

### E2E Test Scenarios
1. Complete flow from landing to share
2. All 22 education paths calculation
3. Share card generation for all formats
4. Download functionality across browsers
5. Mobile responsiveness

## Monitoring & Analytics

### Key Metrics to Track
```javascript
// Google Analytics events
gtag('event', 'scam_score_calculated', {
  score: scamScore,
  path: educationPath,
  cost: totalCost
})

gtag('event', 'share_card_generated', {
  format: shareFormat,
  score: scamScore
})

gtag('event', 'share_card_downloaded', {
  format: shareFormat
})
```

## Rollback Plan

If issues arise in production:
1. Revert to previous git commit
2. Clear CDN cache
3. Restore previous build from backup
4. Monitor error rates for 30 minutes
5. Communicate with users if needed

---

*Technical documentation for The College Scam Calculator v2.0.0*  
*Last updated: August 13, 2025*
