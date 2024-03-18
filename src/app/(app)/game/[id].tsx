import { useLocalSearchParams } from 'expo-router'
import { View, Text, StyleSheet, Button } from 'react-native'

import { useGetGame, useJoinGame } from '@/hooks/game'

function GameScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  // @ts-ignore
  const { data: game, isLoading } = useGetGame(id)
  // @ts-ignore
  const { mutate: joinGame } = useJoinGame(id)

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
      <Button title="Join game" onPress={() => joinGame()} />
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
