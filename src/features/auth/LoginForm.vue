<template>
  <Card class="p-6">
    <Form
      @submit="onSubmit"
      :validation-schema="loginSchema"
      v-slot="{ isSubmitting }"
    >
      <div class="space-y-6">
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
        >
          <template #endContent>
            <UserIcon />
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

        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <Checkbox id="remember" v-model:checked="rememberMe" />
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
          :isLoading="isSubmitting"
          loadingText="Signing in..."
          class="w-full"
          size="lg"
        >
          Sign In
        </Button>
      </div>
    </Form>
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
import { Card } from "@/components/ui/card";
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

const loginSchema = toTypedSchema(
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
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password must be less than 100 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
  })
);

const emit = defineEmits<{
  onSuccess: [data: { username: string; rememberMe: boolean }];
  onError: [error: string];
}>();

const showPassword = ref(false);
const rememberMe = ref(false);

const onSubmit = async (values: any) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    emit("onSuccess", {
      username: values.userId,
      rememberMe: rememberMe.value,
    });
  } catch (error) {
    console.error("Login error:", error);
    emit("onError", "Login failed. Please try again.");
  }
};

const handleSocialLogin = (provider: string): void => {
  console.log(`Social login with ${provider}`);
};
</script>
