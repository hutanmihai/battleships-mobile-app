import { useRouter } from 'expo-router'
import { SafeAreaView, StyleSheet, View } from 'react-native'

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
      <View style={styles.container}>
        <LinkButton route="/game/create" title="Create Game" style={{ borderRadius: 0 }} />
        <GamesList />
        <FloatingBar
          onHomePress={() => {
            router.replace('/game/list')
          }}
          onProfilePress={() => {
            router.push('/user/me')
          }}
          onLogoutPress={logout}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
})

export default HomeScreen
