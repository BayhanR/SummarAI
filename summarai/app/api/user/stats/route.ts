import { NextResponse } from "next/server";
import { auth } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Oturum açmanız gerekiyor' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        emailVerified: true,
        dailyUsage: true,
        lastUsageDate: true,
        userType: true
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
        where: { email: session.user.email },
        data: { dailyUsage: 0, lastUsageDate: new Date() }
      });
      user.dailyUsage = 0;
    }

    // Pro kullanıcının günlük limit sayısı
    const dailyLimit = user.userType === "pro" ? 50 : 5;

    return NextResponse.json({
      dailyUsage: user.dailyUsage,
      emailVerified: !!user.emailVerified,
      userType: user.userType,
      dailyLimit: dailyLimit
    });
  } catch (error) {
    console.error('Kullanıcı istatistikleri alınırken hata:', error);
    return NextResponse.json(
      { error: 'Kullanıcı istatistikleri alınırken bir hata oluştu' },
      { status: 500 }
    );
  }
} 