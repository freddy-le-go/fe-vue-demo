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
            :component="InputWrapper"
            :componentProps="{
              placeholder: 'Enter user ID',
              disabled: isSubmitting,
              required: true
            }"
          >
            <template #endContent>
              <svg
                class="h-5 w-5 text-muted-foreground"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                />
              </svg>
            </template>
          </FormFieldWrapper>

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
          >
            <template #endContent>
              <svg
                class="h-5 w-5 text-muted-foreground"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                />
                <path
                  d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                />
              </svg>
            </template>
          </FormFieldWrapper>

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

          <!-- Terms and Conditions -->
          <div class="flex items-center space-x-2">
            <Checkbox id="terms" v-model:checked="acceptTerms" />
            <Label for="terms" class="text-sm font-normal">
              I agree to the
              <Button variant="link" class="px-0 text-sm"
                >Terms of Service</Button
              >
              and
              <Button variant="link" class="px-0 text-sm"
                >Privacy Policy</Button
              >
            </Label>
          </div>

          <!-- Submit Button -->
          <Button
            type="submit"
            :disabled="isSubmitting || !acceptTerms"
            :isLoading="isSubmitting"
            loadingText="Creating account..."
            class="w-full"
            size="lg"
          >
            Create Account
          </Button>
        </div>
      </Form>

      <!-- Divider -->
      <div class="relative my-6">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-border"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 bg-card text-muted-foreground"
            >Or continue with</span
          >
        </div>
      </div>

      <!-- Social Login Buttons -->
      <div class="space-y-3">
        <Button
          type="button"
          variant="outline"
          @click="handleSocialLogin('google')"
          class="w-full"
        >
          <GoogleLogo class="mr-3" />
          Continue with Google
        </Button>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-vue-next";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
  FormFieldWrapper,
} from "@/components/ui/form";
import { InputWrapper } from "@/components/ui/input";
import { GoogleLogo } from "@/components/ui/icons";

// Define the form schema with Zod
const registerSchema = toTypedSchema(
  z.object({
    userId: z
      .string()
      .min(1, "User ID is required")
      .min(3, "User ID must be at least 3 characters")
      .max(50, "User ID must be less than 50 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "User ID can only contain letters, numbers, and underscores"
      ),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password must be less than 100 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
);

// Define emits for event handling
const emit = defineEmits<{
  onSuccess: [data: { username: string; email: string }];
  onError: [error: string];
}>();

const showPassword = ref(false);
const showConfirmPassword = ref(false);
const acceptTerms = ref(false);

const onSubmit = async (values: { userId: string; email: string; password: string; confirmPassword: string }) => {
  try {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Call success callback
    emit('onSuccess', {
      username: values.userId,
      email: values.email,
    });
  } catch (error) {
    console.error("Registration error:", error);
    emit('onError', "Registration failed. Please try again.");
  }
};

// Handle social login
const handleSocialLogin = (provider: string): void => {
  console.log(`Social registration with ${provider}`);
  // Implement social registration logic here
};
</script>
