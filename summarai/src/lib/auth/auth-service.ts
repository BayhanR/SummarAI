import type { AuthResponse, LoginCredentials, RegisterData, User } from "./types"

// Bu bir mock servis - gerçek auth API'niz ile değiştirilecek
export class AuthService {
  private static instance: AuthService
  private token: string | null = null
  private user: User | null = null

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Burada gerçek API'nize bağlanacaksınız
    console.log("Login attempt with:", credentials.email)

    // Mock yanıt
    const mockUser: User = {
      id: "1",
      username: "testuser",
      email: credentials.email,
      name: "Test User",
      role: "user",
      createdAt: new Date(),
    }

    const mockResponse: AuthResponse = {
      user: mockUser,
      token: "mock-jwt-token",
      expiresAt: Date.now() + 3600000, // 1 saat
    }

    // Token ve kullanıcı bilgilerini saklama
    this.token = mockResponse.token
    this.user = mockResponse.user

    return mockResponse
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    // Burada gerçek API'nize bağlanacaksınız
    console.log("Register attempt with:", data.email)

    // Mock yanıt
    const mockUser: User = {
      id: "1",
      username: data.username,
      email: data.email,
      name: data.name,
      role: "user",
      createdAt: new Date(),
    }

    const mockResponse: AuthResponse = {
      user: mockUser,
      token: "mock-jwt-token",
      expiresAt: Date.now() + 3600000, // 1 saat
    }

    // Token ve kullanıcı bilgilerini saklama
    this.token = mockResponse.token
    this.user = mockResponse.user

    return mockResponse
  }

  async logout(): Promise<void> {
    // Token ve kullanıcı bilgilerini temizleme
    this.token = null
    this.user = null
  }

  getToken(): string | null {
    return this.token
  }

  getUser(): User | null {
    return this.user
  }

  isAuthenticated(): boolean {
    return !!this.token
  }
}

export const authService = AuthService.getInstance()

