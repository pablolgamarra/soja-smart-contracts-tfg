import {Router} from 'express';
import {crearTransaccion} from '@services/relayerServices.ts'

const router = Router();

router.post('/firmar', async (req, res) => {
    try{
        const tx = await crearTransaccion(req.body);
        res.json(tx);
    }catch(e){
        console.error(e);
        res.status(500).send({error: 'Error interno del servidor'});
    }
})

export default router;