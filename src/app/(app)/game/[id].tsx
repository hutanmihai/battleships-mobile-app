import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Button from '@/components/ui/button'
import LinkButton from '@/components/ui/link-button'
import { useGetGame, useJoinGame } from '@/hooks/game'
import useCanPlayGame from '@/hooks/useCanPlayGame'
import useCanStartMapConfig from '@/hooks/useCanStartMapConfig'
import useIsGameJoinable from '@/hooks/useIsGameJoinable'
import { palette } from '@/theme'

function GameScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  // @ts-ignore
  const { data: game, isLoading } = useGetGame(id)
  // @ts-ignore
  const { mutate: joinGame } = useJoinGame(id)

  const { isGameJoinable } = useIsGameJoinable(game)
  const { canStartMapConfig } = useCanStartMapConfig(game)
  const { canPlayGame } = useCanPlayGame(game)

  if (isLoading) {
    return (
      <View style={styles.screenContainer}>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.text}>{game?.id}</Text>
      <Text>{game?.status}</Text>
      <Text>{game?.player1.email}</Text>
      <Text>{game?.player2?.email}</Text>
      {isGameJoinable && (
        <Button title="Join game" onPress={() => joinGame()} style={styles.button} />
      )}

      {canStartMapConfig && (
        <LinkButton
          route={`/game/map/${game?.id}`}
          title="Start Map Config"
          style={styles.button}
        />
      )}
      {canPlayGame && (
        <LinkButton route={`/game/play/${game?.id}`} title="Start Game" style={styles.button} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.white,
  },
  button: {
    width: 300,
    marginVertical: 10,
  },
  text: {
    color: palette.blue,
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 5,
  },
})

export default GameScreen
