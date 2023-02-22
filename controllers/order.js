const modelName = require("../models/order");
const productModel = require("../models/products")
const mailSender = require("../helpers/email");


exports.placeOrder = async(req,res)=>{
    try {
        const createData = { firstName, lastName, email, address, phoneNumber } = req.body;
        const orderList = await modelName.create(createData);
        const delivered = `${req.protocol}://${req.get("host")}/api/delivered/${orderList._id}`;
        const message = `There valued customer your order with the this Id ${orderList._id} has been placed and will be delivered to you in your above location: ${orderList.address}, please click on this link ${delivered} if you successfully received the goods THANKS from @agri-market`
        mailSender({
            email: orderList.email,
            subject: "complete order placement",
            message
        });
        res.status(201).json({
            message: "Heres the details for the person who placed an other...",
            data: orderList
        })

    } catch (error) {
        res.status(400).json({
            mesage: error.message
        })
    }
};

exports.allOrders = async(req,res)=>{
    try {
        const all = await modelName.find();
        if(all[0].length === 0){
            res.status(200).json({
                message: "the order list is corrently empty... " + all.length,
            }) 
        }else{
        res.status(200).json({
            message: "All people that placed others " + all.length,
            data: all
        })
    }
    } catch (error) {
        res.status(400).json({
            mesage: error.message
        })
    }
};

exports.singleOrder = async(req,res)=>{
    try {
        const orderId = req.params.orderId;
        const one = await modelName.findById(orderId);
        if(one.length === 0){
            res.status(200).json({
                message: `their is currently no order with this id: ${id} `,
            }) 
        }else{
            res.status(200).json({
                data: one
            })
        }
    } catch (error) {
        res.status(400).json({
            mesage: error.message
        })
    }
};

exports.deliver = async(req,res)=>{
    try {
        const orderId = req.params.orderId;
        const order = await modelName.findById(orderId);
        await modelName.updateOne(order, {
            delivered: true
        },{new: true})
        res.status(200).json({
            message: "Deleveried delevered successfully.."
        }) 
    } catch (error) {
        res.status(400).json({
            mesage: error.message
        })
    }
};

