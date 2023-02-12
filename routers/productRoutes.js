const express = require("express");

const { postProduct, updtProduct, allProducts, delProducts, singleProduct, categoriesForPoultry, categoriesForFishery } = require("../controllers/products");
const { realAdmin, isSuperAdmin } = require("../helpers/authentic");

const productRoutes = express.Router();

productRoutes.route("/product").get(allProducts);
productRoutes.route("/product/cat").get(categoriesForPoultry);
productRoutes.route("/product/fish").get(categoriesForFishery);
productRoutes.route("/product/:userId/:productId").get(singleProduct);
productRoutes.route("/product/:userId").post(realAdmin  , postProduct);
productRoutes.route("/updProduct/:userId/:productId").patch(realAdmin , updtProduct);
productRoutes.route("/delProduct/:userId/:productId").delete(realAdmin , delProducts);


module.exports = productRoutes;