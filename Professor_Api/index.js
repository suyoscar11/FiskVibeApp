import express from "express";
import student_modal from "./modals/student_modal";
import professor_modal from "./modals/professor_modal";
import appointment from "./modals/appointment";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async function (req, res) {
  res.status(500).send("Hello World!");
});

const port = 5600;
app.listen(port, function () {
  console.log("Server is running in port: ", port);
});
