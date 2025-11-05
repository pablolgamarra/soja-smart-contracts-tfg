import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

// Imprimir logs para registro de solicitudes
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} Request. TIME: ${new Date(Date.now())}. Host: ${req.host}. Path: ${req.originalUrl}`)
    next();
}

// Imprimir logs para registro de respuestas
export const responseLogger = (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();
    let alreadyLogged = false;

    const log = (body: any) => {
        if(alreadyLogged) return;

        alreadyLogged = true;


        const duration = Date.now() - startTime;
        console.log(`[${res.statusCode}] ${req.method} ${req.originalUrl} (${duration}ms)`);
        
        if (process.env.NODE_ENV !== "production") {
            try {

                console.log("Response:", JSON.stringify(body, null, 2));
            } catch {
                console.log("Response (non-JSON)");
            }
        }
    }

    // Guardar referencia original a res.json o res.send
    const originalJson = res.json.bind(res);
    const originalSend = res.send.bind(res);

    // Sobrescribir res.json
    res.json = (body: any) => {
        log(body);
        return originalJson(body);
    };


    // Sobrescribir res.send (para respuestas que no usan JSON)
    res.send = (body: any) => {
        log(body);
        return originalSend(body);
    };

    next();
};

// Validador de solicitudes que deberían usar JSON
export const validateJSONReqs = (req:Request, res:Response, next:NextFunction) => {
    if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
        if (req.get('Content-Type') !== 'application/json') {
            return res.status(400).json({ error: 'Content-Type must be application/json' });
        }
    }

    next();
};

//Manejar errores
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
