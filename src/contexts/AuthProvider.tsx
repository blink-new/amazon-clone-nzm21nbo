import React, { useState, useEffect } from 'react'
import { AuthContext } from './auth-context'
import { User } from '../types/auth'
import { blink } from '../blink/client'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged(async (state) => {
      setLoading(state.isLoading)
      
      if (state.user) {
        // Check if user exists in our database, create if not
        try {
          const existingUsers = await blink.db.users.list({
            where: { userId: state.user.id },
            limit: 1
          })

          let userData
          if (existingUsers.length === 0) {
            // Create new user record
            userData = await blink.db.users.create({
              id: `user_${Date.now()}`,
              userId: state.user.id,
              displayName: state.user.email?.split('@')[0] || 'User',
              email: state.user.email || '',
              trustScore: 100,
              totalSales: 0,
              totalPurchases: 0
            })
          } else {
            userData = existingUsers[0]
          }

          setUser({
            id: state.user.id,
            email: state.user.email || '',
            displayName: userData.displayName,
            avatarUrl: userData.avatarUrl,
            trustScore: Number(userData.trustScore),
            totalSales: Number(userData.totalSales),
            totalPurchases: Number(userData.totalPurchases)
          })
        } catch (error) {
          console.error('Error setting up user:', error)
          setUser({
            id: state.user.id,
            email: state.user.email || '',
            displayName: state.user.email?.split('@')[0] || 'User'
          })
        }
      } else {
        setUser(null)
      }
    })

    return unsubscribe
  }, [])

  const login = () => {
    blink.auth.login()
  }

  const logout = () => {
    blink.auth.logout()
    setUser(null)
  }

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return

    try {
      await blink.db.users.update(user.id, {
        displayName: data.displayName,
        avatarUrl: data.avatarUrl
      })

      setUser(prev => prev ? { ...prev, ...data } : null)
    } catch (error) {
      console.error('Error updating profile:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}