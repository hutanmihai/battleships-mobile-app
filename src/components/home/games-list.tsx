import { Link } from 'expo-router'
import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native'

import { useListGames } from '@/hooks/game'
import { palette } from '@/theme'
import { TGame } from '@/types/game'

function GamesList() {
  const { data: games, isLoading } = useListGames()

  const renderGameItem = ({ item: game }: { item: any }) => (
    <Link href={`/game/${game.id}`} asChild>
      <TouchableOpacity style={styles.gameItem}>
        <GameDetails game={game} />
      </TouchableOpacity>
    </Link>
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

const GameDetails = ({ game }: { game: TGame }) => (
  <View style={styles.gameDetailsContainer}>
    <Text style={styles.gameText}>{game.id}</Text>
    <Text style={styles.statusText}>{game.status}</Text>
    <Text style={{ color: palette.blue }}>Players:</Text>
    <Text style={styles.emailText}>{game.player1.email}</Text>
    <Text style={styles.emailText}>{game.player2?.email}</Text>
  </View>
)

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.blue,
  },
  loadingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: palette.red,
  },
  listContainer: {
    padding: 10,
    backgroundColor: palette.white,
  },
  gameItem: {
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: palette.darkBlue,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 2,
  },
  gameText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: palette.blue,
    textAlign: 'center',
  },
  statusText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 4,
  },
  emailText: {
    fontSize: 14,
  },
  moveText: {
    fontSize: 14,
    marginTop: 5,
  },
  gameDetailsContainer: {
    marginVertical: 10,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    paddingBottom: 5,
    borderBottomColor: palette.blue,
  },
})

export default GamesList
