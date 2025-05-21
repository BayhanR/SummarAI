import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Basit bir sorgu deneyelim - kullanıcı sayısını alalım
    const userCount = await prisma.user.count();
    
    return NextResponse.json({
      success: true,
      message: "Veritabanı bağlantısı başarılı!",
      userCount: userCount
    });
  } catch (error) {
    console.error("Veritabanı hatası:", error);
    return NextResponse.json({
      success: false,
      message: "Veritabanı bağlantısı başarısız!",
      error: error instanceof Error ? error.message : "Bilinmeyen hata"
    }, { status: 500 });
  }
} 