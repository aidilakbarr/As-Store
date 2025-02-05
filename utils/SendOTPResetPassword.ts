import nodemailer from "nodemailer";

const userEmail = process.env.EMAIL;
const userPassword = process.env.EMAIL_PASSWORD;
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  tls: {
    ciphers: "SSLv3",
  },
  auth: {
    user: userEmail,
    pass: userPassword,
  },
});

const sendOTP = async (user: string, otp: string, email: string) => {
  const subject = "Kode OTP Anda untuk Reset Password";
  const text = `Halo ${user},\n\nKami menerima permintaan untuk verifikasi akun Anda. Untuk melanjutkan, masukkan kode OTP berikut:\n\nKode OTP: ${otp}\n\nHarap dicatat bahwa kode ini berlaku selama 5 menit dan hanya dapat digunakan sekali.\n\nJika Anda tidak meminta verifikasi ini, abaikan email ini.\n\nTerima kasih,\nEmisiku`;
  try {
    const info = await transporter.sendMail({
      from: `"Emisiku" <${userEmail}>`,
      to: email,
      subject,
      text,
    });

    console.log("Email sent " + info);
  } catch (error) {
    console.log("Error sending email ", error);
  }
};
export default sendOTP;
