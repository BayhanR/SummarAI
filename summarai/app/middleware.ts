import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Public paths that don't require authentication
  const publicPaths = ['/signin', '/signup', '/api/auth'];
  
  const path = request.nextUrl.pathname;
  
  if (publicPaths.some(publicPath => path.startsWith(publicPath))) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    return new NextResponse(
      JSON.stringify({ error: 'Lütfen giriş yapın' }),
      { status: 401, headers: { 'content-type': 'application/json' } }
    );
  }

  return NextResponse.next();
} 