# PathwiseROI Deployment Checklist

**Version:** 1.1.0  
**Last Updated:** January 12, 2025

## Pre-Deployment Checklist

### 1. Code Quality ✅
- [x] All TypeScript errors resolved
- [x] Build passes without warnings
- [x] Code committed to GitHub
- [x] Tagged with version number (v1.1.0)

### 2. Environment Setup
- [ ] Set up production environment variables
  - [ ] GA_MEASUREMENT_ID for analytics
  - [ ] Payment processor API keys (when ready)
- [ ] Configure Vercel project settings
  - [ ] Connect GitHub repository
  - [ ] Set environment variables
  - [ ] Configure custom domain (if applicable)

### 3. Testing
- [ ] Test on production URL after deployment
- [ ] Verify all features work:
  - [ ] Two-tier education selection
  - [ ] Graph visualization with red/green fills
  - [ ] Glossary tooltips
  - [ ] Premium CTAs and modal
  - [ ] Share functionality
  - [ ] Mobile responsiveness

### 4. Analytics Setup
- [ ] Create Google Analytics 4 property
- [ ] Add GA measurement ID to environment variables
- [ ] Verify analytics tracking:
  - [ ] Page views
  - [ ] Calculation completions
  - [ ] Comparison completions
  - [ ] Premium clicks
  - [ ] Share attempts

### 5. Performance Optimization
- [ ] Run Lighthouse audit
- [ ] Verify bundle sizes are acceptable
- [ ] Check Core Web Vitals
- [ ] Test on slow 3G connection

### 6. SEO Configuration
- [ ] Verify meta tags are correct
- [ ] Test Open Graph preview
- [ ] Submit sitemap to Google Search Console
- [ ] Check robots.txt is properly configured

## Deployment Steps

### Deploy to Vercel

1. **Via Vercel Dashboard:**
   ```
   - Go to https://vercel.com/new
   - Import GitHub repository: zandy2test/pathwise-roi
   - Configure project settings
   - Deploy
   ```

2. **Via CLI (Alternative):**
   ```bash
   npm install -g vercel
   vercel
   # Follow prompts to link to project
   ```

### Post-Deployment Tasks

1. **Verify Deployment:**
   - [ ] Access production URL
   - [ ] Test all critical user flows
   - [ ] Check console for errors
   - [ ] Verify analytics are firing

2. **Monitor Performance:**
   - [ ] Set up Vercel Analytics
   - [ ] Configure error tracking (e.g., Sentry)
   - [ ] Set up uptime monitoring

3. **Documentation:**
   - [ ] Update README with production URL
   - [ ] Document any production-specific configurations
   - [ ] Create user guide if needed

## Production Environment Variables

Create these in Vercel dashboard under Settings > Environment Variables:

```env
# Analytics (Required for tracking)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Payment Processing (When ready)
STRIPE_PUBLIC_KEY=pk_live_XXXX
STRIPE_SECRET_KEY=sk_live_XXXX

# Optional
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Quick Deploy Commands

```bash
# Build locally to test
npm run build
npm start

# Deploy to Vercel (if CLI installed)
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs
```

## Rollback Plan

If issues arise after deployment:

1. **Via Vercel Dashboard:**
   - Go to project dashboard
   - Click "View Function Logs" to diagnose issues
   - Use "Instant Rollback" to previous deployment

2. **Via Git:**
   ```bash
   git revert HEAD
   git push origin main
   # Vercel will auto-deploy the revert
   ```

## Support & Monitoring

### Key Metrics to Monitor
- Page load time < 3 seconds
- Calculator completion rate > 50%
- Premium CTA click rate
- Error rate < 1%
- Uptime > 99.9%

### Alert Thresholds
- Set up alerts for:
  - Error rate > 5%
  - Response time > 5 seconds
  - Failed deployments
  - Low conversion rates

## Notes

- **Current Status:** Ready for deployment
- **Known Issues:** Payment integration not yet implemented (shows alert instead)
- **Next Release:** Plan for v1.2.0 with comparison cart feature

---

**Deployment Contact:** [Your contact info]  
**Last Successful Deploy:** Pending  
**Production URL:** TBD
