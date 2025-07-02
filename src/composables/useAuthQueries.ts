import { useMutation, useQueryClient, useQuery } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import { AuthApi, type ILoginRequest, type IRegisterRequest } from '@/lib/api'
import { queryKeys } from '@/lib/api/queryKeys'
import { useAuthStore } from '@/stores/auth'
import ms from 'ms'

export function useLoginMutation() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const authStore = useAuthStore()

  return useMutation({
    mutationFn: async ({
      request,
      rememberMe,
    }: {
      request: ILoginRequest
      rememberMe: boolean
    }) => {
      const res = await AuthApi.login(request)

      authStore.user = res.data.user
      authStore.isAuthenticated = true
      authStore.rememberMe = rememberMe
      authStore.token = res.data.token

      return res
    },
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.user() })
      queryClient.invalidateQueries({
        queryKey: queryKeys.profile.user(data.data.user.userId),
      })

      router.push('/profile')
    },
    onError: (error: Error | unknown) => {
      console.error('Login failed:', error)
    },
  })
}

export function useRegisterMutation() {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: async ({ request }: { request: IRegisterRequest }) => {
      return AuthApi.register(request)
    },
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.user() })
      queryClient.invalidateQueries({
        queryKey: queryKeys.profile.user(data.data.user.userId),
      })

      router.replace('/login')
    },
    onError: (error: Error | unknown) => {
      console.error('Registration failed:', error)
    },
  })
}

export function useLogoutMutation() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const authStore = useAuthStore()

  return useMutation({
    mutationFn: async () => {
      const res = await AuthApi.logout()

      authStore.user = null
      authStore.isAuthenticated = false
      authStore.rememberMe = false
      authStore.token = null

      return res
    },
    onSuccess: () => {
      queryClient.clear()

      router.replace('/')
    },
    onError: (error: Error | unknown) => {
      console.error('Logout failed:', error)
      authStore.user = null
      authStore.isAuthenticated = false
      authStore.rememberMe = false
      authStore.token = null
      queryClient.clear()
      router.push('/')
    },
  })
}

export function useValidateTokenQuery(token: string | null) {
  return useQuery({
    queryKey: queryKeys.auth.user(),
    queryFn: async () => {
      if (!token) throw new Error('No token provided')
      const res = await AuthApi.validateToken(token)
      return res.data.user
    },
    enabled: !!token,
    staleTime: ms('5m'),
    gcTime: ms('10m'),
  })
}
