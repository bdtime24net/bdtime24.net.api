import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';


// Configure rate limiting
const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  headers: true, // Add RateLimit headers to the response
});

// Middleware function to apply rate limiting
const rateLimitMiddleware = (req: Request, res: Response, next: NextFunction) => {
  rateLimiter(req, res, next);
};

export default rateLimitMiddleware;
