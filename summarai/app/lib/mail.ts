import nodemailer from 'nodemailer';

// Mailtrap için transporter oluşturma
export const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS
  }
});

// E-posta doğrulama maili gönderme fonksiyonu
export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationLink = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;

  const mailOptions = {
    from: '"SummarAI 👻" <dogrulama@summarai.com>',
    to: email,
    subject: "E-posta Adresinizi Doğrulayın ✔",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>E-posta Doğrulama</h2>
        <p>Merhaba,</p>
        <p>SummarAI hesabınızı doğrulamak için lütfen aşağıdaki bağlantıya tıklayın:</p>
        <p>
          <a href="${verificationLink}" 
             style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
            E-posta Adresimi Doğrula
          </a>
        </p>
        <p>Bu bağlantı 24 saat boyunca geçerlidir.</p>
        <p>İyi günler,<br>SummarAI Ekibi</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('E-posta gönderme hatası:', error);
    return { success: false, error };
  }
}; 