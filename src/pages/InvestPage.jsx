import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInvestment } from '../context/InvestmentContext';
import InvestmentCard from '../components/investment/InvestmentCard';
import AmountSelector from '../components/investment/AmountSelector';
import InvestmentConfirmation from '../components/investment/InvestmentConfirmation';
import FinancialLesson from '../components/education/FinancialLesson';
import BottomNav from '../components/common/BottomNav';
import LoadingSpinner from '../components/common/LoadingSpinner';

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
      navigate('/');
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

  const renderContent = () => {
    switch (step) {
      case 'browse':
        return (
          <div>
            <div className="bg-green-600 text-white p-4 mb-4">
              <h1 className="text-xl font-bold">Safe Investment Options</h1>
              <p className="text-sm opacity-90 mt-1">All options are government-backed</p>
            </div>
            <div className="p-4 space-y-4">
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
          <div className="p-4 min-h-screen flex flex-col">
            <button
              onClick={() => setStep('browse')}
              className="mb-4 text-green-600 font-semibold flex items-center"
            >
              ← Back to Options
            </button>
            <div className="flex-1 flex items-center">
              <div className="w-full">
                <h2 className="text-2xl font-bold mb-2 text-center">Quick Lesson</h2>
                <p className="text-sm text-gray-600 text-center mb-6">
                  Learn about {selectedInvestment?.name} before investing
                </p>
                <FinancialLesson 
                  lesson={sampleLesson} 
                  onComplete={handleLessonComplete}
                />
                <button
                  onClick={handleLessonComplete}
                  className="w-full mt-4 py-3 border-2 border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-all"
                >
                  Skip Lesson & Continue
                </button>
              </div>
            </div>
          </div>
        );

      case 'amount':
        return (
          <div className="p-4 min-h-screen flex flex-col">
            <button
              onClick={() => setStep('lesson')}
              className="mb-4 text-green-600 font-semibold flex items-center"
            >
              ← Back to Lesson
            </button>
            <div className="flex-1 flex items-center">
              <div className="w-full">
                <AmountSelector
                  minAmount={selectedInvestment.minAmount}
                  onAmountSelect={handleAmountSelect}
                />
                <button
                  onClick={() => setStep('confirm')}
                  disabled={amount < selectedInvestment.minAmount}
                  className="w-full mt-6 py-3 bg-green-600 text-white rounded-lg font-semibold disabled:opacity-50 hover:bg-green-700 transition-all"
                >
                  Continue to Confirm
                </button>
              </div>
            </div>
          </div>
        );

      case 'confirm':
        return (
          <div className="p-4 min-h-screen flex items-center">
            <div className="w-full">
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
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {renderContent()}
      <BottomNav active={activeNav} onNavigate={handleNavigation} />
    </div>
  );
};

export default InvestPage;
