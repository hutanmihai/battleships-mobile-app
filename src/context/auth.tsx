import { useRouter, useSegments } from 'expo-router'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

import { TTokens } from '@/requests/types/auth'
import { TUser } from '@/requests/types/user'
import { useMe } from '@/requests/user'
import axiosInstance from '@/utils/axios'
import { deleteTokens, storeTokens } from '@/utils/session'

export type TAuthContext = {
  user: TUser | undefined
  register: (tokens: TTokens) => Promise<void>
  login: (tokens: TTokens) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<TAuthContext>({
  user: undefined,
  register: async () => {},
  login: async () => {},
  logout: async () => {},
})

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<TUser | undefined>(undefined)

  const { refetch } = useMe()

  const segment = useSegments()[0]
  const router = useRouter()

  useEffect(() => {
    if (!user && segment !== '(auth)') {
      router.replace('(auth)/login')
    } else if (user && segment === '(app)') {
      router.replace('(app)/')
    }
  }, [user, segment])

  const register = async (tokens: TTokens) => {
    await storeTokens(tokens)
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${tokens.accessToken}`
    const me = await refetch()
    setUser(me.data)
  }

  const login = async (tokens: TTokens) => {
    await storeTokens(tokens)
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${tokens.accessToken}`
    const me = await refetch()
    setUser(me.data)
  }

  const logout = async () => {
    await deleteTokens()
    axiosInstance.defaults.headers.common['Authorization'] = ''
    setUser(undefined)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
