<script setup lang="ts">
import type { Component, VNode } from "vue";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from ".";

interface IFieldProps {
  name: string;
  value: any;
  onChange: (value: any) => void;
  onBlur: () => void;
  [key: string]: any;
}

interface IProps {
  name: string;
  label: string;
  component?: Component;
  componentProps?: Record<string, any>;
  class?: string;
  required?: boolean;
}

const props = defineProps<IProps>();

defineSlots<{
  default: (props: {
    field: IFieldProps;
    errorMessage: string | undefined;
  }) => VNode[];
}>();
</script>

<template>
  <FormField :name="name" v-slot="{ field, errorMessage }">
    <FormItem :class="props.class">
      <FormLabel
        >{{ label }}
        <span v-if="required" class="text-red-500">*</span>
      </FormLabel>
      <FormControl>
        <slot
          v-if="$slots.default"
          :field="field"
          :errorMessage="errorMessage"
        />
        <component
          v-else-if="component"
          :is="component"
          v-bind="{ ...field, ...componentProps }"
          :isError="!!errorMessage"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
