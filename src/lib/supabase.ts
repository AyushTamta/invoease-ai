import 'react-native-url-polyfill/auto'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { createClient } from '@supabase/supabase-js'

import { Platform } from 'react-native'

const supabaseUrl =
  'https://nnrghpfcgcemnvahcnxf.supabase.co'

const supabaseAnonKey =
  'sb_publishable_6Yw1K_pkgdngx0avV7BKnw_RBOsO1zb'

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      storage:
        Platform.OS !== 'web'
          ? AsyncStorage
          : undefined,

      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
)