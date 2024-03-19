import { useLocalSearchParams } from 'expo-router'
import { View, Text } from 'react-native'

import GameGrid from '@/components/game/grid'

function MapConfigScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()

  return (
    <View>
      {/* @ts-ignore */}
      <GameGrid id={id} />
    </View>
  )
}

export default MapConfigScreen
