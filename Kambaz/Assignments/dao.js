import assignmentModel from "./model.js";

export function createAssignment(assignment) {
  console.log("Creating assignment with data:", assignment);
  return assignmentModel.create(assignment);
}

export function findAllAssignments() {
  return assignmentModel.find();
}

export function findAssignmentsForCourse(courseId) {
  console.log("Finding assignments for course:", courseId);
  return assignmentModel.find({ course: courseId });
}

export function findAssignmentById(assignmentId) {
  return assignmentModel.findOne({ _id: assignmentId });
}

export function updateAssignment(assignmentId, updates) {
  console.log("Updating assignment:", assignmentId, "with:", updates);
  return assignmentModel.findOneAndUpdate({ _id: assignmentId }, updates, {
    new: true,
  });
}

export function deleteAssignment(assignmentId) {
  console.log("Deleting assignment:", assignmentId);
  return assignmentModel.findOneAndDelete({ _id: assignmentId });
}
