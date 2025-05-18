export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    // Auth sayfaları hariç tüm API rotalarını koru
    '/api/:path*',
    // Özel sayfaları koru
    '/dashboard/:path*',
    '/profile/:path*',
  ]
} 