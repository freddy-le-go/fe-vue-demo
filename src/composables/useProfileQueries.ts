import { queryKeys } from '@/lib/api/queryKeys'
import { ProfileApi, type IUpdateProfileRequest } from '@/lib/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

import ms from 'ms'

export function useProfileQuery(userId: string) {
  return useQuery({
    queryKey: queryKeys.profile.user(userId),
    queryFn: async () => {
      return ProfileApi.getProfile(userId)
    },
    enabled: !!userId,
    staleTime: ms('5m'),
    gcTime: ms('10m'),
  })
}

export function useProfileStatsQuery(userId: string) {
  return useQuery({
    queryKey: queryKeys.profile.stats(userId),
    queryFn: async () => {
      return ProfileApi.getUserStats(userId)
    },
    enabled: !!userId,
    staleTime: ms('10m'),
    gcTime: ms('20m'),
  })
}

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      userId,
      data,
    }: {
      userId: string
      data: IUpdateProfileRequest
    }) => {
      return ProfileApi.updateProfile(userId, data)
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.profile.user(variables.userId),
      })
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.user() })
    },
    onError: (error: any) => {
      console.error('Profile update failed:', error)
    },
  })
}

export function useUploadAvatarMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ userId, file }: { userId: string; file: File }) => {
      return ProfileApi.uploadAvatar(userId, file)
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.profile.user(variables.userId),
      })
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.user() })
    },
    onError: (error: any) => {
      console.error('Avatar upload failed:', error)
    },
  })
}

export function useDeleteAvatarMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (userId: string) => {
      return ProfileApi.deleteAvatar(userId)
    },
    onSuccess: (_data, userId) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.profile.user(userId),
      })
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.user() })
    },
    onError: (error: any) => {
      console.error('Avatar deletion failed:', error)
    },
  })
}
