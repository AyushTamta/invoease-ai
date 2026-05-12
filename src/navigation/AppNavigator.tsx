import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import AuthScreen from '../screens/AuthScreen'
import HomeScreen from '../screens/HomeScreen'
import ScanScreen from '../screens/ScanScreen'
import InvoiceScreen from '../screens/InvoiceScreen'
import ProfileScreen from '../screens/ProfileScreen'

const Stack = createNativeStackNavigator()

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Scan" component={ScanScreen} />
        <Stack.Screen name="Invoice" component={InvoiceScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}