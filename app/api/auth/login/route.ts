import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Mock user database
const mockUsers = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    avatar: '/avatars/admin.jpg'
  },
  {
    id: '2',
    email: 'user@example.com',
    password: 'user123',
    name: 'Regular User',
    role: 'user',
    avatar: '/avatars/user.jpg'
  },
  {
    id: '3',
    email: 'demo@example.com',
    password: 'demo123',
    name: 'Demo User',
    role: 'user',
    avatar: '/avatars/demo.jpg'
  }
]

// Login validation schema
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = loginSchema.parse(body)

    // Find user
    const user = mockUsers.find(
      u => u.email === validatedData.email && u.password === validatedData.password
    )

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Create session token (mock)
    const token = `mock_token_${user.id}_${Date.now()}`

    // Return user data (without password)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: userWithoutPassword,
      token,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
