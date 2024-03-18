import { useQuery } from 'react-query'

import { me } from '@/requests/user'

export const useMe = (isEnabled: boolean) => {
  return useQuery('me', () => me(), {
    onSuccess: (data) => {
      console.log('ME', data)
    },
    onError: (error) => {
      console.error('ME', error)
    },
    enabled: isEnabled,
  })
}
