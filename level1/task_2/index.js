const express=require('express');
const mongoose=require('mongoose')
const app=express()
const userRoutes=require('./routes/users')

app.use(express.json())
app.use('/api/users', userRoutes);

mongoose.connect('mongodb://localhost/codveda').then(()=>console.log("mongodb connected")).catch(err=>console.error(err))

app.listen(3000,()=> console.log("server listening to port 3000"))