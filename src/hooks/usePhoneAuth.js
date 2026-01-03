import { useCallback, useRef, useState } from 'react'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { auth } from '../firebase/app'

const formatIndianMobile = (raw) => {
  if (!raw) return ''
  const digits = raw.replace(/\D/g, '')
  if (digits.length < 10) return ''
  const trimmed = digits.slice(-10)
  return `+91${trimmed}`
}

export function usePhoneAuth(language = 'en') {
  const [confirmationResult, setConfirmationResult] = useState(null)
  const [sending, setSending] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const recaptchaRef = useRef(null)

  const getRecaptcha = useCallback(() => {
    if (!recaptchaRef.current) {
      recaptchaRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {},
      })
    }
    return recaptchaRef.current
  }, [])

  const sendOtp = useCallback(
    async (phone) => {
      setError('')
      setMessage('')
      const normalized = formatIndianMobile(phone)
      if (!normalized) {
        setError(language === 'hi' ? 'कृपया 10 अंकों का सही नंबर दर्ज करें' : 'Enter a valid 10-digit mobile number')
        return
      }

      try {
        setSending(true)
        const verifier = getRecaptcha()
        const result = await signInWithPhoneNumber(auth, normalized, verifier)
        setConfirmationResult(result)
        setMessage(language === 'hi' ? 'ओटीपी भेजा गया है। एसएमएस देखें।' : 'OTP sent. Please check your SMS.')
      } catch (err) {
        setError(err?.message || 'Failed to send OTP')
      } finally {
        setSending(false)
      }
    },
    [getRecaptcha, language],
  )

  const verifyOtp = useCallback(
    async (code) => {
      setError('')
      setMessage('')
      if (!confirmationResult) {
        setError(language === 'hi' ? 'पहले ओटीपी प्राप्त करें' : 'Request OTP first')
        return
      }
      if (!code || code.trim().length < 6) {
        setError(language === 'hi' ? 'सही ओटीपी दर्ज करें' : 'Enter the 6-digit OTP')
        return
      }

      try {
        setVerifying(true)
        await confirmationResult.confirm(code.trim())
        setMessage(language === 'hi' ? 'सत्यापन सफल' : 'Verified successfully')
      } catch (err) {
        setError(err?.message || 'OTP verification failed')
      } finally {
        setVerifying(false)
      }
    },
    [confirmationResult, language],
  )

  return {
    sendOtp,
    verifyOtp,
    confirmationReady: Boolean(confirmationResult),
    sending,
    verifying,
    error,
    message,
  }
}
