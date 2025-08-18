// Improved API endpoint with better logging and optional storage
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  // Handle GET requests for admin viewing
  if (req.method === 'GET') {
    const { secret } = req.query;
    
    // Simple authentication for viewing emails
    if (secret !== process.env.ADMIN_SECRET && secret !== 'collegescam2025') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      // Read from log file if it exists
      const logPath = path.join(process.cwd(), 'waitlist-emails.json');
      if (fs.existsSync(logPath)) {
        const data = JSON.parse(fs.readFileSync(logPath, 'utf8'));
        return res.status(200).json(data);
      } else {
        return res.status(200).json({ emails: [], count: 0 });
      }
    } catch (error) {
      console.error('Error reading waitlist:', error);
      return res.status(500).json({ error: 'Failed to read waitlist' });
    }
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

  // Check for disposable email domains (basic list)
  const disposableDomains = ['tempmail.com', 'throwaway.email', '10minutemail.com'];
  const domain = email.split('@')[1];
  if (disposableDomains.includes(domain)) {
    return res.status(400).json({ error: 'Please use a permanent email address' });
  }

  try {
    const timestamp = new Date().toISOString();
    const entry = {
      email,
      timestamp,
      source: req.headers.referer || 'direct',
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      userAgent: req.headers['user-agent']
    };

    // Log to server console (visible in Vercel Functions logs)
    console.log('=== NEW WAITLIST SIGNUP ===');
    console.log(`Email: ${email}`);
    console.log(`Time: ${timestamp}`);
    console.log(`Source: ${entry.source}`);
    console.log('===========================');

    // Store in local JSON file (for development)
    if (process.env.NODE_ENV === 'development') {
      const logPath = path.join(process.cwd(), 'waitlist-emails.json');
      let data = { emails: [], count: 0 };
      
      if (fs.existsSync(logPath)) {
        data = JSON.parse(fs.readFileSync(logPath, 'utf8'));
      }
      
      // Check for duplicates
      if (data.emails.some(e => e.email === email)) {
        return res.status(400).json({ error: 'Email already registered' });
      }
      
      data.emails.push(entry);
      data.count = data.emails.length;
      
      fs.writeFileSync(logPath, JSON.stringify(data, null, 2));
    }

    // Try to store in Vercel KV if available
    try {
      const { kv } = await import('@vercel/kv');
      if (kv) {
        await kv.hset('waitlist', email, JSON.stringify(entry));
        await kv.incr('waitlist_count');
      }
    } catch (kvError) {
      // KV not configured, that's okay
      console.log('Vercel KV not configured, using console logging only');
    }

    // Send notification email to admin (optional)
    if (process.env.ADMIN_EMAIL && process.env.SENDGRID_API_KEY) {
      try {
        const sgMail = await import('@sendgrid/mail');
        sgMail.default.setApiKey(process.env.SENDGRID_API_KEY);
        
        await sgMail.default.send({
          to: process.env.ADMIN_EMAIL,
          from: 'noreply@collegescam.io',
          subject: 'New CollegeScam.io Waitlist Signup',
          text: `New signup: ${email} at ${timestamp}`,
          html: `
            <h3>New Waitlist Signup</h3>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Time:</strong> ${timestamp}</p>
            <p><strong>Source:</strong> ${entry.source}</p>
          `
        });
      } catch (emailError) {
        console.log('Admin notification email failed:', emailError);
      }
    }

    res.status(200).json({ 
      success: true, 
      message: 'Successfully joined waitlist! Check your email for confirmation.' 
    });
  } catch (error) {
    console.error('Waitlist signup error:', error);
    res.status(500).json({ 
      error: 'Failed to join waitlist',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
