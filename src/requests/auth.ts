import { useMutation } from 'react-query'

import { apiConfig } from '@/config.global'
import {
  TLoginRequest,
  TLoginResponse,
  TRegisterRequest,
  TRegisterResponse,
} from '@/requests/types/auth'
import axiosInstance from '@/utils/axios'
import { storeUser } from '@/utils/session'

const login = async (payload: TLoginRequest) => {
  const response = await axiosInstance.post(apiConfig.auth.login, payload)
  return response.data as TLoginResponse
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
  return response.data as TRegisterResponse
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
