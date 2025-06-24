import quizModel from "./model.js";
import questionModel from "../Questions/model.js"; 

export const createQuiz = async (courseId, quiz) => {
  console.log("📥 Creating quiz for course:", courseId);
  const createdQuiz = await quizModel.create({ ...quiz, course: courseId });
  console.log("✅ Quiz created:", createdQuiz);
  return createdQuiz;
};

export const findQuizzesForCourse = async (courseId) => {
  const quizzes = await quizModel.find({ course: courseId });
  return quizzes;
};

export const findQuizById = async (quizId) => {
  const quiz = await quizModel.findById(quizId).populate("questions"); 
  return quiz;
};

export const updateQuiz = async (quizId, quiz) => {
  return await quizModel.updateOne({ _id: quizId }, { $set: quiz });
};

export const deleteQuiz = async (quizId) => {
  try {
    // ✅ Delete all questions linked to this quiz
    await questionModel.deleteMany({ quiz: quizId });

    // ✅ Then delete the quiz
    return await quizModel.deleteOne({ _id: quizId });
  } catch (err) {
    console.error("❌ Error deleting quiz and its questions:", err);
    throw err;
  }
};
