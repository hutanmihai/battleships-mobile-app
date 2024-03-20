import { Stack } from 'expo-router'

function AppLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="user/me"
        options={{
          presentation: 'modal',
          title: 'Me',
        }}
      />
      <Stack.Screen
        name="game/map/[id]"
        options={{
          title: 'Map Config',
        }}
      />
      <Stack.Screen
        name="game/play/[id]"
        options={{
          title: 'Play Game',
        }}
      />
      <Stack.Screen
        name="game/[id]"
        options={{
          title: 'Game Overview',
        }}
      />
      <Stack.Screen
        name="index"
        options={{
          title: 'Battleships',
        }}
      />
    </Stack>
  )
}

export default AppLayout
