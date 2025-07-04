import type {
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
  IRegisterResponse,
  IApiResponse,
  IApiError,
  IUser,
} from './types'
import {
  generateId,
  getMockUsers,
  getMockTokens,
  verifyPassword,
  getCurrentTimestamp,
  addUserWithHashedPassword,
} from './mockData'
import ms from 'ms'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const simulateError = (message: string, code: string): IApiError => ({
  message,
  code,
  details: { timestamp: new Date().toISOString() },
})

const simulateSuccess = <T>(data: T, message: string): IApiResponse<T> => ({
  data,
  message,
  success: true,
})

export class AuthApi {
  static async login(
    request: ILoginRequest
  ): Promise<IApiResponse<ILoginResponse>> {
    await delay(ms('1s'))

    const mockUsers = getMockUsers()
    const mockTokens = getMockTokens()

    const user = mockUsers.find(u => u.userId === request.userId)
    if (!user) {
      throw simulateError('Invalid credentials', 'INVALID_CREDENTIALS')
    }

    const isValidPassword = await verifyPassword(
      request.userId,
      request.password
    )
    if (!isValidPassword) {
      throw simulateError('Invalid credentials', 'INVALID_CREDENTIALS')
    }

    const token = mockTokens[request.userId] || `mock_token_${request.userId}`
    const expiresAt = new Date(Date.now() + ms('24h')).toISOString() // 24 hours

    const response: ILoginResponse = {
      user,
      token,
      expiresAt,
    }

    return simulateSuccess(response, 'Login successful')
  }

  static async register(
    request: IRegisterRequest
  ): Promise<IApiResponse<IRegisterResponse>> {
    await delay(ms('1.5s'))

    const mockUsers = getMockUsers()

    const existingUser = mockUsers.find(
      u => u.userId === request.userId || u.email === request.email
    )

    if (existingUser) {
      if (existingUser.userId === request.userId) {
        throw simulateError('User ID already exists', 'USER_ID_EXISTS')
      }
      if (existingUser.email === request.email) {
        throw simulateError('Email already exists', 'EMAIL_EXISTS')
      }
    }

    const newUser = {
      id: generateId(),
      userId: request.userId,
      email: request.email,
      firstName: request.firstName,
      lastName: request.lastName,
      bio: '',
      avatar: '',
      createdAt: getCurrentTimestamp(),
      updatedAt: getCurrentTimestamp(),
    }

    await addUserWithHashedPassword(newUser, request.password)

    const mockTokens = getMockTokens()
    const token = mockTokens[request.userId]
    const expiresAt = new Date(Date.now() + ms('24h')).toISOString()

    const response: IRegisterResponse = {
      user: newUser,
      token,
      expiresAt,
    }

    return simulateSuccess(response, 'Registration successful')
  }

  static async validateToken(
    token: string
  ): Promise<IApiResponse<{ user: IUser }>> {
    await delay(ms('500ms'))

    const mockTokens = getMockTokens()
    const mockUsers = getMockUsers()

    const userId = Object.keys(mockTokens).find(
      key => mockTokens[key] === token
    )

    if (!userId) {
      throw simulateError('Invalid token', 'INVALID_TOKEN')
    }

    const user = mockUsers.find(u => u.userId === userId)

    if (!user) {
      throw simulateError('User not found', 'USER_NOT_FOUND')
    }

    return simulateSuccess({ user }, 'Token valid')
  }

  static async logout(): Promise<IApiResponse<{ message: string }>> {
    await delay(ms('300ms'))

    return simulateSuccess(
      { message: 'Logged out successfully' },
      'Logout successful'
    )
  }
}
