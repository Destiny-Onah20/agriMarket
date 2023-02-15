const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: [true, "This place cannot be empty"]
    },
    lastName: {
        type: String,
        require: [true, "This place cannot be empty"]
    },
     email: {
        type: String,
        require: [true, "This place cannot be empty"],
    },
    address: {
        type: String,
        require: [true, "This place cannot be empty"],
    },
    quantity: {
        type: Number,
        require: [true, "This place cannot be empty"],

    },
    phoneNumber: {
        type: String,
        require: [true, "This place cannot be empty"],
    },
    product: [

    ],
    delivery:{
        type: Boolean,
        default: false
    },
    delivered: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});

const order  = mongoose.model("order", orderSchema);

module.exports = order;