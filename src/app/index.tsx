import {Link, Tabs} from 'expo-router'
import {StatusBar} from 'expo-status-bar'
import {StyleSheet, View} from 'react-native'

export default function App() {
  return (
    <View style={styles.container}>
      <Link href="(auth)/login"> Login </Link>
      <Link href="(auth)/register"> Register </Link>
      <StatusBar style="auto"/>
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
