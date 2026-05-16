import { supabase } from '../lib/supabase'

export const saveInvoice =
  async (invoice: any) => {

    const { error } =
      await supabase
        .from('invoices')
        .insert([
          {
            merchant:
              invoice.store_name,

            category:
              invoice.category,

            total:
              invoice.total_amount,

            invoice_date:
              invoice.invoice_date,

            raw_text:
              invoice.raw_text,

            items:
              invoice.items || [],
          },
        ])

    if (error) {
      console.log(error)
    }
  }

export const getInvoices =
  async () => {

    const { data, error } =
      await supabase
        .from('invoices')
        .select('*')
        .order('created_at', {
          ascending: false,
        })

    if (error) {
      console.log(error)
      return []
    }

    return data
  }