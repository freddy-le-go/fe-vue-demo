<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { useVModel } from "@vueuse/core";
import { cn } from "@/lib/utils";
import { Input } from ".";

const props = defineProps<{
  defaultValue?: string | number;
  modelValue?: string | number;
  class?: HTMLAttributes["class"];
  isError?: boolean;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", payload: string | number): void;
}>();

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
});
</script>

<template>
  <div class="relative">
    <Input
      v-model="modelValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :isError="isError"
      :class="
        cn(
          { 'pr-12': !!$slots.endContent, 'pl-12': !!$slots.startContent },
          props.class
        )
      "
    />

    <!-- Start Content -->
    <div
      v-if="$slots.startContent"
      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
    >
      <slot name="startContent" />
    </div>

    <!-- End Content -->
    <div
      v-if="$slots.endContent"
      class="absolute inset-y-0 right-0 pr-3 flex items-center"
    >
      <slot name="endContent" />
    </div>
  </div>
</template>
