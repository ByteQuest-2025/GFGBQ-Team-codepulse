# NiveshSaral (Vite + React + Firebase)

Micro-investment PWA for rural India. Key goals:
- Invest from ₹10 with a trust-first, bilingual (Hindi/English) UI.
- Phone OTP auth via Firebase; Firestore-backed digital passbook with offline persistence.
- Ultra-light bundle tuned for 2G/3G and low-end Android devices.

## Quick start
1) Copy `.env.example` to `.env` and add Firebase web config.
2) Install deps: `npm install`
3) Run dev server: `npm run dev`
4) Build PWA: `npm run build`

## Notes
- PWA enabled via `vite-plugin-pwa` with auto-updates.
- Firestore offline persistence is turned on; passbook is real-time and resilient to flaky networks.
- OTP in dev is set to skip SMS (Firebase appVerificationDisabledForTesting). Disable this in production.
