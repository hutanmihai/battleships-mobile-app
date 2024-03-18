import { useRouter } from 'expo-router'
import { SafeAreaView, View } from 'react-native'

import FloatingBar from '@/components/home/floating-bar'
import GamesList from '@/components/home/games-list'
import Header from '@/components/home/header'
import { useAuth } from '@/context/auth'

function HomeScreen() {
  const { logout } = useAuth()
  const router = useRouter()

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Header />
          <GamesList />
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
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen
