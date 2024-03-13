import { TUser } from '@/requests/types/user'

export type TLoginRequest = {
  email: string
  password: string
}

export type TRegisterRequest = {
  email: string
  password: string
}

export type TLoginResponse = TUser

export type TRegisterResponse = TUser
