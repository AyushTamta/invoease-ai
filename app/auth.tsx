import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

export default function AuthScreen() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.logo}>InvoEase.ai</Text>

        <Text style={styles.heading}>
          AI-powered invoice insights
        </Text>

        <Text style={styles.subheading}>
          Scan receipts. Let AI organize the rest.
        </Text>
      </View>

      <TouchableOpacity style={styles.googleButton}>
        <Text style={styles.googleText}>
          Continue with Google
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F1A',
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingTop: 140,
    paddingBottom: 60,
  },

  logo: {
    color: '#8B5CF6',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 40,
  },

  heading: {
    color: 'white',
    fontSize: 42,
    fontWeight: '700',
    lineHeight: 52,
  },

  subheading: {
    color: '#9CA3AF',
    fontSize: 18,
    marginTop: 20,
    lineHeight: 28,
  },

  googleButton: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: 'center',
  },

  googleText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
})