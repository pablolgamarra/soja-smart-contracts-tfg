import { Router } from "express";
import { contratosController } from "@controllers/contratos/contratosController.ts";

const router = Router();

router.get("/:id", contratosController.obtenerPorId);
router.get("/eventos/:id", contratosController.obtenerEventoPorId);
router.post("/firmar", contratosController.firmarContrato);

export default router;
