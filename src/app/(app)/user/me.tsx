import { Text, View } from 'react-native'

import { useMe } from '@/hooks/user'

function MeScreen() {
  const { data: me } = useMe(true)

  return (
    <View
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
    >
      <Text>Me Screen</Text>
      <Text>{me?.user.id}</Text>
      <Text>{me?.user.email}</Text>
      <Text>{me?.gamesPlayed}</Text>
      <Text>{me?.gamesWon}</Text>
      <Text>{me?.gamesLost}</Text>
      <Text>{me?.currentlyGamesPlaying}</Text>
    </View>
  )
}

export default MeScreen
