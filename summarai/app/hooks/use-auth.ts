import { useSession } from "next-auth/react"

export const useAuth = () => {
  const { data: session, status } = useSession()

  return {
    user: session?.user,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
  }
} 