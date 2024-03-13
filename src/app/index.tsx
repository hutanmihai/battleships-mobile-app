import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Pressable, StyleSheet, Text, View } from 'react-native'

export default function App() {
  return (
    <View style={styles.container}>
      <Link href="/login" asChild>
        <Pressable>
          <Text>Login</Text>
        </Pressable>
      </Link>
      <Link href="/register" asChild>
        <Pressable>
          <Text>Register</Text>
        </Pressable>
      </Link>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
