import type { IUser } from './types'

export const mockUsers: IUser[] = [
  {
    id: '1',
    userId: 'john_doe',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: '2',
    userId: 'jane_smith',
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: '3',
    userId: 'mike_wilson',
    email: 'mike.wilson@example.com',
    firstName: 'Mike',
    lastName: 'Wilson',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: '4',
    userId: 'freddy',
  },
]

export const mockPasswords: Record<string, string> = {
  john_doe: 'Password123',
  jane_smith: 'SecurePass456',
  mike_wilson: 'StrongPass789',
  freddy: 'StrongPass789',
}

export const mockTokens: Record<string, string> = {
  john_doe: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock_token_john',
  jane_smith: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock_token_jane',
  mike_wilson: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock_token_mike',
  freddy: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock_token_freddy',
}

export const generateUserId = (firstName: string, lastName: string): string => {
  const base = `${firstName.toLowerCase()}_${lastName.toLowerCase()}`
  const existingUsers = mockUsers.filter(user => user.userId.startsWith(base))

  if (existingUsers.length === 0) {
    return base
  }

  return `${base}_${existingUsers.length + 1}`
}

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9)
}

export const getCurrentTimestamp = (): string => {
  return new Date().toISOString()
}
