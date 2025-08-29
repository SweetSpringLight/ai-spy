'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { MockAuthService, TokenStorage, User, LoginCredentials } from '@/lib/auth'

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
    isAuthenticated: false,
  })

  const router = useRouter()

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = () => {
      const token = TokenStorage.getToken()

      if (token && TokenStorage.isTokenValid(token)) {
        // Extract user ID from token (mock implementation)
        const userId = token.split('_')[2] // mock_token_1_timestamp -> 1

        MockAuthService.getProfile(userId)
          .then(user => {
            setAuthState({
              user,
              token,
              isLoading: false,
              isAuthenticated: true,
            })
          })
          .catch(() => {
            // Token is invalid, clear it
            TokenStorage.removeToken()
            setAuthState({
              user: null,
              token: null,
              isLoading: false,
              isAuthenticated: false,
            })
          })
      } else {
        setAuthState({
          user: null,
          token: null,
          isLoading: false,
          isAuthenticated: false,
        })
      }
    }

    checkAuth()
  }, [])

  // Login function
  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }))

      const response = await MockAuthService.login(credentials)

      // Store token
      TokenStorage.setToken(response.token)

      // Update state
      setAuthState({
        user: response.user,
        token: response.token,
        isLoading: false,
        isAuthenticated: true,
      })

      // Redirect to dashboard
      router.push('/dashboard')

      return { success: true, message: response.message }
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }))
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Login failed'
      }
    }
  }, [router])

  // Logout function
  const logout = useCallback(async () => {
    try {
      await MockAuthService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Clear token and state
      TokenStorage.removeToken()
      setAuthState({
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
      })

      // Redirect to login
      router.push('/login')
    }
  }, [router])

  // Auto-fill demo credentials
  const fillDemoCredentials = useCallback((type: 'admin' | 'user' | 'demo') => {
    const credentials = MockAuthService.getMockCredentials()
    return credentials[type]
  }, [])

  return {
    ...authState,
    login,
    logout,
    fillDemoCredentials,
  }
}
