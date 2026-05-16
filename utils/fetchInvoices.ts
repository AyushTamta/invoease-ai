import { supabase }
from '../lib/supabase'

export const fetchInvoices =
  async () => {

    const {
      data,
      error,
    } = await supabase
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

      return []
    }

    return data
}