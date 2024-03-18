import { AxiosError } from 'axios'
import { router } from 'expo-router'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import { login, register } from '@/requests/auth'
import { me } from '@/requests/user'
import { TLoginRequest, TRegisterRequest } from '@/types/auth'
import { TUser } from '@/types/user'
import { storeTokens } from '@/utils/session'
import { showNotification } from '@/utils/toast'

export const useLogin = () => {
  return useMutation('login', async (payload: TLoginRequest) => await login(payload), {
    onSuccess: async (data) => {
      await storeTokens(data)
      console.log('LOGIN', data)
    },
    onError: (error: AxiosError) => {
      console.error('LOGIN', error)
      showNotification(error.message)
    },
  })
}

export const useRegister = () => {
  return useMutation('register', async (payload: TRegisterRequest) => await register(payload), {
    onSuccess: async (data) => {
      console.log('REGISTER', data)
      router.push('(auth)/login')
    },
    onError: (error: AxiosError) => {
      console.error('REGISTER', error)
      showNotification(error.message)
    },
  })
}
