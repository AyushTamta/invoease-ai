import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native'

import {
  useEffect,
  useState,
} from 'react'

import {
  supabase,
} from '../lib/supabase'

import Sidebar from '../components/Sidebar'

export default function Assistant() {

  const { width } =
    useWindowDimensions()

  const isDesktop =
    width > 900

  const [messages, setMessages] =
    useState<any[]>([])

  const [question, setQuestion] =
    useState('')

  const [invoices, setInvoices] =
    useState<any[]>([])

  useEffect(() => {

    fetchInvoices()

  }, [])

  const fetchInvoices = async () => {

    const { data, error } =
      await supabase
        .from('invoices')
        .select('*')

    if (error) {

      console.log(error)

      return
    }

    setInvoices(data || [])
  }

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

  const askAssistant = async () => {

    if (!question.trim()) return

    const userMessage = {
      role: 'user',
      text: question,
    }

    setMessages(prev => [
      ...prev,
      userMessage,
    ])

    const q =
      question.toLowerCase()

    let answer =
      'I could not fully understand the question.'

    const totalSpend =
      invoices.reduce(
        (
          acc,
          item
        ) =>
          acc +
          extractAmount(
            item.total_amount
          ),
        0
      )

    if (
      q.includes('food')
    ) {

      const foodInvoices =
        invoices.filter(
          item =>
            item.category ===
            'Food'
        )

      const total =
        foodInvoices.reduce(
          (
            acc,
            item
          ) =>
            acc +
            extractAmount(
              item.total_amount
            ),
          0
        )

      answer =
        `You spent ₹${total} on food expenses.`
    }

    else if (
      q.includes('travel')
    ) {

      const travelInvoices =
        invoices.filter(
          item =>
            item.category ===
            'Travel'
        )

      const total =
        travelInvoices.reduce(
          (
            acc,
            item
          ) =>
            acc +
            extractAmount(
              item.total_amount
            ),
          0
        )

      answer =
        `You spent ₹${total} on travel expenses.`
    }

    else if (
      q.includes(
        'biggest purchase'
      )
    ) {

      const sorted =
        [...invoices].sort(
          (a, b) =>
            extractAmount(
              b.total_amount
            ) -
            extractAmount(
              a.total_amount
            )
        )

      const biggest =
        sorted[0]

      answer =
        `Your biggest purchase was ${biggest.store_name} for ${biggest.total_amount}.`
    }

    else if (
      q.includes(
        'total spend'
      )
    ) {

      answer =
        `Your total recorded spending is ₹${totalSpend}.`
    }

    else if (
      q.includes(
        'recurring'
      )
    ) {

      const merchantMap: any =
        {}

      invoices.forEach(
        invoice => {

          merchantMap[
            invoice.store_name
          ] =
            (
              merchantMap[
                invoice.store_name
              ] || 0
            ) + 1
        }
      )

      const topMerchant =
        Object.entries(
          merchantMap
        ).sort(
          (
            a: any,
            b: any
          ) => b[1] - a[1]
        )[0]

      answer =
        `${topMerchant[0]} is your most recurring merchant.`
    }

    else if (
      q.includes(
        'highest category'
      )
    ) {

      const categoryMap: any =
        {}

      invoices.forEach(
        invoice => {

          categoryMap[
            invoice.category
          ] =
            (
              categoryMap[
                invoice.category
              ] || 0
            ) +
            extractAmount(
              invoice.total_amount
            )
        }
      )

      const topCategory =
        Object.entries(
          categoryMap
        ).sort(
          (
            a: any,
            b: any
          ) => b[1] - a[1]
        )[0]

      answer =
        `${topCategory[0]} is your highest spending category.`
    }

    const aiMessage = {
      role: 'ai',
      text: answer,
    }

    setMessages(prev => [
      ...prev,
      aiMessage,
    ])

    setQuestion('')
  }

  return (

    <View
      style={{
        flex: 1,
        flexDirection:
          isDesktop
            ? 'row'
            : 'column',
      }}
    >

      {isDesktop && <Sidebar />}

      <View style={styles.container}>

        <Text style={styles.logo}>
          InvoEase AI
        </Text>

        <Text style={styles.heading}>
          Finance Assistant
        </Text>

        <Text style={styles.subheading}>
          Ask questions about your expenses using AI.
        </Text>

        <View style={styles.promptRow}>

          {[
            'How much did I spend on food?',
            'What was my biggest purchase?',
            'What is my highest category?',
            'What are my recurring expenses?',
          ].map(prompt => (

            <TouchableOpacity
              key={prompt}
              style={styles.promptChip}
              onPress={() =>
                setQuestion(prompt)
              }
            >

              <Text
                style={styles.promptText}
              >
                {prompt}
              </Text>

            </TouchableOpacity>
          ))}

        </View>

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

                  msg.role ===
                  'user'

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

        <TextInput
          placeholder="Ask your finance AI..."
          placeholderTextColor="#6B7280"
          value={question}
          onChangeText={setQuestion}
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.askButton}
          onPress={askAssistant}
        >

          <Text
            style={styles.askText}
          >
            Ask AI
          </Text>

        </TouchableOpacity>

      </View>

    </View>
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
    fontSize: 48,
    fontWeight: '900',
    marginTop: 18,
  },

  subheading: {
    color: '#9CA3AF',
    fontSize: 16,
    lineHeight: 28,
    marginTop: 16,
  },

  promptRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 28,
  },

  promptChip: {
    backgroundColor: '#111827',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 999,
    marginRight: 12,
    marginBottom: 12,
  },

  promptText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '700',
  },

  chatBox: {
    flex: 1,
    marginTop: 24,
  },

  messageBubble: {
    padding: 18,
    borderRadius: 24,
    marginBottom: 16,
    maxWidth: '80%',
  },

  userBubble: {
    backgroundColor: '#8B5CF6',
    alignSelf: 'flex-end',
  },

  aiBubble: {
    backgroundColor: '#111827',
    alignSelf: 'flex-start',
  },

  messageText: {
    color: 'white',
    lineHeight: 24,
    fontSize: 15,
  },

  input: {
    backgroundColor: '#111827',
    borderRadius: 22,
    padding: 18,
    color: 'white',
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#1F2937',
  },

  askButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 22,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 40,
  },

  askText: {
    color: 'white',
    fontWeight: '800',
    fontSize: 16,
  },

})