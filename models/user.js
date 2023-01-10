const mongoose=require('mongoose')

const userSchema=new mongoose.Schema(
    {
        title:{type:String,required:true},
        image:{type:String,required:true}
})

module.exports=mongoose.model('user',userSchema)