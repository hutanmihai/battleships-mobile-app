import { View, StyleSheet, Pressable, Text } from 'react-native'

function Header() {
  return (
    <View style={styles.headerContainer}>
      <Pressable onPress={() => console.log('Create Game Pressed')}>
        <Text style={styles.button}>Create Game</Text>
      </Pressable>
      <Pressable onPress={() => console.log('Join Game Pressed')}>
        <Text style={styles.button}>Join Game</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    marginHorizontal: 30,
    marginVertical: 20,
    width: '50%',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 100,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
})

export default Header
