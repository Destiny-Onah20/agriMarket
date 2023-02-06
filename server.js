const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({path: "./config/config.env"})
const app = require("./app");

mongoose.set("strictQuery", true)

const Db = process.env.DATABASE;
const port = process.env.PORT;
mongoose.connect(Db, {
    useNewUrlParser : true,
    useUnifiedTopology: true
}).then(()=>{
    console.log(`Mongoose connected Successfully`)
}).then(()=>{
    app.listen(port, ()=>{
        console.log(`Listening to port : ${port}`)
    })
}).catch((error)=>{
    return error.message
})

