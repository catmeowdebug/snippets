const mongoose=require('mongoose');
const userschema =new mongoose.Schema({
    name: String,
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        unique:true,
    },
    nickname:String,
    profileimage:String,
    friends:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
});
module.exports=mongoose.model('User',userschema);