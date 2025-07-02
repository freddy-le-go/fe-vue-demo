import { z } from 'zod'

import { toTypedSchema } from '@vee-validate/zod'

import {
  REGEX_PATTERNS,
  VALIDATION_RULES,
  VALIDATION_MESSAGES,
} from './constants'

export const loginSchema = toTypedSchema(
  z.object({
    userId: z
      .string()
      .min(1, VALIDATION_MESSAGES.USER_ID_REQUIRED)
      .min(VALIDATION_RULES.USER_ID_MIN, VALIDATION_MESSAGES.USER_ID_MIN_LENGTH)
      .max(VALIDATION_RULES.USER_ID_MAX, VALIDATION_MESSAGES.USER_ID_MAX_LENGTH)
      .regex(REGEX_PATTERNS.USER_ID, VALIDATION_MESSAGES.USER_ID_PATTERN),
    password: z
      .string()
      .min(1, VALIDATION_MESSAGES.PASSWORD_REQUIRED)
      .min(
        VALIDATION_RULES.PASSWORD_MIN,
        VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH
      )
      .max(
        VALIDATION_RULES.PASSWORD_MAX,
        VALIDATION_MESSAGES.PASSWORD_MAX_LENGTH
      )
      .regex(REGEX_PATTERNS.PASSWORD, VALIDATION_MESSAGES.PASSWORD_PATTERN),
  })
)
