import { NextRequest, NextResponse } from 'next/server'

// Mock user database (same as login route)
const mockUsers = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    avatar: '/avatars/admin.jpg',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    email: 'user@example.com',
    name: 'Regular User',
    role: 'user',
    avatar: '/avatars/user.jpg',
    createdAt: '2024-01-02T00:00:00Z',
    lastLogin: '2024-01-15T09:15:00Z'
  },
  {
    id: '3',
    email: 'demo@example.com',
    name: 'Demo User',
    role: 'user',
    avatar: '/avatars/demo.jpg',
    createdAt: '2024-01-03T00:00:00Z',
    lastLogin: '2024-01-15T08:45:00Z'
  }
]

export async function GET(request: NextRequest) {
  try {
    // In a real app, you would get the user ID from the authenticated token
    // For mock purposes, we'll get it from query params
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const user = mockUsers.find(u => u.id === userId)

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      user
    })

  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
