<script setup lang="ts">
import { ref, computed } from 'vue'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

import {
  Pencil,
  Save,
  X,
  ArrowLeftIcon,
  Upload,
  UserIcon,
} from 'lucide-vue-next'

import {
  useProfileQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
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

import type { IUpdateProfileRequest } from '@/lib/api'

const authStore = useAuthStore()
const userId = authStore.user?.userId

const { data: profileResponse } = useProfileQuery(userId || '')
const profile = computed(() => profileResponse.value?.data)

const updateProfileMutation = useUpdateProfileMutation()
const uploadAvatarMutation = useUploadAvatarMutation()
const isEditMode = ref(false)
const fileInput = ref<HTMLInputElement>()

const schema = toTypedSchema(
  z.object({
    salutation: z.string().min(1, 'Salutation is required'),
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
  }),
)

const handleUpdateProfile = async (values: IUpdateProfileRequest) => {
  if (!userId) return

  try {
    await updateProfileMutation.mutateAsync({
      userId,
      data: {
        salutation: values.salutation,
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

const handleAvatarUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file || !userId) return

  try {
    const blobUrl = URL.createObjectURL(file)

    if (profile.value) {
      profile.value.avatar = blobUrl
    }

    await uploadAvatarMutation.mutateAsync({ userId, file })

    URL.revokeObjectURL(blobUrl)
  } catch {
    alert('Avatar upload failed. Please try again.')
    if (profile.value) {
      profile.value.avatar = profileResponse.value?.data?.avatar || ''
    }
  }
}

const onAvatarChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file && userId) {
    handleAvatarUpload(event)
  }
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

const saveProfile = async (values: IUpdateProfileRequest) => {
  await handleUpdateProfile(values)
}

const cancelEdit = () => {
  isEditMode.value = false
}
</script>

<template>
  <section class="flex-1 p-4 md:p-8">
    <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4 md:gap-0">
      <h1 class="text-3xl font-bold">
        <span v-if="isEditMode">Edit Profile</span>
        <span v-else>My Profile</span>
      </h1>
      <template v-if="isEditMode">
        <Button variant="secondary" @click="cancelEdit">
          <ArrowLeftIcon class="size-4" />
          Back to My Profile
        </Button>
      </template>
      <template v-else>
        <Button variant="secondary" @click="isEditMode = true">
          <Pencil class="size-4" />
          Edit Details
        </Button>
      </template>
    </div>

    <div class="flex flex-col md:flex-row gap-8">
      <div class="flex flex-col items-center space-y-4">
        <div class="relative">
          <img v-if="profile?.avatar" :src="profile?.avatar" alt="User Avatar"
            class="w-32 h-32 rounded-full object-cover border-2 border-gray-200" />
          <div v-else
            class="w-32 h-32 rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center">
            <UserIcon class="w-16 h-16 text-gray-400" />
          </div>
          <div v-if="uploadAvatarMutation.isPending.value"
            class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
            <div class="text-white text-sm">Uploading...</div>
          </div>
        </div>

        <div class="flex flex-col items-center space-y-2">
          <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="onAvatarChange" />
          <Button variant="outline" size="sm" @click="triggerFileInput"
            :disabled="uploadAvatarMutation.isPending.value">
            <Upload class="size-4 mr-2" />
            {{
              uploadAvatarMutation.isPending.value
                ? 'Uploading...'
                : 'Upload Avatar'
            }}
          </Button>
          <p class="text-xs text-muted-foreground text-center">
            JPG, PNG or GIF. Max 5MB.
          </p>
        </div>
      </div>

      <!-- Form Section -->
      <div class="flex-1">
        <Form v-if="isEditMode" class="max-w-2xl space-y-6" :validation-schema="schema" :initial-values="{ ...profile }"
          @submit="saveProfile" v-slot="{ isSubmitting, meta }">
          <FormFieldWrapper name="salutation" label="Salutation" required>
            <template #default="{ field, errorMessage }">
              <Select v-model="field.value" @update:modelValue="field.onChange">
                <SelectTrigger class="w-full" :isError="!!errorMessage">
                  <SelectValue placeholder="Select salutation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="option in SALUTATION_OPTIONS" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </template>
          </FormFieldWrapper>

          <FormFieldWrapper name="firstName" label="First Name" required>
            <template #default="{ field, errorMessage }">
              <InputWrapper v-bind="field" :defaultValue="field.value" placeholder="Enter first name"
                :isError="!!errorMessage" />
            </template>
          </FormFieldWrapper>

          <FormFieldWrapper name="lastName" label="Last Name" required>
            <template #default="{ field, errorMessage }">
              <InputWrapper v-bind="field" :defaultValue="field.value" placeholder="Enter last name"
                :isError="!!errorMessage" />
            </template>
          </FormFieldWrapper>

          <FormFieldWrapper name="email" label="Email Address" required>
            <template #default="{ field, errorMessage }">
              <InputWrapper v-bind="field" :defaultValue="field.value" placeholder="Enter email address" type="email"
                :isError="!!errorMessage" />
            </template>
          </FormFieldWrapper>

          <div class="flex gap-4 pt-4">
            <Button type="submit" class="flex-1" :disabled="isSubmitting || !meta.dirty">
              <Save class="size-4" />
              Save Changes
            </Button>
            <Button type="button" class="flex-1" variant="secondary" @click="cancelEdit" :disabled="isSubmitting">
              <X class="size-4" />
              Cancel
            </Button>
          </div>
        </Form>

        <div v-else class="max-w-2xl space-y-6">
          <div class="flex flex-col gap-6">
            <div class="space-y-2">
              <Label class="text-sm font-medium text-muted-foreground">Salutation</Label>
              <div class="text-lg">
                {{ profile?.salutation || 'Not specified' }}
              </div>
            </div>
            <div class="space-y-2">
              <Label class="text-sm font-medium text-muted-foreground">First Name</Label>
              <div class="text-lg">
                {{ profile?.firstName || 'Not specified' }}
              </div>
            </div>
            <div class="space-y-2">
              <Label class="text-sm font-medium text-muted-foreground">Last Name</Label>
              <div class="text-lg">
                {{ profile?.lastName || 'Not specified' }}
              </div>
            </div>
            <div class="space-y-2">
              <Label class="text-sm font-medium text-muted-foreground">Email Address</Label>
              <div class="text-lg">{{ profile?.email || 'Not specified' }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
