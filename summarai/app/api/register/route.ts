import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import { sendVerificationEmail } from "@/app/lib/mail";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    console.log('Register API çağrıldı');
    
    const body = await request.json();
    const { email, name, password } = body;

    console.log('Gelen veriler:', { 
      hasEmail: !!email, 
      hasName: !!name, 
      hasPassword: !!password 
    });

    // E-posta adresini küçük harfe çevir
    const normalizedEmail = email.toLowerCase();

    if (!email || !name || !password) {
      console.log('Eksik bilgi:', { email, name, hasPassword: !!password });
      return new NextResponse(
        JSON.stringify({ 
          error: "Eksik bilgi",
          details: { 
            email: !email, 
            name: !name, 
            password: !password 
          }
        }), 
        { status: 400 }
      );
    }

    try {
      const existingUser = await prisma.user.findUnique({
        where: {
          email: normalizedEmail
        }
      });

      console.log('Mevcut kullanıcı kontrolü:', { exists: !!existingUser });

      if (existingUser) {
        return new NextResponse(
          JSON.stringify({ error: "Email zaten kayıtlı" }), 
          { status: 400 }
        );
      }
    } catch (dbError) {
      console.error('Veritabanı sorgu hatası:', dbError);
      throw dbError;
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      const verificationToken = crypto.randomBytes(32).toString('hex');

      console.log('Kullanıcı oluşturma hazırlığı:', {
        email: normalizedEmail,
        name,
        hashedPassword: !!hashedPassword,
        verificationToken: !!verificationToken
      });

      const user = await prisma.user.create({
        data: {
          email: normalizedEmail,
          name,
          hashedPassword,
          verificationToken,
          userType: "basic",
          dailyUsage: 0,
          lastUsageDate: new Date()
        }
      });

      console.log('Kullanıcı başarıyla oluşturuldu:', { userId: user.id });

      try {
        await sendVerificationEmail(normalizedEmail, verificationToken);
        console.log('Doğrulama e-postası gönderildi');
      } catch (emailError) {
        console.error('E-posta gönderme hatası:', emailError);
        // E-posta gönderilemese bile kullanıcı kaydını tamamlayalım
      }

      return NextResponse.json({
        user,
        message: "Kayıt başarılı. Lütfen e-posta adresinizi doğrulayın."
      });
    } catch (createError) {
      console.error('Kullanıcı oluşturma hatası:', createError);
      throw createError;
    }
  } catch (error) {
    console.error('Genel kayıt hatası:', error);
    return new NextResponse(
      JSON.stringify({ 
        error: "Kayıt işlemi başarısız", 
        details: error instanceof Error ? error.message : "Bilinmeyen hata",
        stack: error instanceof Error ? error.stack : undefined
      }), 
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 