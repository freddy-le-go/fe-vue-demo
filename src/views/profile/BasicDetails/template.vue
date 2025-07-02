<script setup lang="ts">
  import { ref, computed } from 'vue'

  import { Pencil, Save, X } from 'lucide-vue-next'

  import {
    useProfileQuery,
    useUpdateProfileMutation,
  } from '@/composables/useProfileQueries'
  import { useAuthStore } from '@/stores/auth'
  import { Button } from '@/components/ui/button'
  import { InputWrapper } from '@/components/ui/input'
  import { Form, FormFieldWrapper } from '@/components/ui/form'
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select'
  import { Label } from '@/components/ui/label'

  import { SALUTATION_OPTIONS } from './constants'
  const authStore = useAuthStore()
  const userId = authStore.user?.userId

  const { data: profileResponse } = useProfileQuery(userId || '')
  const profile = computed(() => profileResponse.value?.data)

  const updateProfileMutation = useUpdateProfileMutation()
  const isEditMode = ref(false)

  const schema = {
    salutation: { required: true, minLength: 2 },
    firstName: { required: true, minLength: 2 },
    lastName: { required: true, minLength: 2 },
    email: { required: true, email: true },
  }

  const handleUpdateProfile = async (values: any) => {
    if (!userId) return

    try {
      await updateProfileMutation.mutateAsync({
        userId,
        data: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
        },
      })
      isEditMode.value = false
    } catch {
      alert('Profile update failed. Please try again.')
    }
  }

  const saveProfile = async (values: any) => {
    await handleUpdateProfile(values)
  }

  const cancelEdit = () => {
    isEditMode.value = false
  }
</script>

<template>
  <section class="flex-1 p-4 md:p-8">
    <div
      class="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4 md:gap-0"
    >
      <h1 class="text-3xl font-bold">
        <span v-if="isEditMode">Edit Basic Details</span>
        <span v-else>Basic Details</span>
      </h1>
      <template v-if="isEditMode">
        <Button variant="secondary" @click="cancelEdit">
          <X class="size-4" />
          Cancel
        </Button>
      </template>
      <template v-else>
        <Button variant="secondary" @click="isEditMode = true">
          <Pencil class="size-4" />
          Edit Details
        </Button>
      </template>
    </div>

    <Form
      v-if="isEditMode"
      class="max-w-2xl space-y-6"
      :validation-schema="schema"
      :initial-values="{ ...profile }"
      @submit="saveProfile"
      v-slot="{ isSubmitting, meta }"
    >
      <FormFieldWrapper name="salutation" label="Salutation" required>
        <template #default="{ field, errorMessage }">
          <Select v-model="field.value" @update:modelValue="field.onChange">
            <SelectTrigger class="w-full" :isError="!!errorMessage">
              <SelectValue placeholder="Select salutation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="option in SALUTATION_OPTIONS"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </template>
      </FormFieldWrapper>

      <FormFieldWrapper name="firstName" label="First Name" required>
        <template #default="{ field, errorMessage }">
          <InputWrapper
            v-bind="field"
            :defaultValue="field.value"
            placeholder="Enter first name"
            :isError="!!errorMessage"
          />
        </template>
      </FormFieldWrapper>

      <FormFieldWrapper name="lastName" label="Last Name" required>
        <template #default="{ field, errorMessage }">
          <InputWrapper
            v-bind="field"
            :defaultValue="field.value"
            placeholder="Enter last name"
            :isError="!!errorMessage"
          />
        </template>
      </FormFieldWrapper>

      <FormFieldWrapper name="email" label="Email Address" required>
        <template #default="{ field, errorMessage }">
          <InputWrapper
            v-bind="field"
            :defaultValue="field.value"
            placeholder="Enter email address"
            type="email"
            :isError="!!errorMessage"
          />
        </template>
      </FormFieldWrapper>

      <div class="flex gap-4 pt-4">
        <Button
          type="submit"
          class="flex-1"
          :disabled="isSubmitting || !meta.dirty"
        >
          <Save class="size-4" />
          Save Changes
        </Button>
        <Button
          type="button"
          class="flex-1"
          variant="secondary"
          @click="cancelEdit"
          :disabled="isSubmitting"
        >
          <X class="size-4" />
          Cancel
        </Button>
      </div>
    </Form>

    <div v-else class="space-y-6 w-full">
      <div class="flex flex-col gap-6">
        <div class="space-y-2">
          <Label class="text-sm font-medium text-muted-foreground"
            >Salutation</Label
          >
          <div class="text-lg">
            {{ profile?.salutation || 'Not specified' }}
          </div>
        </div>
        <div class="space-y-2">
          <Label class="text-sm font-medium text-muted-foreground"
            >First Name</Label
          >
          <div class="text-lg">{{ profile?.firstName }}</div>
        </div>
        <div class="space-y-2">
          <Label class="text-sm font-medium text-muted-foreground"
            >Last Name</Label
          >
          <div class="text-lg">{{ profile?.lastName }}</div>
        </div>
        <div class="space-y-2 md:col-span-2">
          <Label class="text-sm font-medium text-muted-foreground"
            >Email Address</Label
          >
          <div class="text-lg">{{ profile?.email }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
