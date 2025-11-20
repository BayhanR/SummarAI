import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "../../auth/[...nextauth]/authOptions";

const prisma = new PrismaClient();

export async function DELETE() {
  try {
    const session = await getServerSession(authOptions);

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