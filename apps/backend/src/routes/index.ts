import { Router } from 'express';
import routerContrato from '@routes/contratos/contratos.ts';
import { handleError } from '@middlewares/index.ts';

const router = Router();

router.use('/contratos', routerContrato);

router.use(handleError);

export default router;