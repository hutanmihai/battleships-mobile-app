import { useMutation, useQuery } from 'react-query'

import { createGame, getGame, joinGame, listGames, sendMap, strike } from '@/requests/game'
import { TShip, TStrike } from '@/types/game'

export const useListGames = () => {
  return useQuery('listGames', listGames, {
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error) => {
      console.error(error)
    },
  })
}

export const useCreateGame = () => {
  return useQuery('createGame', createGame, {
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error) => {
      console.error(error)
    },
  })
}

export const useGetGame = (id: string) => {
  return useQuery(['getGame', id], () => getGame(id), {
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error) => {
      console.error(error)
    },
  })
}

export const useJoinGame = (id: string) => {
  return useQuery(['joinGame', id], () => joinGame(id), {
    onSuccess: () => {
      console.log('Joined game successfully')
    },
    onError: (error) => {
      console.log('Error joining game')
      console.error(error)
    },
  })
}

export const useSendMap = (id: string) => {
  return useMutation(['sendMap', id], (payload: TShip[]) => sendMap(id, payload), {
    onSuccess: () => {
      console.log('Map sent successfully')
    },
    onError: (error) => {
      console.error(error)
    },
  })
}

export const useStrike = (id: string) => {
  return useMutation(['strike', id], (payload: TStrike) => strike(id, payload), {
    onSuccess: () => {
      console.log('Strike sent successfully')
    },
    onError: (error) => {
      console.error(error)
    },
  })
}
