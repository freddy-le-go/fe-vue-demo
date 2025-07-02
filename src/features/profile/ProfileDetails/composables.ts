import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import {
  useProfileQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
} from '@/composables/useProfileQueries'
import type { IUpdateProfileRequest } from '@/lib/api/types'

export interface ProfileFormData {
  salutation: string
  firstName: string
  lastName: string
  email: string
  bio?: string
  avatar?: string
}

export const useProfileDetails = () => {
  const authStore = useAuthStore()
  const userId = computed(() => authStore.user?.userId)

  const {
    data: profileResponse,
    isLoading,
    error,
  } = useProfileQuery(userId.value || '')

  const profile = computed(() => profileResponse.value?.data)

  const updateProfileMutation = useUpdateProfileMutation()
  const uploadAvatarMutation = useUploadAvatarMutation()

  const isEditMode = ref(false)

  const handleUpdateProfile = async (values: ProfileFormData) => {
    if (!userId.value) {
      return
    }

    try {
      const updateData: IUpdateProfileRequest = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        bio: values.bio,
      }

      await updateProfileMutation.mutateAsync({
        userId: userId.value,
        data: updateData,
      })

      isEditMode.value = false
    } catch (error) {
      console.error('Profile update failed:', error)
      throw new Error('Profile update failed. Please try again.')
    }
  }

  const handleAvatarUpload = async (file: File) => {
    if (!file || !userId.value) return

    try {
      await uploadAvatarMutation.mutateAsync({
        userId: userId.value,
        file,
      })
    } catch (error) {
      console.error('Avatar upload failed:', error)
      throw new Error('Avatar upload failed. Please try again.')
    }
  }

  const onAvatarChange = async (event: Event, field: any) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]

    if (file && userId.value) {
      try {
        await handleAvatarUpload(file)
        field.onChange(URL.createObjectURL(file))
      } catch (error) {
        console.error('Avatar upload failed:', error)
        throw new Error('Avatar upload failed. Please try again.')
      }
    }
  }

  const saveProfile = async (values: ProfileFormData) => {
    try {
      await handleUpdateProfile(values)
    } catch (error) {
      console.error('Profile update failed:', error)
      throw new Error('Profile update failed. Please try again.')
    }
  }

  const cancelEdit = () => {
    isEditMode.value = false
  }

  const enterEditMode = () => {
    isEditMode.value = true
  }

  return {
    profile,
    isLoading,
    error,
    isEditMode,

    saveProfile,
    cancelEdit,
    enterEditMode,
    onAvatarChange,
  }
}
