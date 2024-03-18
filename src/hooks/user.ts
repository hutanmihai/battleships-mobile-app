import { useQuery } from 'react-query'

import { me } from '@/requests/user'

export const useMe = () => {
  return useQuery('me', () => me(), {
    onSuccess: (data) => {
      console.log('ME', data)
    },
    onError: (error) => {
      console.error('ME', error)
    },
    refetchOnWindowFocus: false,
    enabled: false, // disable this query from automatically running
  })
}
