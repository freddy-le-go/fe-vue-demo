<script setup lang="ts">
import { useRouter } from "vue-router";

import { Button } from "@/components/ui/button";
import { ProfileSidebar } from "@/features/profile/ProfileSidebar";
import { ProfileDetails } from "@/features/profile/ProfileDetails";

const router = useRouter();
function handleLogout() {
  localStorage.removeItem("isAuthenticated");
  router.replace("/login");
}
</script>

<template>
  <div class="min-h-screen relative">
    <header class="flex justify-between items-center p-4">
      <div class="w-32 h-12 flex items-center justify-center">LOGO</div>
      <div class="flex items-center gap-4">
        <i-lucide-menu class="w-8 h-8" />
        <Button @click="handleLogout" variant="outline">Logout</Button>
      </div>
    </header>
    <main class="flex max-w-[1440px] mx-auto mt-8 overflow-clip">
      <ProfileSidebar />
      <ProfileDetails />
    </main>
  </div>
</template>
