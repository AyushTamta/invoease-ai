import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
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

export default function Invoices() {

  const { width } =
    useWindowDimensions()

  const isDesktop =
    width > 900

  const [invoices, setInvoices] =
    useState<any[]>([])

  const [filteredInvoices,
    setFilteredInvoices] =
    useState<any[]>([])

  const [search, setSearch] =
    useState('')

  const [selectedCategory,
    setSelectedCategory] =
    useState('All')

  const [sortType,
    setSortType] =
    useState('Newest')

  const [selectedInvoice,
    setSelectedInvoice] =
    useState<any>(null)

  const [modalVisible,
    setModalVisible] =
    useState(false)

  useEffect(() => {

    fetchInvoices()

  }, [])

  useEffect(() => {

    filterInvoices()

  }, [
    search,
    selectedCategory,
    sortType,
    invoices,
  ])

  const fetchInvoices = async () => {

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

  const filterInvoices = () => {

    let temp = [...invoices]

    if (
      selectedCategory !== 'All'
    ) {

      temp = temp.filter(
        item =>
          item.category ===
          selectedCategory
      )
    }

    if (search) {

      temp = temp.filter(
        item =>
          item.store_name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||

          item.category
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      )
    }

    if (sortType === 'Highest') {

      temp.sort(
        (a, b) =>
          extractAmount(
            b.total_amount
          ) -
          extractAmount(
            a.total_amount
          )
      )
    }

    if (sortType === 'Lowest') {

      temp.sort(
        (a, b) =>
          extractAmount(
            a.total_amount
          ) -
          extractAmount(
            b.total_amount
          )
      )
    }

    setFilteredInvoices(temp)
  }

  const categories = [
    'All',
    'Food',
    'Travel',
    'Shopping',
    'Healthcare',
    'General',
  ]

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
          Invoice Memory
        </Text>

        <TextInput
          placeholder="Search invoices..."
          placeholderTextColor="#6B7280"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={
            false
          }
          style={styles.filterRow}
        >

          {categories.map(
            category => (

              <TouchableOpacity
                key={category}
                style={[
                  styles.filterChip,

                  selectedCategory ===
                    category &&

                    styles.activeChip,
                ]}
                onPress={() =>
                  setSelectedCategory(
                    category
                  )
                }
              >

                <Text
                  style={
                    styles.filterText
                  }
                >
                  {category}
                </Text>

              </TouchableOpacity>
            )
          )}

        </ScrollView>

        <View style={styles.sortRow}>

          {[
            'Newest',
            'Highest',
            'Lowest',
          ].map(sort => (

            <TouchableOpacity
              key={sort}
              style={[
                styles.sortButton,

                sortType === sort &&
                  styles.activeSort,
              ]}
              onPress={() =>
                setSortType(sort)
              }
            >

              <Text
                style={styles.sortText}
              >
                {sort}
              </Text>

            </TouchableOpacity>
          ))}

        </View>

        {filteredInvoices.map(
          (
            invoice,
            index
          ) => (

            <TouchableOpacity
              key={index}
              style={styles.invoiceCard}
              onPress={() => {

                setSelectedInvoice(
                  invoice
                )

                setModalVisible(true)
              }}
            >

              <View>

                <Text
                  style={
                    styles.invoiceStore
                  }
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
                  {
                    invoice.category
                  }
                </Text>

              </View>

              <View
                style={{
                  alignItems:
                    'flex-end',
                }}
              >

                <Text
                  style={
                    styles.invoiceAmount
                  }
                >
                  {
                    invoice.total_amount
                  }
                </Text>

                <Text
                  style={
                    styles.confidence
                  }
                >
                  {
                    invoice.confidence
                  }%
                </Text>

              </View>

            </TouchableOpacity>
          )
        )}

      </ScrollView>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
      >

        <View style={styles.modalWrap}>

          <View style={styles.modalCard}>

            <ScrollView>

              <Text
                style={styles.modalTitle}
              >
                {
                  selectedInvoice
                    ?.store_name
                }
              </Text>

              <Text
                style={styles.modalAmount}
              >
                {
                  selectedInvoice
                    ?.total_amount
                }
              </Text>

              <Text
                style={styles.modalLabel}
              >
                Category
              </Text>

              <Text
                style={styles.modalValue}
              >
                {
                  selectedInvoice
                    ?.category
                }
              </Text>

              <Text
                style={styles.modalLabel}
              >
                Tax
              </Text>

              <Text
                style={styles.modalValue}
              >
                {
                  selectedInvoice
                    ?.tax
                }
              </Text>

              <Text
                style={styles.modalLabel}
              >
                Payment Method
              </Text>

              <Text
                style={styles.modalValue}
              >
                {
                  selectedInvoice
                    ?.payment_method
                }
              </Text>

              <Text
                style={styles.modalLabel}
              >
                AI Summary
              </Text>

              <Text
                style={styles.summary}
              >
                {
                  selectedInvoice
                    ?.ai_summary
                }
              </Text>

              <Text
                style={styles.modalLabel}
              >
                Items
              </Text>

              {selectedInvoice
                ?.items?.map(
                  (
                    item: any,
                    index: number
                  ) => (

                    <View
                      key={index}
                      style={
                        styles.itemCard
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
                          styles.itemPrice
                        }
                      >
                        ₹{item.price}
                      </Text>

                    </View>
                  )
                )}

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() =>
                  setModalVisible(
                    false
                  )
                }
              >

                <Text
                  style={
                    styles.closeText
                  }
                >
                  Close
                </Text>

              </TouchableOpacity>

            </ScrollView>

          </View>

        </View>

      </Modal>

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

  searchInput: {
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: 18,
    color: 'white',
    marginTop: 28,
    borderWidth: 1,
    borderColor: '#1F2937',
  },

  filterRow: {
    marginTop: 24,
  },

  filterChip: {
    backgroundColor: '#111827',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 999,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#1F2937',
  },

  activeChip: {
    backgroundColor: '#8B5CF6',
  },

  filterText: {
    color: 'white',
    fontWeight: '700',
  },

  sortRow: {
    flexDirection: 'row',
    marginTop: 24,
    marginBottom: 20,
  },

  sortButton: {
    backgroundColor: '#111827',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 18,
    marginRight: 12,
  },

  activeSort: {
    backgroundColor: '#8B5CF6',
  },

  sortText: {
    color: 'white',
    fontWeight: '700',
  },

  invoiceCard: {
    backgroundColor: '#111827',
    borderRadius: 24,
    padding: 22,
    marginBottom: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  invoiceStore: {
    color: 'white',
    fontSize: 20,
    fontWeight: '800',
  },

  invoiceCategory: {
    color: '#9CA3AF',
    marginTop: 8,
  },

  invoiceAmount: {
    color: '#8B5CF6',
    fontSize: 22,
    fontWeight: '900',
  },

  confidence: {
    color: '#10B981',
    marginTop: 6,
  },

  modalWrap: {
    flex: 1,
    backgroundColor:
      'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  modalCard: {
    backgroundColor: '#0F172A',
    borderRadius: 32,
    width: '100%',
    maxWidth: 650,
    maxHeight: '90%',
    padding: 28,
  },

  modalTitle: {
    color: 'white',
    fontSize: 34,
    fontWeight: '900',
  },

  modalAmount: {
    color: '#8B5CF6',
    fontSize: 40,
    fontWeight: '900',
    marginTop: 14,
  },

  modalLabel: {
    color: '#9CA3AF',
    marginTop: 28,
    marginBottom: 8,
    fontSize: 13,
  },

  modalValue: {
    color: 'white',
    fontSize: 17,
  },

  summary: {
    color: 'white',
    lineHeight: 28,
    fontSize: 15,
  },

  itemCard: {
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: 18,
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  itemName: {
    color: 'white',
  },

  itemPrice: {
    color: '#8B5CF6',
    fontWeight: '800',
  },

  closeButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 22,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 34,
  },

  closeText: {
    color: 'white',
    fontWeight: '800',
    fontSize: 16,
  },

})