import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Import middleware
import { setupMiddleware } from './middleware';

// Import services
import { verifyEmailConfig, testEmailConfig } from './services/email';
import { testRecaptchaConfig } from './services/recaptcha';

// Import routes
import { setupRoutes } from './routes';

// Import utilities
import { logger } from './utils/logger';

// Load environment variables
dotenv.config();

console.log('EMAIL_USER value length:', process.env.EMAIL_USER?.length || 0);
console.log('EMAIL_APP_PASSWORD value length:', process.env.EMAIL_APP_PASSWORD?.length || 0);

// Get current file and directory paths (ESM replacement for __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;
const isDevelopment = process.env.NODE_ENV === 'development';

// Setup all middleware
setupMiddleware(app);

// Setup all routes
setupRoutes(app);

// Serve static files from the React app in production
if (!isDevelopment) {
  app.use(express.static(join(__dirname, '../../dist')));
  
  // For all other GET requests not handled, return the React app
  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(join(__dirname, '../../dist/index.html'));
  });
}

// Error handling middleware (should be applied last)
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  logger.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Verify configurations on startup
const verifyConfigurations = async () => {
  logger.info('Verifying server configurations...');
  
  // Check Email configuration
  const emailConfigured = await verifyEmailConfig();
  
  // Check reCAPTCHA configuration
  const recaptchaConfigured = testRecaptchaConfig();
  
  // If in development mode, optionally test the email service
  if (isDevelopment && process.env.TEST_EMAIL === 'true') {
    await testEmailConfig();
  }
  
  return {
    email: emailConfigured,
    recaptcha: recaptchaConfigured
  };
};

// Start the server
const startServer = async () => {
  try {
    // Verify configurations first
    const config = await verifyConfigurations();
    
    // Start listening
    app.listen(PORT, () => {
      logger.info(`
========================================
🚀 Server running on port ${PORT}
📧 Email service: ${config.email ? 'Configured' : 'NOT CONFIGURED'}
🔐 reCAPTCHA: ${config.recaptcha ? 'Configured' : 'NOT CONFIGURED'}
🔧 Environment: ${process.env.NODE_ENV || 'not set'}
========================================
      `);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();

export default app;