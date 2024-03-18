import { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'

type TAuthFormProps = {
  onClick: ({ email, password }: { email: string; password: string }) => void
  isLoading: boolean
  buttonText: string
}

function AuthForm({ onClick, isLoading, buttonText }: TAuthFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text style={styles.label}>Password:</Text>
      <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
      <Button
        title={isLoading ? buttonText + '...' : buttonText}
        onPress={() => onClick({ email, password })}
        disabled={isLoading}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
})

export default AuthForm
