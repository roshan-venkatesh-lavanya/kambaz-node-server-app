import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app) {
  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await dao.findAllCourses();
      res.json(courses);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      res.status(500).send(error.message);
    }
  });

  app.post("/api/courses", async (req, res) => {
    try {
      const newCourse = await dao.createCourse(req.body);
      res.json(newCourse);
    } catch (error) {
      console.error("Error creating course:", error);
      res.status(500).send(error.message);
    }
  });

  app.get("/api/courses/:courseId/modules", async (req, res) => {
    try {
      const { courseId } = req.params;
      const modules = await modulesDao.findModulesForCourse(courseId);
      res.json(modules);
    } catch (error) {
      console.error("Failed to fetch modules:", error);
      res.status(500).send(error.message);
    }
  });

  app.post("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    const module = { ...req.body, course: courseId };

    try {
      const newModule = await modulesDao.createModule(module);
      res.json(newModule);
    } catch (error) {
      console.error("Error creating module:", error);
      if (error.name === "ValidationError") {
        res.status(400).send(error.message);
      } else {
        res.status(500).send(error.message);
      }
    }
  });

  app.delete("/api/courses/:courseId", async (req, res) => {
    try {
      const { courseId } = req.params;
      const status = await dao.deleteCourse(courseId);
      res.send(status);
    } catch (error) {
      console.error("Error deleting course:", error);
      res.status(500).send(error.message);
    }
  });

  app.put("/api/courses/:courseId", async (req, res) => {
    try {
      const { courseId } = req.params;
      const courseUpdates = req.body;
      const status = await dao.updateCourse(courseId, courseUpdates);
      res.send(status);
    } catch (error) {
      console.error("Error updating course:", error);
      res.status(500).send(error.message);
    }
  });

  app.get("/api/courses/:cid/users", async (req, res) => {
    try {
      const { cid } = req.params;
      const users = await enrollmentsDao.findUsersForCourse(cid);
      res.json(users);
    } catch (error) {
      console.error("Error fetching users for course:", error);
      res.status(500).send(error.message);
    }
  });
}
