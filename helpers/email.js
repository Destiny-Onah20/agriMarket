const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config({path: ".//config/config.env"})

const mailSender = async (option)=>{
    const transporter = nodemailer.createTransport({
        service: process.env.SERVICE,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAILPASSWORD
        }
    });
    const mailOptions = {
        from: process.env.EMAIL,
        to: option.email,
        subject: option.subject,
        text: option.message
    };
    await transporter.sendMail(mailOptions)
};

module.exports = mailSender;