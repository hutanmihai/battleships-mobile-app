import { Link } from 'expo-router'
import React, { useEffect } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native'

import { useListGames } from '@/hooks/game'
import { EGameStatus } from '@/types/game'

function GamesList() {
  const { data: games, isLoading } = useListGames()

  const renderGameItem = ({ item: game }: { item: any }) =>
    game.status !== EGameStatus.FINISHED ? (
      <Link href={`/game/${game.id}`} asChild>
        <TouchableOpacity style={styles.gameItem}>
          <GameDetails game={game} />
        </TouchableOpacity>
      </Link>
    ) : (
      <View style={styles.gameItem}>
        <GameDetails game={game} />
      </View>
    )

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={games?.games}
      renderItem={renderGameItem}
      keyExtractor={(game) => game.id}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    />
  )
}

const GameDetails = ({ game }: { game: any }) => (
  <>
    <Text style={styles.gameText}>{game.id}</Text>
    <Text style={styles.statusText}>{game.status}</Text>
    <Text style={styles.emailText}>{game.player1.email}</Text>
    <Text style={styles.emailText}>{game.player2?.email}</Text>
    <Text style={styles.moveText}>{game.playerToMoveId}</Text>
  </>
)

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 10,
  },
  gameItem: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  gameText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusText: {
    fontSize: 14,
    color: 'gray',
  },
  emailText: {
    fontSize: 14,
  },
  moveText: {
    fontSize: 14,
    marginTop: 5,
  },
})

export default GamesList
