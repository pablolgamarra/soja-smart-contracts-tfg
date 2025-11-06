import { Router } from "express";
import otpController from "src/controllers/otp/otpController.ts";

const router = Router();

router.post("/generate", otpController.generarOTP);
router.post("/verify", otpController.verificarOTP);

export default router;
