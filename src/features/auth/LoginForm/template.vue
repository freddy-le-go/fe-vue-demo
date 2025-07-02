<script setup lang="ts">
  import { ref } from 'vue'

  import { Eye, EyeOff } from 'lucide-vue-next'

  import type { SubmissionHandler } from 'vee-validate'

  import { Card } from '@/components/ui/card'
  import { Label } from '@/components/ui/label'
  import { Button } from '@/components/ui/button'
  import { Checkbox } from '@/components/ui/checkbox'
  import { InputWrapper } from '@/components/ui/input'
  import { Form, FormFieldWrapper } from '@/components/ui/form'

  import { loginSchema } from './composables'

  import type { LoginFormData } from './types'

  import { useLoginMutation } from '@/composables/useAuthQueries'

  const emit = defineEmits<{
    onSuccess: [data: { userId: string; password: string; rememberMe: boolean }]
    onError: [error: string]
  }>()

  const rememberMe = ref(false)
  const showPassword = ref(false)
  const userIdError = ref<string | null>(null)
  const passwordError = ref<string | null>(null)

  const loginMutation = useLoginMutation()

  const onSubmit = async (values: LoginFormData) => {
    userIdError.value = null
    passwordError.value = null

    try {
      await loginMutation.mutateAsync({
        request: {
          userId: values.userId,
          password: values.password,
        },
        rememberMe: rememberMe.value,
      })

      emit('onSuccess', {
        userId: values.userId,
        password: values.password,
        rememberMe: rememberMe.value,
      })
    } catch (error: any) {
      const errorMessage = error.message || 'Login failed. Please try again.'

      if (error.message === 'Invalid credentials') {
        userIdError.value = 'Invalid user ID or password'
        passwordError.value = 'Invalid user ID or password'
      } else {
        emit('onError', errorMessage)
      }
    }
  }

  const togglePasswordVisibility = (): void => {
    showPassword.value = !showPassword.value
  }

  const clearErrors = (): void => {
    userIdError.value = null
    passwordError.value = null
  }
</script>

<template>
  <Card class="p-6">
    <Form
      @submit="onSubmit as unknown as SubmissionHandler"
      :validation-schema="loginSchema"
    >
      <div class="space-y-6">
        <FormFieldWrapper
          name="userId"
          label="User ID"
          required
          :component="InputWrapper"
          :componentProps="{
            placeholder: 'Enter user ID',
            disabled: loginMutation.isPending.value,
            required: true,
            onInput: clearErrors,
          }"
        >
          <template #endContent>
            <UserIcon />
          </template>
        </FormFieldWrapper>

        <div v-if="userIdError" class="text-sm text-destructive">
          {{ userIdError }}
        </div>

        <FormFieldWrapper
          name="password"
          label="Password"
          required
          :component="InputWrapper"
          :componentProps="{
            type: showPassword ? 'text' : 'password',
            placeholder: 'Enter your password',
            disabled: loginMutation.isPending.value,
            required: true,
            onInput: clearErrors,
          }"
        >
          <template #endContent>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              @click="togglePasswordVisibility"
              class="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
              :disabled="loginMutation.isPending.value"
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
            >
              <EyeOff v-if="showPassword" class="h-4 w-4" />
              <Eye v-else class="h-4 w-4" />
            </Button>
          </template>
        </FormFieldWrapper>

        <div v-if="passwordError" class="text-sm text-destructive">
          {{ passwordError }}
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <Checkbox
              id="remember"
              v-model:checked="rememberMe"
              :disabled="loginMutation.isPending.value"
            />
            <Label for="remember" class="text-sm font-normal"
              >Keep me logged in</Label
            >
          </div>
          <Button type="button" variant="link" class="px-0 text-sm"
            >Forgot password?</Button
          >
        </div>

        <Button
          type="submit"
          :isLoading="loginMutation.isPending.value"
          loadingText="Signing in..."
          class="w-full"
          size="lg"
          :disabled="loginMutation.isPending.value"
        >
          Sign In
        </Button>
      </div>
    </Form>
  </Card>
</template>
