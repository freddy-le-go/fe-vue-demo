export const VALIDATION_SCHEMA = {
  salutation: { required: true, minLength: 2 },
  firstName: { required: true, minLength: 2 },
  lastName: { required: true, minLength: 2 },
  email: { required: true, email: true },
}

export const FIELD_LABELS = {
  salutation: 'Salutation',
  firstName: 'First name',
  lastName: 'Last name',
  email: 'Email address',
  bio: 'Bio',
}

export const SALUTATION_OPTIONS = [
  { value: 'Mr.', label: 'Mr.' },
  { value: 'Mrs.', label: 'Mrs.' },
  { value: 'Ms.', label: 'Ms.' },
  { value: 'Dr.', label: 'Dr.' },
  { value: 'Prof.', label: 'Prof.' },
]

export const ERROR_MESSAGES = {
  PROFILE_UPDATE_FAILED: 'Profile update failed. Please try again.',
  AVATAR_UPLOAD_FAILED: 'Avatar upload failed. Please try again.',
  USER_NOT_FOUND: 'User not found.',
}

export const SUCCESS_MESSAGES = {
  PROFILE_UPDATED: 'Profile updated successfully.',
  AVATAR_UPLOADED: 'Avatar uploaded successfully.',
}

export const UI_TEXT = {
  EDIT_PROFILE: 'Edit Profile',
  MY_PROFILE: 'My Profile',
  GO_BACK: 'Go back to My Profile',
  EDIT_PROFILE_BUTTON: 'Edit profile',
  SAVE: 'Save',
  CANCEL: 'Cancel',
  UPLOAD_IMAGE: 'Upload image',
  MANDATORY_FIELD: '* Mandatory field',
  NO_BIO_PROVIDED: 'No bio provided',
}
