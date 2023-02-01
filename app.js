const express = require("express");
const userRoute = require("./routers/userRoute");

const app = express();


app.use(express.json());
app.use("/api", userRoute)

app.get("/", (req,res)=>{
    res.send("Welcome to agri-Market")
})

module.exports = app;