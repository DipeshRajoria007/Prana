const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./routes/user-router");
const HospitalRouter = require("./routes/Hospital-router");
const SignupAdmin = require("./controllers/Admin.controller.js");
const AddHospital = require("./controllers/AddHospital.controller");
require("dotenv").config();
// console.log(process.env)

const PORT = process.env.PORT || 6969;
const app = express();

app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", router);
app.use("/api", AddHospital);

mongoose
  .connect(
    "mongodb+srv://dipeshrajoria:Jo4G4j4bynxTSXab@prana.sgq4qvr.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening on port http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
