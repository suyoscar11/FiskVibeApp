// import mongoose from "mongoose";

// mongoose.connect("mongodb://localhost/professor_appointment"); //connection of dbms

// const professor_table = new mongoose.Schema({
//   name: String,
//   pass: String,
//   doc_name: String,
//   exp: String,
//   about: String,
//   speciality: String,
// });

// export default mongoose.model("professor", professor_table);

import mongoose from "mongoose";

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
