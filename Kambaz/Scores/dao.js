import model from "./model.js";

export const submitAttempt = (attempt) => model.create(attempt);

export const findAttemptsByStudentAndQuiz = (studentId, quizId) =>
  model.find({ student: studentId, quiz: quizId }).sort({ submittedAt: -1 });

export const countAttemptsForStudentQuiz = (studentId, quizId) =>
  model.countDocuments({ student: studentId, quiz: quizId });
