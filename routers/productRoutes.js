const express = require("express");

const { postProduct, updtProduct, allProducts, delProducts, singleProduct } = require("../controllers/products");
const { realAdmin, isSuperAdmin } = require("../helpers/authentic");

const productRoutes = express.Router();

productRoutes.route("/product").get(allProducts);
productRoutes.route("/product/:userId/:productId").get(singleProduct);
productRoutes.route("/product/:userId").post(realAdmin || isSuperAdmin , postProduct);
productRoutes.route("/updProduct/:userId/:productId").patch(realAdmin || isSuperAdmin, updtProduct);
productRoutes.route("/delProduct/:userId/:productId").delete(realAdmin || isSuperAdmin, delProducts);

module.exports = productRoutes;