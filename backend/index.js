const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/admin-router");
const userRouter = require("./routes/user-routes");
const loginRouter = require("./routes/login-route");
const searchRouter = require("./routes/search-router");
const doctorRouter = require("./routes/doctor-router");
const appointmentRouter = require("./routes/appointment-router");
require("dotenv").config();

const PORT = process.env.PORT || 6969;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", router);
app.use("/api", userRouter);
app.use("/api", loginRouter);
app.use("/api", searchRouter);
app.use("/api", doctorRouter);
app.use("/api/appointment", appointmentRouter);

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
