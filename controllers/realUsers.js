const modelName = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const mailSender = require("../helpers/email");
const cloudinary = require("../helpers/cloudinary");
dotenv.config({path: './config/config.env'})


exports.signUpUser = async(req,res)=>{
    try {
        const {firstName,lastName, email, phoneNumber,location, password} = req.body;
        const saltPwd = await bcrypt.genSalt(5);
        const hassPwd = await bcrypt.hash(password, saltPwd);
        const createData = {
            firstName,
            lastName,
            email,
            phoneNumber,
            location,
            password: hassPwd
        };
            const createUser = new modelName(createData);
            const genToken = await jwt.sign({
                id: createUser._id,
                isAdmin: createUser.isAdmin,
                superAdmin : createUser.superAdmin
            },process.env.JWTOKEN, {expiresIn: "1h"});

            createUser.token = genToken;
            await createUser.save();

            const verifyUser = `${req.protocol}://${req.get("host")}/api/verifyUser/${createUser._id}`;
            const message = `help verify its you with this link ${verifyUser} for a better experience`;
            mailSender({
                email: createUser.email,
                subject: "verify your account",
                message
            })

            res.status(201).json({
                message: "created Successfully...",
                data: createUser
            })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};


exports.verifyUser = async(req,res)=>{
    try {
        const userId = req.params.userId;
        const user = await modelName.findById(userId);
        await modelName.findByIdAndUpdate(user._id, {
            verify: true
        },{
            new: true
        });
        res.status(200).json({
            message: "U have been verified.."
        })
    } catch (error) {
        res.status(400).json({
            message: err.message
        })
    }
};

exports.forgotPasswrd = async(req,res)=>{
    try {
        const {email} = req.body
        const checkEmail = await modelName.findOne({email});
        if(!checkEmail){
            res.status(400).json({
                message: "Sorry this email is wrong"
            })
        }else{
            const genToken = jwt.sign({
                id: checkEmail._id,
                isAdmin: checkEmail.isAdmin,
                superAdmin: checkEmail.superAdmin
            },process.env.JWTOKEN, {expiresIn: "1m"});
            const verifyEmail = `${req.protocol}://${req.get("host")}/api/changepasswrd/${checkEmail._id}/${genToken}`;
            const message = `Click on this link ${verifyEmail} to change ur password`;
            mailSender({
                email: checkEmail.email,
                subject: "Change of password",
                message
            });
            res.status(200).json({
                message: "An email has been sent to you.."
            })
        }
    } catch (error) {
        res.status(400).json({
            message: err.message
        })
    }
};

exports.changePasswrd = async(req,res)=>{
    try {
        const {password} = req.body
        const userId = req.params.userId;
         const saltPwd = await bcrypt.genSalt(5);
        const hassPwd = await bcrypt.hash(password, saltPwd);
        const user = await modelName.findById(userId);
        await modelName.findByIdAndUpdate(user._id, {
            password: hassPwd
        }, {
            new: true
        });
        res.status(200).json({
            message: "Successfully changed password.."
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};

exports.updateUser = async(req,res)=>{
    try {
        const result  = await cloudinary.uploader.upload(req.files.image.tempFilePath)
        const userId = req.params.userId;
        const user = await modelName.findById(userId)
        const {firstName,lastName, email, phoneNumber,location} = req.body;
        const updateData = {
            firstName,
            lastName,
            email,
            phoneNumber,
            location,
            image: result.secure_url,
            cloudId: result.public_id
        };
        const updateMe = await modelName.findByIdAndUpdate(user, updateData)
        res.status(200).json({
            message: "Updated successfully...",
            data: updateMe
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};
exports.logIn = async (req,res)=>{
    try{
        const {email, password } = req.body;
        const checkEmail = await modelName.findOne({email});
        if(!checkEmail){
            res.status(404).json({
                message: "Email or password is not authentic..."
            })
        }else{
            const checkPasswrd = await bcrypt.compare(password, checkEmail.password);
            if(!checkPasswrd){
                res.status(404).json({
                    message: "Email or password is not authentic..."
                })
            }else{
                const genToken = jwt.sign({
                    id: checkEmail._id,
                    isAdmin: checkEmail.isAdmin,
                    superAdmin: checkEmail.superAdmin
                },process.env.JWTOKEN, {expiresIn: "1h"});
                checkEmail.token = genToken;
                await checkEmail.save();

                const verifyMe = `${req.protocol}://${req.get("host")}/api/verifyUser/${checkEmail._id}`
                const message = `Welcome back champ ${checkEmail.firstName} `;
                mailSender({
                    email: checkEmail.email,
                    subject: "texting verification",
                    message
                })
    
                res.status(200).json({
                    data: checkEmail
                })
            }
        }
    }catch(err){
        res.status(400).json({
            message: err.message
        })
    }
};

exports.delUser = async(req,res)=>{
    try {
        const userId = req.body.userId;
        const user = await modelName.findById(userId);
        await modelName.deleteOne(userId, user);
        res.status(200).json({
            message: "Deleted successfully..."
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};

exports.logOut = async(req,res)=>{
    try {
        const userLog = await modelName.findById(req.params.userId);
        const genToken = jwt.sign({
             id: userLog._id,
            isAdmin: userLog.isAdmin,
            superAdmin: userLog.superAdmin
        },process.env.JWTDESTROY, {expiresIn: "1h"});
        userLog.token = genToken;
        await userLog.save();
        res.status(200).json({
            message: "Successfully logged out..."
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}