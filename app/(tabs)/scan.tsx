import { View, Text, StyleSheet } from 'react-native'

export default function ScanScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan Invoice</Text>
      <Text style={styles.subtitle}>
        Camera scanner coming next
      </Text>
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
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
  },

  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: '#9CA3AF',
  },
})