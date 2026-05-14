import {
  View,
  Text,
  StyleSheet,
} from 'react-native'

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        InvoEase AI
      </Text>

      <Text style={styles.subtitle}>
        Smart Expense Intelligence
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
    color: 'white',
    fontSize: 40,
    fontWeight: '800',
  },

  subtitle: {
    color: '#9CA3AF',
    marginTop: 12,
    fontSize: 16,
  },
})