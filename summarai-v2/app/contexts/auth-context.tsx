"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  id: string
  username: string
  email: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (username: string, email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if user exists in localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      type StoredUser = User & { password: string }
      const foundUser = users.find((u: StoredUser) => u.email === email && u.password === password)

      if (foundUser) {
        const { password, ...userWithoutPassword } = foundUser
        setUser(userWithoutPassword)
        localStorage.setItem("user", JSON.stringify(userWithoutPassword))
        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
        // Log initial registration attempt
        console.log('🚀 Registration Started:', { username, email });

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Get existing users and log current storage state
        const users = JSON.parse(localStorage.getItem("users") || "[]")
        console.log('📦 Current Users in Storage:', users);

        // Check if user already exists
        const userExists = users.some((u: any) => u.email === email)
        if (userExists) {
            console.log('❌ Registration Failed: User already exists');
            return false
        }

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            username,
            email,
            password,
        }
        console.log('👤 New User Created:', { ...newUser, password: '***' });

        // Save user to localStorage
        users.push(newUser)
        localStorage.setItem("users", JSON.stringify(users))
        console.log('💾 Users Saved to Storage');

        // Log in the user
        const { password: _, ...userWithoutPassword } = newUser
        setUser(userWithoutPassword)
        localStorage.setItem("user", JSON.stringify(userWithoutPassword))
        console.log('✅ User Logged In:', userWithoutPassword);

        return true
    } catch (error) {
        console.error('❌ Registration Error:', error);
        return false
    } finally {
        setIsLoading(false)
        console.log('🏁 Registration Process Completed');
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

