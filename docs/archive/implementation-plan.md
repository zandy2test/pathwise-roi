# PathwiseROI - Implementation Plan & Scope (OPTIMIZED)
*MVP Development Strategy for 72-Hour Sprint*

## Project Overview

**Product:** Education ROI Calculator with viral comparison engine  
**Goal:** Build and launch a controversial education payback calculator that achieves 5,000 users and 10 payments in 72 hours  
**Core Value:** Show users when their education investment breaks even with shocking comparisons  

## Development Philosophy

1. **Speed Over Perfection** - Ship with rough edges, iterate based on data
2. **Desktop First** - Optimize for Reddit desktop users, basic mobile only
3. **Critical Analytics Only** - Track 5-7 key events that matter
4. **Viral by Design** - Polish the results, not the journey
5. **Results Over Features** - Beautiful visualizations > feature completeness

---

## Phase 1: Foundation (4 Hours)
*Saturday 9am - 1pm*

### Step 1.1: Environment & Deployment Setup (45 min)
- Initialize Next.js 14 with App Router
- Configure Tailwind CSS (minimal custom theme)
- Deploy to Vercel immediately (test pipeline)
- Initialize Git repository
- Configure environment variables for Stripe
- Set up domain and SSL

### Step 1.2: Data Architecture (45 min)
- Create single JSON data file with:
  - Salary progression data (20 path combinations)
  - Cost data (tuition, living expenses by tier)
  - Simple risk text (no complex doubt scores)
  - Location multipliers for 10 major metros
- Create type definitions for TypeScript

### Step 1.3: Core Calculation Engine (1 hour)
- Build ROI calculation logic
- Implement breakeven month calculator
- Create basic cash flow projection
- Add "Got Aid?" override logic
- Build URL parameter handling

### Step 1.4: Critical Analytics Only (30 min)
- Configure Vercel Analytics (built-in)
- Set up 5 key event trackers:
  1. `calculator_started`
  2. `calculation_completed`
  3. `paywall_viewed`
  4. `payment_initiated`
  5. `result_shared`
- Basic error logging to console

**Deliverables:** Working calculation engine deployed to Vercel

---

## Phase 2: Core Features & Polished Results (5 Hours)
*Saturday 1pm - 6pm*

### Step 2.1: Main Calculator Interface (1 hour)
- Build 5-field input form (simple, clean)
- Implement dynamic field updates
- Add basic validation
- Desktop-optimized layout
- Simple loading state (no complex animations)

### Step 2.2: Polished Results Display (1.5 hours) 🎯
- Create animated breakeven counter (counts up to number)
- Simple risk warning text (no complex Doubt Score)
- Implement beautiful timeline visualization:
  - Smooth debt-to-profit animation
  - Color gradients (red→green)
  - Hover tooltips with values
- Results container optimized for screenshots

### Step 2.3: Canvas Share Card Generation (1.5 hours) 🎯
- Build Canvas API share card generator
- Design eye-catching share templates
- Include shocking comparison text
- Add PathwiseROI branding
- Optimize for Twitter/Facebook previews
- Test across social platforms

### Step 2.4: Share System & URLs (1 hour)
- Create shareable URLs with parameters
- Implement social meta tags
- Build copy-to-clipboard functionality
- Add share tracking
- Create 3-5 pre-made viral examples

**Deliverables:** Calculator with polished, shareable results

---

## Phase 3: Monetization & Premium Features (3 Hours)
*Sunday 9am - 12pm*

### Step 3.1: Paywall Implementation (45 min)
- Create simple paywall modal
- Build teaser with blur effect
- Show locked premium features
- Add conversion tracking

### Step 3.2: Simplified Premium Features (1 hour)
- 10-year projection chart (static image)
- Basic cash flow table
- Simple "What could go wrong" list
- ONE alternative path suggestion
- No PDF generation
- No email sending

### Step 3.3: Stripe Payment Integration (1 hour 15 min)
- Set up Stripe Payment Links
- Test payment flow thoroughly
- Create success redirect page
- Implement payment verification
- Add basic receipt display
- Test with real card

**Deliverables:** Working payment system with core premium features

---

## Phase 4: Content, Testing & Launch Prep (4 Hours)
*Sunday 1pm - 5pm*

### Step 4.1: Pre-Written Content Setup (45 min)
- Add all pre-written UI copy
- Insert controversial headlines
- Add disclaimers ("estimates only")
- Create 5 viral example comparisons
- Set up meta descriptions

### Step 4.2: Basic Mobile Responsive (30 min)
- Ensure calculator is usable on mobile
- Fix major breaking points only
- Test share functionality on mobile
- Skip perfect mobile UX

### Step 4.3: Critical Testing (1.5 hours)
- Test full user flow 5 times
- Test payment with real card
- Test share card generation
- Verify analytics tracking
- Test on Chrome, Safari, Firefox
- Load test with 100 concurrent users

### Step 4.4: Launch Preparation (1 hour)
- Prepare Reddit posts (3 versions)
- Set up monitoring dashboard
- Create quick fix checklist
- Stage social media content
- Final deployment to production

**Deliverables:** Tested, production-ready MVP

---

## Phase 5: Launch Operations (4 Hours)
*Monday 10am - 2pm*

### Step 5.1: Pre-Launch (2 hours)
- Final production deployment
- Verify all analytics tracking
- Test with beta users
- Create monitoring dashboard
- Stage Reddit posts

### Step 5.2: Launch Execution (2 hours)
- Deploy to production
- Post to r/college at 2pm EST
- Monitor real-time metrics
- Respond to early feedback
- Fix critical issues

**Deliverables:** Live application with initial traffic

---

## Technical Specifications (Optimized)

### Frontend Stack
```javascript
{
  framework: "Next.js 14 (App Router)",
  styling: "Tailwind CSS 3.4 (minimal custom)",
  state: "React hooks + URL params",
  charts: "Recharts (timeline only)",
  animations: "CSS transitions for results only",
  fonts: "Inter only (skip custom fonts)",
  shareCards: "HTML Canvas API"
}
```

### Backend Services
```javascript
{
  hosting: "Vercel (auto-scaling)",
  analytics: "Vercel Analytics only",
  payments: "Stripe Payment Links",
  monitoring: "Vercel Dashboard",
  database: "None (JSON only)",
  cdn: "Vercel Edge Network"
}
```

### Data Structure (Simplified)
```javascript
// Single data.json file with 20 combinations
const EDUCATION_DATA = {
  paths: {
    'college_tech': { 
      cost: 120000, 
      salary: { y1: 75000, y5: 120000, y10: 150000 },
      risk: "35% don't get tech jobs"
    },
    'trades_welding': {
      cost: 5000,
      salary: { y1: 55000, y5: 75000, y10: 90000 },
      risk: "Physical demands increase with age"
    }
    // ... 18 more combinations
  }
}
```

---

## Risk Mitigation Strategies

### Technical Risks

| Risk | Mitigation | Fallback |
|------|------------|----------|
| Site crashes under load | Vercel auto-scaling | Static fallback page |
| Payment processing fails | Test thoroughly | Gumroad backup |
| Share generation breaks | Canvas API fallback | Text-only sharing |
| Mobile completely broken | Desktop-only message | Quick fixes post-launch |
| Calculations questioned | Clear "estimates" label | Methodology page ready |

### Development Priorities (Revised)

**Must Have (MVP)**
- ✅ Working calculator with 5 inputs
- ✅ Beautiful timeline visualization
- ✅ Canvas share cards
- ✅ Stripe payment integration
- ✅ 5 critical analytics events
- ✅ Basic mobile responsive

**Cut from MVP**
- ❌ PDF generation
- ❌ Email results
- ❌ Complex animations
- ❌ Perfect mobile UX
- ❌ Detailed methodology
- ❌ User accounts
- ❌ Multiple alternative paths

**Add Post-Launch (If Successful)**
- Email capture
- More path combinations
- PDF reports
- B2B features

---

## Code Quality Standards

### MVP Standards (Weekend)
- Functional over perfect
- No unit tests (manual testing only)
- Basic error handling
- Console logging for debugging
- Comments only where critical

### Post-Launch Standards (Week 2+)
- Add comprehensive testing
- Implement error boundaries
- Add performance monitoring
- Document all functions
- Set up CI/CD properly

---

## Monitoring & Success Metrics

### Simplified Analytics (5 Key Events)

```javascript
// Track only what matters for validation
const CRITICAL_EVENTS = {
  'calculator_started': {
    props: ['source', 'device']
  },
  'calculation_completed': {
    props: ['path', 'breakeven_months']
  },
  'paywall_viewed': {
    props: ['breakeven_months']
  },
  'payment_initiated': {
    props: ['price']
  },
  'result_shared': {
    props: ['platform', 'breakeven_months']
  }
}
```

### Success Metrics (72 Hours)
- **Primary:** Share rate > 15%
- **Secondary:** Payment conversion > 2%
- **Tertiary:** 5,000+ users

### Monitoring Dashboard (Simple)
- Vercel Analytics real-time view
- Stripe payment notifications
- Share counter (localStorage)
- Error log (console only)

---

## Post-Launch Iteration Plan

### Hour 1-3 After Launch
- Monitor Reddit engagement
- Fix critical bugs only
- Respond to comments
- Track share rate

### Day 2-3
- A/B test headlines
- Optimize mobile experience
- Add requested career paths
- Test price points

### Week 2 (If Successful)
- Add email capture
- Build user accounts
- Create affiliate program
- Develop B2B features

---

## Decision Gates

### 24 Hours Post-Launch
- **< 500 users:** Change Reddit strategy
- **500-2000 users:** Optimize conversion
- **> 2000 users:** Scale marketing

### 72 Hours Post-Launch
- **< 1000 users:** Pivot or kill
- **1000-5000 users:** Iterate and test
- **> 5000 users:** Scale aggressively

---

## Development Best Practices

1. **Commit frequently** - Every feature completion
2. **Deploy continuously** - Use Vercel preview deploys
3. **Track everything** - Analytics on every interaction
4. **Fail fast** - 15-minute rule on problems
5. **Document gotchas** - Keep a PROBLEMS.md file

---

## Success Definition

**Technical Success:**
- Site stays up under viral load
- < 3 second load time
- < 1% error rate
- 95% payment success rate

**Business Success:**
- 5,000+ users in 72 hours
- 15%+ share rate
- 10+ payments
- Clear product-market fit signal

---

*This plan prioritizes speed and viral mechanics over code perfection. The goal is validation, not production-grade software. Ship it, measure it, iterate it.*
