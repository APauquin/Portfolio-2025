import { Request, Response, NextFunction } from 'express';
import { logger } from './logger';

/**
 * Error handler middleware
 */
export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    logger.error('Server error:', err);

    // Determine if this is a known error type
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

    // Default to 500 internal server error
    return res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
};

/**
 * Async route handler wrapper to catch errors
 */
export const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};