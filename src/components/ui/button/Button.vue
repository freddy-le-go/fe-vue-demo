<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Primitive, type PrimitiveProps } from 'reka-ui'
import { cn } from '@/lib/utils'
import { type ButtonVariants, buttonVariants } from '.'
import { LoadingIndicator } from '@/components/ui/loading'

  interface Props extends PrimitiveProps {
    variant?: ButtonVariants['variant']
    size?: ButtonVariants['size']
    class?: HTMLAttributes['class']
    isLoading?: boolean
    loadingText?: string
    loadingType?: 'spinner' | 'dots' | 'pulse' | 'bars' | 'ring'
    loadingSize?: 'sm' | 'md' | 'lg' | 'xl'
    disabled?: boolean
  }

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  isLoading: false,
  loadingText: 'Loading...',
  loadingType: 'spinner',
  loadingSize: 'md',
  disabled: false,
})
</script>

<template>
  <Primitive
    data-slot="button"
    :as="as"
    :as-child="asChild"
    :disabled="disabled || isLoading"
    :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <LoadingIndicator
      v-if="isLoading"
      :type="loadingType"
      :size="loadingSize"
      color="current"
      class="-ml-1 mr-3"
    />
    <slot v-if="!isLoading" />
    <span v-else>{{ loadingText }}</span>
  </Primitive>
</template>
