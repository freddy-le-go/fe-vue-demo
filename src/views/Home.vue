<template>
  <div class="min-h-screen py-8">
    <div class="max-w-4xl mx-auto px-4">
      <h1 class="text-4xl font-bold text-center text-gray-800 mb-8">
        Welcome to Vue Application
      </h1>

      <div class="flex justify-center gap-4 mb-8">
        <ButtonLink to="/">Home</ButtonLink>
        <ButtonLink to="/login">Login</ButtonLink>
        <ButtonLink to="/profile">Profile</ButtonLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ButtonLink } from "@/components/ui/button";
</script>