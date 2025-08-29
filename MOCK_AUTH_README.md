# Mock Authentication System

This project includes a complete mock authentication system for development and testing purposes.

## Features

- **Mock API Endpoints**: Login, logout, and user profile endpoints
- **Form Validation**: Input validation using Zod schema
- **Protected Routes**: Route protection based on authentication status
- **Role-based Access**: Support for admin and user roles
- **Token Management**: Mock JWT-like token system with localStorage
- **Demo Credentials**: Pre-filled login forms for testing

## API Endpoints

### POST `/api/auth/login`
Authenticates user credentials and returns user data with token.

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "1",
    "email": "admin@example.com",
    "name": "Admin User",
    "role": "admin",
    "avatar": "/avatars/admin.jpg"
  },
  "token": "mock_token_1_1705123456789",
  "expiresAt": "2024-01-16T10:30:00.000Z"
}
```

### POST `/api/auth/logout`
Logs out the user (mock implementation).

### GET `/api/auth/profile?userId={id}`
Retrieves user profile information.

## Mock Users

| Email | Password | Role | Name |
|-------|----------|------|------|
| admin@example.com | admin123 | admin | Admin User |
| user@example.com | user123 | user | Regular User |
| demo@example.com | demo123 | user | Demo User |

## Components

### LoginForm
Enhanced login form with:
- Email and password validation
- Demo credential buttons
- Loading states
- Error handling with toast notifications

### ProtectedRoute
Route protection component that:
- Checks authentication status
- Redirects unauthenticated users to login
- Supports role-based access control
- Shows loading spinner during auth check

### UserProfile
User information display component with:
- User avatar and details
- Role information
- Account creation and last login dates
- Logout functionality

## Hooks

### useAuth
Custom React hook providing:
- Authentication state management
- Login/logout functions
- User information
- Demo credential helpers

## Usage

### Protecting Routes
```tsx
import { ProtectedRoute } from '@/components/protected-route'

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}
```

### Role-based Protection
```tsx
<ProtectedRoute requiredRole="admin">
  <AdminOnlyContent />
</ProtectedRoute>
```

### Using Authentication Hook
```tsx
import { useAuth } from '@/hooks/use-auth'

function MyComponent() {
  const { user, login, logout, isAuthenticated } = useAuth()

  // Use authentication functions and state
}
```

## File Structure

```
├── app/api/auth/
│   ├── login/route.ts      # Login endpoint
│   ├── logout/route.ts     # Logout endpoint
│   └── profile/route.ts    # Profile endpoint
├── components/
│   ├── login-form.tsx      # Enhanced login form
│   ├── protected-route.tsx # Route protection
│   └── user-profile.tsx    # User profile display
├── hooks/
│   └── use-auth.ts         # Authentication hook
├── lib/
│   └── auth.ts             # Auth utilities and types
└── MOCK_AUTH_README.md     # This documentation
```

## Development Notes

- **Token Format**: `mock_token_{userId}_{timestamp}`
- **Storage**: Uses localStorage for token persistence
- **Validation**: Zod schema validation for all inputs
- **Error Handling**: Comprehensive error handling with user feedback
- **Responsive**: Mobile-friendly design with proper loading states

## Testing

1. Navigate to `/login`
2. Use demo credential buttons to auto-fill forms
3. Test with different user roles
4. Verify protected route access
5. Test logout functionality

## Security Notes

⚠️ **This is a mock system for development only!**

- Passwords are stored in plain text
- No real JWT validation
- No session management
- No CSRF protection
- No rate limiting

**Do not use in production!** Replace with a real authentication system before deployment.
