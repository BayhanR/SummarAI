import nodemailer from 'nodemailer';
import { env } from './config';

// Mailtrap için transporter oluşturma
export const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: env.MAILTRAP_USER,
    pass: env.MAILTRAP_PASS
  }
});

// E-posta doğrulama maili gönderme fonksiyonu
export const sendVerificationEmail = async (email: string, token: string) => {
  console.log('E-posta gönderiliyor...', {
    hasUser: !!env.MAILTRAP_USER,
    hasPass: !!env.MAILTRAP_PASS
  });

  const verificationLink = `${env.NEXTAUTH_URL}/verify-email?token=${token}`;

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
    console.log('Mail gönderme denemesi başlıyor...');
    const info = await transporter.sendMail(mailOptions);
    console.log('Mail gönderildi:', info);
    return { success: true };
  } catch (error) {
    console.error('E-posta gönderme hatası:', error);
    return { success: false, error };
  }
};