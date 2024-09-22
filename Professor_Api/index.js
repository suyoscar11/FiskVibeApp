import express from "express";
import student_modal from "./modals/student_modal";
import professor_modal from "./modals/professor_modal";
import appointment from "./modals/appointment";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/api/user/registerUser", async function (req, res) {
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
    res.status(500).json({ msg: "Server Error" });
  }
});

app.post("/api/user/loginUser", async function (req, res) {
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
app.get("/", async function (req, res) {
  res.status(500).send("Hello World!");
});

// Fetch professors by category

app.get("/api/user/getProf_byCategory/:category", async function (req, res) {
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
app.get(
  "/api/user/getAppointments_byStudentId/:std_id",
  async function (req, res) {
    const { std_id } = req.params;

    try {
      if (!std_id) {
        return res.status(400).json({ msg: "Please fill all the fields" });
      }

      const appointments = await appointment.find({ std_id, status: "booked" });
      if (appointments.length === 0) {
        return res.status(200).json({ msg: appointments });
      }
    } catch (error) {
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

//Route for booking an appointment

app.post("/api/user/bookAppointment", async function (req, res) {
  const { sname, pname, major, email, std_id, prof_id, faculty } = req.body;
  try {
    if (
      !sname ||
      !pname ||
      !major ||
      !email ||
      !std_id ||
      !prof_id ||
      !faculty
    ) {
      return res.status(400).json({ msg: "All Fields Required" });
    }

    const newAppointment = new appointment({
      sname,
      pname,
      major,
      email,
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

app.post("/api/professor/loginProfessor", async function (req, res) {
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
  async function (req, res) {
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
        return res.status(200).json({ msg: appointments });
      }
    } catch (error) {
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

// Route to update appointment status to "Done" by ID

app.put(
  "/api/professor/updateAppointmentStatus:/_id",
  async function (req, res) {
    const { _id } = req.params;

    try {
      if (!_id) {
        return res.status(400).json({ msg: "Please fill all the fields" });
      }
      const appointments = await appointment.findById(_id);
      if (!appointments) {
        return res.status(400).json({ msg: "Appointment not Found" });
      }

      appointments.status = "done";
      await appointments.save();
      res
        .status(200)
        .json({ msg: "Success", updatedAppointment: appointments });
    } catch (error) {
      return res.status(500).json({ msg: "Server Error" });
    }
  }
);

const port = 5600;
app.listen(port, function () {
  console.log("Server is running in port: ", port);
});
