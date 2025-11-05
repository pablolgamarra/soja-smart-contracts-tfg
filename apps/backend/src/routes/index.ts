import { Router } from 'express';
import routerContrato from '@routes/contratos/contratos.ts';
import routerOtp from '@routes/otp/otp.ts';
import { handleError, requestLogger, responseLogger, validateJSONReqs } from '@middlewares/index.ts';

const router = Router();

// Middlewares
router.use(requestLogger);
router.use(responseLogger);
router.use(validateJSONReqs);

// Rutas
// Contratos
router.use('/contratos', routerContrato);

// OTP
router.use('/otp', routerOtp);

// Logguear Respuestas

// Manejador de Errores
router.use(handleError);

export default router;