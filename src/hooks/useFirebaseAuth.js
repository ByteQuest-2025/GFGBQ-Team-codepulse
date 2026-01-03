import { useEffect, useState } from 'react'
import { auth } from '../firebase/app'
import { onAuthStateChanged } from 'firebase/auth'

export function useAuthUser(language = 'en') {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    auth.languageCode = language === 'hi' ? 'hi' : 'en'
  }, [language])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return { user, loading }
}
