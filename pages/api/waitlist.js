// API endpoint to handle waitlist email submissions
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    // Here you could integrate with:
    // - ConvertKit, Mailchimp, or other email service
    // - Database like Supabase or Postgres
    // - Simple file storage for MVP
    
    // For MVP, we'll just log it and send you a notification
    console.log(`New waitlist signup: ${email} at ${new Date().toISOString()}`);
    
    // You could send yourself an email notification here
    // For now, just simulate success
    
    // In a real implementation, you might:
    /*
    await emailService.addToWaitlist(email);
    await sendNotificationEmail(email);
    */

    res.status(200).json({ 
      success: true, 
      message: 'Successfully joined waitlist' 
    });
  } catch (error) {
    console.error('Waitlist signup error:', error);
    res.status(500).json({ 
      error: 'Failed to join waitlist',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
