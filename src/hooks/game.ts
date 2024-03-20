import { AxiosError } from 'axios'
import { useMutation, useQuery } from 'react-query'

import { createGame, getGame, joinGame, listGames, sendMap, strike } from '@/requests/game'
import { TShip, TStrike } from '@/types/game'
import { EToastType, showNotification } from '@/utils/toast'

export const useListGames = () => {
  return useQuery('listGames', listGames, {
    onError: (error: AxiosError) => {
      showNotification(EToastType.ERROR, error.message)
    },
  })
}

export const useCreateGame = () => {
  return useQuery('createGame', createGame, {
    onSuccess: () => {
      showNotification(EToastType.SUCCESS, 'Game created')
    },
    onError: (error: AxiosError) => {
      showNotification(EToastType.ERROR, error.message)
    },
  })
}

export const useGetGame = (id: string, refetchInterval: boolean) => {
  return useQuery(['getGame', id], () => getGame(id), {
    onError: (error: AxiosError) => {
      showNotification(EToastType.ERROR, error.message)
    },
    refetchInterval: refetchInterval ? 5000 : false,
  })
}

export const useJoinGame = (id: string) => {
  return useMutation(['joinGame', id], () => joinGame(id), {
    onError: (error: AxiosError) => {
      showNotification(EToastType.ERROR, error.message)
    },
  })
}

export const useSendMap = (id: string) => {
  return useMutation(['sendMap', id], (payload: { ships: TShip[] }) => sendMap(id, payload), {
    onSuccess: () => {
      showNotification(EToastType.SUCCESS, 'Map sent successfully')
    },
    onError: (error: AxiosError) => {
      showNotification(EToastType.ERROR, error.message)
    },
  })
}

export const useStrike = (id: string) => {
  return useMutation(['strike', id], (payload: TStrike) => strike(id, payload), {
    onError: (error: AxiosError) => {
      showNotification(EToastType.ERROR, error.message)
    },
  })
}
