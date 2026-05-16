import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native'

import {
  LinearGradient,
} from 'expo-linear-gradient'

import {
  router,
} from 'expo-router'

export default function Home() {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
      />

      <View style={styles.glowOne} />

      <View style={styles.glowTwo} />

      <Text style={styles.logo}>
        InvoEase
      </Text>

      <Text style={styles.heading}>
        Expense{'\n'}
        Intelligence.
      </Text>

      <Text style={styles.subtitle}>
        AI-powered invoice scanning,
        analytics and smart insights
        for modern finance workflows.
      </Text>

      <LinearGradient
        colors={[
          '#8B5CF6',
          '#6D28D9',
          '#4C1D95',
        ]}
        start={{
          x: 0,
          y: 0,
        }}
        end={{
          x: 1,
          y: 1,
        }}
        style={styles.heroCard}
      >
        <View>
          <Text
            style={styles.heroLabel}
          >
            Total Spend
          </Text>

          <Text
            style={styles.heroAmount}
          >
            $4,280
          </Text>

          <Text style={styles.heroSub}>
            +18% this month
          </Text>
        </View>

        <View style={styles.heroChip}>
          <Text
            style={styles.heroChipText}
          >
            AI ACTIVE
          </Text>
        </View>
      </LinearGradient>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() =>
          router.push('/scanner')
        }
      >
        <Text
          style={styles.primaryText}
        >
          Scan Invoice
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() =>
          router.push('/dashboard')
        }
      >
        <Text
          style={styles.secondaryText}
        >
          Open Dashboard
        </Text>
      </TouchableOpacity>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            142
          </Text>

          <Text style={styles.statLabel}>
            Invoices
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            12
          </Text>

          <Text style={styles.statLabel}>
            Categories
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050816',
    paddingHorizontal: 24,
    paddingTop: 90,
  },

  glowOne: {
    position: 'absolute',
    width: 240,
    height: 240,
    backgroundColor: '#7C3AED',
    borderRadius: 999,
    opacity: 0.18,
    top: -40,
    right: -80,
  },

  glowTwo: {
    position: 'absolute',
    width: 180,
    height: 180,
    backgroundColor: '#2563EB',
    borderRadius: 999,
    opacity: 0.12,
    bottom: 120,
    left: -60,
  },

  logo: {
    color: '#A78BFA',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
  },

  heading: {
    color: 'white',
    fontSize: 58,
    lineHeight: 60,
    fontWeight: '900',
    marginTop: 20,
    letterSpacing: -3,
  },

  subtitle: {
    color: '#9CA3AF',
    fontSize: 17,
    lineHeight: 30,
    marginTop: 24,
    maxWidth: '92%',
  },

  heroCard: {
    marginTop: 45,
    borderRadius: 38,
    padding: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',

    shadowColor: '#8B5CF6',
    shadowOpacity: 0.5,
    shadowRadius: 25,
    elevation: 16,
  },

  heroLabel: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: 16,
  },

  heroAmount: {
    color: 'white',
    fontSize: 58,
    fontWeight: '900',
    marginTop: 10,
    letterSpacing: -3,
  },

  heroSub: {
    color: 'rgba(255,255,255,0.85)',
    marginTop: 12,
    fontSize: 16,
  },

  heroChip: {
    backgroundColor:
      'rgba(255,255,255,0.15)',

    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
  },

  heroChipText: {
    color: 'white',
    fontWeight: '800',
    fontSize: 11,
    letterSpacing: 1,
  },

  primaryButton: {
    backgroundColor: 'white',
    marginTop: 40,
    paddingVertical: 20,
    borderRadius: 26,
    alignItems: 'center',
  },

  primaryText: {
    color: '#111827',
    fontSize: 17,
    fontWeight: '800',
  },

  secondaryButton: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#1F2937',
    paddingVertical: 20,
    borderRadius: 26,
    alignItems: 'center',
    backgroundColor: '#0F172A',
  },

  secondaryText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 28,
  },

  statCard: {
    width: '48%',
    backgroundColor: '#0F172A',
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: '#1F2937',
  },

  statValue: {
    color: 'white',
    fontSize: 34,
    fontWeight: '900',
  },

  statLabel: {
    color: '#9CA3AF',
    marginTop: 10,
    fontSize: 15,
  },
})