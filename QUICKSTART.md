# PathwiseROI - Quick Start Guide
*Get running in 15 minutes*

## Prerequisites
- Node.js 18+ installed
- Vercel account created
- Stripe account created

## Setup Steps

### 1. Clone and Install (5 min)
```bash
git clone [repo]
cd pathwise-roi
npm install
```

### 2. Environment Setup (5 min)
```bash
cp .env.example .env.local
# Edit .env.local with your keys:
# - Get Stripe keys from dashboard.stripe.com
# - Create a product in Stripe ($9 one-time)
# - Copy the price ID
```

### 3. Run Locally (2 min)
```bash
npm run dev
# Open http://localhost:3000
```

### 4. Deploy to Vercel (3 min)
```bash
npm i -g vercel
vercel
# Follow prompts, add env vars when asked
```

## Critical First Tasks

### Hour 1: Foundation
- [ ] Set up Next.js project
- [ ] Configure Tailwind CSS
- [ ] Deploy empty site to Vercel
- [ ] Verify domain works

### Hour 2: Data Layer
- [ ] Add data-structure-consolidated.json
- [ ] Create calculation engine
- [ ] Test breakeven calculations

### Hour 3: Basic UI
- [ ] Build calculator form
- [ ] Add results display
- [ ] Implement share functionality

### Hour 4: Payment
- [ ] Set up Stripe Checkout
- [ ] Create success/cancel pages
- [ ] Test payment flow

## Common Issues

**Issue:** Stripe webhook not working locally
**Solution:** Use Stripe CLI for local testing
```bash
stripe listen --forward-to localhost:3000/api/webhook
```

**Issue:** Share cards not generating
**Solution:** Use pre-made templates for MVP, skip Canvas API

**Issue:** Calculations seem wrong
**Solution:** Double-check data-structure-consolidated.json values

## Support
- Vercel Docs: vercel.com/docs
- Stripe Docs: stripe.com/docs
- Next.js Docs: nextjs.org/docs
