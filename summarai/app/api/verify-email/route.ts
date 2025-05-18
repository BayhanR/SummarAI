import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return new NextResponse("Doğrulama tokeni eksik", { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        verificationToken: token
      }
    });

    if (!user) {
      return new NextResponse("Geçersiz doğrulama tokeni", { status: 400 });
    }

    // Kullanıcıyı doğrula ve tokeni temizle
    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        emailVerified: new Date(),
        verificationToken: null
      }
    });

    // Başarılı doğrulama sonrası kullanıcıyı yönlendir
    return NextResponse.redirect(new URL('/signin?verified=true', request.url));
  } catch (error) {
    console.error('E-posta doğrulama hatası:', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 