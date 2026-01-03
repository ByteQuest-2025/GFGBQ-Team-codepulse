import { initializeApp } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore'
import { firebaseConfig } from './config'

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
if (import.meta.env.DEV) {
  auth.settings.appVerificationDisabledForTesting = true
}

if (import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true') {
  const emulatorUrl = import.meta.env.VITE_AUTH_EMULATOR_URL || 'http://127.0.0.1:9099'
  connectAuthEmulator(auth, emulatorUrl, { disableWarnings: true })
}

const db = getFirestore(app)

enableIndexedDbPersistence(db).catch(() => {
  // Ignore persistence errors (e.g., multiple tabs). Firestore will fallback to memory.
})

export { app, auth, db }
