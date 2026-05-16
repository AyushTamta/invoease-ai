import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

import {
  router,
} from 'expo-router'

export default function Sidebar() {

  return (

    <View style={styles.sidebar}>

      <Text style={styles.logo}>
        InvoEase AI
      </Text>

      <TouchableOpacity
        style={styles.link}
      >
        <Text style={styles.linkText}>
          Dashboard
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.link}
        onPress={() =>
          router.push('/scanner')
        }
      >
        <Text style={styles.linkText}>
          Scanner
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.link}
      >
        <Text style={styles.linkText}>
          Invoices
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.link}
      >
        <Text style={styles.linkText}>
          AI Assistant
        </Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({

  sidebar: {
    width: 260,
    backgroundColor: '#0B1120',
    paddingTop: 80,
    paddingHorizontal: 24,
    borderRightWidth: 1,
    borderColor: '#1F2937',
  },

  logo: {
    color: 'white',
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 50,
  },

  link: {
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderRadius: 18,
    marginBottom: 14,
    backgroundColor: '#111827',
  },

  linkText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },

})