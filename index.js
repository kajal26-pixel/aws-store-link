var express = require('express')
require('dotenv').config()
var multer  = require('multer')
const app = express();
const mongoose=require('mongoose')
const route=require('./routes/image')

app.use(express.json());
app.use("/",route)
app.use(express.static('public'))

mongoose.connect(process.env.MONGO_URL).then(()=>console.log('mongodb connected!'))
.catch((err)=>console.log(err))

const port=process.env.PORT || 3000
app.listen(port,()=>console.log('loading to port'+port+'...'))