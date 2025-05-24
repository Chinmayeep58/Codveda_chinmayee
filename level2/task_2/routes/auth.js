const express= require('express')
const router=express.Router()
const User=require('../models/users')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

router.post('/signup',async (req,res)=>{
    const {name, email, password}=req.body;
    const hashedPwd=await bcrypt.hash(password,10);
    try{
        const user=new User({name, email, password:hashedPwd})
        await user.save();
        res.status(200).json({message:'User registered'})
    }catch(err){
        console.error('Error saving user:', err);
        res.status(400).json({error:'User already exists or invalid data'})
    }
})

router.post('/login', async (req,res)=>{
    const {email, password}=req.body
    const user=await User.findOne({email})
    if(!user|| !(await bcrypt.compare(password,user.password))){
        return res.status(401).json({error:'Invalid credentials'})
    }
    const token=jwt.sign({
        email: user.email,
        role: user.role
    },'12key21')

    res.json(token)
})


module.exports=router