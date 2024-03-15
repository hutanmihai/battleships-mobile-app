import {Slot, Stack} from 'expo-router'
import {QueryClient, QueryClientProvider} from 'react-query'
import {AuthProvider} from "@/context/auth";

const queryClient = new QueryClient()

function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Slot/>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default RootLayout
