const express = require("express");
const SignupAdmin = require("../controllers/Admin.controller.js");
const router = express.Router();
router.post("/signupadmin", SignupAdmin);
module.exports = router;
