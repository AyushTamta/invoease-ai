import { View, Text, StyleSheet } from 'react-native'

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to InvoEase.ai</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F1A',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
  },
})