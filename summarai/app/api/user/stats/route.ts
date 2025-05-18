import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/app/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Oturum açmanız gerekiyor' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
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
        where: { email: session.user.email },
        data: { dailyUsage: 0, lastUsageDate: new Date() }
      });
      user.dailyUsage = 0;
    }

    return NextResponse.json({
      dailyUsage: user.dailyUsage,
      emailVerified: !!user.emailVerified
    });
  } catch (error) {
    console.error('Kullanıcı istatistikleri alınırken hata:', error);
    return NextResponse.json(
      { error: 'Kullanıcı istatistikleri alınırken bir hata oluştu' },
      { status: 500 }
    );
  }
} 