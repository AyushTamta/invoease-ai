import {
View,
Text,
StyleSheet,
ScrollView,
} from 'react-native'
import {
useLocalSearchParams,
} from 'expo-router'
import {
useEffect,
useState,
} from 'react'
import {
getInvoices,
} from '../../utils/storage'
export default function ReceiptDetail() {
const { id } =
useLocalSearchParams()
const [invoice, setInvoice] =
useState<any>(null)
useEffect(() => {
loadInvoice()
}, [])
const loadInvoice = async () => {
    const invoices =
await getInvoices()
const selected =
invoices[Number(id)]
setInvoice(selected)
}
if (!invoice) {
return (
<View style={styles.loadingContainer}>
<Text style={styles.loadingText}>
Loading Receipt...
</Text>
</View>
)
}
return (
<ScrollView
contentContainerStyle={
styles.container
}
>
<Text style={styles.title}>
Receipt Details
</Text>
<View style={styles.heroCard}>
<Text style={styles.store}>
{invoice.store_name}
</Text>
<Text style={styles.amount}>
{invoice.total_amount}
</Text>
</View>
<View style={styles.infoCard}>
<View style={styles.row}>
<Text style={styles.label}>
Invoice Date
</Text>
<Text style={styles.value}>
{invoice.invoice_date}
</Text>
</View>
<View style={styles.divider} />
<View style={styles.row}>
<Text style={styles.label}>
Category
</Text>
<Text style={styles.category}>
Food
</Text>
</View>
</View>
<View style={styles.rawCard}>
<Text style={styles.rawTitle}>
OCR Extract
</Text>
<Text style={styles.rawText}>
{invoice.raw_text}
</Text>
</View>
</ScrollView>
)
}
const styles = StyleSheet.create({
container: {
flexGrow: 1,
backgroundColor: '#0B0F1A',
padding: 24,
paddingTop: 80,
},
loadingContainer: {
flex: 1,
backgroundColor: '#0B0F1A',
justifyContent: 'center',
alignItems: 'center',
},
loadingText: {
color: 'white',
fontSize: 18,
},
title: {
color: 'white',
fontSize: 34,
fontWeight: '800',
marginBottom: 30,
},
heroCard: {
backgroundColor: '#8B5CF6',
borderRadius: 32,
padding: 28,
},
store: {
color: 'white',
fontSize: 28,
fontWeight: '800',
},
amount: {
color: 'white',
fontSize: 48,
fontWeight: '900',
marginTop: 16,
},
infoCard: {
backgroundColor: '#111827',
borderRadius: 28,
padding: 24,
marginTop: 24,
},
row: {
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
},
label: {
color: '#9CA3AF',
fontSize: 15,
},
value: {
color: 'white',
fontSize: 15,
fontWeight: '700',
},
category: {
color: '#C4B5FD',
fontWeight: '700',
fontSize: 15,
},
divider: {
height: 1,
backgroundColor: '#1F2937',
marginVertical: 18,
},
rawCard: {
backgroundColor: '#111827',
borderRadius: 28,
padding: 24,
marginTop: 24,
marginBottom: 40,
},
rawTitle: {
color: 'white',
fontSize: 22,
fontWeight: '700',
marginBottom: 18,
},
rawText: {
color: '#D1D5DB',
lineHeight: 24,
fontSize: 14,
},
})