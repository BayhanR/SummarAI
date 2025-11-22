import { Resend } from 'resend';
import { env } from './config';

// Resend client oluşturma
const resend = new Resend(env.RESEND_API_KEY);

// E-posta doğrulama maili gönderme fonksiyonu
export const sendVerificationEmail = async (email: string, token: string) => {
  console.log('E-posta gönderiliyor...', {
    hasApiKey: !!env.RESEND_API_KEY,
    email: email
  });

  const verificationLink = `${env.NEXTAUTH_URL}/verify-email?token=${token}`;
  const fromEmail = env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

  try {
    console.log('Mail gönderme denemesi başlıyor...');
    const { data, error } = await resend.emails.send({
      from: `SummarAI <${fromEmail}>`,
      to: [email],
      subject: "E-posta Adresinizi Doğrulayın ✔",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">E-posta Doğrulama</h2>
          <p>Merhaba,</p>
          <p>SummarAI hesabınızı doğrulamak için lütfen aşağıdaki bağlantıya tıklayın:</p>
          <p style="margin: 30px 0;">
            <a href="${verificationLink}" 
               style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
              E-posta Adresimi Doğrula
            </a>
          </p>
          <p style="color: #666; font-size: 14px;">Bu bağlantı 24 saat boyunca geçerlidir.</p>
          <p style="margin-top: 30px;">İyi günler,<br><strong>SummarAI Ekibi</strong></p>
        </div>
      `
    });

    if (error) {
      console.error('Resend API hatası:', error);
      return { success: false, error };
    }

    console.log('Mail gönderildi:', data);
    return { success: true, data };
  } catch (error) {
    console.error('E-posta gönderme hatası:', error);
    return { success: false, error };
  }
};