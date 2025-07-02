<script setup lang="ts">
  import { ref, computed } from 'vue'

  import { ArrowLeft, Pencil, Save, X } from 'lucide-vue-next'

  import { useAuthStore } from '@/stores/auth'
  import {
    useProfileQuery,
    useUpdateProfileMutation,
    useUploadAvatarMutation,
  } from '@/composables/useProfileQueries'
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
  const uploadAvatarMutation = useUploadAvatarMutation()

  const isEditMode = ref(false)

  const schema = {
    salutation: { required: true, minLength: 2 },
    firstName: { required: true, minLength: 2 },
    lastName: { required: true, minLength: 2 },
    email: { required: true, email: true },
  }

  const Salutation = 'Salutation'
  const FirstName = 'First name'
  const LastName = 'Last name'
  const Email = 'Email address'

  const handleUpdateProfile = async (values: any) => {
    if (!userId) return

    try {
      await updateProfileMutation.mutateAsync({
        userId,
        data: {
          firstName: values.firstName,
          lastName: values.lastName,
          bio: values.bio,
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
      await uploadAvatarMutation.mutateAsync({ userId, file })
    } catch {
      alert('Avatar upload failed. Please try again.')
    }
  }

  const onAvatarChange = (event: Event, field: any) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]

    if (file && userId) {
      handleAvatarUpload(event)
      // Update the field value with a temporary URL for preview
      field.onChange(URL.createObjectURL(file))
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
        <span v-if="isEditMode">Edit Profile</span>
        <span v-else>My Profile</span>
      </h1>
      <template v-if="isEditMode">
        <Button variant="secondary" @click="cancelEdit">
          <ArrowLeft class="size-4" />
          Go back to My Profile
        </Button>
      </template>
      <template v-else>
        <Button variant="secondary" @click="isEditMode = true">
          <Pencil class="size-4" />
          Edit profile
        </Button>
      </template>
    </div>
    <Form
      v-if="isEditMode"
      class="flex flex-col md:flex-row gap-4 md:gap-8 items-start"
      :validation-schema="schema"
      :initial-values="{ ...profile }"
      @submit="saveProfile"
      v-slot="{ isSubmitting, meta }"
    >
      <FormFieldWrapper name="avatar" class="max-md:w-full">
        <template #default="{ field }">
          <div class="flex flex-col items-center">
            <img
              :src="field.value"
              alt="User Avatar"
              class="size-40 rounded-full object-cover border border-gray-200 aspect-square max-lg:size-32 max-md:size-40 max-lg:min-w-32"
            />
            <label class="mt-2 text-xs text-primary underline cursor-pointer">
              <input
                type="file"
                class="hidden"
                @change="e => onAvatarChange(e, field)"
              />
              Upload image
            </label>
          </div>
        </template>
      </FormFieldWrapper>
      <div class="space-y-6 w-full max-w-full md:max-w-md">
        <FormFieldWrapper name="salutation" :label="Salutation" required>
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
        <FormFieldWrapper name="firstName" :label="FirstName" required>
          <template #default="{ field, errorMessage }">
            <InputWrapper
              v-bind="field"
              :defaultValue="field.value"
              placeholder="Enter first name"
              :isError="!!errorMessage"
            />
          </template>
        </FormFieldWrapper>
        <FormFieldWrapper name="lastName" :label="LastName" required>
          <template #default="{ field, errorMessage }">
            <InputWrapper
              v-bind="field"
              :defaultValue="field.value"
              placeholder="Enter last name"
              :isError="!!errorMessage"
            />
          </template>
        </FormFieldWrapper>
        <FormFieldWrapper name="email" :label="Email" required>
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
        <div class="flex gap-4 mt-8">
          <Button
            type="submit"
            class="flex-1"
            :disabled="isSubmitting || !meta.dirty"
          >
            <Save class="size-4" />
            Save
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
        <div class="text-xs text-destructive-foreground mt-2">
          * Mandatory field
        </div>
      </div>
    </Form>
    <div v-else class="flex flex-col md:flex-row gap-4 md:gap-8">
      <div class="flex flex-col items-center">
        <img
          :src="profile?.avatar"
          alt="User Avatar"
          class="size-40 rounded-full object-cover border border-gray-200 aspect-square max-lg:size-32 max-md:size-40 max-lg:min-w-32"
        />
      </div>
      <div class="space-y-6 w-full max-w-full md:max-w-md">
        <div class="flex flex-col gap-1">
          <Label>First name</Label>
          <div>{{ profile?.firstName }}</div>
        </div>
        <div class="flex flex-col gap-1">
          <Label>Last name</Label>
          <div>{{ profile?.lastName }}</div>
        </div>
        <div class="flex flex-col gap-1">
          <Label>Email address</Label>
          <div>{{ profile?.email }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
