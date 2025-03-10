import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email ve şifre gereklidir" }, { status: 400 })
    }

    // Burada gerçek auth API'nize bağlanacaksınız
    // Şimdilik mock bir yanıt dönüyoruz

    // Simüle edilmiş API yanıtı
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Basit doğrulama kontrolü (gerçek projede API kullanın)
    if (email === "test@example.com" && password === "password") {
      return NextResponse.json({
        user: {
          id: "1",
          email: "test@example.com",
          name: "Test User",
        },
        token: "mock-jwt-token",
      })
    } else {
      return NextResponse.json({ error: "Geçersiz kimlik bilgileri" }, { status: 401 })
    }
  } catch (error) {
    console.error("Giriş hatası:", error)
    return NextResponse.json({ error: "Giriş yapılırken bir hata oluştu" }, { status: 500 })
  }
}

