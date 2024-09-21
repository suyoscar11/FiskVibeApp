import mongoose from "mongoose";

mongoose.connect("mongodb://localhost/professor_appointment");

const appointment_table = new mongoose.Schema({
  s_name: String,
  p_name: String,
  appointment_time: String,
  std_id: String,
  prof_id: String,
  faculty: String,
  status: String,
});

export default mongoose.model("appointment", appointment_table);
