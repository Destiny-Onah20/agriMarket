const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    rating: {
        type : Number,
        default: 0
    },
    comment: {
        type: String
    },
    product: [{
        type: mongoose.Schema.Types.ObjectId ,
        ref: "products"
    }]
});

const review = mongoose.model("review", reviewSchema);

module.exports = review;