const mongoose = require("mongoose");
require("dotenv").config();

const dbconnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL , {
        useNewUrlParser : true,
        useUnifiedTopology : true
    })
    .then(()=>{console.log("db connect successful")})
    .catch((error)=>{
        console.error(error),
        console.log("db connection error"),
        process.exit(1)
    })
}

module.exports = dbconnect;