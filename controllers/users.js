const modelName = require("../models/users");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const mailSender = require("../helpers/email");
const cloudinary = require("../helpers/cloudinary");
dotenv.config({path: "./config/config.env"})


exports.adminSignUp = async(req,res)=>{
    try {
        const { firstName, lastName, email, phoneNumber, address, password } = req.body;
        const saltPaswd = await bcrypt.genSalt(10);
        const hashPaswd = await bcrypt.hash(password, saltPaswd);
        const createData = {
            firstName,
            lastName,
            email,
            phoneNumber,
            address,
            password: hashPaswd
        };
        const newUser = new modelName(createData);
        newUser.isAdmin = true;
        const genToken = jwt.sign({
            id: newUser._id,
            isAdmin: newUser.isAdmin,
            superAdmin: newUser.superAdmin
        }, process.env.JWTOKEN, {expiresIn: "1d"});
        newUser.token = genToken;
        const checker = await modelName.findOne({email})
        if(checker){
            res.status(400).json({
                message: "Email already taken..."
            })
        }else{
            await newUser.save();

        const verifyUser = `${req.protocol}://${req.get("host")}/api/verify/${newUser._id}`;
        const message = `help verify its you with this link ${verifyUser} for a better experience `;
        mailSender({
            email: newUser.email,
            subject: "kindly verify",
            message
        });
        res.status(201).json({
            data: newUser
        })

        }
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};



exports.verifyU = async(req,res)=>{
    try {
        const id = req.params.id;
        const user = await modelName.findById(id);
        user.verify = true;
        await user.save();
        res.status(200).json({
            message: `thanks ${user.firstName} for verifying your account...`
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};

exports.logIn = async(req,res)=>{
    try {
        const { email, password} = req.body;
        const checkEmail = await modelName.findOne({email});
        if(!checkEmail){
            res.status(404).json({
                message: "Sorry email is not correct.."
            })
        }else{
           const checkPasswrd = await bcrypt.compare(password, checkEmail.password);
           if(!checkPasswrd){
            res.status(404).json({
                message: "Sorry password is not correct.."
            })
           }else{
            const genToken = jwt.sign({
                id: checkEmail._id,
                isAdmin: checkEmail.isAdmin,
                superAdmin: checkEmail.superAdmin
            }, process.env.JWTOKEN, {expiresIn: "1d"});
            checkEmail.token = genToken;
            await checkEmail.save();
            const message = `Welcome back to agri-Market ${checkEmail.firstName} for a better experience `;
             mailSender({
            email: checkEmail.email,
            subject: "Successfully logged in",
            message
        });
        res.status(200).json({
            data: checkEmail
        })
           }
        }
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};

exports.forgotPassWrd = async(req,res)=>{
    try{
        const { email } = req.body;
        const checkEmail = await modelName.findOne({email});
        if(!checkEmail){
            res.status(404).json({
                message: "Sorry email is not correct.."
            })
        }else{
            const verifyUser = `${req.protocol}://${req.get("host")}/api/changePaswrd/${checkEmail._id}`;
            const message = `Use this link ${verifyUser} to change your password `;
            mailSender({
            email: checkEmail.email,
            subject: "Change of password",
            message
        });
        res.status(200).json({
            message: "A link has been sent to your email please check.."
        })
        }
    }catch(err){
        res.status(400).json({
            message: err.message
        })
    }
};

exports.changePassWrd = async(req,res)=>{
    try {
        const { password } = req.body;
        const userId = req.params.userId;
        const theUser = await modelName.findById(userId);
        const saltPaswd = await bcrypt.genSalt(10);
        const hashPaswd = await bcrypt.hash(password, saltPaswd);
        await modelName.findByIdAndUpdate(theUser, {
            password: hashPaswd
        },{
            new: true
        } );
        res.status(200).json({
            message: "Successfully updated"
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};

exports.allUsers = async(req,res)=>{
    try {
        const all = await modelName.find();
        res.status(200).json({
            message: "All users " + all.length,
            data: all
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}


exports.allAdmin = async(req,res)=>{
    try {
        const all = await modelName.find().where({"isAdmin": true});
        res.status(200).json({
            message: "All users " + all.length,
            data: all
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};

exports.allUser = async(req,res)=>{
    try {
        const all = await modelName.find().where({"isAdmin": false});
        res.status(200).json({
            message: "All users " + all.length,
            data: all
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};

exports.singleUser = async(req,res)=>{
    try {
        const id = req.params.id;

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};


exports.updateAdmin = async(req,res)=>{
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


exports.delAdmin = async(req,res)=>{
    try {
        const userId = req.body.userId;
        const user = await modelName.findById(userId);
        await modelName.deleteOne(user);
        res.status(200).json({
            message: "Deleted successfully..."
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};


exports.superA = async(req,res)=>{
    try {
        const { firstName, lastName, email, phoneNumber, address, password } = req.body;
        const saltPaswd = await bcrypt.genSalt(10);
        const hashPaswd = await bcrypt.hash(password, saltPaswd);
        const createData = {
            firstName,
            lastName,
            email,
            phoneNumber,
            address,
            password: hashPaswd
        };
        const newUser = new modelName(createData);
        newUser.isAdmin = true;
        newUser.superAdmin = true;
        const genToken = jwt.sign({
            id: newUser._id,
            isAdmin: newUser.isAdmin,
            superAdmin: newUser.superAdmin
        }, process.env.JWTOKEN, {expiresIn: "1d"});
        newUser.token = genToken;
        await newUser.save();

        const verifyUser = `${req.protocol}://${req.get("host")}/api/verify/${newUser._id}`;
        const message = `help verify its you with this link ${verifyUser} for a better experience `;
        mailSender({
            email: newUser.email,
            subject: "kindly verify",
            message
        });
        res.status(201).json({
            data: newUser
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};