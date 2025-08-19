import { detectBot, getClientIP } from '../../lib/bot-protection';

// Enhanced API endpoint with bot protection and logging
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

  const { email, honeypot, startTime, mathAnswer, mathChallenge } = req.body;
  
  // Get client IP for bot detection
  const clientIP = getClientIP(req);
  
  // Bot detection
  const botCheck = detectBot({
    ip: clientIP,
    userAgent: req.headers['user-agent'],
    honeypot,
    startTime,
    email
  });
  
  // Verify math challenge if provided
  if (mathChallenge && mathAnswer) {
    if (parseInt(mathAnswer) !== mathChallenge.answer) {
      return res.status(400).json({ 
        error: 'Incorrect verification answer',
        botScore: botCheck.score 
      });
    }
  }
  
  // Block if bot score is too high
  if (botCheck.isBot) {
    console.log(`🤖 Bot detected from ${clientIP}:`, {
      email,
      reasons: botCheck.reasons,
      score: botCheck.score,
      userAgent: req.headers['user-agent']
    });
    
    return res.status(429).json({ 
      error: 'Request rejected. Please try again later.',
      reasons: botCheck.reasons.length > 0 ? ['Suspicious activity detected'] : undefined
    });
  }

  // Enhanced email validation (already done in detectBot, but keep for backwards compatibility)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
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
    console.log(`IP: ${clientIP}`);
    console.log(`User-Agent: ${req.headers['user-agent']}`);
    console.log(`Bot Score: ${botCheck.score}/100`);
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
      } catch {
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
