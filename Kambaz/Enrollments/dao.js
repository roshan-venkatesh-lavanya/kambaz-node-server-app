import model from "./model.js";

export async function findCoursesForUser(userId) {
  const enrollments = await model.find({ user: userId }).populate("course");
  return enrollments.map((enrollment) => enrollment.course);
}

export async function findUsersForCourse(courseId) {
  const enrollments = await model.find({ course: courseId }).populate("user");
  return enrollments.map((enrollment) => enrollment.user);
}

export function enrollUserInCourse(user, course) {
  const newEnrollment = { user, course, _id: `${user}-${course}` };
  return model.create(newEnrollment);
}
export function unenrollUserFromCourse(user, course) {
  return model.deleteOne({ user, course });
}
export async function toggleUserInCourse(user, course) {
  const existing = await model.findOne({ user, course });

  if (existing) {
    await model.deleteOne({ user, course });
  } else {
    await model.create({ user, course, _id: `${user}-${course}` });
  }

  const enrollments = await model.find({ user }).populate("course");
  return enrollments.map((enrollment) => enrollment.course);
}
