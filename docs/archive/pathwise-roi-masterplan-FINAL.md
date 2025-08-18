# PathwiseROI - MVP Master Plan (Final)
*The 72-Hour Validation Sprint*

## Executive Summary
**Mission:** Build and launch a viral education ROI calculator in one weekend to validate demand  
**Hook:** "Welders make more than lawyers until age 35"  
**Goal:** 5,000 users and 10 payments in 72 hours or kill it

---

## Core Hypothesis
**"People will use and share a tool that shows education payback time with controversial comparisons"**

---

## The MVP Product (Weekend Build)

### What We're Building
A single-page calculator that answers: **"When will you break even?"**

### Core Features (Free)
1. **5 Input Fields:**
   - Path (College/Community/Trade/Bootcamp/Work)
   - Field (Tech/Healthcare/Trades/Business/Liberal Arts)
   - Location (10 major metros)
   - School tier (Premium/Standard/Budget)
   - Living situation (Home/Campus/Off-campus)
   - **"Got aid?" amount** (optional specificity)

2. **Free Output:**
   - Breakeven months (big number)
   - Basic timeline visualization
   - Doubt Score™ with one-liner
   - Shareable card
   - Named comparison URL

3. **Paywall Teaser ($9):**
   - "See All Details" unlocks:
   - 10-year earnings projection
   - Month-by-month cash flow
   - Risk factor breakdown
   - Top 3 alternative paths
   - Downloadable PDF report
   - "What could go wrong" section

### 5 Must-Have Features

| Feature | Time | Purpose | Implementation |
|---------|------|---------|----------------|
| **Analytics Tracking** | 1hr | Learn everything | Track every click, calculation, share |
| **Doubt Score™** | 2hr | Build trust via honesty | "⚠️ Risk: 7/10 - 35% don't finish" |
| **"Got Aid?" Input** | 30min | Personalization | Override generic tier with specific number |
| **Path Visualization** | 4hr | Viral screenshots | Timeline showing debt→breakeven→profit |
| **Named Comparisons** | 1hr | Viral URLs | "Jake's UCLA vs Welding comparison" |

### What We're NOT Building (MVP)
- ❌ User accounts
- ❌ School letter analyzer  
- ❌ Leaderboard
- ❌ Email capture
- ❌ Multiple languages
- ❌ Perfect mobile experience
- ❌ Detailed methodology

---

## Technical Stack (Fast & Free)

```javascript
// Complete tech stack
Frontend:
- Next.js 14 (App Router)
- Tailwind CSS
- Vercel (free hosting)
- React-to-PDF

Backend:
- Supabase (free tier - analytics only)
- Stripe Payment Links (no backend needed)

Analytics:
- Mixpanel free tier
- Vercel Analytics
- Custom Supabase events
```

### Data Structure (Hardcoded)
```javascript
// All data in JSON - no database needed for MVP
const SALARY_DATA = {
  'college': {
    'tech': { start: 75000, year5: 120000, year10: 150000 },
    'healthcare': { start: 60000, year5: 80000, year10: 95000 }
  },
  'trades': {
    'welding': { start: 55000, year5: 75000, year10: 90000 },
    'plumbing': { start: 50000, year5: 70000, year10: 85000 }
  }
  // ... ~50 total combinations
}

const DOUBT_SCORES = {
  'college_liberal_arts': { 
    score: 8, 
    text: "42% underemployed year 1" 
  },
  'bootcamp_coding': { 
    score: 7, 
    text: "35% don't complete program" 
  },
  'trades_welding': { 
    score: 3, 
    text: "96% job placement rate" 
  }
}
```

---

## The Copy Strategy

### Homepage (Above Fold)
```
Welders make more than lawyers until age 35.
Nurses beat MBAs by year 7.
Your assumptions about education are probably wrong.

[FIND YOUR PAYBACK TIME]

↓ 50,000 paths analyzed. Most people are shocked.
```

### The Paywall Copy
```
You see: 47 months to breakeven

Want to see:
📊 Your 10-year wealth projection
💰 Month-by-month cash flow timeline
⚠️ What could go wrong (hidden risks)
🎯 3 better alternatives to consider
📄 Professional PDF report

[UNLOCK FULL ANALYSIS - $9]
One-time payment. No subscription.
```

### Share Card Examples
1. "Welding in Texas: Profitable in 6 months vs MBA: 67 months"
2. "Plot twist: Plumbers earn more than lawyers until age 35"
3. "Community college → Transfer: Same outcome, $60K less debt"
4. "Nursing beats Computer Science in total 10-year earnings"

---

## Weekend Sprint Schedule

### Saturday: Core Build (8 hours)

**Morning (4 hours):**
```
9am:  Setup Next.js, Vercel, Tailwind
10am: Build calculator logic + data arrays  
11am: Implement analytics tracking
12pm: Create basic UI layout
```

**Afternoon (4 hours):**
```
1pm: Build Path Visualization component
2pm: Add Doubt Score displays
3pm: Implement "Got aid?" input
4pm: Create share card generator
```

### Sunday: Polish & Launch Prep (7 hours)

**Morning (4 hours):**
```
9am:  Build "See All Details" paywall
10am: Create named comparison URLs
11am: Stripe payment integration
12pm: Write "How we calculate" page
```

**Afternoon (3 hours):**
```
1pm: Mobile responsive fixes
2pm: Create 10 example comparisons
3pm: Test everything, fix critical bugs
4pm: Prep launch content
```

### Monday: Launch Day

**Morning Prep:**
```
10am: Final testing
11am: Set up monitoring dashboards
12pm: Stage Reddit posts
1pm:  Last minute fixes
```

**Launch:**
```
2pm EST: Post to r/college
Monitor for 1 hour, respond to comments
If gaining traction, proceed with plan
If dead, try different angle/subreddit immediately
```

---

## Launch Strategy

### Reddit Sequence
```
Day 1 (Mon 2pm): r/college - "I analyzed 50,000 career paths..."
Day 2 (Tue 10am): r/careerguidance - "Tool that shows when careers pay off"
Day 3 (Wed 8pm): r/cscareerquestions - "CS degree vs bootcamp payback times"

Backup subreddits:
- r/findapath
- r/studentloans  
- r/personalfinance
- r/antiwork (risky but viral)
```

### The Launch Post Template
```
I analyzed 50,000 career paths to find education payback times.

Shocking findings:
- Welding cert in Texas: profitable in 6 months
- CS degree at state school: 31 months  
- MBA from top-20: 67 months
- Law degree average: 89 months

Built a tool so you can check any path: [link]

The "doubt scores" are especially eye-opening.

Edit: For those asking, yes it accounts for lost wages
Edit 2: Added healthcare paths - nursing is wildly underrated
Edit 3: RIP inbox, adding more paths based on your requests
```

---

## Success Metrics & Decision Gates

### First 72 Hours - Traffic Metrics

| Outcome | Visitors | Share Rate | Payments | Action |
|---------|----------|------------|----------|--------|
| **🟢 Success** | >5,000 | >15% | >10 | Scale hard |
| **🟡 Iterate** | 1,000-5,000 | 5-15% | 3-10 | Test new angles |
| **🔴 Pivot** | <1,000 | <5% | 0-2 | Kill or hard pivot |

### What We're Tracking
```javascript
// Every single action
- Page load
- Each field changed
- Calculate clicked
- Results viewed
- Share clicked
- Share completed
- Paywall viewed
- Payment attempted
- Payment completed
- Time on each step
```

### Pivot Decision Tree
```
If after 72 hours:
├── Success metrics hit → Double down on consumer
├── Medium traction + "can schools use this?" → Pivot to B2B
├── No traction + no engagement → Kill it
└── High traffic + zero payments → Try $4.99 price
```

---

## Risk Mitigation

### What Could Go Wrong

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Reddit post dies | High | Have 10 backup posts ready |
| Math questioned | Certain | Add "estimates only" everywhere |
| Payment processor issues | Medium | Have backup Gumroad ready |
| Site crashes | Low | Vercel scales automatically |
| Legal concerns | Low | Clear disclaimers, no specific schools named |

### The Messaging Rules
**Never Say:**
- College is a scam
- Don't go to college
- Specific school names
- Guarantees about income

**Always Say:**
- "Estimated based on averages"
- "One factor to consider"
- "Your results may vary"
- "Not financial advice"

---

## Post-Launch Playbook

### If Successful (>5K users, >10 payments):
**Week 2:**
- Raise price to $19
- Add email capture
- Create "Parent Mode" toggle
- Launch TikTok creator campaign

**Week 3:**
- Build B2B sales page
- Add more sophisticated calculations
- Create API for embed partners
- Hire VA for social media

**Week 4:**
- Reach out to education reporters
- Launch affiliate program
- Test paid ads with proven creative
- Start B2B pilot program

### If Medium Success (1-5K users):
**Immediate:**
- A/B test new headlines
- Try controversy angle harder
- Add "Beat Your Friends" mechanic
- Lower price to $4.99

### If Failure (<1K users):
**Options:**
1. Pivot to pure B2B play for schools
2. Relaunch as "AI Career Advisor"
3. Kill it and move to next idea
4. Open source it and move on

---

## The Economics Reality Check

### Current Unit Economics
- **Customer Lifetime Value:** $9 (one-time)
- **Customer Acquisition Cost:** $0 (organic only)
- **Profit per customer:** ~$8.50 (after Stripe fees)

### Must Hit ONE of These in 30 Days:
1. **Viral coefficient >0.15** (every user brings 0.15 new users)
2. **Conversion rate >2%** (2% of visitors pay)
3. **B2B pipeline >$50K** (schools wanting to buy)

### If None Hit by Day 30:
**Hard pivot to B2B-only model:**
- $99/month for counselors
- $7,500/year for schools
- $25,000/year for districts
- Abandon consumer entirely

---

## Pre-Launch Checklist

### Technical (Saturday)
- [ ] Analytics on every click
- [ ] Stripe payment link tested
- [ ] Mobile works on real phones
- [ ] Share preview image set
- [ ] Error tracking enabled

### Content (Sunday)  
- [ ] 10 example comparisons ready
- [ ] "How we calculate" page
- [ ] Disclaimer text on all pages
- [ ] 3 Reddit posts written
- [ ] Twitter thread drafted

### Launch Prep (Monday AM)
- [ ] Monitoring dashboard open
- [ ] Reddit accounts ready
- [ ] Backup subreddits listed
- [ ] DMs to influencers drafted
- [ ] Support email visible

---

## The Final Philosophy

### What This Really Is
A **72-hour experiment** to validate if people care about education ROI comparisons enough to:
1. Use a calculator
2. Share their results  
3. Pay for details

### What Success Looks Like
- **Best case:** Viral spread, clear product-market fit, scale consumer
- **Good case:** Moderate traction, pivot to B2B, sustainable business
- **Learning case:** Fast failure, clear lessons, next idea

### The Mindset
- **Ship beats perfect** - Launch with rough edges
- **Controversy beats safe** - Make people argue
- **Speed beats strategy** - Move fast, adjust later
- **Data beats opinions** - Let metrics decide

---

## The One Metric That Matters

**Share Rate**

If >15% of users share their results, you have product-market fit.  
If <5% share, no amount of optimization will save this.

Everything else is secondary to: **"Do people share this?"**

---

## Go/No-Go Decision

**Monday 2pm EST:** First post goes live

**Thursday 2pm EST:** Make the call:
- Scale it
- Pivot it  
- Kill it

No emotions. No extensions. Binary decision.

---

*Ready to build. Ready to launch. Ready to learn.*

**The market will tell you everything you need to know in 72 hours.**

Ship it. 🚀