import { useMemo, useState } from 'react'
import { useAuthUser } from './hooks/useFirebaseAuth'
import { usePhoneAuth } from './hooks/usePhoneAuth'
import { usePassbook } from './hooks/usePassbook'

const copy = {
  en: {
    welcome: 'Welcome to NiveshSaral',
    sub: 'Start saving with just ₹10. Simple, transparent, and always in your language.',
    phoneLabel: 'Enter mobile number',
    otpLabel: 'Enter OTP',
    sendOtp: 'Send OTP',
    verify: 'Verify & Continue',
    invest: 'Invest ₹10',
    balance: 'Total Savings',
    trust1: 'Safe options: Gold / Liquid Funds',
    trust2: 'Phone OTP only. No passwords.',
    trust3: 'Digital Passbook with offline sync',
    saving: 'Adding ₹10...',
    ctaHelper: 'Small steps today, secure future tomorrow.',
    loggedIn: 'You are signed in',
    loginFirst: 'Sign in to invest',
    otpSent: 'OTP sent. Please check your SMS.',
  },
  hi: {
    welcome: 'निवेशसरल में आपका स्वागत है',
    sub: 'सिर्फ ₹10 से बचत शुरू करें। सरल, पारदर्शी और अपनी भाषा में।',
    phoneLabel: 'मोबाइल नंबर दर्ज करें',
    otpLabel: 'ओटीपी दर्ज करें',
    sendOtp: 'ओटीपी भेजें',
    verify: 'ओटीपी सत्यापित करें',
    invest: '₹10 निवेश करें',
    balance: 'कुल बचत',
    trust1: 'सुरक्षित विकल्प: सोना / लिक्विड फंड्स',
    trust2: 'सिर्फ फोन ओटीपी। पासवर्ड नहीं।',
    trust3: 'डिजिटल पासबुक, ऑफ़लाइन सिंक',
    saving: '₹10 जोड़ रहे हैं...',
    ctaHelper: 'छोटे कदम आज, सुरक्षित कल।',
    loggedIn: 'आप लॉग-इन हैं',
    loginFirst: 'निवेश करने के लिए लॉग-इन करें',
    otpSent: 'ओटीपी भेजा गया है। एसएमएस देखें।',
  },
}

function App() {
  const [language, setLanguage] = useState('hi')
  const text = useMemo(() => copy[language], [language])
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')

  const { user, loading: authLoading } = useAuthUser(language)
  const {
    sendOtp,
    verifyOtp,
    confirmationReady,
    sending,
    verifying,
    error,
    message,
  } = usePhoneAuth(language)
  const {
    total,
    loading: passbookLoading,
    addInvestment,
    lastUpdated,
    syncing,
  } = usePassbook(user)

  const handleSendOtp = async (e) => {
    e.preventDefault()
    await sendOtp(phone)
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    await verifyOtp(otp)
  }

  const handleInvest = async () => {
    await addInvestment(10)
  }

  return (
    <div className="min-h-screen px-4 py-8 sm:py-12 flex justify-center">
      <div className="w-full max-w-5xl space-y-6">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-primaryAccent font-semibold uppercase tracking-wide">NiveshSaral</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-ink font-display leading-tight">
              {text.welcome}
            </h1>
            <p className="text-lg text-primary/80 max-w-2xl">{text.sub}</p>
          </div>
          <LanguageSwitch language={language} onChange={setLanguage} />
        </header>

        <main className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
          <section className="glass-card p-6 sm:p-8 flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3 text-sm text-primaryAccent font-medium">
              <Badge>{text.trust1}</Badge>
              <Badge>{text.trust2}</Badge>
              <Badge>{text.trust3}</Badge>
            </div>

            <div className="space-y-3">
              <p className="text-xl font-semibold text-ink">
                {user ? text.loggedIn : text.loginFirst}
              </p>
              <p className="text-primary/80">{text.ctaHelper}</p>
            </div>

            <form className="space-y-4" onSubmit={confirmationReady ? handleVerifyOtp : handleSendOtp}>
              <label className="block text-sm font-semibold text-ink">
                {text.phoneLabel}
                <input
                  type="tel"
                  inputMode="tel"
                  pattern="[0-9]*"
                  placeholder="10-digit mobile"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-primary/15 bg-white px-4 py-3 text-lg focus:ring-2 focus:ring-sunshine focus:outline-none focus:border-transparent shadow-sm"
                  disabled={sending || confirmationReady}
                  required
                  aria-label={text.phoneLabel}
                />
              </label>

              {confirmationReady && (
                <label className="block text-sm font-semibold text-ink">
                  {text.otpLabel}
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-primary/15 bg-white px-4 py-3 text-lg focus:ring-2 focus:ring-sunshine focus:outline-none focus:border-transparent shadow-sm"
                    disabled={verifying}
                    required
                    aria-label={text.otpLabel}
                  />
                </label>
              )}

              <div className="space-y-2 text-sm text-primary/80">
                {message && <p className="font-semibold text-primaryAccent">{message}</p>}
                {error && <p className="text-red-700">{error}</p>}
              </div>

              <button
                type="submit"
                className="focus-ring w-full rounded-xl bg-primary text-white font-semibold py-3.5 text-lg shadow-md hover:bg-primaryAccent transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={sending || verifying || authLoading}
              >
                {confirmationReady ? (verifying ? '...' : text.verify) : sending ? '...' : text.sendOtp}
              </button>
            </form>

            <div className="text-xs text-primary/70">
              <p>We never share your number. OTP powered by Firebase, protected with invisible reCAPTCHA.</p>
            </div>
          </section>

          <section className="glass-card p-6 sm:p-7 flex flex-col gap-5 justify-between">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-primaryAccent uppercase tracking-wide">{text.balance}</p>
                <BalanceDisplay amount={total} loading={passbookLoading} />
              </div>
              <div className="text-right text-xs text-primary/70">
                {syncing ? 'Syncing…' : lastUpdated ? `Updated ${lastUpdated}` : 'Ready offline'}
              </div>
            </div>

            <button
              type="button"
              onClick={handleInvest}
              className="focus-ring w-full rounded-xl bg-sunshine text-ink font-bold py-4 text-lg shadow-md hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={!user || passbookLoading}
            >
              {passbookLoading ? text.saving : text.invest}
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-primary/90">
              <TrustRow title="Instant receipt" desc="Every ₹10 is recorded in your passbook within seconds." />
              <TrustRow title="Withdraw anytime" desc="Funds stay liquid; see balance live." />
              <TrustRow title="Offline ready" desc="Works on 2G/3G. Data syncs when back online." />
              <TrustRow title="Local language" desc="Switch between हिंदी / English anytime." />
            </div>
          </section>
        </main>
      </div>

      <div id="recaptcha-container" className="hidden" aria-hidden="true"></div>
    </div>
  )
}

function LanguageSwitch({ language, onChange }) {
  return (
    <div className="glass-card flex items-center gap-2 p-2 shadow-card">
      <button
        type="button"
        onClick={() => onChange('hi')}
        className={`focus-ring rounded-lg px-3 py-2 text-sm font-semibold ${
          language === 'hi' ? 'bg-primary text-white' : 'bg-white text-primary'
        }`}
      >
        हिंदी
      </button>
      <button
        type="button"
        onClick={() => onChange('en')}
        className={`focus-ring rounded-lg px-3 py-2 text-sm font-semibold ${
          language === 'en' ? 'bg-primary text-white' : 'bg-white text-primary'
        }`}
      >
        English
      </button>
    </div>
  )
}

function Badge({ children }) {
  return (
    <span className="rounded-full bg-white text-primary text-xs font-semibold px-3 py-2 border border-primary/10 shadow-sm">
      {children}
    </span>
  )
}

function BalanceDisplay({ amount, loading }) {
  if (loading) {
    return <p className="text-3xl font-bold text-ink">₹ …</p>
  }
  const formatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount || 0)

  return <p className="text-4xl sm:text-5xl font-bold text-ink">{formatted}</p>
}

function TrustRow({ title, desc }) {
  return (
    <div className="rounded-lg border border-primary/10 bg-white/70 p-3 shadow-sm">
      <p className="font-semibold text-ink">{title}</p>
      <p className="text-primary/80">{desc}</p>
    </div>
  )
}

export default App
