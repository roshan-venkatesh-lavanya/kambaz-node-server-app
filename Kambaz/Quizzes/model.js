import mongoose from "mongoose";
import quizSchema from "./schema.js";

const quizModel = mongoose.model("Quiz", quizSchema);
export default quizModel;
