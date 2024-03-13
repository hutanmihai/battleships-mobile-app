import * as SecureStore from 'expo-secure-store'

import { TUser } from '@/requests/types/user'

export const storeUser = async (user: TUser) => {
  try {
    await SecureStore.setItemAsync('user', JSON.stringify(user))
    console.log('User stored successfully')
  } catch (error) {
    console.error('Error storing user:', error)
  }
}

export const getUser = async () => {
  try {
    const user = await SecureStore.getItemAsync('user')
    if (user) {
      console.log('User retrieved:', user)
      return JSON.parse(user)
    } else {
      console.log('No user found')
      return null
    }
  } catch (error) {
    console.error('Error retrieving user:', error)
    return null
  }
}

export const deleteUser = async () => {
  try {
    await SecureStore.deleteItemAsync('user')
    console.log('User deleted successfully')
  } catch (error) {
    console.error('Error deleting user:', error)
  }
}
