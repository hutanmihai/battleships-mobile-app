import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'

type TFloatingBarProps = {
  onHomePress: () => void
  onProfilePress: () => void
  onLogoutPress: () => void
}

const FloatingBar = ({ onHomePress, onProfilePress, onLogoutPress }: TFloatingBarProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onHomePress} style={styles.button}>
        <MaterialCommunityIcons name="home" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity onPress={onProfilePress} style={styles.button}>
        <MaterialCommunityIcons name="account" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity onPress={onLogoutPress} style={styles.button}>
        <MaterialCommunityIcons name="logout" size={24} color="white" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  button: {
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 20,
  },
})

export default FloatingBar
