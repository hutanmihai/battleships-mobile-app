import { useMutation } from 'react-query'

import { apiConfig } from '@/config.global'
import { TLoginRequest, TRegisterRequest, TTokens } from '@/requests/types/auth'
import axiosInstance from '@/utils/axios'

const login = async (payload: TLoginRequest) => {
  const response = await axiosInstance.post(apiConfig.auth.login, payload)
  return response.data as TTokens
}

export const useLogin = () => {
  return useMutation('login', async (payload: TLoginRequest) => await login(payload), {
    onSuccess: (data) => {
      console.log('USER TOKENS', data)
    },
    onError: (error) => {
      console.error(error)
    },
  })
}

const register = async (payload: TRegisterRequest) => {
  const response = await axiosInstance.post(apiConfig.auth.register, payload)
  return response.data as TTokens
}

export const useRegister = () => {
  return useMutation('register', async (payload: TRegisterRequest) => await register(payload), {
    onError: (error) => {
      console.error(error)
    },
  })
}
