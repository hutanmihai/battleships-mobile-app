import { Stack } from 'expo-router'

function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="game/create" />
    </Stack>
  )
}

export default AppLayout
