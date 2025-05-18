import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";

const prisma = new PrismaClient();

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Şifre", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log('Credentials eksik:', { email: !!credentials?.email, password: !!credentials?.password });
          throw new Error('Lütfen email ve şifre giriniz');
        }

        const normalizedEmail = credentials.email.toLowerCase();

        const user = await prisma.user.findUnique({
          where: {
            email: normalizedEmail
          },
          select: {
            id: true,
            email: true,
            name: true,
            hashedPassword: true,
            emailVerified: true
          }
        });

        console.log('Bulunan kullanıcı:', { 
          found: !!user,
          hasPassword: !!user?.hashedPassword
        });

        if (!user || !user.hashedPassword) {
          throw new Error('Kullanıcı bulunamadı');
        }

        if (!user.emailVerified) {
          throw new Error('Lütfen önce e-posta adresinizi doğrulayın');
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        console.log('Şifre eşleşmesi:', { passwordMatch });

        if (!passwordMatch) {
          throw new Error('Hatalı şifre');
        }

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
        return {
          ...token,
          id: user.id,
          accessToken: token.jti,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          accessToken: token.accessToken,
        },
      };
    },
  },
};

export { authOptions };
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 