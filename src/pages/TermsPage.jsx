import React from 'react';
import PageShell from '../components/common/PageShell';
import { useApp } from '../context/AppContext';

const copy = {
  en: {
    title: 'Terms & Privacy',
    subtitle: 'How we collect, use, and protect your information.',
    updated: 'Last updated: Jan 2026',
    sections: [
      {
        heading: '1. What we collect',
        body: 'Profile (name, phone), KYC-ready identifiers, device metadata, and your investment and transaction activity.',
        bullets: [
          'Portfolio data: holdings, returns, withdrawals, statements',
          'Support interactions: chats/emails for resolving issues',
          'Diagnostics: crash and performance logs to keep the app reliable'
        ]
      },
      {
        heading: '2. Why we use it',
        body: 'To run your account, calculate returns, prevent fraud, and keep you informed about your portfolio.',
        bullets: [
          'Show accurate balances, passbook, and payout summaries',
          'Send OTPs, receipts, alerts about money movement',
          'Improve lessons and recommendations based on anonymized trends'
        ]
      },
      {
        heading: '3. Storage & retention',
        body: 'Data is stored with encrypted transport. We keep records only as long as needed for legal, audit, or support purposes.',
        bullets: [
          'Transaction and ledger history: retained per regulation',
          'Session tokens: short-lived and revocable via logout',
          'You can request deletion of non-regulatory data by emailing support'
        ]
      },
      {
        heading: '4. Sharing',
        body: 'We never sell your data. We share only with trusted providers who help run core services.',
        bullets: [
          'Payments and banking partners to process deposits/withdrawals',
          'Cloud hosting and analytics to keep the app fast and stable',
          'Compliance and security vendors to detect risk and abuse'
        ]
      },
      {
        heading: '5. Security',
        body: 'We apply least-privilege access, encryption in transit, and monitoring to prevent misuse.',
        bullets: [
          'Protect your device and OTPs; never share verification codes',
          'Log out on shared devices to clear tokens',
          'Report suspicious activity immediately so we can investigate'
        ]
      },
      {
        heading: '6. Your choices & controls',
        body: 'You can manage notifications, language, and account access from your profile.',
        bullets: [
          'Change language: Profile → Language',
          'Download/export statements from Passbook',
          'Request data access or deletion (where allowed) via support'
        ]
      },
      {
        heading: '7. Consent & communications',
        body: 'By using the app you consent to these terms. We may send transactional messages for security and service updates.',
        bullets: [
          'Essential alerts (OTP, withdrawal, login) cannot be opted out',
          'You can opt out of non-essential tips by ignoring or muting them in settings',
          'We will update this page when policies change'
        ]
      },
      {
        heading: '8. Contact & grievances',
        body: 'Need help or want to raise a concern? Reach out any time.',
        bullets: [
          'Email: support@niveshsaral.app',
          'Include your registered phone and a brief description',
          'We aim to acknowledge within 48 hours'
        ]
      }
    ]
  },
  hi: {
    title: 'नियम व गोपनीयता',
    subtitle: 'आपका डाटा कैसे लेते हैं, उपयोग करते हैं और सुरक्षित रखते हैं।',
    updated: 'अंतिम अपडेट: जनवरी 2026',
    sections: [
      {
        heading: '1. क्या जानकारी लेते हैं',
        body: 'प्रोफ़ाइल (नाम, फोन), KYC-ready पहचान, डिवाइस मेटाडेटा, और आपके निवेश/लेनदेन का रिकॉर्ड।',
        bullets: [
          'पोर्टफोलियो डेटा: होल्डिंग्स, रिटर्न्स, विदड्रॉल, स्टेटमेंट्स',
          'सपोर्ट बातचीत: चैट/ईमेल ताकि समस्या सुलझ सके',
          'डायग्नोस्टिक्स: क्रैश और परफ़ॉर्मेंस लॉग ताकि ऐप स्थिर रहे'
        ]
      },
      {
        heading: '2. क्यों उपयोग करते हैं',
        body: 'आपका अकाउंट चलाने, रिटर्न निकालने, फ्रॉड रोकने और पोर्टफोलियो अपडेट देने के लिए।',
        bullets: [
          'सही बैलेंस, पासबुक और पेआउट सारांश दिखाने के लिए',
          'OTP, रसीद, और पैसों की गतिविधि के अलर्ट भेजने के लिए',
          'पाठ और सुझाव बेहतर करने के लिए (अनाम रुझान से)'
        ]
      },
      {
        heading: '3. स्टोरेज और अवधि',
        body: 'डाटा एन्क्रिप्टेड ट्रांजिट के साथ रखा जाता है। कानून या सपोर्ट की जरूरत जितनी हो उतनी देर रखा जाता है।',
        bullets: [
          'लेनदेन हिस्ट्री: नियामक नियमों के अनुसार सुरक्षित',
          'सेशन टोकन: कम अवधि के, लॉगआउट से हट सकते हैं',
          'नियामक के बाहर का डाटा हटाने का अनुरोध ईमेल से कर सकते हैं'
        ]
      },
      {
        heading: '4. साझाकरण',
        body: 'हम आपका डाटा बेचते नहीं हैं। सिर्फ विश्वसनीय पार्टनर्स से साझा करते हैं जो मुख्य सेवाएं चलाने में मदद करते हैं।',
        bullets: [
          'पेमेंट/बैंकिंग पार्टनर: जमा और विदड्रॉल संसाधित करने के लिए',
          'क्लाउड होस्टिंग और एनालिटिक्स: ऐप तेज और स्थिर रखने के लिए',
          'कंप्लायंस और सिक्योरिटी वेंडर: जोखिम और दुरुपयोग रोकने के लिए'
        ]
      },
      {
        heading: '5. सुरक्षा',
        body: 'लीस्ट-प्रिविलेज एक्सेस, ट्रांजिट एन्क्रिप्शन, और मॉनिटरिंग लागू हैं ताकि दुरुपयोग न हो।',
        bullets: [
          'अपना डिवाइस और OTP सुरक्षित रखें; कोड कभी साझा न करें',
          'शेयर्ड डिवाइस पर काम खत्म होने पर लॉगआउट करें',
          'कोई संदिग्ध गतिविधि दिखे तो तुरंत सूचित करें'
        ]
      },
      {
        heading: '6. आपके विकल्प',
        body: 'आप प्रोफ़ाइल से नोटिफिकेशन, भाषा, और एक्सेस नियंत्रित कर सकते हैं।',
        bullets: [
          'भाषा बदलें: प्रोफ़ाइल → भाषा',
          'पासबुक से स्टेटमेंट डाउनलोड/एक्सपोर्ट करें',
          'अनुमति अनुसार डाटा एक्सेस या डिलीट का अनुरोध सपोर्ट को भेजें'
        ]
      },
      {
        heading: '7. सहमति और संदेश',
        body: 'ऐप का उपयोग करने पर आप इन नियमों से सहमत होते हैं। हम सुरक्षा और सेवा अपडेट के लिए संदेश भेज सकते हैं।',
        bullets: [
          'जरूरी अलर्ट (OTP, विदड्रॉल, लॉगिन) से बाहर नहीं निकला जा सकता',
          'ग़ैर-जरूरी टिप्स को अनदेखा/म्यूट कर सकते हैं',
          'नीतियों में बदलाव होगा तो यही पेज अपडेट होगा'
        ]
      },
      {
        heading: '8. संपर्क व शिकायत',
        body: 'मदद चाहिए या शिकायत दर्ज करनी है? हमसे बात करें।',
        bullets: [
          'ईमेल: support@niveshsaral.app',
          'अपना रजिस्टर्ड फोन और संक्षिप्त विवरण लिखें',
          'हम 48 घंटे में जवाब देने का लक्ष्य रखते हैं'
        ]
      }
    ]
  }
};

const TermsPage = () => {
  const { language } = useApp();
  const text = copy[language] || copy.en;

  return (
    <PageShell title={text.title} subtitle={text.subtitle}>
      <div className="space-y-5 text-sm text-emerald-900/90 bg-white rounded-xl border border-emerald-100 p-5 shadow-sm">
        <div className="text-xs font-medium text-emerald-600">{text.updated}</div>
        {text.sections.map((section) => (
          <section key={section.heading} className="space-y-2">
            <h3 className="font-semibold text-emerald-950">{section.heading}</h3>
            <p>{section.body}</p>
            <ul className="list-disc pl-4 space-y-1 text-emerald-900/80">
              {section.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </PageShell>
  );
};

export default TermsPage;
