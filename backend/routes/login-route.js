const express = require("express");
const {
  get_user_from_respectiveTable,
} = require("../controllers/user.controller");
const checkRole = require("../middleware/checkRole");
const loginRouter = express.Router();
loginRouter.post("/login", checkRole, get_user_from_respectiveTable);
module.exports = loginRouter;
