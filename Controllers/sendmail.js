// const { model } = require("mongoose");
// // const fileUpload = require("../Models/fileUploadmodel"); 
// const nodemailer = require("nodemailer")
// require("dotenv").config();

// const sendEmail = async(doc)=>{
//     try{
//        console.log(doc)
//         //create transporter
//         const transporter = nodemailer.createTransport({
//             host:process.env.MAIL_HOST,
//             auth:{
//                 user:process.env.MAIL_USER,
//                 pass:process.env.MAIL_PASS
//             }
//         })

//         const info = transporter.sendMail({
//             from:"krishna gothwal by NORMAL.LTD",
//             to:doc.email,
//             subject:`upload  to cloudinary `,
//             html:`<div>
//                     <h1>my first bakend mail</h1>
//                     <a href="doc.imageUrl"></a>
//                   </div>`
//         })

//         console.log("email send successfully" , info)

//     }catch(error){
//         console.log("email cant send due to some error")
//     }
// }

// module.exports = sendEmail;
