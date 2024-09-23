import mongoose from "mongoose";

const user_table = new mongoose.Schema({
  name: String,
  pass: String,
});

export default mongoose.model("user", user_table);
