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
      <TouchableOpacity style={[styles.gameItem, { backgroundColor: palette.blue }]}>
        <GameDetails game={game} />
      </TouchableOpacity>
    </Link>
  )

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Text style={[styles.loadingText, { color: palette.red }]}>Loading...</Text>
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
  <View
    style={{
      marginVertical: 10,
      borderStyle: 'solid',
      borderBottomWidth: 1,
      paddingBottom: 5,
      borderBottomColor: palette.blue,
    }}
  >
    <Text style={[styles.gameText, { color: palette.blue, textAlign: 'center' }]}>{game.id}</Text>
    <Text style={[styles.statusText, { textAlign: 'center', marginBottom: 4 }]}>{game.status}</Text>
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
  },
  listContainer: {
    padding: 10,
    backgroundColor: palette.white,
  },
  gameItem: {
    borderWidth: 2,
    borderColor: palette.red,
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  gameText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statusText: {
    fontSize: 16,
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
