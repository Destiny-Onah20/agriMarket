const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        require: [true, "This place cannot be empty"]
    },
    decs: {
        type: String,
        require: [true, "This place cannot be empty"]
    },
     price: {
        type: Number,
        require: [true, "This place cannot be empty"],
    },
    categories: {
        type: String,
        require: [true, "This place cannot be empty"],
    },
    image: {
        type: String,
    },
    cloudId: {
        type: String,
    },
    quantity:{
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "allusers"
    },
},{
    timestamps: true
});

const products  = mongoose.model("products", productSchema);

module.exports = products;