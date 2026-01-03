/**
 * Educational Content Data
 * Simple lessons for financial literacy
 */

export const educationalContent = {
  // Category: Investment Basics
  basics: [
    {
      id: 'basics-001',
      title: 'What is Investing?',
      icon: '💰',
      difficulty: 'beginner',
      duration: '3 min',
      description: 'Learn what investing means and how it helps you grow money',
      content: {
        sections: [
          {
            heading: 'Money That Works For You',
            text: 'Investing means putting your money in a place where it can grow over time. Instead of keeping money idle at home, you put it in safe places that give you returns.',
            example: 'Think of it like planting a mango tree. You plant ₹100 today (seed), water it regularly (invest regularly), and after some years, you get many mangoes worth ₹500!'
          },
          {
            heading: 'Different from Saving',
            text: 'Saving is keeping money aside safely. Investing is making that money grow. Both are important!',
            example: 'Savings Account: ₹10,000 stays ₹10,000 for years.\nInvestment: ₹10,000 becomes ₹12,000 in 3 years.'
          },
          {
            heading: 'Safe Options Exist',
            text: 'Not all investments are risky! Government schemes are 100% safe and perfect for first-time investors.',
            example: 'Post Office Savings, PPF, Fixed Deposits - all are backed by the Indian Government.'
          }
        ],
        keyTakeaways: [
          'Investing helps your money grow',
          'It\'s different from just saving',
          'Safe government options exist',
          'You can start with small amounts'
        ]
      },
      quiz: {
        question: 'What is the main benefit of investing over just saving?',
        options: [
          'Your money grows over time',
          'You can spend it immediately',
          'It\'s kept at home',
          'No government schemes needed'
        ],
        correctAnswer: 0,
        explanation: 'Investing helps your money grow through interest and returns, unlike saving where money stays the same.'
      }
    },
    {
      id: 'basics-002',
      title: 'Understanding Interest',
      icon: '📊',
      difficulty: 'beginner',
      duration: '4 min',
      description: 'Learn how interest works and how you earn money',
      content: {
        sections: [
          {
            heading: 'What is Interest?',
            text: 'Interest is extra money you earn on your investment. It\'s like a "thank you gift" for investing your money.',
            example: 'You invest ₹1,000 at 7% interest per year.\nAfter 1 year: You get ₹70 extra!\nTotal: ₹1,070'
          },
          {
            heading: 'Simple vs Compound Interest',
            text: 'Simple interest is calculated only on your original amount. Compound interest is calculated on your amount + previous interest. Compound is more powerful!',
            example: 'Simple Interest (3 years at 10%):\nYear 1: ₹1,000 + ₹100 = ₹1,100\nYear 2: ₹1,100 + ₹100 = ₹1,200\nYear 3: ₹1,200 + ₹100 = ₹1,300\n\nCompound Interest (3 years at 10%):\nYear 1: ₹1,000 + ₹100 = ₹1,100\nYear 2: ₹1,100 + ₹110 = ₹1,210\nYear 3: ₹1,210 + ₹121 = ₹1,331'
          },
          {
            heading: 'Time is Your Friend',
            text: 'The longer you invest, the more your money grows. This is called the "power of compounding".',
            example: '₹100 per month for 10 years:\nTotal invested: ₹12,000\nWith 7% interest: Worth ₹17,308!\nExtra earned: ₹5,308'
          }
        ],
        keyTakeaways: [
          'Interest is money earned on investments',
          'Compound interest grows faster',
          'Time helps money grow more',
          'Regular small investments add up'
        ]
      },
      quiz: {
        question: 'If you invest ₹1,000 at 10% interest per year, how much will you have after 1 year?',
        options: ['₹1,000', '₹1,010', '₹1,100', '₹1,200'],
        correctAnswer: 2,
        explanation: '10% of ₹1,000 is ₹100. So, ₹1,000 + ₹100 = ₹1,100'
      }
    }
  ],

  // Category: Safety & Risk
  safety: [
    {
      id: 'safety-001',
      title: 'Safe vs Risky Investments',
      icon: '⚖️',
      difficulty: 'beginner',
      duration: '4 min',
      description: 'Understand different risk levels and choose wisely',
      content: {
        sections: [
          {
            heading: 'What is Risk?',
            text: 'Risk means the chance of losing money. Low risk = very safe, High risk = can lose money.',
            example: 'Low Risk: Post Office Savings - Government guaranteed, 100% safe\nHigh Risk: Stock Market - Price goes up and down, can gain or lose'
          },
          {
            heading: 'Government Schemes are Safest',
            text: 'Any scheme backed by the Indian Government is completely safe. Your money is guaranteed.',
            example: 'Safe Government Schemes:\n• Post Office Savings\n• PPF (Public Provident Fund)\n• NSC (National Savings Certificate)\n• Sukanya Samriddhi (for girl child)'
          },
          {
            heading: 'Start Safe, Then Explore',
            text: 'For beginners, always start with safe, government-backed options. Once you learn more, you can explore other options.',
            example: 'Good Beginner Path:\nStep 1: Start with Post Office Savings (₹10-500)\nStep 2: Try PPF (₹500-1000)\nStep 3: Learn about Fixed Deposits\nStep 4: Only then consider other options'
          }
        ],
        keyTakeaways: [
          'Risk = chance of losing money',
          'Government schemes are 100% safe',
          'Always start with safe options',
          'Learn before taking risks'
        ]
      },
      quiz: {
        question: 'Which is the safest investment option?',
        options: [
          'Stock Market',
          'Government Post Office Savings',
          'Cryptocurrency',
          'Friend\'s business'
        ],
        correctAnswer: 1,
        explanation: 'Government schemes like Post Office Savings are backed by the government and 100% safe.'
      }
    }
  ],

  // Category: Practical Tips
  practical: [
    {
      id: 'practical-001',
      title: 'Power of Starting Small',
      icon: '🌱',
      difficulty: 'beginner',
      duration: '5 min',
      description: 'Why even ₹10 matters and how to start',
      content: {
        sections: [
          {
            heading: 'Every Rupee Counts',
            text: 'You don\'t need thousands to start investing. Even ₹10 or ₹50 makes a difference. The habit of investing is more important than the amount.',
            example: '₹50 per month may seem small, but:\nIn 1 year: ₹600 saved\nIn 5 years: ₹3,000 + interest\nIn 10 years: ₹6,000 + interest\n\nPlus, you build a saving habit!'
          },
          {
            heading: 'Start Today, Not Tomorrow',
            text: 'The best time to start investing was yesterday. The second best time is today. Don\'t wait for a large amount.',
            example: 'Person A: Starts with ₹100/month at age 25\nPerson B: Starts with ₹100/month at age 35\n\nAt age 55:\nPerson A: Much more money (30 years of growth)\nPerson B: Less money (only 20 years)'
          },
          {
            heading: 'Increase Gradually',
            text: 'Start small, learn, gain confidence, then gradually increase your investment amount.',
            example: 'Recommended Path:\nMonth 1-3: ₹50 per month\nMonth 4-6: ₹100 per month\nMonth 7-12: ₹200 per month\nYear 2 onwards: Keep increasing as you earn more'
          }
        ],
        keyTakeaways: [
          'Start with whatever you can afford',
          'Starting early is more important than starting big',
          'Build the habit first',
          'Increase amount gradually'
        ]
      },
      quiz: {
        question: 'What is more important for a beginner investor?',
        options: [
          'Investing a large amount once',
          'Building a regular investment habit',
          'Waiting to save ₹10,000 first',
          'Only investing in high-return schemes'
        ],
        correctAnswer: 1,
        explanation: 'Building a regular investment habit is most important. You can start small and increase gradually.'
      }
    }
  ]
};

// Quick tips for various scenarios
export const quickTips = {
  firstTime: {
    title: 'First Time Investing?',
    tips: [
      'Start with just ₹10-50 to learn',
      'Choose government-backed schemes only',
      'Complete the educational lessons first',
      'Don\'t invest money you need immediately',
      'Ask questions if confused - we\'re here to help'
    ]
  },
  lowBudget: {
    title: 'Investing on Low Budget?',
    tips: [
      'Post Office Savings allows as low as ₹10',
      'Regular small amounts work better than one-time large amounts',
      'Cut one tea/snack per day = ₹10-20 saved',
      'Even ₹50/month = ₹600/year + interest',
      'Focus on building the habit, not the amount'
    ]
  },
  safety: {
    title: 'Worried About Safety?',
    tips: [
      'Government schemes are 100% guaranteed',
      'Your money is insured and protected',
      'We only show low-risk, safe options',
      'You can see where your money is at all times',
      'Read about each scheme before investing'
    ]
  }
};
