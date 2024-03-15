import {Stack} from 'expo-router'
import {QueryClient, QueryClientProvider} from 'react-query'

const queryClient = new QueryClient()

function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="index" options={{
          headerTitle: 'Welcome to Battleships!',
        }}/>
        <Stack.Screen name="(auth)" options={{
          headerTitle: 'Login!',
        }}/>
      </Stack>
    </QueryClientProvider>
  )
}

export default RootLayout
