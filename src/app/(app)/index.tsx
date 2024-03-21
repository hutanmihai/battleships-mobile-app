import { useRouter } from 'expo-router'
import { SafeAreaView, View } from 'react-native'

import FloatingBar from '@/components/home/floating-bar'
import GamesList from '@/components/home/games-list'
import LinkButton from '@/components/ui/link-button'
import { useAuth } from '@/context/auth'
import { palette } from '@/theme'

function HomeScreen() {
  const { logout } = useAuth()
  const router = useRouter()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: palette.white }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <LinkButton route="/game/create" title="Create Game" style={{ borderRadius: 0 }} />
          <GamesList />
          <FloatingBar
            onHomePress={() => {
              router.replace('/')
            }}
            onProfilePress={() => {
              router.push('/user/me')
            }}
            onLogoutPress={logout}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen
