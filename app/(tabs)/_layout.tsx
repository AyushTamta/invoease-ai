import { Tabs } from 'expo-router'

import {
  Ionicons,
} from '@expo/vector-icons'

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          backgroundColor: '#111827',
          borderTopWidth: 0,
          height: 85,
        },

        tabBarActiveTintColor:
          '#8B5CF6',

        tabBarInactiveTintColor:
          '#6B7280',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',

          tabBarIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="home"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="scanner"
        options={{
          title: 'Scanner',

          tabBarIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="scan"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',

          tabBarIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="bar-chart"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  )
}