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

const port = 5600;
app.listen(port, function () {
  console.log("Server is running in port: ", port);
});
