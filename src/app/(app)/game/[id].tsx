import { useLocalSearchParams } from 'expo-router'
import { View, Text, StyleSheet } from 'react-native'

import { useGetGame } from '@/requests/game'

function GameScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  // @ts-ignore
  const { data: game, isLoading } = useGetGame(id)

  if (isLoading) {
    return (
      <View style={styles.screenContainer}>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <View style={styles.screenContainer}>
      <Text>Game Screen</Text>
      <Text>{game?.status}</Text>
      <Text>{game?.player1.email}</Text>
      <Text>{game?.player2?.email}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default GameScreen
