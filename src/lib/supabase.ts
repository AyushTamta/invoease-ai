import 'react-native-url-polyfill/auto'

import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  'https://nnrghpfcgcemnvahcnxf.supabase.co'

const supabaseAnonKey =
  'sb_publishable_6Yw1K_pkgdngx0avV7BKnw_RBOsO1zb'

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
)