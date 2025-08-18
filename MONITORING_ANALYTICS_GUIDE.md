# 📊 MONITORING & ANALYTICS GUIDE - CollegeScam.io

## 🔍 HOW TO MONITOR EMAIL SIGNUPS

### Method 1: Admin Panel (Recommended)

**URL:** https://collegescam.io/admin/waitlist?secret=Zakkzakk12345!!!!!

**Steps:**

1. Open your web browser
2. Navigate to: `https://collegescam.io/admin/waitlist?secret=Zakkzakk12345!!!!!`
3. You'll see instructions to check Vercel Functions logs
4. This page confirms your admin authentication is working

### Method 2: Vercel Functions Logs (Primary Method)

**URL:** https://vercel.com/zakk-osheas-projects/pathwise-roi/functions

**Steps:**

1. Go to https://vercel.com/zakk-osheas-projects/pathwise-roi
2. Click on the **"Functions"** tab
3. Click on **"api/waitlist"** function
4. Click **"View Function Logs"**
5. Look for log entries that show:
   ```
   ========================================
   NEW WAITLIST SIGNUP - COLLEGESCAM.IO
   ========================================
   Email: user@example.com
   Timestamp: 2025-01-18T13:00:00.000Z
   Source: https://collegescam.io/
   IP: 192.168.1.100
   User-Agent: Mozilla/5.0...
   ========================================
   ```

### Method 3: Real-Time Log Monitoring

**Steps:**

1. In Vercel Dashboard, go to your project
2. Click **"Functions"** → **"api/waitlist"** → **"Logs"**
3. Keep this tab open to see real-time signups
4. Each signup creates a detailed log entry with all user info

### Method 4: Test Email Capture

**Steps to verify it's working:**

1. Go to https://collegescam.io
2. Scroll down and click **"Join Waitlist"** button
3. Enter a test email (like `test@youremail.com`)
4. Click **"Join Waitlist"**
5. Check Vercel logs within 1-2 minutes to see the entry

---

## 📈 HOW TO TRACK ANALYTICS

### Google Analytics 4 (GA4) - Primary Analytics

**Setup Steps:**

1. **Access GA4 Dashboard:**
   - Go to https://analytics.google.com
   - Select your property: **G-NSSK9CWEXN**

2. **Key Reports to Monitor:**
   - **Realtime:** See current visitors
   - **Acquisition:** Where users come from
   - **Engagement:** What users do on site
   - **Demographics:** User age, location, interests

3. **Custom Events to Track:**
   - `email_capture_opened` - When modal opens
   - `email_capture_submitted` - When form submitted
   - `calculation_completed` - When ROI calculated
   - `comparison_viewed` - When users compare paths

4. **Daily Monitoring Routine:**
   - Check **Realtime** for current activity
   - Review **Audience** → **Overview** for daily stats
   - Monitor **Events** for email signups and calculations

### Vercel Analytics - Performance Analytics

**Access Steps:**

1. **Go to Vercel Dashboard:**
   - URL: https://vercel.com/zakk-osheas-projects/pathwise-roi
   - Click **"Analytics"** tab

2. **Key Metrics to Monitor:**
   - **Page Views:** Total site visits
   - **Unique Visitors:** Individual user count
   - **Top Pages:** Most visited sections
   - **Countries:** Geographic distribution
   - **Referrers:** Traffic sources

3. **Performance Monitoring:**
   - **Web Vitals:** Core performance metrics
   - **Function Invocations:** API call frequency
   - **Bandwidth Usage:** Data transfer stats

### Weekly Analytics Review Checklist

**Every Monday, check:**

- [ ] Total visitors (GA4 & Vercel)
- [ ] Email signups count (Vercel Logs)
- [ ] Top traffic sources (GA4 Acquisition)
- [ ] Most used calculator paths (GA4 Events)
- [ ] Site performance scores (Vercel Web Vitals)
- [ ] Geographic distribution (both platforms)

### Setting Up Alerts

**GA4 Custom Alerts:**

1. Go to GA4 → **Admin** → **Custom Insights**
2. Create alerts for:
   - Daily visitors drop >50%
   - Email signup events spike
   - Page load time increases

**Vercel Monitoring:**

1. In Vercel Dashboard → **Settings** → **Notifications**
2. Enable alerts for:
   - Function errors
   - High bandwidth usage
   - Site downtime

---

## 🚨 TROUBLESHOOTING

### If Email Signups Aren't Appearing:

1. Check Vercel Functions are deployed: `https://collegescam.io/api/waitlist`
2. Verify environment variable `ADMIN_SECRET` is set in Vercel
3. Test the API directly with Postman/curl
4. Check Vercel Function logs for errors

### If Analytics Aren't Working:

1. Verify GA4 tracking ID `G-NSSK9CWEXN` in site code
2. Check browser console for GA4 errors
3. Use GA4 DebugView for real-time testing
4. Ensure Vercel Analytics is enabled in project settings

### Quick Test Commands:

```bash
# Test email API
curl -X POST https://collegescam.io/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Check admin panel
curl https://collegescam.io/admin/waitlist?secret=Zakkzakk12345!!!!!
```

---

## 📞 SUPPORT CONTACTS

- **Vercel Support:** https://vercel.com/help
- **Google Analytics Help:** https://support.google.com/analytics
- **Technical Issues:** Use the /reportbug command in development chat

---

_Last Updated: January 18, 2025_
_Status: Production Ready_
