import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native'

import {
  useEffect,
  useState,
} from 'react'

import {
  LinearGradient,
} from 'expo-linear-gradient'

import {
  LineChart,
  PieChart,
} from 'react-native-chart-kit'

import {
  supabase,
} from '../../lib/supabase'

const screenWidth =
  Dimensions.get('window').width

export default function Dashboard() {

  const [loading, setLoading] =
    useState(true)

  const [invoices, setInvoices] =
    useState<any[]>([])

  const [totalSpend, setTotalSpend] =
    useState(0)

  const [invoiceCount, setInvoiceCount] =
    useState(0)

  const [topCategory, setTopCategory] =
    useState('None')

  const [topMerchant, setTopMerchant] =
    useState('None')

  const [averageInvoice, setAverageInvoice] =
    useState(0)

  const [categoryData, setCategoryData] =
    useState<any[]>([])

  const [trendData, setTrendData] =
    useState<number[]>([])

  const [aiInsights, setAiInsights] =
    useState<string[]>([])

  useEffect(() => {

    fetchInvoices()

  }, [])

  const extractAmount = (
    text: string
  ) => {

    if (!text) return 0

    const match =
      text.match(/\d+/g)

    if (!match) return 0

    return parseInt(
      match.join('')
    )
  }

  const fetchInvoices = async () => {

    try {

      const { data, error } =
        await supabase
          .from('invoices')
          .select('*')
          .order(
            'created_at',
            {
              ascending: false,
            }
          )

      if (error) {

        console.log(error)

        return
      }

      const invoiceData =
        data || []

      setInvoices(invoiceData)

      calculateAnalytics(
        invoiceData
      )

    } catch (err) {

      console.log(err)

    } finally {

      setLoading(false)
    }
  }

  const calculateAnalytics = (
    invoiceData: any[]
  ) => {

    let total = 0

    const categoryMap: any = {}

    const merchantMap: any = {}

    const trend: number[] = []

    invoiceData.forEach(
      invoice => {

        const amount =
          extractAmount(
            invoice.total_amount
          )

        total += amount

        trend.push(amount)

        const category =
          invoice.category ||
          'Other'

        categoryMap[category] =
          (categoryMap[category] || 0)
          + amount

        const merchant =
          invoice.store_name ||
          'Unknown'

        merchantMap[merchant] =
          (merchantMap[merchant] || 0)
          + 1
      }
    )

    setTotalSpend(total)

    setInvoiceCount(
      invoiceData.length
    )

    setAverageInvoice(
      invoiceData.length > 0
        ? Math.round(
            total /
            invoiceData.length
          )
        : 0
    )

    const sortedCategories =
      Object.entries(categoryMap)
        .sort(
          (a: any, b: any) =>
            b[1] - a[1]
        )

    const sortedMerchants =
      Object.entries(merchantMap)
        .sort(
          (a: any, b: any) =>
            b[1] - a[1]
        )

    setTopCategory(
      sortedCategories[0]?.[0] ||
      'None'
    )

    setTopMerchant(
      sortedMerchants[0]?.[0] ||
      'None'
    )

    const pieData =
      sortedCategories.map(
        (
          item: any,
          index
        ) => ({
          name: item[0],
          amount: item[1],
          color: [
            '#8B5CF6',
            '#2563EB',
            '#EC4899',
            '#10B981',
            '#F59E0B',
          ][index % 5],
          legendFontColor:
            '#FFFFFF',
          legendFontSize: 12,
        })
      )

    setCategoryData(
      pieData
    )

    setTrendData(
      trend.slice(0, 7).reverse()
    )

    generateInsights(
      sortedCategories,
      sortedMerchants,
      total
    )
  }

  const generateInsights = (
    categories: any,
    merchants: any,
    total: number
  ) => {

    const insights = []

    if (categories.length > 0) {

      insights.push(
        `${categories[0][0]} is your highest spending category.`
      )
    }

    if (merchants.length > 0) {

      insights.push(
        `${merchants[0][0]} is your most recurring merchant.`
      )
    }

    if (total > 5000) {

      insights.push(
        'Your spending this period is relatively high.'
      )
    }

    if (total < 2000) {

      insights.push(
        'Your spending is currently under control.'
      )
    }

    setAiInsights(insights)
  }

  if (loading) {

    return (
      <View style={styles.loaderContainer}>

        <ActivityIndicator
          size="large"
          color="#8B5CF6"
        />

      </View>
    )
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={
        false
      }
    >

      <Text style={styles.logo}>
        InvoEase AI
      </Text>

      <Text style={styles.heading}>
        Financial Insights
      </Text>

      <LinearGradient
        colors={[
          '#8B5CF6',
          '#6D28D9',
        ]}
        style={styles.heroCard}
      >

        <Text style={styles.heroTitle}>
          Total Spend
        </Text>

        <Text style={styles.heroAmount}>
          ₹{totalSpend}
        </Text>

      </LinearGradient>

      <View style={styles.grid}>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>
            Invoices
          </Text>

          <Text style={styles.cardValue}>
            {invoiceCount}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>
            Avg Invoice
          </Text>

          <Text style={styles.cardValue}>
            ₹{averageInvoice}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>
            Top Category
          </Text>

          <Text style={styles.cardValue}>
            {topCategory}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>
            Top Merchant
          </Text>

          <Text style={styles.cardValue}>
            {topMerchant}
          </Text>
        </View>

      </View>

      <Text style={styles.sectionTitle}>
        Spending Trend
      </Text>

      {trendData.length > 0 ? (

        <LineChart
          data={{
            labels:
              trendData.map(
                (_, i) =>
                  `D${i + 1}`
              ),

            datasets: [
              {
                data: trendData,
              },
            ],
          }}
          width={screenWidth - 48}
          height={220}
          yAxisLabel="₹"
          chartConfig={{
            backgroundGradientFrom:
              '#111827',

            backgroundGradientTo:
              '#111827',

            decimalPlaces: 0,

            color: opacity =>
              `rgba(139,92,246,${opacity})`,

            labelColor: opacity =>
              `rgba(255,255,255,${opacity})`,

            propsForDots: {
              r: '5',
            },
          }}
          bezier
          style={styles.chart}
        />

      ) : null}

      <Text style={styles.sectionTitle}>
        Expense Categories
      </Text>

      {categoryData.length > 0 ? (

        <PieChart
          data={categoryData}
          width={screenWidth - 48}
          height={240}
          accessor="amount"
          backgroundColor="transparent"
          chartConfig={{
            color: opacity =>
              `rgba(255,255,255,${opacity})`,
          }}
          paddingLeft="20"
          absolute
        />

      ) : null}

      <Text style={styles.sectionTitle}>
        AI Insights
      </Text>

      {aiInsights.map(
        (
          insight,
          index
        ) => (

          <View
            key={index}
            style={styles.insightCard}
          >

            <Text
              style={styles.insightText}
            >
              {insight}
            </Text>

          </View>
        )
      )}

      <Text style={styles.sectionTitle}>
        Recent Invoices
      </Text>

      {invoices.map(
        (
          invoice,
          index
        ) => (

          <View
            key={index}
            style={styles.invoiceCard}
          >

            <View>

              <Text
                style={styles.invoiceStore}
              >
                {
                  invoice.store_name
                }
              </Text>

              <Text
                style={
                  styles.invoiceCategory
                }
              >
                {invoice.category}
              </Text>

            </View>

            <Text
              style={styles.invoiceAmount}
            >
              {
                invoice.total_amount
              }
            </Text>

          </View>
        )
      )}

    </ScrollView>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#050816',
    paddingHorizontal: 24,
    paddingTop: 80,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#050816',
  },

  logo: {
    color: '#A78BFA',
    fontSize: 18,
    fontWeight: '700',
  },

  heading: {
    color: 'white',
    fontSize: 48,
    fontWeight: '900',
    marginTop: 18,
  },

  heroCard: {
    marginTop: 34,
    borderRadius: 34,
    padding: 28,
  },

  heroTitle: {
    color: 'white',
    fontSize: 18,
  },

  heroAmount: {
    color: 'white',
    fontSize: 42,
    fontWeight: '900',
    marginTop: 14,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 28,
  },

  card: {
    width: '48%',
    backgroundColor: '#111827',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
  },

  cardLabel: {
    color: '#9CA3AF',
    fontSize: 13,
  },

  cardValue: {
    color: 'white',
    fontSize: 22,
    fontWeight: '800',
    marginTop: 14,
  },

  sectionTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '800',
    marginTop: 34,
    marginBottom: 20,
  },

  chart: {
    borderRadius: 28,
  },

  insightCard: {
    backgroundColor: '#111827',
    borderRadius: 22,
    padding: 22,
    marginBottom: 14,
  },

  insightText: {
    color: 'white',
    lineHeight: 26,
    fontSize: 15,
  },

  invoiceCard: {
    backgroundColor: '#111827',
    borderRadius: 22,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  invoiceStore: {
    color: 'white',
    fontSize: 18,
    fontWeight: '800',
  },

  invoiceCategory: {
    color: '#9CA3AF',
    marginTop: 8,
  },

  invoiceAmount: {
    color: '#8B5CF6',
    fontWeight: '900',
    fontSize: 22,
  },

})