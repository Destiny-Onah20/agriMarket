const express = require("express");
const { signUpUser, logIn, verifyUser, changePasswrd, forgotPasswrd, updateUser, delUser, logOut } = require("../controllers/realUsers");
const { isUser } = require("../helpers/authentic")

const realRoute = express.Router();

realRoute.route("/user").post(signUpUser);
realRoute.route("/login").post(logIn);
realRoute.route("/verifyUser/:userId").post(verifyUser);
realRoute.route("/forgotpassword").post(forgotPasswrd);
realRoute.route("/changepasswrd/:userId").post(changePasswrd);
realRoute.route("/user/:userId").patch(isUser , updateUser);
realRoute.route("/user/:userId").delete(isUser , delUser);
realRoute.route("/logout/:userId").post(logOut);


module.exports = realRoute;