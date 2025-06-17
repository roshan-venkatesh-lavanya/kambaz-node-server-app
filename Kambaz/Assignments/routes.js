import * as dao from "./dao.js";
import fs from "fs";
import path from "path";

const logFilePath = path.resolve("assignment.log");

function appendToLog(message) {
  const timestamp = new Date().toISOString();
  fs.appendFileSync(logFilePath, `[${timestamp}] ${message}\n`);
}

export default function AssignmentRoutes(app) {
  app.post("/api/assignments", async (req, res) => {
    try {
      console.log("📥 POST /api/assignments", req.body);
      const newAssignment = await dao.createAssignment(req.body);
      appendToLog(
        `Created assignment ${newAssignment._id}: ${newAssignment.title}`
      );
      res.json(newAssignment);
    } catch (error) {
      console.error("Error creating assignment:", error);
      res.status(500).json({ error: "Failed to create assignment" });
    }
  });

  app.get("/api/assignments", async (req, res) => {
    try {
      console.log("📤 GET /api/assignments");
      const assignments = await dao.findAllAssignments();
      res.json(assignments);
    } catch (error) {
      console.error("Error fetching assignments:", error);
      res.status(500).json({ error: "Failed to fetch assignments" });
    }
  });

  app.get("/api/courses/:cid/assignments", async (req, res) => {
    try {
      const { cid } = req.params;
      console.log(`📤 GET /api/courses/${cid}/assignments`);
      const assignments = await dao.findAssignmentsForCourse(cid);
      res.json(assignments);
    } catch (error) {
      console.error("Error fetching course assignments:", error);
      res.status(500).json({ error: "Failed to fetch course assignments" });
    }
  });

  app.get("/api/assignments/:aid", async (req, res) => {
    try {
      const { aid } = req.params;
      console.log(`📤 GET /api/assignments/${aid}`);
      const assignment = await dao.findAssignmentById(aid);
      if (assignment) {
        res.json(assignment);
      } else {
        res.status(404).json({ error: "Assignment not found" });
      }
    } catch (error) {
      console.error("Error fetching assignment:", error);
      res.status(500).json({ error: "Failed to fetch assignment" });
    }
  });

  app.put("/api/assignments/:aid", async (req, res) => {
    try {
      const { aid } = req.params;
      console.log(`📝 PUT /api/assignments/${aid}`, req.body);
      const updated = await dao.updateAssignment(aid, req.body);
      if (updated) {
        res.json(updated);
      } else {
        res.status(404).json({ error: "Assignment not found" });
      }
    } catch (error) {
      console.error("Error updating assignment:", error);
      res.status(500).json({ error: "Failed to update assignment" });
    }
  });

  app.delete("/api/assignments/:aid", async (req, res) => {
    try {
      const { aid } = req.params;
      console.log(`🗑️ DELETE /api/assignments/${aid}`);
      const deleted = await dao.deleteAssignment(aid);
      if (deleted) {
        appendToLog(`Deleted assignment ${aid}`);
        res.sendStatus(204);
      } else {
        res.status(404).json({ error: "Assignment not found" });
      }
    } catch (error) {
      console.error("Error deleting assignment:", error);
      res.status(500).json({ error: "Failed to delete assignment" });
    }
  });
}
