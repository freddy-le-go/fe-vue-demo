<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { cn } from '@/lib/utils'
import { ButtonLink } from '@/components/ui/button'

import { ITEMS } from './constants'

const route = useRoute()

const isActive = computed(() => (path: string) => {
  return route.path === path
})
</script>

<template>
  <aside class="w-full p-2 md:w-60 md:p-6">
    <nav>
      <ul class="space-y-1">
        <li v-for="item in ITEMS" :key="item.name" :class="cn(
          'pl-2 relative flex items-center h-8',
          isActive(item.path)
            ? 'font-bold before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-primary'
            : 'text-muted-foreground'
        )
          ">
          <ButtonLink :to="item.path" variant="ghost" class="w-full justify-start h-8 px-2 font-inherit" :class="isActive(item.path) ? 'text-foreground' : 'text-muted-foreground'
            ">
            {{ item.name }}
          </ButtonLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>
