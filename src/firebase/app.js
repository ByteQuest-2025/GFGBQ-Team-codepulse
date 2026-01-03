import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore'
import { firebaseConfig } from './config'

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
if (import.meta.env.DEV) {
  auth.settings.appVerificationDisabledForTesting = true
}

const db = getFirestore(app)

enableIndexedDbPersistence(db).catch(() => {
  // Ignore persistence errors (e.g., multiple tabs). Firestore will fallback to memory.
})

export { app, auth, db }
