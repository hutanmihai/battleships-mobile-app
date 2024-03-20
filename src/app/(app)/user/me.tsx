import { Text, View, StyleSheet } from 'react-native'

import { useMe } from '@/hooks/user'

function MeScreen() {
  const { data: me } = useMe()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Info</Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>ID: {me?.user.id}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardText}>Email: {me?.user.email}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardText}>Games Played: {me?.gamesPlayed}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardText}>Games Won: {me?.gamesWon}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardText}>Games Lost: {me?.gamesLost}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardText}>Currently Playing: {me?.currentlyGamesPlaying}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  cardText: {
    fontSize: 16,
  },
})
export default MeScreen
