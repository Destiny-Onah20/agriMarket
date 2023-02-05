const express = require("express");

const { adminSignUp, verifyU, logIn, forgotPassWrd, changePassWrd, allUsers, allAdmin, updateAdmin, delAdmin } = require("../controllers/users");
const { isSuperAdmin, realAdmin } = require("../helpers/authentic");

const userRoute = express.Router();

userRoute.route("/admin").post(adminSignUp);
userRoute.route("/login").post(logIn);
userRoute.route("/verify/:id").post(verifyU);
userRoute.route("/forgot").post(forgotPassWrd);
userRoute.route("/changePaswrd/:userId/:token").post(changePassWrd);
userRoute.route("/admin/:userId", isSuperAdmin).get(allUsers);
userRoute.route("/admin/:userId", realAdmin).patch(updateAdmin)
userRoute.route("/admin/:userId", realAdmin).delete(delAdmin)



module.exports = userRoute;