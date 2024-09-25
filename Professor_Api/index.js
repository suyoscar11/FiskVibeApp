import express from "express";
import mongoose from "mongoose";
import user from "./models/student_model.js";
import professor from "./models/professor_model.js";
import appointment from "./models/appointment.js";

mongoose
  .connect("mongodb://127.0.0.1:27017/professor_appointment", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Register Student / User

app.post("/api/user/registerUser", async (req, res) => {
  const { name, pass } = req.body;
  try {
    if (!name || !pass) {
      return res.status(400).json({ msg: "Fields cannot be empty." });
    }
    let User = await user.findOne({ name, pass });
    if (User) {
      return res.status(400).json({ msg: "User aldready exists" });
    }
    User = new user({
      name,
      pass,
    });
    await User.save();
    res.status(200).json({ msg: "Success" });
  } catch (error) {
    console.error("Error occurred during registration:", error);
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
});

// Login User / Students

app.post("/api/user/loginUser", async (req, res) => {
  const { name, pass } = req.body;

  try {
    if (!name || !pass) {
      return res.status(400).json({ msg: "Fields cannot be Empty" });
    }
    let User = await user.findOne({ name, pass });
    if (!User) {
      return res.status(400).json({ msg: "Invalid Credentials!" });
    }

    res.status(200).json({ msg: "Success", userid: User._id });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// Fetch professors by category

app.get("/api/user/getProf_byCategory/:category", async (req, res) => {
  const { category } = req.params;

  try {
    if (!category) {
      return res.status(400).json({ msg: "All Fields required" });
    }
    const professors = await professor.find({ speciality: category });
    if (professors.length === 0) {
      return res
        .status(400)
        .json({ msg: "No professors found of this category" });
    }
    res.status(200).json({ msg: professors });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});
// Fetch appointment by student ID and status "booked"
app.get("/api/user/getAppointments_byStudentId/:std_id", async (req, res) => {
  const { std_id } = req.params;

  try {
    if (!std_id) {
      return res.status(400).json({ msg: "Please fill all the fields" });
    }

    const appointments = await appointment.find({ std_id, status: "booked" });
    if (appointments.length === 0) {
      return res.status(400).json({ msg: "No Appointments Found" });
    }

    res.status(200).json({ msg: appointments });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

//Route for booking an appointment

app.post("/api/user/bookAppointment", async (req, res) => {
  const {
    std_name,
    prof_name,
    std_major,
    email,
    appointment_time,
    std_id,
    prof_id,
    faculty,
  } = req.body;
  try {
    if (
      !std_name ||
      !prof_name ||
      !std_major ||
      !email ||
      !appointment_time ||
      !std_id ||
      !prof_id ||
      !faculty
    ) {
      return res.status(400).json({ msg: "All Fields Required" });
    }

    const newAppointment = new appointment({
      std_name,
      prof_name,
      std_major,
      email,
      appointment_time,
      std_id,
      prof_id,
      faculty,
      status: "Booked",
    });

    await newAppointment.save();

    res.status(200).json({ msg: "Success", appointment: newAppointment });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// ...................................................................................Professor.......................................................................

//Login of Admin Panel i.e. Professor

app.post("/api/professor/loginProfessor", async (req, res) => {
  const { name, pass } = req.body;

  try {
    if (!name || !pass) {
      return res.status(400).json({ msg: "Fields cannot be Empty" });
    }
    let User = await professor.findOne({ name, pass });
    if (!User) {
      return res.status(400).json({ msg: "Invalid Credentials!" });
    }

    res.status(200).json({ msg: "Success", userid: User._id });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

//Fetch appointments by ProfessorID and status "Booked"

app.get(
  "/api/professor/getAppointments_byProfessorId/:prof_id",
  async (req, res) => {
    const { prof_id } = req.params;

    try {
      if (!prof_id) {
        return res.status(400).json({ msg: "Please fill all the fields" });
      }

      const appointments = await appointment.find({
        prof_id,
        status: "booked",
      });
      if (appointments.length === 0) {
        return res.status(400).json({ msg: "No appointments found" });
      }

      res.status(200).json({ msg: appointments });
    } catch (error) {
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

// update appointment status to "Done" by ID

app.put("/api/professor/updateAppointmentStatus:/_id", async (req, res) => {
  const { _id } = req.params;

  try {
    if (!_id) {
      return res.status(400).json({ msg: "Please provide an appointment ID." });
    }
    const appointmentRecord = await appointment.findById(_id);
    if (!appointmentRecord) {
      return res.status(400).json({ msg: "Appointment not Found" });
    }

    appointmentRecord.status = "done";
    await appointmentRecord.save();
    res
      .status(200)
      .json({ msg: "Success", updatedAppointment: appointmentRecord });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
});

const port = 5600;
app.listen(port, () => {
  console.log("Server is running in port: ", port);
});

// *************************************************************************************Other Code***************************************************************

// import express from "express";
// import user from "./models/student_model.js";
// import doctor from "./models/professor_model.js";
// import appointment from "./models/appointment.js";
// import student_model from "./models/student_model.js";

// const app = express();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // *******************************CLIENT**************************************//

// //Register User
// app.post("/api/user/registerUser", async (req, res) => {
//   const { name, pass } = req.body;
//   try {
//     if (!name || !pass) {
//       return res.status(400).json({ msg: "Pls fill all fields" });
//     }
//     let User = await user.findOne({ name, pass });
//     if (User) {
//       return res.status(400).json({ msg: "User already exists" });
//     }
//     User = new user({
//       name,
//       pass,
//     });

//     await User.save();

//     res.status(200).json({ msg: "Success" });
//   } catch (err) {
//     res.status(500).json({ msg: "Server Error" });
//   }
// });

// //Login User
// app.post("/api/user/loginUser", async (req, res) => {
//   const { name, pass } = req.body;

//   try {
//     if (!name || !pass) {
//       return res.status(400).json({ msg: "Pls fill all fields" });
//     }
//     let User = await user.findOne({ name, pass });
//     if (!User) {
//       return res.status(400).json({ msg: "Invalid credentials" });
//     }

//     res.status(200).json({ msg: "Success", userid: User._id });
//   } catch (err) {
//     res.status(500).json({ msg: "Server Error" });
//   }
// });

// //Fetch doctors by category
// app.get("/api/user/getDoc_byCategory/:category", async (req, res) => {
//   const { category } = req.params;

//   try {
//     if (!category) {
//       return res.status(400).json({ msg: "Pls fill all fields" });
//     }
//     const doctors = await doctor.find({ speciality: category });

//     if (doctors.length === 0) {
//       return res.status(400).json({ msg: "No doctors found in this category" });
//     }

//     res.status(200).json({ msg: doctors });
//   } catch (err) {
//     res.status(500).json({ msg: "Server Error" });
//   }
// });

// //Fetch appointments by patient ID and status "booked"
// app.get("/api/user/getAppointments_byPatientId/:pat_id", async (req, res) => {
//   const { pat_id } = req.params;

//   try {
//     if (!pat_id) {
//       return res.status(400).json({ msg: "Pls fill all fields" });
//     }
//     const appointments = await appointment.find({ pat_id, status: "booked" });

//     if (appointments.length === 0) {
//       return res.status(400).json({ msg: "No appointments yet !! " });
//     }

//     res.status(200).json({ msg: appointments });
//   } catch (err) {
//     res.status(500).json({ msg: "Server Error" });
//   }
// });

// // Route for booking an appointment
// app.post("/api/user/bookAppointment", async (req, res) => {
//   const { pname, dname, age, disease, phone, pat_id, doc_id, spec } = req.body;

//   try {
//     if (
//       !pname ||
//       !dname ||
//       !age ||
//       !disease ||
//       !phone ||
//       !pat_id ||
//       !doc_id ||
//       !spec
//     ) {
//       return res.status(400).json({ msg: "Pls fill all fields" });
//     }
//     const newAppointment = new appointment({
//       pname,
//       dname,
//       age,
//       disease,
//       phone,
//       pat_id,
//       doc_id,
//       spec,
//       status: "booked",
//     });

//     await newAppointment.save();

//     res.status(200).json({ msg: "Success", appointment: newAppointment });
//   } catch (err) {
//     res.status(500).json({ msg: "Server Error" });
//   }
// });

// // *********************************DOCTOR*************************************//

// // Login Doctor
// app.post("/api/doctor/loginDoctor", async (req, res) => {
//   const { name, pass } = req.body;

//   try {
//     if (!name || !pass) {
//       return res.status(400).json({ msg: "Pls fill all fields" });
//     }
//     let User = await doctor.findOne({ name, pass });
//     if (!User) {
//       return res.status(400).json({ msg: "Invalid credentials" });
//     }

//     res.status(200).json({ msg: "Success", userid: User._id });
//   } catch (err) {
//     res.status(500).json({ msg: "Server Error" });
//   }
// });

// //Fetch appointments by doctor ID and status "booked"
// app.get("/api/doctor/getAppointments_byDoctorId/:doc_id", async (req, res) => {
//   const { doc_id } = req.params;

//   try {
//     if (!doc_id) {
//       return res.status(400).json({ msg: "Pls fill all fields" });
//     }
//     const appointments = await appointment.find({ doc_id, status: "booked" });

//     if (appointments.length === 0) {
//       return res.status(400).json({ msg: "No appointments yet !!" });
//     }

//     res.status(200).json({ msg: appointments });
//   } catch (err) {
//     res.status(500).json({ msg: "Server Error" });
//   }
// });

// // Route to update appointment status to "done" by ID
// app.put("/api/doctor/updateAppointmentStatus/:_id", async (req, res) => {
//   const { _id } = req.params;

//   try {
//     if (!_id) {
//       return res.status(400).json({ msg: "Pls fill all fields" });
//     }
//     const appointments = await appointment.findById(_id);

//     if (!appointments) {
//       return res.status(400).json({ msg: "Appointment not found" });
//     }

//     appointments.status = "done";
//     await appointments.save();

//     res.status(200).json({ msg: "Success", upadatedappointment: appointments });
//   } catch (err) {
//     res.status(500).json({ msg: "Server Error" });
//   }
// });

// const port = 5600;
// app.listen(port, () => console.log(`server is running in port:`, port));
