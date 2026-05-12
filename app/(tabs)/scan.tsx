import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import {
  CameraView,
  useCameraPermissions,
} from 'expo-camera'

export default function ScanScreen() {
  const [permission, requestPermission] =
    useCameraPermissions()

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

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
      />

      <View style={styles.overlay}>
        <Text style={styles.scanTitle}>
          Scan Invoice
        </Text>

        <Text style={styles.scanSubtitle}>
          Align receipt within the frame
        </Text>

        <View style={styles.scanFrame} />

        <TouchableOpacity style={styles.captureButton}>
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
  },

  scanSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    marginTop: 10,
    fontSize: 16,
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
})