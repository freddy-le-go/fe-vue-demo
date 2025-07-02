import { ref } from 'vue'

import { ProfileApi, type IUser, type IUpdateProfileRequest } from '@/lib/api'

export function useProfile() {
  const profile = ref<IUser | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const loadProfile = async (userId: string) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await ProfileApi.getProfile(userId)
      profile.value = response.data
      return response
    } catch (err: Error | unknown) {
      error.value = (err as Error)?.message || 'Failed to load profile'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const updateProfile = async (userId: string, data: IUpdateProfileRequest) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await ProfileApi.updateProfile(userId, data)
      profile.value = response.data.user
      return response
    } catch (err: Error | unknown) {
      error.value = (err as Error)?.message || 'Failed to update profile'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const uploadAvatar = async (userId: string, file: File) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await ProfileApi.uploadAvatar(userId, file)
      if (profile.value) {
        profile.value.avatar = response.data.avatarUrl
      }
      return response
    } catch (err: Error | unknown) {
      error.value = (err as Error)?.message || 'Failed to upload avatar'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const deleteAvatar = async (userId: string) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await ProfileApi.deleteAvatar(userId)
      if (profile.value) {
        profile.value.avatar = ''
      }
      return response
    } catch (err: Error | unknown) {
      error.value = (err as Error)?.message || 'Failed to delete avatar'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const getUserStats = async (userId: string) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await ProfileApi.getUserStats(userId)
      return response
    } catch (err: Error | unknown) {
      error.value = (err as Error)?.message || 'Failed to load user statistics'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    profile,
    isLoading,
    error,
    loadProfile,
    updateProfile,
    uploadAvatar,
    deleteAvatar,
    getUserStats,
  }
}
