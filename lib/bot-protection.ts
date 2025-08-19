// Bot protection utilities for forms and API endpoints

/**
 * Simple rate limiting using in-memory store
 * In production, consider using Redis or similar
 */
class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  
  /**
   * Check if request is allowed based on IP rate limiting
   * @param ip - Client IP address
   * @param maxRequests - Maximum requests allowed
   * @param windowMs - Time window in milliseconds
   */
  isAllowed(ip: string, maxRequests: number = 5, windowMs: number = 60000): boolean {
    const now = Date.now();
    const requests = this.requests.get(ip) || [];
    
    // Remove old requests outside the window
    const validRequests = requests.filter(time => now - time < windowMs);
    
    if (validRequests.length >= maxRequests) {
      return false;
    }
    
    // Add current request
    validRequests.push(now);
    this.requests.set(ip, validRequests);
    
    return true;
  }
  
  /**
   * Clean up old entries periodically
   */
  cleanup(maxAge: number = 300000): void {
    const now = Date.now();
    for (const [ip, requests] of this.requests.entries()) {
      const validRequests = requests.filter(time => now - time < maxAge);
      if (validRequests.length === 0) {
        this.requests.delete(ip);
      } else {
        this.requests.set(ip, validRequests);
      }
    }
  }
}

export const rateLimiter = new RateLimiter();

/**
 * Simple honeypot field validation
 * Bots often fill all fields, humans should leave honeypot empty
 */
export function validateHoneypot(honeypotValue: string | undefined): boolean {
  return !honeypotValue || honeypotValue.trim() === '';
}

/**
 * Basic timing validation - forms submitted too quickly are likely bots
 */
export function validateTiming(startTime: number, minTimeMs: number = 2000): boolean {
  const elapsed = Date.now() - startTime;
  return elapsed >= minTimeMs;
}

/**
 * User agent validation - block obvious bots
 */
export function validateUserAgent(userAgent: string | undefined): boolean {
  if (!userAgent) return false;
  
  const botPatterns = [
    /bot/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
    /curl/i,
    /wget/i,
    /python-requests/i,
    /node-fetch/i,
    /axios/i,
    /http/i
  ];
  
  return !botPatterns.some(pattern => pattern.test(userAgent));
}

/**
 * Simple CAPTCHA-like challenge
 * Generate a simple math problem for verification
 */
export function generateMathChallenge(): { question: string; answer: number } {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operation = Math.random() > 0.5 ? 'add' : 'subtract';
  
  if (operation === 'add') {
    return {
      question: `What is ${num1} + ${num2}?`,
      answer: num1 + num2
    };
  } else {
    const larger = Math.max(num1, num2);
    const smaller = Math.min(num1, num2);
    return {
      question: `What is ${larger} - ${smaller}?`,
      answer: larger - smaller
    };
  }
}

/**
 * Validate email more thoroughly
 */
export function validateEmail(email: string): { valid: boolean; reason?: string } {
  if (!email || typeof email !== 'string') {
    return { valid: false, reason: 'Email is required' };
  }
  
  // Basic format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, reason: 'Invalid email format' };
  }
  
  // Check for obvious fake patterns
  const fakePatterns = [
    /test@test\./,
    /example@example\./,
    /fake@fake\./,
    /spam@spam\./,
    /bot@bot\./,
    /[0-9]{5,}@/,  // Long numbers in email
    /@[0-9]+\./     // Numeric domains
  ];
  
  if (fakePatterns.some(pattern => pattern.test(email.toLowerCase()))) {
    return { valid: false, reason: 'Please use a real email address' };
  }
  
  // Check for common disposable email domains
  const disposableDomains = [
    'tempmail.com', 'throwaway.email', '10minutemail.com', 'guerrillamail.com',
    'mailinator.com', 'temp-mail.org', 'getnada.com', 'maildrop.cc',
    '0-mail.com', '1secmail.com', '20minutemail.com', '33mail.com'
  ];
  
  const domain = email.split('@')[1]?.toLowerCase();
  if (domain && disposableDomains.includes(domain)) {
    return { valid: false, reason: 'Please use a permanent email address' };
  }
  
  return { valid: true };
}

/**
 * Get client IP from request headers
 */
export function getClientIP(req: { headers: Record<string, string>; connection?: { remoteAddress?: string }; socket?: { remoteAddress?: string } }): string {
  return (
    req.headers['x-forwarded-for'] ||
    req.headers['x-real-ip'] ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    'unknown'
  ).split(',')[0].trim();
}

/**
 * Comprehensive bot detection
 */
export interface BotCheckResult {
  isBot: boolean;
  reasons: string[];
  score: number; // 0-100, higher = more likely bot
}

export function detectBot(data: {
  ip: string;
  userAgent?: string;
  honeypot?: string;
  startTime?: number;
  email?: string;
}): BotCheckResult {
  const reasons: string[] = [];
  let score = 0;
  
  // Rate limiting check
  if (!rateLimiter.isAllowed(data.ip, 3, 60000)) {
    reasons.push('Too many requests');
    score += 40;
  }
  
  // User agent check
  if (!validateUserAgent(data.userAgent)) {
    reasons.push('Suspicious user agent');
    score += 30;
  }
  
  // Honeypot check
  if (!validateHoneypot(data.honeypot)) {
    reasons.push('Honeypot field filled');
    score += 50; // High confidence bot indicator
  }
  
  // Timing check
  if (data.startTime && !validateTiming(data.startTime, 1500)) {
    reasons.push('Form submitted too quickly');
    score += 25;
  }
  
  // Email validation
  if (data.email) {
    const emailCheck = validateEmail(data.email);
    if (!emailCheck.valid) {
      reasons.push(`Invalid email: ${emailCheck.reason}`);
      score += 20;
    }
  }
  
  return {
    isBot: score >= 50, // Threshold for bot detection
    reasons,
    score
  };
}

// Clean up rate limiter every 5 minutes
if (typeof window === 'undefined') { // Server-side only
  setInterval(() => {
    rateLimiter.cleanup();
  }, 300000);
}