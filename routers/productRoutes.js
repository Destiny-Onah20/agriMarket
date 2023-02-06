const express = require("express");

const { postProduct, updtProduct, allProducts, delProducts, singleProduct } = require("../controllers/products");
const { realAdmin, checkUser } = require("../helpers/authentic");

const productRoutes = express.Router();

productRoutes.route("/product").get(allProducts);
productRoutes.route("/product/:userId/:productId").get(singleProduct);
productRoutes.route("/product/:userId").post(realAdmin, postProduct);
productRoutes.route("/updProduct/:userId/:productId", realAdmin).patch(updtProduct);
productRoutes.route("/delProduct/:userId/:productId", realAdmin).delete(delProducts);

module.exports = productRoutes;