import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native'

import {
  LineChart,
} from 'react-native-chart-kit'

import { invoices } from '../data/invoices'

const screenWidth =
  Dimensions.get('window').width

export default function Dashboard() {
  return (
    <ScrollView
      contentContainerStyle={
        styles.container
      }
    >
      <Text style={styles.title}>
        Expense Dashboard
      </Text>

      <Text style={styles.subtitle}>
        Your spending overview
      </Text>

      <View style={styles.analyticsRow}>
        <View style={styles.analyticsCard}>
          <Text style={styles.cardLabel}>
            Monthly Spend
          </Text>

          <Text style={styles.cardValue}>
            $457
          </Text>
        </View>

        <View style={styles.analyticsCard}>
          <Text style={styles.cardLabel}>
            Invoices
          </Text>

          <Text style={styles.cardValue}>
            12
          </Text>
        </View>
      </View>

      <Text style={styles.chartTitle}>
        Spending Trend
      </Text>

      <LineChart
        data={{
          labels: [
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
          ],

          datasets: [
            {
              data: [
                20,
                45,
                28,
                80,
                99,
              ],
            },
          ],
        }}
        width={screenWidth - 48}
        height={220}
        yAxisLabel="$"
        chartConfig={{
          backgroundGradientFrom:
            '#111827',

          backgroundGradientTo:
            '#111827',

          decimalPlaces: 0,

          color: (
            opacity = 1
          ) =>
            `rgba(139, 92, 246, ${opacity})`,

          labelColor: (
            opacity = 1
          ) =>
            `rgba(255,255,255,${opacity})`,
        }}
        bezier
        style={styles.chart}
      />

      <Text style={styles.sectionTitle}>
        Recent Invoices
      </Text>

      {invoices.map((invoice) => (
        <View
          key={invoice.id}
          style={styles.card}
        >
          <View>
            <Text style={styles.store}>
              {invoice.store_name}
            </Text>

            <Text style={styles.date}>
              {invoice.invoice_date}
            </Text>

            <View style={styles.categoryBadge}>
              <Text
                style={styles.categoryText}
              >
                {invoice.category}
              </Text>
            </View>
          </View>

          <Text style={styles.amount}>
            {invoice.total_amount}
          </Text>
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#0B0F1A',
    padding: 24,
    paddingTop: 80,
  },

  title: {
    color: 'white',
    fontSize: 36,
    fontWeight: '800',
  },

  subtitle: {
    color: '#9CA3AF',
    marginTop: 10,
    marginBottom: 30,
    fontSize: 16,
  },

  analyticsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  analyticsCard: {
    backgroundColor: '#111827',
    borderRadius: 24,
    padding: 22,
    width: '48%',
  },

  cardLabel: {
    color: '#9CA3AF',
    fontSize: 14,
  },

  cardValue: {
    color: 'white',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 10,
  },

  chartTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
    marginTop: 35,
    marginBottom: 18,
  },

  chart: {
    borderRadius: 24,
  },

  sectionTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 40,
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#111827',
    borderRadius: 24,
    padding: 22,
    marginBottom: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  store: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },

  date: {
    color: '#9CA3AF',
    marginTop: 6,
  },

  amount: {
    color: '#8B5CF6',
    fontSize: 24,
    fontWeight: '800',
  },

  categoryBadge: {
    marginTop: 10,
    backgroundColor: '#312E81',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },

  categoryText: {
    color: '#C4B5FD',
    fontWeight: '700',
    fontSize: 12,
  },
})