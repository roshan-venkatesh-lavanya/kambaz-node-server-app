import mongoose from "mongoose";
import schema from "./schema.js";
const QuestionModel = mongoose.model("Question", schema);
export default QuestionModel;
