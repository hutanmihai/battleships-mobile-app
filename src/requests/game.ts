import { useMutation, useQuery } from 'react-query'

import { apiConfig } from '@/config.global'
import { TGamesListResponse, TShip, TStrike, TGame } from '@/types/game'
import axiosInstance from '@/utils/axios'

const listGames = async () => {
  const response = await axiosInstance.get(apiConfig.game.list)
  return response.data as TGamesListResponse
}

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

const createGame = async () => {
  const response = await axiosInstance.post(apiConfig.game.create)
  return response.data as TGame
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

const getGame = async (id: string) => {
  const response = await axiosInstance.get(apiConfig.game.get(id))
  return response.data as TGame
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

const joinGame = async (id: string) => {
  await axiosInstance.post(apiConfig.game.join(id))
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

const sendMap = async (id: string, payload: TShip[]) => {
  await axiosInstance.patch(apiConfig.game.sendMap(id), payload)
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

const strike = async (id: string, payload: TStrike) => {
  await axiosInstance.patch(apiConfig.game.strike(id), payload)
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
