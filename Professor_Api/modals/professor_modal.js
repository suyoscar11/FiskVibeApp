import mongoose from "mongoose";

mongoose.connect("mongodb://localhost/professor_appointment");

const professor_table = new mongoose.Schema({
  name: String,
  pass: String,
  prof_name: String,
  department: String,
  subject: String,
  photo: String,
  email_address: String,
  office_hours: String,
  research_interests: String,
});

export default mongoose.model("professor", professor_table);
