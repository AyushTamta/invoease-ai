import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native'

import * as ImagePicker from 'expo-image-picker'

import { useState } from 'react'

import { router } from 'expo-router'

export default function ScannerScreen() {
  const [image, setImage] =
    useState<string | null>(null)

  const [result, setResult] =
    useState<any>(null)

  const [loading, setLoading] =
    useState(false)

  const pickImage = async () => {
    const permission =
      await ImagePicker.requestCameraPermissionsAsync()

    if (!permission.granted) {
      alert('Camera permission needed')
      return
    }

    const res =
      await ImagePicker.launchCameraAsync({
        quality: 0.5,
      })

    if (!res.canceled) {
      const uri = res.assets[0].uri

      setImage(uri)

      uploadInvoice(uri)
    }
  }

  const uploadInvoice = async (
    uri: string
  ) => {
    try {
      setLoading(true)

      setResult(null)

      const formData = new FormData()

      formData.append('file', {
        uri,
        name: 'invoice.jpg',
        type: 'image/jpeg',
      } as any)

      const response = await fetch(
        'https://invoease-ai-backend.onrender.com/scan-invoice',
        {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type':
              'multipart/form-data',
          },
        }
      )

      const data =
        await response.json()

      console.log(
        'AI RESPONSE:',
        data
      )

      setResult(data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView
      contentContainerStyle={
        styles.container
      }
    >
      <Text style={styles.title}>
        InvoEase AI
      </Text>

      <Text style={styles.subtitle}>
        Smart Invoice Scanner
      </Text>

      <TouchableOpacity
        style={styles.scanButton}
        onPress={pickImage}
      >
        <Text style={styles.scanText}>
          Scan Invoice
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.dashboardButton}
        onPress={() =>
          router.push('/dashboard')
        }
      >
        <Text style={styles.dashboardText}>
          Open Dashboard
        </Text>
      </TouchableOpacity>

      {image && (
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
      )}

      {loading && (
        <View style={styles.loaderBox}>
          <ActivityIndicator
            size="large"
            color="#8B5CF6"
          />

          <Text style={styles.loadingText}>
            Analyzing invoice...
          </Text>
        </View>
      )}

      {result && (
        <View style={styles.card}>
          <Text style={styles.store}>
            {result.store_name}
          </Text>

          <Text style={styles.amount}>
            {result.total_amount}
          </Text>

          <View style={styles.row}>
            <Text style={styles.label}>
              Date
            </Text>

            <Text style={styles.value}>
              {result.invoice_date}
            </Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.rawTitle}>
            OCR Extract
          </Text>

          <Text style={styles.rawText}>
            {result.raw_text}
          </Text>
        </View>
      )}
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
    fontSize: 38,
    fontWeight: '800',
  },

  subtitle: {
    color: '#9CA3AF',
    marginTop: 8,
    marginBottom: 30,
    fontSize: 16,
  },

  scanButton: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 18,
    borderRadius: 22,
    alignItems: 'center',
  },

  scanText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
  },

  dashboardButton: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#8B5CF6',
    paddingVertical: 16,
    borderRadius: 22,
    alignItems: 'center',
  },

  dashboardText: {
    color: '#8B5CF6',
    fontWeight: '700',
    fontSize: 16,
  },

  image: {
    width: '100%',
    height: 320,
    borderRadius: 28,
    marginTop: 30,
  },

  loaderBox: {
    marginTop: 30,
    alignItems: 'center',
  },

  loadingText: {
    color: '#A78BFA',
    marginTop: 12,
    fontSize: 15,
  },

  card: {
    backgroundColor: '#111827',
    marginTop: 30,
    borderRadius: 28,
    padding: 24,
  },

  store: {
    color: 'white',
    fontSize: 28,
    fontWeight: '700',
  },

  amount: {
    color: '#8B5CF6',
    fontSize: 42,
    fontWeight: '800',
    marginTop: 10,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },

  label: {
    color: '#9CA3AF',
    fontSize: 15,
  },

  value: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },

  divider: {
    height: 1,
    backgroundColor: '#1F2937',
    marginVertical: 25,
  },

  rawTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
  },

  rawText: {
    color: '#D1D5DB',
    lineHeight: 24,
    fontSize: 14,
  },
})