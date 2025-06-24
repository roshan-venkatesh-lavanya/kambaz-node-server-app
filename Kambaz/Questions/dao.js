import QuestionModel from "./model.js";
import QuizModel from "../Quizzes/model.js";

export const createQuestion = async (req, res) => {
  const { quizId } = req.params;

  try {
    const questionData = { ...req.body };
    delete questionData.quiz;

    const newQuestion = await QuestionModel.create({
      ...questionData,
      quiz: quizId,
    });

    const updatedQuiz = await QuizModel.findByIdAndUpdate(
      quizId,
      { $push: { questions: newQuestion._id } },
      { new: true }
    );
    console.log("🔗 Linked question to quiz:", updatedQuiz);

    res.json(newQuestion);
  } catch (err) {
    console.error("Failed to create question:", err);
    res.status(500).send("Failed to create question");
  }
};

export const findQuestionsForQuiz = async (req, res) => {
  const { quizId } = req.params;
  try {
    const quiz = await QuizModel.findById(quizId).populate("questions");
    if (!quiz) return res.status(404).send("Quiz not found");
    res.json(quiz.questions);
  } catch (err) {
    res.status(500).send("Error fetching questions");
  }
};

export const updateQuestion = async (req, res) => {
  const { questionId } = req.params;
  try {
    const updated = await QuestionModel.findByIdAndUpdate(
      questionId,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).send("Error updating question");
  }
};

export const deleteQuestion = async (req, res) => {
  const { questionId } = req.params;
  try {
    // Find the question first
    const question = await QuestionModel.findById(questionId);
    if (!question) return res.status(404).send("Question not found");

    // Remove the question from the associated quiz's questions array
    await QuizModel.findByIdAndUpdate(question.quiz, {
      $pull: { questions: questionId },
    });

    // Delete the question
    await QuestionModel.findByIdAndDelete(questionId);
    res.sendStatus(204);
  } catch (err) {
    console.error("Error deleting question:", err);
    res.status(500).send("Error deleting question");
  }
};
