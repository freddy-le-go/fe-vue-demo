<script setup lang="ts">
  import { useSeo } from '@/composables/useSeo'
  import { ProfileSidebar } from '@/features/profile/ProfileSidebar'

  useSeo({
    title: 'Profile - Vue.js Application',
    description:
      'Manage your profile and account settings. Update your personal information.',
    keywords:
      'Profile, Account Settings, Personal Information, Vue.js, Web Application',
  })
</script>

<template>
  <main
    class="flex flex-col md:flex-row max-w-[1120px] mx-auto mt-8 overflow-clip flex-1 w-full"
  >
    <ProfileSidebar />
    <router-view />
  </main>
</template>
