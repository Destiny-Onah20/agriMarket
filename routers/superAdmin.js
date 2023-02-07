const express = require("express");

const { allUsers, allAdmin, updateAdmin, delAdmin, allUser, superA } = require("../controllers/users");
const { isSuperAdmin } = require("../helpers/authentic");

const superRoutes = express.Router();

superRoutes.route("/super").post(superA);
superRoutes.route("/allusers/:userId" ).get(isSuperAdmin , allUsers);
superRoutes.route("/alladmin/:userId").get(isSuperAdmin, allAdmin);
superRoutes.route("/alluser/:userId").get(isSuperAdmin, allUser);
superRoutes.route("/deluser/:userId/:userId").delete(isSuperAdmin, delAdmin);
superRoutes.route("/upduser/:userId/:userId").patch(isSuperAdmin, updateAdmin);

module.exports = superRoutes;