export interface User {
  id: string
  email: string
  displayName?: string
  avatarUrl?: string
  trustScore?: number
  totalSales?: number
  totalPurchases?: number
}

export interface AuthContextType {
  user: User | null
  loading: boolean
  login: () => void
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<void>
}