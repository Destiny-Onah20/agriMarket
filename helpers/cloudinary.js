const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config({path: '../config/config.env'})

cloudinary.config({
    cloud_name: "dqsfookgo",
    api_key: "793972136549674",
    api_secret: "XnI82uERmT3rF2V9p72-Wij4Zhg"
  });

  module.exports = cloudinary;