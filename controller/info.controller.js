
const asyncWrapper = require('../helpers/asyncWrapper')
const dataCollection = require('../model/info.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const customApiError = require('../helpers/customApiError')

const  TaskCollection= require('../model/tasks.model')
const { invetationalMail, sendOtp } = require('../helpers/mailHelper')
const { createOtp, encryptOtp, validateotp } = require('../helpers/otpHelper')
const { createToken } = require('../helpers/jwtTokenHelper')


//! SIGNUP/REGISTER
let Register=asyncWrapper(async(req,res,next)=>{
    // console.log(req.body);


    let {firstname,lastname,email,mobile,password,gender,skills}=req.body

    let fullname= firstname+" "+lastname
    let isemail=await dataCollection.findOne({email})

    if(!isemail){
        let ismobile= await dataCollection.findOne({mobile})
        if(!ismobile){

            let registered=await dataCollection.create({fullname,email,mobile,password,gender,skills})
            if(registered){
                console.log("entered");
                await invetationalMail(registered.email,registered.fullname)
                console.log("secind");
                return res.status(201).json({error:false,message:"Registered successfully",data:registered})
        }
    }
        else{
            throw customApiError("Mobile already exists",406)
        //    return res.status(406).json({error:true,message:"Mobile already exists"})
        }

    }else{
        throw customApiError("Email already exists",406)
    //    return res.status(406).json({error:true,message:"Email already exists"})
    }
})

// !LOGIN WITH PASSWORD

let login=asyncWrapper(async(req,res,next)=>{

    let {filedinput,password}=req.body
    let isinput;

    console.log(typeof(filedinput));
    
    if(!filedinput.includes('@')){

         isinput=await dataCollection.findOne({
            mobile:filedinput
         })
    }else{
        isinput=await dataCollection.findOne({email:filedinput})
    }

    if(isinput){
        if(isinput.password===password)
        {
            let token= jwt.sign({fullname:isinput.fullname},"vishalsk",{expiresIn:"1d"})
            return res.status(200).json({error:false,message:"Loged in Successfully",token,fullname:isinput.fullname})
        }
        else{
            return res.status(406).json({error:true,message:"invalid Password"})
        }
    }else
    {
        return res.status(401).json({error:true,message:"mobile or email not matching"})
    }



//     if(validatemail){
//         if(validatemail.password===password)
//         {
//                 let token= jwt.sign({fullname:validatemail.fullname},"vishalsk",{expiresIn:"1d"})
              
//             return res.status(200).json({error:false,message:"Loged in Successfully",token,fullname:validatemail.fullname})
//         }else{
//             return res.status(401).json({error:true,message:"invalid Password"})
//         }
//     }else if(validatmobile){
//         if(validatmobile.password===password)
//         {
//             let token= jwt.sign({fullname:validatmobile.fullname},"vishalsk",{expiresIn:"1d"})
//             return res.status(200).json({error:false,message:"Loged in Successfully",token,fullname:validatmobile.fullname})
//         }else{
//             return res.status(406).json({error:true,message:"invalid Password"})
//         }
//     }else{
//         return res.status(401).json({error:true,message:"mobile or email not matching"})
//     }
})






// ! OTP LOGIN

let validateMail=asyncWrapper(async(req,res,next)=>{

    let {email}=req.body

    let user=await dataCollection.findOne({email})

    if(!user)
    {
        return next(customApiError("User Not Found",404))
    }

   let {otp,hashedOtp}=await createOtp()
    sendOtp(user.email,user.fullname,otp)
    await dataCollection.findOneAndUpdate({email},{otp:hashedOtp},{runValidators:true})
    res.status(200).json({error:false,message:"OTP sent Successfully"})
})
let verifyOTP=asyncWrapper(async(req,res,next)=>{

    let {email,otp}=req.body

    let user=await dataCollection.findOne({email})
    // if(!user){
    //     return next(customApiError("Email NOT found",401))
    // }
    let isotpmatching= await validateotp(otp,user.otp)
    if(!isotpmatching){
        throw customApiError("Invalid OTP",401)
    }
    let token=createToken({fullname:user.fullname})
    res.status(200).json({error:false,message:"Login Successfull",token,fullname:user.fullname})
})


// ! ADD TASKS
let addTask=async(req,res,next)=>{
    try {
       let {productname,price,color}=req.body

       let isproduct=await TaskCollection.find()
    //    console.log("hii");

       if(isproduct){
        let createdby=req.fullname
        let createproduct=await TaskCollection.create({productname,price,color,createdby})
        return res.status(200).json({error:false,message:"product added successfully",data:createproduct})

       }else{
        return res.status(401).json({error:true,message:"Product already exists"})
       }

    } catch (err) {
        next(err)
        
    }

}

// !VIEW ALL TASKS /CRUD OPERATION

let alltasks=asyncWrapper(async(req,res,next)=>{

    let createdby=req.fullname

    let AllTasks= await TaskCollection.find({createdby})

    if(!AllTasks){
        return res.status(409).json({error:true, message:"no products found"})
    }else{
        return res.status(200).json({error:false, message:"no products found",AllTasks})
    }

})

let viewTask=asyncWrapper(async(req,res,next)=>{

    let {_id}=req.params;

    let view= await TaskCollection.findOne({_id})

    if(!view){
       return res.status(201).json({error:true,message:"No Tasks Found"})
    }else{
       return res.status(200).json({error:false,message:"Task found",data:view})
    }



})

let updateTask=asyncWrapper(async(req,res,next)=>{

    let {_id}=req.params;
    let {productname,price,color}=req.body
    let update=await TaskCollection.findByIdAndUpdate({_id},{productname,price,color},{new:true,runValidators:true})

    if(!update){
        return res.status(404).json({error:true,message:"No task found"})
    }
    return res.status(200).json({error:false,message:"Task found",data:update})

})
let deleteTask=asyncWrapper(async(req,res,next)=>{

    let {_id}=req.params;

    let deletetask=await TaskCollection.findByIdAndDelete({_id})
    if(!deleteTask){
        return res.status(404).json({error:true,message:"No task found"})
    }
    return res.status(200).json({error:false,message:"Task Deleted",data:deletetask})

})


module.exports={Register,login,addTask,alltasks,viewTask,updateTask,deleteTask,verifyOTP,validateMail}

