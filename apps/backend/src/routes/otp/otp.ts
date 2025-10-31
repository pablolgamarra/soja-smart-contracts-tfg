import {Router} from 'express';

const router = Router();

router.post("/otp/generate", async (req, res) => {
    const { contractId, sellerAddress, phone } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await OTPModel.create({
        otp,
        contractId,
        sellerAddress,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 min
        used: false,
    });

    await sendOTPViaWhatsApp(phone, otp);

    res.json({ success: true, message: "OTP enviado correctamente." });
});
