const modelName = require("../models/users");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({path: "./config/config.env"});

const checkUser = async(req,res,next)=>{
    try {
        const userId = req.params.userId;
        const user = await modelName.findById(userId);
        if(!user){
            res.status(400).json({
                message: "You are Not authorized.."
            })
        }else{
        const authToken = user.token;
        if(!authToken){
            res.status(400).json({
                message: "Not authorized.."
            })
        }else{
            jwt.verify(authToken, process.env.JWTOKEN, (err, payLoad)=>{
                if(err){
                    res.status(400).json({
                        message: err.message
                    })
                }else{
                    req.user = payLoad;
                    next();
                }
            } )
        }
    }
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};


exports.isSuperAdmin = async(req,res,next)=>{
    checkUser(req,res, ()=>{
        if(req.user.superAdmin){
        next()
        }else{
            res.status(400).json({
                message: "Sorry you are not authorized to perform this.. "
            })
        }
    })
};

exports.realAdmin = async(req,res,next)=>{
    checkUser(req,res, ()=>{
        if(req.user.isAdmin){ 
        next()
        }else{
            res.status(400).json({
                message: "Sorry you are not authorized to perform this.. "
            })
        }
    })
};

exports.isUser = (req,res,next)=>{

    checkUser(req,res,()=>{
        if(!req.user.isAdmin){
            next()
        }else{
            res.status(400).json({
                message: "sorry you are not authorized"
            })
        }
    })
};