<script setup lang="ts">
  import AppHeader from '@/components/AppHeader'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <slot />
  </div>
</template>
