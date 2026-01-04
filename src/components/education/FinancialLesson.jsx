import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

/**
 * Interactive Financial Lesson Component
 * Bite-sized education before investment actions
 */
const FinancialLesson = ({ lesson, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const { t } = useApp();

  const handleNext = () => {
    if (currentStep < lesson.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (lesson.quiz) {
      // Show quiz
      setCurrentStep('quiz');
    } else {
      onComplete();
    }
  };

  const handleQuizAnswer = (answer) => {
    setQuizAnswer(answer);
    if (answer === lesson.quiz.correctAnswer) {
      setTimeout(() => onComplete(), 1000);
    }
  };

  if (currentStep === 'quiz') {
    return (
      <div className="p-6 bg-white rounded-lg">
        <h3 className="text-lg font-semibold mb-4">{lesson.quiz.question}</h3>
        <div className="space-y-3">
          {lesson.quiz.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleQuizAnswer(index)}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                quizAnswer === null
                  ? 'border-gray-200 hover:border-green-300'
                  : quizAnswer === index
                  ? index === lesson.quiz.correctAnswer
                    ? 'border-green-600 bg-green-50'
                    : 'border-red-600 bg-red-50'
                  : 'border-gray-200'
              }`}
              disabled={quizAnswer !== null}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const step = lesson.steps[currentStep];

  return (
    <div className="p-6 bg-white rounded-lg">
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>{t('lesson.step_counter', 'Step {current} of {total}', { current: currentStep + 1, total: lesson.steps.length })}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all"
            style={{ width: `${((currentStep + 1) / lesson.steps.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="text-center mb-6">
        <span className="text-6xl">{step.icon}</span>
      </div>

      <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
      <p className="text-gray-600 mb-6">{step.content}</p>

      {step.example && (
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <p className="text-sm font-semibold text-blue-800 mb-2">{t('lesson.example', 'Example:')}</p>
          <p className="text-sm text-blue-700">{step.example}</p>
        </div>
      )}

      <button
        onClick={handleNext}
        className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold"
      >
        {currentStep < lesson.steps.length - 1
          ? t('lesson.next', 'Next')
          : t('lesson.take_quiz', 'Take Quiz')}
      </button>
    </div>
  );
};

export default FinancialLesson;
