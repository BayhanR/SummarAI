import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/app/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";
import { env } from "@/app/lib/config";

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma) as any,
  secret: env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Şifre", type: "password" }
      },
      async authorize(credentials) {
        console.log('Auth işlemi başlatıldı');
        if (!credentials?.email || !credentials?.password) {
          console.log('Credentials eksik:', { email: !!credentials?.email, password: !!credentials?.password });
          throw new Error('Lütfen email ve şifre giriniz');
        }
        const normalizedEmail = (credentials.email as string).toLowerCase();
        console.log('Email normalize edildi:', normalizedEmail);
        const user = await prisma.user.findUnique({
          where: { email: normalizedEmail },
          select: {
            id: true,
            email: true,
            name: true,
            hashedPassword: true,
            emailVerified: true
          }
        });
        console.log('Kullanıcı sorgusu sonucu:', { found: !!user, hasPassword: !!user?.hashedPassword, isVerified: !!user?.emailVerified });
        if (!user || !user.hashedPassword) {
          throw new Error('Kullanıcı bulunamadı');
        }
        if (!user.emailVerified) {
          throw new Error('Lütfen önce e-posta adresinizi doğrulayın');
        }
        const passwordMatch = await bcrypt.compare(credentials.password as string, user.hashedPassword);
        console.log('Şifre kontrolü:', { passwordMatch });
        if (!passwordMatch) {
          throw new Error('Hatalı şifre');
        }
        console.log('Giriş başarılı, kullanıcı döndürülüyor');
        return {
          id: user.id,
          email: user.email,
          name: user.name
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60 // 7 gün
  },
  pages: {
    signIn: "/signin",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log('JWT oluşturuluyor:', { userId: user.id });
        return {
          ...token,
          id: user.id,
          accessToken: token.jti,
        };
      }
      return token;
    },
    async session({ session, token }) {
      console.log('Session oluşturuluyor');
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          accessToken: token.accessToken as string,
        },
      };
    },
  },
};

