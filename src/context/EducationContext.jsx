import React, { createContext, useContext, useState, useEffect } from 'react';
import { educationService } from '../services/educationService';
import { storage, STORAGE_KEYS } from '../utils/storage';

const EducationContext = createContext();

/**
 * Education Context Provider
 * Manages learning progress and lessons
 */
export const EducationProvider = ({ children }) => {
  const [lessons, setLessons] = useState([]);
  const [progress, setProgress] = useState({
    completedLessons: [],
    currentStreak: 0,
    totalPoints: 0
  });
  const [isLoading, setIsLoading] = useState(false);

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = () => {
    setIsLoading(true);
    try {
      // Load lessons
      const allLessons = educationService.getLessons();
      setLessons(allLessons);

      // Load progress from storage
      const savedProgress = storage.get(STORAGE_KEYS.LEARNING_PROGRESS, {
        completedLessons: [],
        currentStreak: 0,
        totalPoints: 0
      });
      setProgress(savedProgress);
    } catch (error) {
      console.error('Error loading education data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Complete a lesson
  const completeLesson = (lessonId) => {
    if (progress.completedLessons.includes(lessonId)) {
      return; // Already completed
    }

    const updatedProgress = {
      ...progress,
      completedLessons: [...progress.completedLessons, lessonId],
      totalPoints: progress.totalPoints + 10,
      currentStreak: progress.currentStreak + 1
    };

    setProgress(updatedProgress);
    storage.set(STORAGE_KEYS.LEARNING_PROGRESS, updatedProgress);
  };

  // Get next recommended lesson
  const getNextLesson = () => {
    const nextLesson = lessons.find(
      lesson => !progress.completedLessons.includes(lesson.id)
    );
    return nextLesson || lessons[0];
  };

  // Get lesson by ID
  const getLessonById = (id) => {
    return lessons.find(lesson => lesson.id === id);
  };

  // Check if lesson is completed
  const isLessonCompleted = (lessonId) => {
    return progress.completedLessons.includes(lessonId);
  };

  // Get completion percentage
  const getCompletionPercentage = () => {
    if (lessons.length === 0) return 0;
    return ((progress.completedLessons.length / lessons.length) * 100).toFixed(0);
  };

  const value = {
    lessons,
    progress,
    isLoading,
    completeLesson,
    getNextLesson,
    getLessonById,
    isLessonCompleted,
    getCompletionPercentage,
    refreshLessons: loadInitialData
  };

  return (
    <EducationContext.Provider value={value}>
      {children}
    </EducationContext.Provider>
  );
};

export const useEducation = () => {
  const context = useContext(EducationContext);
  if (!context) {
    throw new Error('useEducation must be used within EducationProvider');
  }
  return context;
};
