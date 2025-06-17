import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export async function createModule(module) {
  const newModule = {
    ...module,
    _id: uuidv4(),
    lessons: [],
  };
  return await model.create(newModule);
}

export async function findModulesForCourse(courseId) {
  return await model.find({ course: courseId });
}

export async function updateModule(moduleId, moduleUpdates) {
  return await model.findByIdAndUpdate(moduleId, moduleUpdates, { new: true });
}

export async function deleteModule(moduleId) {
  return await model.deleteOne({ _id: moduleId });
}
