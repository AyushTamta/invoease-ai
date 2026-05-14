import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native'

import {
  CameraView,
  useCameraPermissions,
} from 'expo-camera'

import {
  useRef,
  useState,
} from 'react'

import axios from 'axios'

export default function ScanScreen() {
  const [permission, requestPermission] =
    useCameraPermissions()

  const cameraRef = useRef<any>(null)

  const [capturedImage, setCapturedImage] =
    useState<string | null>(null)

  const [loading, setLoading] =
    useState(false)

  const [aiResult, setAiResult] =
    useState<any>(null)

  const takePicture = async () => {
    if (!cameraRef.current) return

    try {
      setLoading(true)

      const photo =
        await cameraRef.current.takePictureAsync()

      setCapturedImage(photo.uri)

      const formData = new FormData()

      formData.append('file', {
        uri: photo.uri,
        name: 'invoice.jpg',
        type: 'image/jpeg',
      } as any)

      const response = await axios.post(
        'https://invoease-ai-backend.onrender.com/scan-invoice',
        formData,
        {
          headers: {
            'Content-Type':
              'multipart/form-data',
          },
        }
      )

      setAiResult(response.data)

      console.log(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  if (!permission) {
    return <View />
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          Camera access is required
        </Text>

        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>
            Allow Camera
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  if (capturedImage) {
    return (
      <View style={styles.previewContainer}>
        <Image
          source={{ uri: capturedImage }}
          style={styles.previewImage}
        />

        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator
              size="large"
              color="#8B5CF6"
            />

            <Text style={styles.loadingText}>
              AI analyzing invoice...
            </Text>
          </View>
        )}

        {aiResult && (
          <ScrollView style={styles.aiContainer}>
            <Text style={styles.aiTitle}>
              AI Extraction
            </Text>

            <Text style={styles.aiText}>
              {JSON.stringify(
                aiResult,
                null,
                2
              )}
            </Text>
          </ScrollView>
        )}

        <TouchableOpacity
          style={styles.retakeButton}
          onPress={() => {
            setCapturedImage(null)
            setAiResult(null)
          }}
        >
          <Text style={styles.retakeText}>
            Retake
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={styles.overlay}>
        <View>
          <Text style={styles.scanTitle}>
            Scan Invoice
          </Text>

          <Text style={styles.scanSubtitle}>
            Align receipt within the frame
          </Text>
        </View>

        <View style={styles.scanFrame} />

        <TouchableOpacity
          style={styles.captureButton}
          onPress={takePicture}
        >
          <View style={styles.captureInner} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },

  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 90,
    paddingBottom: 60,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },

  scanTitle: {
    color: 'white',
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
  },

  scanSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },

  scanFrame: {
    width: '82%',
    height: 420,
    borderWidth: 2,
    borderColor: '#8B5CF6',
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },

  captureButton: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 5,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  captureInner: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: 'white',
  },

  permissionContainer: {
    flex: 1,
    backgroundColor: '#0B0F1A',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  permissionText: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
  },

  permissionButton: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 18,
  },

  permissionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  previewContainer: {
    flex: 1,
    backgroundColor: '#0B0F1A',
  },

  previewImage: {
    flex: 1,
  },

  retakeButton: {
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center',
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 20,
  },

  retakeText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  loadingOverlay: {
    position: 'absolute',
    top: '45%',
    alignSelf: 'center',
    alignItems: 'center',
  },

  loadingText: {
    color: 'white',
    marginTop: 16,
    fontSize: 16,
  },

  aiContainer: {
    position: 'absolute',
    bottom: 140,
    left: 20,
    right: 20,
    maxHeight: 240,
    backgroundColor: '#111827',
    borderRadius: 24,
    padding: 20,
  },

  aiTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14,
  },

  aiText: {
    color: '#D1D5DB',
    lineHeight: 22,
  },
})