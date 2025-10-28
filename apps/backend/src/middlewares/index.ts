import { Request, Response, NextFunction } from "express";

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
