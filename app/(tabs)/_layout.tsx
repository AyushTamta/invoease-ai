import { Tabs } from 'expo-router'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#111827',
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: '#8B5CF6',
        tabBarInactiveTintColor: '#6B7280',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{ title: 'Home' }}
      />

      <Tabs.Screen
        name="scan"
        options={{ title: 'Scan' }}
      />

      <Tabs.Screen
        name="invoices"
        options={{ title: 'Invoices' }}
      />

      <Tabs.Screen
        name="profile"
        options={{ title: 'Profile' }}
      />
    </Tabs>
  )
}