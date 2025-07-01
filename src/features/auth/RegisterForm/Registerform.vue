<script setup lang="ts">
  import { ref } from 'vue'

  import { toTypedSchema } from '@vee-validate/zod'

  import { z } from 'zod'
  import { Eye, EyeOff } from 'lucide-vue-next'

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
    onSuccess: [data: { username: string; email: string }]
    onError: [error: string]
  }>()

  const showPassword = ref(false)
  const showConfirmPassword = ref(false)
  const acceptTerms = ref(false)

  const onSubmit = async (values: any) => {
    try {
      // TODO: Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500))

      emit('onSuccess', {
        username: values.userId,
        email: values.email,
      })
    } catch (error) {
      console.error('Registration error:', error)
      emit('onError', 'Registration failed. Please try again.')
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
        @submit="onSubmit"
        :validation-schema="registerSchema"
        v-slot="{ isSubmitting }"
      >
        <div class="space-y-4">
          <FormFieldWrapper
            name="userId"
            label="User ID"
            required
            :component="InputWrapper"
            :componentProps="{
              placeholder: 'Enter user ID',
              disabled: isSubmitting,
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
              disabled: isSubmitting,
              required: true,
            }"
          />

          <FormFieldWrapper
            name="password"
            label="Password"
            required
            :component="InputWrapper"
            :componentProps="{
              type: showPassword ? 'text' : 'password',
              placeholder: 'Enter your password',
              disabled: isSubmitting,
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
                :disabled="isSubmitting"
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
              disabled: isSubmitting,
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
                :disabled="isSubmitting"
              >
                <EyeOff v-if="showConfirmPassword" class="h-4 w-4" />
                <Eye v-else class="h-4 w-4" />
              </Button>
            </template>
          </FormFieldWrapper>

          <Label for="terms" class="text-sm font-normal flex-wrap">
            <Checkbox
              id="terms"
              v-model:checked="acceptTerms"
              @update:modelValue="acceptTerms = !acceptTerms"
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
            :disabled="!acceptTerms"
            :isLoading="isSubmitting"
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
