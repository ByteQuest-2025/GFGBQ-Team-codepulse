import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInvestment } from '../context/InvestmentContext';
import { useApp } from '../context/AppContext';
import InvestmentCard from '../components/investment/InvestmentCard';
import AmountSelector from '../components/investment/AmountSelector';
import InvestmentConfirmation from '../components/investment/InvestmentConfirmation';
import FinancialLesson from '../components/education/FinancialLesson';
import BottomNav from '../components/common/BottomNav';
import LoadingSpinner from '../components/common/LoadingSpinner';
import PageShell from '../components/common/PageShell';

/**
 * Investment Page
 * Browse and select investment options
 */
const InvestPage = () => {
  const navigate = useNavigate();
  const { investmentOptions, createInvestment, isLoading } = useInvestment();
  const { t } = useApp();
  const [step, setStep] = useState('browse'); // browse, lesson, amount, confirm
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [amount, setAmount] = useState(0);
  const [activeNav, setActiveNav] = useState('invest');
  const [processing, setProcessing] = useState(false);

  const handleNavigation = (page) => {
    setActiveNav(page);
    if (page === 'home') {
      navigate('/home');
    } else {
      navigate(`/${page}`);
    }
  };

  // Use investment options from context
  const investments = investmentOptions.length > 0 ? investmentOptions : [];

  const safeName = selectedInvestment?.name || t('invest.this_investment', 'this investment');
  const sampleLesson = {
    title: t('invest.lesson.title', 'Understanding Your Investment'),
    steps: [
      {
        icon: '🏦',
        title: t('invest.lesson.step1.title', 'What is this investment?'),
        content: t('invest.lesson.step1.content', '{name} is a government-backed savings scheme. Your money is 100% safe.', { name: safeName }),
        example: t('invest.lesson.step1.example', 'Think of it like keeping money in a safe locker, but it grows over time.')
      },
      {
        icon: '📈',
        title: t('invest.lesson.step2.title', 'How will you earn?'),
        content: t('invest.lesson.step2.content', 'You will earn {returns}% interest every year on your invested amount.', { returns: selectedInvestment?.returns ?? 0 }),
        example: t('invest.lesson.step2.example', 'If you invest ₹1000, after 1 year you will have ₹{amount}.', { amount: 1000 + (selectedInvestment?.returns || 0) * 10 })
      },
      {
        icon: '🔒',
        title: t('invest.lesson.step3.title', 'Lock-in Period'),
        content: t('invest.lesson.step3.content', 'Lock-in means you cannot take money out for {lockIn}. Plan accordingly.', { lockIn: selectedInvestment?.lockIn || t('invest.lock_in_duration', 'the lock-in period') }),
        example: t('invest.lesson.step3.example', 'Like a piggy bank you cannot open until a specific date.')
      }
    ],
    quiz: {
      question: t('invest.lesson.quiz.question', 'Is your money safe in {name}?', { name: safeName }),
      options: [
        t('invest.lesson.quiz.option1', 'Yes, 100% government guaranteed'),
        t('invest.lesson.quiz.option2', 'No, I might lose money'),
        t('invest.lesson.quiz.option3', 'Only if I invest more than ₹10,000'),
        t('invest.lesson.quiz.option4', 'I am not sure')
      ],
      correctAnswer: 0
    }
  };

  const handleInvestmentSelect = (investment) => {
    setSelectedInvestment(investment);
    setStep('lesson');
  };

  const handleLessonComplete = () => {
    setStep('amount');
  };

  const handleAmountSelect = (selectedAmount) => {
    setAmount(selectedAmount);
  };

  const handleConfirm = async () => {
    setProcessing(true);
    try {
      // Create investment
      await createInvestment({
        name: selectedInvestment.name,
        amount: amount,
        returns: selectedInvestment.returns,
        risk: selectedInvestment.risk,
        lockIn: selectedInvestment.lockIn
      });
      
      alert(t('invest.success', 'Investment successful! 🎉\nYou can track it in your portfolio.'));
      
      // Navigate to home to see the new investment
      navigate('/');
    } catch (error) {
      alert(t('invest.error', 'Failed to create investment. Please try again.'));
      console.error(error);
    } finally {
      setProcessing(false);
      setStep('browse');
      setSelectedInvestment(null);
      setAmount(0);
    }
  };

  const stepMeta = {
    browse: {
      title: t('invest.step.browse.title', 'Invest with confidence'),
      subtitle: t('invest.step.browse.subtitle', 'Safe, government-backed options curated for steady growth.')
    },
    lesson: {
      title: t('invest.step.lesson.title', 'Quick lesson'),
      subtitle: t('invest.step.lesson.subtitle', 'Understand this investment before you proceed.', { name: selectedInvestment?.name || t('invest.this_investment', 'this investment') })
    },
    amount: {
      title: t('invest.step.amount.title', 'Choose your amount'),
      subtitle: t('invest.step.amount.subtitle', 'Start small, stay flexible, and grow steadily.')
    },
    confirm: {
      title: t('invest.step.confirm.title', 'Review & confirm'),
      subtitle: t('invest.step.confirm.subtitle', 'Check the details and lock in your investment.')
    }
  };

  const renderContent = () => {
    switch (step) {
      case 'browse':
        return (
          <div className="space-y-4">
            <div className="rounded-2xl border border-emerald-100 bg-white/80 backdrop-blur-sm p-6 shadow-[0_10px_40px_rgba(12,53,43,0.08)]">
              <p className="text-sm font-semibold text-emerald-900">{t('invest.curated.title', 'Curated list')}</p>
              <p className="text-base text-emerald-900/75 mt-1">{t('invest.curated.subtitle', 'Government-backed, low-risk choices with transparent returns.')}</p>
            </div>
            <div className="grid gap-4">
              {investments.map(inv => (
                <InvestmentCard 
                  key={inv.id} 
                  investment={inv} 
                  onSelect={handleInvestmentSelect}
                />
              ))}
            </div>
          </div>
        );

      case 'lesson':
        return (
          <div className="space-y-4">
            <button
              onClick={() => setStep('browse')}
              className="text-sm font-semibold text-emerald-800 hover:text-emerald-900"
            >
              {t('invest.back.options', '← Back to options')}
            </button>
            <div className="rounded-2xl border border-emerald-100 bg-white/90 backdrop-blur-sm p-5 shadow-sm">
              <h2 className="text-xl font-semibold text-emerald-950 text-center">{t('invest.step.lesson.title', 'Quick lesson')}</h2>
              <p className="text-sm text-emerald-900/75 text-center mb-4">{t('invest.lesson.intro', 'Learn about {name} before investing.', { name: selectedInvestment?.name || t('invest.this_investment', 'this investment') })}</p>
              <FinancialLesson 
                lesson={sampleLesson} 
                onComplete={handleLessonComplete}
              />
              <button
                onClick={handleLessonComplete}
                className="w-full mt-4 py-3 rounded-full border border-emerald-200 bg-white text-emerald-900 font-semibold hover:border-emerald-300 transition-colors"
              >
                {t('lesson.skip', 'Skip lesson & continue')}
              </button>
            </div>
          </div>
        );

      case 'amount':
        return (
          <div className="space-y-4">
            <button
              onClick={() => setStep('lesson')}
              className="text-sm font-semibold text-emerald-800 hover:text-emerald-900"
            >
              {t('invest.back.lesson', '← Back to lesson')}
            </button>
            <div className="rounded-2xl border border-emerald-100 bg-white/90 backdrop-blur-sm p-5 shadow-sm space-y-5">
              <AmountSelector
                minAmount={selectedInvestment.minAmount}
                onAmountSelect={handleAmountSelect}
              />
              <button
                onClick={() => setStep('confirm')}
                disabled={amount < selectedInvestment.minAmount}
                className="w-full rounded-full bg-emerald-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 disabled:opacity-50 hover:bg-emerald-800 transition-colors"
              >
                {t('invest.continue', 'Continue to confirm')}
              </button>
            </div>
          </div>
        );

      case 'confirm':
        return (
          <div className="rounded-2xl border border-emerald-100 bg-white/90 backdrop-blur-sm p-5 shadow-sm">
            {processing ? (
              <LoadingSpinner message={t('invest.processing', 'Processing your investment...')} />
            ) : (
              <InvestmentConfirmation
                investment={selectedInvestment}
                amount={amount}
                onConfirm={handleConfirm}
                onCancel={() => setStep('amount')}
              />
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <PageShell
      title={stepMeta[step].title}
      subtitle={stepMeta[step].subtitle}
    >
      {renderContent()}
      <BottomNav active={activeNav} onNavigate={handleNavigation} />
    </PageShell>
  );
};

export default InvestPage;
