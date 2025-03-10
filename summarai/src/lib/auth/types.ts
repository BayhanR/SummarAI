export interface User {
    id: string
    username: string
    email: string
    name?: string
    role: "user" | "admin"
    createdAt: Date
  }
  
  export interface AuthResponse {
    user: User
    token: string
    expiresAt: number
  }
  
  export interface LoginCredentials {
    email: string
    password: string
  }
  
  export interface RegisterData {
    username: string
    email: string
    password: string
    name?: string
  }
  
  