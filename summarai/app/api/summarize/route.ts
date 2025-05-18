import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/app/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ 
        error: 'Oturum açmanız gerekiyor',
        redirectTo: '/signin'
      }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        emailVerified: true,
        dailyUsage: true,
        lastUsageDate: true
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'Kullanıcı bulunamadı' }, { status: 404 });
    }

    // Gün değiştiyse kullanım sayısını sıfırla
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lastUsage = new Date(user.lastUsageDate);
    lastUsage.setHours(0, 0, 0, 0);

    if (today.getTime() !== lastUsage.getTime()) {
      await prisma.user.update({
        where: { id: user.id },
        data: { dailyUsage: 0, lastUsageDate: new Date() }
      });
      user.dailyUsage = 0;
    }

    // E-posta doğrulanmamış ve 1 kullanım hakkını doldurmuşsa
    if (!user.emailVerified && user.dailyUsage >= 1) {
      return NextResponse.json({
        error: 'Daha fazla özet oluşturmak için lütfen e-posta adresinizi doğrulayın',
        redirectTo: '/verify-email'
      }, { status: 403 });
    }

    // E-posta doğrulanmış ve 5 kullanım hakkını doldurmuşsa
    if (user.emailVerified && user.dailyUsage >= 5) {
      return NextResponse.json({
        error: 'Günlük özet hakkınız doldu',
        redirectTo: '/footerPages/pricing'
      }, { status: 403 });
    }

    const { content } = await request.json();

    if (!content) {
      return NextResponse.json({ error: 'Özetlenecek metin gerekli' }, { status: 400 });
    }

    // Burada API'den özet alınacak
    const summary = "API'den gelen özet"; // Bu kısmı daha sonra gerçek API ile değiştireceğiz

    // Kullanım sayısını artır
    await prisma.user.update({
      where: { id: user.id },
      data: {
        dailyUsage: user.dailyUsage + 1,
        lastUsageDate: new Date()
      }
    });

    // Özeti veritabanına kaydet
    await prisma.summary.create({
      data: {
        userId: user.id,
        content: content,
        result: summary
      }
    });

    return NextResponse.json({ summary });
  } catch (error) {
    console.error('Özet oluşturma hatası:', error);
    return NextResponse.json({ error: 'Özet oluşturulurken bir hata oluştu' }, { status: 500 });
  }
} 