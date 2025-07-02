import type {
  IUser,
  IUpdateProfileRequest,
  IUpdateProfileResponse,
  IApiResponse,
  IApiError,
} from './types'
import { mockUsers } from './mockData'

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
    await delay(800)

    try {
      const user = mockUsers.find(u => u.userId === userId)

      if (!user) {
        throw simulateError('User not found', 'USER_NOT_FOUND')
      }

      return simulateSuccess(user, 'Profile retrieved successfully')
    } catch (error) {
      throw error
    }
  }

  static async updateProfile(
    userId: string,
    request: IUpdateProfileRequest
  ): Promise<IApiResponse<IUpdateProfileResponse>> {
    await delay(1200)

    try {
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
    } catch (error) {
      throw error
    }
  }

  static async uploadAvatar(
    userId: string,
    file: File
  ): Promise<IApiResponse<{ avatarUrl: string }>> {
    await delay(2000)

    try {
      const userIndex = mockUsers.findIndex(u => u.userId === userId)

      if (userIndex === -1) {
        throw simulateError('User not found', 'USER_NOT_FOUND')
      }

      const avatarUrl = `https://images.unsplash.com/photo-${Math.random().toString(36).substr(2, 9)}?w=150&h=150&fit=crop&crop=face`

      mockUsers[userIndex].avatar = avatarUrl

      return simulateSuccess({ avatarUrl }, 'Avatar uploaded successfully')
    } catch (error) {
      throw error
    }
  }

  static async deleteAvatar(
    userId: string
  ): Promise<IApiResponse<{ message: string }>> {
    await delay(600)

    try {
      const userIndex = mockUsers.findIndex(u => u.userId === userId)

      if (userIndex === -1) {
        throw simulateError('User not found', 'USER_NOT_FOUND')
      }

      mockUsers[userIndex].avatar = ''

      return simulateSuccess(
        { message: 'Avatar deleted successfully' },
        'Avatar deleted successfully'
      )
    } catch (error) {
      throw error
    }
  }

  static async getUserStats(userId: string): Promise<
    IApiResponse<{
      postsCount: number
      followersCount: number
      followingCount: number
    }>
  > {
    await delay(500)

    try {
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
    } catch (error) {
      throw error
    }
  }
}
