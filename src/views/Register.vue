<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { ArrowLeftIcon } from 'lucide-vue-next'

  import { useAuthStore } from '@/stores/auth'
  import { useSeo } from '@/composables/useSeo'
  import { ButtonLink } from '@/components/ui/button'
  import { RegisterForm } from '@/features/auth/RegisterForm'

  import type { IRegisterRequest } from '@/lib/api'

  const authStore = useAuthStore()
  const router = useRouter()

  useSeo({
    title: 'Register - Vue.js Application',
    description:
      'Create your account. Join our community with secure registration.',
    keywords: 'Register, Sign Up, Create Account, Vue.js, Web Application',
  })

  const handleRegisterSuccess = async (
    data: IRegisterRequest
  ): Promise<void> => {
    await authStore.register(data)
    router.replace('/profile')
  }

  const handleRegisterError = (error: string): void => {
    console.error('Registration error:', error)
    alert(error)
  }
</script>

<template>
  <main class="flex items-center justify-center py-8 px-4 flex-1">
    <div class="max-w-md w-full">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-foreground mb-2">Join Us</h1>
        <p class="text-muted-foreground">Create your account to get started</p>
      </div>

      <RegisterForm
        @onSuccess="handleRegisterSuccess"
        @onError="handleRegisterError"
      />

      <div class="text-center mt-6">
        <p class="text-muted-foreground">
          Already have an account?
          <ButtonLink to="/login" variant="link" class="px-0 font-semibold">
            Sign in
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
