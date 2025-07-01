<script setup lang="ts">
  import { useRouter } from 'vue-router'

  import { useSeo } from '@/composables/useSeo'
  import { Button } from '@/components/ui/button'
  import { ProfileSidebar } from '@/features/profile/ProfileSidebar'
  import { ProfileDetails } from '@/features/profile/ProfileDetails'

  const router = useRouter()

  useSeo({
    title: 'Profile - Vue.js Application',
    description:
      'Manage your profile and account settings. Update your personal information.',
    keywords:
      'Profile, Account Settings, Personal Information, Vue.js, Web Application',
  })

  function handleLogout() {
    localStorage.removeItem('isAuthenticated')
    router.replace('/login')
  }
</script>

<template>
  <div class="min-h-screen relative">
    <header class="flex justify-between items-center p-4">
      <router-link class="w-32 h-12 flex items-center justify-center" to="/">
        <img src="/logo.svg" alt="LOGO" class="h-full object-contain" />
      </router-link>
      <div class="flex items-center gap-4">
        <i-lucide-menu class="w-8 h-8" />
        <Button @click="handleLogout" variant="outline">Logout</Button>
      </div>
    </header>
    <main
      class="flex flex-col md:flex-row max-w-[1120px] mx-auto mt-8 overflow-clip"
    >
      <ProfileSidebar />
      <ProfileDetails />
    </main>
  </div>
</template>
