import { useCallback, useEffect, useState } from 'react'
import { doc, onSnapshot, runTransaction, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/app'

const formatTime = (timestamp) => {
  if (!timestamp?.toDate) return ''
  return new Intl.DateTimeFormat('en-IN', {
    hour: 'numeric',
    minute: 'numeric',
  }).format(timestamp.toDate())
}

export function usePassbook(user) {
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [lastUpdatedAt, setLastUpdatedAt] = useState('')

  useEffect(() => {
    if (!user) {
      setTotal(0)
      setLastUpdatedAt('')
      setLoading(false)
      return undefined
    }

    const ref = doc(db, 'passbooks', user.uid)
    setLoading(true)

    const unsub = onSnapshot(ref, (snapshot) => {
      setSyncing(snapshot.metadata.hasPendingWrites)
      const data = snapshot.data()
      setTotal(data?.total ?? 0)
      setLastUpdatedAt(formatTime(data?.updatedAt))
      setLoading(false)
    })

    return () => unsub()
  }, [user])

  const addInvestment = useCallback(
    async (amount = 10) => {
      if (!user) return
      setLoading(true)
      const ref = doc(db, 'passbooks', user.uid)
      try {
        await runTransaction(db, async (transaction) => {
          const snap = await transaction.get(ref)
          const current = snap.exists() ? snap.data()?.total || 0 : 0
          transaction.set(
            ref,
            {
              total: current + amount,
              currency: 'INR',
              updatedAt: serverTimestamp(),
            },
            { merge: true },
          )
        })
      } finally {
        setLoading(false)
      }
    },
    [user],
  )

  return {
    total,
    loading,
    addInvestment,
    lastUpdated: lastUpdatedAt,
    syncing,
  }
}
