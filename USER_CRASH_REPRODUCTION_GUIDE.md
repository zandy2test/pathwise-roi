# User Crash Reproduction Recording Guide

## Required Recording Setup

### Browser Setup

- **Use Incognito/Private Window** (guarantees unauthenticated state)
- **Enable Developer Tools** before starting recording
- **Open these tabs in DevTools:**
  - **Network tab** - filter for "trpc" or "collection"
  - **Console tab** - to capture "Minified React error #310"

### Recording Requirements

**Record your screen while performing these exact steps:**

1. **Navigate to PathwiseROI application**
2. **Calculate a scam score** (complete the full calculation flow)
3. **Locate the "Compare with Another Path" button/element**
   - Show the exact element you click
   - Use browser inspector to highlight the element (right-click > Inspect)
   - Record the HTML structure and CSS selector
4. **Click the button that triggers the tRPC call**
5. **Capture the crash sequence:**
   - Network tab showing POST to `/api/trpc/collection.create?batch=1`
   - 401 Unauthorized response
   - Console showing "Minified React error #310"
   - Error boundary activation ("Oops! Something went wrong" screen)

### Key Information Needed

**Element Identification:**

- Exact CSS selector of the clickable element
- Component name/file that renders this button
- Event handlers attached to the element

**Network Request Details:**

- Full request URL and payload
- Response status and error message
- Timing of when the request fires

**Error Manifestation:**

- Exact console error messages
- Error boundary behavior
- React component stack trace if visible

### Alternative: Step-by-Step Screenshots

If screen recording isn't possible, provide:

1. Screenshot of the page after calculating scam score
2. Screenshot with browser inspector showing the target element
3. Screenshot of Network tab during the failed request
4. Screenshot of Console tab showing the React error
5. Screenshot of the error boundary screen

### Authentication Context Questions

**Confirm:**

- Does PathwiseROI have user login/signup functionality?
- What makes a user "authenticated" vs "unauthenticated"?
- Are there any visual indicators of authentication state?

## Expected Outcome

After this recording/documentation, I will:

1. Update crash testing methodology with correct element selectors
2. Implement proper unauthenticated state testing
3. Monitor for the specific tRPC API calls and error responses
4. Verify if v1.5.0 fixes actually resolved the issue
5. Provide additional error handling recommendations if crashes persist

## Why This Matters

My previous testing failed because I:

- Clicked text elements instead of actual buttons
- May have tested in authenticated session
- Didn't monitor the specific API endpoint
- Looked for generic crashes instead of the specific error pattern

Your demonstration will show me the correct reproduction path so I can test properly.
