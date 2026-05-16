import AsyncStorage from '@react-native-async-storage/async-storage'

export const saveInvoice =
  async (invoice: any) => {
    try {
      const existing =
        await AsyncStorage.getItem(
          'invoices'
        )

      const invoices = existing
        ? JSON.parse(existing)
        : []

      invoices.unshift(invoice)

      await AsyncStorage.setItem(
        'invoices',
        JSON.stringify(invoices)
      )
    } catch (err) {
      console.log(err)
    }
  }

export const getInvoices =
  async () => {
    try {
      const invoices =
        await AsyncStorage.getItem(
          'invoices'
        )

      return invoices
        ? JSON.parse(invoices)
        : []
    } catch (err) {
      console.log(err)

      return []
    }
  }