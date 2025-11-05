import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.office365.com", // o tu servidor SMTP
    port: 587,
    secure: true,
    auth: {
        user: "virtual_ti@glymax.com",
        pass: "Virtual_TI",
    },
});

export async function sendOTPEmail(to: string, otp: string) {
    const mailOptions = {
        from: `"SoySmart Notificaciones" <${process.env.EMAIL_USER}>`,
        to,
        subject: "Tu código OTP para firmar contrato",
        html: `
      <h3>🔐 Código de verificación</h3>
      <p>Tu código OTP es: <strong>${otp}</strong></p>
      <p>Válido por 10 minutos.</p>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`📧 OTP enviado por correo a ${to}`);
    } catch (error) {
        console.error("❌ Error enviando correo OTP:", error);
    }
}
