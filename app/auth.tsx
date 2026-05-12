import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'

import * as WebBrowser from 'expo-web-browser'
import * as Linking from 'expo-linking'

import { supabase } from '../src/lib/supabase'

WebBrowser.maybeCompleteAuthSession()

export default function AuthScreen() {
  const handleGoogleLogin = async () => {
    const redirectTo = Linking.createURL('/')

    const { data, error } =
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
        },
      })

    if (data?.url) {
      await WebBrowser.openAuthSessionAsync(
        data.url,
        redirectTo
      )
    }

    if (error) {
      console.log(error.message)
    }
  }

  return (
    <LinearGradient
      colors={['#0B0F1A', '#111827', '#1E1B4B']}
      style={styles.container}
    >
      <View style={styles.topSection}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            InvoEase.ai
          </Text>
        </View>

        <Text style={styles.heading}>
          AI-powered{'\n'}invoice insights
        </Text>

        <Text style={styles.subheading}>
          Scan receipts. Track spending.
          Let AI organize everything beautifully.
        </Text>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleLogin}
        >
          <Text style={styles.googleText}>
            Continue with Google
          </Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          By continuing, you agree to our Terms
          and Privacy Policy.
        </Text>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingTop: 120,
    paddingBottom: 50,
  },

  topSection: {
    gap: 28,
  },

  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(139,92,246,0.15)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
  },

  badgeText: {
    color: '#A78BFA',
    fontSize: 14,
    fontWeight: '600',
  },

  heading: {
    color: 'white',
    fontSize: 48,
    fontWeight: '700',
    lineHeight: 58,
    letterSpacing: -1.5,
  },

  subheading: {
    color: '#9CA3AF',
    fontSize: 18,
    lineHeight: 30,
    maxWidth: '90%',
  },

  bottomSection: {
    gap: 18,
  },

  googleButton: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 18,
    borderRadius: 22,
    alignItems: 'center',
  },

  googleText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },

  footerText: {
    color: '#6B7280',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
  },
})