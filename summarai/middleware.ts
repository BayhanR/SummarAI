import { NextResponse } from "next/server"
import { auth } from "@/app/lib/auth"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path is protected
  const protectedPaths = ["/dashboard", "/profile", "/settings"]
  const isPathProtected = protectedPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))

  if (isPathProtected) {
    const session = await auth()

    if (!session) {
      const url = new URL("/signin", request.url)
      url.searchParams.set("callbackUrl", encodeURI(pathname))
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/settings/:path*"],
}

