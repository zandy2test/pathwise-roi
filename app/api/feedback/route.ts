import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { detectBot, getClientIP } from '@/lib/bot-protection';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, rating, feedback, context, timestamp, userAgent, honeypot, startTime } = body;
    
    // Get client IP for bot detection - convert Headers to Record<string, string>
    const headersObj: Record<string, string> = {};
    request.headers.forEach((value, key) => {
      headersObj[key] = value;
    });
    
    const clientIP = getClientIP({ 
      headers: headersObj,
      connection: undefined,
      socket: undefined
    });
    
    // Bot detection
    const botCheck = detectBot({
      ip: clientIP,
      userAgent: userAgent || request.headers.get('user-agent') || undefined,
      honeypot,
      startTime,
      email
    });
    
    // Block if bot score is too high
    if (botCheck.isBot) {
      console.log(`🤖 Bot detected in feedback from ${clientIP}:`, {
        feedback: feedback?.substring(0, 50),
        reasons: botCheck.reasons,
        score: botCheck.score
      });
      
      return NextResponse.json(
        { error: 'Request rejected. Please try again later.' },
        { status: 429 }
      );
    }

    // Validate required fields
    if (!feedback || typeof feedback !== 'string' || feedback.trim().length === 0) {
      return NextResponse.json(
        { error: 'Feedback is required' },
        { status: 400 }
      );
    }

    // Create feedback entry
    const feedbackEntry = {
      id: Date.now().toString(),
      timestamp: timestamp || new Date().toISOString(),
      email: email || 'anonymous',
      rating: rating || 0,
      feedback: feedback.trim(),
      context: context || 'general',
      userAgent: userAgent || 'unknown',
      processed: false
    };

    // Ensure feedback directory exists
    const feedbackDir = path.join(process.cwd(), 'data', 'feedback');
    try {
      await fs.mkdir(feedbackDir, { recursive: true });
    } catch (error) {
      // Directory might already exist, continue
    }

    // Save to JSON file (organized by date)
    const dateStr = new Date().toISOString().split('T')[0];
    const filePath = path.join(feedbackDir, `feedback-${dateStr}.json`);
    
    let existingFeedback = [];
    try {
      const existingData = await fs.readFile(filePath, 'utf8');
      existingFeedback = JSON.parse(existingData);
    } catch (error) {
      // File doesn't exist yet, start with empty array
    }

    existingFeedback.push(feedbackEntry);
    await fs.writeFile(filePath, JSON.stringify(existingFeedback, null, 2));

    // Also save to a master feedback log
    const masterLogPath = path.join(feedbackDir, 'all-feedback.json');
    let masterLog = [];
    try {
      const masterData = await fs.readFile(masterLogPath, 'utf8');
      masterLog = JSON.parse(masterData);
    } catch (error) {
      // File doesn't exist yet
    }

    masterLog.push(feedbackEntry);
    
    // Keep only last 1000 entries in master log to prevent it from getting too large
    if (masterLog.length > 1000) {
      masterLog = masterLog.slice(-1000);
    }
    
    await fs.writeFile(masterLogPath, JSON.stringify(masterLog, null, 2));

    // Log to console for immediate visibility
    console.log(`📝 New Feedback [${rating}★]: ${feedback.substring(0, 100)}${feedback.length > 100 ? '...' : ''}`);
    console.log(`   Email: ${email || 'anonymous'} | Context: ${context}`);

    return NextResponse.json({ 
      success: true, 
      message: 'Feedback received successfully',
      id: feedbackEntry.id 
    });

  } catch (error) {
    console.error('Feedback API error:', error);
    
    return NextResponse.json(
      { error: 'Failed to process feedback' },
      { status: 500 }
    );
  }
}

// GET method to retrieve feedback (for admin use)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const limit = parseInt(searchParams.get('limit') || '50');

    const feedbackDir = path.join(process.cwd(), 'data', 'feedback');
    
    if (date) {
      // Get feedback for specific date
      const filePath = path.join(feedbackDir, `feedback-${date}.json`);
      try {
        const data = await fs.readFile(filePath, 'utf8');
        const feedback = JSON.parse(data);
        return NextResponse.json({ feedback, date });
      } catch (error) {
        return NextResponse.json({ feedback: [], date, error: 'No feedback found for this date' });
      }
    } else {
      // Get recent feedback from master log
      const masterLogPath = path.join(feedbackDir, 'all-feedback.json');
      try {
        const data = await fs.readFile(masterLogPath, 'utf8');
        const allFeedback = JSON.parse(data);
        const recentFeedback = allFeedback.slice(-limit).reverse(); // Most recent first
        
        return NextResponse.json({ 
          feedback: recentFeedback,
          total: allFeedback.length,
          showing: recentFeedback.length
        });
      } catch (error) {
        return NextResponse.json({ feedback: [], total: 0, showing: 0 });
      }
    }

  } catch (error) {
    console.error('Feedback GET API error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve feedback' },
      { status: 500 }
    );
  }
}