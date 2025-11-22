import { NextResponse } from "next/server";
import { auth } from "@/app/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const summaries = await prisma.summary.findMany({
      where: {
        userId: session.user.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(summaries);
  } catch (error) {
    console.error("Özetler getirilirken hata:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 