const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT 

app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles:true,
    tempFileDir: '/tmp/'
}));



const dbconnect = require("./config/databaseConnect")
dbconnect();

const cloudinary = require("./config/cloudinaryconnect")
cloudinary.cloudinaryConnect();


const route = require("./Routes/route");
app.use("/api/v1/upload" , route)

app.listen(PORT , ()=>{
    console.log(`server started at port ${PORT}`)
})

app.get("/" , (req , res)=>{
    res.send("<h1>this is home page baby</h1>")
})