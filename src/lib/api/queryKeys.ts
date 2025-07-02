export const queryKeys = {
  auth: {
    all: ['auth'] as const,
    user: () => [...queryKeys.auth.all, 'user'] as const,
    profile: (userId: string) =>
      [...queryKeys.auth.all, 'profile', userId] as const,
  },
  profile: {
    all: ['profile'] as const,
    user: (userId: string) =>
      [...queryKeys.profile.all, 'user', userId] as const,
    stats: (userId: string) =>
      [...queryKeys.profile.all, 'stats', userId] as const,
  },
  users: {
    all: ['users'] as const,
    list: () => [...queryKeys.users.all, 'list'] as const,
    detail: (userId: string) =>
      [...queryKeys.users.all, 'detail', userId] as const,
  },
} as const
