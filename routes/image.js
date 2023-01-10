var express = require('express');
require('dotenv').config()
var router = express.Router();
var multer  = require('multer');
const uuid = require("uuid").v4;
const {s3upload}=require('../controller/aws')
var ResponseData = []

var storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, 'ab');
    },
    filename:(req,file,cb)=>{
        const {originalname}=file
        cb(null, `${uuid()}-${originalname}`)
    }
});

var multipleUpload = multer({ storage:storage}).array('files');

router.post('/profile-upload-multiple',multipleUpload, async function (req, res) {
    try{
        for(var i=0;i<req.files.length;i++){
            var result = await s3upload(req.files[i])
            ResponseData.push(result)
        }
        res.send('success')
    }
    catch(err){
        res.send(err)
    }
})

module.exports = router