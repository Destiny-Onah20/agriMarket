const express = require("express");

const { postProduct, updtProduct, allProducts, delProducts, singleProduct, categoriesForPoultry, categoriesForFishery } = require("../controllers/products");
const { review } = require("../controllers/review");
const { realAdmin, isSuperAdmin } = require("../helpers/authentic");

const productRoutes = express.Router();

productRoutes.route("/product").get(allProducts);
productRoutes.route("/product/cat").get(categoriesForPoultry);
productRoutes.route("/product/fish").get(categoriesForFishery);
productRoutes.route("/product/:productId").get(singleProduct);
productRoutes.route("/product/:userId").post( postProduct);
productRoutes.route("/updProduct/:userId/:productId").patch(realAdmin || isSuperAdmin , updtProduct);
productRoutes.route("/delProduct/:userId/:productId").delete(realAdmin || isSuperAdmin , delProducts);
productRoutes.route("/review/:productId").post(review)


module.exports = productRoutes;