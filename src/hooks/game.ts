import { useMutation, useQuery } from 'react-query'

import { createGame, getGame, joinGame, listGames, sendMap, strike } from '@/requests/game'
import { TShip, TStrike } from '@/types/game'

export const useListGames = () => {
  return useQuery('listGames', listGames, {
    onSuccess: (data) => {
      console.log('LIST', data)
    },
    onError: (error) => {
      console.error('LIST', error)
    },
  })
}

export const useCreateGame = () => {
  return useQuery('createGame', createGame, {
    onSuccess: (data) => {
      console.log('CREATE', data)
    },
    onError: (error) => {
      console.error('CREATE', error)
    },
  })
}

export const useGetGame = (id: string) => {
  return useQuery(['getGame', id], () => getGame(id), {
    onSuccess: (data) => {
      console.log('GET', data)
    },
    onError: (error) => {
      console.error('GET', error)
    },
  })
}

export const useJoinGame = (id: string) => {
  return useMutation(['joinGame', id], () => joinGame(id), {
    onSuccess: () => {
      console.log('JOINED')
    },
    onError: (error) => {
      console.error('JOIN', error)
    },
  })
}

export const useSendMap = (id: string) => {
  return useMutation(['sendMap', id], (payload: TShip[]) => sendMap(id, payload), {
    onSuccess: () => {
      console.log('MAP')
    },
    onError: (error) => {
      console.error('MAP', error)
    },
  })
}

export const useStrike = (id: string) => {
  return useMutation(['strike', id], (payload: TStrike) => strike(id, payload), {
    onSuccess: () => {
      console.log('STRIKE')
    },
    onError: (error) => {
      console.error('STRIKE', error)
    },
  })
}
