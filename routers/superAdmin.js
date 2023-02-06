const express = require("express");

const { allUsers, allAdmin, updateAdmin, delAdmin, allUser } = require("../controllers/users");
const { isSuperAdmin, realAdmin } = require("../helpers/authentic");

const superRoutes = express.Router();

superRoutes.route("/allusers/:userId", realAdmin).get(allUsers);
superRoutes.route("/alladmin/:userId", isSuperAdmin).get(allAdmin);
superRoutes.route("/alluser/:userId", isSuperAdmin).get(allUser);
superRoutes.route("/deluser/:userId", isSuperAdmin).get(delAdmin);
superRoutes.route("/upduser/:userId", isSuperAdmin).get(updateAdmin);

module.exports = superRoutes;