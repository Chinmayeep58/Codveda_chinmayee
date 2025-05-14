const express=require('express')
const router=express.Router()
const User=require('../models/users')

//create
router.post('/',async (req,res)=>{
    const user=new User(req.body);
    try{
        const userSave=await user.save()
        res.status(200).json(userSave);
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
})

//read
router.get('/',async(req,res)=>{
    const users=await User.find();
    res.json(users);
})

//update
router.put('/:id',async (req,res)=>{
    const updated=await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.json(updated)
})

//delete
router.delete('/:id',async (req,res)=>{
    await User.findByIdAndDelete(req.params.id)
    res.json({message:'deleted'})
})

module.exports=router