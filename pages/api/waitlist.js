// Enhanced API endpoint with logging and optional viewing
export default async function handler(req, res) {
  // Handle GET requests for admin viewing (simple auth)
  if (req.method === 'GET') {
    const { secret } = req.query;
    
    // Simple authentication - update this password!
    if (secret !== process.env.ADMIN_SECRET && secret !== 'collegescam2025') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // In production, emails are logged to Vercel Functions logs
    return res.status(200).json({ 
      message: 'Check Vercel Functions logs for email signups',
      instructions: 'Go to Vercel Dashboard > Functions > api/waitlist > Logs'
    });
  }

  // Handle POST requests for email submission
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  // Enhanced email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  // Check for disposable emails
  const disposableDomains = ['tempmail.com', 'throwaway.email', '10minutemail.com'];
  const domain = email.split('@')[1];
  if (disposableDomains.includes(domain)) {
    return res.status(400).json({ error: 'Please use a permanent email address' });
  }

  try {
    const timestamp = new Date().toISOString();
    const source = req.headers.referer || 'direct';
    
    // Enhanced logging for Vercel Functions
    console.log('========================================');
    console.log('NEW WAITLIST SIGNUP - COLLEGESCAM.IO');
    console.log('========================================');
    console.log(`Email: ${email}`);
    console.log(`Timestamp: ${timestamp}`);
    console.log(`Source: ${source}`);
    console.log(`IP: ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}`);
    console.log(`User-Agent: ${req.headers['user-agent']}`);
    console.log('========================================');
    
    // Try Vercel KV if available (only in production)
    if (process.env.NODE_ENV === 'production') {
      try {
        const { kv } = await import('@vercel/kv');
        if (kv) {
          await kv.hset('waitlist', email, timestamp);
          await kv.incr('waitlist_count');
          console.log('✅ Stored in Vercel KV');
        }
      } catch (_) {
        // KV not configured - that's okay, logs are enough for MVP
        console.log('ℹ️ Vercel KV not configured - using logs only');
      }
    } else {
      console.log('📝 Local development - email logged to console');
    }

    res.status(200).json({ 
      success: true, 
      message: 'Successfully joined waitlist! We\'ll be in touch soon.' 
    });
  } catch (error) {
    console.error('Waitlist signup error:', error);
    res.status(500).json({ 
      error: 'Failed to join waitlist',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
