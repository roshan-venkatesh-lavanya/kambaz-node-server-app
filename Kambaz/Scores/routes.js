import * as dao from "./dao.js";
import { findQuizById } from "../Quizzes/dao.js";

export default function AttemptRoutes(app) {
  app.post("/api/quizzes/:quizId/attempts", async (req, res) => {
    const { quizId } = req.params;
    const { student } = req.body;

    console.log("📥 POST /api/quizzes/:quizId/attempts");
    console.log("📝 quizId:", quizId);
    console.log("👤 student:", student);

    try {
      const quiz = await findQuizById(quizId);
      if (!quiz) {
        console.warn("❌ Quiz not found:", quizId);
        return res.status(404).send("Quiz not found");
      }

      const attemptCount = await dao.countAttemptsForStudentQuiz(
        student,
        quizId
      );
      console.log("📊 Existing attempts by student: ${attemptCount}");

      if (!quiz.multipleAttempts && attemptCount >= 1) {
        return res.status(403).send("Multiple attempts not allowed");
      }
      if (quiz.multipleAttempts && attemptCount >= quiz.maxAttempts) {
        return res.status(403).send("Maximum attempts reached");
      }

      const attempt = await dao.submitAttempt(req.body);
      console.log("✅ Attempt submitted:", attempt._id);
      res.json(attempt);
    } catch (e) {
      console.error("❌ Error submitting attempt:", e.message);
      res.status(500).send(e.message);
    }
  });

  app.get("/api/quizzes/:quizId/attempts/:studentId", async (req, res) => {
    const { studentId, quizId } = req.params;

    console.log("📥 GET /api/quizzes/:quizId/attempts/:studentId");
    console.log("📝 quizId:", quizId, "👤 studentId:", studentId);

    try {
      const attempts = await dao.findAttemptsByStudentAndQuiz(
        studentId,
        quizId
      );
      console.log("🔎 Attempts found:", attempts.length);

      if (attempts.length > 0) {
        res.json(attempts);
      } else {
        res.status(404).send("No attempts found");
      }
    } catch (e) {
      console.error("❌ Error fetching attempts:", e.message);
      res.status(500).send(e.message);
    }
  });

  app.get(
    "/api/quizzes/:quizId/attempts/:studentId/count",
    async (req, res) => {
      const { studentId, quizId } = req.params;

      console.log("📥 GET /api/quizzes/:quizId/attempts/:studentId/count");
      console.log("📝 quizId:", quizId, "👤 studentId:", studentId);

      try {
        const count = await dao.countAttemptsForStudentQuiz(studentId, quizId);
        console.log("📊 Attempt count:", count);
        res.json({ count });
      } catch (e) {
        console.error("❌ Error counting attempts:", e.message);
        res.status(500).send(e.message);
      }
    }
  );
}
