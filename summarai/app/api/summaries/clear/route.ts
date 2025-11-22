import { NextResponse } from "next/server";
import { auth } from "@/app/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE() {
  try {
    const session = await auth();

    if (!session?.user) {
      return new NextResponse(
        JSON.stringify({ error: "Oturum açmanız gerekiyor" }),
        { status: 401 }
      );
    }

    // Kullanıcının tüm özetlerini sil
    await prisma.summary.deleteMany({
      where: {
        userId: session.user.id as string
      }
    });

    return new NextResponse(
      JSON.stringify({ message: "Geçmiş başarıyla temizlendi" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Geçmiş temizlenirken hata:", error);
    return new NextResponse(
      JSON.stringify({ error: "Geçmiş temizlenirken bir hata oluştu" }),
      { status: 500 }
    );
  }
} 