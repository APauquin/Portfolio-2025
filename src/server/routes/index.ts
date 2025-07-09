import { Express, Request, Response } from 'express';
import { contactFormLimiter } from '../middleware/index';
import { logger } from '../utils/logger';
import { asyncHandler } from '../utils/errorHandler';

// Import controllers
import { contactFormController } from '../controllers/contactForm';

/**
 * Set up all application routes
 * @param app Express application
 */
export const setupRoutes = (app: Express): void => {
  // API routes
  setupApiRoutes(app);
  
  // Test routes (only in development)
  if (process.env.NODE_ENV === 'development') {
    setupTestRoutes(app);
  }
  
  // Log all routes for debugging
  logRoutes(app);
};

/**
 * Set up API routes
 * @param app Express application
 */
const setupApiRoutes = (app: Express): void => {
  // Contact form endpoint with rate limiting
  app.post('/api/send-email', contactFormLimiter, asyncHandler(contactFormController));
};

/**
 * Set up test routes (only available in development)
 * @param app Express application
 */
const setupTestRoutes = (app: Express): void => {
  // Simple test endpoint to verify server is running
  app.get('/api/test', (_req: Request, res: Response) => {
    logger.info('Test endpoint hit');
    res.status(200).json({ 
      message: 'Server is running correctly',
      timestamp: new Date().toISOString()
    });
  });
};

/**
 * Log all registered routes for debugging
 * @param app Express application
 */
const logRoutes = (app: Express): void => {
  if (process.env.NODE_ENV === 'development') {
    const routes: string[] = [];
    
    // @ts-ignore - Accessing internal Express properties
    app._router?.stack?.forEach((middleware: any) => {
      if (middleware.route) {
        // Routes registered directly
        const methods = Object.keys(middleware.route.methods)
          .filter(method => middleware.route.methods[method])
          .map(method => method.toUpperCase())
          .join(', ');
        
        routes.push(`${methods} ${middleware.route.path}`);
      } else if (middleware.name === 'router') {
        // Routes registered through Router
        middleware.handle.stack?.forEach((handler: any) => {
          if (handler.route) {
            const methods = Object.keys(handler.route.methods)
              .filter(method => handler.route.methods[method])
              .map(method => method.toUpperCase())
              .join(', ');
              
            routes.push(`${methods} ${handler.route.path}`);
          }
        });
      }
    });
    
    if (routes.length > 0) {
      logger.info('Registered routes:');
      routes.forEach(route => logger.info(`- ${route}`));
    }
  }
};