# PathwiseROI v1.1.0 - Quick Manual Testing Script

## Setup
1. Ensure dev server is running: `npm run dev`
2. Open browser to: http://localhost:3000
3. Open browser DevTools (F12) to monitor console

## Test Sequence

### Test 1: Homepage Load
- [ ] Page loads without errors
- [ ] Hero section visible
- [ ] "Calculate Your ROI" button visible
- [ ] Comparison cards display
- [ ] Premium section renders
- [ ] Footer links work

### Test 2: Calculator Page - Two-Tier Selection
1. Click "Calculate Your ROI"
2. On calculator page:
   - [ ] Education Type dropdown appears
   - [ ] Click dropdown - options visible?
   - [ ] Select "College/University"
   - [ ] Field of Study dropdown enables
   - [ ] Field shows relevant options (Business, Engineering, etc.)
   - [ ] Select "Engineering"

### Test 3: Complete Calculation
1. Fill remaining fields:
   - [ ] Location: "New York"
   - [ ] School Quality: "Average Public School"
   - [ ] Living: "Off-Campus"
   - [ ] Scholarships: "10000"
2. Click "Calculate ROI"
3. Verify results show:
   - [ ] Timeline graph appears
   - [ ] Red area for debt period
   - [ ] Green area for profit period
   - [ ] Breakeven point marked

### Test 4: Glossary Tooltips
In results section:
- [ ] Hover over "Total Cost" - tooltip appears
- [ ] Hover over "Net Cost" - tooltip appears
- [ ] Hover over "Breakeven Time" - tooltip appears
- [ ] Hover over "10-Year Net Worth" - tooltip appears
- [ ] Tooltips contain examples

### Test 5: Premium Features
1. Scroll to premium section
   - [ ] 4 feature cards visible
   - [ ] Click "Get Premium Access"
   - [ ] Modal opens with pricing
   - [ ] Close modal works

2. Test floating button:
   - [ ] Scroll down - button appears
   - [ ] Click floating button
   - [ ] Navigates to premium section

### Test 6: Comparison Mode
1. Navigate to homepage
2. Click "See Comparison" on any card
   - [ ] Compare page loads
   - [ ] Pre-filled values present
   - [ ] Can modify values
   - [ ] Calculate comparison works
   - [ ] Winner clearly indicated

### Test 7: Mobile Responsiveness
1. Open DevTools
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select iPhone 12 Pro
   - [ ] Layout adjusts properly
   - [ ] Navigation works
   - [ ] Forms usable
   - [ ] Graphs scale correctly

### Test 8: Navigation
- [ ] How It Works page loads
- [ ] Privacy Policy page loads
- [ ] Terms of Service page loads
- [ ] All footer links functional

## Console Check
Check browser console for:
- [ ] No critical errors (red)
- [ ] No 404 errors for critical resources
- [ ] React hydration warnings (acceptable in dev)

## Quick Performance Check
In DevTools Network tab:
- [ ] Page load < 3 seconds
- [ ] No resources > 1MB
- [ ] Total page weight < 2MB

## Report Issues
Document any issues found:
1. Issue: _______________
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Browser/OS

2. Issue: _______________
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Browser/OS

## Sign-off
- [ ] All critical features working
- [ ] No blocking issues
- [ ] Ready for user testing

Tested by: _______________
Date: _______________
Time: _______________
