import * as enrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app) {
  app.get("/api/enrollments", async (req, res) => {
    try {
      const enrollments = await enrollmentsDao.findAllEnrollments();
      res.send(enrollments);
    } catch (err) {
      console.error("Error fetching all enrollments:", err);
      res.status(500).send({ error: "Internal server error" });
    }
  });

  app.get("/api/enrollments/current", async (req, res) => {
    const currentUser = req.session["currentUser"];

    if (!currentUser || !currentUser._id) {
      console.warn("GET /api/enrollments/current - No current user in session");
      return res.status(400).send({
        error: "No user is currently logged in",
        session: req.session,
      });
    }

    try {
      const enrollments = await enrollmentsDao.getUserEnrollments(
        currentUser._id
      );
      res.send(enrollments);
    } catch (err) {
      console.error("Error fetching enrollments:", err);
      res.status(500).send({ error: "Internal server error" });
    }
  });

  app.post("/api/enrollments/current", async (req, res) => {
    const currentUser = req.session["currentUser"];
    const { courseId } = req.body;

    if (!currentUser || !currentUser._id) {
      console.warn(
        "POST /api/enrollments/current - No current user in session"
      );
      return res.status(400).send({
        error: "User not logged in",
        session: req.session,
      });
    }

    if (!courseId) {
      return res
        .status(400)
        .send({ error: "Missing courseId in request body" });
    }

    try {
      const updatedEnrollments = await enrollmentsDao.toggleUserInCourse(
        currentUser._id,
        courseId
      );
      res.send(updatedEnrollments);
    } catch (err) {
      console.error("Error toggling enrollment:", err);
      res.status(500).send({ error: "Internal server error" });
    }
  });
}
