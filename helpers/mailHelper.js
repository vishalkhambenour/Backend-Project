const nodemailer = require('nodemailer')


let transporter=nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user:"vsh27854@gmail.com",
        pass:"jnjvzkjrejxhryci"
    }
})

let invetationalMail=async(email,name)=>{
    // console.log("mail");
    let info=await transporter.sendMail({
        from:"vsh27854@gmail.com",
        to:email,
        subject:"Invitational Mail From VSH",
        html:`Hi,<br><br>  Welcome to VSH <span style=font-weight:bold;font-size:25px;text-transform:capitalize >
        ${name}</span> Your Account is Created Sucessfully you can login now.`

    })
    console.log(info);
    console.log("invitational mail sent sucessfully");
}


let sendOtp=async(email,name,otp)=>{
    let info=await transporter.sendMail({
        from:"vsh27854@gmail.com",
        to:email,
        subject:"Verification Mail",
        html:`Hi,<span style=font-weight:bold;font-size:25px;text-transform:capitalize >
        ${name}</span> Your OTP is ${otp}`

    })
    // console.log(info);
    // console.log("Otp sent sucessfully");
}


module.exports={invetationalMail,sendOtp}