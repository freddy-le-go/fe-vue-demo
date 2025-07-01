<script setup lang="ts">
import { useRouter } from "vue-router";

import { Button, ButtonLink } from "@/components/ui/button";
import LoginForm from "@/features/auth/LoginForm.vue";

const router = useRouter();

const handleLoginSuccess = (data: {
  username: string;
  rememberMe: boolean;
}): void => {
  localStorage.setItem("isAuthenticated", "true");
  localStorage.setItem("username", data.username);
  if (data.rememberMe) {
    localStorage.setItem("rememberMe", "true");
  }

  router.replace("/profile");
};

const handleLoginError = (error: string): void => {
  console.error("Login error:", error);
  alert(error);
};
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center py-8 px-4"
  >
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
          <svg
            class="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Home
        </Button>
      </div>
    </div>
  </div>
</template>
