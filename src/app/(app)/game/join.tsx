import { Text, View } from 'react-native'

import { useCreateGame } from '@/hooks/game'

function CreateGameScreen() {
  const { data: game } = useCreateGame()

  return (
    <View>
      <Text>Create Game Screen</Text>
      <Text>{game?.id}</Text>
      <Text>{game?.status}</Text>
      <Text>{game?.player1.email}</Text>
    </View>
  )
}

export default CreateGameScreen
