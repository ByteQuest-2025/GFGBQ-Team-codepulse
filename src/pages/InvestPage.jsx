import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InvestmentCard from '../components/investment/InvestmentCard';
import AmountSelector from '../components/investment/AmountSelector';
import InvestmentConfirmation from '../components/investment/InvestmentConfirmation';
import FinancialLesson from '../components/education/FinancialLesson';
import BottomNav from '../components/common/BottomNav';

/**
 * Investment Page
 * Browse and select investment options
 */
const InvestPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('browse'); // browse, lesson, amount, confirm
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [amount, setAmount] = useState(0);
  const [activeNav, setActiveNav] = useState('invest');

  const handleNavigation = (page) => {
    setActiveNav(page);
    if (page === 'home') {
      navigate('/');
    } else {
      navigate(`/${page}`);
    }
  };

  // Safe, low-risk investment options
  const investments = [
    {
      id: 1,
      name: 'Post Office Savings',
      description: 'Government backed, very safe. Withdraw anytime.',
      returns: 4.0,
      risk: 'very-low',
      minAmount: 10,
      lockIn: 'None'
    },
    {
      id: 2,
      name: 'Public Provident Fund (PPF)',
      description: 'Long-term savings with tax benefits. Very safe.',
      returns: 7.1,
      risk: 'very-low',
      minAmount: 500,
      lockIn: '15 years'
    },
    {
      id: 3,
      name: 'Sukanya Samriddhi Yojana',
      description: 'For girl child education and marriage. Government scheme.',
      returns: 8.2,
      risk: 'very-low',
      minAmount: 250,
      lockIn: '21 years'
    },
    {
      id: 4,
      name: 'Fixed Deposit (Bank)',
      description: 'Guaranteed returns. Money locked for fixed period.',
      returns: 6.5,
      risk: 'low',
      minAmount: 1000,
      lockIn: '1-5 years'
    }
  ];

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

  const handleConfirm = () => {
    // Process investment
    alert('Investment successful! 🎉');
    setStep('browse');
    setSelectedInvestment(null);
    setAmount(0);
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
          <div className="p-4 min-h-screen flex items-center">
            <div className="w-full">
              <h2 className="text-2xl font-bold mb-6 text-center">Quick Lesson</h2>
              <FinancialLesson 
                lesson={sampleLesson} 
                onComplete={handleLessonComplete}
              />
            </div>
          </div>
        );

      case 'amount':
        return (
          <div className="p-4 min-h-screen flex items-center">
            <div className="w-full">
              <AmountSelector
                minAmount={selectedInvestment.minAmount}
                onAmountSelect={handleAmountSelect}
              />
              <button
                onClick={() => setStep('confirm')}
                disabled={amount < selectedInvestment.minAmount}
                className="w-full mt-6 py-3 bg-green-600 text-white rounded-lg font-semibold disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          </div>
        );

      case 'confirm':
        return (
          <div className="p-4 min-h-screen flex items-center">
            <div className="w-full">
              <InvestmentConfirmation
                investment={selectedInvestment}
                amount={amount}
                onConfirm={handleConfirm}
                onCancel={() => setStep('amount')}
              />
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
