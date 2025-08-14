# PathwiseROI MVP - Complete Build Instructions for v0

## Project Overview
Build a complete, production-ready MVP for PathwiseROI - an education ROI calculator that helps users determine how long it takes to pay back their education investment.

## Tech Stack Requirements
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Analytics**: Vercel Analytics
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Files to Include in Your Build

### 1. Core Documentation Files (Use these as your blueprint)
- `pathwise-roi-masterplan-FINAL.md` - Complete project specification
- `app-flow-and-pages.md` - Detailed page-by-page requirements
- `implementation-plan.md` - Technical implementation details
- `design-guidelines.md` - UI/UX specifications
- `data-structure-consolidated.json` - All calculator data and formulas

### 2. Technical Requirements (Must implement all items)
- `TECHNICAL-REVIEW-AND-ACTION-PLAN.md` - Required improvements and fixes
- `VALIDATED-TECHNICAL-REVIEW.md` - Checklist of features to implement

### 3. Project Configuration
- `package.json` - Dependencies and scripts
- `.env.example` - Environment variables template
- `QUICKSTART.md` - Setup and deployment instructions

## Required Pages to Build

### 1. Landing Page (`/`)
- Hero section with value proposition
- Three-step process explanation
- Social proof section
- Clear CTA to calculator

### 2. Calculator Page (`/calculate`)
- Multi-input form with validation
- Real-time calculation results
- Doubt Score visualization
- Timeline visualization
- Share functionality (native + clipboard fallback)
- Premium upsell button
- Compare paths CTA

### 3. Compare Paths Page (`/compare`)
- Side-by-side path comparison
- Visual comparison charts
- Key metrics comparison
- Individual path details

### 4. Premium Page (`/premium`)
- Coming soon/waitlist page
- Feature showcase
- Email capture form
- Pricing information

### 5. About Page (`/about`)
- Mission and story
- Team information (if applicable)
- Contact information

## Critical Implementation Details

### Calculator Logic
```typescript
// Must implement these exact formulas from data-structure-consolidated.json
- Total cost calculation with location multipliers
- Monthly loan payments
- Interest calculations
- Breakeven month calculation
- Doubt Score algorithm
```

### State Management
- URL persistence for calculator inputs
- Proper form validation
- Error handling throughout

### Analytics Events to Track
```typescript
- calculator_started
- path_selected
- location_selected
- aid_entered
- calculation_completed
- calculation_error
- share_initiated
- share_completed
- premium_interest
- comparison_started
```

### Share Functionality
```typescript
// Implement both native share API and clipboard fallback
if (navigator.share) {
  // Use native share
} else {
  // Fallback to clipboard
  navigator.clipboard.writeText(shareText)
}
```

### Mobile Responsiveness
- All pages must be fully responsive
- Touch-friendly interface
- Proper viewport handling

### SEO Optimization
- Proper meta tags on all pages
- OpenGraph tags
- Structured data where appropriate
- Sitemap generation

## Validation Requirements
- Aid amount: 0-100000
- All fields required except aid
- Proper error messages
- Clear visual feedback

## Testing Setup
Include basic Playwright E2E tests for:
- Calculator functionality
- Form validation
- Navigation
- Share functionality

## Folder Structure
```
app/
├── layout.tsx
├── page.tsx
├── globals.css
├── calculate/
│   └── page.tsx
├── compare/
│   └── page.tsx
├── premium/
│   └── page.tsx
└── about/
    └── page.tsx

components/
├── ui/            # shadcn components
├── calculator-page-client.tsx
├── compare-paths.tsx
├── doubt-score.tsx
├── timeline-visualization.tsx
├── loading-skeleton.tsx
└── [other components]

lib/
├── calculator.ts  # ROI calculation logic
├── types.ts       # TypeScript types
├── validation.ts  # Input validation
├── analytics.ts   # Analytics wrapper
└── data.json      # Calculator data

public/
└── [assets]
```

## Deployment Readiness
- Environment variables properly configured
- Build optimization
- Error boundaries
- Loading states
- 404 page
- Proper git ignore

## Quality Checklist
Before pushing to main, ensure:
- [ ] All pages are complete and functional
- [ ] Calculator produces accurate results
- [ ] Share functionality works
- [ ] Mobile responsive on all pages
- [ ] No console errors
- [ ] Forms have proper validation
- [ ] Analytics events are firing
- [ ] URLs persist calculator state
- [ ] All links work correctly
- [ ] Premium waitlist form captures emails

## Git Instructions
```bash
# After building the complete app
git add .
git commit -m "feat: Complete PathwiseROI MVP implementation"
git push origin main
```

## Notes for v0
- Focus on building a complete, working MVP that can be deployed immediately
- Prioritize functionality over perfection - we'll refine after review
- Ensure all core features work end-to-end
- Include helpful comments in complex logic sections
- Use the exact data structure from data-structure-consolidated.json
- Follow the design guidelines for consistent UI

## Success Criteria
The app should:
1. Calculate education ROI accurately
2. Allow users to compare different education paths
3. Share results easily
4. Capture premium interest with waitlist
5. Work flawlessly on mobile and desktop
6. Be ready for immediate deployment to Vercel

---

**Important**: Build fresh from scratch incorporating all the improvements and best practices outlined in the technical review documents. The goal is a production-ready MVP that users can start using immediately.
