import { useRouter } from 'expo-router'
import { Text, View } from 'react-native'

import FloatingBar from '@/components/home/floating-bar'
import { useAuth } from '@/context/auth'

function HomeScreen() {
  const { logout } = useAuth()
  const router = useRouter()

  return (
    <View
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
    >
      <Text>Home Screen</Text>
      <FloatingBar
        onHomePress={() => {
          router.push('/')
        }}
        onProfilePress={() => {
          router.push('/profile')
        }}
        onLogoutPress={logout}
      />
    </View>
  )
}

export default HomeScreen
