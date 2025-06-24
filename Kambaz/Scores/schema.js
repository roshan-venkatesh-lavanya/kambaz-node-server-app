import mongoose from "mongoose";
const attemptSchema = new mongoose.Schema(
  {
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
    student: { type: String, ref: "User", required: true },
    answers: [
      {
        question: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
        selected: mongoose.Schema.Types.Mixed,
        correct: Boolean,
      },
    ],
    score: Number,
    submittedAt: { type: Date, default: Date.now },
  },
  { collection: "quiz_attempts" }
);

export default attemptSchema;
