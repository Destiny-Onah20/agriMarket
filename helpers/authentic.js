const modelName = require("../models/users");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({path: "./config/config.env"});

const whichUser = async(req, res, next)=>{
    try {
        const userId = req.params.userId;
        const checkUser = await modelName.findById(userId);
        if(!checkUser){
            res.status(400).json({
                message: "You are not registered.."
            })
        }else{
            const authToken = checkUser.token;
            await jwt.verify(authToken, process.env.JWTOKEN, (error, payload)=>{
                if(error){
                    res.status(400).json({
                        message: error.message
                    }) 
                }else{
                    req.user = payload;
                    next()
                }
            } );
        }
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};


exports.isSuperAdmin = async(req,res,next)=>{
    whichUser(req,res, ()=>{
        if(req.user.superAdmin){
            next()
        }else{
            res.status(400).json({
                message: "Sorry you are not authorized to perform this.. "
            })
        }
    })
};

exports.isAdmin = async(req,res,next)=>{
    whichUser(req,res, ()=>{
        if(req.user.isAdmin){
            next()
        }else{
            res.status(400).json({
                message: "Sorry you are not authorized to perform this.. "
            })
        }
    })
};