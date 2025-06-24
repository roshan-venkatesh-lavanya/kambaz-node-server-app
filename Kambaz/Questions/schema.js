import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ["Multiple Choice", "True/False", "Fill in the Blank"],
      default: "Multiple Choice",
    },
    text: String,
    points: { type: Number, default: 0 },
    choices: [String],
    correctAnswer: mongoose.Schema.Types.Mixed,
  },
  { collection: "questions" }
);

export default questionSchema;
