const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config({path: '../config/config.env'})

cloudinary.config({
    cloud_name: process.env.NAME,
    api_key: process.env.KEYS,
    api_secret: process.env.API
  });

  module.exports = cloudinary;