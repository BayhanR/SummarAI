import { NextResponse } from "next/server";
import { transporter } from "@/app/lib/mail";

export async function GET() {
  try {
    const mailOptions = {
      from: '"SummarAI Test 👻" <test@summarai.com>',
      to: "test@example.com", // Buraya kendi e-posta adresinizi yazın
      subject: "Mailtrap Test E-postası ✔",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Test E-postası</h2>
          <p>Merhaba,</p>
          <p>Bu bir test e-postasıdır. Gönderilme zamanı: ${new Date().toLocaleString()}</p>
          <p>İyi günler,<br>SummarAI Ekibi</p>
        </div>
      `
    };

    console.log('E-posta gönderiliyor...');
    const info = await transporter.sendMail(mailOptions);
    console.log('E-posta gönderildi:', info);

    return NextResponse.json({ 
      success: true, 
      messageId: info.messageId,
      previewUrl: `https://mailtrap.io/inboxes/test/messages/${info.messageId}`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('E-posta gönderme hatası:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Bilinmeyen hata",
        timestamp: new Date().toISOString()
      }, 
      { status: 500 }
    );
  }
} 