import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import { sendVerificationEmail } from "@/app/lib/mail";

// Veritabanı bağlantısını kurmayı deneyelim
let prisma: PrismaClient;

try {
  console.log('Prisma istemcisi oluşturuluyor...');
  console.log('Environment variables kontrol:', {
    hasPrismaURL: !!process.env.POSTGRES_PRISMA_URL,
    hasNonPoolingURL: !!process.env.POSTGRES_URL_NON_POOLING,
    // Değerlerin ilk 10 karakterini logla (güvenlik için sadece başlangıcı)
    prismaURLStart: process.env.POSTGRES_PRISMA_URL ? process.env.POSTGRES_PRISMA_URL.substring(0, 10) + '...' : 'yok',
    nonPoolingURLStart: process.env.POSTGRES_URL_NON_POOLING ? process.env.POSTGRES_URL_NON_POOLING.substring(0, 10) + '...' : 'yok',
  });
  prisma = new PrismaClient();
  console.log('Prisma istemcisi başarıyla oluşturuldu');
} catch (e) {
  console.error('Prisma başlatma hatası:', e);
  prisma = new PrismaClient();
}

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
      console.log('Veritabanı sorgusu başlatılıyor...');
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
      console.error('Veritabanı sorgu hatası (detaylı):', {
        mesaj: dbError instanceof Error ? dbError.message : String(dbError),
        stack: dbError instanceof Error ? dbError.stack : undefined
      });
      return new NextResponse(
        JSON.stringify({
          error: "Veritabanı hatası",
          details: dbError instanceof Error ? dbError.message : String(dbError)
        }),
        { status: 500 }
      );
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
        console.error('E-posta gönderme hatası (detaylı):', {
          mesaj: emailError instanceof Error ? emailError.message : String(emailError),
          stack: emailError instanceof Error ? emailError.stack : undefined
        });
        // E-posta gönderilemese bile kullanıcı kaydını tamamlayalım
      }

      return NextResponse.json({
        user,
        message: "Kayıt başarılı. Lütfen e-posta adresinizi doğrulayın."
      });
    } catch (createError) {
      console.error('Kullanıcı oluşturma hatası (detaylı):', {
        mesaj: createError instanceof Error ? createError.message : String(createError),
        stack: createError instanceof Error ? createError.stack : undefined
      });
      return new NextResponse(
        JSON.stringify({
          error: "Kullanıcı oluşturma hatası",
          details: createError instanceof Error ? createError.message : String(createError)
        }),
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Genel kayıt hatası (detaylı):', {
      mesaj: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    return new NextResponse(
      JSON.stringify({ 
        error: "Kayıt işlemi başarısız", 
        details: error instanceof Error ? error.message : "Bilinmeyen hata",
        stack: error instanceof Error ? error.stack : undefined
      }), 
      { status: 500 }
    );
  } finally {
    try {
      await prisma.$disconnect();
    } catch (e) {
      console.error('Prisma bağlantısı kapatılırken hata:', e);
    }
  }
} 