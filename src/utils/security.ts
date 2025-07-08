/**
 * Security utilities for input validation and sanitization
 */

// Input validation patterns
export const VALIDATION_PATTERNS = {
  // Only allow alphanumeric characters and basic punctuation
  SAFE_TEXT: /^[a-zA-Z0-9\s\-_.,!?()]+$/,
  // Numbers only
  NUMBER_ONLY: /^\d+$/,
  // Basic email pattern (for future use)
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
} as const;

/**
 * Sanitize user input to prevent XSS attacks
 */
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') {
    return '';
  }
  
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .replace(/script/gi, '') // Remove script tags
    .trim()
    .slice(0, 1000); // Limit length
};

/**
 * Validate input against allowed patterns
 */
export const validateInput = (input: string, pattern: RegExp): boolean => {
  if (typeof input !== 'string') {
    return false;
  }
  
  return pattern.test(input) && input.length <= 1000;
};

/**
 * Generate a secure random ID
 */
export const generateSecureId = (): string => {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Rate limiting utility for preventing spam/abuse
 */
class RateLimiter {
  private attempts: Map<string, { count: number; resetTime: number }> = new Map();
  private readonly maxAttempts: number;
  private readonly windowMs: number;

  constructor(maxAttempts: number = 100, windowMs: number = 60000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const record = this.attempts.get(identifier);

    if (!record || now > record.resetTime) {
      this.attempts.set(identifier, { count: 1, resetTime: now + this.windowMs });
      return true;
    }

    if (record.count >= this.maxAttempts) {
      return false;
    }

    record.count++;
    return true;
  }

  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }
}

export const gameLimiter = new RateLimiter(1000, 60000); // 1000 actions per minute

/**
 * Secure local storage wrapper
 */
export const secureStorage = {
  setItem: (key: string, value: any): void => {
    try {
      const sanitizedKey = sanitizeInput(key);
      const serializedValue = JSON.stringify(value);
      
      if (sanitizedKey && serializedValue.length < 10000) {
        localStorage.setItem(`numbpair_${sanitizedKey}`, serializedValue);
      }
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  },

  getItem: (key: string): any => {
    try {
      const sanitizedKey = sanitizeInput(key);
      const item = localStorage.getItem(`numbpair_${sanitizedKey}`);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.warn('Failed to read from localStorage:', error);
      return null;
    }
  },

  removeItem: (key: string): void => {
    try {
      const sanitizedKey = sanitizeInput(key);
      localStorage.removeItem(`numbpair_${sanitizedKey}`);
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error);
    }
  }
};

/**
 * Prevent timing attacks by adding consistent delays
 */
export const constantTimeDelay = async (minMs: number = 100): Promise<void> => {
  const delay = minMs + Math.random() * 50; // Add some randomness
  return new Promise(resolve => setTimeout(resolve, delay));
};

/**
 * Validate game state integrity
 */
export const validateGameState = (gameState: any): boolean => {
  if (!gameState || typeof gameState !== 'object') {
    return false;
  }

  // Validate score is reasonable
  if (typeof gameState.score !== 'number' || gameState.score < 0 || gameState.score > 1000000) {
    return false;
  }

  // Validate moves count
  if (typeof gameState.moves !== 'number' || gameState.moves < 0 || gameState.moves > 10000) {
    return false;
  }

  return true;
};