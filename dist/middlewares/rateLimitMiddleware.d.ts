import { Request, Response, NextFunction } from 'express';
declare const rateLimitMiddleware: (req: Request, res: Response, next: NextFunction) => void;
export default rateLimitMiddleware;
