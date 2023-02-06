const express = require("express");
const fileUpload = require("express-fileupload");
const productRoutes = require("./routers/productRoutes");
const userRoute = require("./routers/userRoute");
const realRoute = require("./routers/realUser");
const cors = require("cors");
const superRoutes = require("./routers/superAdmin");


const app = express();


app.use(express.json());
app.use(cors());
app.use(fileUpload({
    useTempFiles: true
}));
app.use("/api", userRoute)
app.use("/api", realRoute)
app.use("/api", productRoutes)
app.use("/api", superRoutes)

app.get("/", (req,res)=>{
    res.send("Welcome to agri-Market API")
})

module.exports = app;