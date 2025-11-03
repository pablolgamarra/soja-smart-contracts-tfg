import { Request, Response, NextFunction } from "express";

export const requestLogger = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method}. TIME: ${new Date(Date.now())}. Host: ${req.host}. Path: ${req.url}`)
    next();
}

//Error handling middleware
export const handleError = (err:Error, req:Request, res:Response, next:NextFunction) => {
    console.error('API ERROR', err);

    if (err) {
        switch (err.name) {
            case 'ValidationError':
                return res.status(400).json({ error: err.message });
            case 'DatabaseError':
                return res.status(500).json({ error: 'Database error ocurred' });
            default:
                return res.status(500).json({ error: 'Internal server error' });
        }
    }

    next();
};
