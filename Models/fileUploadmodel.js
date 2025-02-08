const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();
// const SendEmail = require("../Controllers/sendmail")

const fileUploadSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String
    },
    tags:{
        type:String,
        
    },
    email:{
        type:String,
       
    }

});


fileUploadSchema.post("save", async function(doc) {
    try{
        console.log("DOC",doc)

        //transporter 
        //TODO: shift this configuration under /config folder
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        //send mail 
        let info = await transporter.sendMail({
            from:`CodeHelp - by Babbar`,
            to: doc.email,
            subject: "New File Uploaded on Cloudinary",
            html:`<h2>Hello Jee</h2> <p>File Uploaded View here: <a href="${doc.imageUrl}">${doc.imageUrl}</a> </p>`,
        })
        
        console.log("INFO", info);


    }
    catch(error) {
        console.error(error);
    }
})


module.exports = mongoose.model("fileUpload" , fileUploadSchema);

// fileUploadSchema.post("save" , async function(doc){
//     try{
//            console.log(doc)
//             //create transporter
//             const transporter = nodemailer.createTransport({
//                 host:process.env.MAIL_HOST,
//                 auth:{
//                     user:process.env.MAIL_USER,
//                     pass:process.env.MAIL_PASS
//                 }
//             })
    
//             const info = transporter.sendMail({
//                 from:"krishna gothwal by NORMAL.LTD",
//                 to:doc.email,
//                 subject:`upload  to cloudinary `,
//                 html:`<div>
//                         <h1>my first bakend mail</h1>
//                         <a href="doc.imageUrl"></a>
//                       </div>`
//             })
    
//             console.log("email send successfully" , info)
    
//         }catch(error){
//             console.log("email cant send due to some error")
//         }
// })



