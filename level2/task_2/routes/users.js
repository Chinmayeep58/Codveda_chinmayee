const express= require('express')
const router=express.Router()
const User=require('../models/users')
// const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


function authMiddleware(req,res,next){
    const authHeader=req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({error:'Authorization header missing'});
    }
    try{
        const token=authHeader.split(' ')[1];
        const user=jwt.verify(token,'12key21');
        req.user=user;
        next()
    }
    catch(err){
        return res.status(403).json({error:'Invalid or expired token'});
    }
}

router.get('/', authMiddleware, async (req, res) => {
  const users = await User.find({}, { password: 0 });
  res.json(users);
});

module.exports=router