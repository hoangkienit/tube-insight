import { Request, Response, NextFunction, RequestHandler } from 'express';

export const asyncHandler = (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>  // 👈 Cho phép mọi kiểu trả về
): RequestHandler => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};