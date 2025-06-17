import * as modulesDao from "./dao.js";

export default function ModuleRoutes(app) {
  app.put("/api/modules/:moduleId", async (req, res) => {
    const { moduleId } = req.params;
    const moduleUpdates = req.body;

    try {
      const updated = await modulesDao.updateModule(moduleId, moduleUpdates);
      res.json(updated);
    } catch (e) {
      res.status(500).send(`Update failed: ${e.message}`);
    }
  });

  app.delete("/api/modules/:moduleId", async (req, res) => {
    const { moduleId } = req.params;

    try {
      await modulesDao.deleteModule(moduleId);
      res.sendStatus(204);
    } catch (err) {
      res.status(500).send("Error deleting module");
    }
  });

  app.post("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    const moduleData = req.body;

    try {
      const newModule = await modulesDao.createModule({
        ...moduleData,
        course: courseId,
      });
      res.json(newModule);
    } catch (err) {
      res.status(500).send("Error creating module");
    }
  });
}
