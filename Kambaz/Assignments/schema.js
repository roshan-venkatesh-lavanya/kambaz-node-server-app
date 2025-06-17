import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
    points: { type: Number, default: 100 },
    dueDate: Date,
    availableFromDate: Date, 
    availableUntil: Date,
    course: {
      type: String, 
      required: true,
    },
  },
  { collection: "assignments" }
);

export default assignmentSchema;
