import type {
  IUser,
  IUpdateProfileRequest,
  IUpdateProfileResponse,
  IApiResponse,
  IApiError,
} from './types'
import { mockUsers } from './mockData'
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

export class ProfileApi {
  static async getProfile(userId: string): Promise<IApiResponse<IUser>> {
    await delay(ms('800ms'))

    const user = mockUsers.find(u => u.userId === userId)

    if (!user) {
      throw simulateError('User not found', 'USER_NOT_FOUND')
    }

    return simulateSuccess(user, 'Profile retrieved successfully')
  }

  static async updateProfile(
    userId: string,
    request: IUpdateProfileRequest
  ): Promise<IApiResponse<IUpdateProfileResponse>> {
    await delay(1200)

    const userIndex = mockUsers.findIndex(u => u.userId === userId)

    if (userIndex === -1) {
      throw simulateError('User not found', 'USER_NOT_FOUND')
    }

    if (request.email) {
      const existingUser = mockUsers.find(
        u => u.email === request.email && u.userId !== userId
      )

      if (existingUser) {
        throw simulateError('Email already exists', 'EMAIL_EXISTS')
      }
    }

    const updatedUser: IUser = {
      ...mockUsers[userIndex],
      ...request,
    }

    mockUsers[userIndex] = updatedUser

    const response: IUpdateProfileResponse = {
      user: updatedUser,
    }

    return simulateSuccess(response, 'Profile updated successfully')
  }

  static async uploadAvatar(
    userId: string,
    file: File
  ): Promise<IApiResponse<{ avatarUrl: string }>> {
    await delay(2000)

    const userIndex = mockUsers.findIndex(u => u.userId === userId)

    if (userIndex === -1) {
      throw simulateError('User not found', 'USER_NOT_FOUND')
    }

    const avatarUrl = URL.createObjectURL(file)

    mockUsers[userIndex].avatar = avatarUrl

    return simulateSuccess({ avatarUrl }, 'Avatar uploaded successfully')
  }

  static async deleteAvatar(
    userId: string
  ): Promise<IApiResponse<{ message: string }>> {
    await delay(600)

    const userIndex = mockUsers.findIndex(u => u.userId === userId)

    if (userIndex === -1) {
      throw simulateError('User not found', 'USER_NOT_FOUND')
    }

    mockUsers[userIndex].avatar = ''

    return simulateSuccess(
      { message: 'Avatar deleted successfully' },
      'Avatar deleted successfully'
    )
  }

  static async getUserStats(userId: string): Promise<
    IApiResponse<{
      postsCount: number
      followersCount: number
      followingCount: number
    }>
  > {
    await delay(500)

    const user = mockUsers.find(u => u.userId === userId)

    if (!user) {
      throw simulateError('User not found', 'USER_NOT_FOUND')
    }

    const stats = {
      postsCount: Math.floor(Math.random() * 50) + 5,
      followersCount: Math.floor(Math.random() * 1000) + 50,
      followingCount: Math.floor(Math.random() * 500) + 20,
    }

    return simulateSuccess(stats, 'User statistics retrieved successfully')
  }
}
