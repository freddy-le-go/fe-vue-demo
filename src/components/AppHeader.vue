<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { ButtonLink } from '@/components/ui/button'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-vue-next'

const showMenu = ref(false)
const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
  showMenu.value = false
}
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
      <template v-if="!authStore.isAuthenticated">
        <ButtonLink variant="link" to="/login">Login</ButtonLink>
        <ButtonLink variant="link" to="/register">Register</ButtonLink>
      </template>
      <template v-else>
        <ButtonLink variant="link" to="/profile">Profile</ButtonLink>
        <Button variant="outline" @click="authStore.logout()">Logout</Button>
      </template>
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
        <template v-if="!authStore.isAuthenticated">
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
        </template>
        <template v-else>
          <ButtonLink
            variant="link"
            to="/profile"
            class="w-3/4 text-center mb-4 text-lg"
            @click="showMenu = false"
            >Profile</ButtonLink
          >
          <Button
            variant="outline"
            class="w-3/4 text-center text-lg"
            @click="handleLogout"
            >Logout</Button
          >
        </template>
      </div>
    </div>
  </header>
</template>
