<script setup lang="ts">
import { useRouter } from 'vue-router'

import { ArrowLeftIcon } from 'lucide-vue-next'

import { useAuthStore } from '@/stores/auth'
import { useSeo } from '@/composables/useSeo'

import { ButtonLink } from '@/components/ui/button'
import { LoginForm } from '@/features/auth/LoginForm'

const router = useRouter()

useSeo({
  title: 'Login - Vue.js Application',
  description:
      'Sign in to your account. Secure login with modern authentication.',
  keywords: 'Login, Sign In, Authentication, Vue.js, Web Application',
})

const authStore = useAuthStore()

const handleLoginSuccess = async (data: {
    userId: string
    password: string
    rememberMe: boolean
  }): Promise<void> => {
  await authStore.login(data.userId, data.password, data.rememberMe)

  router.replace('/profile')
}

const handleLoginError = (error: string): void => {
  if (error !== 'Invalid credentials') {
    alert(error)
  }
}
</script>

<template>
  <main class="flex items-center justify-center py-8 px-4 flex-1">
    <div class="max-w-md w-full">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-foreground mb-2">Welcome Back</h1>
        <p class="text-muted-foreground">Sign in to your account</p>
      </div>

      <LoginForm @onSuccess="handleLoginSuccess" @onError="handleLoginError" />

      <div class="text-center mt-6">
        <p class="text-muted-foreground">
          No account?
          <ButtonLink to="/register" variant="link" class="px-0 font-semibold">
            Register here
          </ButtonLink>
        </p>
      </div>

      <div class="text-center mt-4">
        <ButtonLink to="/" variant="ghost">
          <ArrowLeftIcon class="w-4 h-4 mr-2" />
          Back to Home
        </ButtonLink>
      </div>
    </div>
  </main>
</template>
