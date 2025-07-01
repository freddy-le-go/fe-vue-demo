<script setup lang="ts">
  import { useRouter } from 'vue-router'

  import { ArrowLeftIcon } from 'lucide-vue-next'

  import { useSeo } from '@/composables/useSeo'

  import { LoginForm } from '@/features/auth/LoginForm'
  import { Button, ButtonLink } from '@/components/ui/button'

  const router = useRouter()

  useSeo({
    title: 'Login - Vue.js Application',
    description:
      'Sign in to your account. Secure login with modern authentication.',
    keywords: 'Login, Sign In, Authentication, Vue.js, Web Application',
  })

  const handleLoginSuccess = (data: {
    username: string
    rememberMe: boolean
  }): void => {
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('username', data.username)
    if (data.rememberMe) {
      localStorage.setItem('rememberMe', 'true')
    }

    router.replace('/profile')
  }

  const handleLoginError = (error: string): void => {
    console.error('Login error:', error)
    alert(error)
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
        <Button
          variant="ghost"
          @click="router.push('/')"
          class="inline-flex items-center text-muted-foreground hover:text-foreground"
        >
          <ArrowLeftIcon class="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </div>
    </div>
  </main>
</template>
