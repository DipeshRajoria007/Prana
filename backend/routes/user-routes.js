const express = require("express");
const { add_user_to_table } = require("../controllers/user.controller.js");
const { add_user_to_userTable } = require("../middleware/addUserMiddleware.js");
const userRouter = express.Router();
userRouter.post("/adduser", add_user_to_userTable, add_user_to_table);
module.exports = userRouter;
