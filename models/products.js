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
        type: String,
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
    order: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "order"
    }],
    review: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "review"
    }]
},{
    timestamps: true
});

const products  = mongoose.model("products", productSchema);

module.exports = products;