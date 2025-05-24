const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const userRoutes=require('./routes/users')
const authRoutes=require('./routes/auth')

const app=express()
app.use(express.json())
app.use(cors())
app.use('/api', authRoutes);
app.use('/api/users', userRoutes);

mongoose.connect('mongodb://localhost/codveda_jwt').then(()=>console.log("mongodb connected")).catch(err=>console.error(err))


app.listen(3000,()=> console.log("server listening to port 3000"))
