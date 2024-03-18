import { useLocalSearchParams } from 'expo-router'
import { Button, StyleSheet, Text, View } from 'react-native'

import { useAuth } from '@/context/auth'
import { useGetGame, useJoinGame } from '@/hooks/game'
import { EGameStatus } from '@/types/game'

function GameScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  // @ts-ignore
  const { data: game, isLoading } = useGetGame(id)
  // @ts-ignore
  const { mutate: joinGame } = useJoinGame(id)
  const { user } = useAuth()

  const isJoinGameAvailable =
    game?.player1.id !== user?.id &&
    (game?.status === EGameStatus.CREATED || game?.status === EGameStatus.MAP_CONFIG) &&
    !game?.player2

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
      <Button title="Join game" onPress={() => joinGame()} disabled={!isJoinGameAvailable} />
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
