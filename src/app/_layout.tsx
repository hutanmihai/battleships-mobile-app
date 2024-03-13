import { Stack } from 'expo-router'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack />
    </QueryClientProvider>
  )
}

export default RootLayout
