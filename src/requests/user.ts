import { useQuery } from 'react-query'

import { apiConfig } from '@/config.global'
import { TUser } from '@/requests/types/user'
import axiosInstance from '@/utils/axios'

const me = async () => {
  const response = await axiosInstance.post(apiConfig.user.me)
  return response.data as TUser
}

export const useMe = () => {
  return useQuery('me', () => me(), {
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error) => {
      console.error(error)
    },
  })
}
