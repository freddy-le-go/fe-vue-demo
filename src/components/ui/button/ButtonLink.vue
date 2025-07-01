<script setup lang="ts">
  import { RouterLink } from 'vue-router'
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@/lib/utils'
  import { type ButtonVariants, buttonVariants } from '.'
  import type { RouteLocationRaw } from 'vue-router'

  interface Props {
    variant?: ButtonVariants['variant']
    size?: ButtonVariants['size']
    class?: HTMLAttributes['class']
    to: RouteLocationRaw
    replace?: boolean
    activeClass?: string
    exactActiveClass?: string
  }

  const props = defineProps<Props>()
</script>

<template>
  <RouterLink
    data-slot="button"
    :to="props.to"
    :replace="props.replace"
    :active-class="props.activeClass"
    :exact-active-class="props.exactActiveClass"
    :class="
      cn(
        buttonVariants({ variant: props.variant, size: props.size }),
        props.class
      )
    "
  >
    <slot />
  </RouterLink>
</template>
