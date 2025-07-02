<script setup lang="ts">
  import { ref } from 'vue'

  import { toTypedSchema } from '@vee-validate/zod'

  import { z } from 'zod'
  import { Eye, EyeOff } from 'lucide-vue-next'

  import type { SubmissionHandler } from 'vee-validate'

  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card'
  import { Label } from '@/components/ui/label'
  import { Button } from '@/components/ui/button'
  import { Checkbox } from '@/components/ui/checkbox'
  import { InputWrapper } from '@/components/ui/input'
  import { Form, FormFieldWrapper } from '@/components/ui/form'
  import { useRegisterMutation } from '@/composables/useAuthQueries'

  import type { IRegisterRequest } from '@/lib/api'

  const registerSchema = toTypedSchema(
    z
      .object({
        userId: z
          .string()
          .min(1, 'User ID is required')
          .min(3, 'User ID must be at least 3 characters')
          .max(50, 'User ID must be less than 50 characters')
          .regex(
            /^[a-zA-Z0-9_]+$/,
            'User ID can only contain letters, numbers, and underscores'
          ),
        email: z
          .string()
          .min(1, 'Email is required')
          .email('Please enter a valid email address'),
        firstName: z
          .string()
          .min(1, 'First name is required')
          .min(2, 'First name must be at least 2 characters'),
        lastName: z
          .string()
          .min(1, 'Last name is required')
          .min(2, 'Last name must be at least 2 characters'),
        password: z
          .string()
          .min(1, 'Password is required')
          .min(6, 'Password must be at least 6 characters')
          .max(100, 'Password must be less than 100 characters')
          .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'Password must contain at least one uppercase letter, one lowercase letter, and one number'
          ),
        confirmPassword: z.string().min(1, 'Please confirm your password'),
      })
      .refine(data => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
      })
  )

  const emit = defineEmits<{
    onSuccess: [data: IRegisterRequest]
    onError: [error: string]
  }>()

  const showPassword = ref(false)
  const showConfirmPassword = ref(false)
  const acceptTerms = ref(false)

  const registerMutation = useRegisterMutation()

  const onSubmit = async (values: IRegisterRequest) => {
    try {
      await registerMutation.mutateAsync({
        request: values,
      })

      emit('onSuccess', values)
    } catch (error: Error | unknown) {
      emit(
        'onError',
        (error as Error).message || 'Registration failed. Please try again.'
      )
    }
  }
</script>

<template>
  <Card class="w-full max-w-md mx-auto">
    <CardHeader class="space-y-1">
      <CardTitle class="text-2xl font-bold text-center"
        >Create Account</CardTitle
      >
      <CardDescription class="text-center">
        Enter your information to create your account
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Form
        @submit="onSubmit as unknown as SubmissionHandler<IRegisterRequest>"
        :validation-schema="registerSchema"
      >
        <div class="space-y-4">
          <FormFieldWrapper
            name="userId"
            label="User ID"
            required
            :component="InputWrapper"
            :componentProps="{
              placeholder: 'Enter user ID',
              disabled: registerMutation.isPending.value,
              required: true,
            }"
          />

          <FormFieldWrapper
            name="email"
            label="Email"
            required
            :component="InputWrapper"
            :componentProps="{
              type: 'email',
              placeholder: 'Enter your email',
              disabled: registerMutation.isPending.value,
              required: true,
            }"
          />

          <div class="grid grid-cols-2 gap-4">
            <FormFieldWrapper
              name="firstName"
              label="First Name"
              required
              :component="InputWrapper"
              :componentProps="{
                placeholder: 'First name',
                disabled: registerMutation.isPending.value,
                required: true,
              }"
            />

            <FormFieldWrapper
              name="lastName"
              label="Last Name"
              required
              :component="InputWrapper"
              :componentProps="{
                placeholder: 'Last name',
                disabled: registerMutation.isPending.value,
                required: true,
              }"
            />
          </div>

          <FormFieldWrapper
            name="password"
            label="Password"
            required
            :component="InputWrapper"
            :componentProps="{
              type: showPassword ? 'text' : 'password',
              placeholder: 'Enter your password',
              disabled: registerMutation.isPending.value,
              required: true,
            }"
          >
            <template #endContent>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                @click="showPassword = !showPassword"
                class="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
                :disabled="registerMutation.isPending.value"
              >
                <EyeOff v-if="showPassword" class="h-4 w-4" />
                <Eye v-else class="h-4 w-4" />
              </Button>
            </template>
          </FormFieldWrapper>

          <FormFieldWrapper
            name="confirmPassword"
            label="Confirm Password"
            required
            :component="InputWrapper"
            :componentProps="{
              type: showConfirmPassword ? 'text' : 'password',
              placeholder: 'Confirm your password',
              disabled: registerMutation.isPending.value,
              required: true,
            }"
          >
            <template #endContent>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                @click="showConfirmPassword = !showConfirmPassword"
                class="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
                :disabled="registerMutation.isPending.value"
              >
                <EyeOff v-if="showConfirmPassword" class="h-4 w-4" />
                <Eye v-else class="h-4 w-4" />
              </Button>
            </template>
          </FormFieldWrapper>

          <Label for="terms" class="text-sm font-normal flex-wrap">
            <Checkbox
              id="terms"
              v-model="acceptTerms"
              :disabled="registerMutation.isPending.value"
            />
            I agree to the
            <router-link
              to="/terms-of-service"
              class="px-0 text-sm hover:underline text-primary"
              >Terms of Service</router-link
            >
            and
            <router-link
              to="/privacy-policy"
              class="px-0 text-sm hover:underline text-primary"
              >Privacy Policy</router-link
            >
          </Label>

          <Button
            type="submit"
            :disabled="!acceptTerms || registerMutation.isPending.value"
            :isLoading="registerMutation.isPending.value"
            loadingText="Creating account..."
            class="w-full"
            size="lg"
          >
            Create Account
          </Button>
        </div>
      </Form>
    </CardContent>
  </Card>
</template>
