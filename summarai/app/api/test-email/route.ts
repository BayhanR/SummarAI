import { NextResponse } from "next/server";
import { Resend } from "resend";
import { env } from "@/app/lib/config";

const resend = new Resend(env.RESEND_API_KEY);

export async function GET() {
  try {
    const fromEmail = env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    const testEmail = "test@example.com"; // Buraya kendi e-posta adresinizi yazın

    console.log('E-posta gönderiliyor...');
    const { data, error } = await resend.emails.send({
      from: `SummarAI Test <${fromEmail}>`,
      to: [testEmail],
      subject: "Resend Test E-postası ✔",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">Test E-postası</h2>
          <p>Merhaba,</p>
          <p>Bu bir test e-postasıdır. Gönderilme zamanı: ${new Date().toLocaleString('tr-TR')}</p>
          <p>Resend servisi başarıyla çalışıyor! 🎉</p>
          <p>İyi günler,<br><strong>SummarAI Ekibi</strong></p>
        </div>
      `
    });

    if (error) {
      console.error('Resend API hatası:', error);
      return NextResponse.json(
        { 
          success: false, 
          error: error.message || "Bilinmeyen hata",
          timestamp: new Date().toISOString()
        }, 
        { status: 500 }
      );
    }

    console.log('E-posta gönderildi:', data);

    return NextResponse.json({ 
      success: true, 
      messageId: data?.id,
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