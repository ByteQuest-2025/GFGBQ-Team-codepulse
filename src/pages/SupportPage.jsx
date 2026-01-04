import React from 'react';
import PageShell from '../components/common/PageShell';
import { useApp } from '../context/AppContext';

const copy = {
  en: {
    title: 'Help & Support',
    subtitle: 'Find answers fast or reach us directly for anything urgent.',
    updated: 'Last updated: Jan 2026',
    sections: [
      {
        heading: 'Quick self-checks',
        body: 'Before you reach out, these usually solve most issues.',
        bullets: [
          'Ensure you have internet access and the latest app build',
          'Re-login if you recently changed your number or device',
          'Check Passbook for posted deposits/withdrawals and status'
        ]
      },
      {
        heading: 'How to reach us',
        body: 'Share your registered phone, brief issue, and any screenshot.',
        bullets: [
          'Email: jawanjalaj@rknec.edu / dubeyak@rknec.edu / tiwariar@rknec.edu / pathanab@rknec.edu',
          'Call/WhatsApp: 8010474558 (9:30 AM – 7:30 PM IST)',
          'For money movement, include amount, date, and reference ID'
        ]
      },
      {
        heading: 'What we can help with',
        body: 'We respond faster when you pick the closest category.',
        bullets: [
          'Account access: login, OTP, profile, language',
          'Payments: deposit/withdraw status, receipts, reversals',
          'Portfolio: returns mismatch, passbook export, statements',
          'Learning: lesson access, quiz progress, streaks'
        ]
      },
      {
        heading: 'Response times',
        body: 'We aim to acknowledge most requests within 24-48 hours.',
        bullets: [
          'Urgent money-movement issues are prioritized',
          'Outside business hours we still log your request',
          'You will hear from us on the same email/number you shared'
        ]
      }
    ]
  },
  hi: {
    title: 'मदद और सपोर्ट',
    subtitle: 'जल्दी समाधान पाएँ या सीधे हमसे बात करें।',
    updated: 'अंतिम अपडेट: जनवरी 2026',
    sections: [
      {
        heading: 'जल्दी चेकलिस्ट',
        body: 'इन कदमों से ज़्यादातर समस्याएँ तुरंत सुलझ जाती हैं।',
        bullets: [
          'इंटरनेट कनेक्शन और ऐप का नवीनतम वर्शन देखें',
          'नया फ़ोन या नंबर होने पर लॉगआउट करके दोबारा लॉगिन करें',
          'पासबुक में जमा/विदड्रॉल की स्थिति देख लें'
        ]
      },
      {
        heading: 'हमसे कैसे जुड़ें',
        body: 'अपना रजिस्टर्ड फोन, समस्या का सार, और स्क्रीनशॉट भेजें।',
        bullets: [
          'ईमेल: jawanjalaj@rknec.edu / dubeyak@rknec.edu / tiwariar@rknec.edu / pathanab@rknec.edu',
          'कॉल/व्हाट्सऐप: 8010474558 (9:30 AM – 7:30 PM IST)',
          'पैसे से जुड़ी समस्या हो तो राशि, तारीख, और रेफ़रेंस ID लिखें'
        ]
      },
      {
        heading: 'हम क्या सुलझाते हैं',
        body: 'सही श्रेणी चुनने पर हम तेज़ी से जवाब देते हैं।',
        bullets: [
          'अकाउंट: लॉगिन, OTP, प्रोफ़ाइल, भाषा',
          'पेमेंट: जमा/विदड्रॉल स्टेटस, रसीद, रिवर्सल',
          'पोर्टफोलियो: रिटर्न मिसमैच, पासबुक एक्सपोर्ट, स्टेटमेंट',
          'लर्निंग: लेसन एक्सेस, क्विज़ प्रोग्रेस, स्ट्रीक'
        ]
      },
      {
        heading: 'जवाब का समय',
        body: 'अधिकतर अनुरोधों पर 24-48 घंटे में प्रतिक्रिया का लक्ष्य।',
        bullets: [
          'पैसों से जुड़ी तात्कालिक समस्याओं को प्राथमिकता देते हैं',
          'कार्य समय के बाहर भी आपका अनुरोध दर्ज हो जाता है',
          'हम उसी ईमेल/नंबर पर उत्तर देंगे जो आपने साझा किया'
        ]
      }
    ]
  }
};

const SupportPage = () => {
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

export default SupportPage;
