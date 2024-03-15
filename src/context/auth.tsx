import {TUser} from "@/requests/types/user";
import {createContext, ReactNode, useContext, useState} from "react";
import {deleteUser, storeUser} from "@/utils/session";

export type TAuthContext = {
  user: TUser | null,
  register: (user: TUser) => Promise<void>,
  login: (user: TUser) => Promise<void>,
  logout: () => Promise<void>,
}

const AuthContext = createContext<TAuthContext>({
  user: null,
  register: async () => {
  },
  login: async () => {
  },
  logout: async () => {
  },
})

export function useAuth() {
  return useContext(AuthContext)
}


export function AuthProvider({children}: { children: ReactNode }) {
  const [user, setUser] = useState<TUser | null>(null)

  return (
    <AuthContext.Provider value={{
      user: user,
      register: async (user) => {
        setUser(user)
        await storeUser(user)
      },
      login: async (user) => {
        setUser(user)
        await storeUser(user)
      },
      logout: async () => {
        setUser(null)
        await deleteUser()
      }
    }}>
      {children}
    </AuthContext.Provider>
  )
}
