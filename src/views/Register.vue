<script setup lang="ts">
import { useRouter } from "vue-router";

import { Button, ButtonLink } from "@/components/ui/button";
import RegisterForm from "@/features/auth/RegisterForm.vue";

const router = useRouter();

const handleRegisterSuccess = (data: {
  username: string;
  email: string;
}): void => {
  localStorage.setItem("isAuthenticated", "true");
  localStorage.setItem("username", data.username);
  localStorage.setItem("email", data.email);

  router.replace("/login");
};

const handleRegisterError = (error: string): void => {
  console.error("Registration error:", error);
  alert(error);
};
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center py-8 px-4"
  >
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
