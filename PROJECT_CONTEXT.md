# 🎯 PathwiseROI - Project Context & Current State

## Single Source of Truth for AI Assistants & Developers

**Last Updated:** August 15, 2025, 6:15 PM Brisbane Time

---

## 🚀 CURRENT PRODUCTION STATE

### Live URL: https://pathwise-roi.vercel.app/

### Current Design Implementation

- **Theme:** LIGHT/WHITE theme with professional appearance
- **Branding:** "Scam Score™" terminology used throughout
- **Color Scheme:** White backgrounds, blue/cyan accents, colored alerts
- **Typography:** Clean, professional hierarchy
- **Messaging:** Data-driven ROI calculator with edgy "scam detection" angle

### What's Actually Deployed

- **Landing Page:** Light gradient background with Scam Score™ branding
- **Calculator Page:** White/gray backgrounds with blue accents
- **Results Page:** Light theme with colored alert boxes
- **Navigation:** White navbar with backdrop blur
- **Statistics:** Shows $1.7T debt, 73% negative ROI, 42% underemployed

### Key Features Live Now

1. **Scam Score™ Algorithm** - Calculates education ROI
2. **Path Comparison Tool** - Compare two education paths
3. **Breakeven Analysis** - Shows when investment pays off
4. **Share Functionality** - Web share API integration
5. **Premium Modal** - Lead generation (no payment integration yet)
6. **Analytics** - Partial Vercel Analytics implementation

---

## 📁 PROJECT STRUCTURE

```
PathwiseROI/
├── app/
│   ├── page.tsx                 # ✅ ACTIVE - Light theme homepage
│   ├── page-redesign.tsx        # ⚠️ UNUSED - Dark theme prototype
│   ├── calculate/page.tsx       # ✅ ACTIVE - Calculator page
│   ├── results/page.tsx         # ✅ ACTIVE - Results display
│   └── globals.css              # Global styles
│
├── components/
│   ├── magic/                   # Magic UI components (active)
│   │   ├── animated-gradient-text.tsx
│   │   ├── shimmer-button.tsx
│   │   └── number-ticker.tsx
│   │
│   ├── premium/                 # Premium components (created but NOT deployed)
│   │   ├── aurora-background.tsx
│   │   ├── floating-navbar.tsx
│   │   └── [other dark theme components]
│   │
│   └── ui/                      # Core UI components
│       ├── button.tsx
│       ├── card.tsx
│       └── [other shadcn components]
│
├── lib/
│   ├── calculator.ts            # ROI calculation logic
│   ├── analytics.ts             # Analytics implementation
│   └── data.ts                  # Education paths data
│
└── __tests__/                   # Test suite (76 tests passing)
```

---

## 🎨 DESIGN DECISIONS

### Why Light Theme?

- Professional, trustworthy appearance
- Better readability for financial data
- Appeals to broader audience
- Maintains edgy messaging without aggressive visuals

### Dark Theme Status

- Exists in `app/page-redesign.tsx`
- Fully functional but NOT deployed
- Could be used for A/B testing
- Premium glass morphism effects included

### Branding Strategy

- "Scam Score™" - Memorable, shareable concept
- Data-driven messaging
- Warning badges for urgency
- Professional yet provocative

---

## 📊 TECHNICAL STATUS

### Build & Performance

- **Build Status:** ✅ Successful
- **Bundle Size:** 274 KB (acceptable)
- **TypeScript Errors:** 0
- **ESLint Warnings:** Minor (unused imports)
- **Test Suite:** 76/76 passing
- **Lighthouse Score:** 92+

### Dependencies

- **Framework:** Next.js 14 (App Router)
- **UI:** shadcn/ui + Tailwind CSS
- **Animations:** Framer Motion
- **Charts:** Recharts
- **Analytics:** Vercel Analytics (partial)

### Known Issues

- Analytics implementation incomplete
- No E2E tests yet
- Premium payment not integrated
- Some accessibility improvements needed

---

## 🎯 IMMEDIATE PRIORITIES

### High Priority

1. **Complete Analytics** - Finish Vercel Analytics setup
2. **E2E Testing** - Add Playwright tests
3. **Performance Monitoring** - Integrate Sentry

### Medium Priority

4. **SEO Improvements** - Structured data, meta tags
5. **Loading States** - Add skeletons
6. **Documentation** - Keep this file updated

### Nice to Have

7. **Payment Integration** - Stripe for premium
8. **PDF Export** - Results download
9. **More Education Paths** - Expand options

---

## 🚫 IMPORTANT NOTES

### DO NOT

- Deploy dark theme without testing
- Remove Scam Score™ branding (it's working)
- Delete page-redesign.tsx (keep for reference)
- Change calculator logic without tests

### Files to Ignore/Archive

- `VISUAL_OVERHAUL_IMPLEMENTATION_REPORT.md` - Outdated, about dark theme
- `VISUAL_OVERHAUL_PLAN.md` - Outdated planning doc
- Anything mentioning "premium dark theme deployment"

---

## 💡 QUICK START FOR NEW DEVELOPERS

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

Visit http://localhost:3000 to see the light theme with Scam Score™ branding.

---

## 📝 COMMIT HISTORY CONTEXT

Recent significant commits:

- Light theme with Scam Score™ branding (current production)
- Magic UI components integration
- Analytics partial setup
- Premium modal for lead generation

---

## 🔮 FUTURE CONSIDERATIONS

1. **A/B Testing** - Light vs Dark theme
2. **Monetization** - Premium features implementation
3. **Mobile App** - React Native version
4. **API** - Public API for education ROI data
5. **Partnerships** - Education platforms integration

---

**Remember:** This file is the source of truth. If other docs conflict, this one is correct.
