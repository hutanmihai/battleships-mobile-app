import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

function AuthLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="login"
        options={{
          title: 'Login',
          tabBarIcon: () => <MaterialIcons name="login" size={24} color="red" />,
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          title: 'Register',
          tabBarIcon: () => <MaterialCommunityIcons name="account-plus" size={24} color="blue" />,
        }}
      />
    </Tabs>
  )
}

export default AuthLayout
