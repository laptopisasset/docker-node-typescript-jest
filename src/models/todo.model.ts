import { Schema, model } from "mongoose";

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    required: true,
  },
});

export default model("Todo", TodoSchema);
