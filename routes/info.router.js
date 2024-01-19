const express = require('express')
const {Register,login,addTask,alltasks,viewTask,updateTask,deleteTask,verifyOTP,validateMail} = require('../controller/info.controller')

const auth = require('../helpers/auth')



let route=express.Router()




route.post("/signup",Register)
route.post("/login",login)

route.post("/addtask",auth,addTask)
route.get("/alltasks",auth,alltasks)
route.get("/alltasks/viewtask/:_id",viewTask)
route.put("/alltasks/updatetask/:_id",updateTask)
route.delete("/alltasks/deletetask/:_id",deleteTask)

// !otp 
route.post("/validatemail",validateMail)
route.post("/verifyotp",verifyOTP)








module.exports=route