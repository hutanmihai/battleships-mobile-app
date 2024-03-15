import {useMutation} from 'react-query'

import {apiConfig} from '@/config.global'
import {
  TLoginRequest,
  TRegisterRequest,
} from '@/requests/types/auth'
import axiosInstance from '@/utils/axios'
import {storeUser} from '@/utils/session'
import {TUser} from "@/requests/types/user";

const login = async (payload: TLoginRequest) => {
  const response = await axiosInstance.post(apiConfig.auth.login, payload)
  return response.data as TUser
}

export const useLogin = () => {
  return useMutation('login', (payload: TLoginRequest) => login(payload), {
    onSuccess: (data) => {
      storeUser(data)
    },
    onError: (error) => {
      console.error(error)
    },
  })
}

const register = async (payload: TRegisterRequest) => {
  const response = await axiosInstance.post(apiConfig.auth.register, payload)
  return response.data as TUser
}

export const useRegister = () => {
  return useMutation('register', (payload: TRegisterRequest) => register(payload), {
    onSuccess: (data) => {
      storeUser(data)
    },
    onError: (error) => {
      console.error(error)
    },
  })
}
