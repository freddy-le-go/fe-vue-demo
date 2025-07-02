<!-- eslint-disable no-unused-vars -->
<script setup lang="ts">
import type { Component, VNode } from 'vue'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '.'

interface IProps {
  name: string
  label?: string
  component?: Component
  componentProps?: Record<string, any>
  class?: string
  required?: boolean
}

const props = defineProps<IProps>()

defineSlots<{
  default: (props: { field: { value: any; onChange: (value: any) => void; onBlur: (e: Event) => void;[key: string]: any }; errorMessage: string | undefined }) => VNode[]
  endContent?: () => VNode[]
  startContent?: () => VNode[]
}>()
</script>

<template>
  <FormField :name="name" v-slot="{ field, errorMessage }">
    <FormItem :class="props.class">
      <FormLabel v-if="label">{{ label }}
        <span v-if="required" class="text-red-500">*</span>
      </FormLabel>
      <FormControl>
        <slot v-if="$slots.default" :field="{ ...field, value: field.value || '' }" :errorMessage="errorMessage" />
        <component v-else-if="component" :is="component" v-bind="{ ...field, ...componentProps }"
          :isError="!!errorMessage">
          <template v-if="$slots.endContent" #endContent>
            <slot name="endContent" />
          </template>
          <template v-if="$slots.startContent" #startContent>
            <slot name="startContent" />
          </template>
        </component>
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
