<script setup lang="ts">
import { ref } from "vue";
import { ButtonLink } from "@/components/ui/button";
import { Menu } from "lucide-vue-next";

const showMenu = ref(false);
</script>

<template>
  <div class="min-h-screen">
    <header class="flex justify-between items-center p-4 border-b">
      <router-link class="w-32 h-12 flex items-center justify-center" to="/">
        <img src="/logo.svg" alt="LOGO" class="h-full object-contain" />
      </router-link>

      <nav class="hidden md:flex items-center gap-4">
        <ButtonLink to="/">Home</ButtonLink>
        <ButtonLink variant="link" to="/login">Login</ButtonLink>
        <ButtonLink variant="link" to="/register">Register</ButtonLink>
        <ButtonLink variant="link" to="/profile">Profile</ButtonLink>
      </nav>

      <div class="md:hidden relative">
        <button @click="showMenu = !showMenu" class="focus:outline-none">
          <Menu class="w-8 h-8" />
        </button>
        <div
          v-if="showMenu"
          class="fixed inset-0 bg-white bg-opacity-95 z-50 flex flex-col items-center justify-center transition-all"
          @click.self="showMenu = false"
        >
          <ButtonLink to="/" class="w-3/4 text-center mb-4 text-lg" @click="showMenu = false">Home</ButtonLink>
          <ButtonLink variant="link" to="/login" class="w-3/4 text-center mb-4 text-lg" @click="showMenu = false">Login</ButtonLink>
          <ButtonLink variant="link" to="/register" class="w-3/4 text-center mb-4 text-lg" @click="showMenu = false">Register</ButtonLink>
          <ButtonLink variant="link" to="/profile" class="w-3/4 text-center text-lg" @click="showMenu = false">Profile</ButtonLink>
        </div>
      </div>
    </header>
    <div class="py-8">
      <div class="max-w-4xl mx-auto px-4">
        <h1 class="text-4xl font-bold text-center text-gray-800 mb-8">
          Welcome to Vue Application
        </h1>
      </div>
    </div>
  </div>
</template>
