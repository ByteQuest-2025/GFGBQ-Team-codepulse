import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInvestment } from '../context/InvestmentContext';
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

  const sampleLesson = {
    title: 'Understanding Your Investment',
    steps: [
      {
        icon: '🏦',
        title: 'What is this investment?',
        content: `${selectedInvestment?.name} is a government-backed savings scheme. Your money is 100% safe.`,
        example: 'Think of it like keeping money in a safe locker, but it grows over time.'
      },
      {
        icon: '📈',
        title: 'How will you earn?',
        content: `You will earn ${selectedInvestment?.returns}% interest every year on your invested amount.`,
        example: 'If you invest ₹1000, after 1 year you will have ₹1000 + ₹' + (selectedInvestment?.returns * 10) + ' = ₹' + (1000 + selectedInvestment?.returns * 10)
      },
      {
        icon: '🔒',
        title: 'Lock-in Period',
        content: `Lock-in means you cannot take money out for ${selectedInvestment?.lockIn}. Plan accordingly.`,
        example: 'Like a piggy bank you cannot open until a specific date.'
      }
    ],
    quiz: {
      question: `Is your money safe in ${selectedInvestment?.name}?`,
      options: [
        'Yes, 100% government guaranteed',
        'No, I might lose money',
        'Only if I invest more than ₹10,000',
        'I am not sure'
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
      
      alert('Investment successful! 🎉\nYou can track it in your portfolio.');
      
      // Navigate to home to see the new investment
      navigate('/');
    } catch (error) {
      alert('Failed to create investment. Please try again.');
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
      title: 'Invest with confidence',
      subtitle: 'Safe, government-backed options curated for steady growth.'
    },
    lesson: {
      title: 'Quick lesson',
      subtitle: `Understand ${selectedInvestment?.name || 'this investment'} before you proceed.`
    },
    amount: {
      title: 'Choose your amount',
      subtitle: 'Start small, stay flexible, and grow steadily.'
    },
    confirm: {
      title: 'Review & confirm',
      subtitle: 'Check the details and lock in your investment.'
    }
  };

  const renderContent = () => {
    switch (step) {
      case 'browse':
        return (
          <div className="space-y-4">
            <div className="rounded-2xl border border-emerald-100 bg-white/80 backdrop-blur-sm p-6 shadow-[0_10px_40px_rgba(12,53,43,0.08)]">
              <p className="text-sm font-semibold text-emerald-900">Curated list</p>
              <p className="text-base text-emerald-900/75 mt-1">Government-backed, low-risk choices with transparent returns.</p>
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
              ← Back to options
            </button>
            <div className="rounded-2xl border border-emerald-100 bg-white/90 backdrop-blur-sm p-5 shadow-sm">
              <h2 className="text-xl font-semibold text-emerald-950 text-center">Quick lesson</h2>
              <p className="text-sm text-emerald-900/75 text-center mb-4">Learn about {selectedInvestment?.name} before investing.</p>
              <FinancialLesson 
                lesson={sampleLesson} 
                onComplete={handleLessonComplete}
              />
              <button
                onClick={handleLessonComplete}
                className="w-full mt-4 py-3 rounded-full border border-emerald-200 bg-white text-emerald-900 font-semibold hover:border-emerald-300 transition-colors"
              >
                Skip lesson & continue
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
              ← Back to lesson
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
                Continue to confirm
              </button>
            </div>
          </div>
        );

      case 'confirm':
        return (
          <div className="rounded-2xl border border-emerald-100 bg-white/90 backdrop-blur-sm p-5 shadow-sm">
            {processing ? (
              <LoadingSpinner message="Processing your investment..." />
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
