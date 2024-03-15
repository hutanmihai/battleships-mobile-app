import { useRouter, useSegments } from 'expo-router'
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

import { useLogin, useRegister } from '@/requests/auth'
import { useMe } from '@/requests/user'
import { TLoginRequest, TRegisterRequest } from '@/types/auth'
import { TUser } from '@/types/user'
import { deleteTokens } from '@/utils/session'

type AuthContextType = {
  user: TUser | null
  isLoading: boolean
  login: (payload: TLoginRequest) => Promise<void>
  register: (payload: TRegisterRequest) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const segment = useSegments()[0]
  const router = useRouter()

  const { mutate: loginMutation } = useLogin()
  const { mutate: registerMutation } = useRegister()

  const { refetch: refetchUser } = useMe()

  useEffect(() => {
    if (!user && segment !== '(auth)') {
      router.replace('(auth)/login')
    } else if (user && segment === '(auth)') {
      router.replace('/')
    }
  }, [user, segment])

  const login = useCallback(
    async (payload: TLoginRequest) => {
      setIsLoading(true)
      loginMutation(payload)
      const { data } = await refetchUser()
      if (data) {
        setUser(data.user)
      }
      setIsLoading(false)
    },
    [loginMutation]
  )

  const register = useCallback(
    async (payload: TRegisterRequest) => {
      setIsLoading(true)
      registerMutation(payload)
      const { data } = await refetchUser()
      if (data) {
        setUser(data.user)
      }
      setIsLoading(false)
    },
    [registerMutation]
  )

  const logout = useCallback(async () => {
    await deleteTokens()
    setUser(null)
  }, [])

  const value = { user, isLoading, login, register, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
