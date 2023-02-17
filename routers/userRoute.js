const express = require("express");

const { adminSignUp, verifyU, logIn, forgotPassWrd, changePassWrd, allUsers, allAdmin, updateAdmin, delAdmin, singleUser } = require("../controllers/users");
const { isSuperAdmin, realAdmin } = require("../helpers/authentic");

const userRoute = express.Router();

userRoute.route("/admin").post(adminSignUp);
userRoute.route("/login").post(logIn);
userRoute.route("/verify/:id").post(verifyU);
userRoute.route("/forgot").post(forgotPassWrd);
userRoute.route("/changePaswrd/:userId").patch(changePassWrd);
userRoute.route("/updAdmin/:userId").patch(updateAdmin)
userRoute.route("/delAdmin/:userId").delete(delAdmin)
userRoute.route("/delAdmin/:userId").get(singleUser)



module.exports = userRoute;