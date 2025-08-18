# 🚀 Vercel MCP Server & Analytics Setup Guide

## ✅ What's Been Configured

### 1. Vercel Analytics (Already Live)

- **Package**: `@vercel/analytics` v1.5.0 installed
- **Integration**: Already added to `app/layout.tsx`
- **Status**: ACTIVE - Collecting data automatically
- **Dashboard**: https://vercel.com/your-team/pathwise-roi/analytics

### 2. Google Analytics 4 (Already Live)

- **Tracking ID**: G-NSSK9CWEXN
- **Integration**: Script tags in `app/layout.tsx`
- **Status**: ACTIVE - Should be collecting data
- **Dashboard**: https://analytics.google.com

### 3. Vercel MCP Server (Just Added)

- **Name**: `vercel-collegescam`
- **URL**: https://mcp.vercel.com
- **Status**: CONFIGURED - Needs authentication on first use
- **Location**: Added to your Cline MCP settings

## 🔐 Manual Steps Required

### Authenticate Vercel MCP (One-Time Setup)

**When**: The first time you use a Vercel MCP tool in Cline

1. Type `/mcp` in Cline
2. You'll see "vercel-collegescam" in the list
3. Click to authenticate when prompted
4. Complete OAuth flow in browser
5. Return to Cline - you're connected!

## 📊 How to Check Analytics

### Vercel Analytics Dashboard

1. Go to: https://vercel.com/dashboard
2. Select your project (pathwise-roi)
3. Click "Analytics" tab
4. View:
   - Page views
   - Unique visitors
   - Top pages
   - Web Vitals (loading speed)
   - Geographic distribution

### Google Analytics Dashboard

1. Go to: https://analytics.google.com
2. Select your property (CollegeScam.io)
3. Check:
   - Real-time users
   - User acquisition sources
   - Events (email captures, button clicks)
   - Conversion funnels
   - User behavior flow

## 🛠️ Using Vercel MCP Tools in Cline

### Available Commands

Once authenticated, you can ask Cline to:

#### Project Management

- "Check the latest deployment status"
- "Show me recent deployment logs"
- "List all deployments for this project"
- "Get build logs for the last failed deployment"

#### Debugging

- "Check the API logs for /api/waitlist endpoint"
- "Show me any errors in the last deployment"
- "Get function logs for email capture"
- "Check if there are any 500 errors"

#### Performance

- "What's the build time for recent deployments?"
- "Show me the bundle size trends"
- "Check function execution times"

### Example Vercel MCP Usage

```
You: "Check the logs for the waitlist API endpoint"
Cline: [Uses Vercel MCP to fetch logs]

You: "Show me any errors from email captures today"
Cline: [Queries deployment logs for errors]

You: "What's the status of the latest deployment?"
Cline: [Gets deployment info and status]
```

## 📈 Email Capture Tracking

### To Verify Email Capture is Working

#### 1. Check Supabase (Primary Storage)

```sql
-- Run this in Supabase SQL editor
SELECT * FROM waitlist_subscribers
ORDER BY created_at DESC
LIMIT 10;
```

#### 2. Check Vercel Logs via MCP

Ask Cline: "Show me the API logs for /api/waitlist from the last hour"

#### 3. Check Google Analytics Events

- Go to GA4 → Reports → Engagement → Events
- Look for custom events like:
  - `email_capture_opened`
  - `email_capture_submitted`
  - `waitlist_signup`

#### 4. Monitor Real-Time

- GA4: Realtime → Overview (see active users)
- Vercel: Function logs (see API calls)

## 🎯 Analytics Best Practices

### What to Track

1. **Conversion Funnel**:
   - Landing page views → Calculator starts → Email captures
   - Track drop-off points

2. **User Engagement**:
   - Which comparison cards get clicked most?
   - Calculator completion rate
   - Time spent on site

3. **Technical Performance**:
   - Page load times (Vercel Analytics)
   - API response times (Vercel Logs)
   - Error rates (Both platforms)

### Setting Up Goals in GA4

1. Go to Admin → Events → Create event
2. Track key conversions:
   - Email signup completed
   - Calculator completed
   - Share button clicked

## 🚨 Troubleshooting

### If Vercel MCP Not Working

1. Restart VS Code
2. Check MCP settings file exists
3. Re-authenticate with `/mcp`
4. Verify internet connection

### If Analytics Not Showing Data

1. **Vercel Analytics**:
   - Check if script blocker is active
   - Verify deployment is on Vercel (not local)
   - Wait 5-10 minutes for data

2. **Google Analytics**:
   - Check Realtime view first
   - Verify tracking ID matches
   - Test with GA Debugger extension
   - Check for ad blockers

### If Email Capture Not Tracking

1. Check browser console for errors
2. Verify API endpoint returns 200
3. Check Supabase connection
4. Review Vercel function logs

## 📝 Next Steps

### Immediate Actions

- [x] Vercel MCP configured in Cline
- [x] Vercel Analytics active
- [x] Google Analytics active
- [ ] Authenticate Vercel MCP (manual step)
- [ ] Verify email captures in Supabase
- [ ] Set up GA4 conversion goals

### Future Enhancements

1. **Custom Events**: Add more granular tracking
2. **Conversion Optimization**: A/B test email modal
3. **Performance Monitoring**: Set up alerts for errors
4. **User Journey**: Map complete user flow
5. **Dashboard**: Create custom analytics dashboard

## 🔗 Quick Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Google Analytics**: https://analytics.google.com
- **Supabase Dashboard**: https://supabase.com/dashboard
- **Live Site**: https://pathwise-roi.vercel.app

## 💡 Pro Tips

1. **Check Analytics Daily**: First week after launch
2. **Monitor Errors**: Set up Vercel notifications
3. **Track Conversions**: Focus on email capture rate
4. **Optimize Speed**: Use Vercel Analytics Web Vitals
5. **Test Everything**: Use incognito mode to test tracking

---

**Last Updated**: January 18, 2025
**Version**: 1.0.0
**Status**: Analytics Active, MCP Configured
