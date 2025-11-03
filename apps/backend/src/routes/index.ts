import { Router } from 'express';
import routerContrato from '@routes/contratos/contratos.ts';
import routerOtp from '@routes/otp/otp.ts';
import { handleError, requestLogger } from '@middlewares/index.ts';

const router = Router();

router.use(requestLogger);
router.use('/contratos', routerContrato);
router.use('/otp', routerOtp);

router.use(handleError);

export default router;