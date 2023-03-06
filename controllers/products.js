const modelName = require("../models/products");
const userModel = require("../models/users")
const cloudinary = require("../helpers/cloudinary");


exports.postProduct = async(req,res)=>{
    try {  
                const userId = req.params.userId
                const cloudResult = await cloudinary.uploader.upload(req.files.image.tempFilePath);
                const { productName , decs, price, categories, quantity } = req.body;
                const data = {
                    productName,
                    decs,
                    price,
                    categories,
                    image: cloudResult.secure_url,
                    cloudId : cloudResult.public_id,
                    quantity
                };
                const createNew = new modelName(data)
                const theUser = await userModel.findById(userId);
                // createNew.user = theUser;
                await createNew.save();
                theUser.products.push(createNew);
                await theUser.save()
                res.status(201).json({
                    message: "Successfully created..",
                    data: createNew
                })
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
};


exports.updtProduct = async(req,res)=>{
    try {
        const productId = req.params.productId;
        const product = await modelName.findById(productId);
        const cloudResult = await cloudinary.uploader.upload(req.files.image.tempFilePath);
        const { productName , decs, price, categories, quantity } = req.body;
        
        const data = {
            productName,
            decs,
            price,
            categories,
            image: cloudResult.secure_url,
            cloudId : cloudResult.public_id,
            quantity
        };
        const updatePro = await modelName.findByIdAndUpdate(product , data)
        res.status(200).json({
            data: updatePro
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};

// exports.allProducts = async(req,res)=>{
//     try {
//         const query = req.query.category ? {categoies : req.query.category} : {};
//         console.log(query)
//         const theProduct = await modelName.find(query);
//         res.status(200).json({
//             message: `All categories on ${query}`,
//             length: theProduct.length,
//             data: theProduct
//         })
//     } catch (error) {
//         res.status(400).json({
//             message: error.message
//         })
//     }
// };

exports.allProducts = async(req,res)=>{
    try {
        const all = await modelName.find();
        res.status(200).json({
            message: "All products",
            length : all.length,
            data: all
        })
    } catch (error) {
        res.status(400).json({
        message: error.message
        })
    }
};

exports.delProducts = async(req,res)=>{
    try {
        const productId = req.params.productId;
        const product = await modelName.findById(productId);
        console.log(product)
        const remove = await modelName.findByIdAndDelete(product);
        res.status(200).json({
            message: "Successfully deleted..."
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};

exports.singleProduct = async(req,res)=>{
    try {
        const productId = req.params.productId;
        const product = await modelName.findById(productId);
        res.status(200).json({
            message : "Here's the product..",
            data: product
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};


exports.categoriesForPoultry = async(req,res)=>{
    try {
        const poltry = await modelName.find().where({"categories": "poultry"})
        res.status(200).json({
            message: "Heres all the poultry products.. " +  poltry.length,
            data: poltry
        })
    } catch (error) { 
        res.status(400).json({
            message: error.message
        })
    }
}

exports.categoriesForFishery = async(req,res)=>{
    try {
        const fishery = await modelName.find().where({"categories": "fishery"})
        res.status(200).json({
            message: "Heres all the fishery products.. " +  fishery.length,
            data: fishery
        })
    } catch (error) { 
        res.status(400).json({
            message: error.message
        })
    }
};

