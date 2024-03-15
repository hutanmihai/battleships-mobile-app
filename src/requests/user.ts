import { useQuery } from 'react-query'

import { apiConfig } from '@/config.global'
import { TUser } from '@/requests/types/user'
import axiosInstance from '@/utils/axios'

const me = async () => {
  console.log('ME')
  const response = await axiosInstance.post(apiConfig.user.me)
  return response.data as TUser
}

export const useMe = () => {
  return useQuery('me', () => me(), {
    onSuccess: (data) => {
      console.log('USER', data)
    },
    onError: (error) => {
      console.error(error)
    },
    refetchOnWindowFocus: false,
    enabled: false, // disable this query from automatically running
  })
}
