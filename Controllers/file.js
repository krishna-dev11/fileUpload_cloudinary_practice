const cloudinary = require("cloudinary").v2;
const fileUpload = require("../Models/fileUploadmodel"); 

exports.LocalfileUpload = async(req , res)=>{
    try{
         const file = req.files.file

         if(!file){
            return res.status(400).json({
                success:false,
                message:"please insert a file in request body"
            })
         }

         let path = __dirname + '/files/' + Date.now() + `.${file.name.split(".")[1]}`

         file.mv(path , (error)=>{
            console.log(error);
         })

         return res.status(200).json({
            success:true,
            message:"file upload at local server"
         })

    } catch(err){
       return res.status(500).json({
            success:false,
            message:"",
            error:err
            
        })
    }
}



function  checkfileExtention(file_type , arrayOfSupportedExtentiontype ){
    return arrayOfSupportedExtentiontype.includes(file_type);
}

async function uploadFileToCloudinary(file , folder , quality) {

    const options = {folder};

    if(quality)
    {
        options.quality = quality;
    }

    options.resource_type = "auto";

    return await cloudinary.uploader.upload(file.tempFilePath, options);

    
}

exports.imageUpload = async(req ,res)=>{
    try{
          const {name,tags,email} = req.body;
          console.log(name,tags,email)
          const file = req.files.imagefile;
          console.log(file)

          if(!file || !name || !tags || !email){
            return res.status(400).json({
                success:false,
                message:"please insert a file in request body"
            })
         }
         
         const SupportedExtentiontype = ["jpeg" , "jpg" , "png"];
         console.log(SupportedExtentiontype)

         const filetype = file.name.split('.')[1].toLowerCase();
         console.log(filetype)

         const ExtentionCheck = checkfileExtention(filetype , SupportedExtentiontype);

         if(!ExtentionCheck)
         {
            return res.status(400).json({
                success:false,
                message:"image Extention  in not supported"
            })
         }

         const response = await uploadFileToCloudinary(file , "Krishna" );

         const insertimageInDB = await fileUpload.create({name , tags , email , imageUrl:response.secure_url});

          res.status(200).json({
            success:true,
            data:insertimageInDB,
            imageUrl:response.secure_url,
            message:"entery successfully cretaed for image insert in cloudinary"
         })

    } catch(error){
         res.status(400).json({
            success:false,
            message:"unable to upload image"
        })
    }
}






exports.videoUpload = async(req ,res)=>{
    try{
       
        const {name , tags , email} = req.body;

        const file = req.files.videofile;

        if(!name || !tags || !email || !file)
        {
            return res.status(400).json({
                success:false,
                message:"fill all parameters in request"
            })
        }

        const supportedtypes = ["mov" , "mp4"];
        const fileformate = file.name.split('.')[1].toLowerCase();
        const willbesupported = checkfileExtention(fileformate , supportedtypes)

        if(!willbesupported){
            return res.status(400).json({
                success:false,
                message:"file formate not supported"
            })
        }

        const response = await uploadFileToCloudinary(file , "krishna" , 10)

        const insertInDb = await fileUpload.create({name , tags , email , imageUrl:response.secure_url});

        return res.status(200).json({
            success:true,
            data:insertInDb,
            message:"video successfully uplaoaded to cloudinary"
        })

    }catch(error){
        res.status(400).json({
            success:false,
            message:"unable to upload video"
        })
    }
}


exports.uploadCompressedimage = async(req , res)=>{

    try{
       
        const {name , tags , email} = req.body;

        const file = req.files.compressedimagefile;

        if(!name || !tags || !email || !file)
        {
            return res.status(400).json({
                success:false,
                message:"fill all parameters in request"
            })
        }

        const SupportedExtentiontype = ["jpeg" , "jpg" , "png"];
        const fileformate = file.name.split('.')[1].toLowerCase();
        const willbesupported = checkfileExtention(fileformate , SupportedExtentiontype)

        if(!willbesupported){
            return res.status(400).json({
                success:false,
                message:"file formate not supported"
            })
        }

        const response = await uploadFileToCloudinary(file , "krishna" , 100)
        console.log(response)
        const insertInDb = await fileUpload.create({name , tags , email , imageUrl:response.secure_url});

        return res.status(200).json({
            success:true,
            data:insertInDb,
            message:"video successfully uplaoaded to cloudinary"
        })

    }catch(error){
        res.status(400).json({
            success:false,
            message:"unable to upload video"
        })
    }

}