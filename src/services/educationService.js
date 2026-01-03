/**
 * Education Service
 * Manages educational content and progress
 */

export const educationService = {
  /**
   * Get all available lessons
   */
  getLessons: () => {
    return [
      {
        id: 1,
        title: 'What is Investing?',
        category: 'basics',
        difficulty: 'beginner',
        duration: 3,
        icon: '💰',
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
      },
      {
        id: 2,
        title: 'Understanding Interest',
        category: 'basics',
        difficulty: 'beginner',
        duration: 4,
        icon: '📊',
        steps: [
          {
            icon: '📈',
            title: 'What is Interest?',
            content: 'Interest is extra money you earn on your investment. It\'s like a reward for investing.',
            example: 'If you invest ₹1000 at 7% interest, you get ₹70 extra after 1 year.'
          },
          {
            icon: '🔄',
            title: 'Compound Interest Magic',
            content: 'Compound interest means earning interest on your interest. Your money grows faster!',
            example: 'Year 1: ₹1000 → ₹1070. Year 2: ₹1070 → ₹1145 (not just ₹1140!)'
          },
          {
            icon: '⏰',
            title: 'Time is Your Friend',
            content: 'The longer you invest, the more your money grows. Start early, even with small amounts.',
            example: '₹100/month for 10 years = ₹17,000 invested, but worth ₹20,000+ with interest!'
          }
        ],
        quiz: {
          question: 'If you invest ₹1000 at 10% annual interest, how much will you have after 1 year?',
          options: ['₹1000', '₹1010', '₹1100', '₹1200'],
          correctAnswer: 2
        }
      }
    ];
  },

  /**
   * Get user's learning progress
   */
  getUserProgress: async (userId) => {
    // Returns progress from local storage
    return {
      completedLessons: [],
      currentStreak: 0,
      totalLessonsCompleted: 0,
      pointsEarned: 0
    };
  },

  /**
   * Mark lesson as completed
   */
  completeLesson: async (userId, lessonId) => {
    // Saves completion to local storage
    const progress = {
      userId: userId,
      lessonId: lessonId,
      completedAt: new Date().toISOString(),
      pointsEarned: 10
    };

    return progress;
  },

  /**
   * Get recommended next lesson
   */
  getRecommendedLesson: async (userId) => {
    const lessons = educationService.getLessons();
    const progress = await educationService.getUserProgress(userId);
    
    // Find first uncompleted lesson
    const nextLesson = lessons.find(
      lesson => !progress.completedLessons.includes(lesson.id)
    );
    
    return nextLesson || lessons[0];
  }
};
