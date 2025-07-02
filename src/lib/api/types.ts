export interface IUser {
  id: string
  userId: string
  email: string
  firstName: string
  lastName: string
  salutation?: string
  avatar?: string
}

export interface ILoginRequest {
  userId: string
  password: string
}

export interface ILoginResponse {
  user: IUser
  token: string
  expiresAt: string
}

export interface IRegisterRequest {
  userId: string
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface IRegisterResponse {
  user: IUser
  token: string
  expiresAt: string
}

export interface IUpdateProfileRequest {
  salutation?: string
  firstName?: string
  lastName?: string
  email?: string
  bio?: string
  avatar?: string
}

export interface IUpdateProfileResponse {
  user: IUser
}

export interface IApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface IApiError {
  message: string
  code: string
  details?: Record<string, any>
}
