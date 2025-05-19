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
    profileimage:String
});
module.exports=mongoose.model('User',userschema);