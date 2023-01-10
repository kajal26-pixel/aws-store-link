require('dotenv').config()
var AWS = require('aws-sdk');
const uuid = require("uuid").v4;
const multerS3 = require("multer-s3");
const Model=require('../models/user')

const BUCKET_NAME = process.env.MY_BUCKET;
const IAM_USER_KEY = process.env.ACCESS_KEY;
const IAM_USER_SECRET = process.env.SECRET_KEY;

let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    Bucket: BUCKET_NAME,
    ACL:'public-read'
});

const s3upload=async(file)=>{
    try{
        let loc1=file.originalname
        let loc= (loc1).replace(' ','-')
        //console.log(loc)
        var param={
            Bucket:BUCKET_NAME, 
            Key:`${loc}`, 
            Body:file.buffer
        }
        
        let objectData=await s3bucket.upload(param).promise()  
        //console.log(file.Location)  
        .then((data)=>{     
            let name=data.Key
            //console.log(data.Location)
            let titles= name.substring(0,name.indexOf('.'));
            var newimage=new Model({
                title:titles,
                image:data.Location
            })
            newimage.save()
        })
        .catch(err=>console.log(err))
        return objectData
    }
    catch(err){ 
        console.log(err)
    }
}

module.exports={s3upload}
