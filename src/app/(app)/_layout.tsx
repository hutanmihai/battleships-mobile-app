import { Stack } from 'expo-router'

function AppLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="user/me"
        options={{
          presentation: 'modal',
        }}
      />
    </Stack>
  )
}

export default AppLayout
