import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/app/lib/prisma";

export async function POST(request: Request) {
  try {
    // Oturum kontrolü
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ 
        error: 'Bu işlem için giriş yapmanız gerekiyor',
      }, { status: 401 });
    }

    // Kullanıcıyı bul
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        userType: true
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'Kullanıcı bulunamadı' }, { status: 404 });
    }

    // Ödeme bilgisi (gerçekte ödeme entegrasyonundan gelecek)
    const { planId } = await request.json();
    
    // Pro üyeliğe yükselt
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        userType: "pro",
        // Ödeme başarılı olduğunda günlük limit 50'ye çıkar
        dailyUsage: 0, // Yeni üyelikte günlük kullanımı sıfırla
      }
    });

    // Abonelik bilgisini kaydet (gerçek bir uygulamada burası daha detaylı olacaktır)
    // Örneğin: başlangıç tarihi, bitiş tarihi, abonelik ID'si vb. saklanabilir

    return NextResponse.json({
      success: true,
      message: "Pro aboneliğiniz aktif edildi. Artık günlük 50 özet hakkına sahipsiniz!",
      userType: updatedUser.userType
    });
  } catch (error) {
    console.error('Pro üyelik yükseltme hatası:', error);
    return NextResponse.json({ 
      error: 'Üyelik yükseltme işlemi sırasında bir hata oluştu'
    }, { status: 500 });
  }
} 