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
        'x-vercel-deployment-url': request.headers.get('x-vercel-deployment-url'),
        'x-vercel-id': request.headers.get('x-vercel-id'),
      },
      vercelMeta: {
        deploymentId: request.headers.get('x-vercel-deployment-url'),
        functionRegion: request.headers.get('x-vercel-cache'),
        forwardedFor: request.headers.get('x-forwarded-for'),
      },
    };

    // Enhanced logging with Vercel context
    console.group('🚨 Enhanced Frontend Error Report');
    console.error('Error Data:', errorData);
    console.error('Vercel Context:', logEntry.vercelMeta);
    console.error('Full Log Entry:', JSON.stringify(logEntry, null, 2));
    console.groupEnd();

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