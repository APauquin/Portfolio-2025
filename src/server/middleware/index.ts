import express from 'express';
import { Express, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

/**
 * General rate limiter middleware to protect against DoS attacks
 * Limits requests to 5 per 15 minutes per IP address
 */
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window per IP
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Too many requests, please try again later',
  skipSuccessfulRequests: false, // Count all requests
});

/**
 * Specific rate limiter for the contact form endpoint
 * Limits requests to 5 per hour per IP address
 */
export const contactFormLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 requests per hour per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests, please try again later'
  },
  skipSuccessfulRequests: false
});

/**
 * Setup security middleware
 * @param app Express application
 */
export const setupSecurityMiddleware = (app: Express): void => {
  // Apply Helmet for security headers
  app.use(helmet());
  
  // Enable CORS
  app.use(cors());
  
  // Add content-type validation
  app.use((req: Request, res: Response, next: NextFunction) => {
    // Only check content-type for POST, PUT, PATCH requests with content
    if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.headers['content-length'] !== '0') {
      const contentType = req.headers['content-type'];
      
      // Ensure JSON content-type for API endpoints
      if (req.path.startsWith('/api/') && (!contentType || !contentType.includes('application/json'))) {
        return res.status(415).json({
          success: false,
          message: 'Content-Type must be application/json for API requests'
        });
      }
    }
    
    next();
  });
};

/**
 * Error handler middleware
 */
export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Server error:', err);
  
  // Default to 500 internal server error
  return res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
};

/**
 * Setup all middleware for the Express application
 * @param app Express application
 */
export const setupMiddleware = (app: Express): void => {
  // Apply security middleware
  setupSecurityMiddleware(app);
  
  // Parse JSON body
  app.use(express.json());
  
  // Apply general rate limiting
  app.use(limiter);
  
  // Apply error handler middleware (should be applied last)
  app.use(errorHandler);
};