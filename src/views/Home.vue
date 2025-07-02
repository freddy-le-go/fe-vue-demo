<script setup lang="ts">
import { useSeo } from '@/composables/useSeo'

useSeo({
  title: 'Home - Vue.js Application',
  description:
      'Welcome to our Vue.js application. Explore our modern web application built with Vue 3, TypeScript, and Tailwind CSS.',
  keywords: 'Vue.js, Home, TypeScript, Tailwind CSS, Web Application',
})
</script>

<template>
  <div class="py-8">
    <div class="max-w-4xl mx-auto px-4">
      <h1 class="text-4xl font-bold text-center text-gray-800 mb-8">
        Welcome to Vue Application
      </h1>
    </div>
  </div>
</template>
