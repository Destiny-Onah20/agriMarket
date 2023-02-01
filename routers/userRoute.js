const express = require("express");

const { adminSignUp, verifyU, logIn, forgotPassWrd, changePassWrd } = require("../controllers/users");

const userRoute = express.Router();

userRoute.route("/signup").post(adminSignUp);
userRoute.route("/login").post(logIn);
userRoute.route("/verify/:id").post(verifyU);
userRoute.route("/forgot").post(forgotPassWrd);
userRoute.route("/changePaswrd/:userId/:token").post(changePassWrd);



module.exports = userRoute;