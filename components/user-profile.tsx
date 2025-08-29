'use client'

import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LogOut, User, Mail, Calendar, Shield } from 'lucide-react'

export function UserProfile() {
  const { user, logout, isLoading } = useAuth()

  if (isLoading || !user) {
    return null
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-lg">
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="text-xl">{user.name}</CardTitle>
        <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
          {user.role === 'admin' ? 'Administrator' : 'User'}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-3">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{user.email}</span>
        </div>

        {user.createdAt && (
          <div className="flex items-center space-x-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              Member since {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </div>
        )}

        {user.lastLogin && (
          <div className="flex items-center space-x-3">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              Last login: {new Date(user.lastLogin).toLocaleDateString()}
            </span>
          </div>
        )}

        <div className="flex items-center space-x-3">
          <Shield className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">
            Role: {user.role === 'admin' ? 'Full Access' : 'Limited Access'}
          </span>
        </div>

        <Button
          onClick={logout}
          variant="outline"
          className="w-full"
          disabled={isLoading}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </CardContent>
    </Card>
  )
}
