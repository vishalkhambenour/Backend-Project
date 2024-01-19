const bcrypt = require('bcrypt')


let createOtp=async()=>{


    let otp=Math.random().toString().split(".")[1].slice(0,6)
    let expiresDuration=60*1000 //! 1 minute duraction
    let expires =new Date().getTime() + expiresDuration
    let hash=await encryptOtp(otp)
    let hashedOtp=`${hash}.${expires}`
    // console.log({otp});
    // console.log({hashedOtp});
    return {hashedOtp,otp}
}

let encryptOtp=async(otp)=>{


    let salt=await bcrypt.genSalt(10)
    let hashedOtp=await bcrypt.hash(otp,salt)
    return hashedOtp

}


let validateotp=async(otp,hashedOtp)=>{

    let expires=hashedOtp.slice(hashedOtp.lastIndexOf(".")+1)
    let hashedvalue=hashedOtp.slice(0,hashedOtp.lastIndexOf("."))

    if(new Date().getTime()>parseInt(expires)){
       
        return false
    }

return await bcrypt.compare(otp,hashedvalue)

}

module.exports={createOtp,encryptOtp,validateotp}