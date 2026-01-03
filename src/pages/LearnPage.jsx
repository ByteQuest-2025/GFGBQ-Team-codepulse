import React from 'react';
import { useNavigate } from 'react-router-dom';
import FinancialLesson from '../components/education/FinancialLesson';
import BottomNav from '../components/common/BottomNav';

/**
 * Learn Page
 * Financial education content
 */
const LearnPage = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = React.useState('learn');
  const [selectedTopic, setSelectedTopic] = React.useState(null);

  const handleNavigation = (page) => {
    setActiveNav(page);
    if (page === 'home') {
      navigate('/');
    } else {
      navigate(`/${page}`);
    }
  };

  const topics = [
    {
      id: 1,
      title: 'What is Investing?',
      icon: '💰',
      difficulty: 'Beginner',
      duration: '3 min',
      completed: false
    },
    {
      id: 2,
      title: 'Safe vs Risky Investments',
      icon: '⚖️',
      difficulty: 'Beginner',
      duration: '4 min',
      completed: false
    },
    {
      id: 3,
      title: 'Understanding Interest',
      icon: '📊',
      difficulty: 'Beginner',
      duration: '3 min',
      completed: false
    },
    {
      id: 4,
      title: 'Power of Starting Small',
      icon: '🌱',
      difficulty: 'Beginner',
      duration: '5 min',
      completed: false
    },
    {
      id: 5,
      title: 'Tax Benefits Explained',
      icon: '🏛️',
      difficulty: 'Intermediate',
      duration: '6 min',
      completed: false
    }
  ];

  const sampleLesson = {
    title: 'What is Investing?',
    steps: [
      {
        icon: '💰',
        title: 'Money That Works For You',
        content: 'Investing means putting your money somewhere safe where it grows over time, instead of keeping it idle.',
        example: 'Like planting seeds that grow into trees, your ₹100 today can become ₹107 next year.'
      },
      {
        icon: '🏦',
        title: 'Different From Savings',
        content: 'Savings is keeping money safe. Investing is making your money grow by earning interest or returns.',
        example: 'In savings account: ₹1000 stays ₹1000. In investment: ₹1000 becomes ₹1070 in a year.'
      },
      {
        icon: '🛡️',
        title: 'Safe Options Exist',
        content: 'Not all investments are risky. Government schemes are 100% safe and perfect for beginners.',
        example: 'Post Office Savings, PPF, and Fixed Deposits are all government-backed and safe.'
      }
    ],
    quiz: {
      question: 'What is the main difference between saving and investing?',
      options: [
        'Savings is for emergencies, investing is for growth',
        'They are the same thing',
        'Investing is only for rich people',
        'Savings earn more money'
      ],
      correctAnswer: 0
    }
  };

  if (selectedTopic) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="p-4">
          <button
            onClick={() => setSelectedTopic(null)}
            className="mb-4 text-green-600 font-semibold"
          >
            ← Back to Topics
          </button>
          <FinancialLesson
            lesson={sampleLesson}
            onComplete={() => {
              alert('Lesson completed! 🎉');
              setSelectedTopic(null);
            }}
          />
        </div>
        <BottomNav active={activeNav} onNavigate={handleNavigation} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-green-600 text-white p-4">
        <h1 className="text-xl font-bold">Learn & Grow 📚</h1>
        <p className="text-sm opacity-90 mt-1">Simple lessons about money</p>
      </div>

      <div className="p-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-800 mb-2">💡 Why Learn?</h3>
          <p className="text-sm text-blue-700">
            The more you understand, the more confident you'll feel about investing your money safely.
          </p>
        </div>

        <h2 className="text-lg font-semibold mb-4">Popular Topics</h2>
        <div className="space-y-3">
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic)}
              className="w-full bg-white border border-gray-200 rounded-lg p-4 text-left hover:border-green-400 transition-all"
            >
              <div className="flex items-start">
                <span className="text-3xl mr-3">{topic.icon}</span>
                <div className="flex-1">
                  <h3 className="font-semibold">{topic.title}</h3>
                  <div className="flex items-center space-x-3 mt-2">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {topic.difficulty}
                    </span>
                    <span className="text-xs text-gray-500">⏱️ {topic.duration}</span>
                    {topic.completed && (
                      <span className="text-xs text-green-600">✓ Completed</span>
                    )}
                  </div>
                </div>
                <span className="text-gray-400">→</span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold mb-1">Your Progress</h3>
              <p className="text-sm opacity-90">0 of {topics.length} lessons completed</p>
            </div>
            <span className="text-4xl">🎯</span>
          </div>
          <div className="w-full bg-white bg-opacity-30 rounded-full h-2 mt-3">
            <div className="bg-white h-2 rounded-full" style={{ width: '0%' }}></div>
          </div>
        </div>
      </div>

      <BottomNav active={activeNav} onNavigate={handleNavigation} />
    </div>
  );
};

export default LearnPage;
