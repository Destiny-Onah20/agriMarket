const express = require("express");

const { postProduct, updtProduct, allProducts, delProducts, singleProduct } = require("../controllers/products");
const { realAdmin } = require("../helpers/authentic");

const productRoutes = express.Router();

productRoutes.route("/product").get(allProducts);
productRoutes.route("/product/:userId/:productId").get(singleProduct);
productRoutes.route("/product/:userId", realAdmin).post(postProduct);
productRoutes.route("/product/:userId/:productId", realAdmin).patch(updtProduct);
productRoutes.route("/product/:userId/:productId", realAdmin).delete(delProducts);

module.exports = productRoutes;