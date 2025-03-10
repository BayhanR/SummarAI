import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, password, username, name } = await request.json()

    if (!email || !password || !username) {
      return NextResponse.json({ error: "Email, şifre ve kullanıcı adı gereklidir" }, { status: 400 })
    }

    // Burada gerçek auth API'nize bağlanacaksınız
    // Şimdilik mock bir yanıt dönüyoruz

    // Simüle edilmiş API yanıtı
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock kayıt yanıtı (gerçek projede API kullanın)
    return NextResponse.json({
      user: {
        id: "1",
        email,
        username,
        name,
        createdAt: new Date().toISOString(),
      },
      token: "mock-jwt-token",
    })
  } catch (error) {
    console.error("Kayıt hatası:", error)
    return NextResponse.json({ error: "Kayıt olurken bir hata oluştu" }, { status: 500 })
  }
}

