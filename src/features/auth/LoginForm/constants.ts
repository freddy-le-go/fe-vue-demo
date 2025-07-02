export const VALIDATION_MESSAGES = {
  USER_ID_REQUIRED: 'User ID is required',
  USER_ID_MIN_LENGTH: 'User ID must be at least 3 characters',
  USER_ID_MAX_LENGTH: 'User ID must be less than 50 characters',
  USER_ID_PATTERN: 'User ID can only contain letters, numbers, and underscores',
  PASSWORD_REQUIRED: 'Password is required',
  PASSWORD_MIN_LENGTH: 'Password must be at least 6 characters',
  PASSWORD_MAX_LENGTH: 'Password must be less than 100 characters',
  PASSWORD_PATTERN:
    'Password must contain at least one uppercase letter, one lowercase letter, and one number',
} as const

export const VALIDATION_RULES = {
  USER_ID_MIN: 3,
  USER_ID_MAX: 50,
  PASSWORD_MIN: 6,
  PASSWORD_MAX: 100,
} as const

export const REGEX_PATTERNS = {
  USER_ID: /^[a-zA-Z0-9_]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
} as const
