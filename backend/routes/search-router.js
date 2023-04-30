const express = require("express");
const { searchPatient } = require("../controllers/Search.controller");
const searchRouter = express.Router();

searchRouter.get("/searchpatient", searchPatient);
module.exports = searchRouter;
