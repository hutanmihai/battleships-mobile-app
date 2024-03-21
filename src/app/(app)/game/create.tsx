import { Link } from 'expo-router'
import { Text, View } from 'react-native'

import { useCreateGame } from '@/hooks/game'
import { palette } from '@/theme'

function CreateGameScreen() {
  const { data: game } = useCreateGame()

  return (
    <View style={{ backgroundColor: palette.white }}>
      <Text>Game created successfully</Text>
      <Text>{game?.id}</Text>
      <Text>{game?.status}</Text>
      <Text>{game?.player1.email}</Text>
      <Link href={`/game/${game?.id}`} asChild>
        <Text>Play</Text>
      </Link>
    </View>
  )
}

export default CreateGameScreen
