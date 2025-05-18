import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import { sendVerificationEmail } from "@/app/lib/mail";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    console.log('Gelen kayıt bilgileri:', { email, name, hasPassword: !!password });

    if (!email || !name || !password) {
      return new NextResponse("Eksik bilgi", { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (existingUser) {
      return new NextResponse("Email zaten kayıtlı", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const verificationToken = crypto.randomBytes(32).toString('hex');

    console.log('Kullanıcı oluşturuluyor:', {
      email,
      name,
      hashedPassword: !!hashedPassword,
      verificationToken: !!verificationToken
    });

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
        verificationToken,
        userType: "basic",
        dailyUsage: 0,
        lastUsageDate: new Date()
      }
    });

    console.log('Kullanıcı oluşturuldu:', { userId: user.id });

    try {
      await sendVerificationEmail(email, verificationToken);
      console.log('Doğrulama e-postası gönderildi');
    } catch (emailError) {
      console.error('E-posta gönderme hatası:', emailError);
      // E-posta gönderilemese bile kullanıcı kaydını tamamlayalım
    }

    return NextResponse.json({
      user,
      message: "Kayıt başarılı. Lütfen e-posta adresinizi doğrulayın."
    });
  } catch (error) {
    console.error('Kayıt hatası:', error);
    return new NextResponse(
      JSON.stringify({ 
        error: "Kayıt işlemi başarısız", 
        details: error instanceof Error ? error.message : "Bilinmeyen hata" 
      }), 
      { status: 500 }
    );
  }
} 