const express= require("express");
const bcrypt =require("bcryptjs");
const jwt=require("jsonwebtoken");
const User= require('../models/user');
const router=express.Router();
router.post('/register',async (req,res)=>{
    const {email,password}=req.body;
    try{
        let user =await User.findOne({email});
        if(user) return res.status(400).json({message:'User already exist'});
        const hashedPassword = await bcrypt.hash(password,10);
        user = new User({email,password:hashedPassword});
        await user.save();
        res.status(200).json({message:"user regsitered succesfully "})

    }catch(e){
        console.error(e.message);
        console.log("something is wrong in auth jsx");
        res.status(500).json({message:'Internal server error'});
    }
})
router.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user= await User.findOne({email});
        if(!user) return res .status(400).json({message:"invalid creds"});
        const isMatch =await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message:"wrong password"});
        const token = jwt.sign({userId:user.id},process.env.JWT_SECRET);
        res.json({token});

    }catch(e){
        console.error(e.message);
        console.log("smth aint right in login of auth js nigga");
        res.status(500).json({message:"Internal server error"});
    }
});
module.exports = router;