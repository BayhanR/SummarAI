import { z } from 'zod';

const envSchema = z.object({
  // Veritabanı
  POSTGRES_PRISMA_URL: z.string().url(),
  POSTGRES_URL_NON_POOLING: z.string().url(),
  
  // NextAuth
  NEXTAUTH_SECRET: z.string().min(1),
  NEXTAUTH_URL: z.string().url(),
  
  // Mailtrap
  MAILTRAP_USER: z.string().min(1),
  MAILTRAP_PASS: z.string().min(1),
});

export function validateEnv() {
  try {
    const parsed = envSchema.parse(process.env);
    return { success: true, env: parsed };
  } catch (error) {
    console.error('Environment variable validation failed:', error);
    return { success: false, error };
  }
}

// Environment variables'ları tip güvenli şekilde export edelim
export const env = envSchema.parse(process.env);