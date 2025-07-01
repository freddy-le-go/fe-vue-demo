<script setup lang="ts">
  import { ref } from 'vue'
  import { ButtonLink } from '@/components/ui/button'
  import { Menu } from 'lucide-vue-next'
  const showMenu = ref(false)
</script>

<template>
  <header class="flex justify-between items-center p-4 border-b">
    <router-link class="w-32 h-12 flex items-center justify-center" to="/">
      <img
        loading="eager"
        src="/logo.svg"
        alt="Logo"
        title="Logo"
        class="h-full object-contain"
        width="128"
        height="96"
      />
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
        <ButtonLink
          to="/"
          class="w-3/4 text-center mb-4 text-lg"
          @click="showMenu = false"
          >Home</ButtonLink
        >
        <ButtonLink
          variant="link"
          to="/login"
          class="w-3/4 text-center mb-4 text-lg"
          @click="showMenu = false"
          >Login</ButtonLink
        >
        <ButtonLink
          variant="link"
          to="/register"
          class="w-3/4 text-center mb-4 text-lg"
          @click="showMenu = false"
          >Register</ButtonLink
        >
        <ButtonLink
          variant="link"
          to="/profile"
          class="w-3/4 text-center text-lg"
          @click="showMenu = false"
          >Profile</ButtonLink
        >
      </div>
    </div>
  </header>
</template>
