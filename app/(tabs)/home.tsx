import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 140,
        }}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              Welcome back
            </Text>

            <Text style={styles.name}>
              InvoEase.ai
            </Text>
          </View>
        </View>

        <LinearGradient
          colors={['#8B5CF6', '#6366F1']}
          style={styles.aiCard}
        >
          <Text style={styles.aiTitle}>
            AI Spending Insights
          </Text>

          <Text style={styles.aiAmount}>
            ₹12,480
          </Text>

          <Text style={styles.aiSubtitle}>
            Most spent on Food & Dining this month
          </Text>
        </LinearGradient>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Recent Invoices
          </Text>

          <View style={styles.invoiceCard}>
            <View>
              <Text style={styles.store}>
                Amazon
              </Text>

              <Text style={styles.category}>
                Electronics
              </Text>
            </View>

            <Text style={styles.amount}>
              ₹2,499
            </Text>
          </View>

          <View style={styles.invoiceCard}>
            <View>
              <Text style={styles.store}>
                Starbucks
              </Text>

              <Text style={styles.category}>
                Food & Beverage
              </Text>
            </View>

            <Text style={styles.amount}>
              ₹540
            </Text>
          </View>

          <View style={styles.invoiceCard}>
            <View>
              <Text style={styles.store}>
                Uber
              </Text>

              <Text style={styles.category}>
                Travel
              </Text>
            </View>

            <Text style={styles.amount}>
              ₹320
            </Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F1A',
    paddingHorizontal: 20,
    paddingTop: 80,
  },

  header: {
    marginBottom: 30,
  },

  greeting: {
    color: '#9CA3AF',
    fontSize: 16,
  },

  name: {
    color: 'white',
    fontSize: 34,
    fontWeight: '700',
    marginTop: 6,
  },

  aiCard: {
    borderRadius: 30,
    padding: 28,
    marginBottom: 36,
  },

  aiTitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
  },

  aiAmount: {
    color: 'white',
    fontSize: 42,
    fontWeight: '700',
    marginTop: 16,
  },

  aiSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    marginTop: 12,
    fontSize: 15,
    lineHeight: 24,
  },

  section: {
    gap: 16,
  },

  sectionTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
  },

  invoiceCard: {
    backgroundColor: '#111827',
    borderRadius: 24,
    padding: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  store: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },

  category: {
    color: '#9CA3AF',
    marginTop: 6,
  },

  amount: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },

  fab: {
    position: 'absolute',
    bottom: 36,
    right: 24,
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8B5CF6',
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },

  fabText: {
    color: 'white',
    fontSize: 32,
    fontWeight: '300',
    marginTop: -2,
  },
})