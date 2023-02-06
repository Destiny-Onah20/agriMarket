const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
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
        unique: true
    },
    phoneNumber: {
        type: String,
        require: [true, "This place cannot be empty"],
        unique: true
    },
    address: {
        type: String,
        require: [true, "This place cannot be empty"]
    },
    password: {
        type: String,
        require: [true, "This place cannot be empty"]
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
     superAdmin: {
        type: Boolean,
        default: false
    },
    verify: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
    },
    image: {
        type: String,
    },
    cloudId: {
        type: String,
    }
},{
    timestamps: true
});

const allUsers  = mongoose.model("allusers", userModel);

module.exports = allUsers;