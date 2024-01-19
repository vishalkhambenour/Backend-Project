const express = require('express')
require('dotenv').config()
const ConnectDB = require('./db/connection')
const cors = require('cors')

const InfoRoute = require('./routes/info.router')

let app=express()

app.use(express.json())
app.use(cors())

app.use("/api/info",InfoRoute)

app.all("*",(req,res)=>{
        
    res.status(404).json({error:true,message:"Page Not Found"})
})

app.use((err,req,res,next)=>{
    console.log("hello i am error middleware function");
    if(err.statuscode){
        return res.status(err.statuscode).json({error:true,message:err.message})
    }
    return res.status(500).json({error:true,message:err.message})
})

let Startserver=async()=>{
    try{
        app.listen(process.env.DEV_PORT,()=>{
            console.log(`Server is running on port ${process.env.DEV_PORT}`)
        })
        await ConnectDB(process.env.DEV_DATABASE)
        console.log("connected to mongo db");
    }catch(err){
        console.log(err);
    }
}
Startserver()