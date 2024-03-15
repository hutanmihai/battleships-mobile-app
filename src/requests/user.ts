import { useQuery } from 'react-query'

import { apiConfig } from '@/config.global'
import { TMeResponse } from '@/requests/types/user'
import axiosInstance from '@/utils/axios'

const me = async () => {
  const response = await axiosInstance.get(apiConfig.user.me)
  return response.data as TMeResponse
}

export const useMe = () => {
  return useQuery('me', () => me(), {
    onSuccess: (data) => {
      console.log('ME', data)
    },
    onError: (error) => {
      console.error(error)
    },
    refetchOnWindowFocus: false,
    enabled: false, // disable this query from automatically running
  })
}
