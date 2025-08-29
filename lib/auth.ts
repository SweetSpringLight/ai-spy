// Authentication types
export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
  avatar?: string
  createdAt?: string
  lastLogin?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  success: boolean
  message: string
  user: User
  token: string
  expiresAt: string
}

export interface AuthError {
  error: string
  details?: unknown
}

// Mock authentication service
export class MockAuthService {
  private static readonly API_BASE = '/api/auth'

  static async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await fetch(`${this.API_BASE}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    if (!response.ok) {
      const error: AuthError = await response.json()
      throw new Error(error.error || 'Login failed')
    }

    return response.json()
  }

  static async logout(): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`${this.API_BASE}/logout`, {
      method: 'POST',
    })

    if (!response.ok) {
      throw new Error('Logout failed')
    }

    return response.json()
  }

  static async getProfile(userId: string): Promise<User> {
    const response = await fetch(`${this.API_BASE}/profile?userId=${userId}`)

    if (!response.ok) {
      throw new Error('Failed to fetch profile')
    }

    const data = await response.json()
    return data.user
  }

  // Mock user credentials for testing
  static getMockCredentials() {
    return {
      admin: { email: 'admin@example.com', password: 'admin123' },
      user: { email: 'user@example.com', password: 'user123' },
      demo: { email: 'demo@example.com', password: 'demo123' }
    }
  }
}

// Local storage utilities for token management
export const TokenStorage = {
  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token)
    }
  },

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token')
    }
    return null
  },

  removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token')
    }
  },

  isTokenValid(token: string): boolean {
    try {
      // In a real app, you would decode and validate the JWT token
      // For mock purposes, we'll just check if it exists and has the right format
      return token.startsWith('mock_token_') && token.length > 20
    } catch {
      return false
    }
  }
}
