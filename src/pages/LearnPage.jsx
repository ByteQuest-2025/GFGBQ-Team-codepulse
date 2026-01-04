import React from 'react';
import { useNavigate } from 'react-router-dom';
import FinancialLesson from '../components/education/FinancialLesson';
import BottomNav from '../components/common/BottomNav';
import { useEducation } from '../context/EducationContext';
import PageShell from '../components/common/PageShell';

const LearnPage = () => {
  const navigate = useNavigate();
  const { progress, completeLesson, isLessonCompleted } = useEducation();
  const [activeNav, setActiveNav] = React.useState('learn');
  const [selectedTopic, setSelectedTopic] = React.useState(null);

  const handleNavigation = (page) => {
    setActiveNav(page);
    if (page === 'home') {
      navigate('/home');
    } else {
      navigate(`/${page}`);
    }
  };

  const topics = [
    {
      id: 'topic-1',
      title: 'What is Investing?',
      icon: '💰',
      difficulty: 'Beginner',
      duration: '3 min',
      completed: isLessonCompleted('topic-1')
    },
    {
      id: 'topic-2',
      title: 'Safe vs Risky Investments',
      icon: '⚖️',
      difficulty: 'Beginner',
      duration: '4 min',
      completed: isLessonCompleted('topic-2')
    },
    {
      id: 'topic-3',
      title: 'Understanding Interest',
      icon: '📊',
      difficulty: 'Beginner',
      duration: '3 min',
      completed: isLessonCompleted('topic-3')
    },
    {
      id: 'topic-4',
      title: 'Power of Starting Small',
      icon: '🌱',
      difficulty: 'Beginner',
      duration: '5 min',
      completed: isLessonCompleted('topic-4')
    },
    {
      id: 'topic-5',
      title: 'Tax Benefits Explained',
      icon: '🏛️',
      difficulty: 'Intermediate',
      duration: '6 min',
      completed: isLessonCompleted('topic-5')
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
      <PageShell
        title={selectedTopic.title}
        subtitle="Quick, practical lessons to build confidence."
        actions={(
          <button
            onClick={() => setSelectedTopic(null)}
            className="rounded-full border border-emerald-200 bg-white px-3 py-2 text-sm font-semibold text-emerald-900 hover:border-emerald-300 transition-colors"
          >
            ← Back to topics
          </button>
        )}
      >
        <div className="rounded-2xl border border-emerald-100 bg-white/90 backdrop-blur-sm p-5 shadow-sm">
          <FinancialLesson
            lesson={sampleLesson}
            onComplete={() => {
              completeLesson(selectedTopic.id);
              alert('Lesson completed! 🎉');
              setSelectedTopic(null);
            }}
          />
        </div>
        <BottomNav active={activeNav} onNavigate={handleNavigation} />
      </PageShell>
    );
  }

  return (
    <PageShell
      title="Learn & Grow"
      subtitle="Bite-sized lessons that keep you confident and in control."
      actions={(
        <div className="rounded-full bg-white/80 border border-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-900 shadow-sm">
          {progress.completedLessons.length} / {topics.length} completed
        </div>
      )}
    >
      <div className="rounded-2xl border border-emerald-100 bg-white/80 backdrop-blur-sm p-5 shadow-[0_10px_40px_rgba(12,53,43,0.08)]">
        <div className="flex gap-3 items-start">
          <span className="text-2xl">💡</span>
          <div>
            <p className="text-sm font-semibold text-emerald-900">Why learn?</p>
            <p className="text-sm text-emerald-900/75 mt-1">
              The more you understand, the more confident you'll feel about investing your money safely.
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-emerald-950">Popular topics</h2>
          <span className="text-xs text-emerald-900/70">Beginner friendly</span>
        </div>
        <div className="space-y-3">
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic)}
              className="w-full rounded-2xl border border-emerald-100 bg-white/80 backdrop-blur-sm p-4 text-left shadow-[0_10px_32px_rgba(12,53,43,0.06)] hover:-translate-y-0.5 transition-transform"
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">{topic.icon}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-emerald-950">{topic.title}</h3>
                  <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-emerald-900/70">
                    <span className="rounded-full bg-emerald-50 text-emerald-800 px-2 py-1 font-semibold">{topic.difficulty}</span>
                    <span className="rounded-full bg-white border border-emerald-100 px-2 py-1">⏱️ {topic.duration}</span>
                    {topic.completed && (
                      <span className="text-emerald-700 font-semibold">✓ Completed</span>
                    )}
                  </div>
                </div>
                <span className="text-emerald-900/50">→</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-3xl bg-gradient-to-r from-emerald-900 to-emerald-700 text-white p-6 shadow-[0_18px_60px_rgba(12,53,43,0.25)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold">Your progress</h3>
            <p className="text-sm text-white/80 mt-1">{progress.completedLessons.length} of {topics.length} lessons completed</p>
          </div>
          <span className="text-4xl">🎯</span>
        </div>
        <div className="mt-3 h-2 w-full rounded-full bg-white/30">
          <div
            className="h-2 rounded-full bg-white"
            style={{ width: `${(progress.completedLessons.length / topics.length) * 100}%` }}
          />
        </div>
      </div>

      <BottomNav active={activeNav} onNavigate={handleNavigation} />
    </PageShell>
  );
};

export default LearnPage;
