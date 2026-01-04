import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import Education from '../models/Education.js';
import User from '../models/User.js';

const router = express.Router();

// @desc    Get all educational content
// @route   GET /api/education/lessons
// @access  Public (or Private if you want to restrict)
router.get('/lessons', async (req, res) => {
  const lessons = await Education.find({}).sort({ order: 1 });
  res.json(lessons);
});

// @desc    Get a single educational lesson by ID
// @route   GET /api/education/lessons/:id
// @access  Public
router.get('/lessons/:id', async (req, res) => {
  const lesson = await Education.findById(req.params.id);
  if (lesson) {
    res.json(lesson);
  } else {
    res.status(404).json({ message: 'Lesson not found' });
  }
});

// @desc    Create new educational content (Admin only)
// @route   POST /api/education/lessons
// @access  Private (Admin)
// NOTE: You would need to add an 'isAdmin' check to the protect middleware or a separate admin middleware
router.post('/lessons', protect, async (req, res) => {
  const { title, category, content, order, quiz } = req.body;

  const newLesson = new Education({
    title,
    category,
    content,
    order,
    quiz,
  });

  const createdLesson = await newLesson.save();
  res.status(201).json(createdLesson);
});


// @desc    Get user's education progress
// @route   GET /api/education/progress
// @access  Private
router.get('/progress', protect, async (req, res) => {
  const user = await User.findById(req.user._id).select('educationProgress').populate('educationProgress.lessonId', 'title');
  if (user) {
    res.json(user.educationProgress);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// @desc    Update user's education progress
// @route   PUT /api/education/progress
// @access  Private
// (This functionality is already handled in userRoutes for simplicity, but could be here)
router.put('/progress', protect, async (req, res) => {
  const { lessonId, completed } = req.body;

  const user = await User.findById(req.user._id);

  if (user) {
    const existingProgressIndex = user.educationProgress.findIndex(
      (p) => p.lessonId.toString() === lessonId
    );

    if (existingProgressIndex > -1) {
      user.educationProgress[existingProgressIndex].completed = completed;
      user.educationProgress[existingProgressIndex].lastAccessed = Date.now();
    } else {
      user.educationProgress.push({ lessonId, completed });
    }

    const updatedUser = await user.save();
    res.json(updatedUser.educationProgress);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

export default router;