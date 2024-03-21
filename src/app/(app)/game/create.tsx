import { StyleSheet, Text, View } from 'react-native'

import LinkButton from '@/components/ui/link-button'
import { useCreateGame } from '@/hooks/game'
import { palette } from '@/theme'

function CreateGameScreen() {
  const { data: game } = useCreateGame()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game created successfully</Text>
      <Text style={styles.text}>{game?.id}</Text>
      <Text style={styles.text}>{game?.status}</Text>
      <Text style={styles.text}>{game?.player1.email}</Text>
      <LinkButton route={`/game/${game?.id}`} title="Play" style={{ width: 300 }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: palette.white,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: palette.blue,
  },
  text: {
    fontSize: 16,
    color: palette.blue,
    marginBottom: 10,
  },
})

export default CreateGameScreen
