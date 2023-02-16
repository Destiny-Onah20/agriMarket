const express = require("express");
const { placeOrder, allOrders, singleOrder, deliver } = require("../controllers/order");

const { isSuperAdmin, realAdmin } = require("../helpers/authentic");

const orderRoute = express.Router();

orderRoute.route("/order").post(placeOrder);
orderRoute.route("/allorder/:userId").get(isSuperAdmin ,allOrders);
orderRoute.route("/singleorder/:userId/:orderId").get(isSuperAdmin ,singleOrder);
orderRoute.route("/delevered/:userId").post(deliver);

module.exports = orderRoute