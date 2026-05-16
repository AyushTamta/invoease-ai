import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'

import {
  useState,
  useEffect,
} from 'react'

import {
  LinearGradient,
} from 'expo-linear-gradient'

import {
  fetchInvoices,
} from '../utils/fetchInvoices'

export default function Assistant() {

  const [question, setQuestion] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const [invoices, setInvoices] =
    useState<any[]>([])

  const [messages, setMessages] =
    useState<any[]>([])

  useEffect(() => {

    loadInvoices()

  }, [])

  const loadInvoices = async () => {

    const data =
      await fetchInvoices()

    setInvoices(data)
  }

  const askFinanceAI = async (
    customQuestion?: string
  ) => {

    try {

      const finalQuestion =
        customQuestion || question

      if (!finalQuestion.trim()) return

      setLoading(true)

      setQuestion('')

      const updatedMessages = [

        ...messages,

        {
          role: 'user',
          content:
          finalQuestion,
        }

      ]

      setMessages(updatedMessages)

      const response =
        await fetch(
          'https://invoease-ai-backend.onrender.com/finance-chat',
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json',
            },

            body: JSON.stringify({

              invoices,

              question:
              finalQuestion,

              messages:
              updatedMessages,
            }),
          }
        )

      const data =
        await response.json()

      setMessages(prev => [

        ...prev,

        {
          role: 'assistant',
          content:
          data.answer,
        }

      ])

    } catch (err) {

      console.log(err)

    } finally {

      setLoading(false)
    }
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
        Finance{'\n'}
        Assistant
      </Text>

      <Text style={styles.subtitle}>
        Ask AI about your spending,
        invoices and financial habits.
      </Text>

      <LinearGradient
        colors={[
          '#8B5CF6',
          '#6D28D9',
        ]}
        style={styles.heroCard}
      >

        <Text style={styles.heroTitle}>
          AI Financial Intelligence
        </Text>

        <Text style={styles.heroSub}>
          Analyze expenses, merchants,
          trends and financial behavior.
        </Text>

      </LinearGradient>

      <Text style={styles.sectionTitle}>
        Suggested Questions
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={
          false
        }
      >

        <TouchableOpacity
          style={styles.promptChip}
          onPress={() =>
            askFinanceAI(
              'How much did I spend on food?'
            )
          }
        >
          <Text style={styles.promptText}>
            Food Spending
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.promptChip}
          onPress={() =>
            askFinanceAI(
              'Which merchant do I use most?'
            )
          }
        >
          <Text style={styles.promptText}>
            Top Merchant
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.promptChip}
          onPress={() =>
            askFinanceAI(
              'Did my spending increase this month?'
            )
          }
        >
          <Text style={styles.promptText}>
            Spending Trends
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.promptChip}
          onPress={() =>
            askFinanceAI(
              'What is my biggest expense category?'
            )
          }
        >
          <Text style={styles.promptText}>
            Expense Categories
          </Text>
        </TouchableOpacity>

      </ScrollView>

      <Text style={styles.sectionTitle}>
        Ask Finance AI
      </Text>

      <TextInput
        placeholder="Ask anything about your finances..."
        placeholderTextColor="#6B7280"
        value={question}
        onChangeText={setQuestion}
        style={styles.input}
        multiline
      />

      <TouchableOpacity
        style={styles.askButton}
        onPress={() =>
          askFinanceAI()
        }
      >

        <Text style={styles.askText}>
          {loading
            ? 'Thinking...'
            : 'Ask AI'}
        </Text>

      </TouchableOpacity>

      {loading && (

        <View style={styles.loaderBox}>

          <ActivityIndicator
            size="large"
            color="#8B5CF6"
          />

          <Text style={styles.loaderText}>
            AI is analyzing your finances...
          </Text>

        </View>
      )}

      <View style={styles.chatContainer}>

        {messages.map(
          (
            message,
            index
          ) => (

            <View
              key={index}
              style={
                message.role === 'user'
                ? styles.userBubble
                : styles.aiBubble
              }
            >

              <Text
                style={styles.chatText}
              >
                {message.content}
              </Text>

            </View>
          )
        )}

      </View>

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
    fontSize: 16,
    lineHeight: 28,
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
    lineHeight: 24,
    fontSize: 15,
  },

  sectionTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '900',
    marginTop: 40,
    marginBottom: 20,
  },

  promptChip: {
    backgroundColor: '#111827',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 999,
    marginRight: 12,
  },

  promptText: {
    color: 'white',
    fontWeight: '700',
  },

  input: {
    backgroundColor: '#111827',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 20,
    color: 'white',
    minHeight: 140,
    textAlignVertical: 'top',
    fontSize: 16,
    marginTop: 10,
  },

  askButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 24,
    paddingVertical: 20,
    alignItems: 'center',
    marginTop: 20,
  },

  askText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '800',
  },

  loaderBox: {
    marginTop: 34,
    alignItems: 'center',
  },

  loaderText: {
    color: '#A78BFA',
    marginTop: 14,
    fontSize: 15,
  },

  chatContainer: {
    marginTop: 36,
    marginBottom: 100,
  },

  userBubble: {
    backgroundColor: '#8B5CF6',
    padding: 20,
    borderRadius: 24,
    alignSelf: 'flex-end',
    marginBottom: 16,
    maxWidth: '85%',
  },

  aiBubble: {
    backgroundColor: '#111827',
    padding: 20,
    borderRadius: 24,
    alignSelf: 'flex-start',
    marginBottom: 16,
    maxWidth: '85%',
  },

  chatText: {
    color: 'white',
    fontSize: 15,
    lineHeight: 26,
  },
})