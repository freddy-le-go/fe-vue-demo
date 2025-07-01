<script setup lang="ts">
import { cn } from "@/lib/utils";

const ITEMS = [
  "Basic Details",
  "Additional Details",
  "Spouse Details",
  "Personal Preferences",
];
const ACTIVE = "Basic Details";
</script>

<template>
  <aside class="w-full p-2 md:w-60 md:p-6">
    <nav>
      <ul class="space-y-1">
        <li
          v-for="item in ITEMS"
          :key="item"
          :class="
            cn(
              'pl-4 relative flex items-center h-8',
              item === ACTIVE
                ? 'font-bold before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-primary'
                : 'text-muted-foreground'
            )
          "
        >
          {{ item }}
        </li>
      </ul>
    </nav>
  </aside>
</template>
