import { NextRequest, NextResponse } from 'next/server';

// This endpoint helps Claude Code (via MCP) get real-time debugging data
export async function POST(request: NextRequest) {
  try {
    const { action, data } = await request.json();

    switch (action) {
      case 'report-crash':
        // User is reporting a crash with enhanced data
        console.group('🚨 CRASH REPORT via MCP Integration');
        console.error('Crash Data:', data);
        console.error('Vercel Headers:', {
          deploymentUrl: request.headers.get('x-vercel-deployment-url'),
          vercelId: request.headers.get('x-vercel-id'),
          forwardedFor: request.headers.get('x-forwarded-for'),
        });
        console.groupEnd();

        // Return structured data for Claude to analyze
        return NextResponse.json({
          success: true,
          analysisData: {
            crashType: data.errorType || 'unknown',
            componentStack: data.componentStack,
            vercelContext: data.vercelContext,
            reproductionSteps: data.clickSequence,
            timestamp: new Date().toISOString(),
          }
        });

      case 'get-session-info':
        // Claude is requesting current session information
        return NextResponse.json({
          success: true,
          session: {
            deploymentId: request.headers.get('x-vercel-deployment-url'),
            timestamp: new Date().toISOString(),
            userAgent: request.headers.get('user-agent'),
            ip: request.headers.get('x-forwarded-for'),
          }
        });

      case 'test-error-logging':
        // Test the error logging pipeline
        console.log('🧪 Testing error logging pipeline...');
        return NextResponse.json({
          success: true,
          message: 'Error logging pipeline is working'
        });

      default:
        return NextResponse.json(
          { error: 'Unknown action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Debug session endpoint error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Provide debug information for Claude Code
  const debugInfo = {
    timestamp: new Date().toISOString(),
    deployment: {
      url: request.headers.get('x-vercel-deployment-url'),
      id: request.headers.get('x-vercel-id'),
      region: request.headers.get('x-vercel-cache'),
    },
    client: {
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for'),
      referer: request.headers.get('referer'),
    },
    status: 'active'
  };

  return NextResponse.json({
    success: true,
    debugInfo,
    instructions: {
      crashReporting: 'POST to this endpoint with action: "report-crash"',
      sessionInfo: 'POST with action: "get-session-info"',
      testLogging: 'POST with action: "test-error-logging"'
    }
  });
}