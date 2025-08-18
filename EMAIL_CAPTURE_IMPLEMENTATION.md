# Email Capture Implementation Guide

## Current Status

The email capture API endpoint (`/api/waitlist`) is currently minimal - it only logs emails to console with no persistent storage.

## Recommended Implementation Options

### Option 1: Quick Setup with Vercel KV (Recommended for MVP)

```javascript
// pages/api/waitlist.js
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    // Store in Vercel KV
    const timestamp = new Date().toISOString();
    await kv.hset('waitlist', email, timestamp);
    await kv.lpush('waitlist_order', { email, timestamp });

    // Increment counter
    await kv.incr('waitlist_count');

    res.status(200).json({
      success: true,
      message: 'Successfully joined waitlist',
    });
  } catch (error) {
    console.error('Waitlist signup error:', error);
    res.status(500).json({ error: 'Failed to join waitlist' });
  }
}
```

### Option 2: Supabase Integration

```javascript
// pages/api/waitlist.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  try {
    const { data, error } = await supabase.from('waitlist').insert([
      {
        email,
        created_at: new Date().toISOString(),
        source: 'collegescam.io',
      },
    ]);

    if (error) throw error;

    res.status(200).json({
      success: true,
      message: 'Successfully joined waitlist',
    });
  } catch (error) {
    console.error('Waitlist signup error:', error);
    res.status(500).json({ error: 'Failed to join waitlist' });
  }
}
```

### Option 3: Email Service Integration (ConvertKit)

```javascript
// pages/api/waitlist.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;
  const API_KEY = process.env.CONVERTKIT_API_KEY;
  const FORM_ID = process.env.CONVERTKIT_FORM_ID;

  try {
    const response = await fetch(`https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: API_KEY,
        email,
        tags: ['collegescam-waitlist'],
      }),
    });

    if (!response.ok) throw new Error('ConvertKit API error');

    res.status(200).json({
      success: true,
      message: 'Successfully joined waitlist',
    });
  } catch (error) {
    console.error('Waitlist signup error:', error);
    res.status(500).json({ error: 'Failed to join waitlist' });
  }
}
```

## Admin Dashboard for Email Monitoring

Create `pages/api/admin/waitlist.js`:

```javascript
export default async function handler(req, res) {
  // Simple authentication
  const { authorization } = req.headers;
  if (authorization !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      // Fetch all emails based on your storage method
      const emails = await getWaitlistEmails(); // implement based on choice

      res.status(200).json({
        count: emails.length,
        emails: emails,
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch waitlist' });
    }
  }
}
```

Create `app/admin/page.tsx`:

```tsx
'use client';

import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [emails, setEmails] = useState([]);
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const fetchEmails = async () => {
    const response = await fetch('/api/admin/waitlist', {
      headers: {
        Authorization: `Bearer ${password}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setEmails(data.emails);
      setAuthenticated(true);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-8 bg-white rounded-lg shadow">
          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 border rounded"
          />
          <button onClick={fetchEmails} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Waitlist Emails ({emails.length})</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {emails.map((item, i) => (
              <tr key={i} className="border-t">
                <td className="px-6 py-4">{item.email}</td>
                <td className="px-6 py-4">{item.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

## Environment Variables Needed

Add to `.env.local`:

```
# Option 1: Vercel KV (auto-configured in Vercel dashboard)
# KV_URL, KV_REST_API_URL, etc. are auto-added

# Option 2: Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_service_key

# Option 3: ConvertKit
CONVERTKIT_API_KEY=your_api_key
CONVERTKIT_FORM_ID=your_form_id

# Admin access
ADMIN_SECRET=your_secure_admin_password
```

## Testing Email Capture

1. **Local Testing**:

```bash
# Test the API endpoint
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

2. **Production Testing**:

```bash
curl -X POST https://pathwise-roi.vercel.app/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

## Vercel Dashboard Monitoring

1. Go to your Vercel dashboard
2. Navigate to Functions tab
3. Click on `api/waitlist`
4. View logs to see email captures

## Anti-Spam Measures

1. **Rate Limiting** (add to waitlist.js):

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
});
```

2. **Email Verification** (optional):

- Send confirmation email with verification link
- Only add to main list after verification

3. **Honeypot Field**:

- Add hidden field in form
- Reject if filled (bots will fill it)

## Next Steps

1. **Choose storage method** (Vercel KV is easiest for MVP)
2. **Set up environment variables**
3. **Deploy updated API endpoint**
4. **Test email capture**
5. **Set up monitoring dashboard** (optional)
6. **Configure email notifications** (optional)

## Quick Implementation (5 minutes)

For immediate functionality, use Vercel KV:

1. Go to Vercel Dashboard > Storage > Create Database > KV
2. Connect to your project
3. Update `pages/api/waitlist.js` with Option 1 code
4. Deploy
5. Test with: `curl -X POST https://pathwise-roi.vercel.app/api/waitlist -H "Content-Type: application/json" -d '{"email":"test@example.com"}'`

Emails will be stored in Vercel KV and viewable in the Vercel dashboard.
