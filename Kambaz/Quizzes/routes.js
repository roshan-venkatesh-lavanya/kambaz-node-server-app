import * as dao from "./dao.js";

export default function QuizRoutes(app) {
  app.post("/api/courses/:courseId/quizzes", async (req, res) => {
    const quiz = await dao.createQuiz(req.params.courseId, req.body);
    res.json(quiz);
  });

  app.get("/api/courses/:courseId/quizzes", async (req, res) => {
    const quizzes = await dao.findQuizzesForCourse(req.params.courseId);
    res.json(quizzes);
  });

  app.get("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    if (quizId === "new") {
      return res.status(200).json({});
    }
    const quiz = await dao.findQuizById(quizId);
    res.json(quiz);
  });

  app.put("/api/quizzes/:quizId", async (req, res) => {
    const status = await dao.updateQuiz(req.params.quizId, req.body);
    res.json(status);
  });

  app.delete("/api/quizzes/:quizId", async (req, res) => {
    const status = await dao.deleteQuiz(req.params.quizId);
    res.json(status);
  });
}
