import mongoose from "mongoose";

//--------------------Schema for User Table---------------------//
const appointment_table = new mongoose.Schema({
  std_name: String,
  prof_name: String,
  std_major: String,
  email: String,
  appointment_time: String,
  std_id: String,
  prof_id: String,
  faculty: String,
  status: String,
});

export default mongoose.model("appointment", appointment_table);
