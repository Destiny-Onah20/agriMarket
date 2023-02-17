const reviewModel = require("../models/review");
const productModel = require("../models/products");

exports.review = async(req,res)=>{
    try {
        const productId = req.params.productId;
        const theProductToReview = await productModel.findById(productId);
        const data = { rating , comment} = req.body;
        const reviewed = new reviewModel(data);
        reviewed.product = theProductToReview
        reviewed.rating += rating
        await reviewed.save()
        theProductToReview.review.push(reviewed);
        await theProductToReview.save()
        res.status(201).json({
            message: "Thanks for the feedBacks...",
            data: reviewed
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};

