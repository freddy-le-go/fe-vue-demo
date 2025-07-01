<script setup lang="ts">
import { computed } from "vue";
import { cn } from "@/lib/utils";

interface Props {
  type?: "spinner" | "dots" | "pulse" | "bars" | "ring";
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "secondary" | "white" | "current";
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "spinner",
  size: "md",
  color: "current",
});

const sizeClasses = computed(() => ({
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-8 w-8",
}));

const colorClasses = computed(() => ({
  primary: "text-primary",
  secondary: "text-secondary",
  white: "text-white",
  current: "text-current",
}));
</script>

<template>
  <div :class="cn('inline-flex items-center', props.class)">
    <svg
      v-if="type === 'spinner'"
      :class="cn('animate-spin', sizeClasses[size], colorClasses[color])"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>

    <div
      v-else-if="type === 'dots'"
      :class="cn('flex space-x-1', sizeClasses[size])"
    >
      <div
        v-for="i in 3"
        :key="i"
        :class="
          cn(
            'rounded-full bg-current animate-pulse',
            colorClasses[color],
            size === 'sm'
              ? 'h-1 w-1'
              : size === 'md'
              ? 'h-1.5 w-1.5'
              : size === 'lg'
              ? 'h-2 w-2'
              : 'h-2.5 w-2.5'
          )
        "
        :style="{ animationDelay: `${(i - 1) * 0.2}s` }"
      />
    </div>

    <div
      v-else-if="type === 'pulse'"
      :class="
        cn(
          'rounded-full animate-pulse',
          sizeClasses[size],
          colorClasses[color],
          'bg-current'
        )
      "
    />

    <div
      v-else-if="type === 'bars'"
      :class="cn('flex space-x-1', sizeClasses[size])"
    >
      <div
        v-for="i in 3"
        :key="i"
        :class="
          cn(
            'bg-current animate-pulse',
            colorClasses[color],
            size === 'sm'
              ? 'h-3 w-0.5'
              : size === 'md'
              ? 'h-4 w-1'
              : size === 'lg'
              ? 'h-5 w-1'
              : 'h-6 w-1.5'
          )
        "
        :style="{ animationDelay: `${(i - 1) * 0.15}s` }"
      />
    </div>

    <svg
      v-else-if="type === 'ring'"
      :class="cn('animate-spin', sizeClasses[size], colorClasses[color])"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="round"
        stroke-dasharray="31.416"
        stroke-dashoffset="31.416"
        class="animate-[spin_1.5s_linear_infinite]"
      />
    </svg>
  </div>
</template>
