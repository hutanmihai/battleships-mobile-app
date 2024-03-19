import { Link, useLocalSearchParams } from 'expo-router'
import { Button, Pressable, StyleSheet, Text, View } from 'react-native'

import { useGetGame, useJoinGame } from '@/hooks/game'
import useCanStartMapConfig from '@/hooks/useCanStartMapConfig'
import useIsGameJoinable from '@/hooks/useIsGameJoinable'

function GameScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  // @ts-ignore
  const { data: game, isLoading } = useGetGame(id)
  // @ts-ignore
  const { mutate: joinGame } = useJoinGame(id)

  const { isGameJoinable } = useIsGameJoinable(game)
  const { canStartMapConfig } = useCanStartMapConfig(game)

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
      <Button title="Join game" onPress={() => joinGame()} disabled={!isGameJoinable} />
      {canStartMapConfig && (
        <Link href={`/game/map/${game?.id}`} asChild>
          <Pressable>
            <Text>Map Config</Text>
          </Pressable>
        </Link>
      )}
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
