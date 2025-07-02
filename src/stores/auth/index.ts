import Cookies from 'js-cookie'
import { defineStore } from 'pinia'

import {
  AuthApi,
  ProfileApi,
  type IRegisterRequest,
  type IUser,
  type IUpdateProfileRequest,
} from '@/lib/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as IUser | null,
    isAuthenticated: false,
    rememberMe: false,
    token: null as string | null,
    isLoading: false,
  }),
  actions: {
    async login(userId: string, password: string, rememberMe: boolean = false) {
      this.isLoading = true

      try {
        const res = await AuthApi.login({ userId, password })

        this.user = res.data.user
        this.isAuthenticated = true
        this.rememberMe = rememberMe
        this.token = res.data.token

        if (rememberMe) {
          Cookies.set('auth_user', JSON.stringify(res.data.user), {
            expires: 7,
          })
          Cookies.set('auth_token', res.data.token, { expires: 7 })
        } else {
          Cookies.set('auth_user', JSON.stringify(res.data.user), {
            expires: 1,
          })
          Cookies.set('auth_token', res.data.token, { expires: 1 })
        }

        return res
      } catch (error) {
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async register(userData: IRegisterRequest, rememberMe: boolean = false) {
      this.isLoading = true

      try {
        const response = await AuthApi.register(userData)

        this.user = response.data.user
        this.isAuthenticated = true
        this.rememberMe = rememberMe
        this.token = response.data.token

        if (rememberMe) {
          Cookies.set('auth_user', JSON.stringify(response.data.user), {
            expires: 7,
          })
          Cookies.set('auth_token', response.data.token, { expires: 7 })
        } else {
          Cookies.set('auth_user', JSON.stringify(response.data.user), {
            expires: 1,
          })
          Cookies.set('auth_token', response.data.token, { expires: 1 })
        }

        return response
      } catch (error) {
        throw error
      } finally {
        this.isLoading = false
      }
    },
    async logout() {
      this.isLoading = true

      try {
        await AuthApi.logout()
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        this.user = null
        this.isAuthenticated = false
        this.rememberMe = false
        this.token = null
        this.isLoading = false

        Cookies.remove('auth_user')
        Cookies.remove('auth_token')

        window.location.reload()
      }
    },
    async loadFromCookie() {
      const user = Cookies.get('auth_user')
      const token = Cookies.get('auth_token')

      if (user && token) {
        try {
          const response = await AuthApi.validateToken(token)
          this.user = response.data.user
          this.isAuthenticated = true
          this.token = token
          this.rememberMe = true
        } catch (error) {
          this.logout()
        }
      }
    },

    async updateUser(userData: IUpdateProfileRequest) {
      if (!this.user) return

      try {
        const response = await ProfileApi.updateProfile(
          this.user.userId,
          userData
        )
        this.user = response.data.user

        Cookies.set('auth_user', JSON.stringify(this.user), {
          expires: this.rememberMe ? 7 : 1,
        })

        return response
      } catch (error) {
        throw error
      }
    },
  },
})
