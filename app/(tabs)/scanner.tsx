import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
  StatusBar,
  TextInput,
} from 'react-native'

import * as ImagePicker from 'expo-image-picker'

import {
  useState,
} from 'react'

import {
  LinearGradient,
} from 'expo-linear-gradient'

import * as Haptics from 'expo-haptics'

import {
  saveInvoice,
} from '../../utils/invoices'

export default function Scanner() {

  const [image, setImage] =
    useState<string | null>(null)

  const [invoice, setInvoice] =
    useState<any>(null)

  const [loading, setLoading] =
    useState(false)

  const [question, setQuestion] =
    useState('')

  const [askingAI, setAskingAI] =
    useState(false)

  const [messages, setMessages] =
    useState<any[]>([])

  const pickFromGallery = async () => {

    try {

      const result =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes:
            ImagePicker.MediaTypeOptions.Images,

          quality: 0.08,

          allowsEditing: true,

          aspect: [4, 4],

          base64: false,

          exif: false,
        })

      if (result.canceled) return

      const uri =
        result.assets[0].uri

      setImage(uri)

      await uploadInvoice(uri)

    } catch (err) {

      console.log(err)
    }
  }

  const openCamera = async () => {

    try {

      const permission =
        await ImagePicker.requestCameraPermissionsAsync()

      if (!permission.granted) {

        Alert.alert(
          'Permission Required',
          'Camera access is needed.'
        )

        return
      }

      const result =
        await ImagePicker.launchCameraAsync({
          quality: 0.08,

          allowsEditing: true,

          aspect: [4, 4],

          base64: false,

          exif: false,
        })

      if (result.canceled) return

      const uri =
        result.assets[0].uri

      setImage(uri)

      await uploadInvoice(uri)

    } catch (err) {

      console.log(err)
    }
  }

  const uploadInvoice = async (
    uri: string
  ) => {

    try {

      setLoading(true)

      setInvoice(null)

      setMessages([])

      const formData =
        new FormData()

      formData.append(
        'file',
        {
          uri,
          name: 'invoice.jpg',
          type: 'image/jpeg',
        } as any
      )

      const response =
        await fetch(
          'https://invoease-ai-backend.onrender.com/scan-invoice',
          {
            method: 'POST',
            body: formData,
          }
        )

      const data =
        await response.json()

      console.log(data)

      if (data.error) {

        Alert.alert(
          'OCR Failed',
          JSON.stringify(data)
        )

        return
      }

      setInvoice(data)

      await saveInvoice({
        ...data,
        created_at:
          new Date().toISOString(),
      })

    } catch (err) {

      console.log(err)

      Alert.alert(
        'Upload Failed',
        'Could not scan invoice.'
      )

    } finally {

      setLoading(false)
    }
  }

  const askAI = async () => {

    try {

      if (!question.trim()) return

      const userMessage = {
        role: 'user',
        text: question,
      }

      setMessages(prev => [
        ...prev,
        userMessage,
      ])

      setQuestion('')

      setAskingAI(true)

      const response =
        await fetch(
          'https://invoease-ai-backend.onrender.com/ask-ai',
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json',
            },

            body: JSON.stringify({
              invoice,
              question:
                userMessage.text,
            }),
          }
        )

      const data =
        await response.json()

      const aiMessage = {
        role: 'ai',
        text:
          data.answer ||
          'AI could not answer.',
      }

      setMessages(prev => [
        ...prev,
        aiMessage,
      ])

    } catch (err) {

      console.log(err)

    } finally {

      setAskingAI(false)
    }
  }

  return (
    <ScrollView
      contentContainerStyle={
        styles.container
      }
      showsVerticalScrollIndicator={
        false
      }
    >
      <StatusBar
        barStyle="light-content"
      />

      <View style={styles.glowOne} />

      <View style={styles.glowTwo} />

      <Text style={styles.logo}>
        InvoEase AI
      </Text>

      <Text style={styles.heading}>
        Smart{'\n'}
        Scanner
      </Text>

      <Text style={styles.subtitle}>
        Upload invoices and talk
        to your finances using AI.
      </Text>

      <LinearGradient
        colors={[
          '#8B5CF6',
          '#6D28D9',
        ]}
        style={styles.heroCard}
      >
        <Text style={styles.heroTitle}>
          AI Expense Intelligence
        </Text>

        <Text style={styles.heroSub}>
          Scan, analyze and chat
          with invoices instantly.
        </Text>
      </LinearGradient>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={openCamera}
      >
        <Text style={styles.primaryText}>
          Scan Invoice
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={pickFromGallery}
      >
        <Text
          style={styles.secondaryText}
        >
          Upload Image
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

          <Text
            style={styles.loadingText}
          >
            AI analyzing invoice...
          </Text>

        </View>
      )}

      {invoice && (

        <View style={styles.resultCard}>

          <View
            style={styles.resultHeader}
          >

            <View>

              <Text
                style={styles.store}
              >
                {invoice.store_name}
              </Text>

              <Text
                style={styles.date}
              >
                {invoice.invoice_date}
              </Text>

            </View>

            <View
              style={
                styles.categoryBadge
              }
            >

              <Text
                style={
                  styles.categoryText
                }
              >
                {invoice.category}
              </Text>

            </View>

          </View>

          <Text
            style={styles.amount}
          >
            {invoice.total_amount}
          </Text>

          <View style={styles.infoGrid}>

            <View
              style={styles.infoCard}
            >

              <Text
                style={styles.infoLabel}
              >
                Payment
              </Text>

              <Text
                style={styles.infoValue}
              >
                {
                  invoice.payment_method
                }
              </Text>

            </View>

            <View
              style={styles.infoCard}
            >

              <Text
                style={styles.infoLabel}
              >
                Tax
              </Text>

              <Text
                style={styles.infoValue}
              >
                {invoice.tax}
              </Text>

            </View>

            <View
              style={styles.infoCard}
            >

              <Text
                style={styles.infoLabel}
              >
                AI Confidence
              </Text>

              <Text
                style={styles.infoValue}
              >
                {
                  invoice.confidence
                }%
              </Text>

            </View>

            <View
              style={styles.infoCard}
            >

              <Text
                style={styles.infoLabel}
              >
                Category
              </Text>

              <Text
                style={styles.infoValue}
              >
                {
                  invoice.category
                }
              </Text>

            </View>

          </View>

          <Text
            style={styles.sectionTitle}
          >
            Items Purchased
          </Text>

          {invoice.items?.length > 0 ? (

            invoice.items.map(
              (
                item: any,
                index: number
              ) => (

                <View
                  key={index}
                  style={styles.itemCard}
                >

                  <Text
                    style={styles.itemIcon}
                  >
                    🧾
                  </Text>

                  <View
                    style={
                      styles.itemMiddle
                    }
                  >

                    <Text
                      style={
                        styles.itemName
                      }
                    >
                      {item.name}
                    </Text>

                    <Text
                      style={
                        styles.itemSub
                      }
                    >
                      Invoice Item
                    </Text>

                  </View>

                  <Text
                    style={
                      styles.itemPrice
                    }
                  >
                    ₹{item.price}
                  </Text>

                </View>
              )
            )

          ) : (

            <Text
              style={styles.emptyItems}
            >
              No items detected.
            </Text>
          )}

          <Text
            style={styles.sectionTitle}
          >
            AI Summary
          </Text>

          <View
            style={styles.aiSummaryCard}
          >

            <Text
              style={
                styles.aiSummaryText
              }
            >
              {invoice.ai_summary}
            </Text>

          </View>

          <Text
            style={styles.sectionTitle}
          >
            Ask AI
          </Text>

          <ScrollView
            style={styles.chatBox}
            showsVerticalScrollIndicator={
              false
            }
          >

            {messages.map(
              (
                msg,
                index
              ) => (

                <View
                  key={index}
                  style={[
                    styles.messageBubble,

                    msg.role === 'user'
                      ? styles.userBubble
                      : styles.aiBubble,
                  ]}
                >

                  <Text
                    style={
                      styles.messageText
                    }
                  >
                    {msg.text}
                  </Text>

                </View>
              )
            )}

          </ScrollView>

          <View
            style={styles.promptRow}
          >

            <TouchableOpacity
              style={styles.promptChip}
              onPress={() =>
                setQuestion(
                  'What items were purchased?'
                )
              }
            >

              <Text
                style={styles.promptText}
              >
                Items
              </Text>

            </TouchableOpacity>

            <TouchableOpacity
              style={styles.promptChip}
              onPress={() =>
                setQuestion(
                  'Was this business expense?'
                )
              }
            >

              <Text
                style={styles.promptText}
              >
                Business?
              </Text>

            </TouchableOpacity>

            <TouchableOpacity
              style={styles.promptChip}
              onPress={() =>
                setQuestion(
                  'How much tax was paid?'
                )
              }
            >

              <Text
                style={styles.promptText}
              >
                Tax
              </Text>

            </TouchableOpacity>

          </View>

          <TextInput
            placeholder="Ask about this invoice..."
            placeholderTextColor="#6B7280"
            value={question}
            onChangeText={setQuestion}
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.askButton}
            onPress={askAI}
          >

            <Text
              style={
                styles.askButtonText
              }
            >
              {askingAI
                ? 'Thinking...'
                : 'Ask AI'}
            </Text>

          </TouchableOpacity>

        </View>
      )}

    </ScrollView>
  )
}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    backgroundColor: '#050816',
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 120,
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
  },

  heading: {
    color: 'white',
    fontSize: 56,
    lineHeight: 58,
    fontWeight: '900',
    marginTop: 16,
  },

  subtitle: {
    color: '#9CA3AF',
    fontSize: 17,
    lineHeight: 30,
    marginTop: 20,
  },

  heroCard: {
    marginTop: 36,
    borderRadius: 34,
    padding: 28,
  },

  heroTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '800',
  },

  heroSub: {
    color: 'rgba(255,255,255,0.85)',
    marginTop: 12,
    fontSize: 15,
  },

  primaryButton: {
    backgroundColor: 'white',
    marginTop: 34,
    paddingVertical: 20,
    borderRadius: 24,
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
    backgroundColor: '#0F172A',
    paddingVertical: 20,
    borderRadius: 24,
    alignItems: 'center',
  },

  secondaryText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },

  image: {
    width: '100%',
    height: 320,
    borderRadius: 32,
    marginTop: 34,
  },

  loaderBox: {
    marginTop: 40,
    alignItems: 'center',
  },

  loadingText: {
    color: '#A78BFA',
    marginTop: 14,
  },

  resultCard: {
    backgroundColor: '#111827',
    borderRadius: 34,
    padding: 24,
    marginTop: 36,
  },

  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  store: {
    color: 'white',
    fontSize: 30,
    fontWeight: '900',
  },

  date: {
    color: '#9CA3AF',
    marginTop: 10,
  },

  categoryBadge: {
    backgroundColor: '#312E81',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
  },

  categoryText: {
    color: '#C4B5FD',
    fontWeight: '800',
  },

  amount: {
    color: '#8B5CF6',
    fontSize: 52,
    fontWeight: '900',
    marginTop: 28,
  },

  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 28,
  },

  infoCard: {
    width: '48%',
    backgroundColor: '#0F172A',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#1F2937',
  },

  infoLabel: {
    color: '#9CA3AF',
    fontSize: 13,
  },

  infoValue: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 10,
  },

  sectionTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: '800',
    marginTop: 34,
    marginBottom: 18,
  },

  itemCard: {
    backgroundColor: '#0F172A',
    borderRadius: 22,
    padding: 18,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1F2937',
  },

  itemIcon: {
    fontSize: 24,
  },

  itemMiddle: {
    flex: 1,
    marginLeft: 16,
  },

  itemName: {
    color: 'white',
    fontSize: 15,
  },

  itemSub: {
    color: '#6B7280',
    marginTop: 4,
    fontSize: 13,
  },

  itemPrice: {
    color: '#A78BFA',
    fontWeight: '800',
  },

  emptyItems: {
    color: '#9CA3AF',
  },

  aiSummaryCard: {
    backgroundColor: '#0F172A',
    borderRadius: 24,
    padding: 22,
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#1F2937',
  },

  aiSummaryText: {
    color: 'white',
    lineHeight: 28,
    fontSize: 15,
  },

  chatBox: {
    maxHeight: 320,
    marginTop: 20,
  },

  messageBubble: {
    padding: 18,
    borderRadius: 22,
    marginBottom: 14,
    maxWidth: '85%',
  },

  userBubble: {
    backgroundColor: '#8B5CF6',
    alignSelf: 'flex-end',
  },

  aiBubble: {
    backgroundColor: '#0F172A',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#1F2937',
  },

  messageText: {
    color: 'white',
    lineHeight: 24,
    fontSize: 15,
  },

  promptRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 18,
  },

  promptChip: {
    backgroundColor: '#111827',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#1F2937',
  },

  promptText: {
    color: 'white',
    fontSize: 13,
  },

  input: {
    backgroundColor: '#0F172A',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 18,
    color: 'white',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#1F2937',
  },

  askButton: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 16,
  },

  askButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '800',
  },

})