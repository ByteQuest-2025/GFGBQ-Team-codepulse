import mongoose from 'mongoose';

const educationSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    content: { // This could be a direct string or link to external content
      type: String,
      required: true,
    },
    order: { // For ordering lessons
      type: Number,
      default: 0,
    },
    // Optional: quizzes, images, videos
    quiz: [
      {
        question: String,
        options: [String],
        correctAnswer: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Education = mongoose.model('Education', educationSchema);
export default Education;