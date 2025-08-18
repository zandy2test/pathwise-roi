import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const errorData = await request.json();
    
    // Add timestamp and request info
    const logEntry = {
      ...errorData,
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      headers: {
        userAgent: request.headers.get('user-agent'),
        referer: request.headers.get('referer'),
      },
    };

    // Log to console for immediate visibility
    console.error('🚨 Frontend Error:', JSON.stringify(logEntry, null, 2));

    // Here you can send to external services:
    // - Sentry: Sentry.captureException()
    // - LogRocket: LogRocket.captureException()
    // - Datadog: logger.error()
    // - Custom webhook

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error logging endpoint failed:', error);
    return NextResponse.json(
      { error: 'Failed to log error' },
      { status: 500 }
    );
  }
}