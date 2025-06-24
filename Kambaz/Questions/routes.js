import * as dao from "./dao.js";

export default function QuestionsRoutes(app) {
  app.post("/api/quizzes/:quizId/questions", dao.createQuestion);
  app.get("/api/quizzes/:quizId/questions", dao.findQuestionsForQuiz);
  app.put("/api/questions/:questionId", dao.updateQuestion);
  app.delete("/api/questions/:questionId", dao.deleteQuestion);
}
