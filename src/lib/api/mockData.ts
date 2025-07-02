import type { IUser } from './types'

const hash = async (password: string): Promise<string> => {
  const buffer = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(password)
  )
  return Array.from(new Uint8Array(buffer), b =>
    b.toString(16).padStart(2, '0')
  ).join('')
}

const initializeLocalStorage = () => {
  if (!localStorage.getItem('mockUsers')) {
    const defaultUsers: IUser[] = [
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
    localStorage.setItem('mockUsers', JSON.stringify(defaultUsers))
  }

  if (!localStorage.getItem('mockPasswords')) {
    const defaultPasswords: Record<string, string> = {
      john_doe: 'Password123',
      jane_smith: 'SecurePass456',
      mike_wilson: 'StrongPass789',
      freddy: 'StrongPass789',
    }
    localStorage.setItem('mockPasswords', JSON.stringify(defaultPasswords))
  }

  if (!localStorage.getItem('mockTokens')) {
    const defaultTokens: Record<string, string> = {
      john_doe: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock_token_john',
      jane_smith: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock_token_jane',
      mike_wilson: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock_token_mike',
      freddy: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock_token_freddy',
    }
    localStorage.setItem('mockTokens', JSON.stringify(defaultTokens))
  }
}

initializeLocalStorage()

export const getMockUsers = (): IUser[] => {
  return JSON.parse(localStorage.getItem('mockUsers') || '[]')
}

export const getMockPasswords = (): Record<string, string> => {
  return JSON.parse(localStorage.getItem('mockPasswords') || '{}')
}

export const getMockTokens = (): Record<string, string> => {
  return JSON.parse(localStorage.getItem('mockTokens') || '{}')
}

export const mockUsers = getMockUsers()
export const mockPasswords = getMockPasswords()
export const mockTokens = getMockTokens()

export const updateMockUsers = (users: IUser[]) => {
  localStorage.setItem('mockUsers', JSON.stringify(users))
}

export const updateMockPasswords = (passwords: Record<string, string>) => {
  localStorage.setItem('mockPasswords', JSON.stringify(passwords))
}

export const updateMockTokens = (tokens: Record<string, string>) => {
  localStorage.setItem('mockTokens', JSON.stringify(tokens))
}

export const addUserWithHashedPassword = async (
  user: IUser,
  password: string
) => {
  const hashedPassword = await hash(password)
  const currentUsers = getMockUsers()
  const currentPasswords = getMockPasswords()
  const currentTokens = getMockTokens()

  const users = [...currentUsers, user]
  const passwords = { ...currentPasswords, [user.userId]: hashedPassword }
  const tokens = {
    ...currentTokens,
    [user.userId]: `mock_token_${user.userId}`,
  }

  updateMockUsers(users)
  updateMockPasswords(passwords)
  updateMockTokens(tokens)
}

export const verifyPassword = async (
  userId: string,
  password: string
): Promise<boolean> => {
  const hashedPassword = await hash(password)
  const passwords = getMockPasswords()
  const storedPassword = passwords[userId]

  if (!storedPassword) {
    return false
  }

  if (storedPassword.length === 64) {
    return storedPassword === hashedPassword
  }

  return storedPassword === password
}

export const generateUserId = (firstName: string, lastName: string): string => {
  const base = `${firstName.toLowerCase()}_${lastName.toLowerCase()}`
  const users = getMockUsers()
  const existingUsers = users.filter(user => user.userId?.startsWith(base))

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
