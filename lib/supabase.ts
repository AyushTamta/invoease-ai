import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  'https://nnrghpfcgcemnvahcnxf.supabase.co'

const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ucmdocGZjZ2NlbW52YWhjbnhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1OTEyOTUsImV4cCI6MjA5NDE2NzI5NX0.-qqcCuEBuhA7V8Mrr58oAgNARbsPIcO8Z4hSWAVTG9g'

export const supabase =
  createClient(
    supabaseUrl,
    supabaseAnonKey
  )