import { View, Text, StyleSheet } from 'react-native'

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
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
})