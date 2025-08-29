import { NextResponse } from 'next/server'

export async function POST() {
  try {
    // In a real app, you would invalidate the token/session here
    // For mock purposes, we just return success

    return NextResponse.json({
      success: true,
      message: 'Logout successful'
    })

  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
